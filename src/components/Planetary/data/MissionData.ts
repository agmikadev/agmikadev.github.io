export interface MissionType {
  id: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  // Deep dive into HOW the tools were used
  technical_briefing: string; 
  // The tags that link the mission to the planets
  technologies: string[]; 
  // Optional links to live sites or GitHub
  external_links?: { label: string; url: string }[]; 
}

export const MISSION_ARCHIVE: MissionType[] = [
  {
    id: "miss-01",
    title: "T3 E-Commerce Engine",
    year: "2026",
    role: "Lead Architect",
    summary: "Desenvolvimento do backend transacional para plataforma de e-commerce.",
    technical_briefing: "A infraestrutura exigiu a criação de um schema relacional complexo no PostgreSQL para gerenciamento de estoque e usuários. O tRPC foi utilizado para garantir segurança de tipos de ponta a ponta, enquanto o Node.js lidava com os algoritmos de checkout.",
    technologies: ["Next.js", "Prisma", "Node.js", "TypeScript", "PostgreSQL", "tRPC"],
    external_links: [{ label: "GitHub", url: "#" }]
  },
  {
    id: "miss-02",
    title: "Project: Algorithm Capture",
    year: "2025",
    role: "Content & SEO Strategist",
    summary: "Otimização de retenção de usuários para distribuição de vídeo de alto volume.",
    technical_briefing: "Foco total na jornada do usuário. Utilizei o Figma para prototipação de thumbnails A/B, aplicando design tokens rigorosos para manter a identidade visual. A roteirização e o SEO foram desenhados para capturar a atenção nos primeiros 3 segundos.",
    technologies: ["Figma", "Design Tokens", "SEO", "Copywriting", "Analytics"],
  },
  {
    id: "miss-03",
    title: "Interactive System Map",
    year: "2026",
    role: "Frontend Engineer",
    summary: "Sistema de navegação 3D responsivo com estética retro-futurista.",
    technical_briefing: "Desenvolvido inteiramente com React e Tailwind CSS para garantir performance. O desafio principal foi aplicar trigonometria complexa via CSS puro para o movimento orbital, dispensando o uso de bibliotecas de Canvas pesadas.",
    technologies: ["React", "Tailwind CSS", "TypeScript", "Next.js"],
    external_links: [{ label: "Live Demo", url: "#" }, { label: "GitHub", url: "#" }]
  }
];