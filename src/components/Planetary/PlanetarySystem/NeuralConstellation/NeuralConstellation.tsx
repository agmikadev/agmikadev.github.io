import React, { useEffect, useRef } from "react";
import { planets } from "../../data/PlanetaryData";

// Configurações para sincronizar com o seu CSS existente
// Ajuste o 'baseSpeed' até que as linhas acompanhem seus planetas perfeitamente
const CONFIG = {
  baseSpeed: 0.05, 
  centerScreen: { x: 50, y: 50 }, // Assumindo coordenadas em % (50% 50%)
};

export const NeuralConstellation: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const time = Date.now() * 0.001; // Tempo atual em segundos

      // Vamos calcular a coordenada (X, Y) de cada planeta em tempo real
      const points = planets.map((planet, index) => {
        // O raio da órbita (baseado no orbitSize do seu data)
        // Dividimos por 2 pois orbitSize costuma ser diâmetro
        // Multiplicamos por um fator de escala para converter pixels em % ou VW
        // NOTA: Você precisará ajustar esse '0.3' para bater com a escala da sua tela
        const radius = planet.orbitSize * 0.3; 

        // A velocidade angular
        // Se no CSS um planeta rápido tem speed baixo (segundos), aqui invertemos a lógica
        // Ou ajustamos conforme seu 'planet.speed'
        const speed = planet.speed * CONFIG.baseSpeed;
        
        // Offset para que eles não comecem todos alinhados (opcional, baseada no index)
        const offset = index * 2; 

        // Matemática Orbital Básica:
        // X = Centro + Raio * cos(tempo * velocidade)
        // Y = Centro + Raio * sen(tempo * velocidade)
        const x = CONFIG.centerScreen.x + radius * Math.cos(time * speed + offset);
        const y = CONFIG.centerScreen.y + radius * Math.sin(time * speed + offset);

        return `${x},${y}`;
      });

      // Desenha a linha conectando os pontos: M(move) L(line) L(line)...
      if (pathRef.current) {
        // Cria um caminho que conecta P1 -> P2 -> P3 -> P4...
        pathRef.current.setAttribute("d", `M ${points.join(" L ")}`);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <svg
      ref={svgRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // Deixa o mouse passar para clicar nos planetas
        zIndex: 0, // Fica atrás dos planetas, mas na frente do fundo
        overflow: "visible"
      }}
      // O viewBox define o sistema de coordenadas (0 a 100 para X e Y facilita o %)
      viewBox="0 0 100 100" 
      preserveAspectRatio="none"
    >
      <defs>
        {/* Um brilho neon para a linha */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* A LINHA DA CONSTELAÇÃO */}
      <path
        ref={pathRef}
        fill="none"
        stroke="#00ffff"       // Cor da IA
        strokeWidth="0.2"      // Linha fina e elegante
        strokeOpacity="0.4"    // Translúcida
        filter="url(#glow)"
        strokeDasharray="1, 1" // Pontilhada (opcional, remova para linha sólida)
      />
      
      {/* (Opcional) Vértices/Nós nos pontos de conexão */}
      {/* Isso exigiria renderizar <circle> dinâmicos no loop acima */}
    </svg>
  );
};