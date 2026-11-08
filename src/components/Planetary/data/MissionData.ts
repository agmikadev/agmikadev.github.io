export interface MissionType {
  id: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  planetIds: string[];
  highlights: string[];
  challenges: string;
  impact: string;
  aiWorkflow?: string;
  technologies: string[];
  external_links?: { label: string; url: string }[];
  imageUrl?: string;
  featured?: boolean;
}

export const MISSION_ARCHIVE: MissionType[] = [
  {
    id: "smartkitchen-01",
    title: "SmartKitchen — Gestão de Estoque",
    year: "2026",
    role: "Desenvolvedor Full Stack",
    summary:
      "Sistema de estoque e perdas para cozinha industrial, construído a partir de um design system atômico no Figma, com auth real e API própria em Cloudflare Worker + D1.",
    planetIds: ["aesthetica", "interactron", "nodeon", "infra-x"],
    highlights: [
      "9 áreas funcionais, de dashboard e produtos a estoque, usuários e aprovações",
      "Auth real com Better Auth, 4 perfis hierárquicos e autorização no servidor",
      "API própria em Cloudflare Worker + D1 com contratos Zod compartilhados",
      "Fluxo de aprovação em 24h para ações destrutivas, com cron de reversão",
      "Fidelidade ao Figma com tokens, renders comparativos e auditoria de design",
    ],
    challenges:
      "Entregar fidelidade ao Figma sem inventar layout, enquanto auth, permissões, D1 e aprovação funcionavam de ponta a ponta.",
    impact:
      "App em produção na Vercel com dados reais no D1 e auth no Neon; todas as telas leem e escrevem no banco.",
    aiWorkflow:
      "Leitura do Figma via MCP/REST, extração de tokens, auditoria de design e implementação assistida por IA.",
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Better Auth",
      "Neon Postgres",
      "Drizzle ORM",
      "Cloudflare Workers",
      "Cloudflare D1",
      "Hono",
      "Zod",
      "Vercel",
    ],
    external_links: [
      { label: "Live Demo", url: "https://smartkitchen-ui.vercel.app" },
    ],
    imageUrl: "/projects/smartkitchen.webp",
    featured: true,
  },
  {
    id: "hellz-dashboard-01",
    title: "Hellz — Painel de Guilda",
    year: "2026",
    role: "Desenvolvedor Full Stack",
    summary:
      "Painel de estatísticas para uma guilda de Ragnarok Origin: screenshots viram dados via OCR, com ranking por classe/função e autorização em RLS.",
    planetIds: ["interactron", "nodeon", "logus-prime", "infra-x", "ai-belt"],
    highlights: [
      "OCR de screenshots com Tesseract.js e correção manual obrigatória",
      "Cálculo de pontos e OVR por classe+função dentro do Postgres",
      "Autorização em RLS e RPCs SECURITY DEFINER, com auditoria para oficiais",
      "Cards por tier, rankings, escalação de guerra e ferramentas de auditoria",
      "PWA com testes Vitest + harness de OCR e CI completo",
    ],
    challenges:
      "Transformar screenshots inconsistentes de 160 jogadores em dados confiáveis, sem deixar autorização ou cálculo de rank no cliente.",
    impact:
      "Painel em produção usado pela guilda, com dados append-only e rankings calculados no banco; cada jogador vê sua posição na própria classe.",
    aiWorkflow:
      "Pipeline de OCR com pré-processamento, whitelist de dígitos e validação humana antes de persistir; amostras reais usadas como harness de regressão.",
    technologies: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS 4",
      "Supabase",
      "PostgreSQL",
      "RLS",
      "Tesseract.js",
      "Vitest",
      "PWA",
      "Vercel",
    ],
    external_links: [
      { label: "Live Demo", url: "https://hellzguild.vercel.app" },
      {
        label: "GitHub",
        url: "https://github.com/angelomikaa/HellzDashboard",
      },
    ],
    imageUrl: "/projects/hellz.webp",
    featured: true,
  },
  {
    id: "footscout-01",
    title: "FootScout — Scouting U15",
    year: "2026",
    role: "Desenvolvedor Full Stack",
    summary:
      "Dashboard de scouting para prospects U15: observações manuais viram perfis visuais, com scoring ponderado, radar e comparação lado a lado.",
    planetIds: ["aesthetica", "interactron", "logus-prime", "nodeon", "infra-x"],
    highlights: [
      "Formulário staged em 5 etapas com autosave, drafts e guarda de alterações",
      "Scoring ponderado 1–5 com breakdown transparente por atributo e pesos via URL",
      "Radar chart e comparação lado a lado com dual radar (Recharts)",
      "React Router 7 em modo framework com SSR e rotas dedicadas",
      "Turso/libSQL para decisões e histórico de Sign/Monitor/Pass",
    ],
    challenges:
      "Fazer o score refletir o que a divisão procura sem esconder a matemática; cada mudança de peso precisa ser explicável e comparável.",
    impact:
      "v1.0 + v1.1 em produção, com 20 planos concluídos e o fluxo observação → score → decisão fechado.",
    technologies: [
      "React Router 7",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Vite",
      "Turso",
      "libSQL",
      "Recharts",
      "Zod",
      "React Hook Form",
      "Vercel",
    ],
    external_links: [
      { label: "Live Demo", url: "https://footscout.vercel.app" },
      { label: "GitHub", url: "https://github.com/angelomikaa/FootScout" },
    ],
    imageUrl: "/projects/footscout.webp",
    featured: true,
  },
  {
    id: "uimaga-01",
    title: "UIMaga — Design System",
    year: "2026",
    role: "Frontend & Design Systems",
    summary:
      "Showcase interativo de um design system token-driven: primitives, componentes atômicos e temas claro/escuro que consomem exclusivamente tokens.",
    planetIds: ["aesthetica", "interactron", "infra-x"],
    highlights: [
      "766 linhas de tokens CSS e 850 linhas de constantes TypeScript, com light/dark",
      "Componentes atômicos sem valores hardcoded — trocar um token atualiza o sistema",
      "Documentação interativa com copy-to-clipboard e visualização de valores",
      "Hierarquia primitives → atoms → organisms e tema persistido",
      "Deploy estático na Vercel",
    ],
    challenges:
      "Manter pureza de tokens em todos os componentes sem engessar a evolução do sistema; cada novo componente precisa nascer do token, não do pixel.",
    impact:
      "Design system navegável e publicado, usado como referência viva de consistência visual e arquitetura de tokens.",
    technologies: [
      "React 19",
      "TypeScript",
      "Vite",
      "CSS Variables",
      "Design Tokens",
      "Design Systems",
      "Vercel",
    ],
    external_links: [
      { label: "Live Demo", url: "https://ui-maga.vercel.app" },
      { label: "GitHub", url: "https://github.com/angelomikaa/UIMaga" },
    ],
    imageUrl: "/projects/uimaga.webp",
    featured: true,
  },
  {
    id: "portal-egressos-01",
    title: "Portal dos Egressos PPGTE-UFC",
    year: "2024",
    role: "Desenvolvedor Full Stack",
    summary:
      "Portal profissional multi-página para showcase de projetos e artigos técnicos do programa de pós-graduação.",
    planetIds: ["interactron", "nodeon", "infra-x"],
    highlights: [
      "Arquitetura full-stack Vue.js + Node.js + PostgreSQL com separação clara de responsabilidades",
      "Sistema multi-página com páginas dedicadas para cada egresso e artigo",
      "Design responsivo com foco em acessibilidade e navegação intuitiva",
      "API RESTful com rotas organizadas e validação de dados",
      "Deploy contínuo na Vercel com builds automatizados",
    ],
    challenges:
      "Organizar um volume grande de conteúdo acadêmico em uma navegação intuitiva, mantendo a performance e a separação de responsabilidades entre frontend, backend e banco de dados.",
    impact:
      "Portal funcional servindo como vitrine digital do programa de pós-graduação, com acesso dedicado a projetos e publicações de cada egresso.",
    aiWorkflow:
      "IA utilizada para análise de arquitetura — sugerindo separação entre estrutura, estilização e comportamento. Otimização de queries PostgreSQL e validação automatizada de inconsistências de responsive design antes do deploy.",
    technologies: [
      "Vue.js",
      "Node.js",
      "Express.js",
      "Sequelize",
      "PostgreSQL",
      "Vite",
      "Git",
      "REST API",
      "Responsive Design",
      "UI Design",
    ],
    external_links: [
      {
        label: "GitHub",
        url: "https://github.com/ivinalara/html-siteportifolio",
      },
      { label: "Live Demo", url: "https://portalegressos.vercel.app/" },
    ],
  },
  {
    id: "portfolio-01",
    title: "Portfolio 3D — Star System",
    year: "2026",
    role: "Desenvolvedor Full Stack",
    summary:
      "Portfolio 3D que usa um sistema planetário como índice de áreas e projetos, com HUD de missões, métricas e uma camada de conteúdo em Cloudflare D1.",
    planetIds: ["interactron", "nodeon", "logus-prime", "infra-x", "ai-belt"],
    highlights: [
      "Sistema solar 3D interativo com React Three Fiber e orbital animation",
      "Projetos como conteúdo principal: Mission Log com filtros, busca e cards com imagens",
      "Cinturão de IA com ferramentas, proficiência e relatórios de projeto",
      "Conteúdo servido por Cloudflare Worker + D1 com fallback estático",
      "SPA estática no GitHub Pages, DPR capped em 2x e 60fps como meta",
    ],
    challenges:
      "Manter o sistema 3D leve e, ao mesmo tempo, garantir que projetos e links sejam encontrados em um clique — sem que a metáfora espacial esconda o conteúdo.",
    impact:
      "Portfolio deployado no GitHub Pages, com navegação por áreas, lista completa de projetos e dados atualizáveis sem novo deploy do frontend.",
    aiWorkflow:
      "Desenvolvimento assistido por IA agentic: arquitetura de dados, otimização de geometrias Three.js, análise de performance e refatoração incremental com code review por IA.",
    technologies: [
      "React.js",
      "TypeScript",
      "Three.js (R3F)",
      "Vite",
      "Tailwind CSS",
      "Cloudflare Workers",
      "Cloudflare D1",
      "GitHub Pages",
      "UI Design",
    ],
    external_links: [
      {
        label: "GitHub",
        url: "https://github.com/agmikadev/agmikadev.github.io",
      },
      { label: "Website", url: "https://agmikadev.github.io/" },
    ],
    imageUrl: "/projects/portfolio.webp",
  },
  {
    id: "antigos-01",
    title: "Entre Antigos e Mileniuns",
    year: "2024",
    role: "Desenvolvedor Frontend",
    summary:
      "Plataforma educacional que ensina Grego Antigo usando cultura popular cearense — cordel, ditados e linguagem informal do Nordeste.",
    planetIds: ["interactron", "aesthetica"],
    highlights: [
      "Abordagem pedagógica inovadora: ponte entre cultura clássica grega e tradição nordestina brasileira",
      "Integração de cordel e ditados populares no processo de aprendizagem de Grego Antigo",
      "Frontend estruturado com HTML semântico, CSS responsivo e JavaScript para interatividade",
      "Acessibilidade cultural e pedagógica como princípio norteador do design",
    ],
    challenges:
      "Criar uma experiência de aprendizado que fosse culturalmente autêntica sem simplificar demais o conteúdo acadêmico de Grego Antigo.",
    impact:
      "Plataforma funcional que democratiza o acesso ao Grego Antigo através da cultura nordestina, com navegação acessível e conteúdo contextualizado.",
    technologies: [
      "Vue.js",
      "Vite",
      "Git",
      "GitHub",
      "Responsive Design",
      "Web Accessibility",
      "UI Design",
    ],
    external_links: [
      {
        label: "GitHub",
        url: "https://github.com/ivinalara/entre-antigos-e-milleniuns",
      },
    ],
  },
  {
    id: "polaris-browser-01",
    title: "Polaris Browser Icon",
    year: "2022",
    role: "UI Designer",
    summary:
      "Identidade visual e ícone vetorial para navegador fictício com conceito de navegação e orientação estelar.",
    planetIds: ["aesthetica"],
    highlights: [
      "Ícone vetorial com conceito 'Find your North' — estrela polar central e estrelas de navegação ao fundo",
      "Paleta degradê verde-azul simbolizando orientação e exploração digital",
      "Desenvolvimento seguindo guidelines iOS/macOS com cantos arredados e acabamento skeuomórfico moderno",
      "Design completo em Figma + Adobe Illustrator com exportação multi-resolução",
    ],
    challenges:
      "Traduzir o conceito abstrato de 'navegação e orientação' em um ícone que comunicasse instantaneamente a proposta do navegador.",
    impact:
      "Ícone pronto para produção com identidade visual memorável e aplicável em múltiplas plataformas e resoluções.",
    technologies: [
      "Figma",
      "Adobe Illustrator",
      "Vector Design",
      "UI Design",
      "Logo Design",
      "Brand Design",
      "Color Theory",
    ],
    external_links: [
      {
        label: "Dribbble",
        url: "https://dribbble.com/shots/20461309-Polaris-Browser-Icon",
      },
    ],
  },
  {
    id: "mangazal-01",
    title: "Mangazal — Rede Social Geek",
    year: "2023",
    role: "UI/UX Designer",
    summary:
      "App de rede social focado em cultura manga e geek com marketplace integrado para compra e venda de colecionáveis.",
    planetIds: ["aesthetica"],
    highlights: [
      "Interface mobile com fórum de discussão + marketplace para colecionáveis (quadrinhos, action figures)",
      "Orientação right-to-left (RTL) em elementos estratégicos da UI — referência à leitura de mangás japoneses",
      "Paleta vibrante laranja-amarelo com dark mode, criando atmosfera envolvente para a cultura geek",
      "UX Research com usuário-alvo para validar fluxos de navegação e descoberta de conteúdo",
    ],
    challenges:
      "Equilibrar a referência cultural japonesa (RTL) com a usabilidade para usuários brasileiros acostumados com LTR.",
    impact:
      "Design completo de app mobile com identidade visual forte e fluxos validados, pronto para handoff ao desenvolvimento.",
    technologies: [
      "Figma",
      "UI Design",
      "UX Research",
      "Mobile Design",
      "User Testing",
      "Design Systems",
      "Color Theory",
      "Typography",
    ],
    external_links: [
      {
        label: "Dribbble",
        url: "https://dribbble.com/shots/22710851-Mangazal",
      },
    ],
  },
  {
    id: "sunpower-01",
    title: "SunPower — Dashboard de Energia Solar",
    year: "2024",
    role: "UI/UX Designer",
    summary:
      "Dashboard mobile para monitoramento de energia solar residencial com estatísticas em tempo real e insights acionáveis.",
    planetIds: ["aesthetica", "logus-prime"],
    highlights: [
      "Dashboard com estatísticas de produção e consumo em tempo real, gráficos de desempenho e comparativos mensais",
      "Data Visualization como princípio central — informação complexa apresentada de forma visual e actionable",
      "Identidade visual amarelo-solar com contraste em preto para legibilidade e impacto",
      "Insights acionáveis colocando o usuário em controle total da produção energética",
    ],
    challenges:
      "Apresentar dados técnicos de energia solar de forma compreensível para usuários não-técnicos, sem perder a precisão das informações.",
    impact:
      "Interface de dashboard completa com visualizações claras que transformam dados de energia solar em decisões informadas para o usuário.",
    technologies: [
      "Figma",
      "UI Design",
      "UX Research",
      "Mobile Design",
      "Data Visualization",
      "Infographics",
      "Design Systems",
      "Color Theory",
      "Typography",
      "User Testing",
    ],
    external_links: [
      {
        label: "Dribbble",
        url: "https://dribbble.com/shots/23469301-Sunpower",
      },
    ],
  },
  {
    id: "maxvidro-01",
    title: "MaxVidro — Sistema de Corte de Vidro",
    year: "2024",
    role: "Desenvolvedor Full Stack",
    summary:
      "Aplicação para otimização de corte de vidro com algoritmos de bin packing e geração automatizada de arquivos técnicos.",
    planetIds: ["interactron", "logus-prime", "ai-belt"],
    highlights: [
      "Algoritmos de otimização combinatória (cutting stock / bin packing) para minimizar desperdício de chapas de vidro",
      "Geração automatizada de arquivos técnicos com medidas e tipos de vidro detalhados",
      "Interface simples para input de dados com output de layouts de corte otimizados",
      "Análise preditiva para estimar desperdício antes do corte real",
    ],
    challenges:
      "Resolver o problema NP-hard de cutting stock com heurísticas eficientes que funcionassem em tempo aceitável para diferentes configurações de chapas.",
    impact:
      "Sistema funcional que reduziu significativamente o desperdício de material na indústria vidreira, gerando layouts de corte otimizados automaticamente.",
    aiWorkflow:
      "IA assistindo na seleção de heurísticas para o algoritmo de bin packing e validação de resultados. Análise preditiva para estimar desperdício antes do corte real. Debug automatizado de edge cases na lógica de otimização.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Git",
    ],
    external_links: [
      { label: "GitHub", url: "https://github.com/angelomikaa/MaxVidro" },
    ],
  },
];
