# Phase 4 Summary — Polish & Accessibility

**Status:** Complete (2026-11-08)

## Delivered

### Onboarding (UX-01)

- The anchored first-visit card keeps the `hasSeenOnboarding:v2` flag.
- `Escape` now dismisses the card; the flag persists across reloads.
- The card never blocks the orbit: it is anchored and does not trap focus.

### Selection transitions (UX-02)

The original 3D camera was replaced by the console screen, so the camera
transition became an orbit ↔ HUD focus transition:

- HUD enters with a 0.2s scale/fade (`hud-focus-in`).
- Orbit returns with a 0.2s scale/fade (`orbit-focus-in`).
- Both are disabled by the global `prefers-reduced-motion` reset.

### Keyboard navigation (UX-03)

- The AI belt hitbox is now `tabIndex=0`, `role="button"`, labelled, and opens
  with Enter/Space. Focus highlights the belt lines.
- Planets expose `role="button"`, an `aria-label`, and open with Enter/Space.
- Keyboard-opened HUDs move focus to `← SISTEMA`; HUD close restores focus to
  the originating planet or belt by identity (the orbit remounts).
- SALTO focuses its region on open; `Escape`/back restores focus to the
  `SALTO` trigger after the orbit remounts.
- `Escape` closes the HUD and SALTO.

### External link affordance

- Added the shared `ExternalLinkIcon` (↗) for links that leave the portfolio.
- SALTO rows and project cards show the arrow next to the link label; the social
  buttons show a small corner badge.
- External links announce “(abre em nova aba)” via `aria-label` and use
  `rel="noopener noreferrer"`; `mailto:` keeps its icon-only treatment.

### Reduced motion (UX-04)

- `usePrefersReducedMotion` uses `matchMedia` via `useSyncExternalStore` and
  reacts to preference changes.
- The orbit loop renders one static frame and stops under reduced motion.
- `Planet3D` disables `OrbitControls` auto-rotate, freezes the mesh/neural
  animations and switches the Canvas to `frameloop="demand"`.
- Existing CSS resets cover the sun, belt flow, HUD, onboarding and SALTO.

## Verification

- `npm run lint`, `npm run lint:css`, `npm run check:tokens` pass.
- `npm run build` passes; `npm run worker:typecheck` passes.
- `npm run test:visual` — 21 tests pass:
  - 12 layout checks at 1440/1280/1024/768;
  - 2 SALTO pixel snapshots;
  - 7 accessibility/affordance checks (belt, planet, SALTO, external links,
    onboarding, motion on/off).
- CI runs layout + accessibility tests with Chromium before the build.
