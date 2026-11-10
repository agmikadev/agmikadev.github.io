# Testing

**Analysis Date:** 2026-05-17

## Test Framework

**Not configured.** No testing framework, runner, or assertion library is installed in this project.

- No `jest`, `vitest`, `mocha`, or any test runner in `package.json`
- No `@testing-library/react`, `@testing-library/jest-dom`, or similar
- No test-related devDependencies detected

## Test Configuration

**None.** No test configuration files exist:

- No `jest.config.*`
- No `vitest.config.*`
- No `setupTests.*`
- No `__tests__` directories
- No `*.test.*` or `*.spec.*` files anywhere in the project

## Test Coverage

**Zero coverage.** No tests exist for any part of the codebase.

The following critical areas are completely untested:

| Area | Files | Risk |
|------|-------|------|
| Planetary animation loop | `src/components/Planetary/PlanetarySystem/PlanetarySystem.tsx` | High — complex `requestAnimationFrame` logic with physics calculations |
| 3D rendering components | `src/components/Planetary/PlanetarySystem/PlanetaryDashboard/Planet3D.tsx` | High — Three.js canvas, geometry selection, material creation |
| Tab switching logic | `src/components/Planetary/UI/Tabs/Tabs.tsx` | Medium — state management, content rendering |
| Mission filtering | `src/components/Planetary/UI/Tabs/Missions/MissionsTab.tsx` | Medium — `useMemo` filtering logic matching technologies |
| Terminal typing effect | `src/components/Planetary/UI/CliHeader/TerminalText.tsx` | Medium — `setInterval`-based animation with cleanup |
| Data cycler (sidebar) | `src/components/SideStrip/SideStrip.tsx` | Medium — tab cycling, hover pause, animation callbacks |
| Analytics color mapping | `src/components/Planetary/UI/Tabs/Analytics/AnalyticsTab.tsx` | Low — pure function `getSkillColor()` |
| Static data integrity | `src/components/Planetary/data/PlanetaryData.ts`, `MissionData.ts` | Low — large data structures, 551 + 231 lines |

## Test Patterns

**None established.** When testing is added, the following patterns should be considered based on the codebase architecture:

### Recommended Approach

Given the project uses **Vite** with **rolldown-vite**, **Vitest** is the natural choice:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### Suggested Test Structure

```
src/
├── components/
│   ├── Planetary/
│   │   ├── UI/
│   │   │   ├── CliHeader/
│   │   │   │   ├── CliHeader.tsx
│   │   │   │   └── CliHeader.test.tsx     ← co-located tests
│   │   │   └── Tabs/
│   │   │       ├── Tabs.tsx
│   │   │       └── Tabs.test.tsx
│   │   └── data/
│   │       ├── PlanetaryData.ts
│   │       └── PlanetaryData.test.ts      ← data validation tests
```

### Testing Challenges

1. **3D Components** (`Planet3D.tsx`): Three.js rendering requires mocking `@react-three/fiber` Canvas or using `@react-three/test-renderer`
2. **Animation loops**: `requestAnimationFrame`-based logic in `PlanetarySystem.tsx` needs `vi.useFakeTimers()` and manual frame advancement
3. **Interval-based effects**: `TerminalText.tsx` uses `setInterval` — needs fake timers for deterministic testing
4. **Inline styles with CSS variables**: Components use `style={{ "--theme-color": color } as React.CSSProperties}` — verify style prop values
5. **Ref-based DOM manipulation**: `PlanetarySystem.tsx` directly manipulates `node.style.transform` — needs DOM refs in test environment

### Suggested Test Categories

**Unit tests** (highest priority):
- `getSkillColor()` in `AnalyticsTab.tsx` — pure function, trivial to test
- Data structure validation — verify all planets have required fields
- Mission filtering logic — verify technology matching works correctly

**Component tests** (medium priority):
- `Tabs` component — verify tab switching, active state, content rendering
- `HudButton` — verify onClick callback, aria-label, variant classes
- `TerminalText` — verify typing animation completes and calls `onComplete`
- `MissionCard` — verify tag highlighting for matching technologies

**Integration tests** (lower priority):
- `PlanetarySystem` animation — verify planets move and respond to hover
- `PlanetDashboard` — verify planet selection shows dashboard with correct data

## Running Tests

**No test scripts exist** in `package.json`. Current scripts:

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

After adding Vitest, recommended scripts to add:

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
}
```

## Gaps

**Complete absence of testing infrastructure** is the primary gap. Specifically:

1. **No test runner** — cannot execute any tests
2. **No assertion library** — no way to verify behavior
3. **No DOM testing environment** — no jsdom or similar
4. **No snapshot testing** — no way to catch UI regressions
5. **No CI pipeline** — no `.github/workflows` for test automation
6. **No coverage tooling** — no way to measure what is tested
7. **No mock setup** — no `__mocks__` directory or test utilities

### Priority Recommendations

1. **High**: Add Vitest + Testing Library for component testing
2. **High**: Test pure functions first (`getSkillColor`, data validation)
3. **Medium**: Test UI components (Tabs, HudButton, MissionCard)
4. **Medium**: Add fake timer tests for animation components
5. **Low**: Add GitHub Actions workflow for automated testing on PR
6. **Low**: Set up coverage thresholds (start at 50%, increase over time)

---

*Testing analysis: 2026-05-17*
