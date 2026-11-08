// BeltData.ts — S.O.N.D.A. NETWORK: AI/Agentic tools, proficiency metrics, and mission reports
// Separate from planet data; consumed by Phase 3 (BeltHUD)

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BeltTool {
  id: string;
  name: string;
  category:
    | "llm"
    | "agent-framework"
    | "orchestration"
    | "evaluation"
    | "rag"
    | "mcp"
    | "prompt-engineering"
    | "vision";
  proficiency: number; // 0-100 percentage
  description: string;
  relatedTechnologies: string[]; // alternative/similar tools
}

export interface BeltMissionReport {
  id: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  highlights: string[];
  challenges: string;
  impact: string;
  aiWorkflow?: string;
  technologies: string[];
  external_links?: { label: string; url: string }[];
  imageUrl?: string;
  featured?: boolean;
}

export interface BeltDataModel {
  name: string;
  codename: string;
  area: string;
  description: string;
  color: string;
  tools: BeltTool[];
  missionReports: BeltMissionReport[];
}

// ---------------------------------------------------------------------------
// Static Data
// ---------------------------------------------------------------------------

export const beltDataModel: BeltDataModel = {
  name: "IA & AGENTIC",
  codename: "LLMB",
  area: "IA & AGENTIC",
  description:
    "IA aplicada ao ciclo de desenvolvimento: LLMs, agentes, RAG, MCP, OCR e design-to-code. Uma camada que acelera e conecta design, front-end, back-end, dados e infra.",
  color: "#a9fc03",

  tools: [
    {
      id: "llm-integration",
      name: "LLM Integration",
      category: "llm",
      proficiency: 80,
      description:
        "Integração com modelos de linguagem de grande porte (LLMs) via APIs como OpenAI, Anthropic Claude e Hugging Face. Capacidade de construir interfaces de chat, geração de texto e análise semântica.",
      relatedTechnologies: [
        "OpenAI",
        "Claude API",
        "NVIDIA NIM",
        "Hugging Face",
        "LangChain",
      ],
    },
    {
      id: "ml-models",
      name: "Machine Learning Models",
      category: "llm",
      proficiency: 70,
      description:
        "Implementação e treinamento de modelos de Machine Learning e Deep Learning para classificação, predição e reconhecimento de padrões.",
      relatedTechnologies: [
        "Deep Learning",
        "Neural Networks",
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "Keras",
      ],
    },
    {
      id: "agentic-orchestration",
      name: "Agentic Orchestration",
      category: "orchestration",
      proficiency: 85,
      description:
        "Orquestração de agentes autônomos multi-step para automação de fluxos de trabalho, decomposição de tarefas e coordenação entre ferramentas externas.",
      relatedTechnologies: [
        "LangGraph",
        "CrewAI",
        "AutoGen",
        "Semantic Kernel",
        "NVIDIA NIM",
        "Event-Driven Architecture",
      ],
    },
    {
      id: "rag-systems",
      name: "RAG Systems",
      category: "rag",
      proficiency: 75,
      description:
        "Retrieval-Augmented Generation para conectar LLMs a bases de conhecimento privadas, combinando busca vetorial com geração contextualizada.",
      relatedTechnologies: [
        "Pinecone",
        "ChromaDB",
        "Weaviate",
        "FAISS",
        "LangChain",
        "LlamaIndex",
      ],
    },
    {
      id: "prompt-engineering",
      name: "Prompt Engineering",
      category: "prompt-engineering",
      proficiency: 90,
      description:
        "Design sistemático de prompts com técnicas como chain-of-thought, few-shot learning, role prompting e structured output para maximizar a qualidade das respostas de LLMs.",
      relatedTechnologies: [
        "Chain-of-Thought",
        "Few-Shot Prompting",
        "ReAct",
        "DSPy",
        "LangChain Prompt Templates",
      ],
    },
    {
      id: "mcp-protocol",
      name: "MCP Protocol",
      category: "mcp",
      proficiency: 70,
      description:
        "Model Context Protocol — padrão aberto para conectar modelos de IA a fontes de dados e ferramentas externas de forma segura e padronizada.",
      relatedTechnologies: [
        "Anthropic MCP SDK",
        "Tool Calling",
        "Function Calling",
        "OpenAPI Integration",
      ],
    },
    {
      id: "ai-evaluation",
      name: "AI Evaluation & Testing",
      category: "evaluation",
      proficiency: 65,
      description:
        "Avaliação sistemática de modelos de IA com métricas de qualidade, testes de alucinação, benchmarking de respostas e monitoramento de drift.",
      relatedTechnologies: [
        "Ragas",
        "DeepEval",
        "LangSmith",
        "Promptfoo",
        "Arize Phoenix",
      ],
    },
    {
      id: "predictive-analytics",
      name: "Predictive Analytics & Anomaly Detection",
      category: "orchestration",
      proficiency: 90,
      description:
        "Análise preditiva e detecção de anomalias em tempo real para antecipar falhas, identificar padrões e sugerir cursos de ação proativos.",
      relatedTechnologies: [
        "Anomaly Detection",
        "Pattern Recognition",
        "Time Series Analysis",
        "Statistical Modeling",
      ],
    },
    {
      id: "design-to-code",
      name: "Design-to-Code",
      category: "orchestration",
      proficiency: 88,
      description:
        "Pipeline de leitura de Figma via MCP/REST, extração de tokens e implementação assistida, com auditoria de fidelidade entre design e código.",
      relatedTechnologies: [
        "Figma MCP",
        "Figma REST API",
        "Design Tokens",
        "Code Connect",
        "Vision Models",
      ],
    },
    {
      id: "vision-ocr",
      name: "OCR & Vision Pipelines",
      category: "vision",
      proficiency: 80,
      description:
        "Extração estruturada de dados a partir de imagens: pré-processamento, OCR, whitelist de caracteres e validação humana antes de persistir.",
      relatedTechnologies: [
        "Tesseract.js",
        "Image Preprocessing",
        "Digit Whitelisting",
        "Human-in-the-loop",
        "Regression Harness",
      ],
    },
    {
      id: "nlp-processing",
      name: "Natural Language Processing",
      category: "llm",
      proficiency: 70,
      description:
        "Processamento de linguagem natural para análise de sentimento, extração de entidades, sumarização de texto e classificação de documentos.",
      relatedTechnologies: [
        "NLP",
        "spaCy",
        "NLTK",
        "Transformers",
        "Sentiment Analysis",
      ],
    },
    {
      id: "code-ai-optimization",
      name: "AI Code Optimization & Bug Detection",
      category: "evaluation",
      proficiency: 95,
      description:
        "Uso de IA para otimização de código, detecção automatizada de bugs, análise de complexidade ciclomática e sugestão de refatorações.",
      relatedTechnologies: [
        "Code Analysis",
        "SonarQube",
        "GitHub Copilot",
        "OpenCode",
        "Cursor",
        "Automated Testing",
      ],
    },
  ],

  missionReports: [
    {
      id: "report-smartkitchen-design-to-code",
      title: "SmartKitchen — Design-to-Code com D1",
      year: "2026",
      role: "AI-Assisted Full Stack Developer",
      summary:
        "Sistema full-stack construído a partir de um design system atômico no Figma, com IA na leitura do design e uma API própria em Cloudflare Worker + D1.",
      highlights: [
        "Leitura do Figma via MCP/REST e extração de tokens para o código",
        "Auditoria de fidelidade com renders comparativos tela a tela",
        "Worker + D1 com contratos Zod compartilhados entre web e API",
        "Fluxo de aprovação em 24h com cron de reversão automática",
      ],
      challenges:
        "Traduzir um arquivo de design extenso em 9 áreas funcionais sem inventar layout, e ainda operar auth, permissões e banco serverless.",
      impact:
        "App em produção com dados reais no D1; o design system virou contrato entre Figma, frontend e API.",
      aiWorkflow:
        "IA usada para leitura do Figma, extração de tokens, auditoria de consistência e implementação assistida; a validação final foi feita com renders e testes.",
      technologies: [
        "Figma",
        "Next.js",
        "Cloudflare Workers",
        "Cloudflare D1",
        "Better Auth",
        "Design Tokens",
      ],
      external_links: [
        { label: "Live Demo", url: "https://smartkitchen-ui.vercel.app" },
      ],
      imageUrl: "/projects/smartkitchen.webp",
      featured: true,
    },
    {
      id: "report-hellz-ocr",
      title: "Hellz — OCR Pipeline para GvG",
      year: "2026",
      role: "AI-Assisted Full Stack Developer",
      summary:
        "Pipeline que transforma screenshots de batalha em dados estruturados, com OCR no cliente e validação humana obrigatória antes de gravar no Postgres.",
      highlights: [
        "Tesseract.js com regiões, whitelist de dígitos e pré-processamento",
        "Correção manual obrigatória para evitar dados silenciosamente errados",
        "Harness com amostras reais para medir regressões de OCR",
        "Rankings e OVR calculados no Postgres, com autorização em RLS",
      ],
      challenges:
        "Lidar com screenshots inconsistentes e campos truncados sem deixar o OCR inventar dados ou a UI virar fonte de verdade.",
      impact:
        "Dados confiáveis o suficiente para rankings de guilda e escalação de guerra, com trilha de auditoria.",
      aiWorkflow:
        "OCR + pré-processamento + validação humana; o pipeline foi iterado com amostras reais e testes automatizados de extração.",
      technologies: [
        "Tesseract.js",
        "React",
        "Supabase",
        "PostgreSQL",
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
      id: "report-portfolio-ai",
      title: "Portfolio 3D — Otimização com IA",
      year: "2026",
      role: "AI-Driven Developer",
      summary:
        "Portfolio 3D que usa o sistema solar como índice de projetos, com HUD de missões, métricas e conteúdo servido por Cloudflare D1.",
      highlights: [
        "Geometrias Three.js otimizadas com sugestões de IA para redução de draw calls e instanciamento de partículas",
        "Sistema de cinturão de asteroides com centenas de instâncias via InstancedMesh",
        "Mission Log com projetos filtráveis, imagens e links diretos",
        "Conteúdo em Cloudflare Worker + D1 com fallback estático",
        "Prompt engineering aplicado para refinar shaders GLSL e reduzir complexidade de renderização",
      ],
      challenges:
        "Alcançar 60fps estável em hardware intermediário com múltiplos planetas, cinturão de asteroides e HUDs complexos — tudo rodando como SPA estática sem servidor.",
      impact:
        "Portfolio deployado no GitHub Pages com performance estável a 60fps, bundle otimizado via Rolldown-Vite e conteúdo atualizável sem novo deploy do frontend.",
      aiWorkflow:
        "IA utilizada para identificação de gargalos de renderização, sugestão de instanciamento para o cinturão, otimização de memória e refinamento de shaders GLSL via prompt engineering iterativo.",
      technologies: [
        "Three.js",
        "Vite",
        "Cloudflare D1",
        "Prompt Engineering",
        "OpenCode",
        "Cursor",
      ],
      imageUrl: "/projects/portfolio.webp",
    },
    {
      id: "report-maxvidro-algorithm",
      title: "MaxVidro — Otimização Algorítmica de Corte",
      year: "2024",
      role: "AI Solutions Developer",
      summary:
        "Sistema de otimização de corte de chapas de vidro para a indústria vidreira, minimizando desperdício com algoritmos combinatórios assistidos por IA.",
      highlights: [
        "Implementação de algoritmos de bin packing / cutting stock problem para minimização de desperdício",
        "Análise preditiva para estimar desperdício antes do corte real, reduzindo custos de material",
        "Geração automatizada de arquivos técnicos com medidas e tipos de vidro",
        "IA assistindo na seleção de heurísticas e validação de resultados combinatórios",
        "Interface para diferentes configurações de chapas com layouts de corte otimizados",
      ],
      challenges:
        "Resolver o cutting stock problem para múltiplas configurações de chapas, gerando layouts de corte eficientes que minimizem desperdício e produzam arquivos técnicos precisos para produção.",
      impact:
        "Sistema funcional que gera arquivos técnicos detalhados com medidas e tipos de vidro, reduzindo significativamente o desperdício de material na indústria vidreira.",
      aiWorkflow:
        "Modelos preditivos utilizados para estimar desperdício antes do corte, IA assistindo na seleção de heurísticas de bin packing e validação de resultados combinatórios em tempo real.",
      technologies: [
        "Python",
        "Combinatorial Optimization",
        "Predictive Analytics",
        "Machine Learning",
        "Algorithm Design",
      ],
    },
    {
      id: "report-portal-egressos",
      title: "Portal Egressos — Performance & Arquitetura",
      year: "2024",
      role: "AI-Assisted Full Stack Developer",
      summary:
        "Portal profissional multi-página com showcase de projetos e artigos técnicos, construído com stack full-stack e assistência de IA para arquitetura e qualidade.",
      highlights: [
        "Arquitetura full-stack Vue.js + Node.js + PostgreSQL com separação clara de responsabilidades",
        "Sistema multi-página com páginas dedicadas para cada egresso e artigo",
        "IA para análise de arquitetura e sugestão de separação entre estrutura, estilização e comportamento",
        "Otimização de queries PostgreSQL com análise de padrões de acesso",
        "Detecção automatizada de inconsistências de responsive design antes do deploy",
      ],
      challenges:
        "Organizar um volume grande de conteúdo acadêmico em navegação intuitiva, mantendo performance e separação de responsabilidades entre frontend, backend e banco de dados.",
      impact:
        "Portal funcional servindo como vitrine digital do programa de pós-graduação, com páginas dedicadas a projetos e publicações de cada egresso.",
      aiWorkflow:
        "IA utilizada para análise de arquitetura — sugerindo separação entre estrutura, estilização e comportamento. Otimização de queries PostgreSQL e validação automatizada de inconsistências de responsive design antes do deploy.",
      technologies: [
        "Vue.js",
        "Node.js",
        "Express.js",
        "Sequelize",
        "PostgreSQL",
        "Vite",
        "REST API",
      ],
    },
  ],
};
