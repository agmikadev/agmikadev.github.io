import type { MissionType } from "@/components/Planetary/data/MissionData";
import type { BeltMissionReport } from "@/components/Planetary/data/BeltData";

const DEFAULT_API_BASE =
  "https://star-system-portfolio-api.agmikadesign.workers.dev";

const API_BASE = (
  import.meta.env.VITE_PORTFOLIO_API_URL || DEFAULT_API_BASE
).replace(/\/$/, "");

const REQUEST_TIMEOUT_MS = 3500;

interface MissionsResponse {
  missions?: unknown;
  count?: number;
}

interface VisitsResponse {
  total?: number | null;
}

interface StatsResponse {
  visits?: number;
}

let missionsPromise: Promise<MissionType[] | null> | null = null;
let beltMissionsPromise: Promise<BeltMissionReport[] | null> | null = null;
let visitRequest: Promise<number | null> | null = null;

async function request<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!API_BASE) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...init?.headers,
      },
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function asMissionList(value: unknown): MissionType[] | null {
  return Array.isArray(value) ? (value as MissionType[]) : null;
}

/**
 * Loads the project cards from D1. The caller keeps the static archive as
 * fallback, so the portfolio still works if the Worker is offline.
 */
export async function loadMissions(): Promise<MissionType[] | null> {
  if (!missionsPromise) {
    missionsPromise = request<MissionsResponse>("/v1/missions").then((data) =>
      asMissionList(data?.missions),
    );
  }
  return missionsPromise;
}

export async function loadBeltMissions(): Promise<BeltMissionReport[] | null> {
  if (!beltMissionsPromise) {
    beltMissionsPromise = request<MissionsResponse>(
      "/v1/missions?belt=1",
    ).then((data) => asMissionList(data?.missions) as BeltMissionReport[] | null);
  }
  return beltMissionsPromise;
}

/**
 * Anonymous, cookie-less page-view counter. One request per browser session.
 */
export async function trackVisit(): Promise<number | null> {
  if (visitRequest) return visitRequest;

  visitRequest = request<VisitsResponse>("/v1/visits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      path: window.location.pathname,
      referrer: document.referrer || null,
    }),
  }).then((data) => (typeof data?.total === "number" ? data.total : null));

  return visitRequest;
}

export async function loadVisitCount(): Promise<number | null> {
  // If a visit write is in flight (React StrictMode mounts effects twice),
  // wait for it before reading the aggregate.
  if (visitRequest) {
    const total = await visitRequest;
    if (total != null) return total;
  }

  const data = await request<StatsResponse>("/v1/stats");
  return typeof data?.visits === "number" ? data.visits : null;
}
