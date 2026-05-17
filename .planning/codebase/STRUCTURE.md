# Directory Structure

**Analysis Date:** 2026-05-17

## Root Layout

```
portfolio/
├── .github/                    # GitHub configuration (workflows, etc.)
├── .planning/                  # GSD planning documents
│   └── codebase/               # Codebase analysis docs (this directory)
├── dist/                       # Build output (generated, gitignored)
├── node_modules/               # Dependencies (gitignored)
├── public/                     # Static assets served as-is
│   ├── .nojekyll               # Disables Jekyll on GitHub Pages
│   └── assets/                 # Public static assets
├── src/                        # Application source code
│   ├── assets/                 # (Empty — images should go here)
│   ├── components/             # All React components
│   │   ├── styles/             # Shared layout CSS
│   │   │   ├── Container.css
│   │   │   └── MainFrame.css
│   │   ├── SideStrip/          # Sidebar component tree
│   │   │   ├── SubComponents/  # Sidebar child components
│   │   │   │   ├── AstronautHeader.tsx
│   │   │   │   ├── FooterInfo.tsx
│   │   │   │   ├── TelemetryStats.tsx
│   │   │   │   └── index.ts
│   │   │   ├── SideStrip.tsx
│   │   │   ├── SideStrip.css
│   │   │   └── index.ts
│   │   ├── Planetary/          # Planetary system component tree
│   │   │   ├── data/           # Static data and TypeScript interfaces
│   │   │   │   ├── PlanetaryData.ts   # PlanetModel, TelemetryStat, planets[]
│   │   │   │   ├── MissionData.ts     # MissionType, MISSION_ARCHIVE[]
│   │   │   │   └── index.ts
│   │   │   ├── UI/             # Reusable UI primitives
│   │   │   │   ├── CliHeader/  # Terminal typing animation
│   │   │   │   │   ├── CliHeader.tsx
│   │   │   │   │   ├── TerminalText.tsx
│   │   │   │   │   ├── CliHeader.css
│   │   │   │   │   └── index.ts
│   │   │   │   ├── HudButtons/ # Themed button component
│   │   │   │   │   ├── HudButton.tsx
│   │   │   │   │   ├── HudButton.css
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Tabs/       # Tab container + tab content
│   │   │   │   │   ├── Tabs.tsx
│   │   │   │   │   ├── Tabs.css
│   │   │   │   │   ├── Missions/
│   │   │   │   │   │   ├── MissionsTab.tsx
│   │   │   │   │   │   ├── MissionCard.tsx
│   │   │   │   │   │   └── MissionCard.css
│   │   │   │   │   ├── Analytics/
│   │   │   │   │   │   ├── AnalyticsTab.tsx
│   │   │   │   │   │   └── AnalyticsTab.css
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── PlanetarySystem/  # Main orbital view
│   │   │   │   ├── PlanetarySystem.tsx
│   │   │   │   ├── PlanetarySystem.css
│   │   │   │   ├── PlanetShapes.css
│   │   │   │   ├── PlanetaryDashboard/
│   │   │   │   │   ├── PlanetaryDashboard.tsx
│   │   │   │   │   ├── Planet3D.tsx
│   │   │   │   │   ├── PlanetaryDashboard.css
│   │   │   │   │   └── index.ts
│   │   │   │   ├── NeuralConstellation/
│   │   │   │   │   └── NeuralConstellation.tsx  # (unused)
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── MainFrame.tsx       # Top-level layout component
│   ├── App.tsx                 # Root component (thin wrapper)
│   ├── App.css                 # CSS custom properties (theme variables)
│   ├── main.tsx                # React entry point
│   └── index.css               # Global base styles
├── index.html                  # HTML shell
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript project references root
├── tsconfig.app.json           # App TypeScript config (strict mode)
├── tsconfig.node.json          # Node TypeScript config
├── eslint.config.js            # ESLint flat config
├── package.json                # Dependencies and scripts
├── package-lock.json           # Lockfile
├── .gitignore                  # Git ignore rules
└── README.md                   # Project readme
```

## Key Directories

**`src/`** — All application source code. Contains the React entry point, root component, and the `components/` directory.

**`src/components/`** — The entire component tree. Organized as a feature-based hierarchy with two top-level features (`Planetary/`, `SideStrip/`) plus shared styles and the `MainFrame` layout shell.

**`src/components/Planetary/`** — The core interactive feature. Contains:
- `data/` — All static content (planet definitions, mission/project data) and shared TypeScript interfaces
- `PlanetarySystem/` — The orbital animation view and planet detail dashboard
- `UI/` — Reusable UI primitives (buttons, tabs, terminal text) used within the planetary feature

**`src/components/SideStrip/`** — The sidebar component with profile, metrics, and auto-cycling content tabs.

**`src/components/styles/`** — Shared layout CSS for `MainFrame` and `Container`. These are imported by `MainFrame.tsx` and apply to the overall page layout.

**`public/`** — Static assets served directly by Vite. Contains `.nojekyll` for GitHub Pages compatibility. The `public/assets/` subdirectory is present but empty.

**`src/assets/`** — Intended for imported static assets (images, etc.). Currently **empty**. The `AstronautHeader` component references `"../../../assets/angelo.png"` which does not exist in this directory.

## File Naming Conventions

**Components:**
- PascalCase for component files: `PlanetarySystem.tsx`, `MissionCard.tsx`, `HudButton.tsx`
- Named exports match file name: `export const PlanetarySystem` in `PlanetarySystem.tsx`

**Styles:**
- Co-located with components, same base name: `PlanetarySystem.tsx` → `PlanetarySystem.css`
- Shared styles use descriptive names: `Container.css`, `MainFrame.css`, `PlanetShapes.css`

**Data files:**
- PascalCase with domain suffix: `PlanetaryData.ts`, `MissionData.ts`

**Barrel files:**
- Always `index.ts` — re-exports from subdirectories and/or the main component

**TypeScript config:**
- Split into project references: `tsconfig.json` (root), `tsconfig.app.json` (app), `tsconfig.node.json` (build tools)

## Module Organization

### Import Patterns

**Relative imports only** — no path aliases configured. All imports use relative paths:

```typescript
// Deep relative import
import { planets, type PlanetModel } from "../data/PlanetaryData";

// Barrel import
import { PlanetDashboard } from "./PlanetaryDashboard/PlanetaryDashboard";

// CSS import (co-located)
import "./PlanetarySystem.css";
```

### Barrel Export Structure

Every feature directory has an `index.ts` that re-exports its public API:

```typescript
// src/components/Planetary/index.ts — re-exports data + PlanetarySystem
export * from "./data";
export * from "./PlanetarySystem";

// src/components/Planetary/UI/index.ts — re-exports UI primitives
export { CliHeader } from "./CliHeader";
export { HudButton } from "./HudButtons";
export * from "./Tabs";
```

This allows consumers to import from the feature root:
```typescript
import { CliHeader, HudButton, Tabs, MissionsTab, AnalyticsTab } from "../../UI";
```

### Type Imports

Types are imported using `type` keyword for clarity:
```typescript
import { type PlanetModel } from "../../data";
import type { MissionType } from "../../../data/MissionData";
```

### CSS Import Strategy

CSS files are imported directly in the component that uses them:
```typescript
import "./PlanetarySystem.css";
import "./PlanetShapes.css";
```

Global styles (`index.css`, `App.css`) are imported at the entry points (`main.tsx`, `App.tsx`).

## Where to Add New Code

**New Feature / Major Component:**
- Create a new directory under `src/components/` following the feature-directory pattern
- Include: `ComponentName.tsx`, `ComponentName.css`, `index.ts`
- If it has sub-components, create a `SubComponents/` directory with its own `index.ts`

**New UI Primitive (button, input, etc.):**
- Add under `src/components/Planetary/UI/` (or create a new `UI/` at `src/components/` level if shared across features)
- Include: `ComponentName.tsx`, `ComponentName.css`, `index.ts`
- Re-export from the parent `UI/index.ts`

**New Static Data:**
- Add to `src/components/Planetary/data/`
- Define TypeScript interfaces alongside the data
- Re-export from `data/index.ts`

**New Global Styles / Theme Variables:**
- Add CSS custom properties to `src/App.css`
- Add global base styles to `src/index.css`

**New Pages / Routes:**
- The app currently has no routing. To add routing, install `react-router-dom` and configure routes in `App.tsx`

**New Assets (images, fonts):**
- Place in `src/assets/` and import in components, OR
- Place in `public/` for direct URL access

**New Tests:**
- No test framework is configured. To add tests, install Vitest or Jest and create `*.test.tsx` files co-located with components.

## Special Directories

**`dist/`:**
- Purpose: Vite build output
- Generated: Yes (`npm run build`)
- Committed: No (gitignored)
- Deployed to: GitHub Pages via `gh-pages -d dist`

**`public/.nojekyll`:**
- Purpose: Disables GitHub Pages Jekyll processing (allows underscores in paths)
- Committed: Yes

**`.planning/`:**
- Purpose: GSD (Goal-Scoped Development) planning documents
- Generated: By GSD commands
- Committed: Likely yes (part of project workflow)

**`node_modules/`:**
- Purpose: npm dependencies
- Generated: Yes (`npm install`)
- Committed: No (gitignored)

---

*Structure analysis: 2026-05-17*
