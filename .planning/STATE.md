# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-17)

**Core value:** Visually demonstrate full-stack development proficiency — including cutting-edge agentic/AI skills — in a way that impresses both technical peers and hiring managers.
**Current focus:** Phase 4 — Polish & Accessibility (Complete); next Phase 5

## Current Position

Phase: 4 (Polish & Accessibility)
Plan: 5 of 5 in current phase
Status: Completed phase 04 — keyboard navigation with focus restoration, reduced motion, orbit/HUD transitions and onboarding Escape
Last activity: 2026-11-08 — Phase 4: accessibility polish + Playwright keyboard/motion tests

Progress: [██████████████░] 83%

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
| 04-polish-accessibility | 5 | 5 | ~1 session |
| 06-projects-first-d1 | 1 | 1 | ~1 session |

**Recent Trend:**
- Phase 6 delivered the content reframe and D1 layer in one session
- Phase 4 closed keyboard access, focus restoration and reduced motion
- Next: Phase 5 production readiness (error boundary, SEO, code-splitting)

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- AI as belt, not planet — Agentic skills cut across all dev stages, not a standalone stage
- Theme as navigation, not lore — Real areas are primary; codenames are secondary
- One console, two screens — ÓRBITA (compassado) and SALTO (expresso) swap inside `.console__screen`; sidebar/footer stay visible
- Screen actions inside the panel — the console header is only the CLI line; `SALTO`, `← ÓRBITA` and `← SISTEMA` use the shared `screen-action` block
- BEM class hierarchy — `console__*`, `orbit__*`, `planet-hud__*`, `salto__*`, `project-collection__*`, `project-card__*`, `project-row__*`, `screen-action__*`; state via `data-*`/`aria-pressed`
- One project renderer — `ProjectCollection` renders cards, rows or a full-area case on both SALTO and the planet HUD; the shared `view-toggle` defaults to cards and persists in `localStorage`
- Case view — "VER CASE COMPLETO" fills the results pane; card grid and case cap at two columns on desktop, one in mobile portrait and two in landscape
- Fluid layout tokens — sidebar, sun, Salto tech index/row columns, card media and onboarding use `clamp()`/container queries; breakpoints standardized
- Tailwind theme bridge — tokens mapped through `@theme inline`; shadcn primitives are allowed only for inputs/actions
- shadcn primitives — `Button`, `Input` and `ToggleGroup` live in `src/components/ui`; `Input`/`ToggleGroup` power SALTO with unchanged visuals
- Guardrails — `check-tokens.mjs`, Stylelint, ESLint and Playwright layout/a11y tests run in CI; SALTO pixel baselines are local (`win32`)
- Keyboard focus contract — belt and planets are buttons; keyboard-opened HUD focuses `← SISTEMA`; closing restores focus by identity after the orbit remounts
- Reduced motion — `usePrefersReducedMotion` stops the orbit loop, 3D auto-rotate and mesh animation; CSS disables transitions
- Canonical technology taxonomy — aliases fold into one name; Salto has a tech sidebar with counts
- Tech tags are navigation — clicking a tag opens/filters SALTO by that technology
- Per-planet perspective — the same project changes role, summary, highlights and stack by area
- D1 content + static fallback — Content is editable without redeploying the frontend, but the site never depends on the Worker
- Same HUD pattern for belt — Consistency — belt uses Projects + Skills tabs like planets
- Real project links are validated before being attached to cards

### Pending Todos

- Phase 5: error boundary with WebGL fallback, OG/Twitter meta tags, bundle code-splitting, cross-device testing
- Optionally adopt the `Button` primitive in a CTA after a visual review; it is installed but intentionally unused

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
Stopped at: Phase 4 complete — keyboard navigation, focus restoration, reduced motion and orbit/HUD transitions
Resume file: .planning/ROADMAP.md (next: Phase 5 production readiness)
