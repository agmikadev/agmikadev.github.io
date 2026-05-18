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
  date: string;
  problem: string;
  approach: string;
  outcome: string;
  toolsUsed: string[]; // IDs referencing BeltTool.id
  metrics: { label: string; value: string }[];
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
  name: "S.O.N.D.A. NETWORK",
  description:
    "Uma rede neural autodidata que acumula uma quantidade imensurável de dados. É capaz de otimizar processos, sugerir melhorias e até mesmo antecipar falhas antes que ocorram. Sua principal função é se utilizar do seu volume robusto de informações em tempo real para sugerir os melhores cursos de ação para o astronauta, ajudando a maximizar a produtividade e minimizar o tempo perdido com bugs.",
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
      date: "2026",
      problem:
        "Desenvolver um portfolio 3D interativo com tema espacial que rodasse a 60fps em hardware intermediário, integrando múltiplos planetas, cinturão de asteroides e HUDs complexos — tudo como SPA estática para GitHub Pages.",
      approach:
        "Utilização de IA para otimização de geometrias Three.js, análise de performance de renders com React Three Fiber, e sugestão de estratégias de instanciamento para o cinturão de asteroides. Prompt engineering foi aplicado para refinar shaders e reduzir draw calls.",
      outcome:
        "Portfolio deployado no GitHub Pages com performance estável a 60fps, DPR capped em 2, e sistema de cinturão com centenas de partículas instanciadas. A IA auxiliou na identificação de gargalos de renderização e sugeriu otimizações de memória.",
      toolsUsed: [
        "code-ai-optimization",
        "prompt-engineering",
        "agentic-orchestration",
      ],
      metrics: [
        { label: "FPS Target", value: "60fps" },
        { label: "DPR Cap", value: "2x" },
        { label: "Deployment", value: "GitHub Pages (SPA)" },
        { label: "Bundle Size", value: "Otimizado via Rolldown-Vite" },
      ],
    },
    {
      id: "report-maxvidro-algorithm",
      title: "MaxVidro — Otimização Algorítmica de Corte",
      date: "2024",
      problem:
        "Criar um sistema para a indústria vidreira que otimizasse o corte de chapas de vidro, minimizando desperdício de material e maximizando a eficiência do processo de corte com geração automatizada de arquivos técnicos.",
      approach:
        "Implementação de algoritmos de otimização combinatória (bin packing / cutting stock problem) com IA assistindo na seleção de heurísticas e validação de resultados. Análise preditiva foi usada para estimar desperdício antes do corte real.",
      outcome:
        "Sistema funcional que gera arquivos técnicos detalhados com medidas e tipos de vidro, reduzindo significativamente o desperdício de material. Algoritmos de otimização entregaram layouts de corte eficientes para diferentes configurações de chapas.",
      toolsUsed: [
        "predictive-analytics",
        "code-ai-optimization",
        "ml-models",
      ],
      metrics: [
        { label: "Problema", value: "Cutting Stock / Bin Packing" },
        { label: "Output", value: "Arquivos técnicos automatizados" },
        { label: "Resultado", value: "Minimização de desperdício" },
      ],
    },
    {
      id: "report-portal-egressos",
      title: "Portal Egressos — Performance & Arquitetura",
      date: "2024",
      problem:
        "Construir um portal profissional multi-página com showcase de projetos e artigos técnicos, mantendo boa performance e organização de código com stack full-stack (Vue.js + Node.js + PostgreSQL).",
      approach:
        "IA foi utilizada para análise de arquitetura, sugerindo separação clara entre estrutura, estilização e comportamento. Otimização de queries PostgreSQL e análise de padrões de acesso para melhorar tempos de resposta. Detecção automatizada de bugs identificou inconsistências de responsive design antes do deploy.",
      outcome:
        "Portal deployado com múltiplas páginas dedicadas (Fredson, Pierre, Natália, Tereza), navegação intuitiva e design responsivo. Código organizado com boas práticas de separação de responsabilidades. Performance otimizada com caching e queries eficientes.",
      toolsUsed: [
        "code-ai-optimization",
        "predictive-analytics",
        "ai-evaluation",
      ],
      metrics: [
        { label: "Stack", value: "Vue.js + Node.js + PostgreSQL" },
        { label: "Páginas", value: "Multi-página dedicada" },
        { label: "Deploy", value: "Vercel" },
        { label: "Acessibilidade", value: "Design responsivo" },
      ],
    },
  ],
};
