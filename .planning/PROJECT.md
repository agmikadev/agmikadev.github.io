# Star System Portfolio

## What This Is

A 3D space-themed interactive portfolio where planets represent stages of software development (Design → Front-end → Bridge → Backend → Database). An AI "sonda network" belt connects all planets, representing agentic skills that accelerate work across every stage. Users explore freely as "mission control," reviewing logs of the astronaut's (portfolio owner's) journey through mission reports and proficiency metrics.

## Core Value

Visually demonstrate full-stack development proficiency — including cutting-edge agentic/AI skills — in a way that impresses both technical peers and hiring managers.

## Requirements

### Validated

- ✓ Planetary system with orbiting planets representing dev stages — existing
- ✓ Per-planet HUD with Missions tab (project cards) and Analytics tab (proficiency bars) — existing
- ✓ Side strip with astronaut profile, telemetry stats, and social links — existing
- ✓ Free exploration navigation with hover/select interactions — existing
- ✓ Stylized 3D planet rendering with Three.js/R3F — existing
- ✓ CLI header with terminal typing animation — existing
- ✓ GitHub Pages deployment pipeline — existing

### Active

- [ ] AI "sonda network" belt — visual network connections between all planets representing AI/Agentic skills
- [ ] Belt data model — tools, proficiency levels, and mission data for the AI belt
- [ ] Belt HUD panel — same two-tab structure (Missions + Metrics) when clicking the belt
- [ ] Updated skill exposure — ensure agentic programming tools are represented alongside traditional dev tools
- [ ] Visual polish — refined aesthetics for the belt integration with existing planetary system

### Out of Scope

- Backend/API integration — portfolio is static, no server-side functionality needed
- User authentication — public showcase, no login required
- Mobile-first responsive redesign — desktop 3D experience is the primary target
- Real-time updates — all data is statically embedded

## Context

**Technical environment:** React 19 + TypeScript + Rolldown-Vite + Three.js/R3F. No routing, no API calls — fully static SPA deployed to GitHub Pages.

**Existing architecture:**
- `PlanetarySystem` — orbital animation engine with requestAnimationFrame loop
- `PlanetDashboard` — detail view with 3D planet, CLI header, tabs
- `SideStrip` — profile sidebar with astronaut header and telemetry
- Static data in `PlanetaryData.ts` and `MissionData.ts`

**Codebase map exists:** `.planning/codebase/` with 7 structured documents covering stack, architecture, conventions, testing, concerns, integrations, and structure.

**Key existing components:** NeuralConstellation (unused but could be repurposed for belt), Tabs system, MissionCard, AnalyticsTab, HudButton.

## Constraints

- **Deployment**: GitHub Pages — must work as static SPA, no server-side rendering
- **Performance**: 3D animation runs on main thread via requestAnimationFrame — belt must not degrade orbital animation performance
- **Data**: All content is static TypeScript constants — no API or CMS integration
- **Browser**: Must work on modern browsers; Three.js requires WebGL support

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| AI as belt, not planet | Agentic skills cut across all dev stages, not a standalone stage | — Pending |
| Network connections visual | Belt should feel alive and functional, not decorative | — Pending |
| Same HUD pattern for belt | Consistency — belt uses Missions + Metrics tabs like planets | — Pending |
| Static data approach | Portfolio doesn't need dynamic content; simplicity over complexity | ✓ Good |

---

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-17 after initialization*
