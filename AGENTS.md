# Star System Portfolio — Agent Instructions

## Project Context

**Project:** Star System Portfolio
**Type:** 3D interactive space-themed developer portfolio
**Stack:** React 19 + TypeScript + Rolldown-Vite + Three.js/R3F + drei + Tailwind 4 + shadcn primitives
**Deployment:** GitHub Pages (static SPA)

**What This Is:** A 3D space portfolio where planets represent real development areas (Design → Front-end → Back-end → Dados & Algoritmos → Infra & Deploy). An AI "sonda network" belt connects all planets, representing agentic skills. The theme is navigation, not lore.

**Two navigation flows, one console:**
- **ÓRBITA (default, compassado):** explore the solar system, planets, case cards and AI belt at the visitor's pace.
- **SALTO (expresso):** a single `SALTO` button inside the ÓRBITA screen swaps the console screen to a dense project index with search, area filters and a canonical technology sidebar with counts. It is a screen inside `.console__screen`, not a modal; the console sidebar and footer stay visible. The header renders only the CLI command line; navigation controls (`SALTO`, `← ÓRBITA`, `← SISTEMA`) live inside the panel via the shared `screen-action` block.

Technology tags are canonical (see `src/components/Planetary/data/technologies.ts`); aliases like "React 19"/"React.js" fold into "React". Clicking a tech tag opens the Salto index filtered by that technology.

**Per-planet perspectives:** multi-area projects carry a `perspectives` map keyed by planet id (see `src/components/Planetary/data/perspectives.ts`). The same project changes role, summary, highlights, challenge/impact and stack depending on the selected planet. In SALTO, an active area filter uses that area's perspective.

**Class hierarchy (BEM):** `console__*` is the shell; `orbit__*` is the planetary screen; `planet-hud__*` is the planet dashboard; `salto__*` is the index screen; `project-card__*` is the shared project card; `screen-action__*` is the in-panel navigation control. State uses `data-screen="orbit|salto"`, `data-variant="planet|belt"`, `data-perspective="..."` and `aria-pressed` on filters instead of modifier classes. Keep the console chrome visible in both screens; the header is only the CLI line.

**Core Value:** Visually demonstrate full-stack development proficiency — including cutting-edge agentic/AI skills — in a way that impresses both technical peers and hiring managers.

## GSD Workflow Enforcement

This project uses the Get Shit Done (GSD) workflow. All work must follow these rules:

1. **Never skip phases** — Each phase must go through: discuss → plan → execute → verify
2. **Read artifacts first** — Always read ROADMAP.md, STATE.md, and REQUIREMENTS.md before starting work
3. **Follow the roadmap** — Work on the current phase only. Don't jump ahead.
4. **Commit atomically** — Each plan gets its own commit.
5. **Verify before marking complete** — Check success criteria before marking a phase done.

## Current State

**Active Phase:** Phase 4 complete — Polish & Accessibility
**Next:** Phase 5 production readiness (error boundary, SEO, bundle code-splitting)

**Key Files:**
- `.planning/ROADMAP.md` — Phase structure and success criteria
- `.planning/STATE.md` — Current project state
- `.planning/REQUIREMENTS.md` — v1 requirements with traceability
- `.planning/PROJECT.md` — Full project context
- `.planning/phases/04-polish-accessibility/` — Phase 4 plans and summary
- `.planning/phases/06-projects-first-d1/` — Phase 6 plan and summary
- `.planning/config.json` — Workflow preferences (YOLO, fine granularity, parallel, genius models)

## Technical Constraints

- **Deployment:** GitHub Pages — must work as static SPA
- **Performance:** 60fps target on mid-range hardware, DPR capped at 2
- **Data:** Static TypeScript archive is the source of truth and fallback; Cloudflare D1 serves the same content at runtime
- **D1:** Public read-only content API + anonymous session counter; no public writes to project data
- **Three.js:** Pinned to 0.182.0 (do not upgrade without checking R3F/drei compatibility)
- **React 19:** Required for @react-three/fiber v9 and postprocessing v3
- **Design tokens:** `src/styles/tokens.css` is the source of truth; `npm run check:tokens` blocks raw layout dimensions
- **Quality gates:** `lint`, `lint:css`, `check:tokens` run in CI before build; `npm run test:visual` covers layout (1440/1280/1024/768), keyboard/focus, reduced motion and SALTO pixel snapshots locally
- **Keyboard contract:** belt and planets are buttons; keyboard-opened HUD focuses `← SISTEMA`; closing restores focus after the orbit remounts; Escape closes HUD and SALTO
- **External links:** any link that opens another site uses `ExternalLinkIcon` and an `aria-label` ending in “(abre em nova aba)”; mailto links do not get the arrow
- **Reduced motion:** `usePrefersReducedMotion` stops the orbit loop and 3D animation; CSS transitions are disabled
- **shadcn scope:** primitives only (`Button`, `Input`, `ToggleGroup`); HUD/3D styling stays in tokenized CSS

## Codebase Structure

```
src/
├── components/
│   ├── ConsoleShell.tsx       # Console shell: header, stage, sidebar, footer
│   ├── ConsoleHeader/         # CLI command line only
│   ├── Salto/                 # SALTO screen, rows, technology navigation
│   ├── Planetary/             # ÓRBITA screen
│   │   ├── data/              # Archive, D1 hooks, technologies, perspectives
│   │   ├── PlanetarySystem/   # Orbital animation + planet rendering
│   │   └── UI/                # Tabs, ProjectCard, symbols
│   ├── SideStrip/             # Console sidebar: profile, stack, CV, visits
│   ├── Onboarding/            # First-visit card
│   └── styles/                # tokens.css, globals.css, ConsoleShell.css, Console.css
├── lib/portfolio-api.ts       # D1 client with timeout + static fallback
├── App.tsx                    # Root wrapper
├── App.css                    # Global CSS tokens
├── index.css                  # Global styles
└── main.tsx                   # Entry point

worker/                        # Cloudflare Worker + D1 migrations/seed
scripts/generate-d1-seed.ts    # Generates seed.sql from TypeScript data
scripts/check-tokens.mjs       # Blocks raw layout dimensions outside tokens.css
tests/visual/                  # Playwright layout + SALTO visual regression
playwright.config.ts           # Edge locally, Chromium in CI
```
