// Interface para padronização das estatísticas
export interface TelemetryStat {
  label: string;
  value: number;
}

export interface PlanetModel {
  id: string;
  name: string;
  type: string;
  description: string;
  tools: string[];
  shape: "sphere" | "hexagon";
  color: string;
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
    description: "O setor de design primário. Gera protótipos de alta fidelidade, geometrias vetoriais e experiências visuais focadas no usuário antes da compilação do código.",
    tools: ["Figma", "Pixso", "Adobe Illustrator", "Vector Graphics"],
    
    // RENDER PHYSICS: 1º Planeta (Mais rápido, mais próximo)
    shape: "sphere",
    color: "#a855f7", // Roxo Vibrante UI
    size: 22,
    orbitSize: 160, 
    speed: 10,

    // STATS: Habilidades de Design (Ação + com + Ferramenta)
    stats: [
      { label: "Prototipagem de alta fidelidade com Figma", value: 95 },
      { label: "Colaboração de design de interface com Pixso", value: 85 },
      { label: "Ilustração e edição vetorial com Illustrator", value: 70 },
      { label: "Estruturação de Design Systems com Variáveis", value: 90 }
    ],
  },

  // --- 2. THE FRONTEND ENGINE ---
  {
    id: "interactron",
    name: "INTERACTRON",
    type: "Esfera de Interface",
    description: "O motor de renderização da superfície. Responsável pela interação humano-máquina, gerenciamento de estado global e renderização de telemetria visual.",
    tools: ["React / Vue", "TypeScript", "Tailwind CSS", "Framer Motion"],
    
    // RENDER PHYSICS: 2º Planeta
    shape: "sphere",
    color: "#61dafb", // Ciano React
    size: 24,
    orbitSize: 260,
    speed: 16,

    // STATS: Habilidades de Frontend
    stats: [
      { label: "Implementação de interfaces responsivas com React / Vue", value: 90 },
      { label: "Estilização de layouts responsivos com Tailwind CSS", value: 85 },
      { label: "Animação fluida de componentes com CSS Nativo / Framer Motion", value: 80 },
      { label: "Tipagem estática avançada com TypeScript", value: 80 }
    ],
  },

  // --- 3. THE BACKEND HUB ---
  {
    id: "nodeon",
    name: "NODEON",
    type: "Nexus de Dados",
    description: "O hub central de backend. Não é um planeta, mas sim uma construção artificial estratégicamente posicionada. Lida com roteamento assíncrono, mutações de banco de dados, transmissão segura de dados e lógica do lado do servidor.",
    tools: ["Node.js", "Express", "PostgreSQL", "Prisma"],

    // RENDER PHYSICS: 3º Planeta
    shape: "hexagon",
    color: "#339933", // Verde Node.js
    size: 18,
    orbitSize: 360, 
    speed: 22,

    // STATS: Habilidades de Backend
    stats: [
      { label: "Processamento de eventos assíncronos com Node.js", value: 92 },
      { label: "Criação de rotas de API RESTful com Express", value: 88 },
      { label: "Modelagem de dados relacionais com PostgreSQL", value: 80 },
      { label: "Mapeamento objeto-relacional (ORM) com Prisma", value: 85 }
    ],
  },

  // --- 4. THE LOGIC PROCESSOR ---
  {
    id: "logus-prime",
    name: "LOGUS-PRIME",
    type: "Prisma de Algoritmos",
    description: "O processador lógico. Executa algoritmos computacionais complexos, pipelines de transformação de dados e otimização da arquitetura do sistema.",
    tools: ["TypeScript", "Python", "GraphQL", "Otimização com IA"],

    // RENDER PHYSICS: 4º Planeta
    shape: "sphere", // Pode alterar para "prism" se a sua interface suportar
    color: "#ff4500", // Laranja de Alta Energia
    size: 32,
    orbitSize: 460,
    speed: 28,

    // STATS: Ciência da Computação e Arquitetura
    stats: [
      { label: "Resolução de algoritmos complexos com Python", value: 55 },
      { label: "Estruturação de modelos complexos com TypeScript", value: 80 },
      { label: "Consulta de dados otimizada com GraphQL", value: 40 },
      { label: "Otimização de algoritmos complexos com IA", value: 80 }
    ],
  },

  // --- 5. THE DEPLOYMENT PLATFORM ---
  {
    id: "infra-x",
    name: "INFRA-X",
    type: "Setor de Implantação",
    description: "A plataforma de implantação orbital. Gerencia integração contínua, ambientes em contêineres e automação segura de infraestrutura em nuvem.",
    tools: ["Docker", "Git", "AWS", "CI/CD"],

    // RENDER PHYSICS: 5º Planeta
    shape: "sphere", // Pode alterar para "triangle" se a sua interface suportar
    color: "#2496ed", // Azul Docker
    size: 22,
    orbitSize: 560,
    speed: 34,

    // STATS: DevOps e Ferramentas
    stats: [
      { label: "Controle de versão de código com Git", value: 85 },
      { label: "Isolamento de ambientes com Docker", value: 15 },
      { label: "Automação de pipelines com CI/CD", value: 10 },
      { label: "Hospedagem de infraestrutura em nuvem com AWS", value: 20 }
    ],
  }
];