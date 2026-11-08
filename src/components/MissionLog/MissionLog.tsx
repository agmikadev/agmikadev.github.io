import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { planets } from "../Planetary/data/PlanetaryData";
import { useAllMissions } from "../Planetary/data/hooks";
import { MissionCard } from "../Planetary/UI/Tabs/Missions/MissionCard";
import { StarBurst } from "../Planetary/UI/Symbols";
import "./MissionLog.css";

interface MissionLogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AREAS = planets.filter((planet) => planet.shape !== "belt");

export const MissionLog: React.FC<MissionLogProps> = ({ isOpen, onClose }) => {
  const { missions, isLoading } = useAllMissions();
  const [activeArea, setActiveArea] = useState<string>("all");
  const [query, setQuery] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  const filteredMissions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return missions
      .filter((mission) => {
        if (activeArea !== "all" && !mission.planetIds?.includes(activeArea)) {
          return false;
        }
        if (!normalizedQuery) return true;

        const haystack = [
          mission.title,
          mission.summary,
          mission.role,
          ...(mission.technologies ?? []),
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      })
      .sort((a, b) => {
        if (Boolean(a.featured) !== Boolean(b.featured)) {
          return a.featured ? -1 : 1;
        }
        return Number(b.year) - Number(a.year);
      });
  }, [activeArea, missions, query]);

  if (!isOpen) return null;

  return createPortal(
    <div className="mission-log-backdrop" onMouseDown={onClose}>
      <section
        className="mission-log-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Lista de projetos"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="mission-log-header">
          <div>
            <div className="mission-log-kicker">MISSION CONTROL // PROJETOS</div>
            <h2 className="mission-log-title">
              <StarBurst size={18} /> MISSION LOG
            </h2>
            <p className="mission-log-subtitle">
              Projetos reais por área. Filtre, busque por tecnologia e abra o case completo.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="mission-log-close"
            onClick={onClose}
            aria-label="Fechar lista de projetos"
          >
            ✕
          </button>
        </header>

        <div className="mission-log-toolbar">
          <label className="mission-log-search">
            <span className="sr-only">Buscar projetos</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por projeto, tecnologia ou função..."
            />
          </label>

          <div className="mission-log-filters" role="group" aria-label="Filtrar por área">
            <button
              type="button"
              className={`mission-log-filter ${activeArea === "all" ? "active" : ""}`}
              onClick={() => setActiveArea("all")}
            >
              TODOS
            </button>
            {AREAS.map((area) => (
              <button
                key={area.id}
                type="button"
                className={`mission-log-filter ${activeArea === area.id ? "active" : ""}`}
                onClick={() => setActiveArea(area.id)}
                style={{ "--area-color": area.color } as React.CSSProperties}
              >
                {area.area}
              </button>
            ))}
          </div>
        </div>

        <div className="mission-log-meta">
          <span>
            {isLoading ? "SINCRONIZANDO..." : `${filteredMissions.length} PROJETOS`}
          </span>
          <span className="mission-log-meta-source">
            {isLoading ? "D1 → CACHE LOCAL" : "FONTE: D1 + FALLBACK ESTÁTICO"}
          </span>
        </div>

        <div className="mission-log-scroll">
          {filteredMissions.length === 0 ? (
            <div className="mission-log-empty">
              Nenhum projeto encontrado para esse filtro.
            </div>
          ) : (
            <div className="mission-log-grid">
              {filteredMissions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} compact />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>,
    document.body,
  );
};
