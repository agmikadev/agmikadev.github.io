export interface TelemetryStat {
  label: string;
  value: number | string;
  alternatives?: string[];
}

export interface PlanetTool {
  id: string;
  name: string;
  category?: string;
}

export interface PlanetModel {
  id: string;
  name: string;
  type: string;
  description: string;
  tools: PlanetTool[];
  shape: "sphere" | "hexagon" | "icosahedron" | "belt";
  variant?: "standard" | "ringed" | "wireframe";
  hasAI?: boolean;
  color: string;
  textureUrl?: string;
  size: number;
  orbitSize: number;
  speed: number;
  stats: TelemetryStat[];
}

export const planets: PlanetModel[] = [
  {
    id: "aesthetica",
    name: "AESTHETICA",
    type: "Matriz Visual",
    description:
      "O setor de design primário. Gera protótipos de alta fidelidade, geometrias vetoriais e experiências visuais focadas no usuário antes da compilação do código.",
    tools: [
      { id: "figma", name: "Figma", category: "design" },
      { id: "adobe-illustrator", name: "Adobe Illustrator", category: "design" },
      { id: "ui-design", name: "UI Design", category: "skill" },
      { id: "ux-research", name: "UX Research", category: "skill" },
      { id: "mobile-design", name: "Mobile Design", category: "skill" },
      { id: "responsive-design", name: "Responsive Design", category: "skill" },
      { id: "design-systems", name: "Design Systems", category: "skill" },
      { id: "brand-design", name: "Brand Design", category: "skill" },
      { id: "color-theory", name: "Color Theory", category: "skill" },
      { id: "typography", name: "Typography", category: "skill" },
      { id: "data-viz", name: "Data Visualization", category: "skill" },
      { id: "infographics", name: "Infographics", category: "skill" },
      { id: "logo-design", name: "Logo Design", category: "skill" },
      { id: "vector-design", name: "Vector Design", category: "skill" },
    ],

    shape: "sphere",
    variant: "standard",
    hasAI: true,
    color: "#a855f7",
    size: 22,
    orbitSize: 160,
    speed: 10,

    stats: [
      {
        label: "Prototipagem de alta fidelidade com Figma",
        value: 95,
        alternatives: ["Pixso", "Adobe XD", "Sketch"],
      },
      {
        label: "Ilustração e edição vetorial com Adobe Illustrator",
        value: 85,
        alternatives: ["Affinity", "Inkscape"],
      },
      {
        label: "Pesquisa e validação de experiência (UX Research)",
        value: 85,
      },
      {
        label: "Estruturação de Design Systems escaláveis",
        value: 90,
        alternatives: ["Design Tokens", "Component Libraries"],
      },
      {
        label: "Design responsivo multi-plataforma",
        value: 95,
        alternatives: ["Mobile Design"],
      },
      {
        label: "Visualização de dados e infográficos",
        value: 80,
      },
      {
        label: "Criação de identidade visual (Brand Design)",
        value: 95,
        alternatives: ["Logo Design", "Color Theory", "Typography"],
      },
    ],
  },

  {
    id: "interactron",
    name: "INTERACTRON",
    type: "Esfera de Interface",
    description:
      "O motor de renderização da superfície. Responsável pela interação humano-máquina, gerenciamento de estado global e renderização de telemetria visual.",
    tools: [
      { id: "react", name: "React.js", category: "framework" },
      { id: "vue", name: "Vue.js", category: "framework" },
      { id: "typescript", name: "TypeScript", category: "language" },
      { id: "javascript", name: "JavaScript", category: "language" },
      { id: "html", name: "HTML5", category: "language" },
      { id: "css", name: "CSS3", category: "language" },
      { id: "tailwind", name: "Tailwind CSS", category: "styling" },
      { id: "vite", name: "Vite", category: "build" },
      { id: "framer-motion", name: "Framer Motion", category: "animation" },
      { id: "three-fiber", name: "Three.js (R3F)", category: "3d" },
      { id: "responsive-design", name: "Responsive Design", category: "skill" },
      { id: "web-accessibility", name: "Web Accessibility", category: "skill" },
      { id: "context-api", name: "Context API", category: "state" },
      { id: "axios", name: "Axios", category: "data" },
    ],

    shape: "sphere",
    hasAI: true,
    color: "#61dafb",
    size: 24,
    orbitSize: 260,
    speed: 16,

    stats: [
      {
        label: "Criação de arquitetura baseada em componentes com React.js",
        value: 95,
        alternatives: ["Vue.js", "Next.js"],
      },
      {
        label: "Programação JavaScript moderna",
        value: 95,
      },
      {
        label: "Tipagem estática avançada com TypeScript",
        value: 80,
      },
      {
        label: "Estruturação semântica com HTML5",
        value: 95,
      },
      {
        label: "Estilização complexa com CSS3",
        value: 95,
        alternatives: ["SCSS", "Sass"],
      },
      {
        label: "Estilização rápida com Tailwind CSS",
        value: 85,
        alternatives: ["shadcn/ui", "Styled Components"],
      },
      {
        label: "Build e bundling com Vite",
        value: 90,
        alternatives: ["Webpack", "Turbopack", "Rollup"],
      },
      {
        label: "Animação fluida de componentes com Framer Motion",
        value: 80,
        alternatives: ["GSAP", "React Spring", "CSS Animations"],
      },
      {
        label: "Implementação de interfaces responsivas PC e Mobile",
        value: 95,
        alternatives: ["Mobile First", "Web Accessibility", "ARIA"],
      },
      {
        label: "Gerenciamento de estado com Context API",
        value: 75,
        alternatives: ["Redux", "Zustand", "Recoil"],
      },
      {
        label: "Requisições HTTP e gerenciamento de cache com Axios",
        value: 90,
        alternatives: ["React Query", "SWR", "Fetch API"],
      },
    ],
  },

  {
    id: "nodeon",
    name: "NODEON",
    type: "Nexus de Dados",
    description:
      "O hub central de backend. Não é um planeta, mas sim uma megaestrutura de 160km de diâmetro estrategicamente posicionada. Lida com roteamento assíncrono, mutações de banco de dados, transmissão segura de dados e lógica do lado do servidor.",
    tools: [
      { id: "nodejs", name: "Node.js", category: "runtime" },
      { id: "express", name: "Express.js", category: "framework" },
      { id: "postgresql", name: "PostgreSQL", category: "database" },
      { id: "mongodb", name: "MongoDB", category: "database" },
      { id: "sequelize", name: "Sequelize", category: "orm" },
      { id: "rest-api", name: "REST API", category: "skill" },
      { id: "graphql", name: "GraphQL", category: "skill" },
      { id: "jwt", name: "JWT", category: "auth" },
    ],

    shape: "hexagon",
    variant: "standard",
    hasAI: true,
    color: "#339933",
    size: 20,
    orbitSize: 360,
    speed: 22,

    stats: [
      {
        label: "Processamento de eventos assíncronos com Node.js",
        value: 90,
      },
      {
        label: "Criação de rotas de API com Express.js",
        value: 85,
        alternatives: ["Fastify", "NestJS"],
      },
      {
        label: "Modelagem de dados relacionais com PostgreSQL",
        value: 80,
        alternatives: ["MySQL", "SQLite"],
      },
      {
        label: "Banco de dados NoSQL com MongoDB",
        value: 85,
      },
      {
        label: "Mapeamento objeto-relacional com Prisma",
        value: 75,
        alternatives: ["Sequelize", "TypeORM", "Mongoose"],
      },
      {
        label: "Design e implementação de APIs RESTful",
        value: 80,
      },
      {
        label: "Consulta de dados otimizada com GraphQL",
        value: 75,
        alternatives: ["tRPC"],
      },
      {
        label: "Comunicação em tempo real com WebSockets",
        value: 75,
        alternatives: ["Socket.io", "gRPC"],
      },
      {
        label: "Autenticação e autorização com JWT",
        value: 65,
        alternatives: ["OAuth", "Passport.js", "bcrypt"],
      },
      {
        label: "Validação de schemas e dados",
        value: 65,
        alternatives: ["Zod", "Joi", "Yup"],
      },
      {
        label: "Testes automatizados de backend",
        value: 70,
        alternatives: ["Jest", "Mocha", "Supertest"],
      },
    ],
  },

  {
    id: "logus-prime",
    name: "LOGUS-PRIME",
    type: "Prisma de Algoritmos",
    description:
      "O processador lógico. Executa algoritmos computacionais complexos, pipelines de transformação de dados e otimização da arquitetura do sistema.",
    tools: [
      { id: "typescript", name: "TypeScript", category: "language" },
      { id: "python", name: "Python", category: "language" },
      { id: "algorithms", name: "Algorithms", category: "skill" },
      { id: "data-structures", name: "Data Structures", category: "skill" },
      { id: "graphql", name: "GraphQL", category: "skill" },
      { id: "machine-learning", name: "Machine Learning", category: "skill" },
    ],

    shape: "sphere",
    hasAI: true,
    color: "#ff4500",
    size: 32,
    orbitSize: 460,
    speed: 28,

    stats: [
      {
        label: "Resolução de algoritmos complexos com Python",
        value: 55,
        alternatives: ["Java", "C++"],
      },
      {
        label: "Estruturação de modelos complexos com TypeScript",
        value: 80,
      },
      {
        label: "Análise e manipulação de dados",
        value: 50,
        alternatives: ["NumPy", "Pandas", "SciPy"],
      },
      {
        label: "Implementação de modelos de Machine Learning",
        value: 60,
        alternatives: ["TensorFlow", "PyTorch", "Scikit-learn"],
      },
      {
        label: "Pipelines de transformação de dados (ETL)",
        value: 60,
        alternatives: ["Data Pipeline"],
      },
      {
        label: "Design e otimização de algoritmos",
        value: 75,
        alternatives: ["Sorting Algorithms", "Search Algorithms", "Dynamic Programming"],
      },
      {
        label: "Estruturas de dados avançadas",
        value: 55,
        alternatives: ["Graph Theory"],
      },
      {
        label: "Consulta de dados com GraphQL",
        value: 75,
        alternatives: ["SQL", "NoSQL", "Query Optimization"],
      },
      {
        label: "Análise estatística e probabilística",
        value: 60,
        alternatives: ["Statistics", "Probability", "Linear Algebra"],
      },
      {
        label: "Otimização de algoritmos complexos com IA",
        value: 85,
      },
    ],
  },

  {
    id: "infra-x",
    name: "INFRA-X",
    type: "Setor de Implantação",
    description:
      "A plataforma de implantação orbital. Gerencia integração contínua, ambientes em contêineres e automação segura de infraestrutura em nuvem.",
    tools: [
      { id: "git", name: "Git", category: "vcs" },
      { id: "github", name: "GitHub", category: "vcs" },
      { id: "github-actions", name: "GitHub Actions", category: "ci" },
      { id: "vercel", name: "Vercel", category: "hosting" },
      { id: "netlify", name: "Netlify", category: "hosting" },
      { id: "npm", name: "npm", category: "pkg" },
    ],

    shape: "sphere",
    variant: "standard",
    hasAI: true,
    color: "#2496ed",
    size: 22,
    orbitSize: 560,
    speed: 34,

    stats: [
      {
        label: "Controle de versão de código com Git",
        value: 70,
        alternatives: ["GitHub", "GitLab", "Git Flow"],
      },
      {
        label: "Deploy de aplicações frontend",
        value: 90,
        alternatives: ["Vercel", "Netlify", "Heroku", "Railway"],
      },
      {
        label: "Configuração de servidores web (Nginx)",
        value: 50,
        alternatives: ["Apache", "Caddy"],
      },
      {
        label: "Gerenciamento de dependências (npm)",
        value: 80,
        alternatives: ["yarn", "pnpm"],
      },
      {
        label: "Gestão de ambientes (Dev/Staging/Prod)",
        value: 70,
        alternatives: ["Environment Variables", "Staging", "Production"],
      },
      {
        label: "Testes de performance e carga",
        value: 40,
        alternatives: ["Load Testing", "Performance Testing"],
      },
      {
        label: "Segurança e criptografia de conexões",
        value: 40,
        alternatives: ["SSL/TLS", "Security Best Practices"],
      },
    ],
  },

  {
    id: "ai-belt",
    name: "LLMB",
    type: "Large Language Model Belt",
    description:
      "Uma rede neural autodidata que acumula uma quantidade imensurável de dados. É capaz de otimizar processos, sugerir melhorias e até mesmo antecipar falhas antes que ocorram. Sua principal função é se utilizar do seu volume robusto de informações em tempo real para sugerir os melhores cursos de ação para o astronauta, ajudando a maximizar a produtividade e minimizar o tempo perdido com bugs.",
    tools: [
      { id: "llm-integration", name: "LLM Integration", category: "llm" },
      { id: "agentic-orchestration", name: "Agentic Orchestration", category: "orchestration" },
      { id: "prompt-engineering", name: "Prompt Engineering", category: "prompt" },
      { id: "rag-systems", name: "RAG Systems", category: "rag" },
      { id: "mcp-protocol", name: "MCP Protocol", category: "mcp" },
      { id: "ai-evaluation", name: "AI Evaluation & Testing", category: "evaluation" },
      { id: "code-ai-optimization", name: "AI Code Optimization", category: "evaluation" },
      { id: "predictive-analytics", name: "Predictive Analytics", category: "orchestration" },
    ],

    shape: "belt",
    color: "#a9fc03",
    variant: "wireframe",
    size: 0,
    orbitSize: 0,
    speed: 0,
    hasAI: true,

    stats: [],
  },
];
