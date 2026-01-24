export interface TelemetryStat {
  label: string;
  value: number;
  description: string;
}

export interface PlanetModel {
  id: string;
  name: string;
  type: string;
  function: string;
  description: string;
  lore: string;
  tools: string;
  critical: string;
  color: string;
  size: number;
  orbitSize: number;
  speed: number;
  stats: TelemetryStat[];
}

export const PLANET_DATA: PlanetModel[] = [
  {
    id: "aesthetica",
    name: "AESTHETICA",
    type: "Planeta de Superfície Dinâmica (UI/UX)",
    function: "Captura de Atenção Estelar",
    description:
      "Visceralmente atrativo, esse planeta é responsável por causar a primeira impressão perfeita na experiência do usuário.",
    lore: "O mundo mais próximo da estrela (Usuário). Um planeta de paisagens fluidas onde as cores e formas mudam para agradar à luz estelar. Se a atmosfera não for convidativa, a viagem do usuário termina aqui.",
    tools: "Figma | Design Tokens",
    critical: "Vitrines visuais, botões de ação (CTAs), tipografia.",
    color: "#ff33a6", // Bright Figma Pink
    size: 24,
    orbitSize: 192,
    speed: 12, // Orbits fastest
    stats: [
      {
        label: "Gravidade Estrutural",
        value: 75,
        description:
          "Visceralmente atrativo, esse planeta é responsável por causar a primeira impressão perfeita na experiência do usuário.",
      },
      { label: "Volatilidade", value: 95, description: "wip"},
      { label: "Terraformação", value: 85, description: "wip" },
      { label: "Periculosidade", value: 30, description: "wip" },
    ],
  },
  {
    id: "interactron",
    name: "INTERACTRON",
    type: "Metrópole Habitável Responsiva (Front-end)",
    function: "Interatividade e Infraestrutura do Usuário",
    description: "",
    lore: "A zona habitável. Interactron é um planeta de alta tecnologia coberto por cidades que mudam de tamanho e forma dependendo de quem as visita. É onde a navegação acontece.",
    tools: "React | Next.js | Tailwind CSS | TypeScript",
    critical: "Renderização de páginas, gerenciamento de estado da interface.",
    color: "#38bdf8", // React/Tailwind Sky Blue
    size: 28,
    orbitSize: 280, // Safe distance from Visoria
    speed: 18,
    stats: [
      { label: "Gravidade Estrutural", value: 80, description: "wip" },
      { label: "Volatilidade", value: 85, description: "wip" },
      { label: "Terraformação", value: 90, description: "wip" },
      { label: "Periculosidade", value: 60, description: "wip" },
    ],
  },
  {
    id: "apeiron",
    name: "APEIRON",
    type: "Cinturão de Transmissão (API / tRPC)",
    function: "Roteamento de Dados e Segurança de Borda",
    description: "",
    lore: "O guardião entre a luz e as sombras. Um cinturão artificial que capta os sinais de clique em Frontalis e os traduz para a linguagem industrial dos planetas distantes.",
    tools: "Node.js | tRPC / Express | Postman",
    critical: "Endpoints de autenticação, integração de pagamentos e rotas.",
    color: "#f59e0b", // Transmission Amber/Orange
    size: 22,
    orbitSize: 380, // Middle orbit belt
    speed: 24,
    stats: [
      { label: "Gravidade Estrutural", value: 85, description: "wip" },
      { label: "Volatilidade", value: 50, description: "wip"},
      { label: "Terraformação", value: 75, description: "wip" },
      { label: "Periculosidade", value: 80, description: "wip" },
    ],
  },
  {
    id: "logica-prime",
    name: "LOGICA-PRIME",
    type: "Planeta Industrial Pesado (Back-end)",
    function: "Processamento de Lógica de Negócios",
    description: "",
    lore: "Onde o trabalho pesado é feito. Envolto em nuvens densas, Logica-Prime abriga as fábricas que calculam estoques e processam o fluxo financeiro. O astronauta veste seu traje de chumbo para operar essas máquinas colossais.",
    tools: "Node.js (Runtime) | Docker | APIs de Lógica",
    critical:
      "Algoritmos de checkout, segurança de transações, regras de negócios.",
    color: "#4ade80", // Node.js Green
    size: 34,
    orbitSize: 480, // Deep orbit
    speed: 35,
    stats: [
      { label: "Gravidade Estrutural", value: 95, description: "wip" },
      { label: "Volatilidade", value: 30, description: "wip" },
      { label: "Terraformação", value: 70, description: "wip" },
      { label: "Periculosidade", value: 90, description: "wip" },
    ],
  },
  {
    id: "kryo",
    name: "KRYO",
    type: "Planeta Gélido de Arquivo (Banco de Dados)",
    function: "Persistência de Dados e Recuperação Histórica",
    description: "",
    lore: "Nos confins escuros do sistema, o gelo eterno de Kryo mantém as temperaturas dos servidores perfeitamente estáveis. A memória definitiva do sistema sob cofres blindados.",
    tools: "PostgreSQL | Prisma ORM | MongoDB",
    critical: "Schema relacional, índices, proteção contra falhas (Backups).",
    color: "#a0e1ff", // Cold Ice White/Blue
    size: 30,
    orbitSize: 580, // Furthest orbit (edge of the screen)
    speed: 55,
    stats: [
      { label: "Gravidade Estrutural", value: 100, description: "wip" },
      { label: "Volatilidade", value: 5, description: "wip" },
      { label: "Terraformação", value: 60, description: "wip" },
      { label: "Periculosidade", value: 98, description: "wip" },
    ],
  },
];
