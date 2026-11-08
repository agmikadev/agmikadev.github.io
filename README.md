# Star System Portfolio

Portfolio 3D de **Mikael Angelo**, desenvolvedor full stack. O sistema solar é
um índice visual: cada planeta representa uma área real (Design, Front-end,
Back-end, Dados & Algoritmos, Infra & Deploy) e o cinturão representa a camada
de **IA & Agentic**. Os projetos são o conteúdo principal — a metáfora espacial
é a forma de navegar, não a história.

## Dois fluxos de navegação

- **ÓRBITA (padrão, fluxo compassado):** explorar o sistema, abrir planetas,
  ler os cases e navegar pelo cinturão de IA no tempo do visitante.
- **SALTO (fluxo expresso):** um único botão **SALTO** dentro da tela ÓRBITA
  troca o conteúdo do console para um índice denso de projetos com busca, filtro
  por área e **filtro por tecnologia com contagem**. É o caminho para
  recrutadores que só querem saber "o que você fez com React/D1/Supabase" — sem
  passar pelos planetas.
- Tags de tecnologia são canônicas e clicáveis: clicar em `React` em um card
  abre o Salto já filtrado por React.

### Perspectivas por planeta

Projetos multiárea têm uma leitura própria em cada planeta. O mesmo SmartKitchen
aparece como **Product Designer** em DESIGN, **Frontend Engineer** em FRONT-END,
**Backend Engineer** em BACK-END e **Deploy & Infra** em INFRA. Papel, resumo,
destaques, desafio/impacto e stack mudam conforme a área selecionada.

As perspectivas ficam em `src/components/Planetary/data/perspectives.ts` e são
enviadas ao D1 na coluna `perspectives` (JSON por planeta). No Salto, quando um
filtro de área está ativo, as linhas usam a perspectiva daquela área.

- **Live:** https://agmikadev.github.io/
- **Repositório:** https://github.com/agmikadev/agmikadev.github.io
- **API (Cloudflare Worker):** https://star-system-portfolio-api.agmikadesign.workers.dev

## Stack

- React 19 + TypeScript + Rolldown-Vite
- Three.js + React Three Fiber + drei
- Tailwind CSS 4 + CSS tokens
- Cloudflare Worker + D1 (conteúdo e contador anônimo de visitas)
- GitHub Pages (SPA estática)

## Estrutura

```
src/
├── components/
│   ├── ConsoleShell.tsx        # Shell: header, stage, sidebar, footer
│   ├── ConsoleHeader/          # Apenas a linha CLI do console
│   ├── Salto/                  # Tela SALTO, linhas e navegação de tecnologia
│   ├── Planetary/
│   │   ├── data/               # Projetos, perspectivas, tecnologias, belt
│   │   ├── PlanetarySystem/    # Tela ÓRBITA + HUD de planeta
│   │   └── UI/                 # Tabs, ProjectCard, símbolos
│   ├── SideStrip/              # Sidebar do console: perfil, stack, CV
│   ├── Onboarding/             # Cartão de primeira visita
│   └── styles/                 # ConsoleShell.css, Console.css
├── lib/
│   └── portfolio-api.ts        # Cliente do Worker com fallback estático
├── styles/
│   ├── tokens.css              # Primitivos, semânticos e layout/componente
│   └── globals.css             # Base + ponte @theme do Tailwind
└── worker/                     # Cloudflare Worker + migrações D1
```

### Tokens

`src/styles/tokens.css` é a fonte de verdade. `globals.css` contém o
`@theme inline` que conecta os tokens ao Tailwind/shadcn. As dimensões de
layout usam `clamp()`/container queries: sidebar, sol, tech index do SALTO,
mídia dos cards e colunas das linhas. Breakpoints documentados:

```text
mobile:      48rem / 768px
console:     60rem / 960px
salto-tech: 56.25rem / 900px
salto-row:  68.75rem / 1100px
```

### Hierarquia de classes

O console usa BEM: `console__*` para o shell, `orbit__*` para a tela
planetária, `planet-hud__*` para o dashboard do planeta, `salto__*` para o
índice, `project-card__*` para os cards de projeto e `screen-action__*` para os
controles dentro da tela. O estado fica em `data-screen="orbit|salto"`,
`data-variant="planet|belt"`, `data-perspective="..."` e `aria-pressed` nos
filtros.

O SALTO não é um modal: ele é renderizado dentro de `.console__screen`, no
mesmo frame do sistema planetário. O header do console contém **apenas a linha
CLI**; os controles de tela (`SALTO`, `← ÓRBITA`, `← SISTEMA`) ficam dentro do
painel, no bloco compartilhado `screen-action`. A sidebar/footer permanecem
visíveis.

## Rodando

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Qualidade

Guardrails locais e no CI:

```bash
npm run lint            # ESLint (TS/React)
npm run lint:css        # Stylelint
npm run check:tokens    # impede dimensões cruas fora de tokens.css
npm run test:visual     # Playwright: layout + regressão visual do SALTO
```

Os testes de layout rodam em 1440, 1280, 1024 e 768 e validam overflow,
sidebar/sol, colunas do SALTO e o HUD do planeta. A regressão visual compara
apenas a tela SALTO (1440 e 768), mascarando o data cycler e o contador de
visitas. Localmente o Playwright usa o Microsoft Edge instalado
(`channel: msedge`); os baselines são `win32` e ficam em
`tests/visual/salto.spec.ts-snapshots/`.

Para atualizar os baselines depois de uma mudança visual intencional:

```bash
npm run test:visual:update
```

O CI (`.github/workflows/deploy.yml`) roda `lint`, `lint:css`, `check:tokens`
e os testes de layout com Chromium antes do build. A comparação de pixels fica
local porque os snapshots dependem do sistema operacional.

## Conteúdo

Os dados estáticos ficam em:

- `src/components/Planetary/data/MissionData.ts` — projetos por área
- `src/components/Planetary/data/BeltData.ts` — ferramentas e relatórios de IA
- `src/components/Planetary/data/PlanetaryData.ts` — áreas, stack e proficiência
- `src/components/Planetary/data/technologies.ts` — taxonomia canônica de tecnologias, aliases e categorias
- `src/components/Planetary/data/perspectives.ts` — leitura por planeta de cada projeto multiárea

O frontend busca o conteúdo no D1 e usa esses arquivos como fallback. Para
atualizar o banco:

```bash
npm run d1:seed:generate
cd worker
npm run db:seed:remote
```

## Cloudflare D1

O Worker e as migrações estão em `worker/`. Consulte
[`worker/README.md`](./worker/README.md) para endpoints, free tier e comandos.

Resumo:

```bash
cd worker
npm install
npm run db:migrate:remote
npm run db:seed:remote
npm run deploy
```

O contador de visitas é anônimo, sem cookies, e aparece no rodapé do side strip.
O `POST /v1/visits` grava uma linha por sessão; o `GET /v1/stats` retorna o total.

## Deploy

O deploy do frontend é feito pelo GitHub Actions em push para `main`
(`.github/workflows/deploy.yml`), somente depois dos guardrails de lint,
tokens e layout. O build usa o Worker padrão definido em
`src/lib/portfolio-api.ts`; para apontar para outro Worker, defina a variável
`VITE_PORTFOLIO_API_URL` (local) ou a repository variable `PORTFOLIO_API_URL`
(GitHub Actions).

## Links dos projetos

- [SmartKitchen](https://smartkitchen-ui.vercel.app)
- [Hellz](https://hellzguild.vercel.app)
- [FootScout](https://footscout.vercel.app)
- [UIMaga](https://ui-maga.vercel.app)
