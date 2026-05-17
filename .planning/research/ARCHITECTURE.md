# Architecture Patterns: 3D Interactive Portfolios

**Domain:** 3D space-themed interactive portfolio (Star System Portfolio)
**Researched:** 2026-05-17

## Recommended Architecture

This document maps how 3D interactive portfolio systems are typically structured, with specific focus on the Star System Portfolio's existing architecture and the planned AI belt integration.

### Canonical Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            index.html                                   │
│  <div id="root"> → main.tsx → App.tsx                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                            App.tsx (thin wrapper)                       │
├──────────────────────┬──────────────────────────────────────────────────┤
│                      │                                                  │
│    MainFrame.tsx     │              SideStrip.tsx                       │
│  ┌────────────────┐  │  ┌────────────────────────────────────────────┐  │
│  │  Container     │  │  │ AstronautHeader │ TelemetryStats           │  │
│  │  ┌──────────┐  │  │ ├─────────────────┴──────────────────────────┤  │
│  │  │Planetary │  │  │ │ DataCycler (Manifesto/Stack)               │  │
│  │  │ System   │  │  │ ├────────────────────────────────────────────┤  │
│  │  │          │  │  │ │ FooterInfo (socials, status, location)     │  │
│  │  │┌────────┐│  │  │ └────────────────────────────────────────────┘  │
│  │  │Orbital ││  │  │                                                  │
│  │  │View    ││  │  │                                                  │
│  │  └───┬────┘│  │  │                                                  │
│  │      │     │  │  │                                                  │
│  │  ┌───▼────┐│  │  │                                                  │
│  │  │Planet  ││  │  │                                                  │
│  │  │Dashboard││  │  │                                                  │
│  │  │ ┌────┐ ││  │  │                                                  │
│  │  │ │3D  │ ││  │  │                                                  │
│  │  │ │Canvas│ ││  │  │                                                  │
│  │  │ └────┘ ││  │  │                                                  │
│  │  │ ┌────┐ ││  │  │                                                  │
│  │  │ │CLI │ ││  │  │                                                  │
│  │  │ │Header│ ││  │  │                                                  │
│  │  │ └────┘ ││  │  │                                                  │
│  │  │ ┌────┐ ││  │  │                                                  │
│  │  │ │Tabs│ ││  │  │                                                  │
│  │  │ │M+A │ ││  │  │                                                  │
│  │  │ └────┘ ││  │  │                                                  │
│  │  └────────┘│  │  │                                                  │
│  └────────────┘  │  │                                                  │
│                      │                                                  │
└──────────────────────┴──────────────────────────────────────────────────┘
```

### Planned Architecture (with AI Belt)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            PlanetarySystem                               │
│                                                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                    Orbital Animation Layer                         │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │  │
│  │  │ Design  │ │  Front  │ │ Bridge  │ │ Backend │ │  Data   │    │  │
│  │  │ Planet  │ │  Planet │ │ Planet  │ │ Planet  │ │ Planet  │    │  │
│  │  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘    │  │
│  │       │            │           │           │           │          │  │
│  │       └────────────┴─────┬─────┴───────────┴───────────┘          │  │
│  │                          │                                        │  │
│  │              ┌───────────▼───────────┐                            │  │
│  │              │   AI Sonda Network    │                            │  │
│  │              │       Belt            │                            │  │
│  │              │  (network connections │                            │  │
│  │              │   between planets)    │                            │  │
│  │              └───────────────────────┘                            │  │
│  │                                                                   │  │
│  │  SVG orbit rings (decorative, CSS-animated)                       │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  State: selectedPlanet, hoveredPlanetId, anglesRef, planetNodesRef      │
└─────────────────────────────────────────────────────────────────────────┘
```

## Component Boundaries

| Component | Responsibility | Communicates With | Boundary Rule |
|-----------|---------------|-------------------|---------------|
| **App** | Root wrapper, StrictMode | MainFrame only | Never holds business logic |
| **MainFrame** | Layout shell (Container + SideStrip + children) | SideStrip, PlanetarySystem (as children) | Pure layout, no 3D logic |
| **PlanetarySystem** | Orbital animation engine, planet rendering, hover/select state, **belt rendering** | PlanetDashboard (via callback), SideStrip (via shared selection) | Owns the rAF loop; no DOM updates outside refs |
| **PlanetDashboard** | Detail view: 3D planet, CLI header, tabs | PlanetarySystem (onClose callback) | Self-contained; receives planet data as props |
| **Planet3D** | Three.js/R3F canvas with planet mesh, materials, scanner rings | PlanetDashboard only | Single Canvas per dashboard; no cross-Canvas state |
| **NeuralConstellation** | SVG line animation for belt connections | PlanetarySystem (receives planet positions) | **Repurpose for belt** — currently unused |
| **SideStrip** | Sidebar: astronaut profile, telemetry, social links | Independent; reads shared selection if needed | Self-contained; no 3D dependencies |
| **CliHeader** | Terminal typing animation with reveal trigger | PlanetDashboard (onComplete callback) | Pure UI primitive |
| **Tabs** | Generic tab container | MissionsTab, AnalyticsTab, BeltHUD | Stateless wrapper |
| **MissionsTab** | Filters and renders project cards | Static data (MissionData.ts) | useMemo for filtering |
| **AnalyticsTab** | Renders skill bars with color-coded values | Static data (planet.stats) | Pure display component |
| **BeltHUD** (new) | Same two-tab pattern for AI belt | Static data (BeltData.ts — new) | Reuses Tabs + MissionCard + AnalyticsTab patterns |
| **HudButton** | Themed button with icon support | Any interactive component | Pure UI primitive |
| **MissionCard** | Project card with tech tags, external links | MissionsTab | Pure display component |

### Critical Boundary: 3D Canvas vs DOM Overlay

```
┌─────────────────────────────────────────┐
│           DOM Overlay Layer              │
│  SideStrip │ MainFrame │ HUD panels      │
│  (CSS z-index: above canvas)             │
├─────────────────────────────────────────┤
│          R3F Canvas Layer                │
│  <Canvas> → Planet3D, scanner rings      │
│  (WebGL rendering, isolated from DOM)    │
├─────────────────────────────────────────┤
│        SVG/HTML Animation Layer          │
│  PlanetarySystem orbits, belt lines      │
│  (requestAnimationFrame, direct DOM refs)│
└─────────────────────────────────────────┘
```

**Rule:** The R3F Canvas must never be re-mounted during planet selection. Canvas teardown/recreation causes visible flicker and GPU context loss. Use visibility toggling or conditional rendering inside the Canvas, not conditional Canvas mounting.

## Data Flow

### Direction: Strictly Top-Down with Callback Returns

```
                    Static Data (TS constants)
                    ┌─────────────────────┐
                    │  PlanetaryData.ts   │
                    │  MissionData.ts     │
                    │  BeltData.ts (new)  │
                    └─────────┬───────────┘
                              │ import
                              ▼
                    ┌─────────────────────┐
                    │    PlanetarySystem   │
                    │  (owns selection     │
                    │   state + rAF loop)  │
                    └──────┬──────┬───────┘
                           │      │
              select planet│      │hover planet
                           ▼      ▼
                    ┌──────────────┐    ┌──────────────┐
                    │PlanetDashboard│   │ SideStrip    │
                    │ (receives     │   │ (may react   │
                    │  planet prop) │   │  to hover)   │
                    └──────┬───────┘   └──────────────┘
                           │
                    onClose│ (callback)
                           ▼
                    ┌─────────────────────┐
                    │  PlanetarySystem    │
                    │  (resets state)     │
                    └─────────────────────┘
```

### Belt-Specific Data Flow

```
PlanetarySystem (planet positions each frame)
         │
         │ refs updated by rAF loop
         ▼
NeuralConstellation (reads planet DOM positions)
         │
         │ draws SVG lines between planets
         ▼
BeltHUD (on belt click → same pattern as PlanetDashboard)
         │
         │ displays AI tools, proficiency, missions
         ▼
Static data (BeltData.ts)
```

### State Ownership Map

| State | Owner | Type | Consumers |
|-------|-------|------|-----------|
| `selectedPlanet` | PlanetarySystem | useState | PlanetDashboard (conditional render) |
| `hoveredPlanetId` | PlanetarySystem | useState | Planet labels, orbit highlights |
| `anglesRef` | PlanetarySystem | useRef (mutable) | rAF loop only — never triggers React render |
| `planetNodesRef` | PlanetarySystem | useRef (mutable) | Direct DOM mutation — never triggers React render |
| `isFetched` | PlanetDashboard | useState | Content reveal gate |
| `activeTab` | Tabs | useState | Tab content visibility |
| `activeTab` | SideStrip | useState | Manifesto/Stack toggle |
| `mousePos` | PlanetarySystem | useState | Belt label positioning |
| **`selectedBelt`** (new) | PlanetarySystem | useState | BeltHUD (conditional render) |

## Suggested Build Order

Based on component dependencies, the AI belt feature should be built in this order:

### Phase 1: Belt Data Model (Foundation)
**Why first:** Everything else depends on the data shape.
- Create `BeltData.ts` with AI tools, proficiency levels, mission data
- Define `BeltModel` TypeScript interface
- Ensure data is filterable by planet (which AI tools apply to which dev stage)
- **Blocks:** BeltHUD, NeuralConstellation integration, Belt visual

### Phase 2: NeuralConstellation Repurposing (Visual Core)
**Why second:** The visual belt is the primary user-facing feature.
- Integrate NeuralConstellation into PlanetarySystem render tree
- Feed it live planet positions from `planetNodesRef`
- Style network connections (animated lines, glow effects)
- Make belt clickable as a single interactive entity
- **Blocks:** Belt click interaction, BeltHUD

### Phase 3: BeltHUD Component (Interaction)
**Why third:** Needs both data model and clickable belt.
- Build BeltHUD following same pattern as PlanetDashboard
- Reuse Tabs, MissionCard, AnalyticsTab components
- Wire `selectedBelt` state in PlanetarySystem
- Add `onClose` callback to return to orbital view
- **Blocks:** Visual polish, integration testing

### Phase 4: Visual Polish & Integration (Refinement)
**Why last:** Depends on all functional components being in place.
- Animate belt connections (pulse, flow effects)
- Ensure belt doesn't degrade orbital animation performance
- Responsive adjustments for belt at different viewport sizes
- Cross-component interaction testing

### Build Order Dependency Graph

```
BeltData.ts ─────────────────────────────────────────┐
      │                                               │
      ▼                                               ▼
NeuralConstellation integration ──→ Belt click handling │
      │                                               │
      ▼                                               ▼
BeltHUD component ──────────────────────────────→ Visual polish
      │                                               │
      └───────────────────────────────────────────────┘
                              │
                              ▼
                    Integration testing
```

## Performance Patterns for 3D + UI Integration

### Pattern 1: Separate Animation Loops

**Problem:** The orbital animation uses `requestAnimationFrame` with direct DOM mutation. Adding belt animations must not compete for the same frame budget.

**Solution:** Use a single rAF loop that handles both orbital and belt calculations. Multiple rAF loops cause frame contention and jank.

```typescript
// Single loop handles everything
useFrame(() => {
  // 1. Update orbital positions
  updateOrbitalPositions(anglesRef.current);

  // 2. Update belt connections (reads planet positions from refs)
  updateBeltConnections(planetNodesRef.current);

  // 3. Apply DOM mutations (batched)
  applyDomMutations();
});
```

### Pattern 2: Mutate, Don't setState, in Animation Loops

**Critical R3F rule:** Never call `setState` inside `useFrame` or `requestAnimationFrame`. Route high-frequency updates through refs and direct mutation.

```typescript
// ❌ BAD — triggers React re-render every frame
useFrame(() => setRotation(r => r + 0.01));

// ✅ GOOD — mutate directly, no React overhead
const ref = useRef<THREE.Mesh>();
useFrame((_, delta) => {
  ref.current.rotation.x += delta;
});
```

This is already correctly implemented in `PlanetarySystem` with `anglesRef` and `planetNodesRef`. The belt integration must follow the same pattern.

### Pattern 3: Canvas Isolation

**Rule:** Each R3F `<Canvas>` creates its own WebGL context and render loop. Multiple Canvases multiply GPU cost.

**Current state:** `Planet3D` creates a Canvas inside `PlanetDashboard`. This is fine because only one dashboard is visible at a time.

**Belt consideration:** The belt is SVG-based (NeuralConstellation), not R3F Canvas-based. This is the correct architectural choice — SVG lines are cheaper than a second WebGL context for simple connection visualization.

### Pattern 4: Visibility Over Mounting

**Problem:** Conditionally mounting/unmounting the Canvas causes flicker and GPU context loss.

**Solution:** Use CSS `visibility: hidden` or `display: none` instead of conditional rendering for the Canvas wrapper.

```typescript
// ❌ BAD — unmounts Canvas
{selectedPlanet ? <PlanetDashboard /> : <OrbitalView />}

// ✅ GOOD — Canvas stays mounted, content swaps inside
<Canvas>
  {selectedPlanet ? <DashboardScene /> : <OrbitalScene />}
</Canvas>
```

**Note:** The current architecture conditionally renders `PlanetDashboard` which contains its own Canvas. This is acceptable for a portfolio with infrequent transitions, but if jank appears during planet selection, migrate to a single shared Canvas.

### Pattern 5: Memoize Expensive Computations

**Already implemented:** `MissionsTab` uses `useMemo` to filter missions by planet tools.

**Extend to belt:** Belt data filtering (which AI tools apply to which planets) should also use `useMemo`:

```typescript
const beltMissions = useMemo(
  () => BELT_ARCHIVE.filter(m => m.appliesTo.includes(selectedPlanet?.id)),
  [selectedPlanet?.id]
);
```

### Pattern 6: Asset Preloading Strategy

For a static portfolio on GitHub Pages, all assets are bundled. Use Vite's asset pipeline:

- **Textures/images:** Import via `import` statements (Vite handles optimization)
- **3D models (if added):** Use `useLoader` from R3F with `Suspense` boundary
- **Font assets:** Preload critical fonts, lazy-load decorative fonts

### Pattern 7: Frame Budget Allocation

For a target of 60fps (16.67ms per frame):

| Budget Item | Allocation | Notes |
|-------------|------------|-------|
| Orbital math | ~1ms | Kepler calculations, position updates |
| Belt SVG updates | ~2ms | Line redraws, glow effects |
| DOM mutations | ~1ms | Ref-based style updates |
| React reconciliation | ~2ms | Only on user interaction, not per-frame |
| R3F render (Planet3D) | ~5ms | Single Canvas, static geometry |
| Browser compositing | ~3ms | CSS animations, layer management |
| **Headroom** | ~2.67ms | Buffer for spikes |

If belt animations push beyond budget, reduce SVG line complexity or throttle belt updates to every 2nd frame.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Multiple rAF Loops
**What:** Having separate `requestAnimationFrame` calls in PlanetarySystem and NeuralConstellation.
**Why bad:** Frame contention, unpredictable timing, jank.
**Instead:** Single loop, all calculations batched.

### Anti-Pattern 2: setState in Animation Loop
**What:** Calling `setHoveredPlanet` or similar inside the rAF loop.
**Why bad:** Triggers React reconciliation every frame (60x/sec), causing massive performance degradation.
**Instead:** Use refs for transient state, useState only for user-triggered changes.

### Anti-Pattern 3: Canvas Re-mounting on Selection
**What:** Unmounting and remounting the R3F Canvas when switching between planets.
**Why bad:** WebGL context loss, visible flicker, texture re-upload.
**Instead:** Keep Canvas mounted, swap scene content inside it.

### Anti-Pattern 4: Belt as Separate R3F Canvas
**What:** Creating a second `<Canvas>` for the belt visualization.
**Why bad:** Doubles WebGL overhead, sync complexity between two render loops.
**Instead:** Use SVG (NeuralConstellation) for belt lines — already the planned approach.

### Anti-Pattern 5: Global State for Transient Data
**What:** Introducing Zustand/Context for hover state or animation positions.
**Why bad:** Unnecessary complexity for a static portfolio; adds subscription overhead.
**Instead:** Keep current pattern — local useState for selection, refs for animation data. Only consider Zustand if belt state needs to be shared across 3+ unrelated component trees.

## Scalability Considerations

| Concern | Current (6 planets) | If 20+ planets | If adding GLTF models |
|---------|---------------------|----------------|----------------------|
| Orbital math | Negligible | O(n) per frame — still fine | Same |
| Belt connections | 6 lines | 190 lines (n*(n-1)/2) — may need throttling | Same |
| Canvas cost | 1 Canvas, simple meshes | Same | Add `useLoader` + Suspense |
| Bundle size | ~200KB JS | Same | GLTF models add 1-5MB each |
| Memory | ~50MB | ~80MB | ~200MB+ with models |

## Sources

- R3F Official Docs: https://r3f.docs.pmnd.rs/ (HIGH confidence)
- R3F Performance Pitfalls: https://r3f.docs.pmnd.rs/advanced/pitfalls (HIGH confidence)
- R3F State Management (DeepWiki): https://deepwiki.com/pmndrs/react-three-fiber/2.3-state-management (MEDIUM confidence)
- R3F GitHub Repository: https://github.com/pmndrs/react-three-fiber (HIGH confidence)
- 3D Portfolio Showcase (Three.js Forum): https://discourse.threejs.org/t/a-3d-interactive-portfolio-website-built-with-three-js-react-and-vite/87997 (MEDIUM confidence)
- R3F Best Practices (SkillKit): https://skillkit.io/skills/claude-code/r3f-best-practices (MEDIUM confidence)
- Existing codebase architecture: `.planning/codebase/ARCHITECTURE.md` (HIGH confidence)
- Project context: `.planning/PROJECT.md` (HIGH confidence)
