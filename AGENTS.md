# Star System Portfolio — Agent Instructions

## Project Context

**Project:** Star System Portfolio
**Type:** 3D interactive space-themed developer portfolio
**Stack:** React 19 + TypeScript + Rolldown-Vite + Three.js/R3F + drei
**Deployment:** GitHub Pages (static SPA)

**What This Is:** A 3D space portfolio where planets represent dev stages (Design → Front-end → Bridge → Backend → Database). An AI "sonda network" belt connects all planets, representing agentic skills. Users explore as "mission control," reviewing mission reports and proficiency metrics.

**Core Value:** Visually demonstrate full-stack development proficiency — including cutting-edge agentic/AI skills — in a way that impresses both technical peers and hiring managers.

## GSD Workflow Enforcement

This project uses the Get Shit Done (GSD) workflow. All work must follow these rules:

1. **Never skip phases** — Each phase must go through: discuss → plan → execute → verify
2. **Read artifacts first** — Always read ROADMAP.md, STATE.md, and REQUIREMENTS.md before starting work
3. **Follow the roadmap** — Work on the current phase only. Don't jump ahead.
4. **Commit atomically** — Each plan gets its own commit.
5. **Verify before marking complete** — Check success criteria before marking a phase done.

## Current State

**Active Phase:** Phase 1 — Foundation & Performance
**Goal:** Portfolio deploys correctly, loads reliably, and runs at target performance baseline

**Key Files:**
- `.planning/ROADMAP.md` — Phase structure and success criteria
- `.planning/STATE.md` — Current project state
- `.planning/REQUIREMENTS.md` — v1 requirements with traceability
- `.planning/PROJECT.md` — Full project context
- `.planning/config.json` — Workflow preferences (YOLO, fine granularity, parallel, genius models)

## Technical Constraints

- **Deployment:** GitHub Pages — must work as static SPA
- **Performance:** 60fps target on mid-range hardware, DPR capped at 2
- **Data:** All content is static TypeScript constants
- **Three.js:** Pinned to 0.182.0 (do not upgrade without checking R3F/drei compatibility)
- **React 19:** Required for @react-three/fiber v9 and postprocessing v3

## Codebase Structure

```
src/
├── components/
│   ├── MainFrame.tsx          # Layout shell
│   ├── Planetary/             # 3D planetary system
│   │   ├── data/              # Static data (PlanetaryData.ts, MissionData.ts)
│   │   ├── PlanetarySystem/   # Orbital animation + planet rendering
│   │   └── UI/                # HUD components (Tabs, CliHeader, HudButtons)
│   ├── SideStrip/             # Profile sidebar
│   └── styles/                # Container/MainFrame CSS
├── App.tsx                    # Root wrapper
├── App.css                    # Global CSS tokens
├── index.css                  # Global styles
└── main.tsx                   # Entry point
```
