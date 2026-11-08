interface Env {
  DB: D1Database;
  ALLOWED_ORIGINS?: string;
}

interface MissionRow {
  id: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  planet_ids: string;
  highlights: string;
  challenges: string;
  impact: string;
  ai_workflow: string | null;
  technologies: string;
  links: string;
  perspectives: string;
  image_url: string | null;
  featured: number;
  is_belt: number;
  sort_order: number;
}

interface MissionLink {
  label: string;
  url: string;
}

const DEFAULT_ALLOWED_ORIGINS = [
  "https://agmikadev.github.io",
  "https://angelomikaa.github.io",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

function allowedOrigins(env: Env): string[] {
  const configured = env.ALLOWED_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return configured && configured.length > 0
    ? configured
    : DEFAULT_ALLOWED_ORIGINS;
}

function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get("Origin");
  if (!origin || !allowedOrigins(env).includes(origin)) {
    return { Vary: "Origin" };
  }

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(
  request: Request,
  env: Env,
  data: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...SECURITY_HEADERS,
      ...corsHeaders(request, env),
      ...extraHeaders,
    },
  });
}

function parseJsonArray<T>(value: string | null): T[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function parseJsonObject<T>(value: string | null): T | undefined {
  if (!value) return undefined;
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return undefined;
    }
    return parsed as T;
  } catch {
    return undefined;
  }
}

function parseMission(row: MissionRow) {
  return {
    id: row.id,
    title: row.title,
    year: row.year,
    role: row.role,
    summary: row.summary,
    planetIds: parseJsonArray<string>(row.planet_ids),
    highlights: parseJsonArray<string>(row.highlights),
    challenges: row.challenges,
    impact: row.impact,
    aiWorkflow: row.ai_workflow ?? undefined,
    technologies: parseJsonArray<string>(row.technologies),
    external_links: parseJsonArray<MissionLink>(row.links),
    perspectives: parseJsonObject<Record<string, unknown>>(row.perspectives),
    imageUrl: row.image_url ?? undefined,
    featured: row.featured === 1,
    isBelt: row.is_belt === 1,
  };
}

async function listMissions(
  env: Env,
  planet: string | null,
  belt: boolean,
): Promise<ReturnType<typeof parseMission>[]> {
  let query: string;
  const bindings: string[] = [];

  if (belt) {
    query =
      "SELECT * FROM missions WHERE is_belt = 1 ORDER BY featured DESC, sort_order ASC";
  } else if (planet) {
    query = `SELECT DISTINCT m.*
             FROM missions m, json_each(m.planet_ids) AS j
             WHERE m.is_belt = 0 AND j.value = ?
             ORDER BY m.featured DESC, m.sort_order ASC`;
    bindings.push(planet);
  } else {
    query =
      "SELECT * FROM missions WHERE is_belt = 0 ORDER BY featured DESC, sort_order ASC";
  }

  const statement = env.DB.prepare(query);
  const result = bindings.length
    ? await statement.bind(...bindings).all<MissionRow>()
    : await statement.all<MissionRow>();

  return (result.results ?? []).map(parseMission);
}

async function handleVisits(request: Request, env: Env): Promise<Response> {
  const contentType = request.headers.get("Content-Type") ?? "";
  if (!contentType.includes("application/json")) {
    return json(request, env, { error: "Content-Type must be application/json" }, 415);
  }

  const body = (await request.json().catch(() => null)) as
    | { path?: unknown; referrer?: unknown; honeypot?: unknown }
    | null;

  if (!body || typeof body !== "object") {
    return json(request, env, { error: "Invalid JSON body" }, 400);
  }

  // Honeypot: silent success for bots that fill hidden fields.
  if (typeof body.honeypot === "string" && body.honeypot.trim() !== "") {
    return json(request, env, { total: null }, 202);
  }

  const path =
    typeof body.path === "string" && body.path.startsWith("/")
      ? body.path.slice(0, 200)
      : "/";
  const referrer =
    typeof body.referrer === "string"
      ? body.referrer.slice(0, 500)
      : (request.headers.get("Referer")?.slice(0, 500) ?? null);
  const country = request.cf?.country ?? request.headers.get("CF-IPCountry") ?? null;
  const userAgent = request.headers.get("User-Agent")?.slice(0, 300) ?? null;

  await env.DB.prepare(
    "INSERT INTO visits (path, referrer, country, user_agent) VALUES (?, ?, ?, ?)",
  )
    .bind(path, referrer, country, userAgent)
    .run();

  const total = await env.DB.prepare("SELECT COUNT(*) AS total FROM visits").first<{
    total: number;
  }>();

  return json(request, env, { total: total?.total ?? null }, 201, {
    "Cache-Control": "no-store",
  });
}

async function handleStats(request: Request, env: Env): Promise<Response> {
  const [visits, missions] = await Promise.all([
    env.DB.prepare("SELECT COUNT(*) AS total FROM visits").first<{ total: number }>(),
    env.DB.prepare("SELECT COUNT(*) AS total FROM missions").first<{ total: number }>(),
  ]);

  return json(
    request,
    env,
    {
      visits: visits?.total ?? 0,
      missions: missions?.total ?? 0,
    },
    200,
    { "Cache-Control": "public, max-age=30" },
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          ...SECURITY_HEADERS,
          ...corsHeaders(request, env),
        },
      });
    }

    try {
      if (url.pathname === "/" && request.method === "GET") {
        return json(request, env, {
          name: "star-system-portfolio-api",
          endpoints: [
            "GET /health",
            "GET /v1/missions",
            "GET /v1/missions?planet=interactron",
            "GET /v1/missions?belt=1",
            "POST /v1/visits",
            "GET /v1/stats",
          ],
        });
      }

      if (url.pathname === "/health" && request.method === "GET") {
        return json(request, env, {
          status: "ok",
          service: "star-system-portfolio-api",
          timestamp: new Date().toISOString(),
        });
      }

      if (url.pathname === "/v1/missions" && request.method === "GET") {
        const planet = url.searchParams.get("planet");
        const belt = url.searchParams.get("belt") === "1";
        const missions = await listMissions(env, planet, belt);

        return json(
          request,
          env,
          { missions, count: missions.length, source: "d1" },
          200,
          { "Cache-Control": "public, max-age=60, s-maxage=300" },
        );
      }

      const missionMatch = url.pathname.match(/^\/v1\/missions\/([^/]+)$/);
      if (missionMatch && request.method === "GET") {
        const id = decodeURIComponent(missionMatch[1]);
        const row = await env.DB.prepare("SELECT * FROM missions WHERE id = ?")
          .bind(id)
          .first<MissionRow>();

        if (!row) {
          return json(request, env, { error: "Mission not found" }, 404);
        }

        return json(request, env, { mission: parseMission(row) });
      }

      if (url.pathname === "/v1/visits" && request.method === "POST") {
        return handleVisits(request, env);
      }

      if (url.pathname === "/v1/stats" && request.method === "GET") {
        return handleStats(request, env);
      }

      return json(request, env, { error: "Not found" }, 404);
    } catch (error) {
      console.error("portfolio-api error", error);
      return json(request, env, { error: "Internal server error" }, 500);
    }
  },
};
