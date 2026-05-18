# Roadmap: Star System Portfolio

## Overview

Transform the existing 3D planetary portfolio into a production-ready showcase by adding the AI "sonda network" belt differentiator, fixing critical deployment/performance issues, populating complete content, and polishing accessibility — all while maintaining 60fps orbital animation on mid-range hardware.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Performance** - Fix deployment, add loading state, establish performance baseline, enable resume download
- [ ] **Phase 2: Belt Data & Visual Core** - Create belt data model, render animated network connections between all planets
- [ ] **Phase 3: Belt Interaction & Content** - Clickable belt with HUD panel, populate all planet and belt mission/analytics content
- [ ] **Phase 4: Polish & Accessibility** - Onboarding overlay, smooth camera transitions, keyboard navigation, reduced-motion support
- [ ] **Phase 5: Production Readiness** - Error boundary with 2D fallback, SEO meta tags, bundle optimization, cross-device testing

## Phase Details

### Phase 1: Foundation & Performance
**Goal**: Portfolio deploys correctly, loads reliably, and runs at target performance baseline
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04
**Success Criteria** (what must be TRUE):
  1. Portfolio loads on GitHub Pages without 404 errors on assets
  2. User sees a loading spinner while the 3D scene initializes
  3. Orbital animation runs at 60fps on mid-range hardware (DPR capped at 2)
  4. User can download resume/CV as PDF from the portfolio
**Plans**: 4 plans

Plans:
- [x] 01-01-PLAN.md — Fix GitHub Pages deployment (vite base path, package.json homepage)
- [x] 01-02-PLAN.md — Add loading spinner for scene initialization
- [x] 01-03-PLAN.md — Add resume/CV PDF download button
- [x] 01-04-PLAN.md — Performance baseline (DPR cap, layout thrashing fix)

### Phase 2: Belt Data & Visual Core
**Goal**: AI Sonda network belt is visually rendered as animated connections between all planets
**Depends on**: Phase 1
**Requirements**: BELT-01, BELT-02, BELT-05
**Success Criteria** (what must be TRUE):
  1. Animated network connections are visible between all orbiting planets
  2. Belt data model contains AI/Agentic tools with proficiency percentages and mission reports
  3. Belt connections update in real-time as planets orbit
**Plans**: 3 plans

Plans:
- [x] 02-01-PLAN.md — Create belt data model (BeltData.ts) with AI tools, proficiency %, mission reports
- [x] 02-02-PLAN.md — Create BeltNetwork animated SVG component with glow/pulse effects
- [x] 02-03-PLAN.md — Integrate BeltNetwork into PlanetarySystem game loop for real-time updates
**UI hint**: yes

### Phase 3: Belt Interaction & Content
**Goal**: Users can interact with the belt to view AI skills, and all planets have complete mission content
**Depends on**: Phase 2
**Requirements**: BELT-03, BELT-04, CONT-01, CONT-02, CONT-03
**Success Criteria** (what must be TRUE):
  1. User can click the belt to open a BeltHUD panel
  2. BeltHUD displays Missions and Metrics tabs matching the planet HUD pattern
  3. Each planet's Missions tab shows case-study structured project reports (problem → approach → outcome)
  4. Each planet's Analytics tab shows accurate proficiency data
  5. Belt HUD shows populated AI tool proficiency and mission reports
**Plans**: TBD
**UI hint**: yes

### Phase 4: Polish & Accessibility
**Goal**: Portfolio is accessible, intuitive, and polished for all users
**Depends on**: Phase 3
**Requirements**: UX-01, UX-02, UX-03, UX-04
**Success Criteria** (what must be TRUE):
  1. First-time visitors see an onboarding overlay explaining how to interact (dismissed via localStorage)
  2. Camera smoothly transitions when selecting and deselecting planets
  3. User can navigate planets, belt, and HUD using keyboard (Tab/Enter/Escape)
  4. Animations respect the user's prefers-reduced-motion setting
**Plans**: TBD
**UI hint**: yes

### Phase 5: Production Readiness
**Goal**: Portfolio is robust, optimized, and ready for public sharing
**Depends on**: Phase 4
**Requirements**: PROD-01, PROD-02, PROD-03, PROD-04
**Success Criteria** (what must be TRUE):
  1. App displays a 2D fallback UI when WebGL is unavailable or fails
  2. Shared portfolio links show rich previews with OG and Twitter Card meta tags
  3. Initial page load is under 2MB with code-split Three.js bundle
  4. Portfolio renders and functions correctly on desktop and tablet devices
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Performance | 4/4 | Complete | 2026-05-17 |
| 2. Belt Data & Visual Core | 3/3 | Complete | 2026-05-18 |
| 3. Belt Interaction & Content | 0/0 | Not started | - |
| 4. Polish & Accessibility | 0/0 | Not started | - |
| 5. Production Readiness | 0/0 | Not started | - |
