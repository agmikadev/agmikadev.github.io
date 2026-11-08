import React, { useMemo, useState } from "react";
import { planets } from "../Planetary/data/PlanetaryData";
import { useAllMissions } from "../Planetary/data/hooks";
import {
  canonicalTechList,
  TECH_CATEGORY_LABELS,
  TECH_CATEGORY_ORDER,
  techCategory,
} from "../Planetary/data/technologies";
import { StarBurst } from "../Planetary/UI/Symbols";
import { SaltoRow } from "./SaltoRow";
import "./SaltoScreen.css";

interface SaltoScreenProps {
  initialTech?: string;
}

const AREAS = planets.filter((planet) => planet.shape !== "belt");

export const SaltoScreen: React.FC<SaltoScreenProps> = ({
  initialTech = "all",
}) => {
  const { missions, isLoading } = useAllMissions();
  const [activeArea, setActiveArea] = useState<string>("all");
  const [activeTech, setActiveTech] = useState<string>(initialTech);
  const [query, setQuery] = useState("");

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
  const activeAreaPlanet = AREAS.find((area) => area.id === activeArea);

  const clearFilters = () => {
    setActiveArea("all");
    setActiveTech("all");
    setQuery("");
  };

  return (
    <section className="salto" aria-label="Índice de projetos e experiência">
      <header className="salto__header">
        <div className="salto__heading">
          <div className="salto__kicker">SALTO // ÍNDICE DE PROJETOS</div>
          <h2 className="salto__title">
            <StarBurst size={18} /> SALTO
          </h2>
          <p className="salto__subtitle">
            Projetos e experiência por área e tecnologia. Filtre e vá direto ao que interessa.
          </p>
        </div>

        <div className="salto__count">
          {isLoading ? "..." : `${missions.length} PROJETOS`}
        </div>
      </header>

      <div className="salto__toolbar">
        <label className="salto__search">
          <span className="sr-only">Buscar projetos</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar projeto, tecnologia ou função..."
          />
        </label>

        <div className="salto__area-row">
          <span className="salto__filter-label">ÁREA</span>
          <div className="salto__area-filters" role="group" aria-label="Filtrar por área">
            <button
              type="button"
              className="salto__area-filter"
              aria-pressed={activeArea === "all"}
              onClick={() => setActiveArea("all")}
            >
              TODOS
            </button>
            {AREAS.map((area) => (
              <button
                key={area.id}
                type="button"
                className="salto__area-filter"
                aria-pressed={activeArea === area.id}
                onClick={() => setActiveArea(area.id)}
                style={{ "--area-color": area.color } as React.CSSProperties}
              >
                {area.area}
              </button>
            ))}
          </div>
        </div>

        <label className="salto__tech-select">
          <span className="salto__filter-label">TECNOLOGIA</span>
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

      <div className="salto__body">
        <aside className="salto__tech-index" aria-label="Filtrar por tecnologia">
          <div className="salto__tech-title">TECNOLOGIAS</div>

          <button
            type="button"
            className="salto__tech-all"
            aria-pressed={activeTech === "all"}
            onClick={() => setActiveTech("all")}
          >
            <span>Todas</span>
            <span className="salto__tech-count">{missions.length}</span>
          </button>

          {techGroups.map((group) => (
            <div key={group.category} className="salto__tech-group">
              <div className="salto__tech-category">{group.label}</div>
              {group.items.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className="salto__tech-button"
                  aria-pressed={activeTech === item.name}
                  onClick={() => setActiveTech(item.name)}
                >
                  <span>{item.name}</span>
                  <span className="salto__tech-count">{item.count}</span>
                </button>
              ))}
            </div>
          ))}
        </aside>

        <main className="salto__results">
          <div className="salto__results-header">
            <div className="salto__results-count">
              {isLoading ? "SINCRONIZANDO..." : `${filteredMissions.length} PROJETOS`}
              <span className="salto__results-source">
                {isLoading ? "D1 → CACHE LOCAL" : "D1 + FALLBACK"}
              </span>
            </div>

            <div className="salto__active-filters">
              {activeTech !== "all" && (
                <button
                  type="button"
                  className="salto__filter-chip"
                  onClick={() => setActiveTech("all")}
                >
                  TECNOLOGIA: {activeTech} ✕
                </button>
              )}
              {hasFilters && (
                <button
                  type="button"
                  className="salto__clear"
                  onClick={clearFilters}
                >
                  LIMPAR FILTROS
                </button>
              )}
            </div>
          </div>

          <div className="salto__list">
            {filteredMissions.length === 0 ? (
              <div className="salto__empty">
                Nenhum projeto encontrado para esses filtros.
              </div>
            ) : (
              filteredMissions.map((mission) => (
                <SaltoRow
                  key={mission.id}
                  mission={mission}
                  onTechClick={setActiveTech}
                  perspectivePlanetId={activeArea !== "all" ? activeArea : undefined}
                  perspectiveLabel={activeAreaPlanet?.area}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </section>
  );
};
