export interface MissionType {
  id: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  // Deep dive into HOW the tools were used
  technical_briefing: string;
  // The tags that link the mission to the planets
  technologies: string[];
  // Optional links to live sites or GitHub
  external_links?: { label: string; url: string }[];
}

export const MISSION_ARCHIVE: MissionType[] = [
  {
    id: "portal-egressos-01",
    title: "Portal dos Egressos PPGTE-UFC",
    year: "2024",
    role: "Desenvolvedor Full Stack",
    summary:
      "Website portfólio profissional com showcase de projetos e artigos técnicos.",
    technical_briefing:
      "Site portfólio desenvolvido com HTML semântico e CSS puro, apresentando uma estrutura multi-página para exibição de projetos e artigos. A arquitetura inclui páginas dedicadas para diferentes projetos (Fredson, Pierre) e artigos (Natália, Tereza), implementando navegação intuitiva e design responsivo. O projeto demonstra boas práticas de organização de código com separação clara entre estrutura (HTML), estilização (CSS) e comportamento (JavaScript), além de incluir uma seção de artigos técnicos.",
    technologies: [
      // Frontend
      "HTML",
      "CSS",
      "JavaScript",
      "Vue.js",
      "Vite",
      // Backend
      "Node.js",
      "Express.js",
      "Sequelize",
      "PostgreSQL",
      // Ferramentas
      "Git",
      "REST API",
      // Design
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
    year: "2024",
    role: "Desenvolvedor Frontend",
    summary:
      "Website pessoal para showcase de projetos e apresentação profissional.",
    technical_briefing:
      "Site estático desenvolvido com foco em design responsivo e performance. Implementa boas práticas de SEO e acessibilidade, servindo como vitrine para projetos pessoais e informações profissionais.",
    technologies: [
      // Linguagens base
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      // Framework
      "React.js",
      // Build tool
      "Vite",
      // Versionamento
      "Git",
      // Design
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
      "Plataforma digital para ensino de Grego Antigo utilizando cultura popular cearense.",
    technical_briefing:
      "Projeto educacional inovador que utiliza o português informal regional do Ceará para ensinar Grego Antigo, integrando cordel e ditados populares no processo de aprendizagem. A aplicação web foi desenvolvida com foco em acessibilidade cultural e pedagógica, criando uma ponte entre a cultura clássica grega e a tradição nordestina brasileira. O front-end foi estruturado com HTML semântico, CSS para estilização responsiva e JavaScript para interatividade.",
    technologies: [
      // Linguagens base
      "HTML",
      "CSS",
      "JavaScript",
      // Framework
      "React.js",
      // Build tool
      "Vite",
      // Versionamento
      "Git",
      // Design
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
    role: "UI/UX Designer",
    summary:
      "Design de identidade visual para navegador web fictício com conceito de navegação e orientação.",
    technical_briefing:
      "Criação de ícone vetorial para o navegador fictício 'Polaris Browser' com o conceito 'Find your North'. O design incorpora elementos de navegação (bússola/estrela polar) com uma paleta de cores em degradê de verde a azul, simbolizando orientação e exploração digital. O ícone foi desenvolvido seguindo as diretrizes de design de ícones iOS/macOS, com cantos arredondados e acabamento em estilo skeuomórfico moderno. A estrela polar central e as estrelas ao fundo reforçam o conceito de navegação e descoberta.",
    technologies: [
      // Design tools
      "Figma",
      "Adobe Illustrator",
      // Design concepts
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
    title: "Mangazal - Rede Social Geek",
    year: "2023",
    role: "UI/UX Designer",
    summary:
      "Aplicativo de rede social focado em cultura manga e geek com marketplace integrado.",
    technical_briefing:
      "Desenvolvimento de interface mobile para rede social especializada em mangá e cultura geek. O app integra funcionalidades de fórum de discussão com marketplace para compra e venda de colecionáveis físicos (quadrinhos, action figures). Escolha de design destacada: orientação intencional right-to-left (RTL) em elementos estratégicos da UI, como referência à direção de leitura dos mangás japoneses. A identidade visual utiliza paleta vibrante de laranja e amarelo com tema dark mode, criando uma atmosfera envolvente para entusiastas da cultura geek compartilharem pensamentos em um ambiente especializado.",
    technologies: [
      // Design tools
      "Figma",
      // Design concepts
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
    title: "SunPower - Dashboard de Energia Solar",
    year: "2024",
    role: "UI/UX Designer",
    summary:
      "Dashboard mobile para gerenciamento e monitoramento de energia solar residencial.",
    technical_briefing:
      "Case study de UI para plataforma de gestão de energia solar. O SunPower é um dashboard projetado para ser uma solução intuitiva que apresenta ao usuário, de forma textual e visual, informações sobre onde e como a energia produzida por sua rede solar está sendo utilizada. A interface apresenta estatísticas de produção e consumo em tempo real, gráficos de desempenho, comparativos mensais e dados de economia. O design utiliza uma identidade visual vibrante em amarelo solar com elementos em preto, criando contraste e legibilidade. O sistema coloca o usuário em controle total de sua produção energética através de visualizações claras e actionable insights.",
    technologies: [
      // Design tools
      "Figma",
      // Design concepts
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
    title: "MaxVidro - Sistema de Corte de Vidro",
    year: "2024",
    role: "Desenvolvedor Full Stack",
    summary:
      "Aplicação para otimização de corte de vidro com geração automatizada de arquivos técnicos.",
    technical_briefing:
      "Sistema desenvolvido para auxiliar na indústria vidreira, gerando arquivos com informações detalhadas sobre medidas e tipos de vidro para corte. A aplicação utiliza algoritmos de otimização para minimizar desperdício de material e maximizar a eficiência do processo de corte.",
    technologies: [
      // Frontend básico
      "HTML",
      "CSS",
      "JavaScript",
      // Organização
      "Git",
    ],
    external_links: [
      { label: "GitHub", url: "https://github.com/angelomikaa/MaxVidro" },
    ],
  },
];
