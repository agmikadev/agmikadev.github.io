import React, { useEffect, useMemo, useRef, useState } from "react";
import { planets } from "../Planetary/data/PlanetaryData";
import { useAllMissions } from "../Planetary/data/hooks";
import {
  canonicalTechList,
  TECH_CATEGORY_LABELS,
  TECH_CATEGORY_ORDER,
  techCategory,
} from "../Planetary/data/technologies";
import { StarBurst } from "../Planetary/UI/Symbols";
import { ScreenAction } from "../ui/ScreenAction";
import { Input } from "../ui/input";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { ProjectCollection, ProjectViewToggle, useProjectView } from "../Projects";
import "./SaltoScreen.css";

interface SaltoScreenProps {
  initialTech?: string;
  onBack: () => void;
}

const AREAS = planets.filter((planet) => planet.shape !== "belt");

const BACK_ICON = (
  <svg
    width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const SaltoScreen: React.FC<SaltoScreenProps> = ({
  initialTech = "all",
  onBack,
}) => {
  const { missions, isLoading } = useAllMissions();
  const { view } = useProjectView();
  const [activeArea, setActiveArea] = useState<string>("all");
  const [activeTech, setActiveTech] = useState<string>(initialTech);
  const [query, setQuery] = useState("");
  const [bodyReady, setBodyReady] = useState(false);
  const screenRef = useRef<HTMLElement>(null);

  // Mount the shell first and the dense body in the following task. On slower
  // machines the full SALTO tree (tech index + project cards) costs a ~100ms
  // task; splitting it lets the screen paint immediately instead of freezing.
  useEffect(() => {
    const timeout = window.setTimeout(() => setBodyReady(true), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  // Move focus into the screen so keyboard users do not lose context when the
  // orbit (and the SALTO trigger) unmounts. Focus the back action rather than
  // the section: focusing the whole screen forces a costly focusable-area/layout
  // flush (~100ms on low-end machines). The back action is the first tab stop.
  useEffect(() => {
    screenRef.current
      ?.querySelector<HTMLElement>(".salto__back")
      ?.focus({ preventScroll: true });
  }, []);

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

  return (
    <section
      ref={screenRef}
      className="salto"
      aria-label="Índice de projetos e experiência"
    >
      <header className="salto__header">
        <ScreenAction
          className="salto__back"
          label="ÓRBITA"
          icon={BACK_ICON}
          onClick={onBack}
          ariaLabel="Voltar à órbita"
        />

        <div className="salto__heading">
          <h2 className="salto__title">
            <StarBurst size={18} /> SALTO
          </h2>
        </div>

        <div className="salto__count">
          {isLoading ? "..." : `${missions.length} PROJETOS`}
        </div>
      </header>

      <div className="salto__toolbar">
        <label className="salto__search">
          <span className="sr-only">Buscar projetos</span>
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar projeto, tecnologia ou função..."
          />
        </label>

        <div className="salto__area-row">
          <span className="salto__filter-label">ÁREA</span>
          <ToggleGroup
            type="single"
            value={activeArea}
            onValueChange={(value) => {
              if (value) setActiveArea(value);
            }}
            className="salto__area-filters"
            aria-label="Filtrar por área"
          >
            <ToggleGroupItem value="all" className="salto__area-filter">
              TODOS
            </ToggleGroupItem>
            {AREAS.map((area) => (
              <ToggleGroupItem
                key={area.id}
                value={area.id}
                className="salto__area-filter"
                style={{ "--area-color": area.color } as React.CSSProperties}
              >
                {area.area}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
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

      {bodyReady && (
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
              </div>

              <div className="salto__results-tools">
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

                <ProjectViewToggle />
              </div>
            </div>

            <div className="salto__list" data-view={view}>
              <ProjectCollection
                missions={filteredMissions}
                onTechClick={setActiveTech}
                perspectivePlanetId={activeArea !== "all" ? activeArea : undefined}
                emptyMessage="Nenhum projeto encontrado para esses filtros."
              />
            </div>
          </main>
        </div>
      )}
    </section>
  );
};
