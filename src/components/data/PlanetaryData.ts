// You can define this interface at the top of your file if you haven't already
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
  shape: "sphere" | "prism" | "hexagon" | "triangle";
  color: string;
  size: number;
  orbitSize: number;
  speed: number;
  stats: TelemetryStat[];
}

// THE SOLAR SYSTEM DATA
export const planets: PlanetModel[] = [
  // --- 1. THE DESIGN HUB ---
  {
    id: "aesthetica",
    name: "AESTHETICA",
    type: "Matriz Visual",
    description: "The primary design sector. Generates high-fidelity prototypes, vector geometries, and user-centric visual experiences before code compilation.",
    tools: ["Figma", "Pixso", "Adobe Illustrator", "Vector Graphics"],
    
    // RENDER PHYSICS: 1st Planet (Fastest, Closest)
    shape: "sphere",
    color: "#a855f7", // Vibrant UI Purple
    size: 22,
    orbitSize: 160, 
    speed: 10,

    // STATS: Design Skills
    stats: [
      { label: "Protipação de alta fidelidade", value: 95 },
      { label: "Edição de Vetores", value: 70 },
      { label: "Design de Experiência do Usuário (UX)", value: 80},
      { label: "Montagem de Design System Atômico", value: 90 }
    ],
  },

  // --- 2. THE FRONTEND ENGINE ---
  {
    id: "interactron",
    name: "INTERACTRON",
    type: "Interface Sphere",
    description: "The surface rendering engine. Responsible for human-machine interaction, global state management, and visual telemetry rendering.",
    tools: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    
    // RENDER PHYSICS: 2nd Planet
    shape: "sphere",
    color: "#61dafb", // React Cyan
    size: 24,
    orbitSize: 260,
    speed: 16,

    // STATS: Frontend Skills
    stats: [
      { label: "React (Hooks & State)", value: 90 },
      { label: "CSS & Responsive UI", value: 95 },
      { label: "DOM Manipulation", value: 85 },
      { label: "Motion & Animation", value: 80 }
    ],
  },

  // --- 3. THE BACKEND HUB ---
  {
    id: "nodeon",
    name: "NODEON",
    type: "Data Nexus",
    description: "The central backend hub. Handles all asynchronous routing, database mutations, secure data transmission, and server-side logic.",
    tools: ["Node.js", "Express", "PostgreSQL", "Prisma"],

    // RENDER PHYSICS: 3rd Planet (The Fake 3D Hexagon)
    shape: "hexagon",
    color: "#339933", // Node.js Green
    size: 24,
    orbitSize: 360, 
    speed: 22,

    // STATS: Backend Skills
    stats: [
      { label: "Node.js (Async/Event Loop)", value: 92 },
      { label: "Express API Routing", value: 88 },
      { label: "PostgreSQL Database", value: 80 },
      { label: "API Security & Auth", value: 85 }
    ],
  },

  // --- 4. THE LOGIC PROCESSOR ---
  {
    id: "logica-prime",
    name: "LOGICA-PRIME",
    type: "Algorithm Prism",
    description: "The logic processor. Executes complex computational algorithms, data transformation pipelines, and system architecture optimization.",
    tools: ["TypeScript", "Python", "GraphQL", "Algorithms"],

    // RENDER PHYSICS: 4th Planet (The 3D Prism)
    shape: "prism",
    color: "#ff4500", // High-energy Orange
    size: 32,
    orbitSize: 460,
    speed: 28,

    // STATS: Computer Science & Architecture
    stats: [
      { label: "Algorithmic Thinking", value: 85 },
      { label: "System Architecture", value: 80 },
      { label: "GraphQL/API Design", value: 88 },
      { label: "Code Refactoring", value: 85 }
    ],
  },

  // --- 5. THE DEPLOYMENT PLATFORM ---
  {
    id: "infra-x",
    name: "INFRA-X",
    type: "Deployment Sector",
    description: "The orbital deployment platform. Manages continuous integration, containerized environments, and secure cloud infrastructure automation.",
    tools: ["Docker", "Git", "AWS", "CI/CD"],

    // RENDER PHYSICS: 5th Planet (The Fake 3D Cone)
    shape: "triangle",
    color: "#2496ed", // Docker Blue
    size: 22,
    orbitSize: 560,
    speed: 34,

    // STATS: DevOps & Tooling
    stats: [
      { label: "Git Branching Workflow", value: 95 },
      { label: "Docker Containerization", value: 75 },
      { label: "CI/CD Pipelines", value: 80 },
      { label: "Cloud Deployment", value: 70 }
    ],
  }
];