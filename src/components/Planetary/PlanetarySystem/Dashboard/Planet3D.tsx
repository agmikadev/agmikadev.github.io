import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { type PlanetModel } from "../../data/PlanetaryData";

interface Planet3DProps {
  planet: PlanetModel;
}

const AI_COLOR = "#a9fc03";

// --- Neural Network Mesh (AI Belt) ---
const NeuralMesh: React.FC<{ color: string }> = ({ color }) => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const pulsesRef = useRef<THREE.InstancedMesh>(null);

  const icoGeo = useMemo(() => new THREE.IcosahedronGeometry(1.5, 2), []);
  const positions = useMemo(() => icoGeo.attributes.position.array as Float32Array, [icoGeo]);
  const uniqueVertices = useMemo(() => {
    const map = new Map<string, THREE.Vector3>();
    for (let i = 0; i < positions.length; i += 3) {
      const key = `${positions[i].toFixed(3)},${positions[i + 1].toFixed(3)},${positions[i + 2].toFixed(3)}`;
      if (!map.has(key)) {
        map.set(key, new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]));
      }
    }
    return Array.from(map.values());
  }, [positions]);

  const indices = icoGeo.index ? (icoGeo.index.array as Uint16Array) : null;
  const edges = useMemo(() => {
    if (!indices) return [];
    const set = new Set<string>();
    const result: [number, number][] = [];
    for (let i = 0; i < indices.length; i += 3) {
      const tri = [indices[i], indices[i + 1], indices[i + 2]];
      for (let j = 0; j < 3; j++) {
        const a = tri[j], b = tri[(j + 1) % 3];
        const key = Math.min(a, b) + "-" + Math.max(a, b);
        if (!set.has(key)) {
          set.add(key);
          result.push([a, b]);
        }
      }
    }
    return result;
  }, [icoGeo]);

  const linePositions = useMemo(() => {
    const arr: number[] = [];
    for (const [a, b] of edges) {
      const pA = new THREE.Vector3().fromBufferAttribute(icoGeo.attributes.position, a);
      const pB = new THREE.Vector3().fromBufferAttribute(icoGeo.attributes.position, b);
      arr.push(pA.x, pA.y, pA.z, pB.x, pB.y, pB.z);
    }
    return new Float32Array(arr);
  }, [edges, icoGeo]);

  const nodeGeo = useMemo(() => new THREE.SphereGeometry(0.06, 8, 8), []);
  const nodeMat = useMemo(() => new THREE.MeshBasicMaterial({ color }), [color]);
  const pulseGeo = useMemo(() => new THREE.SphereGeometry(0.12, 8, 8), []);
  const pulseMat = useMemo(() => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3 }), [color]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const pulseStates = useMemo(
    () => uniqueVertices.map(() => ({ phase: Math.random() * Math.PI * 2, speed: 0.5 + Math.random() * 2 })),
    [uniqueVertices],
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.15;
    }
    if (nodesRef.current) {
      for (let i = 0; i < uniqueVertices.length; i++) {
        const v = uniqueVertices[i];
        dummy.position.copy(v);
        dummy.updateMatrix();
        nodesRef.current.setMatrixAt(i, dummy.matrix);
      }
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }
    if (pulsesRef.current) {
      for (let i = 0; i < uniqueVertices.length; i++) {
        const v = uniqueVertices[i];
        const p = pulseStates[i];
        const scale = 1 + Math.sin(time * p.speed + p.phase) * 0.5;
        dummy.position.copy(v);
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        pulsesRef.current.setMatrixAt(i, dummy.matrix);
      }
      pulsesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe shell */}
      <mesh geometry={icoGeo}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
      </mesh>

      {/* Synaptic connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.6} />
      </lineSegments>

      {/* Neural nodes */}
      <instancedMesh ref={nodesRef} args={[nodeGeo, nodeMat, uniqueVertices.length]}>
        <sphereGeometry args={[0.06, 8, 8]} />
      </instancedMesh>

      {/* Pulsing halos */}
      <instancedMesh ref={pulsesRef} args={[pulseGeo, pulseMat, uniqueVertices.length]}>
        <sphereGeometry args={[0.12, 8, 8]} />
      </instancedMesh>
    </group>
  );
};

// --- Standard Planet Mesh ---
const PlanetMesh: React.FC<{ planet: PlanetModel }> = ({ planet }) => {
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const ring1MeshRef = useRef<THREE.Mesh>(null);
  const ring2MeshRef = useRef<THREE.Mesh>(null);

  const isAIBelt = planet.shape === 'belt';
  const isSolidHexagon = planet.shape === 'hexagon';
  const isWireframeVariant = planet.variant === 'wireframe';

  const baseRadius = 1.5;

  const scannerMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: AI_COLOR,
    emissive: AI_COLOR,
    emissiveIntensity: 1.2,
    wireframe: true,
    metalness: 1,
    roughness: 0,
    side: THREE.DoubleSide,
  }), []);

  useFrame((_state, delta) => {
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y += delta * 0.1;
    }
    if (!isAIBelt && planet.hasAI) {
      if (ring1MeshRef.current) ring1MeshRef.current.rotation.y -= delta * 0.5;
      if (ring2MeshRef.current) ring2MeshRef.current.rotation.y += delta * 0.5;
    }
  });

  const renderCoreGeometry = () => {
    if (isSolidHexagon) {
      return <cylinderGeometry args={[baseRadius, baseRadius, baseRadius, 6]} />;
    }
    return <sphereGeometry args={[baseRadius, 64, 64]} />;
  };

  return (
    <group>
      <mesh
        ref={coreMeshRef}
        rotation={isSolidHexagon ? [Math.PI / 2, 0, 0] : [0, 0, 0]}
      >
        {renderCoreGeometry()}
        <meshStandardMaterial
          color={planet.color}
          roughness={isWireframeVariant ? 0 : 0.2}
          metalness={isWireframeVariant ? 1 : 0.6}
          wireframe={isWireframeVariant}
          emissive={isWireframeVariant ? planet.color : "#000000"}
          emissiveIntensity={isWireframeVariant ? 0.5 : 0}
        />
      </mesh>

      {!isAIBelt && planet.hasAI && (
        <>
          <group rotation={[Math.PI / 2, Math.PI / 4, 0]}>
            <mesh ref={ring1MeshRef} material={scannerMaterial}>
              <torusGeometry args={[2.6, 0.015, 16, 100]} />
            </mesh>
          </group>
          <group rotation={[Math.PI / 2, -Math.PI / 4, 0]}>
            <mesh ref={ring2MeshRef} material={scannerMaterial}>
              <torusGeometry args={[2.4, 0.015, 16, 100]} />
            </mesh>
          </group>
        </>
      )}
    </group>
  );
};

export const Planet3D: React.FC<Planet3DProps> = ({ planet }) => {
  const isAIBelt = planet.shape === 'belt';

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        {!isAIBelt && <directionalLight position={[5, 5, 5]} intensity={1.5} color={planet.color} />}
        {!isAIBelt && <pointLight position={[-5, -5, -5]} intensity={0.5} color="white" />}

        {isAIBelt ? (
          <NeuralMesh color={planet.color} />
        ) : (
          <PlanetMesh planet={planet} />
        )}

        <OrbitControls enableZoom={false} autoRotate={!isAIBelt} autoRotateSpeed={0.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};