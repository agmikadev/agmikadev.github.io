# Phase 6 — Projects-First Content Refresh & D1

**Goal:** Atualizar o portfólio com os projetos full-stack recentes e reposicionar
a metáfora espacial como camada de navegação, não como lore que esconde o
conteúdo. Adicionar uma camada de dados em Cloudflare D1 com fallback estático.

**Depends on:** Phase 3 (conteúdo e belt existentes)
**Executed:** 2026-11-08
**Requirements:** CONTENT-04, UX-05, UX-06, DATA-01, DATA-02, DATA-03

## Success Criteria

1. SmartKitchen, HellzDashboard, FootScout e UIMaga aparecem como cards com
   imagem, stack, links validados e case study expansível.
2. Projetos são acessíveis em um clique pelo Mission Log (header, side strip e
   onboarding), com busca e filtros por área.
3. Cada planeta exibe a área real como label primário (Design, Front-end,
   Back-end, Dados & Algoritmos, Infra & Deploy) e o codinome como secundário.
4. Cloudflare Worker + D1 serve 11 projetos e 5 relatórios de IA; o contador
   anônimo de visitas aparece no side strip.
5. O site continua funcional com o fallback estático se o Worker falhar.
6. `npm run lint` e `npm run build` passam.

## Tasks

- [x] Refatorar o modelo de dados: `area` nos planetas, `imageUrl`/`featured`
      nos projetos, descrições diretas.
- [x] Adicionar os 4 projetos full-stack recentes com links validados.
- [x] Reescrever o `MissionCard` para cards escaneáveis com imagem e detalhes
      expansíveis.
- [x] Criar `MissionLog` com busca, filtros por área e grid de projetos.
- [x] Adicionar entrada de projetos no CLI header, side strip e onboarding.
- [x] Criar barra "EM DESTAQUE" no first paint com projetos recentes.
- [x] Substituir labels de planeta somente-hover por labels de área sempre
      visíveis e legenda do sistema.
- [x] Criar Worker `star-system-portfolio-api` com D1, CORS, health, missions,
      visits e stats.
- [x] Criar migrations, seed gerado a partir do TypeScript e README do Worker.
- [x] Integrar o frontend com fetch D1 + fallback estático e contador de visitas.
- [x] Capturar screenshots reais dos deploys e otimizar para WebP.
- [x] Verificar build, lint, API local/remota, CORS, Mission Log, dashboard de
      planeta e HUD do belt.

## Verification

- `npm run lint` — limpo.
- `npm run build` — sucesso (aviso de bundle >500 kB permanece para Phase 5).
- Worker local: migrations + seed + `wrangler dev`; endpoints testados.
- Worker remoto: migrations + seed + deploy; `/v1/missions` retorna 11 projetos.
- Preview de produção (`vite preview`): 11 cards, imagens carregadas, sem erros
  de console após liberar CORS para `127.0.0.1:4173`.

## Notes

- O D1 é usado apenas para leitura pública de conteúdo e contador anônimo. Não
  há escrita pública de projetos.
- O bundle principal segue em ~1.24 MB (350 kB gzip); code-splitting do Three.js
  continua como trabalho da Phase 5.
