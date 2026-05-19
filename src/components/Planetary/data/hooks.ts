import { useMemo } from "react";
import { planets, type PlanetModel } from "./PlanetaryData";
import { MISSION_ARCHIVE, type MissionType } from "./MissionData";

export function usePlanetData(planetId: string) {
  const planet = useMemo(
    () => planets.find((p) => p.id === planetId) ?? null,
    [planetId],
  );

  const missions = useMemo(
    () => MISSION_ARCHIVE.filter((m) => m.planetIds.includes(planetId)),
    [planetId],
  );

  return { planet, missions };
}

export function useMissions(planetId: string): MissionType[] {
  return useMemo(
    () => MISSION_ARCHIVE.filter((m) => m.planetIds.includes(planetId)),
    [planetId],
  );
}
