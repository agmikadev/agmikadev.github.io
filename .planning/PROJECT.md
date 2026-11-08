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
- ✓ AI "sonda network" belt — animated network connections between planets
- ✓ Belt HUD with Projects + Skills tabs
- ✓ Projects-first Mission Log with search, area filters and card links — Phase 6
- ✓ Real area labels as primary navigation (Design, Front-end, Back-end, Dados, Infra) — Phase 6
- ✓ Cloudflare Worker + D1 content API with static fallback and anonymous visit counter — Phase 6

### Active

- [ ] Finish Phase 4 polish: onboarding edge cases, camera transitions, keyboard nav, reduced motion
- [ ] Phase 5 production readiness: error boundary, bundle code-splitting, cross-device testing
- [ ] Keep the recent-project cards and links current as new work ships

### Out of Scope

- User authentication — public showcase, no login required
- Mobile-first responsive redesign — desktop 3D experience is the primary target
- Public write access to portfolio content — D1 content is updated by seed/migrations, not by visitors
- Real-time updates — content is fetched on load; no websockets or live collaboration
- Storing personal data in D1 — only anonymous session counts and public project metadata

## Context

**Technical environment:** React 19 + TypeScript + Rolldown-Vite + Three.js/R3F. The frontend is a static SPA on GitHub Pages; project content is served by a Cloudflare Worker + D1 API with a static archive fallback.

**Existing architecture:**
- `PlanetarySystem` — orbital animation engine with requestAnimationFrame loop
- `Dashboard` — detail view with 3D planet, CLI header, Projects + Skills tabs
- `MissionLog` — global project index with search and area filters
- `SideStrip` — profile sidebar with real role, stack, links, CV and visit count
- Static data in `PlanetaryData.ts`, `MissionData.ts` and `BeltData.ts`
- `worker/` — Cloudflare Worker + D1 migrations/seed
- `src/lib/portfolio-api.ts` — D1 client with timeout and static fallback

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
| AI as belt, not planet | Agentic skills cut across all dev stages, not a standalone stage | ✓ Good |
| Network connections visual | Belt should feel alive and functional, not decorative | ✓ Good |
| Same HUD pattern for belt | Consistency — belt uses Projects + Skills tabs like planets | ✓ Good |
| Theme as navigation, not lore | The space metaphor should help visitors find projects, not require learning fiction | ✓ Good — Phase 6 |
| Real areas primary, codenames secondary | Recruiters should understand Design/Front-end/Back-end/Dados/Infra at a glance | ✓ Good — Phase 6 |
| Two navigation flows | Compassado is for exploring; Expresso is a single-switch dense index for recruiters in a hurry | ✓ Good — Phase 6 refinement |
| Canonical technology taxonomy | One canonical name per technology; aliases fold together so filtering shows every project | ✓ Good — Phase 6 refinement |
| Tech tags as navigation | Clicking a tag opens/filters the express index by that technology | ✓ Good — Phase 6 refinement |
| D1 content with static fallback | Content can be updated without redeploying, but the portfolio never depends on the Worker | ✓ Good — Phase 6 |

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
*Last updated: 2026-11-08 after Phase 6 (projects-first + D1)*
