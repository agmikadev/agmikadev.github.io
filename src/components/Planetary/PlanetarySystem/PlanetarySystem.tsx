import React, { useState, useEffect, useRef } from "react";
import "./PlanetarySystem.css";
import "./PlanetShapes.css";
import { planets, type PlanetModel } from "../data/PlanetaryData";
import { PlanetDashboard } from "./PlanetaryDashboard/PlanetaryDashboard";

const CONFIG = {
  centerX: 50,
  centerY: 50,
  orbitScale: 0.07,
  keplerConstant: 15,
};

export const PlanetarySystem: React.FC = () => {
  // --- DADOS ---
  const physicalPlanets = planets.filter((p) => p.shape !== "belt");
  const beltPlanet = planets.find((p) => p.shape === "belt");

  // --- ESTADOS ---
  const [hoveredPlanetId, setHoveredPlanetId] = useState<string | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetModel | null>(
    null,
  );
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // --- REFS ---
  const requestRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const planetNodesRef = useRef<(HTMLDivElement | null)[]>([]);

  const svgPathRef = useRef<SVGPathElement>(null);
  const svgHitboxRef = useRef<SVGPathElement>(null);

  const anglesRef = useRef<number[]>(
    physicalPlanets.map((_, i) => i * ((Math.PI * 2) / physicalPlanets.length)),
  );

  // --- GAMELOOP ---
  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) return;

      // Captura dimensões reais para garantir sincronia Pixel-Perfect
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      // 1. Física
      anglesRef.current = anglesRef.current.map((angle, i) => {
        const planet = physicalPlanets[i];
        if (hoveredPlanetId === planet.id) return angle;

        const radius = planet.orbitSize * CONFIG.orbitScale;
        const speed = (CONFIG.keplerConstant / radius) * 0.005;
        return angle + speed;
      });

      // 2. Renderização (Cálculo Unificado em Pixels)
      // Array para guardar coordenadas EXATAS em PIXELS
      const pixelCoords: { x: number; y: number }[] = [];

      physicalPlanets.forEach((planet, i) => {
        const angle = anglesRef.current[i];
        const radius = planet.orbitSize * CONFIG.orbitScale;

        // Percentual para lógica angular
        const xPct = CONFIG.centerX + radius * Math.cos(angle);
        const yPct = CONFIG.centerY + radius * Math.sin(angle);

        // Conversão para Pixels Absolutos
        const xPx = (w * xPct) / 100;
        const yPx = (h * yPct) / 100;

        // Guardamos o Pixel exato para o SVG usar depois
        pixelCoords.push({ x: xPx, y: yPx });

        const node = planetNodesRef.current[i];
        if (node) {
          // DIV usa Pixel
          node.style.transform = `translate3d(${xPx}px, ${yPx}px, 0) translate(-50%, -50%)`;
          if (hoveredPlanetId !== planet.id) {
            node.style.zIndex = Math.floor(yPct).toString();
          }
        }
      });

      // 3. Atualiza SVG usando PIXELS (Pixel Matching)
      // Antes usávamos %, o que causava o drift. Agora é idêntico ao DIV.
      const pathData = pixelCoords
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" ");
      const closedPath = `${pathData} Z`;

      if (svgPathRef.current) svgPathRef.current.setAttribute("d", closedPath);
      if (svgHitboxRef.current)
        svgHitboxRef.current.setAttribute("d", closedPath);

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [hoveredPlanetId, physicalPlanets]);

  const isBeltHovered = beltPlanet && hoveredPlanetId === beltPlanet.id;

  return (
    <div className="solar-system-container" ref={containerRef}>
      {isBeltHovered && beltPlanet && (
        <div
          className="planet-label"
          style={{
            position: "fixed",
            left: mousePos.x + 15,
            top: mousePos.y + 15,
            opacity: 1,
            pointerEvents: "none",
            zIndex: 9999,
            color: beltPlanet.color,
            borderColor: beltPlanet.color,
            boxShadow: `0 0 10px ${beltPlanet.color}`,
          }}
        >
          {beltPlanet.name}
        </div>
      )}

      {selectedPlanet ? (
        <PlanetDashboard
          planet={selectedPlanet}
          onClose={() => {
            setSelectedPlanet(null);
            setHoveredPlanetId(null);
          }}
        />
      ) : (
        <>
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 1,
            }}
            preserveAspectRatio="none"
          >
            {physicalPlanets.map((p) => {
              const isHovered = hoveredPlanetId === p.id;
              const radius = p.orbitSize * CONFIG.orbitScale;
              // Para as órbitas circulares estáticas, mantemos em % usando cx/cy com sufixo '%'
              // Isso é seguro pois elas não se movem a cada frame.
              return (
                // rx={`${radius}%`} -> Usa % da LARGURA
                // ry={`${radius}%`} -> Usa % da ALTURA
                <ellipse
                  key={`orbit-${p.id}`}
                  cx={`${CONFIG.centerX}%`}
                  cy={`${CONFIG.centerY}%`}
                  rx={`${radius}%`}
                  ry={`${radius}%`}
                  fill="none"
                  stroke={isHovered ? p.color : "rgba(255, 255, 255, 0.08)"}
                  strokeWidth={isHovered ? 2 : 1}
                  strokeOpacity={isHovered ? 1 : 0.5}
                  style={{ transition: "all 0.3s ease" }}
                />
              );
            })}

            {beltPlanet && (
              <>
                <path
                  ref={svgPathRef}
                  fill={beltPlanet.color}
                  fillOpacity={0.03}
                  stroke={beltPlanet.color}
                  strokeWidth={isBeltHovered ? "2" : "1"} // Pixels agora (antes 0.15)
                  strokeOpacity={isBeltHovered ? "1" : "0.6"}
                  strokeDasharray="4, 4" // Ajustado para Pixels
                  strokeLinejoin="bevel"
                  strokeLinecap="butt"
                  style={{
                    transition:
                      "stroke-width 0.3s ease, stroke-opacity 0.3s ease",
                    pointerEvents: "none",
                  }}
                  filter={
                    isBeltHovered
                      ? `drop-shadow(0 0 5px ${beltPlanet.color})`
                      : "none"
                  }
                />

                <path
                  ref={svgHitboxRef}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="30" // Pixels (hitbox gorda)
                  strokeLinejoin="bevel"
                  style={{ cursor: "pointer", pointerEvents: "stroke" }}
                  onMouseMove={(e) =>
                    setMousePos({ x: e.clientX, y: e.clientY })
                  }
                  onMouseEnter={() => setHoveredPlanetId(beltPlanet.id)}
                  onMouseLeave={() => setHoveredPlanetId(null)}
                  onClick={() => setSelectedPlanet(beltPlanet)}
                />
              </>
            )}
          </svg>

          {physicalPlanets.map((p, i) => (
            <div
              key={p.id}
              className="planet-node"
              ref={(el) => {
                planetNodesRef.current[i] = el;
              }}
              onClick={() => {
                setSelectedPlanet(p);
                setHoveredPlanetId(null);
              }}
              onMouseEnter={() => setHoveredPlanetId(p.id)}
              onMouseLeave={() => setHoveredPlanetId(null)}
              style={
                {
                  "--p-color": p.color,
                  "--p-size": `${p.size * 2}px`,
                  zIndex: 10,
                } as React.CSSProperties
              }
            >
              <div className={`planet-visual shape-${p.shape}`} />

              {p.hasAI && (
                <>
                  <div className="ai-ring outer" />
                  <div className="ai-ring inner" />
                </>
              )}

              <div
                className="planet-label"
                style={{
                  color: p.color,
                  opacity: hoveredPlanetId === p.id ? 1 : 0,
                  transform:
                    hoveredPlanetId === p.id
                      ? "translateY(0)"
                      : "translateY(-10px)",
                }}
              >
                {p.name}
              </div>
            </div>
          ))}

          <div className="sun-center" />
        </>
      )}
    </div>
  );
};
