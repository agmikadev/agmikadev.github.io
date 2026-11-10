import React, { useCallback, useState, useEffect, useRef } from "react";
import "./PlanetarySystem.css";
import "./PlanetShapes.css";
import { planets, type PlanetModel } from "../data/PlanetaryData";
import { Dashboard } from "./Dashboard/Dashboard";
import { BeltNetwork } from "./BeltNetwork/BeltNetwork";
import { ScreenAction } from "../../ui/ScreenAction";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const CONFIG = {
  centerX: 50,
  centerY: 50,
  orbitScale: 0.08,
  keplerConstant: 15,
};

const PHYSICAL_PLANETS = planets.filter((planet) => planet.shape !== "belt");
const BELT_PLANET = planets.find((planet) => planet.shape === "belt");

interface PlanetarySystemProps {
  selectedPlanet: PlanetModel | null;
  onSelectPlanet: (planet: PlanetModel | null) => void;
  isFetched: boolean;
  onOpenSalto?: () => void;
}

export const PlanetarySystem: React.FC<PlanetarySystemProps> = ({
  selectedPlanet,
  onSelectPlanet,
  isFetched,
  onOpenSalto,
}) => {
  // --- DADOS ---
  const physicalPlanets = PHYSICAL_PLANETS;
  const beltPlanet = BELT_PLANET;

  // --- ESTADOS ---
  const [hoveredPlanetId, setHoveredPlanetId] = useState<string | null>(null);
  const [beltFocused, setBeltFocused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();

  // --- REFS ---
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<
    { type: "planet"; id: string } | { type: "belt" } | null
  >(null);
  const keyboardOpenedRef = useRef(false);
  const planetNodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerWidthRef = useRef<number>(0);
  const containerHeightRef = useRef<number>(0);

  const svgHitboxRef = useRef<SVGPathElement>(null);
  const [pixelCoords, setPixelCoords] = useState<{ x: number; y: number }[]>([]);

  const anglesRef = useRef<number[]>(
    physicalPlanets.map((_, i) => i * ((Math.PI * 2) / physicalPlanets.length)),
  );

  // --- DIMENSION CACHE (ResizeObserver) ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    containerWidthRef.current = container.clientWidth;
    containerHeightRef.current = container.clientHeight;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        containerWidthRef.current = entry.contentRect.width;
        containerHeightRef.current = entry.contentRect.height;
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // --- GAMELOOP ---
  useEffect(() => {
    let frame = 0;

    const animate = () => {
      if (!containerRef.current) return;
      const w = containerWidthRef.current;
      const h = containerHeightRef.current;

      // Physics — reduced motion renders one static frame and stops.
      if (!prefersReducedMotion) {
        anglesRef.current = anglesRef.current.map((angle, i) => {
          const planet = physicalPlanets[i];
          if (hoveredPlanetId === planet.id) return angle;
          const radius = planet.orbitSize * CONFIG.orbitScale;
          const speed = (CONFIG.keplerConstant / radius) * 0.005;
          return angle + speed;
        });
      }

      // Render positions
      const pixelCoords: { x: number; y: number }[] = [];
      physicalPlanets.forEach((planet, i) => {
        const angle = anglesRef.current[i];
        const radius = planet.orbitSize * CONFIG.orbitScale;
        const xPct = CONFIG.centerX + radius * Math.cos(angle);
        const yPct = CONFIG.centerY + radius * Math.sin(angle);
        const xPx = (w * xPct) / 100;
        const yPx = (h * yPct) / 100;
        pixelCoords.push({ x: xPx, y: yPx });
        const node = planetNodesRef.current[i];
        if (node) {
          node.style.transform = `translate3d(${xPx}px, ${yPx}px, 0) translate(-50%, -50%)`;
          if (hoveredPlanetId !== planet.id) {
            node.style.zIndex = Math.floor(yPct).toString();
          }
        }
      });

      const pathData = pixelCoords
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" ");
      const closedPath = `${pathData} Z`;
      if (svgHitboxRef.current) svgHitboxRef.current.setAttribute("d", closedPath);

      setPixelCoords(pixelCoords);
      if (!prefersReducedMotion) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [hoveredPlanetId, physicalPlanets, prefersReducedMotion]);

  const closeDashboard = useCallback(() => {
    onSelectPlanet(null);
    setHoveredPlanetId(null);
    setBeltFocused(false);
  }, [onSelectPlanet]);

  // Restore focus to the trigger by identity after the orbit remounts. This
  // covers Escape, the in-app back control and the browser/system back gesture.
  useEffect(() => {
    if (selectedPlanet) return;

    const trigger = lastTriggerRef.current;
    if (!trigger) return;

    const frame = requestAnimationFrame(() => {
      if (trigger.type === "belt") {
        document
          .querySelector<SVGElement>(".orbit__belt-hitbox")
          ?.focus({ preventScroll: true });
        return;
      }

      document
        .querySelector<HTMLElement>(
          `.orbit__planet[data-planet-id="${CSS.escape(trigger.id)}"]`,
        )
        ?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, [selectedPlanet]);

  // --- KEYBOARD HANDLING (Escape to close HUD) ---
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPlanet) closeDashboard();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedPlanet, closeDashboard]);

  // Keyboard activation moves focus into the HUD; mouse activation does not.
  useEffect(() => {
    if (!selectedPlanet || !keyboardOpenedRef.current) return;
    keyboardOpenedRef.current = false;

    const frame = requestAnimationFrame(() => {
      document
        .querySelector<HTMLElement>(".planet-hud__back")
        ?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, [selectedPlanet]);

  const openPlanet = (planet: PlanetModel, keyboard: boolean) => {
    lastTriggerRef.current =
      planet.shape === "belt"
        ? { type: "belt" }
        : { type: "planet", id: planet.id };
    keyboardOpenedRef.current = keyboard;
    onSelectPlanet(planet);
    setHoveredPlanetId(null);
    setBeltFocused(false);
  };

  const isBeltHovered = beltPlanet && hoveredPlanetId === beltPlanet.id;
  const isBeltActive = Boolean(isBeltHovered || beltFocused);

  return (
    <div className="orbit" ref={containerRef}>
      {isBeltHovered && beltPlanet && !selectedPlanet && (
        <div
          className="orbit__label orbit__label--tooltip"
          style={{
            "--tooltip-x": `${mousePos.x + 15}px`,
            "--tooltip-y": `${mousePos.y + 15}px`,
            "--tooltip-color": beltPlanet.color,
          } as React.CSSProperties}
        >
          {beltPlanet.area}
        </div>
      )}

      {selectedPlanet && selectedPlanet.shape === "belt" ? (
      <Dashboard
        mode="belt"
        isFetched={isFetched}
        onBack={closeDashboard}
      />
    ) : selectedPlanet ? (
      <Dashboard
        planet={selectedPlanet}
        mode="planet"
        isFetched={isFetched}
        onBack={closeDashboard}
      />
      ) : (
        <>
        {onOpenSalto && (
          <ScreenAction
            className="orbit__salto"
            label="SALTO"
            hint="ÍNDICE DE PROJETOS"
            onClick={onOpenSalto}
            ariaLabel="Abrir índice de projetos (Salto)"
            title="Abrir índice de projetos"
            icon={
              <svg
                width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z" />
              </svg>
            }
          />
        )}

        <svg
          className="orbit__svg"
          preserveAspectRatio="none"
        >
            {physicalPlanets.map((p) => {
              const isHovered = hoveredPlanetId === p.id;
              const radius = p.orbitSize * CONFIG.orbitScale;
              return (
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
              className="orbit__ellipse"
            />
              );
            })}

            {beltPlanet && (
              <>
                <BeltNetwork
                  planetPositions={pixelCoords.map((p, i) => ({
                    ...p,
                    color: physicalPlanets[i].color,
                    id: physicalPlanets[i].id,
                  }))}
                  isHovered={isBeltActive}
                  beltColor={beltPlanet.color}
                />
        <path
          tabIndex={0}
          role="button"
          aria-label={`Abrir ${beltPlanet.area} (${beltPlanet.name})`}
          onKeyDown={(e) => {
            if (e.key !== "Enter" && e.key !== " ") return;
            e.preventDefault();
            openPlanet(beltPlanet, true);
          }}
          ref={svgHitboxRef}
          fill="none"
          stroke="transparent"
          strokeWidth="30"
          strokeLinejoin="bevel"
          className="orbit__belt-hitbox"
          onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
          onMouseEnter={() => setHoveredPlanetId(beltPlanet.id)}
          onMouseLeave={() => setHoveredPlanetId(null)}
          onFocus={() => setBeltFocused(true)}
          onBlur={() => setBeltFocused(false)}
          onClick={() => openPlanet(beltPlanet, false)}
        />
              </>
            )}
          </svg>

          {physicalPlanets.map((p, i) => (
            <div
              key={p.id}
              role="button"
              tabIndex={0}
              data-planet-id={p.id}
              aria-label={`Abrir área ${p.area}`}
              onKeyDown={(e) => {
                if (e.key !== "Enter" && e.key !== " ") return;
                e.preventDefault();
                openPlanet(p, true);
              }}
              className="orbit__planet"
              ref={(el) => {
                planetNodesRef.current[i] = el;
              }}
              onClick={() => openPlanet(p, false)}
              onMouseEnter={() => setHoveredPlanetId(p.id)}
              onMouseLeave={() => setHoveredPlanetId(null)}
        style={{
          "--p-color": p.color,
          "--p-size": `${p.size * 2}px`,
        } as React.CSSProperties}
            >
              <div className="orbit__planet-visual" data-shape={p.shape} />
              {p.hasAI && (
                <>
                  <div className="orbit__ai-ring orbit__ai-ring--outer" />
                  <div className="orbit__ai-ring orbit__ai-ring--inner" />
                </>
              )}
              <div
                className={`orbit__label orbit__label--area ${hoveredPlanetId === p.id ? "orbit__label--hovered" : ""}`}
                style={{ "--p-color": p.color } as React.CSSProperties}
              >
                <span className="orbit__label-name">{p.area}</span>
                <span className="orbit__label-code">{p.name}</span>
              </div>
            </div>
          ))}

          <div className="orbit__sun" />

          <div className="orbit__caption" aria-hidden="true">
            <span><strong>ÁREAS</strong> Design · Front-end · Back-end · Dados · Infra</span>
            <span className="orbit__caption-sep">/</span>
            <span><strong>CINTURÃO</strong> IA &amp; Agentic</span>
          </div>
        </>
      )}
    </div>
  );
};
