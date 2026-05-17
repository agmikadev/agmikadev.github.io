# Technology Stack: 3D Interactive Portfolio

**Project:** Star System Portfolio
**Researched:** 2026-05-17
**Scope:** Standard 2026 stack for immersive 3D web portfolios

---

## Recommended Stack

### Core 3D Rendering

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `three` | ^0.182.0 (pin) | 3D graphics engine | Industry standard WebGL library. r184 is latest (Apr 2026), but **pin to r182** — R3F/drei lag behind Three.js releases by weeks and version mismatches cause runtime errors. |
| `@react-three/fiber` | ^9.5.0 | React renderer for Three.js | Declarative JSX for Three.js. v9 pairs with React 19. 30K+ GitHub stars, 700K weekly npm downloads. Performance within a few percent of vanilla Three.js when used correctly. |
| `@react-three/drei` | ^10.7.7 | Three.js helpers/abstractions | Essential helpers: OrbitControls, Environment, Text3D, Float, Html, useGLTF, PerformanceMonitor, Stars, Sparkles, MeshTransmissionMaterial, and 80+ more. Saves hundreds of LOC. |
| `@types/three` | ^0.182.0 | TypeScript definitions | Must match Three.js minor version exactly. |

### Animation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `useFrame` (built into R3F) | — | Per-frame animation loop | **Primary animation mechanism.** Never use `requestAnimationFrame` directly — `useFrame` integrates with R3F's render loop, handles cleanup, and provides delta time. Mutate refs, never setState. |
| `@react-spring/three` | ^10.0.3 | Spring-physics 3D animations | **Recommended for spring-based animations.** Physically correct motion, works with React 19, integrates natively with R3F's imperative API. Updates happen outside React's reconciliation — no re-render overhead. |
| `gsap` + `@gsap/react` | ^3.12+ | Timeline/scroll-driven animations | **Use for scroll-triggered animations only.** GSAP ScrollTrigger is unmatched for scroll-driven 3D sequences. Must manually update GSAP's ticker inside `useFrame()` for WebXR compatibility. Overkill for simple animations. |

**NOT recommended:**
- `framer-motion-3d` (v12.4.13) — **Only compatible with React 18**, not React 19. Uses `requestAnimationFrame` which conflicts with R3F's render loop in WebXR contexts. The parent `motion` library renamed to `motion/react` but framer-motion-3d is stuck on old peer deps.
- `react-spring` core (non-Three target) — Use `@react-spring/three` specifically for R3F scenes.

### State Management

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `zustand` | ^5.0.0+ | Global state management | **The standard for R3F.** Lightweight (1KB), hook-based, selector subscriptions prevent cascading re-renders. R3F itself uses Zustand internally. Perfect for shared state between 2D UI and 3D canvas (selected planet, active tab, belt state). |

**State management rules for R3F:**
- Use **Zustand selectors** (`useStore(s => s.selectedPlanet)`) — never subscribe to entire store
- Use **transient subscriptions** (`store.subscribe`) for continuous values in `useFrame` — zero re-renders
- Store **primitives** in Zustand, not Three.js objects (Vector3 mutations don't trigger re-renders)
- **Never call setState inside useFrame** — this is the #1 performance killer (triggers 60 React reconciliations/sec)
- Separate stores by concern (uiStore, sceneStore) — don't make everything reactive

### Post-Processing

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `@react-three/postprocessing` | ^3.0.4 | Post-processing effects | React 19 compatible (v3.0.3+). EffectComposer with Bloom, DepthOfField, Vignette, Noise, SMAA, SSAO, SelectiveBloom, and more. Uses single-triangle fullscreen pass for performance. MSAA enabled by default. |

**Recommended effects for portfolio:**
- `Bloom` with `mipmapBlur` (more efficient than standard blur) — glow on emissive planets/belt
- `Vignette` — cinematic framing
- `Noise` at low opacity (0.02) — subtle film grain
- `SMAA` — anti-aliasing (enabled by default via MSAA)

**Avoid in production:**
- `DepthOfField` — expensive on mobile GPUs
- `SSAO` — heavy performance cost, use baked shadows instead
- `SelectiveBloom` — known GPU memory leak issue with Three.js 0.182+ (Issue #344)

### Styling

| Technology | Purpose | Why |
|------------|---------|-----|
| Plain CSS + CSS custom properties | HUD, panels, typography | Already in use. No CSS-in-JS, no Tailwind. Design tokens in `App.css`, component-scoped CSS co-located. Perfect for a static portfolio — zero runtime overhead, no bundle size impact. |

**NOT recommended for this project:**
- Tailwind CSS — adds build complexity, no benefit for a small component count
- CSS-in-JS (styled-components, emotion) — runtime overhead, unnecessary for static site
- CSS Modules — overkill when plain CSS with BEM-like scoping works

### Build & Tooling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `rolldown-vite` | 7.2.5 | Build tool | OXC-powered fast transpilation. Already configured. HMR works well with R3F. |
| `typescript` | ~5.9.3 | Type checking | Strict mode with `noUnusedLocals`, `verbatimModuleSyntax`. Already configured. |
| `eslint` | ^9.39.1 | Linting | Flat config with react-hooks, react-refresh, typescript-eslint plugins. |
| `gh-pages` | ^6.3.0 | GitHub Pages deployment | Static SPA deployment via `npm run deploy`. |

### Development Tools (devDependencies only)

| Technology | Purpose | When to Use |
|------------|---------|-------------|
| `r3f-perf` | Real-time performance monitoring | Development only. Drop `<Perf />` in Canvas to monitor FPS, draw calls, triangles, memory. Last updated Nov 2024 (v7.2.3), peer deps require R3F v8+ but works with v9. |
| `leva` | Debug GUI controls | Development only. Create floating panels to tweak lighting, materials, animation params in real-time. Part of Poimandres ecosystem. |
| `leva-r3f-stats` | R3F stats in Leva panel | Development only. Integrates FPS/GPU/triangle metrics into Leva GUI. |
| `triplex` (VS Code extension) | Visual R3F editor | Optional. Build 2D/3D components visually in VS Code, then jump to code. 1.2K stars. |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| 3D Renderer | @react-three/fiber | Vanilla Three.js | Project is already React-based. R3F performance is within a few percent of vanilla. Component model maps cleanly to scene graph. |
| 3D Renderer | @react-three/fiber | Babylon.js + React | Babylon has steeper learning curve, smaller React ecosystem, fewer community examples. |
| Animation | @react-spring/three | GSAP for all animations | GSAP is heavier (bundle size), overkill for simple spring animations. Use GSAP only for scroll-driven sequences. |
| Animation | @react-spring/three | framer-motion-3d | **Incompatible with React 19.** Stuck on React 18 peer deps. Uses rAF which conflicts with R3F render loop. |
| State | zustand | Redux Toolkit | Redux is heavier, more boilerplate, unnecessary for this scale. Zustand is 1KB vs Redux's 10KB+. |
| State | zustand | React Context | Context changes cascade re-renders through entire subtree — expensive in 3D scenes with dozens of components. Zustand lets each component subscribe to just the slice it needs. |
| State | zustand | jotai | Jotai is also good (same Poimandres team), but Zustand's selector pattern is more explicit and better documented for R3F use cases. |
| Post-processing | @react-three/postprocessing | Custom EffectComposer | Drei's wrapper saves hundreds of LOC. Custom setup only needed for complex shader chains. |
| Styling | Plain CSS | Tailwind CSS | Tailwind adds build step complexity and ~50KB to bundle. Plain CSS with custom properties is simpler for a small static site. |
| Deployment | GitHub Pages | Vercel/Netlify | Project already has GitHub Actions pipeline. Vercel/Netlify offer no advantage for a fully static SPA. |

---

## Performance Optimization Techniques

### Critical (must implement)

1. **`dpr={[1, 2]}` on Canvas** — Cap pixel ratio at 2x. Retina screens don't need 3x for 3D content. Saves 50%+ GPU work on 3x displays.

2. **`frameloop="demand"` for static scenes** — Only render when something changes. If planets orbit continuously, keep default `frameloop="always"`. For HUD interactions, use `invalidate()` to trigger re-renders.

3. **Refs for animation, not state** — Mutate `meshRef.current.position` inside `useFrame`. Never `setPosition()` 60 times/sec.

4. **`useMemo` for geometries and materials** — Prevents recreation on parent re-renders. GC will eat your scene alive without it.

5. **Suspense for async assets** — Wrap 3D content in `<Suspense>`. Textures and models load asynchronously and will suspend the component.

6. **`useGLTF.preload()` for asset preloading** — Pre-load models in background before they're needed.

### High Impact

7. **InstancedMesh for repeated geometry** — Particle fields, star backgrounds, belt network nodes. One draw call instead of hundreds.

8. **`PerformanceMonitor` from drei** — Auto-adjusts quality based on FPS. Reduces pixel ratio when frames drop, increases when performance is good.

9. **`DetectGPU` from drei** — Conditionally enable/disable expensive effects based on device capability. Disable post-processing on mobile.

10. **Geometry disposal** — R3F auto-disposes on unmount, but manually created geometries/materials need `.dispose()`.

### Medium Impact

11. **KTX2 texture compression** — 4-8x smaller textures with GPU decompression. Use `useKTX2` from drei.

12. **Draco geometry compression** — Up to 10x smaller GLTF models. Compress with `gltf-pipeline` or Blender export.

13. **LOD (Level of Detail)** — drei's `<Detailed>` component renders lower-poly versions at distance.

14. **Avoid inline objects/arrays in JSX** — `{[1, 2, 3]}` creates new array every render. Extract to constants or `useMemo`.

### Development Monitoring

15. **`r3f-perf` in development** — Monitor FPS, draw calls, triangles, memory. Target: <1000 draw calls, <1M triangles, stable FPS.

---

## Installation

```bash
# Core 3D stack (already installed)
npm install three@0.182.0 @react-three/fiber@9.5.0 @react-three/drei@10.7.7

# Animation
npm install @react-spring/three@10.0.3
# OR for scroll-driven animations:
npm install gsap @gsap/react

# State management
npm install zustand

# Post-processing
npm install @react-three/postprocessing@3.0.4

# Dev tools
npm install -D r3f-perf leva leva-r3f-stats
```

---

## Version Compatibility Matrix

| Package | React 18 | React 19 | Notes |
|---------|----------|----------|-------|
| `@react-three/fiber` v8 | YES | NO | Pairs with React 18 |
| `@react-three/fiber` v9 | NO | YES | **Required for React 19** |
| `@react-three/drei` v10 | YES | YES | Works with both |
| `@react-three/postprocessing` v2 | YES | NO | React 18 only |
| `@react-three/postprocessing` v3 | NO | YES | **Required for React 19** (v3.0.3+) |
| `@react-spring/three` v10 | YES | YES | Works with both |
| `framer-motion-3d` v12 | YES | NO | **Incompatible with React 19** |
| `zustand` v5 | YES | YES | Works with both |

---

## Architecture Recommendations

### The Poimandres Ecosystem

The pmndrs collective maintains the de facto standard stack for R3F projects:

```
@react-three/fiber  →  React renderer (core)
@react-three/drei   →  Helpers and abstractions
@react-three/postprocessing → Effects
zustand             →  State management (same team)
leva                →  Debug GUI (same team)
maath               →  Math helpers (same team)
```

**Use the Poimandres ecosystem.** These libraries are designed to work together, share the same philosophy (lightweight, composable, React-idiomatic), and are actively maintained by the same team that builds R3F itself.

### Component Organization

```
src/
  components/
    canvas/          # R3F components (inside Canvas)
      planets/       # Planet meshes, orbits, labels
      belt/          # AI belt network, connections
      effects/       # Post-processing, particles, stars
    hud/             # 2D UI overlays (HTML inside Canvas via drei/Html)
    ui/              # Pure React UI components (outside Canvas)
  hooks/             # useFrame hooks, custom R3F hooks
  stores/            # Zustand stores
  data/              # Static TypeScript data (PlanetaryData, MissionData)
```

---

## Sources

- **HIGH confidence:**
  - R3F official docs: https://r3f.docs.pmnd.rs/
  - Drei GitHub: https://github.com/pmndrs/drei (v10.7.7, Nov 2025)
  - R3F GitHub: https://github.com/pmndrs/react-three-fiber (v9.6.1, Apr 2026)
  - Three.js releases: https://github.com/mrdoob/three.js/releases (r184, Apr 2026)
  - @react-three/postprocessing npm: https://www.npmjs.com/package/@react-three/postprocessing (v3.0.4, Feb 2025)
  - @react-spring/three npm: https://www.npmjs.com/package/@react-spring/three (v10.0.3, Sep 2025)
  - R3F best practices: https://github.com/emalorenzo/three-agent-skills/blob/main/R3F_BEST_PRACTICES.md

- **MEDIUM confidence:**
  - Krapton R3F mobile performance guide (Apr 2026): https://www.krapton.com/blog/boosting-react-three-fiber-mobile-performance-in-2026
  - Wawa Sensei R3F mistakes: https://wawasensei.dev/tuto/3-react-three-fiber-mistakes
  - Marcelo Retana 3D portfolio guide: https://marceloretana.com/learn/build-a-3d-portfolio-with-threejs
  - DEV Community 3D portfolio guide (Mar 2026): https://dev.to/deltacraft/build-a-stunning-3d-portfolio-with-react-three-fiber-step-by-step-59jk

- **LOW confidence:**
  - framer-motion-3d React 19 compatibility status (docs are ambiguous)

---

*Stack research: 2026-05-17*
