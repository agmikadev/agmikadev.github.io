# Star System Portfolio

Portfolio 3D de **Mikael Angelo**, desenvolvedor full stack. O sistema solar é
um índice visual: cada planeta representa uma área real (Design, Front-end,
Back-end, Dados & Algoritmos, Infra & Deploy) e o cinturão representa a camada
de **IA & Agentic**. Os projetos são o conteúdo principal — a metáfora espacial
é a forma de navegar, não a história.

## Dois fluxos de navegação

- **ÓRBITA (padrão, fluxo compassado):** explorar o sistema, abrir planetas,
  ler os cases e navegar pelo cinturão de IA no tempo do visitante.
- **SALTO (fluxo expresso):** um único switch no header abre um índice denso de
  projetos com busca, filtro por área e **filtro por tecnologia com contagem**.
  É o caminho para recrutadores que só querem saber "o que você fez com
  React/D1/Supabase".
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
│   ├── MissionLog/            # Salto: índice, filtros e tech sidebar
│   ├── Planetary/
│   │   ├── data/              # Fonte estática: planetas, projetos, belt
│   │   ├── PlanetarySystem/   # Sistema solar + dashboard
│   │   └── UI/                # Tabs, cards, CLI, símbolos
│   ├── SideStrip/             # Perfil, stack, links e CV
│   └── Onboarding/            # Cartão de primeira visita
├── lib/
│   └── portfolio-api.ts       # Cliente do Worker com fallback estático
└── worker/                    # Cloudflare Worker + migrações D1
```

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
(`.github/workflows/deploy.yml`). O build usa o Worker padrão definido em
`src/lib/portfolio-api.ts`; para apontar para outro Worker, defina a variável
`VITE_PORTFOLIO_API_URL` (local) ou a repository variable `PORTFOLIO_API_URL`
(GitHub Actions).

## Links dos projetos

- [SmartKitchen](https://smartkitchen-ui.vercel.app)
- [Hellz](https://hellzguild.vercel.app)
- [FootScout](https://footscout.vercel.app)
- [UIMaga](https://ui-maga.vercel.app)
