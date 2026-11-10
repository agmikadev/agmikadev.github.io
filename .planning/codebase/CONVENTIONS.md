# Code Conventions

**Analysis Date:** 2026-05-17

## Language & Type Safety

- **TypeScript ~5.9.3** with **strict mode enabled** (`"strict": true`)
- **verbatimModuleSyntax** enabled — import/export types must use `type` keyword
- **noUnusedLocals** and **noUnusedParameters** enforced
- **noFallthroughCasesInSwitch** and **erasableSyntaxOnly** enabled
- **Project references** used: `tsconfig.app.json` (src) and `tsconfig.node.json` (vite.config.ts)
- **Target**: ES2022 for app, ES2023 for node config
- **Module resolution**: `bundler` mode with `allowImportingTsExtensions: true`
- **JSX**: `react-jsx` (automatic JSX transform)
- **skipLibCheck**: true

## Component Patterns

- **Functional components only** — no class components used
- Two component declaration styles observed:
  - **`React.FC` with explicit type** (most common): `export const PlanetarySystem: React.FC = () => { ... }`
  - **`FC` with inline type import**: `export const MainFrame: FC<MainFrameProps> = ({ children }) => { ... }`
  - **Implicit return arrow** (simple components): `export const AstronautHeader = () => ( ... )`
- **Props defined via explicit interfaces**, never inline types:
  ```typescript
  interface DashboardProps {
    planet: PlanetModel;
    onClose: () => void;
  }
  ```
- **Default props** set via destructuring defaults: `variant = "default"`, `speed = 10`
- **Hooks used**: `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, `useFrame` (from @react-three/fiber)
- **Animation loop pattern**: `requestAnimationFrame` / `cancelAnimationFrame` in `useEffect` cleanup
- **3D components** use `@react-three/fiber` Canvas with `@react-three/drei` helpers

## Styling Conventions

- **Plain CSS** — no CSS-in-JS, no Tailwind, no Sass
- **Co-located CSS files**: each component has a sibling `.css` file (e.g., `PlanetarySystem.tsx` + `PlanetarySystem.css`)
- **CSS custom properties (variables)** for theming, defined in `src/App.css`:
  ```css
  --cp-bg-dark: #030305;
  --cp-accent-yellow: #fce96a;
  --cp-font-main: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  ```
- **BEM-like class naming** with descriptive, semantic names:
  - `.planet-node`, `.planet-label`, `.planet-visual`
  - `.mission-card`, `.mission-header`, `.mission-title`, `.mission-tags-container`
  - `.hud-btn`, `.hud-btn-back`, `.hud-btn-action`
- **Modifier classes**: `.active`, `.fade-in`, `.status-active`
- **Dynamic styles via inline `style` prop** with CSS variable injection:
  ```tsx
  style={{ "--theme-color": planet.color } as React.CSSProperties}
  ```
- **CSS-in-JS for dynamic values**: `boxShadow`, `borderLeft`, `width` computed from props
- **Responsive design**: `@media (max-width: 960px)` breakpoints in `MainFrame.css`
- **Keyframe animations**: `@keyframes sun-pulse`, CSS transitions with `transition: all 0.3s ease`

## Import/Export Style

- **Named exports preferred** — almost all components use `export const ComponentName`
- **Default exports** used sparingly:
  - `App.tsx`: `export default App`
  - `MainFrame.tsx`: has both named and default export
- **Barrel files (index.ts)** used extensively at every directory level for re-exports:
  ```typescript
  // src/components/Planetary/index.ts
  export * from "./data";
  export * from "./PlanetarySystem";
  ```
- **Re-export pattern**: `export { ComponentName } from "./ComponentName"`
- **Type imports** use explicit `type` keyword (required by `verbatimModuleSyntax`):
  ```typescript
  import { type FC, type ReactNode } from 'react';
  import type { PlanetModel } from "../../data/PlanetaryData";
  ```
- **CSS imports** always at top alongside JS imports: `import "./Component.css"`
- **Relative imports** only — no path aliases configured
- **Import order**: React/types → data/interfaces → CSS → sibling components

## Error Handling

- **No global error boundary** detected
- **No error tracking** service integrated
- **Conditional rendering** for empty states:
  ```tsx
  if (relevantMissions.length === 0) {
    return <div className="mission-error-log">[ERRO]: Nenhuma missão...</div>;
  }
  ```
- **Null-safe DOM access** with optional chaining: `containerRef.current?.clientWidth`
- **Non-null assertion** used at entry point: `document.getElementById('root')!`
- **Animation cleanup** via `useEffect` return: `return () => cancelAnimationFrame(requestRef.current!)`

## Code Quality Tools

- **ESLint v9.39.1** with flat config (`eslint.config.js`)
- **Plugins enabled**:
  - `@eslint/js` — recommended rules
  - `typescript-eslint` — recommended TypeScript rules
  - `eslint-plugin-react-hooks` — recommended React hooks rules
  - `eslint-plugin-react-refresh` — Vite HMR compatibility
- **Ignores**: `dist/` directory
- **Language options**: ES2020, browser globals
- **No Prettier** — no `.prettierrc`, `prettier.config.*`, or biome.json found
- **No Husky** or pre-commit hooks detected
- **Lint command**: `npm run lint` → `eslint .`
- **Build command**: `npm run build` → `tsc -b && vite build`

## Naming Conventions

- **Files**: PascalCase for components (`PlanetarySystem.tsx`), camelCase for data (`PlanetaryData.ts`)
- **Components**: PascalCase (`PlanetaryDashboard`, `MissionCard`, `HudButton`)
- **Interfaces**: PascalCase with descriptive names (`PlanetModel`, `MissionType`, `TabItem`, `TelemetryStat`)
- **CSS classes**: kebab-case (`.planet-node`, `.mission-card`, `.hud-btn`)
- **Constants**: UPPER_SNAKE_CASE for config objects (`CONFIG`, `METRICS`, `SOCIALS`, `MISSION_ARCHIVE`)
- **Variables**: camelCase (`hoveredPlanetId`, `selectedPlanet`, `relevantMissions`)
- **Refs**: suffixed with `Ref` (`containerRef`, `planetNodesRef`, `requestRef`)

## Module Design

- **Feature-based directory structure** under `src/components/`:
  - `SideStrip/` — sidebar component with sub-components
  - `Planetary/` — planetary system with nested sub-features
- **Deep nesting** with multiple barrel files (up to 4 levels deep)
- **Data separated from UI**: `data/` folder contains `PlanetModel` and `MissionType` interfaces with static data
- **No barrel file for `src/` root** — `App.tsx` and `main.tsx` are direct imports

---

*Convention analysis: 2026-05-17*
