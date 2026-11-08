# Star System Portfolio — Agent Instructions

## Project Context

**Project:** Star System Portfolio
**Type:** 3D interactive space-themed developer portfolio
**Stack:** React 19 + TypeScript + Rolldown-Vite + Three.js/R3F + drei
**Deployment:** GitHub Pages (static SPA)

**What This Is:** A 3D space portfolio where planets represent real development areas (Design → Front-end → Back-end → Dados & Algoritmos → Infra & Deploy). An AI "sonda network" belt connects all planets, representing agentic skills. The theme is navigation, not lore.

**Two navigation flows:**
- **ÓRBITA (default, compassado):** explore the solar system, planets, case cards and AI belt at the visitor's pace.
- **SALTO (expresso):** a single header switch opens a dense project index with search, area filters and a canonical technology sidebar with counts. This is the escape hatch for recruiters who only want experience with a specific technology.

Technology tags are canonical (see `src/components/Planetary/data/technologies.ts`); aliases like "React 19"/"React.js" fold into "React". Clicking a tech tag opens the Salto index filtered by that technology.

**Core Value:** Visually demonstrate full-stack development proficiency — including cutting-edge agentic/AI skills — in a way that impresses both technical peers and hiring managers.

## GSD Workflow Enforcement

This project uses the Get Shit Done (GSD) workflow. All work must follow these rules:

1. **Never skip phases** — Each phase must go through: discuss → plan → execute → verify
2. **Read artifacts first** — Always read ROADMAP.md, STATE.md, and REQUIREMENTS.md before starting work
3. **Follow the roadmap** — Work on the current phase only. Don't jump ahead.
4. **Commit atomically** — Each plan gets its own commit.
5. **Verify before marking complete** — Check success criteria before marking a phase done.

## Current State

**Active Phase:** Phase 6 complete — Projects-First Content Refresh & D1
**Next:** Phase 4 polish (camera, keyboard, reduced motion), then Phase 5 production readiness

**Key Files:**
- `.planning/ROADMAP.md` — Phase structure and success criteria
- `.planning/STATE.md` — Current project state
- `.planning/REQUIREMENTS.md` — v1 requirements with traceability
- `.planning/PROJECT.md` — Full project context
- `.planning/phases/06-projects-first-d1/` — Phase 6 plan and summary
- `.planning/config.json` — Workflow preferences (YOLO, fine granularity, parallel, genius models)

## Technical Constraints

- **Deployment:** GitHub Pages — must work as static SPA
- **Performance:** 60fps target on mid-range hardware, DPR capped at 2
- **Data:** Static TypeScript archive is the source of truth and fallback; Cloudflare D1 serves the same content at runtime
- **D1:** Public read-only content API + anonymous session counter; no public writes to project data
- **Three.js:** Pinned to 0.182.0 (do not upgrade without checking R3F/drei compatibility)
- **React 19:** Required for @react-three/fiber v9 and postprocessing v3

## Codebase Structure

```
src/
├── components/
│   ├── MainFrame.tsx          # Layout shell + Salto mode + navigation state
│   ├── MissionLog/            # Salto: dense index, filters, tech sidebar
│   ├── Planetary/             # 3D planetary system
│   │   ├── data/              # Static archive, D1 hooks, canonical technologies
│   │   ├── PlanetarySystem/   # Orbital animation + planet rendering
│   │   └── UI/                # HUD components (Tabs, cards, CLI, symbols)
│   ├── SideStrip/             # Profile, stack, links, CV and visit count
│   ├── Onboarding/            # First-visit card with project CTA
│   └── styles/                # Container/MainFrame CSS
├── lib/portfolio-api.ts       # D1 client with timeout + static fallback
├── App.tsx                    # Root wrapper
├── App.css                    # Global CSS tokens
├── index.css                  # Global styles
└── main.tsx                   # Entry point

worker/                        # Cloudflare Worker + D1 migrations/seed
scripts/generate-d1-seed.ts    # Generates seed.sql from TypeScript data
```
