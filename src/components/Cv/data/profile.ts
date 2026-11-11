export interface CvLink {
  label: string;
  href: string;
}

export interface CvContact {
  location: string;
  phone: string;
  phoneHref: string;
  email: string;
  site: CvLink;
  linkedin: CvLink;
  github: CvLink;
}

export interface CvExperience {
  role: string;
  organization: string;
  start: string;
  end: string;
  highlights: string[];
}

export interface CvEducation {
  institution: string;
  degree: string;
  start: string;
  end: string;
  status?: string;
}

export interface CvLanguage {
  name: string;
  level: string;
}

export interface CvSkillGroup {
  label: string;
  items: string[];
}

export interface CvProjectSelection {
  /** Most relevant full-stack projects (breadth + recency). */
  broad: number;
  /** Reserved slots for specialized/niche projects. */
  niche: number;
  /** Compact complementary list shown after the detailed projects. */
  others: number;
  excludeIds?: string[];
  /** Optional editorial override for the niche slots. */
  nicheIds?: string[];
}

export interface CvProfile {
  name: string;
  title: string;
  summary: string;
  photo: string;
  contact: CvContact;
  experience: CvExperience[];
  education: CvEducation[];
  languages: CvLanguage[];
  skills: CvSkillGroup[];
  projectSelection: CvProjectSelection;
}

/**
 * Canonical resume data. The PDF in src/curriculo is the reference for the
 * experiences/education; projects always come from the current mission data.
 */
export const cvProfile: CvProfile = {
  name: "Mikael Ângelo",
  title: "Desenvolvedor Full Stack",
  summary:
    "Desenvolvedor Full Stack com base em design. Construo produtos de ponta a ponta — do design system no Figma ao deploy — com React, Next.js, TypeScript, PostgreSQL e Cloudflare Workers/D1. Uno design e engenharia, com uso de agentes de IA para acelerar design-to-code, auditoria de qualidade e entregas.",
  photo: "/angelo.png",
  contact: {
    location: "S.G. Amarante, CE",
    phone: "+55 (85) 99830-3773",
    phoneHref: "tel:+5585998303773",
    email: "agmikadesign@gmail.com",
    site: { label: "agmikadev.github.io", href: "https://agmikadev.github.io/" },
    linkedin: {
      label: "linkedin.com/in/angelomikaa",
      href: "https://linkedin.com/in/angelomikaa",
    },
    github: {
      label: "github.com/angelomikaa",
      href: "https://github.com/angelomikaa",
    },
  },
  experience: [
    {
      role: "Desenvolvedor Full Stack",
      organization: "Freelance",
      start: "jan 2025",
      end: "atual",
      highlights: [
        "Aplicações full stack de ponta a ponta com Next.js, React e TypeScript, do design system no Figma ao deploy.",
        "APIs próprias em Cloudflare Workers + D1, autenticação e permissões, com PostgreSQL/Supabase quando o domínio pede.",
        "IA agentic no fluxo: design-to-code via Figma MCP, auditoria de qualidade, OCR e automação de tarefas.",
      ],
    },
    {
      role: "Desenvolvedor Front-end Júnior",
      organization: "Laboratório de Inovações Tecnológicas, UFC",
      start: "jan 2023",
      end: "dez 2025",
      highlights: [
        "Concepção de design systems atômicos no Figma e implementação das interfaces.",
        "Desenvolvimento com React.js, Vue.js, Flutter e ferramentas low/no code (FlutterFlow).",
        "Uso de IA (Claude) para otimização de código, revisão e resolução de bugs.",
      ],
    },
    {
      role: "Estagiário em Design de Interfaces Gráficas",
      organization: "Laboratório de Mídias Educacionais, UFC",
      start: "jan 2019",
      end: "dez 2020",
      highlights: [
        "Assistência na concepção de interfaces para jogos educacionais.",
        "Assistência na concepção de experiências gamificadas.",
        "Coleta de referências visuais para criação de moodboards.",
      ],
    },
  ],
  education: [
    {
      institution: "Universidade Federal do Ceará",
      degree: "Bacharelado em Sistemas e Mídias Digitais",
      start: "2016",
      end: "2022",
      status: "Concluído",
    },
    {
      institution: "EEEP Walter Ramos Araújo",
      degree: "Técnico em Informática",
      start: "2013",
      end: "2015",
    },
  ],
  languages: [
    { name: "Português", level: "Nativo" },
    { name: "Inglês", level: "Avançado" },
  ],
  skills: [
    {
      label: "Front-end",
      items: [
        "React",
        "Next.js",
        "React Router",
        "Vue.js",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "Three.js",
      ],
    },
    {
      label: "Back-end",
      items: ["Node.js", "Hono", "Express.js", "Better Auth", "Zod", "REST API"],
    },
    {
      label: "Dados",
      items: [
        "PostgreSQL",
        "Cloudflare D1",
        "Supabase",
        "Turso",
        "Drizzle ORM",
        "Sequelize",
      ],
    },
    {
      label: "Infra & Deploy",
      items: [
        "Cloudflare Workers",
        "Vercel",
        "GitHub Pages",
        "Docker",
        "GitHub Actions",
      ],
    },
    {
      label: "Design",
      items: ["Figma", "Design Tokens", "UX Research", "Data Visualization"],
    },
    {
      label: "IA & Agentic",
      items: [
        "LLM Integration",
        "RAG",
        "MCP",
        "Prompt Engineering",
        "OCR",
        "Agentic Orchestration",
      ],
    },
  ],
  projectSelection: {
    broad: 3,
    niche: 1,
    others: 6,
    excludeIds: ["portfolio-01"],
    nicheIds: [],
  },
};
