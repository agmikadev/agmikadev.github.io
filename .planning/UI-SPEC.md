# UI-SPEC: Music of the Spheres HUD Visual System

## 1. Design Philosophy

Adopt the **Coldplay "Music of the Spheres"** visual language: a stark, high-contrast space interface where vibrant yellow panels pop against a deep space void. The design creates the feeling of a futuristic mission control interface — precise, data-rich, and bold.

**Key Principles:**
- **Contrast First**: Yellow panels on black void
- **Bold Typography**: Heavy, wide-tracked sans-serif for headers
- **Symbol Language**: Four-pointed stars (✦), triple-dots (○○○), and orbital rings as visual anchors
- **Modular Cards**: Everything lives in a card with clear borders and generous padding

---

## 2. Design Tokens

### 2.1 Color Palette

| Token | Value | Usage |
|---|---|---|
| `--hud-void` | `#030305` | Deepest background |
| `--hud-panel-dark` | `rgba(10, 10, 20, 0.95)` | Dashboard overlay, container bg |
| `--hud-panel-yellow` | `#FCE96A` | Primary info cards, high-contrast panels |
| `--hud-text-primary` | `#ffffff` | Text on dark backgrounds |
| `--hud-text-inverse` | `#0a0a15` | Text on yellow panels |
| `--hud-text-muted` | `#a3a3a3` | Descriptions, meta text |
| `--hud-border-subtle` | `rgba(255, 255, 255, 0.08)` | Default card borders |
| `--hud-border-yellow` | `rgba(252, 233, 106, 0.4)` | Yellow accent borders |
| `--hud-accent-yellow` | `#FCE96A` | Headers, highlights, icons |
| `--hud-glow` | `var(--hud-accent-yellow)` | Box-shadow, text-shadow for neon effect |

### 2.2 Typography

| Role | Font | Size | Weight | Tracking | Usage |
|---|---|---|---|---|---|
| H1 (Planet Name) | Space Grotesk | 3.5rem | 800 | 4px | Dashboard planet title |
| H2 (Section) | Space Grotesk | 1.5rem | 700 | 2px | "ABOUT [PLANET]", tab labels |
| Body | Inter | 0.9rem | 400 | 0 | Descriptions, content |
| Meta / Label | monospace (JetBrains Mono) | 0.75rem | 700 | 1px | Status, years, tags, CLI |
| Tab Label | Space Grotesk | 0.9rem | 700 | 2px | Tab headers |
| Card Title | Space Grotesk | 1.2rem | 700 | 1px | Mission card titles |

### 2.3 Spacing & Radii

| Token | Value | Usage |
|---|---|---|
| `--hud-radius-lg` | `0 48px 0 48px` | Main container, side strip |
| `--hud-radius-md` | `16px` | Cards, panels |
| `--hud-radius-sm` | `8px` | Buttons, tags, small elements |
| `--hud-padding-card` | `24px–32px` | Internal card padding |
| `--hud-gap-lg` | `24px` | Between major cards |
| `--hud-gap-md` | `16px` | Between elements within cards |
| `--hud-gap-sm` | `8px` | Between tightly related items |

### 2.4 Shadows & Glows

| Token | Value | Usage |
|---|---|---|
| `--hud-shadow-card` | `0 20px 50px rgba(0,0,0,0.5)` | Container outer shadow |
| `--hud-shadow-glow` | `0 0 15px var(--hud-accent-yellow)` | Active tabs, hover states |
| `--hud-shadow-planet` | `0 0 50px rgba(255, 223, 0, 0.6)` | Sun / planet center glow |
| `--hud-glow-text` | `0 0 10px var(--hud-accent-yellow)` | Neon text effects |

---

## 3. Component Specifications

### 3.1 Divider
```
Variants:
- Default:   "———————————————————————————"
- Labeled:   "————————  LABEL  ———————————"
- Symbol:    "✦ ✦ ✦"
- Mixed:     "○○○  ———————————————————  ✦"

Properties:
- Line: 1px solid rgba(255, 255, 255, 0.1)
- Gap between line and text/symbol: 12px
```

### 3.2 StarBurst (✦)
```
Sizes: sm(8px), md(12px), lg(16px)
Color: Current text color or --hud-accent-yellow
Variants: Solid fill or outline stroke
```

### 3.3 TripleDot (○○○)
```
Size per dot: 6px (sm), 8px (md), 12px (lg)
Gap: 4px
Color: --hud-accent-yellow or currentColor
```

### 3.4 Card Variants

| Variant | Background | Text Color | Border |
|---|---|---|---|
| **Yellow (info)** | `#FCE96A` | `#0a0a15` | none |
| **Dark (image)** | `rgba(0,0,0,0.4)` | `#ffffff` | 1px solid rgba(255,255,255,0.08) |
| **Glass (default)** | `rgba(255,255,255,0.03)` | `#ffffff` | 1px solid rgba(255,255,255,0.08) |

---

## 4. Layout System

### 4.1 MainFrame Chrome

**Header:**
```
[○ ○]  ———————————————————————————  DASHBOARD INTERFACE
```
- Font: Space Grotesk, 12px, 800 weight, uppercase, tracking 2px
- Color: --hud-accent-yellow
- Line: 1px, opacity 0.5

**Footer:**
```
STATUS: ONLINE  ———————————————————————————  ✦ ✦ ✦
```
- Same header style
- Stars: --hud-accent-yellow

### 4.2 Planet Dashboard (Left-Dark / Right-Yellow)

```
┌─────────────────────────────────────────────────────────┐
│ [← SYSTEM VIEW]                                         │
│  ┌───────────────┐  ┌────────────────────────────────┐  │
│  │               │  │ CLI: > Fetching...             │  │
│  │   [Planet 3D] │  │ ───── MISSIONS ───── ✦ ✦ ✦   │  │
│  │   in dark     │  │ [Yellow Card: About]           │  │
│  │   panel       │  │ [Yellow Card: Missions]        │  │
│  │               │  │ [Yellow Card: Analytics]       │  │
│  └───────────────┘  └────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

- **Left Column**: Dark background, 3D planet rendered
- **Right Column**: Yellow cards for all text content
- **Belt Dashboard**: Full-width yellow card stack (no left 3D column)

### 4.3 SideStrip

```
┌────────────────────────┐
│ [Avatar] Name          │
│ Role        [✦]        │
│ ─────────────────────  │
│ Telemetry              │
│ ⚡ Skill: ████░░ 85%   │
│ 🔧 Tool: █████░ 90%    │
│ ─────────────────────  │
│ // MANIFESTO // STACK  │
│ ┌────────────────────┐ │
│ │ Cyclable content   │ │
│ │ with progress bar  │ │
│ └────────────────────┘ │
│ [Resume Download]      │
│ ─────────────────────  │
│ SYSTEM: ONLINE [✦]     │
└────────────────────────┘
```

- Background: `rgba(10, 10, 20, 0.6)` with blur
- Border: 1px solid `rgba(255, 255, 255, 0.08)`
- Radius: `0 48px 0 48px` (matches main container)
- Accent color for hover: `--hud-accent-yellow`

### 4.4 Mission Cards

**Before (current):**
- Dark glass card
- White text
- Colored left border

**After (target):**
- **Yellow variant**: `#FCE96A` background, black text
- **Dark variant**: For image-heavy cards
- Header: StarBurst symbol + planet name in Space Grotesk
- Tags: Monospace, yellow background with black text when active

---

## 5. Animation & Motion

| Animation | Duration | Ease | Trigger |
|---|---|---|---|
| Card fade-in | 0.3s | ease-out | On tab switch |
| Tab underline glow | 0.2s | ease | Hover/Activate |
| Progress bar fill | 1s | cubic-bezier(0.16, 1, 0.3, 1) | On mount |
| Planet glow pulse | 4s | ease-in-out | Infinite loop |
| Dashboard slide-in | 0.4s | ease-out | On planet select |
| Hover lift | 0.3s | cubic-bezier(0.16, 1, 0.3, 1) | On card hover |
| Tab content fade | 0.3s | ease-out | On tab change |

---

## 6. Responsive Behavior

### Desktop (>960px)
- Full two-column dashboard layout
- Side strip visible on the right
- All symbols and dividers render at full size

### Mobile (≤960px)
- Header/Footer: Hidden
- Dashboard: Single column, stacked vertically
- Side strip: Moves below main content
- Yellow cards: Full width, padding reduced to 16px
- Font sizes: Scale down ~15%

---

## 7. Accessibility

- **Contrast**: Yellow `#FCE96A` on black `#0a0a15` = WCAG AA for normal text, AAA for large text
- **Motion**: All animations respect `prefers-reduced-motion`
- **Focus**: Yellow outline (`2px solid #FCE96A`) on keyboard focus
- **Font loading**: `font-display: swap` to prevent FOIT

---

## 8. File Mappings

| UI-SPEC Section | File(s) |
|---|---|
| 2.1 Color Palette | `src/App.css` |
| 2.2 Typography | `src/App.css`, `index.html` |
| 2.3 Spacing | `src/App.css` |
| 3.1 Divider | `src/components/Planetary/UI/Symbols/Divider.tsx` |
| 3.2 StarBurst | `src/components/Planetary/UI/Symbols/StarBurst.tsx` |
| 3.3 TripleDot | `src/components/Planetary/UI/Symbols/TripleDot.tsx` |
| 3.4 Card Variants | `src/components/Planetary/UI/CardVariants/` |
| 4.1 MainFrame | `src/components/styles/Container.css`, `MainFrame.css` |
| 4.2 Planet Dashboard | `src/components/Planetary/PlanetarySystem/PlanetaryDashboard/PlanetaryDashboard.css` |
| 4.3 SideStrip | `src/components/SideStrip/SideStrip.css` |
| 4.4 Mission Cards | `src/components/Planetary/UI/Tabs/Missions/MissionCard.css` |
| 4.4 Analytics | `src/components/Planetary/UI/Tabs/Analytics/AnalyticsTab.css` |
| 5. Animations | Component-level CSS |

---

## 9. Dependencies

| Package | Version | Usage |
|---|---|---|
| Space Grotesk (Google Fonts) | — | Headers, titles |
| Inter (Google Fonts) | — | Body text |
| JetBrains Mono (Google Fonts) | — | Monospace / CLI |

Google Fonts URL:
```
https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;800&family=Inter:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap
```

---

## 10. Out of Scope

- Planet orbit math (`PlanetarySystem.tsx` game loop) — **untouched**
- Planet node click interactions — **untouched**
- WebGL/Three.js rendering — **untouched**
- Responsive redesign for mobile — handled in separate PROD-04

---

*Designed for Phase 4: Polish & Accessibility*
*Last updated: 2026-05-18*
