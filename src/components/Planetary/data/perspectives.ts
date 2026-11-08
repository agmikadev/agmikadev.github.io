export interface MissionPerspective {
  role?: string;
  summary: string;
  highlights: string[];
  challenges?: string;
  impact?: string;
  aiWorkflow?: string;
  technologies?: string[];
}

export type MissionPerspectives = Partial<Record<string, MissionPerspective>>;

/**
 * The same project can be read through different planets. Each perspective
 * changes the role, summary, highlights and (optionally) the stack shown in
 * that area, while the project title and links stay the same.
 */
export const MISSION_PERSPECTIVES: Record<string, MissionPerspectives> = {
  // ---------------------------------------------------------------------------
  // SmartKitchen
  // ---------------------------------------------------------------------------
  "smartkitchen-01": {
    aesthetica: {
      role: "Product Designer & Design Systems",
      summary:
        "Tradução do design atômico do Figma para um sistema de estoque com 9 áreas, tokens e componentes reutilizáveis.",
      highlights: [
        "Auditoria do arquivo Figma com 6 bloqueadores e 22 problemas altos documentados",
        "Design tokens e componentes atômicos usados como contrato entre design e código",
        "Renders comparativos tela a tela para validar fidelidade visual",
      ],
      challenges:
        "Manter fidelidade ao Figma sem inventar layout, mesmo com inconsistências no arquivo original.",
      impact:
        "Design system navegável e implementado com tokens, reduzindo decisões visuais ad hoc.",
      technologies: ["Figma", "Design Tokens", "CSS", "Tailwind CSS"],
    },
    interactron: {
      role: "Frontend Engineer",
      summary:
        "Interface Next.js 15 com 9 áreas, tabelas densas, formulários validados e drawer mobile.",
      highlights: [
        "Next.js App Router + React 19 + TypeScript",
        "Componentes atômicos, tabelas e formulários reutilizáveis",
        "Responsivo em 390/1024/1440 com drawer mobile",
        "Estados de loading, erro e confirmação em fluxos destrutivos",
      ],
      challenges:
        "Entregar 9 áreas com consistência visual e responsividade sem duplicar componentes.",
      impact:
        "Frontend em produção com navegação completa e layouts adaptados a três breakpoints.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zod", "Vercel"],
    },
    nodeon: {
      role: "Backend Engineer",
      summary:
        "API própria em Cloudflare Worker + D1, Better Auth e autorização hierárquica no servidor.",
      highlights: [
        "Worker + D1 com CRUD de produtos, lotes, estoque e dashboard",
        "Better Auth com 4 perfis e autorização server-side",
        "Fluxo de aprovação em 24h com cron de reversão",
        "Contratos Zod compartilhados entre web e API",
      ],
      challenges:
        "Garantir autorização e integridade em um fluxo com aprovação assíncrona e reversão automática.",
      impact:
        "Dados reais persistidos no D1 e auth no Neon, com regras de acesso aplicadas na API.",
      technologies: [
        "Cloudflare Workers",
        "Cloudflare D1",
        "PostgreSQL",
        "Better Auth",
        "Drizzle ORM",
        "Hono",
        "Zod",
      ],
    },
    "infra-x": {
      role: "Deploy & Infra",
      summary:
        "Deploy full-stack com Vercel, Worker + D1 e migrations/seed reproduzíveis.",
      highlights: [
        "Frontend na Vercel e API no Cloudflare Workers",
        "Migrations D1 e seed reproduzível",
        "Cron do Worker para reverter aprovações expiradas",
      ],
      challenges:
        "Coordenar dois provedores (Vercel + Cloudflare) e manter migrations/seed consistentes.",
      impact:
        "Aplicação em produção com deploy contínuo e banco serverless gratuito.",
      technologies: ["Vercel", "Cloudflare Workers", "Cloudflare D1"],
    },
  },

  // ---------------------------------------------------------------------------
  // HellzDashboard
  // ---------------------------------------------------------------------------
  "hellz-dashboard-01": {
    interactron: {
      role: "Frontend Engineer",
      summary:
        "Painel React 19 com cards por tier, rankings, escalação de guerra e fluxo de upload/correção de OCR.",
      highlights: [
        "Cards por tier e rankings por classe/função",
        "Upload de screenshots com OCR no cliente e correção manual",
        "PWA e layout responsivo",
      ],
      challenges:
        "Exibir rankings complexos e um fluxo de OCR com correção humana sem perder clareza.",
      impact:
        "Painel usado pela guilda para acompanhar jogadores e escalar guerras.",
      technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "PWA"],
    },
    nodeon: {
      role: "Backend Engineer",
      summary:
        "Postgres com RLS, RPCs SECURITY DEFINER e cálculos de rank no banco.",
      highlights: [
        "Autorização em RLS e funções SECURITY DEFINER",
        "Cálculo de pontos e OVR por classe+função no Postgres",
        "Dados append-only e trilha de auditoria",
      ],
      challenges:
        "Garantir que ranking e autorização vivam no banco, não na UI.",
      impact:
        "Dados confiáveis e auditáveis para rankings e escalação.",
      technologies: ["Supabase", "PostgreSQL"],
    },
    "logus-prime": {
      role: "Data / OCR Engineer",
      summary:
        "Pipeline de OCR que extrai stats de screenshots e valida lacunas antes de persistir.",
      highlights: [
        "Tesseract.js com regiões e whitelist de dígitos",
        "Detecção de lacunas e correção manual obrigatória",
        "Harness com amostras reais para regressão",
      ],
      challenges:
        "Lidar com screenshots inconsistentes e campos truncados sem inventar dados.",
      impact:
        "Dados de cerca de 160 jogadores extraídos com validação humana.",
      technologies: ["Tesseract.js", "Vitest"],
    },
    "infra-x": {
      role: "Deploy & QA",
      summary:
        "CI com lint, tipos, migrations, guards e build; deploy na Vercel.",
      highlights: [
        "CI completo em GitHub Actions",
        "Manifesto de migrations append-only",
        "Smoke tests e verificação pós-deploy",
      ],
      challenges:
        "Manter migrations e schema sincronizados em um projeto que evolui rápido.",
      impact:
        "Release gate com testes e verificação de deploy.",
      technologies: ["GitHub Actions", "Vercel", "Vitest", "Supabase"],
    },
    "ai-belt": {
      role: "AI / OCR Engineer",
      summary:
        "OCR como camada de IA: pré-processamento, extração e validação humana.",
      highlights: [
        "Pré-processamento de imagens e whitelist",
        "Correção humana obrigatória antes de persistir",
        "Harness de regressão com amostras reais",
      ],
      challenges:
        "Evitar alucinação de dados em um pipeline de OCR.",
      impact:
        "Pipeline de visão confiável o suficiente para rankings.",
      technologies: ["Tesseract.js", "Vitest"],
    },
  },

  // ---------------------------------------------------------------------------
  // FootScout
  // ---------------------------------------------------------------------------
  "footscout-01": {
    aesthetica: {
      role: "Product Designer",
      summary:
        "Perfis visuais de prospects com radar, comparação lado a lado e breakdown de score.",
      highlights: [
        "Radar chart e dual radar para comparação",
        "Hierarquia visual do score e breakdown por atributo",
        "Formulário staged em 5 etapas",
      ],
      challenges:
        "Tornar o scoring ponderado compreensível visualmente.",
      impact:
        "Scouts entendem por que o score sobe ou desce.",
      technologies: ["Figma", "Data Visualization", "Recharts"],
    },
    interactron: {
      role: "Frontend Engineer",
      summary:
        "React Router 7 com SSR, formulário staged, hotbar fixa e guarda de alterações.",
      highlights: [
        "React Router 7 em modo framework",
        "Formulário staged com autosave e drafts",
        "Comparação e listagem com filtros",
      ],
      challenges:
        "Gerenciar estado de formulário longo e navegação com alterações não salvas.",
      impact:
        "Fluxo de scouting rápido e sem perda de dados.",
      technologies: [
        "React Router",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "React Hook Form",
        "Zod",
      ],
    },
    "logus-prime": {
      role: "Scoring / Data Engineer",
      summary:
        "Engine de scoring ponderado 1–5 com breakdown transparente e pesos via URL.",
      highlights: [
        "Médias ponderadas por atributo",
        "Breakdown de deltas por peso",
        "Comparação lado a lado",
      ],
      challenges:
        "Fazer a matemática do score ser explicável e comparável.",
      impact:
        "A divisão vê exatamente por que um jogador sobe ou desce.",
      technologies: ["TypeScript", "Recharts", "Zod"],
    },
    nodeon: {
      role: "Backend Engineer",
      summary:
        "Decisões Sign/Monitor/Pass e histórico em Turso/libSQL.",
      highlights: [
        "Turso/libSQL para decisões e histórico",
        "Uma decisão por jogador, com log de mudanças",
        "Migração do JSON para banco",
      ],
      challenges:
        "Persistir decisões e histórico sem perder a simplicidade do fluxo.",
      impact:
        "Decisões auditáveis e consultáveis no banco.",
      technologies: ["Turso", "TypeScript"],
    },
    "infra-x": {
      role: "Deploy",
      summary:
        "Build SSR na Vercel e deploy contínuo.",
      highlights: [
        "React Router 7 build",
        "Deploy na Vercel",
        "Typecheck e build no fluxo",
      ],
      challenges:
        "Manter SSR e build estável.",
      impact:
        "Aplicação publicada e acessível.",
      technologies: ["Vercel", "Vite"],
    },
  },

  // ---------------------------------------------------------------------------
  // UIMaga
  // ---------------------------------------------------------------------------
  "uimaga-01": {
    aesthetica: {
      role: "Design Systems Designer",
      summary:
        "Showcase de design system token-driven com light/dark e documentação interativa.",
      highlights: [
        "766 linhas de tokens CSS e 850 de constantes TypeScript",
        "Categorias de cor, spacing, tipografia, radius, opacity e blur",
        "Copy-to-clipboard e visualização de valores",
      ],
      challenges:
        "Manter pureza de tokens sem engessar a evolução do sistema.",
      impact:
        "Referência viva de consistência visual.",
      technologies: ["Figma", "Design Tokens"],
    },
    interactron: {
      role: "Frontend Engineer",
      summary:
        "Componentes atômicos que consomem exclusivamente tokens, com tema persistido.",
      highlights: [
        "Hierarquia primitives → atoms → organisms",
        "Light/dark com persistência",
        "Componentes sem valores hardcoded",
      ],
      challenges:
        "Construir componentes reutilizáveis sem hardcode.",
      impact:
        "Trocar um token atualiza o sistema inteiro.",
      technologies: ["React", "TypeScript", "Vite", "CSS", "Design Tokens"],
    },
    "infra-x": {
      role: "Deploy",
      summary:
        "Deploy estático na Vercel.",
      highlights: [
        "Build Vite",
        "Deploy estático",
      ],
      challenges:
        "Manter o showcase leve.",
      impact:
        "Design system publicado.",
      technologies: ["Vercel", "Vite"],
    },
  },

  // ---------------------------------------------------------------------------
  // Portfolio
  // ---------------------------------------------------------------------------
  "portfolio-01": {
    interactron: {
      role: "Frontend Engineer",
      summary:
        "Sistema solar 3D, HUD de projetos e SALTO com filtros por área e tecnologia.",
      highlights: [
        "React Three Fiber + orbital animation",
        "Cards de projeto e SALTO com tech sidebar",
        "Tags canônicas clicáveis",
      ],
      challenges:
        "Equilibrar exploração 3D e acesso direto a projetos.",
      impact:
        "Portfólio navegável por área ou por tecnologia.",
      technologies: ["React", "TypeScript", "Three.js", "Vite", "Tailwind CSS"],
    },
    nodeon: {
      role: "Backend Engineer",
      summary:
        "Cloudflare Worker + D1 para conteúdo e contador anônimo de visitas.",
      highlights: [
        "API /v1/missions, /v1/visits e /v1/stats",
        "Seed gerado a partir do TypeScript",
        "CORS restrito e fallback estático",
      ],
      challenges:
        "Servir conteúdo dinâmico sem tornar o site dependente do Worker.",
      impact:
        "Conteúdo atualizável sem redeploy do frontend.",
      technologies: ["Cloudflare Workers", "Cloudflare D1", "TypeScript"],
    },
    "logus-prime": {
      role: "Data / Content Engineer",
      summary:
        "Taxonomia canônica de tecnologias e seed determinístico.",
      highlights: [
        "Aliases normalizados (React 19 → React)",
        "37 tecnologias agrupadas por categoria",
        "Seed gerado a partir da fonte TypeScript",
      ],
      challenges:
        "Evitar tags duplicadas e manter a navegação por tecnologia consistente.",
      impact:
        "Recrutador filtra React e vê todos os projetos.",
      technologies: ["TypeScript", "Cloudflare D1"],
    },
    "infra-x": {
      role: "Deploy",
      summary:
        "GitHub Pages, GitHub Actions e Worker na Cloudflare.",
      highlights: [
        "Deploy SPA no GitHub Pages",
        "Worker + D1 na Cloudflare",
        "Build com Vite",
      ],
      challenges:
        "Manter o site estático e a API separada.",
      impact:
        "Portfólio publicado com custo zero de infraestrutura.",
      technologies: [
        "GitHub Pages",
        "Cloudflare Workers",
        "Cloudflare D1",
        "Vite",
        "GitHub Actions",
      ],
    },
    "ai-belt": {
      role: "AI-Assisted Developer",
      summary:
        "Pipeline de IA no design, código e performance.",
      highlights: [
        "Leitura de Figma via MCP/REST",
        "Otimização de Three.js",
        "Code review e refatoração com agentes",
      ],
      challenges:
        "Usar IA sem perder controle de qualidade.",
      impact:
        "Desenvolvimento mais rápido com validação humana.",
      technologies: ["Prompt Engineering", "OpenCode", "Cursor", "Figma"],
    },
  },

  // ---------------------------------------------------------------------------
  // Portal dos Egressos
  // ---------------------------------------------------------------------------
  "portal-egressos-01": {
    interactron: {
      role: "Frontend Engineer",
      summary:
        "Portal multi-página em Vue.js com páginas dedicadas a egressos e artigos.",
      highlights: [
        "Navegação multi-página com rotas dedicadas",
        "Layout responsivo e acessível",
        "Consumo da API REST do portal",
      ],
      challenges:
        "Organizar muito conteúdo acadêmico em uma navegação simples.",
      impact:
        "Vitrine digital do programa com páginas por egresso e publicação.",
      technologies: ["Vue.js", "Vite", "REST API"],
    },
    nodeon: {
      role: "Backend Engineer",
      summary:
        "API REST em Node.js/Express com PostgreSQL via Sequelize.",
      highlights: [
        "Rotas REST organizadas por domínio",
        "Modelagem relacional com Sequelize",
        "Validação de dados e separação de responsabilidades",
      ],
      challenges:
        "Manter a API organizada para um volume grande de conteúdo.",
      impact:
        "Backend estável servindo o portal e suas páginas.",
      technologies: ["Node.js", "Express.js", "Sequelize", "PostgreSQL"],
    },
    "infra-x": {
      role: "Deploy",
      summary:
        "Deploy contínuo na Vercel com builds automatizados.",
      highlights: [
        "Build de produção na Vercel",
        "Deploy contínuo",
      ],
      challenges:
        "Manter frontend e backend sincronizados no deploy.",
      impact:
        "Portal publicado e disponível publicamente.",
      technologies: ["Vercel", "Vite"],
    },
  },

  // ---------------------------------------------------------------------------
  // Entre Antigos e Mileniuns
  // ---------------------------------------------------------------------------
  "antigos-01": {
    aesthetica: {
      role: "Product / UI Designer",
      summary:
        "Plataforma educacional que conecta Grego Antigo à cultura popular cearense.",
      highlights: [
        "Ponte entre cultura clássica grega e tradição nordestina",
        "Cordel e ditados populares como recurso pedagógico",
        "Design acessível e culturalmente contextualizado",
      ],
      challenges:
        "Equilibrar autenticidade cultural e rigor acadêmico.",
      impact:
        "Conteúdo de Grego Antigo mais acessível para o público brasileiro.",
      technologies: ["Figma", "UX Research", "HTML", "CSS"],
    },
    interactron: {
      role: "Frontend Engineer",
      summary:
        "Interface Vue.js com conteúdo cultural e navegação acessível.",
      highlights: [
        "Componentes Vue.js",
        "HTML semântico e CSS responsivo",
        "Interações para o conteúdo educacional",
      ],
      challenges:
        "Manter a experiência leve para um conteúdo textual extenso.",
      impact:
        "Plataforma funcional e navegável.",
      technologies: ["Vue.js", "Vite", "HTML", "CSS"],
    },
  },

  // ---------------------------------------------------------------------------
  // SunPower
  // ---------------------------------------------------------------------------
  "sunpower-01": {
    aesthetica: {
      role: "UI/UX Designer",
      summary:
        "Dashboard mobile de energia solar com foco em data visualization e insights acionáveis.",
      highlights: [
        "Gráficos de produção e consumo em tempo real",
        "Comparativos mensais e hierarquia visual clara",
        "Identidade solar com alto contraste",
      ],
      challenges:
        "Apresentar dados técnicos de energia para usuários não técnicos.",
      impact:
        "Dashboard que transforma dados de energia em decisões.",
      technologies: ["Figma", "Data Visualization", "UX Research", "Design Tokens"],
    },
    "logus-prime": {
      role: "Data Visualization",
      summary:
        "Transformação de dados de produção e consumo em insights acionáveis.",
      highlights: [
        "Comparativos mensais e séries de produção",
        "Indicadores de desempenho e consumo",
        "Visualizações orientadas à decisão",
      ],
      challenges:
        "Manter precisão técnica sem sobrecarregar a leitura.",
      impact:
        "Usuário entende produção, consumo e oportunidades de economia.",
      technologies: ["Data Visualization", "Figma", "Design Tokens"],
    },
  },

  // ---------------------------------------------------------------------------
  // MaxVidro
  // ---------------------------------------------------------------------------
  "maxvidro-01": {
    interactron: {
      role: "Frontend Engineer",
      summary:
        "Interface para input de medidas e visualização de layouts de corte otimizados.",
      highlights: [
        "Input de medidas e tipos de vidro",
        "Visualização dos layouts de corte",
        "Geração automatizada de arquivos técnicos",
      ],
      challenges:
        "Tornar um problema combinatório complexo operável na interface.",
      impact:
        "Operador consegue gerar e conferir o plano de corte.",
      technologies: ["HTML", "CSS", "JavaScript"],
    },
    "logus-prime": {
      role: "Algorithms Engineer",
      summary:
        "Bin packing/cutting stock para minimizar o desperdício de chapas.",
      highlights: [
        "Heurísticas de cutting stock",
        "Layouts otimizados para diferentes chapas",
        "Geração de arquivos técnicos com medidas",
      ],
      challenges:
        "Resolver um problema NP-hard com tempo de resposta aceitável.",
      impact:
        "Redução de desperdício de material na produção.",
      technologies: ["JavaScript", "Predictive Analytics"],
    },
    "ai-belt": {
      role: "AI-Assisted Developer",
      summary:
        "IA na seleção de heurísticas e análise preditiva de desperdício.",
      highlights: [
        "Seleção assistida de heurísticas",
        "Estimativa de desperdício antes do corte",
        "Debug automatizado de edge cases",
      ],
      challenges:
        "Validar resultados combinatórios sem perder confiança no algoritmo.",
      impact:
        "Decisões de corte mais informadas e menos desperdício.",
      technologies: ["Predictive Analytics", "Machine Learning", "Prompt Engineering"],
    },
  },
};

export function resolveMissionPerspective(
  mission: { id: string; perspectives?: MissionPerspectives },
  planetId?: string,
): MissionPerspective | undefined {
  if (!planetId) return undefined;
  return mission.perspectives?.[planetId] ?? MISSION_PERSPECTIVES[mission.id]?.[planetId];
}
