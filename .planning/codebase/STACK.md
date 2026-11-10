# Technology Stack

**Analysis Date:** 2026-05-17

## Core

- **Framework:** React 19.2.0 - UI library with concurrent features
- **Language:** TypeScript ~5.9.3 - Strict mode with `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`
- **Build tool:** Rolldown-Vite 7.2.5 (via `npm:rolldown-vite@7.2.5` override) - Uses OXC for fast transpilation
- **Runtime:** Node.js 20 (CI) / browser - ES modules (`"type": "module"`)

## UI

- **Component library:** None (custom-built components) - All UI is hand-crafted with CSS
- **3D rendering:** Three.js 0.182.0 via `@react-three/fiber` 9.5.0 and `@react-three/drei` 10.7.7 - Interactive 3D planetary system visualization
- **Styling approach:** Plain CSS with CSS custom properties (design tokens) - No CSS-in-JS, no Tailwind, no CSS modules
  - Global tokens defined in `src/App.css` (e.g., `--cp-bg-dark`, `--cp-accent-purple`)
  - Component-scoped CSS files co-located with components (e.g., `PlanetarySystem.css`, `SideStrip.css`)
- **State management:** React local state (`useState`, `useRef`, `useEffect`) - No external state library; animation loop uses refs for mutable state (`anglesRef`, `planetNodesRef`)

## Data

- **API client:** None - Fully static/data-driven portfolio
- **Data fetching:** Not applicable - All data is local TypeScript arrays (`PlanetaryData.ts`, `MissionData.ts`)
- **Caching:** Not applicable - No external data

## DevOps

- **Testing:** None configured - No test framework, no test files present
- **Linting:** ESLint 9.39.1 with flat config (`eslint.config.js`)
  - `@eslint/js` recommended
  - `typescript-eslint` recommended
  - `eslint-plugin-react-hooks` recommended
  - `eslint-plugin-react-refresh` (Vite-specific)
- **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`)
  - Build: `npm ci` + `npm run build` on Ubuntu with Node 20
  - Deploy: `actions/deploy-pages@v4` to GitHub Pages
  - Trigger: push to `main` branch or manual `workflow_dispatch`
  - Also supports `npm run deploy` via `gh-pages` 6.3.0

## Notable Versions

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.2.0 | Core UI framework |
| `react-dom` | ^19.2.0 | DOM rendering |
| `three` | ^0.182.0 | 3D graphics engine |
| `@react-three/fiber` | ^9.5.0 | React renderer for Three.js |
| `@react-three/drei` | ^10.7.7 | Three.js helpers (OrbitControls, Environment) |
| `typescript` | ~5.9.3 | Type checking |
| `vite` | npm:rolldown-vite@7.2.5 | Build tool (rolldown fork) |
| `@vitejs/plugin-react` | ^5.1.1 | React HMR via Babel/OXC |
| `eslint` | ^9.39.1 | Linting |
| `gh-pages` | ^6.3.0 | GitHub Pages deployment CLI |

## TypeScript Configuration

- **Target:** ES2022 (app), ES2023 (node config)
- **Module:** ESNext with bundler resolution
- **JSX:** `react-jsx` (automatic JSX transform)
- **Strict mode:** Enabled (`strict: true`)
- **Lint rules:** `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `erasableSyntaxOnly`, `noUncheckedSideEffectImports`
- **Project references:** `tsconfig.app.json` (src/) + `tsconfig.node.json` (vite.config.ts)

## Build Pipeline

```
tsc -b  →  vite build  →  dist/  →  GitHub Pages
```

- `npm run build` runs `tsc -b && vite build` (type-check then bundle)
- `npm run dev` runs `vite` with HMR
- `npm run preview` runs `vite preview` for local production preview
- Output: `dist/` directory (static SPA)

---

*Stack analysis: 2026-05-17*
