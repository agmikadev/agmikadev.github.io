import type { MissionType } from "../Planetary/data/MissionData";
import {
  canonicalTechList,
  techCategory,
  type TechCategory,
} from "../Planetary/data/technologies";
import type { CvProjectSelection } from "./data/profile";

const FULL_STACK_CATEGORIES: TechCategory[] = [
  "frontend",
  "backend",
  "database",
  "infra",
];

interface ScoredMission {
  mission: MissionType;
  technologies: string[];
  fullStack: number;
  breadth: number;
  recency: number;
  featured: number;
  areas: number;
  design: number;
  ai: number;
}

const scoreMission = (mission: MissionType): ScoredMission => {
  const technologies = canonicalTechList(mission.technologies);
  const categories = new Set(technologies.map(techCategory));
  const year = Number(mission.year) || 0;

  return {
    mission,
    technologies,
    fullStack: FULL_STACK_CATEGORIES.filter((category) =>
      categories.has(category),
    ).length,
    breadth: categories.size,
    recency: Math.max(0, year - 2020),
    featured: mission.featured ? 1 : 0,
    areas: mission.planetIds?.length ?? 0,
    design: technologies.filter((tech) => techCategory(tech) === "design")
      .length,
    ai: technologies.filter((tech) => techCategory(tech) === "ai").length,
  };
};

const broadScore = (scored: ScoredMission): number =>
  scored.fullStack * 3 +
  scored.breadth * 1.2 +
  scored.recency * 1.5 +
  scored.featured * 2 +
  scored.areas * 0.4;

const nicheScore = (scored: ScoredMission): number => {
  const total = scored.technologies.length || 1;
  const specialization = Math.max(scored.design, scored.ai) / total;
  const narrowness = 1 - Math.min(scored.fullStack, 4) / 4;
  return specialization * 6 + narrowness * 3 + scored.recency * 0.2 + scored.featured * 1.5;
};

const othersScore = (scored: ScoredMission): number =>
  scored.recency * 2 +
  scored.featured * 1.5 +
  scored.breadth * 0.5 +
  scored.fullStack * 0.5 +
  (scored.design > 0 ? 0.5 : 0) +
  (scored.ai > 0 ? 0.3 : 0);

export interface CvProjectSet {
  broad: MissionType[];
  niche: MissionType[];
  others: MissionType[];
  all: MissionType[];
}

/**
 * Picks the most relevant projects by full-stack breadth + recency, and reserves
 * slots for specialized work (design/data-viz or AI) so the CV still shows range.
 */
export const selectCvProjects = (
  missions: MissionType[],
  selection: CvProjectSelection,
): CvProjectSet => {
  const excluded = new Set(selection.excludeIds ?? []);
  const pool = missions
    .filter((mission) => !excluded.has(mission.id))
    .map(scoreMission);

  const broad = [...pool]
    .sort(
      (a, b) =>
        broadScore(b) - broadScore(a) ||
        b.recency - a.recency ||
        a.mission.title.localeCompare(b.mission.title),
    )
    .slice(0, Math.max(0, selection.broad));

  const broadIds = new Set(broad.map((scored) => scored.mission.id));
  const nichePool = pool.filter((scored) => !broadIds.has(scored.mission.id));

  const manual = (selection.nicheIds ?? [])
    .map((id) => nichePool.find((scored) => scored.mission.id === id))
    .filter((scored): scored is ScoredMission => Boolean(scored));
  const manualIds = new Set(manual.map((scored) => scored.mission.id));

  const computed = nichePool
    .filter((scored) => !manualIds.has(scored.mission.id))
    .sort(
      (a, b) =>
        nicheScore(b) - nicheScore(a) ||
        b.recency - a.recency ||
        a.mission.title.localeCompare(b.mission.title),
    );

  const niche = [...manual, ...computed].slice(0, Math.max(0, selection.niche));

  const selectedIds = new Set(
    [...broad, ...niche].map((scored) => scored.mission.id),
  );
  const others = pool
    .filter((scored) => !selectedIds.has(scored.mission.id))
    .sort(
      (a, b) =>
        othersScore(b) - othersScore(a) ||
        b.recency - a.recency ||
        a.mission.title.localeCompare(b.mission.title),
    )
    .slice(0, Math.max(0, selection.others ?? 0));

  const ordered = [...broad, ...niche].map((scored) => scored.mission);

  return {
    broad: broad.map((scored) => scored.mission),
    niche: niche.map((scored) => scored.mission),
    others: others.map((scored) => scored.mission),
    all: ordered,
  };
};
