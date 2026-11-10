<!-- refreshed: 2026-05-17 -->
# Architecture

**Analysis Date:** 2026-05-17

## System Overview

A space-themed interactive portfolio website ("Star System Portfolio") built as a single-page React application. The app presents the developer's skills, projects, and experience through an animated planetary system metaphor — each "planet" represents a skill domain (Design, Frontend, Backend, Logic/Algorithms, Infrastructure, AI), and clicking a planet opens a detailed dashboard with missions (projects) and analytics (skill metrics).

```text
┌─────────────────────────────────────────────────────────────────┐
│                        App (index.html)                          │
│  `<div id="root">` → src/main.tsx                                │
├─────────────────────────────────────────────────────────────────┤
│                          App.tsx                                 │
│  `src/App.tsx` — thin wrapper, renders MainFrame only            │
├──────────────────┬──────────────────────────────────────────────┤
│   MainFrame       │          SideStrip                           │
│  `MainFrame.tsx`  │         `SideStrip/`                         │
│                  │  ┌────────────┬────────────┬──────────────┐  │
│  ┌────────────┐  │  │AstronautHdr│TelemetrySt │  DataCycler  │  │
│  │ Container   │  │  │  Header    │   ats      │  (Manifesto  │  │
│  │  (Header +  │  │  └────────────┴────────────┴   / Stack)   │  │
│  │  Content +  │  │  ┌──────────────────────────────────────┐  │
│  │  Footer)    │  │  │          FooterInfo                  │  │
│  └──────┬─────┘  │  │  (Social links, status, location)     │  │
│         │        │  └──────────────────────────────────────┘  │
│         ▼        │                                             │
│  PlanetarySystem │                                             │
│  `Planetary/`    │                                             │
│  ┌────────────┐  │                                             │
│  │ Orbiting   │  │                                             │
│  │ Planets +  │  │                                             │
│  │ SVG orbits │  │                                             │
│  └──────┬─────┘  │                                             │
│         │        │                                             │
│         ▼        │                                             │
│  PlanetDashboard │                                             │
│  ┌────────────┐  │                                             │
│  │ Planet3D   │  │                                             │
│  │ (R3F Canvas│  │                                             │
│  │  + meshes) │  │                                             │
│  └────────────┘  │                                             │
│  ┌────────────┐  │                                             │
│  │ CliHeader  │  │                                             │
│  │ (typing FX)│  │                                             │
│  └──────┬─────┘  │                                             │
│         ▼        │                                             │
│  ┌────────────┐  │                                             │
│  │ Tabs:      │  │                                             │
│  │ Missions   │  │                                             │
│  │ Analytics  │  │                                             │
│  └────────────┘  │                                             │
└─────────────────────────────────────────────────────────────────┘
```

## Component Architecture

**Pattern:** Component-based composition with barrel-file exports. No routing — single-page with conditional rendering.

| Component | Responsibility | File |
|-----------|----------------|------|
| `App` | Root wrapper, delegates to `MainFrame` | `src/App.tsx` |
| `MainFrame` | Layout shell: Container + SideStrip, accepts `children` | `src/components/MainFrame.tsx` |
| `PlanetarySystem` | Orbital animation engine (requestAnimationFrame loop), planet rendering, hover/select state | `src/components/Planetary/PlanetarySystem/PlanetarySystem.tsx` |
| `PlanetDashboard` | Detail view when a planet is selected — 3D view + CLI header + tabs | `src/components/Planetary/PlanetarySystem/PlanetaryDashboard/PlanetaryDashboard.tsx` |
| `Planet3D` | Three.js/React Three Fiber canvas with planet mesh, materials, scanner rings | `src/components/Planetary/PlanetarySystem/PlanetaryDashboard/Planet3D.tsx` |
| `NeuralConstellation` | SVG line animation connecting planet positions (unused in current flow) | `src/components/Planetary/PlanetarySystem/NeuralConstellation/NeuralConstellation.tsx` |
| `SideStrip` | Sidebar with profile header, telemetry stats, auto-cycling manifesto/stack tabs | `src/components/SideStrip/SideStrip.tsx` |
| `CliHeader` | Terminal-style typing animation that triggers content reveal | `src/components/Planetary/UI/CliHeader/CliHeader.tsx` |
| `TerminalText` | Character-by-character typing effect with `onComplete` callback | `src/components/Planetary/UI/CliHeader/TerminalText.tsx` |
| `Tabs` | Generic tab container accepting `TabItem[]` with `ReactNode` content | `src/components/Planetary/UI/Tabs/Tabs.tsx` |
| `MissionsTab` | Filters `MISSION_ARCHIVE` by planet tools, renders `MissionCard` list | `src/components/Planetary/UI/Tabs/Missions/MissionsTab.tsx` |
| `AnalyticsTab` | Renders skill bars with color-coded values and alternative tool tags | `src/components/Planetary/UI/Tabs/Analytics/AnalyticsTab.tsx` |
| `HudButton` | Themed button with icon support and variant styles | `src/components/Planetary/UI/HudButtons/HudButton.tsx` |
| `MissionCard` | Project card with title, role, description, tech tags, external links | `src/components/Planetary/UI/Tabs/Missions/MissionCard.tsx` |
| `AstronautHeader` | Profile avatar, name, and role display | `src/components/SideStrip/SubComponents/AstronautHeader.tsx` |
| `TelemetryStats` | Personal metrics (language, self-learning, time management) with progress bars | `src/components/SideStrip/SubComponents/TelemetryStats.tsx` |
| `FooterInfo` | Location, work status, social links (GitHub, LinkedIn, email) | `src/components/SideStrip/SubComponents/FooterInfo.tsx` |

## Routing

**No routing library is used.** The app is a single-page application with state-driven view switching:

- **Default view:** `PlanetarySystem` (orbital animation) rendered as `MainFrame` children
- **Detail view:** Clicking a planet sets `selectedPlanet` state in `PlanetarySystem`, which conditionally renders `PlanetDashboard` instead of the orbital view
- **Navigation:** `PlanetDashboard` receives an `onClose` callback to return to the orbital view

URL is never changed; no browser history integration. Deployment uses `base: '/'` in `vite.config.ts` with GitHub Pages via `gh-pages`.

## State Management

**Pattern:** Local component state with `useState` and `useRef`. No global state management library.

**State flow:**

1. **PlanetarySystem** (`PlanetarySystem.tsx`):
   - `hoveredPlanetId` — tracks which planet is hovered (controls label visibility, orbit highlights)
   - `selectedPlanet` — when set, swaps orbital view for `PlanetDashboard`
   - `mousePos` — tracks cursor for belt planet label positioning
   - `anglesRef` (useRef) — mutable orbital angles updated each frame via `requestAnimationFrame`
   - `planetNodesRef` (useRef) — DOM refs for planet divs, updated each frame via direct `style.transform`

2. **PlanetDashboard** (`PlanetaryDashboard.tsx`):
   - `isFetched` — boolean gate that reveals content after `CliHeader` typing animation completes

3. **SideStrip** (`SideStrip.tsx`):
   - `activeTab` — toggles between "manifesto" and "stack" views
   - `isHovered` — pauses the auto-cycling progress bar on hover

4. **Tabs** (`Tabs.tsx`):
   - `activeTab` — manages which tab content is displayed

5. **TerminalText** (`TerminalText.tsx`):
   - `displayedText` — incrementally built string for typing animation

**Data is static** — all content comes from TypeScript constants in `src/components/Planetary/data/`:
- `planets: PlanetModel[]` in `PlanetaryData.ts`
- `MISSION_ARCHIVE: MissionType[]` in `MissionData.ts`

## Data Flow

### Primary Interaction Path

1. **Entry:** `main.tsx` → `App.tsx` → `MainFrame.tsx` → renders `PlanetarySystem` as default children
2. **Animation loop:** `requestAnimationFrame` in `PlanetarySystem.tsx` updates planet positions each frame
3. **User clicks planet:** `setSelectedPlanet(p)` triggers view swap to `PlanetDashboard`
4. **Dashboard loads:** `CliHeader` types a terminal command → `onComplete` fires → `isFetched` becomes true → content reveals
5. **Tab content:** `MissionsTab` filters missions by `planet.tools` using `useMemo`; `AnalyticsTab` renders `planet.stats` as progress bars
6. **Close:** `onClose` resets `selectedPlanet` and `hoveredPlanetId`, returning to orbital view

### State Management Summary

- **No API calls** — all data is embedded as TypeScript constants
- **No Context API** — state is local to each component tree
- **No external state library** — no Redux, Zustand, or similar
- **Direct DOM manipulation** — `PlanetarySystem` uses refs to set `style.transform` directly each frame for performance

## Key Patterns

### Barrel File Exports

Each feature directory uses an `index.ts` barrel file to re-export components:

```typescript
// src/components/Planetary/index.ts
export * from "./data";
export * from "./PlanetarySystem";

// src/components/SideStrip/index.ts
export { SideStrip } from "./SideStrip";
```

### Component Colocation

Components, styles, and barrel exports are colocated in feature directories:

```
Planetary/
├── index.ts              # Barrel export
├── data/                 # Static data + types
│   ├── index.ts
│   ├── PlanetaryData.ts
│   └── MissionData.ts
├── PlanetarySystem/      # Main component
│   ├── index.ts
│   ├── PlanetarySystem.tsx
│   ├── PlanetarySystem.css
│   ├── PlanetShapes.css
│   ├── PlanetaryDashboard/
│   └── NeuralConstellation/
└── UI/                   # Shared UI primitives
    ├── index.ts
    ├── CliHeader/
    ├── HudButtons/
    └── Tabs/
```

### CSS-in-JS for Dynamic Theming

Theme colors are passed via inline `style` with CSS custom properties:

```tsx
<div style={{ "--theme-color": planet.color } as React.CSSProperties}>
```

### requestAnimationFrame Game Loop

`PlanetarySystem` uses a `requestAnimationFrame` loop for orbital animation, with physics calculated via Kepler-inspired math. DOM updates are applied directly through refs rather than React re-renders for performance.

### Conditional Geometry Rendering

`Planet3D` uses conditional rendering based on `planet.shape` and `planet.variant` to display different Three.js geometries (sphere, hexagon, wireframe) and materials.

## Entry Points

**`src/main.tsx`:**
- Location: `src/main.tsx`
- Triggers: Browser loads `index.html` which references this script
- Responsibilities: Creates React root, wraps `App` in `StrictMode`, imports global CSS

## Architectural Constraints

- **Threading:** Single-threaded React event loop. Animation uses `requestAnimationFrame` on the main thread. No Web Workers.
- **Global state:** None. Each component manages its own state. Static data is imported as module-level constants from `PlanetaryData.ts` and `MissionData.ts`.
- **Circular imports:** None detected. Barrel files re-export from subdirectories without back-references.
- **No routing:** Single-page with conditional rendering only. No URL-based navigation.
- **No data fetching:** All content is statically embedded in TypeScript files.

## Anti-Patterns

### Direct DOM Manipulation in React

**What happens:** `PlanetarySystem.tsx` directly mutates `node.style.transform` and `node.style.zIndex` inside a `requestAnimationFrame` loop via refs.
**Why it's wrong:** Bypasses React's rendering model, making it harder to reason about state and harder to test. Can conflict with React's reconciliation.
**Do this instead:** For animation-heavy scenarios, this is actually an acceptable performance optimization. Document it clearly and keep the mutation isolated to the animation loop. Consider `@react-three/fiber` for the 3D portions (already done in `Planet3D`).

### Unused Component

**What happens:** `NeuralConstellation.tsx` exists in the codebase but is not imported or rendered anywhere in the current component tree.
**Why it's wrong:** Dead code increases bundle size and maintenance burden.
**Do this instead:** Either integrate it into the `PlanetarySystem` view or remove it.

### Hardcoded Asset Path

**What happens:** `AstronautHeader.tsx` references `"../../../assets/angelo.png"` with a relative path that points outside `src/assets/` (which is empty). The actual image appears to be expected at a location that may not exist.
**Why it's wrong:** Fragile relative paths break on restructure. The `src/assets/` directory is empty, suggesting the image may be missing or misplaced.
**Do this instead:** Place static assets in `src/assets/` or `public/` and use Vite's asset import system (`import avatar from './assets/angelo.png'`).

## Error Handling

**Strategy:** Minimal. No error boundaries, no try/catch blocks, no error state management.

**Patterns:**
- Empty state rendering: `MissionsTab` shows `[ERRO]: Nenhuma missão registrada nos arquivos.` when no missions match
- Null checks: `containerRef.current` is guarded before access in the animation loop
- Optional chaining: Not consistently used; `planetNodesRef.current[i]` is checked with `if (node)`

## Cross-Cutting Concerns

**Logging:** None. No console.log statements or logging framework detected.

**Validation:** None at runtime. TypeScript provides compile-time type safety via `PlanetModel`, `MissionType`, `TelemetryStat` interfaces.

**Authentication:** Not applicable — this is a public portfolio site with no auth.

**Accessibility:** Partial. `HudButton` uses `aria-label`. Social links use `aria-label`. No ARIA landmarks or skip navigation detected.

**Responsive Design:** CSS media queries at `960px` breakpoint in `MainFrame.css` and `Container.css`. Mobile layout stacks vertically, hides header/footer HUD elements.

---

*Architecture analysis: 2026-05-17*
