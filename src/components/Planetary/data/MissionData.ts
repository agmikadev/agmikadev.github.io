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
}

export const MISSION_ARCHIVE: MissionType[] = [
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
    title: "Portfolio Pessoal",
    year: "2026",
    role: "Desenvolvedor Frontend",
    summary:
      "Portfolio 3D interativo com tema espacial, sistema planetário e HUD analítico — deployado como SPA estática no GitHub Pages.",
    planetIds: ["interactron", "logus-prime", "infra-x", "ai-belt"],
    highlights: [
      "Sistema solar 3D interativo com React Three Fiber, orbital animation e instanced meshes para partículas",
      "HUD sci-fi com dashboards por planeta — missões estruturadas e métricas de proficiência com progress bars",
      "Cinturão de IA (S.O.N.D.A. Network) com modelo de dados próprio — tools categorizados e mission reports com problem/approach/outcome",
      "Pipeline de dados estática com hooks customizados (usePlanetData, useMissions) abstraindo consumo de dados das UIs",
      "SPA estática com 60fps estável, DPR capped em 2x e deploy via GitHub Pages",
    ],
    challenges:
      "Alcançar 60fps estável em hardware intermediário com centenas de partículas instanciadas, múltiplos Canvas R3F e HUDs complexos — tudo como SPA estática sem servidor.",
    impact:
      "Portfolio deployado no GitHub Pages com performance validada, servindo como demonstração ao vivo de habilidades em React, Three.js e arquitetura de dados.",
    aiWorkflow:
      "Desenvolvimento end-to-end assistido por IA agentic: arquitetura de dados planejada com agentes GSD, otimização de geometrias Three.js via prompt engineering, debug de performance com análise automatizada de gargalos de renderização, e refatoração incremental com code review por IA.",
    technologies: [
      "React.js",
      "TypeScript",
      "Three.js (R3F)",
      "Vite",
      "Tailwind CSS",
      "Git",
      "GitHub",
      "Responsive Design",
      "UI Design",
    ],
    external_links: [
      {
        label: "GitHub",
        url: "https://github.com/angelomikaa/angelomikaa.github.io",
      },
      { label: "Website", url: "https://angelomikaa.github.io" },
    ],
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
