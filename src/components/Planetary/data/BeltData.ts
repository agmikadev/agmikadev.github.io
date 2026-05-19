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
    | "prompt-engineering";
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
}

export interface BeltDataModel {
  name: string;
  description: string;
  color: string;
  tools: BeltTool[];
  missionReports: BeltMissionReport[];
}

// ---------------------------------------------------------------------------
// Static Data
// ---------------------------------------------------------------------------

export const beltDataModel: BeltDataModel = {
  name: "LLMB",
  description:
    "Large Language Model Belt — uma rede neural autodidata que acumula uma quantidade imensurável de dados. É capaz de otimizar processos, sugerir melhorias e até mesmo antecipar falhas antes que ocorram. Sua principal função é se utilizar do seu volume robusto de informações em tempo real para sugerir os melhores cursos de ação para o astronauta, ajudando a maximizar a produtividade e minimizar o tempo perdido com bugs.",
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
        "ChatGPT API",
        "OpenAI",
        "Claude API",
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
        "Cursor",
        "Automated Testing",
      ],
    },
  ],

  missionReports: [
    {
      id: "report-portfolio-ai",
      title: "Portfolio 3D — Otimização com IA",
      year: "2026",
      role: "AI-Driven Developer",
      summary:
        "Portfolio 3D interativo com tema espacial, otimizado com assistência de IA para atingir 60fps em hardware intermediário como SPA estática.",
      highlights: [
        "Geometrias Three.js otimizadas com sugestões de IA para redução de draw calls e instanciamento de partículas",
        "Sistema de cinturão de asteroides com centenas de instâncias via InstancedMesh",
        "DPR capped em 2 com monitoramento de performance em tempo real",
        "Deploy como SPA estática no GitHub Pages via Rolldown-Vite",
        "Prompt engineering aplicado para refinar shaders GLSL e reduzir complexidade de renderização",
      ],
      challenges:
        "Alcançar 60fps estável em hardware intermediário com múltiplos planetas, cinturão de asteroides e HUDs complexos — tudo rodando como SPA estática sem servidor.",
      impact:
        "Portfolio deployado no GitHub Pages com performance estável a 60fps, bundle otimizado via Rolldown-Vite e sistema de partículas instanciadas sem gargalos de renderização.",
      aiWorkflow:
        "IA utilizada para identificação de gargalos de renderização, sugestão de instanciamento para o cinturão, otimização de memória e refinamento de shaders GLSL via prompt engineering iterativo.",
      technologies: [
        "React Three Fiber",
        "Three.js",
        "Rolldown-Vite",
        "Prompt Engineering",
        "GitHub Copilot",
        "Cursor",
      ],
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
