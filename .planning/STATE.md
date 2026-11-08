# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-17)

**Core value:** Visually demonstrate full-stack development proficiency — including cutting-edge agentic/AI skills — in a way that impresses both technical peers and hiring managers.
**Current focus:** Phase 6 — Projects-First Content Refresh & D1 (Complete)

## Current Position

Phase: 6 (Projects-First Content Refresh & D1)
Plan: 1 of 1 in current phase
Status: Completed phase 06 — two navigation flows, canonical tech index, D1
Last activity: 2026-11-08 — Phase 6 refinement: ÓRBITA/SALTO flows + tech taxonomy

Progress: [█████████████░] 65%

## Performance Metrics

**Velocity:**
- Total plans completed: 10
- Average duration: ~4 min
- Total execution time: ~0.67 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 4 | 4 | ~4 min |
| 02-belt-data-visual-core | 3 | 3 | ~4 min |
| 03-belt-interaction-content | 3 | 3 | ~4 min |
| 06-projects-first-d1 | 1 | 1 | ~1 session |

**Recent Trend:**
- Phase 6 delivered the content reframe and D1 layer in one session
- Next: finish Phase 4 accessibility/polish and Phase 5 production readiness

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- AI as belt, not planet — Agentic skills cut across all dev stages, not a standalone stage
- Theme as navigation, not lore — Real areas are primary; codenames are secondary
- Two navigation flows — ÓRBITA (compassado, system exploration) is the default; SALTO (expresso, dense project index) is a single header switch
- One Salto CTA — featured bar, side-strip project button and onboarding project CTA were removed
- Canonical technology taxonomy — aliases fold into one name; Salto has a tech sidebar with counts
- Tech tags are navigation — clicking a tag opens/filters SALTO by that technology
- D1 content + static fallback — Content is editable without redeploying the frontend, but the site never depends on the Worker
- Same HUD pattern for belt — Consistency — belt uses Projects + Skills tabs like planets
- Real project links are validated before being attached to cards

### Pending Todos

- Phase 4: onboarding polish is partially done; camera transitions, keyboard nav and reduced motion remain
- Phase 5: error boundary, bundle code-splitting, cross-device testing

### Blockers/Concerns

- Bundle remains ~1.24 MB (350 kB gzip); code-splitting Three.js/drei is the main Phase 5 task
- D1 content changes require `npm run d1:seed:generate` + `npm run db:seed:remote`; edge cache can delay updates up to ~5 minutes
- Visit counter is anonymous and session-based; it is not a unique-visitor metric

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| *(none)* | | | |

## Session Continuity

Last session: 2026-11-08
Stopped at: Phase 6 complete — ÓRBITA/SALTO navigation, canonical technology index, Cloudflare D1
Resume file: .planning/ROADMAP.md (next: Phase 4 polish, then Phase 5 production readiness)
