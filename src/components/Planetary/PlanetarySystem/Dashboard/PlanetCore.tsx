import React, { useEffect, useMemo, useRef, useState } from "react";
import type { PlanetTool } from "../../data/PlanetaryData";
import { canonicalTech, canonicalTechList } from "../../data/technologies";
import { MISSION_ARCHIVE } from "../../data/MissionData";
import { beltDataModel } from "../../data/BeltData";
import { useSaltoNavigation } from "../../../Salto/SaltoNavigationContext";
import "./PlanetCore.css";

interface PlanetCoreProps {
  codename: string;
  tools: PlanetTool[];
  statsCount?: number;
  hasAI?: boolean;
}

type CoreBucketId =
  | "stack"
  | "interface"
  | "data"
  | "platform"
  | "quality"
  | "ai"
  | "llm"
  | "orchestration"
  | "mcp"
  | "evaluation"
  | "skill"
  | "other";

const BUCKET_LABELS: Record<CoreBucketId, string> = {
  stack: "STACK",
  interface: "INTERFACE",
  data: "DADOS",
  platform: "PLATAFORMA",
  quality: "QUALIDADE",
  ai: "IA",
  llm: "MODELOS",
  orchestration: "ORQUESTRAÇÃO",
  mcp: "PROTOCOLOS",
  evaluation: "AVALIAÇÃO",
  skill: "SKILLS",
  other: "OUTROS",
};

const BUCKET_ORDER: CoreBucketId[] = [
  "stack",
  "interface",
  "data",
  "platform",
  "quality",
  "ai",
  "llm",
  "orchestration",
  "mcp",
  "evaluation",
  "skill",
  "other",
];

/** Groups shown before the "ver tudo" control appears. */
const COLLAPSED_GROUP_LIMIT = 4;

/** Raw `PlanetTool.category` values folded into readable groups for the HUD. */
const CATEGORY_TO_BUCKET: Record<string, CoreBucketId> = {
  framework: "stack",
  language: "stack",
  runtime: "stack",
  state: "stack",
  styling: "interface",
  animation: "interface",
  "3d": "interface",
  design: "interface",
  database: "data",
  orm: "data",
  data: "data",
  "data-viz": "data",
  validation: "data",
  auth: "platform",
  build: "platform",
  ci: "platform",
  containers: "platform",
  edge: "platform",
  hosting: "platform",
  pkg: "platform",
  serverless: "platform",
  vcs: "platform",
  testing: "quality",
  forms: "stack",
  ai: "ai",
  ml: "ai",
  ocr: "ai",
  prompt: "ai",
  rag: "ai",
  vision: "ai",
  llm: "llm",
  orchestration: "orchestration",
  mcp: "mcp",
  evaluation: "evaluation",
  skill: "skill",
};

/** Techs that exist in the SALTO index, so a chip never opens an empty filter. */
const LISTED_TECHNOLOGIES = new Set(
  [...MISSION_ARCHIVE, ...beltDataModel.missionReports].flatMap((mission) =>
    canonicalTechList(mission.technologies),
  ),
);

interface CoreTool {
  id: string;
  name: string;
  canonical: string | null;
  navigable: boolean;
}

interface CoreGroup {
  id: CoreBucketId;
  label: string;
  tools: CoreTool[];
}

const buildGroups = (tools: PlanetTool[]): CoreGroup[] => {
  const groups = new Map<CoreBucketId, CoreTool[]>();
  const seen = new Set<string>();

  for (const tool of tools) {
    const bucket = CATEGORY_TO_BUCKET[tool.category ?? ""] ?? "other";
    const canonical = canonicalTech(tool.name);
    const name = canonical ?? tool.name;

    if (seen.has(name)) continue;
    seen.add(name);

    const entries = groups.get(bucket) ?? [];
    entries.push({
      id: tool.id,
      name,
      canonical,
      navigable: canonical !== null && LISTED_TECHNOLOGIES.has(canonical),
    });
    groups.set(bucket, entries);
  }

  return BUCKET_ORDER.flatMap((id) => {
    const entries = groups.get(id);
    return entries ? [{ id, label: BUCKET_LABELS[id], tools: entries }] : [];
  });
};

/**
 * Bottom-anchored stack index for the planet HUD. Every chip that exists in the
 * project archive filters SALTO by that technology; the rest stay informational.
 */
export const PlanetCore: React.FC<PlanetCoreProps> = ({
  codename,
  tools,
  statsCount = 0,
  hasAI = false,
}) => {
  const navigation = useSaltoNavigation();
  const [expanded, setExpanded] = useState(false);
  const groupsRef = useRef<HTMLDivElement>(null);
  const groups = useMemo(() => buildGroups(tools), [tools]);
  const uniqueCount = useMemo(
    () => groups.reduce((total, group) => total + group.tools.length, 0),
    [groups],
  );
  const hasMoreGroups = groups.length > COLLAPSED_GROUP_LIMIT;
  const visibleGroups = expanded ? groups : groups.slice(0, COLLAPSED_GROUP_LIMIT);
  const hiddenGroups = groups.length - visibleGroups.length;

  // When the extra groups do not fit, reveal them instead of silently
  // appending content below the fold (overlay scrollbars are invisible here).
  useEffect(() => {
    const container = groupsRef.current;
    if (!container) return;
    container.scrollTop = expanded ? container.scrollHeight : 0;
  }, [expanded]);

  if (tools.length === 0) return null;

  return (
    <section
      className={`planet-core ${expanded ? "planet-core--expanded" : ""}`}
      aria-label={`Stack do setor ${codename}`}
    >
      <header className="planet-core__header">
        <span className="planet-core__label">CORE // {codename}</span>
        <span className="planet-core__count">{uniqueCount}</span>
      </header>

      <div className="planet-core__groups" id="planet-core-groups" ref={groupsRef}>
        {visibleGroups.map((group, groupIndex) => (
          <div key={group.id} className="planet-core__group">
            <span className="planet-core__group-label">{group.label}</span>
            <div className="planet-core__tools">
              {group.tools.map((tool) =>
                tool.navigable && navigation ? (
                  <button
                    key={tool.id}
                    type="button"
                    className="planet-core__tool planet-core__tool--button"
                    onClick={() => navigation.openSalto(tool.canonical!)}
                    aria-label={`Ver projetos com ${tool.name}`}
                    title={`Ver projetos com ${tool.name}`}
                  >
                    {tool.name}
                  </button>
                ) : (
                  <span key={tool.id} className="planet-core__tool">
                    {tool.name}
                  </span>
                ),
              )}
              {groupIndex === 0 && (
                <span className="planet-core__rest">
                  +{uniqueCount - group.tools.length}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <footer className="planet-core__footer">
        <div className="planet-core__meta">
          {statsCount > 0 && <span>{statsCount} COMPETÊNCIAS</span>}
          {hasAI && <span className="planet-core__signal">IA INTEGRADA</span>}
        </div>

        {hasMoreGroups && (
          <button
            type="button"
            className="planet-core__toggle"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
            aria-controls="planet-core-groups"
          >
            {expanded ? "RECOLHER" : `VER TUDO (+${hiddenGroups})`}
          </button>
        )}
      </footer>
    </section>
  );
};
