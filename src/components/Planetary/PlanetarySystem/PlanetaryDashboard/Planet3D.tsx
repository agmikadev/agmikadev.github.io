import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment} from "@react-three/drei";
import * as THREE from "three";
import { type PlanetModel } from "../../data/PlanetaryData";

interface Planet3DProps {
  planet: PlanetModel;
}

// O Objeto 3D em si (A Geometria e o Material)
const PlanetMesh: React.FC<{ planet: PlanetModel }> = ({ planet }) => {
  // Ref para o planeta principal (para girar)
  const planetRef = useRef<THREE.Mesh>(null);
  // Ref para o grupo da Lua (para a lua orbitar o planeta)
  const moonGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    // 1. Gira o planeta em si
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.2;
    // 2. Faz a Lua orbitar ao redor do planeta mais rápido
    if (moonGroupRef.current) moonGroupRef.current.rotation.y += delta * 0.8;
  });

  const isHexagonal = planet.id == 'nodeon';
  const isWireframe = planet.variant === 'wireframe';
  const isRinged = planet.variant === 'ringed';

  return (
    <group>
      {/* --- 1. O CORPO PRINCIPAL DO PLANETA --- */}
      <mesh 
        ref={planetRef} 
        rotation={isHexagonal ? [Math.PI / 2, 0, 0] : [0, 0, 0]}
      >
        {isHexagonal ? (
          <cylinderGeometry args={[1.5, 1.5, 1.5, 6]} />
        ) : (
          <sphereGeometry args={[1.5, 64, 64]} />
        )}
        
        {/* MATERIAL INTELIGENTE: Vira holograma se for wireframe */}
        <meshStandardMaterial 
          color={planet.color} 
          roughness={isWireframe ? 0 : 0.2} 
          metalness={isWireframe ? 1 : 0.6}
          wireframe={isWireframe} 
          emissive={isWireframe ? planet.color : "#000000"} // Brilha se for wireframe
          emissiveIntensity={isWireframe ? 0.5 : 0}
        />
      </mesh>

      {/* --- 2. O ANEL (Se for 'ringed') --- */}
      {isRinged && (
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          {/* Um disco chato com buraco no meio (Torus) */}
          <torusGeometry args={[2.0, 0.1, 2, 64]} />
          <meshStandardMaterial 
            color={planet.color} 
            roughness={0.1} 
            metalness={0.8}
            emissive={planet.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      )}

      {/* --- 3. A LUA (Se hasMoon for true) --- */}
      {planet.hasMoon && (
        <group ref={moonGroupRef}>
          {/* A lua fica deslocada do centro (position x: 2.5) */}
          <mesh position={[2.0, 0, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial 
              color="#ffffff" 
              roughness={0.8} 
              metalness={0.1} 
            />
          </mesh>
        </group>
      )}
    </group>
  );
};

// O "Palco" (Canvas, Luzes e Câmera)
export const Planet3D: React.FC<Planet3DProps> = ({ planet }) => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 6.0], fov: 45 }}>
        
        {/* ILUMINAÇÃO */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color={planet.color} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="white" />

        {/* O PLANETA */}
        <PlanetMesh planet={planet} />

        {/* CONTROLES: Permite o usuário girar o planeta com o mouse! */}
        <OrbitControls 
          enableZoom={false} // Desativa o zoom para não quebrar o layout
          autoRotate={true}  // Gira sozinho quando o mouse solta
          autoRotateSpeed={1.0} 
        />

        {/* EFEITO EXTRA: Um ambiente de reflexo simulado (tipo "Studio") */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};