# Portfolio API — Cloudflare Worker + D1

API pública e somente leitura para os projetos do portfólio, mais um contador
anônimo de visitas. O frontend mantém o arquivo estático como fallback, então o
site continua funcionando se o Worker estiver indisponível.

## Free tier

- **D1:** 5 GB de armazenamento, 5 milhões de leituras/dia e 100 mil escritas/dia.
- **Workers:** 100 mil requisições/dia.
- O contador grava uma linha por sessão de navegador, sem cookies.

## Banco

```bash
cd worker
npm install

# local
npm run db:migrate:local
npm run db:seed:local
npm run dev

# remoto
npm run db:migrate:remote
npm run db:seed:remote
npm run deploy
```

O `seed.sql` é gerado a partir da fonte TypeScript:

```bash
# na raiz do projeto
npm run d1:seed:generate
```

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/v1/missions` | Todos os projetos (planetas) |
| GET | `/v1/missions?planet=front-end` | Filtra por área/planeta |
| GET | `/v1/missions?belt=1` | Relatórios do cinturão de IA |
| GET | `/v1/missions/:id` | Um projeto |
| POST | `/v1/visits` | Registra uma sessão anônima |
| GET | `/v1/stats` | Total de visitas e projetos |

O `POST /v1/visits` aceita:

```json
{ "path": "/", "referrer": "https://example.com" }
```

## CORS

`ALLOWED_ORIGINS` em `wrangler.toml` é uma lista separada por vírgulas. Por
padrão: GitHub Pages (`agmikadev.github.io`) e Vite local.

## Atualizar conteúdo

1. Edite `src/components/Planetary/data/MissionData.ts` e/ou `BeltData.ts`.
2. Rode `npm run d1:seed:generate` na raiz.
3. Rode `npm run db:seed:remote` em `worker/`.
4. O GET tem cache de 60 s no navegador e 300 s na borda; mudanças aparecem em
   até ~5 minutos. Para ver na hora, use `?v=...` ou limpe o cache.

## Segurança

- Não há escrita pública de conteúdo: o D1 só é alterado por `seed.sql`.
- O contador aceita somente `path`, `referrer` e `user-agent` truncados.
- CORS é restrito às origens configuradas.
- Segredos não ficam no repositório.
