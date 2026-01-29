// Interface para padronização das estatísticas
export interface TelemetryStat {
  label: string;
  value: number | string;
  alternatives?: string[]; // Lista de tecnologias alternativas (sem barra própria)
}

export interface PlanetModel {
  id: string;
  name: string;
  type: string;
  description: string;
  tools: string[];
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

// OS DADOS DO SISTEMA SOLAR (Totalmente Localizado para PT-BR)
export const planets: PlanetModel[] = [
  // --- 1. THE DESIGN HUB ---
  {
    id: "aesthetica",
    name: "AESTHETICA",
    type: "Matriz Visual",
    description:
      "O setor de design primário. Gera protótipos de alta fidelidade, geometrias vetoriais e experiências visuais focadas no usuário antes da compilação do código.",
    tools: [
      "Figma", "Pixso", "Adobe XD", "Sketch",
      "Adobe Illustrator", "Vector Design", "Inkscape",
      "UI Design", "UX Research", "Mobile Design", "Responsive Design",
      "User Testing", "Usability Testing",
      "Design Systems", "Design Tokens", "Component Libraries",
      "Principle", "ProtoPie", "After Effects",
      "Data Visualization", "Infographics",
      "Photoshop", "Image Editing",
      "Brand Design", "Logo Design", "Color Theory", "Typography",
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
        alternatives: ["Pixso", "Adobe XD", "Sketch"]
      },
      { 
        label: "Ilustração e edição vetorial com Adobe Illustrator", 
        value: 85,
        alternatives: ["Vector Design", "Inkscape"]
      },
      { 
        label: "Design de interfaces modernas (UI Design)", 
        value: 95
      },
      { 
        label: "Pesquisa e validação de experiência (UX Research)", 
        value: 85,
        alternatives: ["User Testing", "Usability Testing"]
      },
      { 
        label: "Estruturação de Design Systems escaláveis", 
        value: 90,
        alternatives: ["Design Tokens", "Component Libraries"]
      },
      { 
        label: "Design responsivo multi-plataforma", 
        value: 95,
        alternatives: ["Mobile Design"]
      },
      { 
        label: "Visualização de dados e infográficos", 
        value: 80,
        alternatives: ["Infographics"]
      },
      { 
        label: "Criação de identidade visual (Brand Design)", 
        value: 95,
        alternatives: ["Logo Design", "Color Theory", "Typography"]
      },
      { 
        label: "Animação e prototipagem interativa", 
        value: 85,
        alternatives: ["Principle", "ProtoPie", "After Effects"]
      },
    ],
  },

  // --- 2. THE FRONTEND ENGINE ---
  {
    id: "interactron",
    name: "INTERACTRON",
    type: "Esfera de Interface",
    description:
      "O motor de renderização da superfície. Responsável pela interação humano-máquina, gerenciamento de estado global e renderização de telemetria visual.",
    tools: [
      "React.js", "Vue.js", "Next.js", "Nuxt.js", "Angular", "Svelte",
      "Vite", "Webpack", "Turbopack", "Rollup",
      "JavaScript", "TypeScript", "HTML", "XHTML", "CSS", "SCSS", "Sass",
      "Tailwind CSS", "Styled Components", "CSS Modules", "Emotion", "Material-UI", "shadcn/ui",
      "Framer Motion", "GSAP", "React Spring", "CSS Animations",
      "Redux", "Zustand", "Context API", "Recoil", "MobX",
      "Responsive Design", "Mobile First", "Web Accessibility", "ARIA",
      "React Router", "React Query", "SWR", "Axios", "Fetch API",
    ],

    shape: "sphere",
    hasAI: true,
    color: "#61dafb",
    size: 24,
    orbitSize: 260,
    speed: 16,

    stats: [
      { 
        label: "Desenvolvimento de componentes React.js", 
        value: 95,
        alternatives: ["Vue.js", "Next.js", "Nuxt.js", "Angular", "Svelte"]
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
        alternatives: ["XHTML"]
      },
      { 
        label: "Estilização complexa com CSS3", 
        value: 95,
        alternatives: ["SCSS", "Sass"]
      },
      { 
        label: "Estilização rápida com Tailwind CSS",
        value: 85,
        alternatives: ["Styled Components", "Bootstrap", "Emotion", "Material-UI", "shadcn/ui"]
      },
      { 
        label: "Build e bundling com Vite", 
        value: 90,
        alternatives: ["Webpack", "Turbopack", "Rollup"]
      },
      { 
        label: "Animação fluida de componentes com Framer Motion", 
        value: 80,
        alternatives: ["GSAP", "React Spring", "CSS Animations"]
      },
      { 
        label: "Implementação de interfaces responsivas", 
        value: 95,
        alternatives: ["Mobile First", "Web Accessibility", "ARIA"]
      },
      { 
        label: "Gerenciamento de estado com Context API", 
        value: 75,
        alternatives: ["Redux", "Zustand", "Recoil", "MobX"]
      },
      { 
        label: "Requisições HTTP e gerenciamento de cache", 
        value: 90,
        alternatives: ["React Query", "SWR", "Axios", "Fetch API"]
      },
    ],
  },

  // --- 3. THE BACKEND HUB ---
  {
    id: "nodeon",
    name: "NODEON",
    type: "Nexus de Dados",
    description:
      "O hub central de backend. Não é um planeta, mas sim uma megaestrutura de 160km de diâmetro estrategicamente posicionada. Lida com roteamento assíncrono, mutações de banco de dados, transmissão segura de dados e lógica do lado do servidor.",
    tools: [
      "Node.js", "Express.js", "Fastify", "NestJS", "Koa", "Hapi",
      "PostgreSQL", "MongoDB", "MySQL", "Redis", "SQLite",
      "Prisma", "Sequelize", "TypeORM", "Mongoose", "Knex.js",
      "JWT", "OAuth", "Passport.js", "bcrypt", "Auth0",
      "REST API", "GraphQL", "tRPC", "WebSockets", "Socket.io", "gRPC",
      "Bull", "RabbitMQ", "Kafka", "Message Queues",
      "Zod", "Joi", "Yup", "JSON Schema",
      "Jest", "Mocha", "Supertest",
      "TypeScript", "Middleware", "Error Handling", "Logging", "Winston", "Morgan",
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
        value: 90
      },
      { 
        label: "Criação de rotas de API com Express.js", 
        value: 85,
        alternatives: ["Fastify", "NestJS", "Koa", "Hapi"]
      },
      { 
        label: "Modelagem de dados relacionais com PostgreSQL", 
        value: 80,
        alternatives: ["MySQL", "SQLite"]
      },
      { 
        label: "Banco de dados NoSQL com MongoDB", 
        value: 85
      },
      { 
        label: "Caching e armazenamento em memória com Redis", 
        value: 70
      },
      { 
        label: "Mapeamento objeto-relacional com Prisma", 
        value: 75,
        alternatives: ["Sequelize", "TypeORM", "Mongoose", "Knex.js"]
      },
      { 
        label: "Design e implementação de APIs RESTful", 
        value: 80
      },
      { 
        label: "Consulta de dados otimizada com GraphQL", 
        value: 75,
        alternatives: ["tRPC"]
      },
      { 
        label: "Comunicação em tempo real com WebSockets", 
        value: 75,
        alternatives: ["Socket.io", "gRPC"]
      },
      { 
        label: "Autenticação e autorização com JWT", 
        value: 65,
        alternatives: ["OAuth", "Passport.js", "bcrypt", "Auth0"]
      },
      { 
        label: "Validação de schemas e dados", 
        value: 65,
        alternatives: ["Zod", "Joi", "Yup", "JSON Schema"]
      },
      { 
        label: "Processamento assíncrono com filas de mensagens", 
        value: 65,
        alternatives: ["Bull", "RabbitMQ", "Kafka"]
      },
      { 
        label: "Testes automatizados de backend", 
        value: 70,
        alternatives: ["Jest", "Mocha", "Supertest"]
      },
    ],
  },

  // --- 4. THE LOGIC PROCESSOR ---
  {
    id: "logus-prime",
    name: "LOGUS-PRIME",
    type: "Prisma de Algoritmos",
    description:
      "O processador lógico. Executa algoritmos computacionais complexos, pipelines de transformação de dados e otimização da arquitetura do sistema.",
    tools: [
      "Python", "NumPy", "Pandas", "SciPy", "Matplotlib",
      "TypeScript", "Java", "C++", "Rust", "Go",
      "TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Machine Learning", "Deep Learning", "Neural Networks",
      "Data Analysis", "Data Mining", "ETL", "Data Pipeline", "Big Data",
      "Algorithms", "Data Structures", "Sorting Algorithms", "Search Algorithms", "Graph Theory", "Dynamic Programming",
      "GraphQL", "SQL", "NoSQL", "Query Optimization",
      "Linear Algebra", "Statistics", "Probability", "Calculus",
      "Jupyter Notebook", "R", "MATLAB", "Computer Vision", "Natural Language Processing", "NLP",
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
        alternatives: ["Java", "C++", "Rust", "Go"]
      },
      { 
        label: "Estruturação de modelos complexos com TypeScript", 
        value: 80,
      },
      { 
        label: "Análise e manipulação de dados", 
        value: 50,
        alternatives: ["NumPy", "Pandas", "SciPy", "Matplotlib"]
      },
      { 
        label: "Implementação de modelos de Machine Learning", 
        value: 60,
        alternatives: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Deep Learning", "Neural Networks"]
      },
      { 
        label: "Análise exploratória e mineração de dados", 
        value: 55,
        alternatives: ["Data Mining", "Big Data"]
      },
      { 
        label: "Pipelines de transformação de dados (ETL)", 
        value: 60,
        alternatives: ["Data Pipeline"]
      },
      { 
        label: "Design e otimização de algoritmos", 
        value: 75,
        alternatives: ["Sorting Algorithms", "Search Algorithms", "Dynamic Programming"]
      },
      { 
        label: "Estruturas de dados avançadas", 
        value: 55,
        alternatives: ["Graph Theory"]
      },
      { 
        label: "Consulta de dados com GraphQL", 
        value: 75,
        alternatives: ["SQL", "NoSQL", "Query Optimization"]
      },
      { 
        label: "Análise estatística e probabilística", 
        value: 60,
        alternatives: ["Statistics", "Probability", "Linear Algebra", "Calculus"]
      },
      { 
        label: "Visão computacional", 
        value: 65,
        alternatives: ["Computer Vision"]
      },
      { 
        label: "Processamento de linguagem natural", 
        value: 50,
        alternatives: ["NLP"]
      },
      { 
        label: "Ferramentas de pesquisa científica", 
        value: 50,
        alternatives: ["Jupyter Notebook", "R", "MATLAB"]
      },
      { 
        label: "Otimização de algoritmos complexos com IA", 
        value: 85
      },
    ],
  },

  // --- 5. THE DEPLOYMENT PLATFORM ---
  {
    id: "infra-x",
    name: "INFRA-X",
    type: "Setor de Implantação",
    description:
      "A plataforma de implantação orbital. Gerencia integração contínua, ambientes em contêineres e automação segura de infraestrutura em nuvem.",
    tools: [
      "Docker", "Docker Compose", "Kubernetes", "Podman",
      "Git", "GitHub", "GitLab", "Bitbucket", "Git Flow", "GitHub Actions",
      "AWS", "Azure", "Google Cloud Platform", "GCP", "Vercel", "Netlify", "Heroku", "Railway", "Render",
      "CI/CD", "Jenkins", "CircleCI", "Travis CI", "GitLab CI",
      "Terraform", "Ansible", "CloudFormation", "Pulumi",
      "Prometheus", "Grafana", "ELK Stack", "Datadog", "New Relic", "Sentry",
      "Nginx", "Apache", "Caddy", "HAProxy",
      "SSL/TLS", "Security Best Practices", "Penetration Testing", "Vulnerability Scanning",
      "npm", "yarn", "pnpm", "pip",
      "Environment Variables", "Staging", "Production", "Load Testing", "Performance Testing",
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
        alternatives: ["GitHub", "GitLab", "Bitbucket", "Git Flow"]
      },
      { 
        label: "Isolamento de ambientes com Docker", 
        value: 15,
        alternatives: ["Docker Compose", "Podman"]
      },
      { 
        label: "Orquestração de containers com Kubernetes", 
        value: 10,
      },
      { 
        label: "Automação de pipelines com CI/CD", 
        value: 10,
        alternatives: ["GitHub Actions", "GitLab CI", "Jenkins", "CircleCI", "Travis CI"]
      },
      { 
        label: "Hospedagem de infraestrutura em nuvem (AWS)", 
        value: 20,
        alternatives: ["Azure", "Google Cloud Platform", "GCP"]
      },
      { 
        label: "Deploy de aplicações frontend", 
        value: 90,
        alternatives: ["Vercel", "Netlify", "Heroku", "Railway", "Render"]
      },
      { 
        label: "Infraestrutura como código", 
        value: 12,
        alternatives: ["Terraform", "Ansible", "CloudFormation", "Pulumi"]
      },
      { 
        label: "Configuração de servidores web (Nginx)", 
        value: 50,
        alternatives: ["Apache", "Caddy", "HAProxy"]
      },
      { 
        label: "Observabilidade e monitoramento de aplicações", 
        value: 25,
        alternatives: ["Prometheus", "Grafana", "ELK Stack", "Datadog", "New Relic", "Sentry"]
      },
      { 
        label: "Segurança e criptografia de conexões", 
        value: 40,
        alternatives: ["SSL/TLS", "Security Best Practices"]
      },
      { 
        label: "Gerenciamento de dependências (npm)", 
        value: 80,
        alternatives: ["yarn", "pnpm", "pip"]
      },
      { 
        label: "Gestão de ambientes (Dev/Staging/Prod)", 
        value: 70,
        alternatives: ["Environment Variables", "Staging", "Production"]
      },
      { 
        label: "Testes de performance e carga", 
        value: 40,
        alternatives: ["Load Testing", "Performance Testing", "Penetration Testing", "Vulnerability Scanning"]
      },
    ],
  },

  // --- 6. THE AI BELT ---
  {
    id: "ai-belt",
    name: "S.O.N.D.A. NETWORK",
    type: "Neural Backbone",
    description:
      "Uma rede neural autodidata que acumula uma quantidade imensurável de dados. É capaz de otimizar processos, sugerir melhorias e até mesmo antecipar falhas antes que ocorram. Sua principal função é se utilizar do seu volume robusto de informações em tempo real para sugerir os melhores cursos de ação para o astronauta, ajudando a maximizar a produtividade e minimizar o tempo perdido com bugs.",
    tools: [
      "Machine Learning", "Deep Learning", "Neural Networks", "AI Optimization", "Predictive Analytics", "Anomaly Detection",
      "TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Hugging Face", "LangChain",
      "Natural Language Processing", "NLP", "ChatGPT API", "OpenAI", "Claude API", "LLM Integration",
      "Routing", "Context API", "Middleware", "Event-Driven Architecture", "Microservices",
      "Real-time Processing", "Stream Processing", "Data Streams", "WebSockets",
      "Performance Optimization", "Code Analysis", "Bug Detection", "Pattern Recognition", "Automated Testing",
      "Recommendation Systems", "Collaborative Filtering", "Content-Based Filtering",
      "Computer Vision", "Image Recognition", "Speech Recognition", "Sentiment Analysis", "Time Series Analysis", "Reinforcement Learning",
    ],

    shape: "belt",
    color: "#a9fc03",
    variant: "wireframe",
    size: 0,
    orbitSize: 0,
    speed: 0,
    hasAI: true,

    stats: [
      { 
        label: "Implementação de modelos de Machine Learning", 
        value: 70,
        alternatives: ["Deep Learning", "Neural Networks"]
      },
      { 
        label: "Frameworks de IA e treinamento de modelos", 
        value: 65,
        alternatives: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras"]
      },
      { 
        label: "Processamento de linguagem natural", 
        value: 70,
        alternatives: ["NLP"]
      },
      { 
        label: "Integração com modelos de linguagem (LLMs)", 
        value: 80,
        alternatives: ["ChatGPT API", "OpenAI", "Claude API", "Hugging Face", "LangChain"]
      },
      { 
        label: "Otimização de processos com IA", 
        value: 95,
        alternatives: ["Performance Optimization", "Code Analysis"]
      },
      { 
        label: "Análise preditiva e detecção de anomalias", 
        value: 90,
        alternatives: ["Anomaly Detection", "Pattern Recognition"]
      },
      { 
        label: "Processamento de dados em tempo real", 
        value: 74,
        alternatives: ["Stream Processing", "Data Streams", "WebSockets"]
      },
      { 
        label: "Detecção automatizada de bugs e falhas", 
        value: 90,
        alternatives: ["Automated Testing"]
      },
      { 
        label: "Sistemas de recomendação", 
        value: 65,
        alternatives: ["Collaborative Filtering", "Content-Based Filtering"]
      },
      { 
        label: "Visão computacional e reconhecimento", 
        value: 65,
        alternatives: ["Image Recognition", "Speech Recognition"]
      },
      { 
        label: "Análise de sentimento e séries temporais", 
        value: 78,
        alternatives: ["Time Series Analysis"]
      },
      { 
        label: "Aprendizado por reforço", 
        value: 85,
        alternatives: ["Reinforcement Learning"]
      },
      { 
        label: "Arquitetura de sistemas distribuídos", 
        value: 65,
        alternatives: ["Routing", "Context API", "Middleware", "Event-Driven Architecture", "Microservices"]
      },
    ],
  },
];