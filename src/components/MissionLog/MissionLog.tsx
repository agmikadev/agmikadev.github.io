import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { planets } from "../Planetary/data/PlanetaryData";
import { useAllMissions } from "../Planetary/data/hooks";
import {
  canonicalTechList,
  TECH_CATEGORY_LABELS,
  TECH_CATEGORY_ORDER,
  techCategory,
} from "../Planetary/data/technologies";
import { StarBurst } from "../Planetary/UI/Symbols";
import { ProjectRow } from "./ProjectRow";
import "./MissionLog.css";

interface MissionLogProps {
  isOpen: boolean;
  initialTech?: string;
  onClose: () => void;
}

const AREAS = planets.filter((planet) => planet.shape !== "belt");

export const MissionLog: React.FC<MissionLogProps> = ({
  isOpen,
  initialTech = "all",
  onClose,
}) => {
  const { missions, isLoading } = useAllMissions();
  const [activeArea, setActiveArea] = useState<string>("all");
  const [activeTech, setActiveTech] = useState<string>(initialTech);
  const [query, setQuery] = useState("");
  const backButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    backButtonRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  const techGroups = useMemo(() => {
    const counts = new Map<string, number>();

    for (const mission of missions) {
      for (const technology of canonicalTechList(mission.technologies)) {
        counts.set(technology, (counts.get(technology) ?? 0) + 1);
      }
    }

    return TECH_CATEGORY_ORDER.map((category) => ({
      category,
      label: TECH_CATEGORY_LABELS[category],
      items: Array.from(counts.entries())
        .filter(([technology]) => techCategory(technology) === category)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([name, count]) => ({ name, count })),
    })).filter((group) => group.items.length > 0);
  }, [missions]);

  const filteredMissions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return missions
      .filter((mission) => {
        const technologies = canonicalTechList(mission.technologies);

        if (activeArea !== "all" && !mission.planetIds?.includes(activeArea)) {
          return false;
        }
        if (activeTech !== "all" && !technologies.includes(activeTech)) {
          return false;
        }
        if (!normalizedQuery) return true;

        const haystack = [
          mission.title,
          mission.summary,
          mission.role,
          ...technologies,
          ...mission.technologies,
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      })
      .sort((a, b) => Number(b.year) - Number(a.year) || a.title.localeCompare(b.title));
  }, [activeArea, activeTech, missions, query]);

  const hasFilters =
    activeArea !== "all" || activeTech !== "all" || query.trim().length > 0;

  const clearFilters = () => {
    setActiveArea("all");
    setActiveTech("all");
    setQuery("");
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="express-backdrop" onMouseDown={onClose}>
      <section
        className="express-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Salto: índice de projetos e experiência"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="express-header">
          <button
            ref={backButtonRef}
            type="button"
            className="express-back"
            onClick={onClose}
            aria-label="Voltar à órbita"
          >
            ← ÓRBITA
          </button>

          <div className="express-heading">
            <div className="express-kicker">SALTO // ÍNDICE DE PROJETOS</div>
            <h2 className="express-title">
              <StarBurst size={18} /> SALTO
            </h2>
            <p className="express-subtitle">
              Projetos e experiência por área e tecnologia. Filtre e vá direto ao que interessa.
            </p>
          </div>

          <div className="express-count-badge">
            {isLoading ? "..." : `${missions.length} PROJETOS`}
          </div>
        </header>

        <div className="express-toolbar">
          <label className="express-search">
            <span className="sr-only">Buscar projetos</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar projeto, tecnologia ou função..."
            />
          </label>

          <div className="express-area-row">
            <span className="express-filter-label">ÁREA</span>
            <div className="express-area-filters" role="group" aria-label="Filtrar por área">
              <button
                type="button"
                className={`express-area-filter ${activeArea === "all" ? "active" : ""}`}
                onClick={() => setActiveArea("all")}
              >
                TODOS
              </button>
              {AREAS.map((area) => (
                <button
                  key={area.id}
                  type="button"
                  className={`express-area-filter ${activeArea === area.id ? "active" : ""}`}
                  onClick={() => setActiveArea(area.id)}
                  style={{ "--area-color": area.color } as React.CSSProperties}
                >
                  {area.area}
                </button>
              ))}
            </div>
          </div>

          <label className="express-tech-mobile">
            <span className="express-filter-label">TECNOLOGIA</span>
            <select
              value={activeTech}
              onChange={(event) => setActiveTech(event.target.value)}
            >
              <option value="all">Todas as tecnologias</option>
              {techGroups.map((group) => (
                <optgroup key={group.category} label={group.label}>
                  {group.items.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name} ({item.count})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
        </div>

        <div className="express-body">
          <aside className="express-tech-sidebar" aria-label="Filtrar por tecnologia">
            <div className="express-sidebar-title">TECNOLOGIAS</div>

            <button
              type="button"
              className={`express-tech-all ${activeTech === "all" ? "active" : ""}`}
              onClick={() => setActiveTech("all")}
            >
              <span>Todas</span>
              <span className="express-tech-count">{missions.length}</span>
            </button>

            {techGroups.map((group) => (
              <div key={group.category} className="express-tech-group">
                <div className="express-tech-category">{group.label}</div>
                {group.items.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    className={`express-tech-button ${activeTech === item.name ? "active" : ""}`}
                    onClick={() => setActiveTech(item.name)}
                  >
                    <span>{item.name}</span>
                    <span className="express-tech-count">{item.count}</span>
                  </button>
                ))}
              </div>
            ))}
          </aside>

          <main className="express-results">
            <div className="express-results-header">
              <div className="express-results-count">
                {isLoading ? "SINCRONIZANDO..." : `${filteredMissions.length} PROJETOS`}
                <span className="express-results-source">
                  {isLoading ? "D1 → CACHE LOCAL" : "D1 + FALLBACK"}
                </span>
              </div>

              <div className="express-active-filters">
                {activeTech !== "all" && (
                  <button
                    type="button"
                    className="express-filter-chip"
                    onClick={() => setActiveTech("all")}
                  >
                    TECNOLOGIA: {activeTech} ✕
                  </button>
                )}
                {hasFilters && (
                  <button
                    type="button"
                    className="express-clear"
                    onClick={clearFilters}
                  >
                    LIMPAR FILTROS
                  </button>
                )}
              </div>
            </div>

            <div className="express-list">
              {filteredMissions.length === 0 ? (
                <div className="express-empty">
                  Nenhum projeto encontrado para esses filtros.
                </div>
              ) : (
                filteredMissions.map((mission) => (
                  <ProjectRow
                    key={mission.id}
                    mission={mission}
                    onTechClick={setActiveTech}
                  />
                ))
              )}
            </div>
          </main>
        </div>
      </section>
    </div>,
    document.body,
  );
};
