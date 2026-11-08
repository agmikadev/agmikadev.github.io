# Phase 6 Summary — Projects-First Content Refresh & D1

**Status:** Complete (2026-11-08)

## Delivered

- 4 novos cards full-stack: SmartKitchen, HellzDashboard, FootScout e UIMaga.
- `Mission Log` global com busca, filtros por área e 11 projetos.
- Barra "EM DESTAQUE" no primeiro paint com os 4 projetos recentes.
- Labels de área sempre visíveis no sistema solar; codinomes em segundo plano.
- Cards de projeto com imagem, 3 destaques iniciais, stack, links e case
  completo expansível.
- Onboarding compacto com CTAs "VER PROJETOS" e "EXPLORAR SISTEMA".
- Cloudflare Worker + D1:
  - `GET /v1/missions` (11 projetos)
  - `GET /v1/missions?planet=...`
  - `GET /v1/missions?belt=1` (5 relatórios)
  - `POST /v1/visits` (anônimo, sem cookies)
  - `GET /v1/stats`
- Fallback estático em todos os pontos de consumo.
- Contador de visitas no side strip.

## Refinement: two flows + canonical tech index

After review, the interface was split into two explicit navigation flows:

- **ÓRBITA (compassado, default):** the solar-system exploration. A single
  `SALTO` button inside the ÓRBITA screen opens the index; the featured bar,
  side-strip project button and onboarding project CTA were removed.
- **SALTO (expresso):** a dense project index with search, area filters and a
  canonical technology sidebar with project counts. This is the escape hatch for
  recruiters who want to see everything done with a specific technology.
- Technology tags were canonicalized in `data/technologies.ts`: aliases such as
  "React 19", "React.js" and "React" now fold into "React"; generic labels such
  as Git, UI Design and RLS are hidden from tags.
- Cards show at most 4 canonical tags + count. Tags are clickable: on a planet
  card they open SALTO filtered by that technology; inside SALTO they refine the
  active filter.
- Verification: 1 SALTO CTA on the home, 0 featured bars, 0 side-strip project
  buttons, 11 projects in SALTO, 37 canonical technologies in the sidebar, React
  filter returns 5 projects, and the tag bridge opens the same filter from a
  planet card.

## Refinement: per-planet perspectives

Multi-area projects now have a `perspectives` map keyed by planet id in
`src/components/Planetary/data/perspectives.ts`. The same project renders a
different role, summary, highlights, challenge/impact and stack depending on the
selected planet:

- SmartKitchen in DESIGN → Product Designer & Design Systems
- SmartKitchen in FRONT-END → Frontend Engineer
- SmartKitchen in BACK-END → Backend Engineer
- SmartKitchen in INFRA → Deploy & Infra

The planet card shows an `ÓTICA // AREA` label and a `CONTRIBUIÇÃO EM AREA`
section. In SALTO, a specific area filter uses that area's perspective for each
row. D1 stores the perspectives as JSON in the `perspectives` column
(migration `0002_perspectives.sql`); the frontend also falls back to the static
map when the API cache is stale.

## Refinement: SALTO inside the console screen + BEM hierarchy

SALTO stopped being a full-screen portal/modal and became a screen inside the
console stage:

- `ConsoleShell` owns `<main className="console" data-screen="orbit|salto">`
  with `console__header`, `console__body`, `console__stage`, `console__screen`,
  `console__sidebar` and `console__footer`.
- ÓRBITA and SALTO swap inside `.console__screen`; the sidebar and footer stay
  visible in both flows.
- The console header is the only back control (`← ÓRBITA`); SALTO has no
  duplicated back button, backdrop, body lock or portal.
- `MissionLog` became `SaltoScreen`, `ProjectRow` became `SaltoRow`, and
  `MissionCard` became `ProjectCard`.
- Class names follow BEM: `console__*`, `orbit__*`, `planet-hud__*`,
  `salto__*`, `project-card__*`. State uses `data-screen`, `data-variant`,
  `data-perspective` and `aria-pressed`.
- Container queries switch the SALTO tech sidebar to a select and collapse the
  row grid based on the actual console screen width, not the viewport.
- Verified at 1440, 1280, 1024 and 768: no horizontal overflow; back from SALTO
  returns to the previous planet; the tech-tag bridge opens SALTO inside the
  screen.

## Infrastructure

- D1 database: `star-system-portfolio`
- Database ID: `f9a2878d-18d3-4866-8b3c-7a0a752a5911`
- Worker: `https://star-system-portfolio-api.agmikadesign.workers.dev`
- Migrations: `worker/migrations/0001_init.sql`
- Seed gerado por `scripts/generate-d1-seed.ts`

## Verification

- `npm run lint` — sem erros.
- `npm run build` — sucesso.
- API local e remota testadas; CORS liberado para GitHub Pages e Vite local
  (5173/4173).
- Preview de produção sem erros de console.
- Imagens WebP: 26–82 kB cada.
