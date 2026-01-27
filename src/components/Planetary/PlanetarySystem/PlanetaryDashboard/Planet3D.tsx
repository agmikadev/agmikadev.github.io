import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { type PlanetModel } from "../../data/PlanetaryData";

interface Planet3DProps {
  planet: PlanetModel;
}

// Cor Verde Neon da IA
const AI_COLOR = "#a9fc03"; 

const PlanetMesh: React.FC<{ planet: PlanetModel }> = ({ planet }) => {
  // Ref para o núcleo (esfera, hexágono sólido ou o novo hexágono wireframe)
  const coreMeshRef = useRef<THREE.Mesh>(null);
  
  // Refs para os anéis de scanner (usados apenas em planetas normais com IA)
  const ring1MeshRef = useRef<THREE.Mesh>(null);
  const ring2MeshRef = useRef<THREE.Mesh>(null);

  // --- DETECÇÃO DE TIPO ---
  const isAIBelt = planet.shape === 'belt'; // O novo tipo IA
  const isSolidHexagon = planet.shape === 'hexagon'; // O tipo Nodeon antigo
  const isWireframeVariant = planet.variant === 'wireframe'; // Variante para planetas comuns

  // --- CONFIGURAÇÃO DE TAMANHOS ---
  const baseRadius = 1.5; 

  // --- GAMELOOP (Animações) ---
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // A. ANIMAÇÃO DO NÚCLEO CENTRAL
    if (coreMeshRef.current) {
      if (isAIBelt) {
        // --- NOVA ANIMAÇÃO DA IA (Wireframe Hexagon Dinâmico) ---
        // Diferente do Nodeon, este gira em TODOS os eixos para parecer instável/vivo.
        coreMeshRef.current.rotation.y += delta * 0.5; // Rotação principal mais rápida
        coreMeshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2; // Oscilação no eixo X
        coreMeshRef.current.rotation.z = Math.cos(time * 0.3) * 0.2; // Oscilação no eixo Z
        
        // Efeito de "Pulso/Respiração" (Vértices se movendo)
        // Escala varia sutilmente entre 0.95x e 1.05x
        const pulse = 1 + Math.sin(time * 2) * 0.05;
        coreMeshRef.current.scale.set(pulse, pulse, pulse);

      } else {
        // --- Animação Padrão (Planetas e Nodeon) ---
        // Apenas rotação sólida e calma no eixo Y
        coreMeshRef.current.rotation.y += delta * 0.1;
      }
    }

    // B. GIRO DOS ANÉIS DE SCANNER (Apenas para planetas físicos com IA)
    if (!isAIBelt && planet.hasAI) {
      if (ring1MeshRef.current) ring1MeshRef.current.rotation.y -= delta * 0.5;
      if (ring2MeshRef.current) ring2MeshRef.current.rotation.y += delta * 0.5;
    }
  });

  // --- MATERIAIS ---
  
  // 1. Material da IA (Wireframe Neon Brilhante)
  // Usamos MeshBasicMaterial para que ele ignore a luz e brilhe com cor pura.
  const aiWireframeMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: AI_COLOR,
    wireframe: true,
    side: THREE.DoubleSide,
    fog: false, // Não é afetado por neblina se houver
  }), []);

  // 2. Material do Scanner (Anéis externos)
  const scannerMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: AI_COLOR,
    emissive: AI_COLOR,
    emissiveIntensity: 1.2,
    wireframe: true,
    metalness: 1,
    roughness: 0,
    side: THREE.DoubleSide,
  }), []);

  // --- RENDERIZAÇÃO CONDICIONAL DA GEOMETRIA ---
  const renderCoreGeometry = () => {
    if (isAIBelt || isSolidHexagon) {
      // Ambos usam o prisma hexagonal
      return <cylinderGeometry args={[baseRadius, baseRadius, baseRadius, 6]} />;
    }
    // Padrão é esfera
    return <sphereGeometry args={[baseRadius, 64, 64]} />;
  };

  // --- RENDERIZAÇÃO CONDICIONAL DO MATERIAL ---
  const renderCoreMaterial = () => {
    if (isAIBelt) {
      // IA usa o material básico wireframe neon
      return <primitive object={aiWireframeMaterial} />;
    }
    
    // Planetas normais usam material standard que reage à luz
    return (
      <meshStandardMaterial
        color={planet.color}
        roughness={isWireframeVariant ? 0 : 0.2}
        metalness={isWireframeVariant ? 1 : 0.6}
        wireframe={isWireframeVariant}
        emissive={isWireframeVariant ? planet.color : "#000000"}
        emissiveIntensity={isWireframeVariant ? 0.5 : 0}
      />
    );
  };


  return (
    <group>
      {/* --- NÚCLEO CENTRAL (Variável) --- */}
      <mesh
        ref={coreMeshRef}
        // Se for hexágono (sólido ou IA), precisa deitar 90graus para ficar em pé
        rotation={(isAIBelt || isSolidHexagon) ? [Math.PI / 2, 0, 0] : [0, 0, 0]}
      >
        {renderCoreGeometry()}
        {renderCoreMaterial()}
      </mesh>

      {/* --- SCANNER IA (Apenas para planetas FÍSICOS que têm IA) --- */}
      {/* O próprio belt não precisa se auto-escanear com anéis extras */}
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
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ alpha: true }}>
        
        {/* Luzes afetam planetas normais, mas o Wireframe Basic da IA as ignora */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color={planet.color} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="white" />

        <PlanetMesh planet={planet} />

        {/* AutoRotate desativado para a IA, pois ela já tem sua rotação caótica */}
        <OrbitControls enableZoom={false} autoRotate={planet.shape !== 'belt'} autoRotateSpeed={0.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};