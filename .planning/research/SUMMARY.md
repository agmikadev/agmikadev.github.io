# Project Research Summary

**Project:** Star System Portfolio
**Domain:** 3D interactive space-themed developer portfolio
**Researched:** 2026-05-17
**Confidence:** HIGH

## Executive Summary

The Star System Portfolio is a 3D interactive developer portfolio built on React 19 with React Three Fiber (R3F), using a solar system metaphor where each planet represents a development skill stage. Experts build this type of product by combining the Poimandres ecosystem (R3F + drei + zustand) with strict performance discipline — mutating refs instead of state in animation loops, capping pixel ratios, and keeping the 3D canvas isolated from DOM overlays. The portfolio already has a strong foundation: orbital planet views, project showcase via MissionCards, skill analytics, a CLI header, and a sidebar profile. The primary new feature is an AI "sonda network" belt that visually connects all planets, representing agentic AI proficiency.

The recommended approach is to build incrementally on the existing architecture: add the belt data model first, repurpose the existing NeuralConstellation component for visual belt connections, build a BeltHUD following the established PlanetDashboard pattern, and polish with onboarding, loading states, and performance optimizations. The stack is well-established with clear version pinning (three@0.182.0 to avoid R3F/drei version mismatches, React 19-compatible R3F v9 and postprocessing v3). Plain CSS is sufficient for styling — no CSS-in-JS or Tailwind needed.

Key risks are: (1) **Performance degradation** on mid-range hardware from belt additions — mitigated by single rAF loop, cached dimensions, pixel ratio capping, and r3f-perf monitoring; (2) **Accessibility blind spots** from canvas rendering — mitigated by @react-three/a11y, keyboard navigation, and prefers-reduced-motion detection; (3) **The "wow" trap** where visual spectacle obscures portfolio content — mitigated by content-first design rules and always-visible identity HUD; (4) **GPU memory leaks** causing tab crashes — mitigated by proper disposal patterns and monitoring renderer.info.memory during development.

## Key Findings

### Recommended Stack

The Poimandres ecosystem is the de facto standard for R3F projects. All core libraries are designed to work together, share the same lightweight philosophy, and are actively maintained by the same team.

**Core technologies:**
- `three@0.182.0` (pinned): 3D graphics engine — pin to r182 because R3F/drei lag behind Three.js releases by weeks; version mismatches cause runtime errors
- `@react-three/fiber@9.5.0`: React renderer for Three.js — v9 required for React 19; declarative JSX maps cleanly to scene graph
- `@react-three/drei@10.7.7`: Three.js helpers/abstractions — 80+ helpers (OrbitControls, Environment, Text3D, PerformanceMonitor, Stars); saves hundreds of LOC
- `@react-spring/three@10.0.3`: Spring-physics 3D animations — updates outside React reconciliation, no re-render overhead
- `zustand@5.0.0+`: Global state management — 1KB, hook-based, selector subscriptions prevent cascading re-renders; R3F uses it internally
- `@react-three/postprocessing@3.0.4`: Post-processing effects — v3 required for React 19; use Bloom + Vignette + Noise, avoid DepthOfField/SSAO
- `rolldown-vite 7.2.5`: Build tool — already configured, OXC-powered fast transpilation, HMR works with R3F

**Critical version requirements:**
- three must be pinned to 0.182.0 (not latest r184)
- @react-three/fiber v9 required for React 19 (v8 is React 18 only)
- @react-three/postprocessing v3 required for React 19 (v2 is React 18 only)
- framer-motion-3d is **incompatible with React 19** — do not use

### Expected Features

The portfolio already covers most table stakes. The MVP additions focus on completing the core experience and implementing the AI belt differentiator.

**Must have (table stakes):**
- Loading state — visual feedback during 3D initialization prevents "broken site" impression
- Onboarding hints — first-visit guidance solves #1 complaint about 3D portfolios ("I don't know what to do")
- Resume/CV download — hiring managers need one-click PDF access
- AI Sonda network belt — core differentiator; animated connections showing agentic skills
- Performance baseline — 60fps on mid-range hardware; laggy 3D = immediate bounce
- Asset optimization — compressed models, lazy-loaded textures; total initial bundle <2MB

**Should have (competitive):**
- Smooth camera transitions — professional feel when moving between planets
- Expanded mission reports — case-study structure (problem → approach → outcome)
- Belt HUD panel — consistent with planet HUD pattern
- Subtle post-processing — one effect max (e.g., bloom on planet atmospheres)

**Defer (v2+):**
- Easter egg CLI commands — fun but not essential
- Analytics tracking — anonymous usage stats for navigation insights

### Architecture Approach

The architecture follows a clean separation between the DOM overlay layer (SideStrip, MainFrame, HUD panels) and the R3F Canvas layer (planet meshes, scanner rings), with an SVG/HTML animation layer for orbital rings and belt connections. Data flows strictly top-down from static TypeScript data files through PlanetarySystem to child components, with callback returns for selection events.

**Major components:**
1. **PlanetarySystem** — owns orbital animation engine, planet rendering, hover/select state, and belt rendering; owns the rAF loop
2. **PlanetDashboard** — detail view with 3D planet, CLI header, tabs; self-contained, receives planet data as props
3. **NeuralConstellation** — SVG line animation for belt connections; repurpose from unused component to feed live planet positions
4. **BeltHUD** (new) — same two-tab pattern as PlanetDashboard for AI belt; reuses Tabs, MissionCard, AnalyticsTab
5. **SideStrip** — sidebar with astronaut profile, telemetry, social links; self-contained, no 3D dependencies

**Key patterns to follow:**
- Single rAF loop handles both orbital and belt calculations (never multiple loops)
- Mutate refs in animation loops, never setState
- Keep Canvas mounted — use visibility toggling, not conditional mounting
- Memoize expensive computations (belt data filtering, mission filtering)

### Critical Pitfalls

1. **The "Wow" Trap (style over substance)** — Every 3D element must serve content delivery. Apply the 5-second test: visitors must know who you are, what you do, and where to find projects within 5 seconds. Keep identity HUD always visible.

2. **Accessibility blind spot** — Canvas is invisible to screen readers. Add @react-three/a11y wrappers, keyboard navigation (Tab/Enter/Escape), prefers-reduced-motion detection, and ARIA live regions. Design during UI phase, not retrofit.

3. **Performance degradation on real devices** — Already present: per-frame clientWidth/clientHeight reads (layout thrashing), no pixel ratio cap. Fix: cache dimensions with ResizeObserver, cap DPR at 2, throttle raycasting to 30Hz, add r3f-perf monitoring.

4. **GPU memory leaks** — Three.js GPU resources are NOT garbage collected. Let R3F handle disposal for standard components, use dispose={null} for shared instances, monitor renderer.info.memory during development.

5. **GitHub Pages deployment gotchas** — vite.config.ts has base: '/' which 404s all assets on subpath deployment. Fix to base: './' before any deployment. Remove unused gh-pages dependency.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation & Fixes
**Rationale:** Critical bugs and infrastructure must be fixed before adding new features. The GitHub Pages base path issue will break deployment entirely. Performance issues (layout thrashing, no DPR cap) will compound when belt elements are added.
**Delivers:** Fixed vite.config.ts base path, cached dimensions via ResizeObserver, pixel ratio cap at 2, loading state for 3D initialization, resume/CV download link
**Addresses:** Loading state (table stakes), Resume download (table stakes), Pitfall 8 (deployment), Pitfall 3 (performance baseline)
**Avoids:** Pitfall 8 (blank screen on GitHub Pages), Pitfall 3 (performance degradation from existing issues)

### Phase 2: Belt Data & Visual Core
**Rationale:** The AI belt is the core differentiator. Everything else depends on the data shape, so BeltData.ts must come first. NeuralConstellation integration provides the visual foundation.
**Delivers:** BeltData.ts with TypeScript interfaces, NeuralConstellation repurposed for belt connections, animated SVG lines between planets, clickable belt entity
**Uses:** drei helpers, SVG animation layer, refs for live planet positions
**Implements:** NeuralConstellation integration, single rAF loop pattern
**Addresses:** AI Sonda network belt (core differentiator)
**Avoids:** Pitfall 4 (GPU memory leaks — dispose belt resources properly), Pitfall 3 (performance — profile with r3f-perf)

### Phase 3: Belt Interaction & HUD
**Rationale:** Needs both data model and clickable belt from Phase 2. BeltHUD follows the established PlanetDashboard pattern, reusing existing Tabs/MissionCard/AnalyticsTab components.
**Delivers:** BeltHUD component with two-tab pattern, selectedBelt state in PlanetarySystem, onClose callback, belt-specific mission reports and proficiency analytics
**Uses:** Existing Tabs, MissionCard, AnalyticsTab components; zustand for shared state if needed
**Implements:** BeltHUD component, top-down data flow with callback returns
**Addresses:** Belt HUD panel (should-have), Expanded mission reports (should-have)
**Avoids:** Pitfall 5 (unclear navigation — define belt interaction model explicitly with hover states and return paths)

### Phase 4: Polish & Accessibility
**Rationale:** All functional components are in place. Now focus on the user experience layer: onboarding, smooth transitions, accessibility, and visual polish.
**Delivers:** First-visit onboarding overlay (localStorage-dismissed), smooth camera transitions between planets, @react-three/a11y wrappers, keyboard navigation, prefers-reduced-motion support, subtle post-processing (Bloom + Vignette)
**Uses:** @react-three/a11y, drei camera controls, @react-three/postprocessing v3, localStorage for onboarding state
**Addresses:** Onboarding hints (table stakes), Smooth camera transitions (should-have), Subtle post-processing (nice-to-have)
**Avoids:** Pitfall 1 (wow trap — content-first design), Pitfall 2 (accessibility), Pitfall 5 (unclear navigation), Pitfall 9 (color contrast)

### Phase 5: Pre-Deployment Review
**Rationale:** Final quality gate before going live. Addresses remaining pitfalls that don't block development but are critical for production.
**Delivers:** React error boundary with 2D fallback, Three.js code-splitting via rollupOptions, bundle compression, SEO meta tags (OG, Twitter Cards), local favicon, cross-device testing on real hardware
**Addresses:** Pitfall 7 (no error boundary), Pitfall 6 (bundle bloat), Pitfall 11 (SEO/social sharing)
**Avoids:** Pitfall 7 (WebGL failures crash app), Pitfall 6 (slow initial load), Pitfall 11 (blank social previews)

### Phase Ordering Rationale

- **Phase 1 first** because deployment and performance fixes are prerequisites — adding belt features on top of broken deployment or layout-thrashing animation loops would compound problems.
- **Phase 2 before Phase 3** because belt data model is the foundation everything else depends on (explicit dependency from ARCHITECTURE.md).
- **Phase 4 after functional phases** because onboarding, accessibility, and polish require stable UI to validate against.
- **Phase 5 last** because error boundaries, code-splitting, and SEO are production concerns that don't block feature development.
- This ordering avoids the "wow trap" by establishing functional correctness before visual polish.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Belt Visual Core):** NeuralConstellation repurposing may need investigation — verify SVG line animation performance with 6+ animated connections updating per frame. Consider throttling to every 2nd frame if frame budget is exceeded.
- **Phase 4 (Accessibility):** @react-three/a11y integration with existing planet labels and new belt elements needs hands-on testing. Keyboard navigation flow across planets + belt + HUD needs explicit design.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation & Fixes):** Well-documented patterns — ResizeObserver, DPR capping, loading states are standard R3F practices with official docs.
- **Phase 3 (Belt HUD):** Reuses existing component patterns (Tabs, MissionCard, AnalyticsTab) — no new architectural concepts.
- **Phase 5 (Pre-Deployment):** Standard web deployment practices — error boundaries, code-splitting, meta tags are well-established.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Verified against official R3F docs, npm registries, and pmndrs GitHub repos. Version compatibility matrix confirmed. |
| Features | HIGH | Based on hiring manager surveys, Three.js forum feedback, and analysis of existing codebase capabilities. |
| Architecture | HIGH | Built from existing codebase analysis (ARCHITECTURE.md) plus official R3F patterns. Component boundaries are well-defined. |
| Pitfalls | HIGH | Each pitfall backed by official R3F docs, Three.js forum user feedback, and specific warnings identified in existing codebase. |

**Overall confidence:** HIGH

### Gaps to Address

- **framer-motion-3d React 19 compatibility:** Research flagged as LOW confidence — docs are ambiguous. Not critical since @react-spring/three is the recommended alternative, but worth confirming if framer-motion-3d is ever reconsidered.
- **NeuralConstellation performance at scale:** SVG line animation performance with animated glow effects needs empirical testing during Phase 2. If 6 planets × 5 connections = 30 lines updating per frame causes jank, throttle to every 2nd frame or reduce glow complexity.
- **Mobile fallback strategy:** Research recommends "ensure it doesn't break on mobile" but doesn't define what the mobile experience should be. During Phase 4, decide whether to provide a simplified 2D view or accept desktop-primary with graceful degradation.
- **Belt data content:** BeltData.ts structure is defined but actual AI tool proficiency data needs to be authored. This is a content gap, not a technical one — flag during planning.

## Sources

### Primary (HIGH confidence)
- R3F Official Docs (https://r3f.docs.pmnd.rs/) — performance pitfalls, state management, automatic disposal
- R3F GitHub Repository (https://github.com/pmndrs/react-three-fiber, v9.6.1, Apr 2026) — version compatibility, API reference
- Drei GitHub (https://github.com/pmndrs/drei, v10.7.7, Nov 2025) — helper components, PerformanceMonitor, DetectGPU
- @react-three/postprocessing npm (v3.0.4, Feb 2025) — React 19 compatibility, EffectComposer
- @react-spring/three npm (v10.0.3, Sep 2025) — spring physics for R3F
- react-three-a11y (https://github.com/pmndrs/react-three-a11y) — accessibility wrappers for R3F
- Three.js Forum portfolio feedback threads — real user complaints about 3D portfolio UX
- Existing codebase architecture (.planning/codebase/ARCHITECTURE.md) — component boundaries, data flow
- Project context (.planning/PROJECT.md) — project scope and goals

### Secondary (MEDIUM confidence)
- Krapton R3F mobile performance guide (Apr 2026) — mobile optimization techniques
- Wawa Sensei R3F course — scroll animations, performance patterns
- R3F Best Practices (SkillKit) — state management, component patterns
- R3F State Management (DeepWiki) — zustand integration patterns
- IGC: Three.js Performance Optimisation (2026) — layout thrashing, material sharing
- IGC: Accessibility in Three.js 3D Interfaces (2026) — a11y patterns for canvas
- Utsubo: 100 Three.js Tips (2026) — miscellaneous optimization techniques
- Marcelo Retana 3D portfolio guide — portfolio structure recommendations
- DEV Community 3D portfolio guides (Mar 2026) — community best practices

### Tertiary (LOW confidence)
- framer-motion-3d React 19 compatibility status — docs are ambiguous, needs validation
- Reddit r/webdev portfolio mistakes — single source, but aligns with other findings
- Accessing Higher Ground: 3D Accessibility (2023 conference) — older but relevant a11y guidance

---
*Research completed: 2026-05-17*
*Ready for roadmap: yes*
