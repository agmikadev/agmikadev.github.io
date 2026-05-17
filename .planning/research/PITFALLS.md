# Domain Pitfalls: 3D Interactive Portfolios

**Domain:** 3D interactive portfolio websites (Three.js / React Three Fiber)
**Researched:** 2026-05-17

## Critical Pitfalls

Mistakes that cause the portfolio to fail its primary purpose — communicating skills to hiring managers — or cause major rewrites.

---

### Pitfall 1: The "Wow" Trap — Style Over Substance

**What goes wrong:** The portfolio is visually impressive but hiring managers cannot quickly find what they need: who you are, what you've built, and how to contact you. The 3D spectacle becomes the focus instead of the developer's actual skills and projects.

**Why it happens:** Developers building 3D portfolios are excited about the technology and over-invest in visual effects (particle systems, physics, camera animations) while under-investing in content clarity. The portfolio becomes a tech demo, not a professional showcase.

**Consequences:**
- Hiring managers spend 30+ seconds figuring out how to navigate — most close the tab within 10 seconds
- Project details are buried behind interactions that feel clever but are inefficient
- No clear "about me," "skills," or "contact" sections visible at a glance
- The portfolio communicates "I can make cool 3D stuff" but not "I can build the product you need"

**Warning signs:**
- First-time visitors ask "how do I use this?" (common feedback on Three.js forum showcases)
- No text content visible without interaction
- Project cards require multiple clicks/navigations to reach
- The landing view has no clear call-to-action or identity statement

**Prevention:**
- **Content-first rule:** Every 3D element must serve content delivery, not decoration. If a visual effect doesn't help communicate a skill or project, remove it.
- **5-second test:** A visitor should know who you are, what you do, and where to find your projects within 5 seconds of landing.
- **Always-visible HUD:** Keep key identity info (name, role, contact) in a persistent overlay, not buried in 3D space.
- **This project's risk:** The Star System Portfolio has a strong theme but must ensure the CLI header, astronaut profile, and planet labels immediately communicate the developer's identity and skills.

**Phase to address:** UI/UX Design phase — establish content hierarchy before 3D implementation.

---

### Pitfall 2: Accessibility Blind Spot — Canvas Is a Black Box

**What goes wrong:** The entire 3D experience is rendered in a `<canvas>` element, which is invisible to screen readers, has no keyboard navigation, and excludes users with motor or vestibular impairments. For a developer portfolio, this signals that accessibility was not considered — a red flag for hiring managers who value inclusive design.

**Why it happens:** Three.js renders pixels, not DOM nodes. Screen readers see an empty canvas. Keyboard users have no tab targets. This is not a Three.js limitation — it's a design oversight that requires deliberate mitigation.

**Consequences:**
- Screen reader users hear nothing or "image" — zero content
- Keyboard-only users cannot navigate planet nodes or HUD elements
- Users with vestibular disorders experience nausea from uncontrolled animations
- Hiring managers may interpret this as lack of professional maturity

**Warning signs:**
- Planet nodes are `<div>` with `onClick` but no `role="button"`, `tabIndex`, or keyboard handlers (already present in this codebase)
- No `prefers-reduced-motion` detection
- No ARIA live regions for screen reader announcements
- No alternative text representation of the 3D content

**Prevention:**
- Use `@react-three/a11y` to add `A11y` wrappers around interactive 3D objects with `role`, `description`, and `actionCall` props
- Add keyboard navigation: Tab cycles through planets, Enter selects, Escape deselects
- Detect `prefers-reduced-motion` and disable auto-rotation, pulsing, and camera animations
- Provide a non-3D fallback or parallel HTML view with the same content (project cards, skills, contact info)
- Add `aria-live="polite"` region that announces the currently focused planet/element

**Phase to address:** Accessibility must be designed during the UI/UX phase, not retrofitted. Implement during the belt integration phase when new interactive elements are added.

---

### Pitfall 3: Performance Degradation on Real Devices

**What goes wrong:** The portfolio runs at 60fps on the developer's high-end machine but drops to 15-20fps on laptops with integrated GPUs and crashes on mobile after 5-10 minutes due to thermal throttling.

**Why it happens:** Performance problems accumulate gradually — each individual decision seems acceptable. Reading layout properties every frame (`clientWidth`/`clientHeight` in the animation loop), creating materials per object, not capping pixel ratio, and running raycasting on every mouse move compound into an unusable experience.

**Consequences:**
- Hiring managers on work laptops (often with integrated graphics) see stuttering animations
- Mobile visitors experience tab crashes after extended browsing
- The portfolio communicates "doesn't work on my machine" — the opposite of the intended message
- Three.js forum feedback consistently cites this as the #1 complaint about showcased portfolios

**Warning signs (already present in this codebase):**
- `PlanetarySystem.tsx` reads `containerRef.current.clientWidth` and `clientHeight` every frame — forces synchronous layout recalculation (layout thrashing)
- No pixel ratio cap — high-DPI screens render 3-4x more pixels than needed
- `Planet3D.tsx` creates materials with `useMemo` — currently safe but fragile if dependencies change
- No performance monitoring during development

**Prevention:**
- **Cache dimensions:** Replace per-frame `clientWidth`/`clientHeight` reads with `ResizeObserver` callback (already identified in CONCERNS.md)
- **Cap pixel ratio:** `gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))` — one line, doubles mobile FPS
- **Share materials:** All planets should share material instances where appearance is identical
- **Throttle raycasting:** Run hover detection at 30Hz instead of every mouse move event
- **Add `r3f-perf`:** Include `<Perf />` component during development to monitor draw calls, FPS, and memory
- **Test on real devices:** Not just Chrome DevTools device emulation — actual older laptops and phones under sustained load

**Phase to address:** Performance optimization should be part of the belt integration phase (new 3D elements) and a dedicated polish phase before deployment.

---

### Pitfall 4: GPU Memory Leaks — The Silent Tab Crash

**What goes wrong:** GPU resources (geometries, materials, textures) are not explicitly disposed when components unmount or when scenes change. GPU memory grows linearly with session length. After 30-60 minutes, the browser tab crashes.

**Why it happens:** Unlike JavaScript objects, Three.js GPU resources are NOT garbage collected. They must be explicitly freed with `.dispose()`. R3F handles automatic disposal for most cases, but shared/global resources, cached loaders, and `primitive` objects require manual management.

**Consequences:**
- Portfolio crashes after extended viewing (hiring managers who browse multiple sections)
- Memory leak is invisible during short development sessions — only manifests in production
- Safari/iOS is particularly aggressive about killing memory-heavy tabs

**Warning signs:**
- `renderer.info.memory.geometries` or `renderer.info.memory.textures` grows over time without new visible content
- Chrome Task Manager (Shift+Esc) shows GPU memory increasing during normal navigation
- Components that conditionally render/unmount 3D content without cleanup

**Prevention:**
- Let R3F handle disposal for standard `<mesh>`, `<geometry>`, `<material>` components
- Use `dispose={null}` on components that share global geometry/material instances to prevent double-disposal
- Clear loader caches when assets change: `useGLTF.clear(url)`, `useLoader.clear(GLTFLoader, url)`
- Monitor `renderer.info.memory` during development sessions
- For this project: since all content is static (no dynamic loading/unloading of models), risk is lower — but the belt integration will add new visual elements that must be properly managed

**Phase to address:** Belt integration phase — ensure all new belt visuals are properly disposed if/when they change.

---

### Pitfall 5: Unclear Navigation and Interaction Model

**What goes wrong:** Visitors don't know what they can do, how to do it, or what the 3D elements represent. The portfolio requires exploration to understand, but exploration is frustrating without guidance.

**Why it happens:** 3D interfaces lack the conventional navigation patterns users expect from websites (navbar, sidebar, breadcrumbs). Without explicit affordances, users are left guessing. Three.js forum feedback consistently shows this pattern: "When it loads, I see that screen, but I don't know what to do."

**Consequences:**
- Visitors interact randomly, miss key content, and leave
- The "free exploration" model sounds good in theory but fails in practice without onboarding
- Planet labels that are hard to read or positioned poorly (partially illegible buttons reported in portfolio reviews)
- No way to return to a previous view after navigating deep into content

**Warning signs:**
- First interaction requires guessing (click what? scroll where?)
- No visual affordances indicating clickable/hoverable elements
- No "you are here" indicator in the planetary system
- Navigation is one-way (can enter a planet view but not easily return)

**Prevention:**
- **Explicit onboarding:** Show a brief, skippable hint on first visit ("Click a planet to explore" or "Hover planets for details")
- **Persistent navigation:** Keep a mini-map or planet strip visible at all times so users know where they are
- **Clear affordances:** Hover states, cursor changes, and visual highlights on interactive elements
- **Bidirectional navigation:** Every action should have an obvious undo/return path
- **This project's advantage:** The existing HUD pattern (tabs, side strip, CLI header) already provides a familiar 2D overlay — leverage this as the primary navigation, with 3D as the visual layer

**Phase to address:** UI/UX Design phase — define the interaction model before implementing belt visuals.

---

## Moderate Pitfalls

### Pitfall 6: Bundle Size Bloat from Three.js

**What goes wrong:** The initial JavaScript bundle is too large because Three.js is not properly code-split, causing slow initial load times. On slow connections, visitors see a blank screen for 3+ seconds.

**Why it happens:** `import * as THREE from "three"` pulls in the entire library. Without manual chunk splitting in the build config, Three.js lands in the main bundle. GitHub Pages has no CDN edge caching, so every visitor downloads the full bundle.

**Consequences:**
- First Contentful Paint exceeds 3 seconds on 3G connections
- Visitors abandon before the 3D scene even loads
- Lighthouse performance score drops below 50

**Warning signs (already present in this codebase):**
- `Planet3D.tsx` uses `import * as THREE from "three"`
- `vite.config.ts` has no `rollupOptions` for manual chunk splitting
- No build optimization, compression, or asset optimization configured

**Prevention:**
- Split Three.js into its own vendor chunk via `rollupOptions.output.manualChunks`
- Use specific imports where possible instead of `import * as THREE`
- Add compression (gzip/brotli) for production builds
- Show a loading screen/skeleton while Three.js initializes (already identified as missing in CONCERNS.md)

**Phase to address:** Build optimization can be done during the belt integration phase or as a dedicated polish milestone.

---

### Pitfall 7: No Error Boundary — WebGL Failures Crash the Entire App

**What goes wrong:** If WebGL is not supported, the GPU driver crashes, or Three.js fails to initialize, the entire app shows a white screen with no explanation.

**Why it happens:** No React error boundary wraps the `Canvas` component. Any Three.js runtime error propagates to the root and unmounts the entire app.

**Consequences:**
- Users on older browsers, VMs, or restricted corporate environments see a blank page
- No graceful degradation — the portfolio is completely inaccessible
- Hiring managers may assume the site is broken, not that their browser is incompatible

**Warning signs:**
- No `<ErrorBoundary>` component in the app tree
- No WebGL detection before attempting to render
- No fallback UI when Canvas fails

**Prevention:**
- Wrap `PlanetarySystem` or `Canvas` in a React error boundary that shows a static HTML fallback with the same content
- Detect WebGL support before rendering: `const canvas = document.createElement('canvas'); const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');`
- If no WebGL, render a 2D version of the portfolio with the same project cards and skills data

**Phase to address:** Should be implemented during the belt integration phase (new 3D elements increase failure surface).

---

### Pitfall 8: GitHub Pages Deployment Gotchas

**What goes wrong:** The portfolio works locally but fails after deployment to GitHub Pages due to base path misconfiguration, asset resolution errors, or SPA routing issues.

**Why it happens:** GitHub Pages serves from a subpath (`username.github.io/repo-name`), but the Vite config uses `base: '/'`, causing all asset references to 404.

**Consequences:**
- Blank screen after deployment — entire app fails to load
- Wasted time debugging what appears to be a code issue but is actually a config issue

**Warning signs (already present in this codebase):**
- `vite.config.ts` has `base: '/'` — will 404 all assets on GitHub Pages subpath deployment
- `gh-pages` package is installed but CI uses `actions/deploy-pages@v4` — conflicting deployment methods

**Prevention:**
- Set `base: './'` or `base: '/repo-name/'` in `vite.config.ts`
- Use `createHashRouter` or `HashRouter` if any client-side routing is added
- Test deployment on a staging branch before merging to main
- Remove unused `gh-pages` dependency to avoid confusion

**Phase to address:** Immediate fix needed before any deployment. Should be addressed in the first implementation phase.

---

### Pitfall 9: Color Contrast and Visual Readability

**What goes wrong:** Text and UI elements in the 3D overlay fail WCAG AA contrast ratios, making content hard to read — especially on bright screens or for users with visual impairments.

**Why it happens:** Dark themes with low-opacity text (`rgba(255, 255, 255, 0.87)`) may pass on pure black backgrounds but fail on the actual rendered background (which may have gradients, lighting effects, or 3D elements behind the overlay).

**Consequences:**
- Hiring managers struggle to read project descriptions and skill metrics
- Fails accessibility audits
- Looks unprofessional — suggests the design was not tested in real conditions

**Warning signs (already present in this codebase):**
- `index.css` and `App.css` both define body text as `rgba(255, 255, 255, 0.87)` — low opacity on dark backgrounds
- CSS variable conflict between `index.css` and `App.css` creates unpredictable background colors
- Planet labels use inline styles with theme colors that may not have sufficient contrast against the 3D scene

**Prevention:**
- Audit all text against actual rendered backgrounds (not just CSS backgrounds) using a contrast checker
- Use design tokens with pre-validated contrast ratios
- Test on actual devices in various lighting conditions
- Consolidate CSS to eliminate conflicting variable definitions

**Phase to address:** UI/UX Design phase — validate contrast before implementing belt visuals.

---

## Minor Pitfalls

### Pitfall 10: Over-Engineering the Theme

**What goes wrong:** The space/planetary theme becomes so elaborate that it distracts from the actual content. Adding unnecessary 3D elements (asteroid belts, nebula effects, particle storms) increases complexity without improving skill communication.

**Why it happens:** The theme is fun to build, and each new visual element feels like it "fits." But theme scope creep inflates bundle size, degrades performance, and increases maintenance burden.

**Prevention:**
- Define theme boundaries explicitly: what's in scope (planets, orbits, HUD, belt) and what's out (asteroids, nebulas, physics simulations)
- Every new visual element must pass the test: "Does this help communicate a skill or project?"
- The AI belt is a good addition because it represents a real skill category. A pulsing nebula background is not.

**Phase to address:** Belt integration phase — resist scope creep when implementing belt visuals.

---

### Pitfall 11: Missing SEO and Social Sharing

**What goes wrong:** When the portfolio link is shared on LinkedIn, Twitter, or in an email, it shows a blank preview with no description, image, or title.

**Why it happens:** No `<meta>` tags for Open Graph, Twitter Cards, or description. The favicon loads from an external URL that may fail.

**Consequences:**
- Hiring managers who receive the link via email or message see no preview
- Lowers perceived professionalism
- External favicon dependency creates a potential failure point

**Prevention:**
- Add `<meta name="description">`, Open Graph tags, and Twitter Card tags to `index.html`
- Host favicon locally in `public/` instead of loading from external URL
- Include a representative screenshot as the OG image

**Phase to address:** Can be done during polish phase before final deployment.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| GitHub Pages deployment | Pitfall 8: Base path mismatch causes blank screen | Fix `vite.config.ts` `base` before any deployment |
| Belt visual integration | Pitfall 3: Performance degradation from new 3D elements | Profile with `r3f-perf` during development; cap pixel ratio; share materials |
| Belt interaction design | Pitfall 5: Unclear navigation for new belt element | Define interaction model explicitly; add hover states and return paths |
| Belt accessibility | Pitfall 2: Canvas elements invisible to assistive tech | Add `@react-three/a11y` wrappers; keyboard navigation; reduced-motion support |
| Content polish | Pitfall 1: Style over substance | 5-second test; always-visible HUD; content-first rule |
| Pre-deployment review | Pitfall 7: No error boundary for WebGL failures | Add error boundary with 2D fallback |
| Pre-deployment review | Pitfall 6: Bundle size too large | Code-split Three.js; add compression; loading screen |
| Pre-deployment review | Pitfall 9: Color contrast failures | Audit all text against actual rendered backgrounds |
| Post-deployment | Pitfall 11: Poor social sharing previews | Add meta tags and OG image |

## Sources

- [IGC: Three.js Performance Optimisation](https://www.intelligentgraphicandcode.com/development/threejs-interfaces/performance) — MEDIUM confidence (professional article, 2026)
- [IGC: Accessibility in Three.js 3D Interfaces](https://www.intelligentgraphicandcode.com/development/threejs-interfaces/accessibility) — MEDIUM confidence (professional article, 2026)
- [Three.js Forum: Portfolio feedback](https://discourse.threejs.org/t/3d-portfolio-website-using-three-js-r3f-glsl-gsap-live-demo/83356) — HIGH confidence (real user feedback on actual portfolio)
- [R3F Docs: Automatic disposal](https://gracious-keller-98ef35.netlify.app/docs/api/automatic-disposal) — HIGH confidence (official documentation)
- [R3F Docs: Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance) — HIGH confidence (official documentation)
- [react-three-a11y](https://github.com/pmndrs/react-three-a11y) — HIGH confidence (official pmndrs library)
- [Three.js Forum: R3F dispose not working](https://discourse.threejs.org/t/r3f-dispose-not-working-memory-is-not-reduced/47924) — HIGH confidence (maintainer response from drcmda)
- [R3F Issue: Leaking WebGLRenderer](https://github.com/pmndrs/react-three-fiber/issues/514) — HIGH confidence (confirmed issue with workarounds)
- [Utsubo: 100 Three.js Tips](https://www.utsubo.com/blog/threejs-best-practices-100-tips) — MEDIUM confidence (2026 article)
- [Reddit: Portfolio mistakes](https://www.reddit.com/r/webdev/comments/1m0c8xy/the_3_mistakes_most_developer_portfolios_still/) — LOW confidence (single source, but aligns with other findings)
- [Accessing Higher Ground: 3D Accessibility](https://accessinghigherground.org/accessibility-of-3d-content-on-the-web/) — MEDIUM confidence (conference presentation, 2023)
- [a3model: Accessibility for Three.js](https://github.com/HilarieSit/a3) — HIGH confidence (npm package for a11y)
