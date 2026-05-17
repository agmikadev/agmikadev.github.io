# External Integrations

**Analysis Date:** 2026-05-17

## Third-Party Services

**GitHub Pages:**
- Hosting platform for the deployed portfolio
- URL: `https://agmikadev.github.io` (from `package.json` homepage)
- Deployed via GitHub Actions workflow (`.github/workflows/deploy.yml`)

**External asset references:**
- Favicon loaded from external SVG: `https://www.svgrepo.com/show/195733/planet.svg` (in `index.html`)
- No other external CDN resources detected - all dependencies are bundled

**Three.js Environment:**
- `@react-three/drei` `<Environment preset="city" />` used in `src/components/Planetary/PlanetarySystem/PlanetaryDashboard/Planet3D.tsx` - uses Drei's built-in HDR environment preset (no external URL needed)

## Dependencies

### Runtime Dependencies

| Package | Purpose |
|---------|---------|
| `react` ^19.2.0 | Core UI component library |
| `react-dom` ^19.2.0 | DOM rendering entry point |
| `three` ^0.182.0 | WebGL 3D graphics engine |
| `@react-three/fiber` ^9.5.0 | React reconciler for Three.js - enables `<Canvas>`, `<mesh>`, etc. |
| `@react-three/drei` ^10.7.7 | Three.js utility helpers - provides `OrbitControls`, `Environment` |

### Dev Dependencies

| Package | Purpose |
|---------|---------|
| `vite` (rolldown-vite@7.2.5) | Build tool with OXC-based transpilation for fast HMR |
| `@vitejs/plugin-react` ^5.1.1 | React plugin for Vite (Babel/OXC JSX transform) |
| `typescript` ~5.9.3 | TypeScript compiler for type checking |
| `eslint` ^9.39.1 | Linting engine (flat config) |
| `@eslint/js` ^9.39.1 | ESLint recommended JS rules |
| `typescript-eslint` ^8.46.4 | TypeScript-aware ESLint rules |
| `eslint-plugin-react-hooks` ^7.0.1 | React hooks linting (exhaustive-deps, etc.) |
| `eslint-plugin-react-refresh` ^0.4.24 | Ensures components are compatible with Vite HMR |
| `globals` ^16.5.0 | Global variable definitions for ESLint |
| `@types/react` ^19.2.5 | TypeScript type definitions for React |
| `@types/react-dom` ^19.2.3 | TypeScript type definitions for React DOM |
| `@types/node` ^24.10.1 | Node.js type definitions (for vite.config.ts) |
| `gh-pages` ^6.3.0 | CLI tool for publishing to GitHub Pages |

## Build/Tool Integrations

### Vite Configuration (`vite.config.ts`)

- **Plugin:** `@vitejs/plugin-react` - enables React Fast Refresh
- **Base path:** `/` (root-relative, suitable for GitHub Pages with custom domain)
- **Overrides:** `vite` replaced with `npm:rolldown-vite@7.2.5` for OXC-based builds
- **No path aliases** configured - all imports use relative paths

### ESLint Configuration (`eslint.config.js`)

- **Config format:** Flat config (ESLint 9.x)
- **Scope:** `**/*.{ts,tsx}` files
- **Ignores:** `dist/` directory
- **Extends:**
  1. `js.configs.recommended` - base JS rules
  2. `tseslint.configs.recommended` - TypeScript recommended rules
  3. `reactHooks.configs.flat.recommended` - React hooks rules
  4. `reactRefresh.configs.vite` - Vite HMR compatibility rules
- **Language options:** ES2020, browser globals

### TypeScript Configuration

- **Project references** pattern: root `tsconfig.json` references `tsconfig.app.json` (app code) and `tsconfig.node.json` (build config)
- **Types:** `vite/client` (app), `node` (build config)
- **No path aliases** - all imports are relative

### GitHub Actions (`.github/workflows/deploy.yml`)

- **Node version:** 20
- **Dependency cache:** npm
- **Install:** `npm ci` (clean install from lockfile)
- **Build:** `npm run build` (tsc + vite build)
- **Deploy:** `actions/deploy-pages@v4` to GitHub Pages environment
- **Concurrency:** Only one deploy at a time, cancels in-progress

## Environment Requirements

**Required environment variables:** None detected
- The application is fully static with no API keys, no backend calls, no auth
- No `.env` files present in the repository

**Build requirements:**
- Node.js 20+ (matching CI version)
- npm (lockfile is `package-lock.json`)

**Deployment requirements:**
- GitHub repository with Pages enabled
- Push to `main` branch triggers automatic deploy
- Alternative: `npm run deploy` uses `gh-pages` CLI (requires GitHub token)

## Webhooks & Callbacks

**Incoming:** None
**Outgoing:** None

The portfolio is a fully static SPA with no server-side integrations, no API calls, no webhooks, and no callback endpoints.

---

*Integration audit: 2026-05-17*
