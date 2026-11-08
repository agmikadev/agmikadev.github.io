import { useEffect, useMemo, useState } from "react";
import { planets } from "./PlanetaryData";
import { MISSION_ARCHIVE, type MissionType } from "./MissionData";
import { beltDataModel, type BeltMissionReport } from "./BeltData";
import { loadBeltMissions, loadMissions, loadVisitCount, trackVisit } from "@/lib/portfolio-api";

export function usePlanetData(planetId: string) {
  const planet = useMemo(
    () => planets.find((p) => p.id === planetId) ?? null,
    [planetId],
  );

  const missions = useMissions(planetId);

  return { planet, missions };
}

/**
 * Static archive first, D1 in the background. If the Worker is unavailable the
 * visitor still gets the full portfolio from the static fallback.
 */
export function useMissions(planetId: string): MissionType[] {
  const fallback = useMemo(
    () => MISSION_ARCHIVE.filter((mission) => mission.planetIds.includes(planetId)),
    [planetId],
  );
  const [remoteMissions, setRemoteMissions] = useState<MissionType[] | null>(null);

  useEffect(() => {
    let alive = true;
    loadMissions().then((remote) => {
      if (alive && remote) setRemoteMissions(remote);
    });

    return () => {
      alive = false;
    };
  }, []);

  return useMemo(() => {
    if (!remoteMissions) return fallback;

    const filtered = remoteMissions.filter((mission) =>
      mission.planetIds?.includes(planetId),
    );
    return filtered.length > 0 ? filtered : fallback;
  }, [fallback, planetId, remoteMissions]);
}

export function useAllMissions() {
  const [missions, setMissions] = useState<MissionType[]>(MISSION_ARCHIVE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    loadMissions()
      .then((remote) => {
        if (alive && remote && remote.length > 0) setMissions(remote);
      })
      .finally(() => {
        if (alive) setIsLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  return { missions, isLoading };
}

export function useBeltMissions(): BeltMissionReport[] {
  const [missions, setMissions] = useState<BeltMissionReport[]>(
    beltDataModel.missionReports,
  );

  useEffect(() => {
    let alive = true;
    loadBeltMissions().then((remote) => {
      if (alive && remote && remote.length > 0) setMissions(remote);
    });

    return () => {
      alive = false;
    };
  }, []);

  return missions;
}

export function useVisitCount(): number | null {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      let sessionKeyStored = false;
      try {
        sessionKeyStored = sessionStorage.getItem("portfolio:visit-tracked") === "1";
        if (!sessionKeyStored) sessionStorage.setItem("portfolio:visit-tracked", "1");
      } catch {
        // Storage can be unavailable in private mode; the request is still safe.
      }

      const total = sessionKeyStored ? await loadVisitCount() : await trackVisit();
      if (alive) setCount(total ?? (await loadVisitCount()));
    };

    run();

    return () => {
      alive = false;
    };
  }, []);

  return count;
}
