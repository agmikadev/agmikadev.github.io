# Technical Concerns

**Analysis Date:** 2026-05-17

## Critical Issues

### Missing Avatar Asset — Broken Image Reference
- **Files:** `src/components/SideStrip/SubComponents/AstronautHeader.tsx:13`
- **Issue:** The component references `../../../assets/angelo.png` but the `src/assets/` directory is empty. The avatar image will fail to load, showing a broken image icon in the sidebar header.
- **Impact:** Visual defect on every page load — the primary identity element of the portfolio is broken.
- **Fix:** Add the avatar image to `src/assets/angelo.png` or switch to the commented-out initials fallback (`<span className="initials">MA</span>`).

### Vite Base Path Mismatch for GitHub Pages
- **Files:** `vite.config.ts:7`
- **Issue:** `base: '/'` is set, but the app deploys to GitHub Pages at `https://agmikadev.github.io` (a subpath). This will cause all asset references (JS, CSS, images) to 404 after deployment because they'll resolve to the root domain instead of the repo subpath.
- **Impact:** Entire app fails to load on GitHub Pages — blank screen.
- **Fix:** Change `base: '/repo-name/'` to match the GitHub Pages subpath, or use `base: './'` for relative paths.

### Unused Component — NeuralConstellation
- **Files:** `src/components/Planetary/PlanetarySystem/NeuralConstellation/NeuralConstellation.tsx`
- **Issue:** The `NeuralConstellation` component is exported but never imported or rendered anywhere in the application. It is dead code that still gets bundled.
- **Impact:** Unnecessary bundle size increase; maintenance burden for unused code.
- **Fix:** Either integrate it into the planetary system view or remove the file.

## Technical Debt

### Unused `import React` Statements (React 19)
- **Files:** 12 files across `src/components/`
  - `src/components/SideStrip/SideStrip.tsx`
  - `src/components/Planetary/UI/Tabs/Analytics/AnalyticsTab.tsx`
  - `src/components/Planetary/UI/Tabs/Missions/MissionCard.tsx`
  - `src/components/Planetary/UI/Tabs/Tabs.tsx`
  - `src/components/Planetary/PlanetarySystem/PlanetaryDashboard/PlanetaryDashboard.tsx`
  - `src/components/Planetary/PlanetarySystem/PlanetarySystem.tsx`
  - `src/components/Planetary/PlanetarySystem/PlanetaryDashboard/Planet3D.tsx`
  - `src/components/Planetary/PlanetarySystem/NeuralConstellation/NeuralConstellation.tsx`
  - `src/components/Planetary/UI/Tabs/Missions/MissionsTab.tsx`
  - `src/components/Planetary/UI/HudButtons/HudButton.tsx`
  - `src/components/Planetary/UI/CliHeader/CliHeader.tsx`
  - `src/components/Planetary/UI/CliHeader/TerminalText.tsx`
- **Issue:** The project uses React 19.2.0 with `jsx: "react-jsx"` in `tsconfig.app.json`, which means the automatic JSX transform is active. `import React` is no longer needed in any of these files.
- **Impact:** Clutters every file with unnecessary imports; eslint may flag these as unused.
- **Fix:** Remove all bare `import React` statements. Keep only named imports like `{ useState, useEffect }`.

### CSS Variable Conflict Between `index.css` and `App.css`
- **Files:** `src/index.css`, `src/App.css`
- **Issue:** Both files define `:root` and `body` styles with conflicting values:
  - `index.css:8`: `background-color: #111`
  - `App.css:4`: `--cp-bg-dark: #030305` and `App.css:43`: `background: var(--cp-bg-dark)`
  - `index.css:9`: `color: rgba(255, 255, 255, 0.87)` vs `App.css:44`: same value (duplicate)
  - `index.css:15-18`: `body` display/align rules duplicated in `App.css:36-41`
- **Impact:** Confusing cascade — unclear which styles win. Makes future theme changes error-prone.
- **Fix:** Consolidate all global styles into one file (preferably `App.css` since it defines the design system variables). Remove or minimize `index.css` to only essential resets.

### `gh-pages` Dev Dependency Unused in CI
- **Files:** `package.json:31` (`gh-pages`), `.github/workflows/deploy.yml`
- **Issue:** `gh-pages` is installed as a dev dependency and used in `npm run deploy` script, but the CI workflow uses `actions/deploy-pages@v4` instead. The `gh-pages` package and `deploy` script are dead code.
- **Impact:** Unnecessary dependency in bundle; confusion about the correct deployment method.
- **Fix:** Remove `gh-pages` from devDependencies and the `deploy`/`predeploy` scripts, or switch CI to use `gh-pages` consistently.

### `overrides` Field Duplicates `devDependencies` Entry
- **Files:** `package.json:37-39`
- **Issue:** `vite` is aliased to `rolldown-vite` in both `devDependencies` and `overrides`. The `overrides` entry is redundant since the devDependency already resolves to that package.
- **Impact:** Minor — adds confusion but no functional issue.
- **Fix:** Remove the `overrides` block if the devDependency alias is sufficient, or document why both are needed.

## Performance Concerns

### `requestAnimationFrame` Loop Reads Layout on Every Frame
- **Files:** `src/components/Planetary/PlanetarySystem/PlanetarySystem.tsx:43-44`
- **Issue:** Inside the animation loop, `containerRef.current.clientWidth` and `clientHeight` are read every frame. This forces a synchronous layout recalculation (layout thrashing) on every animation frame.
- **Impact:** Potential jank on lower-end devices, especially with the Three.js canvas running simultaneously.
- **Fix:** Cache dimensions and update only on `ResizeObserver` callback, not every frame.

### Three.js Canvas Re-creates Materials on Every Render
- **Files:** `src/components/Planetary/PlanetarySystem/PlanetaryDashboard/Planet3D.tsx:73-82`
- **Issue:** `scannerMaterial` is wrapped in `useMemo` with an empty dependency array `[]`, which is correct. However, `aiWireframeMaterial` at line 68 also uses `useMemo([])` — both are fine, but the `PlanetMesh` component re-renders whenever the `planet` prop changes, which could cause material recreation if `useMemo` deps are not carefully managed.
- **Impact:** Minor — currently safe, but fragile if future changes add deps.
- **Fix:** Add a comment or consider moving material creation outside the component if they're truly static.

### Large Data File Loaded Synchronously
- **Files:** `src/components/Planetary/data/PlanetaryData.ts` (551 lines), `src/components/Planetary/data/MissionData.ts` (231 lines)
- **Issue:** All planet and mission data is imported as a static module and bundled into the main JS chunk. As the portfolio grows (more missions, more planets), this will increase initial bundle size.
- **Impact:** Currently manageable (~782 lines of data), but will grow linearly with portfolio content.
- **Fix:** Consider code-splitting or lazy-loading planet data if the portfolio expands significantly. For now, acceptable.

## Maintainability Issues

### Inline Styles Used Extensively Instead of CSS Classes
- **Files:** Throughout the codebase, notably:
  - `src/components/Planetary/PlanetarySystem/PlanetarySystem.tsx:111-124` (label positioning)
  - `src/components/Planetary/PlanetarySystem/PlanetarySystem.tsx:138-146` (SVG inline styles)
  - `src/components/Planetary/PlanetarySystem/PlanetaryDashboard/PlanetaryDashboard.tsx:56-57` (theme color)
  - `src/components/Planetary/UI/Tabs/Tabs.tsx:27` (tab container layout)
  - `src/components/Planetary/UI/Tabs/Analytics/AnalyticsTab.tsx:48-55` (progress bar colors)
  - `src/components/Planetary/UI/Tabs/Missions/MissionCard.tsx:53-59` (tag styling)
- **Issue:** Dynamic styles (colors, widths, positions) are applied via inline `style` props. This mixes presentation logic with component logic and makes theme changes harder.
- **Impact:** Harder to audit styles; no CSS specificity control; harder to add media queries for dynamic values.
- **Fix:** Use CSS custom properties (already partially done with `--theme-color`) and define structural styles in CSS files. Reserve inline styles only for truly dynamic values like computed positions.

### No Error Boundary
- **Files:** `src/main.tsx`, `src/App.tsx`
- **Issue:** The app has no error boundary. If the Three.js canvas fails (e.g., WebGL not supported), the entire app crashes with a white screen.
- **Impact:** Poor UX on incompatible browsers or when 3D rendering fails.
- **Fix:** Add a React error boundary around the `PlanetarySystem` component and/or the `Canvas` to show a graceful fallback.

### No Loading State for Three.js Resources
- **Files:** `src/components/Planetary/PlanetarySystem/PlanetaryDashboard/Planet3D.tsx`
- **Issue:** The Three.js `Canvas` and `Environment preset="city"` load asynchronously but there's no loading indicator. Users may see a blank area while resources initialize.
- **Impact:** Perceived performance issue — users might think the dashboard is broken.
- **Fix:** Add a loading spinner or skeleton while the Canvas initializes.

### `Planet3D.tsx` Uses `* as THREE` Import
- **Files:** `src/components/Planetary/PlanetarySystem/PlanetaryDashboard/Planet3D.tsx:4`
- **Issue:** `import * as THREE from "three"` imports the entire Three.js library. While tree-shaking may help, this is a common source of bundle bloat.
- **Impact:** Potential unnecessary code in the bundle.
- **Fix:** Use specific imports where possible (e.g., `import { MeshBasicMaterial } from "three"`), though Three.js's module structure makes this partially limited.

### No Test Suite
- **Files:** Entire project
- **Issue:** Zero test files exist. No unit tests, integration tests, or E2E tests. The `package.json` has no test script.
- **Impact:** Any refactoring (e.g., removing unused React imports, restructuring CSS) risks introducing regressions with no safety net.
- **Fix:** Add at least smoke tests for component rendering. Consider Vitest (matches the Vite ecosystem) for unit tests.

## Missing Best Practices

### No Accessibility Audit
- **Files:** Throughout
- **Issues observed:**
  - `src/components/Planetary/PlanetarySystem/PlanetarySystem.tsx:214-258`: Planet nodes are `<div>` elements with `onClick` but no `role="button"`, `tabIndex`, or keyboard event handlers. They are not keyboard-navigable.
  - `src/components/Planetary/UI/Tabs/Tabs.tsx:29-38`: Tab buttons are proper `<button>` elements (good), but there's no `aria-selected` or `role="tablist"`/`role="tab"` pattern.
  - `src/components/SideStrip/SideStrip.css:33`: Scrollbar hidden (`width: 0px`) — keyboard/screen reader users may not know content is scrollable.
  - Color contrast has not been verified — the dark theme with low-opacity text (`rgba(255, 255, 255, 0.87)`) may fail WCAG AA on some backgrounds.
- **Impact:** The portfolio is not accessible to users relying on keyboard navigation or screen readers. This is particularly concerning for a developer portfolio.
- **Fix:** Add ARIA roles, keyboard handlers, and verify color contrast ratios.

### No SEO Meta Tags
- **Files:** `index.html`
- **Issue:** The HTML has no `<meta name="description">`, Open Graph tags, or structured data. The favicon loads from an external URL (`svgrepo.com`) which adds a network dependency.
- **Impact:** Poor social sharing previews; no search engine optimization; favicon fails if external service is down.
- **Fix:** Add meta description, OG tags, and host the favicon locally in `public/`.

### No `.env` or Environment Configuration
- **Files:** Project root
- **Issue:** No `.env.example` or environment configuration file exists. The project currently has no environment-dependent configuration, but as it grows (API endpoints, analytics keys), this will become necessary.
- **Impact:** Future friction when adding environment-specific configuration.
- **Fix:** Add `.env.example` documenting expected environment variables.

### `vite.config.ts` Has No Build Optimizations
- **Files:** `vite.config.ts`
- **Issue:** The config is minimal — no code splitting strategy, no asset optimization, no compression plugin. For a portfolio with Three.js, bundle size matters.
- **Impact:** Larger-than-necessary initial load, especially on mobile networks.
- **Fix:** Consider adding `rollupOptions` for manual chunk splitting (separate Three.js into its own chunk), and a compression plugin for production.

## Improvement Opportunities

### Component Architecture — Good Foundation
- The component hierarchy is well-organized with clear separation: `MainFrame` → `SideStrip` / `PlanetarySystem` → nested subcomponents. Barrel files (`index.ts`) provide clean public APIs.
- The data-driven approach (planets and missions as data, not hardcoded JSX) makes content updates straightforward.

### CSS Architecture — Could Benefit from a Design Token System
- CSS custom properties are already used in `App.css` (`--cp-bg-dark`, `--cp-accent-yellow`, etc.). This pattern should be expanded to cover all theme values (spacing, typography scale, border radii) to enable consistent theming.

### Migration to Tailwind or CSS-in-JS (Optional)
- The codebase uses plain CSS with BEM-like naming. Comments in `MissionCard.css` reference Tailwind classes being replaced (e.g., "Replaces: text-xs font-mono px-2 py-1"). If the team prefers utility classes, a migration could reduce CSS file count. However, the current approach is functional and well-organized.

## Risk Assessment

| Risk | Likelihood | Impact | Timeline |
|------|-----------|--------|----------|
| Broken GitHub Pages deployment (base path) | **High** | **Critical** | Immediate — next deploy will fail |
| Missing avatar image | **Certain** | Medium | Immediate — visible on every visit |
| Three.js WebGL failure with no fallback | Medium | High | On incompatible browsers/devices |
| Bundle size growth as portfolio expands | Medium | Medium | As more missions/projects are added |
| No test coverage for refactoring | High | Medium | Ongoing — any code change is risky |
| Accessibility non-compliance | High | Medium | Ongoing — excludes users |
| Unused `gh-pages` and `NeuralConstellation` dead code | Low | Low | Ongoing — maintenance burden |

---

*Concerns audit: 2026-05-17*
