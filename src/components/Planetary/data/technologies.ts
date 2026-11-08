export type TechCategory =
  | "frontend"
  | "backend"
  | "database"
  | "infra"
  | "design"
  | "ai"
  | "tooling";

export const TECH_CATEGORY_ORDER: TechCategory[] = [
  "frontend",
  "backend",
  "database",
  "infra",
  "design",
  "ai",
  "tooling",
];

export const TECH_CATEGORY_LABELS: Record<TechCategory, string> = {
  frontend: "Front-end",
  backend: "Back-end",
  database: "Banco de dados",
  infra: "Infra & Deploy",
  design: "Design",
  ai: "IA & Dados",
  tooling: "Ferramentas",
};

/**
 * Canonical technology names. Aliases from older mission data are folded into
 * these names so a recruiter can filter "React" once and see every project.
 */
const TECH_CATEGORY_BY_NAME: Record<string, TechCategory> = {
  React: "frontend",
  "Next.js": "frontend",
  "React Router": "frontend",
  "Vue.js": "frontend",
  TypeScript: "frontend",
  JavaScript: "frontend",
  HTML: "frontend",
  CSS: "frontend",
  "Tailwind CSS": "frontend",
  "Three.js": "frontend",

  "Node.js": "backend",
  "Express.js": "backend",
  Hono: "backend",
  "Better Auth": "backend",
  Zod: "backend",
  "REST API": "backend",

  PostgreSQL: "database",
  Supabase: "database",
  "Cloudflare D1": "database",
  Turso: "database",
  Sequelize: "database",
  "Drizzle ORM": "database",

  "Cloudflare Workers": "infra",
  Vercel: "infra",
  "GitHub Pages": "infra",
  Docker: "infra",

  Figma: "design",
  "Adobe Illustrator": "design",
  "Design Tokens": "design",
  "UX Research": "design",
  "Data Visualization": "design",
  "Logo Design": "design",

  Python: "ai",
  "Tesseract.js": "ai",
  "Machine Learning": "ai",
  "Predictive Analytics": "ai",
  "Prompt Engineering": "ai",
  OpenCode: "ai",
  Cursor: "ai",

  Vite: "tooling",
  Recharts: "tooling",
  Vitest: "tooling",
  PWA: "tooling",
  Playwright: "tooling",
};

const ALIASES: Record<string, string> = {
  react: "React",
  "react.js": "React",
  "react 19": "React",
  "next.js": "Next.js",
  "next.js 15": "Next.js",
  nextjs: "Next.js",
  "react router": "React Router",
  "react router 7": "React Router",
  vue: "Vue.js",
  "vue.js": "Vue.js",
  typescript: "TypeScript",
  javascript: "JavaScript",
  html: "HTML",
  html5: "HTML",
  css: "CSS",
  css3: "CSS",
  "css variables": "CSS",
  tailwind: "Tailwind CSS",
  "tailwind css": "Tailwind CSS",
  "tailwind css 4": "Tailwind CSS",
  "three.js": "Three.js",
  "three.js (r3f)": "Three.js",
  "react three fiber": "Three.js",
  r3f: "Three.js",
  node: "Node.js",
  nodejs: "Node.js",
  "node.js": "Node.js",
  express: "Express.js",
  "express.js": "Express.js",
  hono: "Hono",
  "better auth": "Better Auth",
  zod: "Zod",
  "rest api": "REST API",
  postgres: "PostgreSQL",
  postgresql: "PostgreSQL",
  "neon postgres": "PostgreSQL",
  neon: "PostgreSQL",
  supabase: "Supabase",
  "cloudflare d1": "Cloudflare D1",
  d1: "Cloudflare D1",
  "cloudflare workers": "Cloudflare Workers",
  workers: "Cloudflare Workers",
  turso: "Turso",
  libsql: "Turso",
  sequelize: "Sequelize",
  drizzle: "Drizzle ORM",
  "drizzle orm": "Drizzle ORM",
  vercel: "Vercel",
  "github pages": "GitHub Pages",
  docker: "Docker",
  vite: "Vite",
  "rolldown-vite": "Vite",
  figma: "Figma",
  "figma mcp": "Figma",
  "adobe illustrator": "Adobe Illustrator",
  illustrator: "Adobe Illustrator",
  "design tokens": "Design Tokens",
  "design systems": "Design Tokens",
  "ux research": "UX Research",
  "data visualization": "Data Visualization",
  "logo design": "Logo Design",
  python: "Python",
  tesseract: "Tesseract.js",
  "tesseract.js": "Tesseract.js",
  "machine learning": "Machine Learning",
  ml: "Machine Learning",
  "predictive analytics": "Predictive Analytics",
  "prompt engineering": "Prompt Engineering",
  opencode: "OpenCode",
  cursor: "Cursor",
  recharts: "Recharts",
  vitest: "Vitest",
  pwa: "PWA",
  playwright: "Playwright",
};

/**
 * Generic labels that add noise but do not help a recruiter filter projects.
 * They still appear in the narrative highlights; they are just not tags.
 */
const HIDDEN_TAGS = new Set([
  "Git",
  "GitHub",
  "Responsive Design",
  "UI Design",
  "Web Accessibility",
  "Color Theory",
  "Typography",
  "User Testing",
  "Infographics",
  "Vector Design",
  "Brand Design",
  "Mobile Design",
  "RLS",
  "Computer Vision",
  "Algorithm Design",
  "Combinatorial Optimization",
]);

export function canonicalTech(tech: string): string | null {
  const trimmed = tech.trim();
  if (!trimmed) return null;

  const canonical = ALIASES[trimmed.toLowerCase()] ?? trimmed;
  if (HIDDEN_TAGS.has(canonical)) return null;

  return canonical;
}

export function canonicalTechList(technologies: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const technology of technologies) {
    const canonical = canonicalTech(technology);
    if (!canonical || seen.has(canonical)) continue;
    seen.add(canonical);
    result.push(canonical);
  }

  return result;
}

export function techCategory(tech: string): TechCategory {
  return TECH_CATEGORY_BY_NAME[tech] ?? "tooling";
}
