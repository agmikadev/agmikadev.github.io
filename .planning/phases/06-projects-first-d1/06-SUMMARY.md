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

- **ÓRBITA (compassado, default):** the solar-system exploration. One single
  header switch opens the Salto; the featured bar, side-strip project button and
  onboarding project CTA were removed.
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
