# ADR 0001: Migrar o site para Astro

- **Data**: 2026-11-09
- **Status**: aceito (opções A nas quatro decisões; o dono ainda pode revisar antes do cutover)
- **Contexto de execução**: spike do plano 001, branch `feat/astro`

## Contexto

O site é conteúdo estático: 653 produtos em 24 arquivos JSON, sem banco. Hoje roda em Next.js 16 na Vercel, com 26 dos 32 componentes marcados `"use client"`, ou seja, quase todo o HTML é hidratado no navegador para mostrar dados que só mudam a cada build. O mantenedor decidiu em 2026-11-09 migrar para Astro, como o `eletroradar.com.br` (2.0.0). Em Astro as páginas viram HTML estático e só os componentes interativos (comparação, busca, tema) viram ilhas.

## Decisões

### 1. Hospedagem e modo de saída: Vercel com `@astrojs/vercel` (opção A)

`output: "static"` com o adaptador da Vercel: as páginas públicas são pré-renderizadas e só `/admin`, `/api` e o envio do contato rodam sob demanda (`export const prerender = false`). Preserva o painel em produção como hoje.

- Alternativa B (100% estático no GitHub Pages, como o eletroradar): o painel só rodaria na máquina do dono e o contato exigiria um serviço externo. Descartada.

### 2. Framework das ilhas: React com `@astrojs/react` (opção A)

Reaproveita os componentes existentes e o shadcn/Radix.

- Alternativa B (reescrever em Svelte): bundle menor, custo muito maior. Descartada.

### 3. Caminhos desconhecidos: página 404 real (opção A)

Hoje o `proxy.ts` redireciona qualquer caminho de um segmento desconhecido para `/`. Passa a ser uma `404.astro`, como o eletroradar fez na `v2.0.1`.

- Alternativa B (manter o redirecionamento por regra da hospedagem). Descartada.

### 4. Bloqueio de scrapers e cabeçalhos: `vercel.json` e firewall da Vercel (opção A)

O 403 por user-agent e os cabeçalhos de `next.config.mjs` (`X-Robots-Tag` e `Cache-Control` em `/admin/*` e `/api/*`) passam para `vercel.json` e para o firewall da Vercel.

- Alternativa B (middleware do Astro): só valeria nas rotas sob demanda, e as páginas estáticas ficariam sem o 403. Descartada.
- Consequência: o bloqueio vira configuração da Vercel, fora do código. Precisa ser feito (e conferido) pelo dono no painel da Vercel antes do cutover.

## Resultado do spike

Protótipo: `astro.config.ts`, `astro/layouts/Root.astro` e `astro/pages/[category].astro` (24 categorias via `getStaticPaths`, `HomePageClient` como ilha `client:load`).

Dependências (versões exatas, estáveis em 2026-11-09): `astro` 7.4.8, `@astrojs/react` 7.1.5, `@astrojs/vercel` 11.0.20, `@tailwindcss/vite` 4.3.3 (igual ao `tailwindcss` já instalado).

Medições:

- `bunx astro build`: 24 páginas em 5,3 s (cerca de 11 s no relógio, com o carregamento).
- `dist/monitores/index.html` existe e `grep -c '<title>Comparar' dist/monitores/index.html` dá 1.
- JS da ilha da categoria: `home-page-client` com 1,74 MB (223 KB gzip), mais `client` (React) com 213 KB.
- Linha de base do Next não medida: com o `next 16.4.0` deste ponto do histórico o `next build` é bloqueado (`SecurityFatalError`); o patch `16.4.6` corrige, mas está em outro branch.

Adaptações necessárias no caminho do componente:

- `next/link` (`product-card`, `navbar`, `search-modal`), `next/image` (`comparison-view`, `product-card`, `product-suggestions`, `navbar`, `search-modal`) e `next/navigation` (`usePathname` no `navbar`): no spike foram cobertos por aliases do Vite para shims em `astro/shims/`. O plano 002 troca por `<a>`, `<img>` e prop de caminho e remove os shims.
- Nenhum componente do caminho usou `next/headers` nem `server-only`; `lib/data.ts` importa fora do Next sem alteração.

Riscos descobertos:

1. **`src/pages` conflita com o Next.** O Next 16 recusa um diretório `app` ao lado de `src/pages` ("`pages` and `app` directories should be under the same folder"), e isso quebra o `next typegen`. Enquanto os dois coexistem, o Astro usa `srcDir: "./astro"`. No cutover (plano 003), `astro/` volta a ser `src/`.
2. **Bundle da ilha de 1,74 MB.** `HomePageClient` importa `lib/data.ts`, que importa os 24 JSON de uma vez, então todo o catálogo vai para o navegador. A troca de categoria no cliente (`getProductsByCategory`) depende disso. Reduzir exige carregar os dados por categoria sob demanda (lógica de `lib/`, fora do escopo da migração; fica como evolução).
3. A comparação por `?products=` deixa de ser renderizada no servidor: o HTML inicial não traz os produtos escolhidos.
4. Com `@astrojs/vercel`, o build escreve em `.vercel/output/static`; `dist/` também é gerado. `dist/` e `.astro/` entraram no `.gitignore`.
5. O Biome não entende o frontmatter `.astro` (acusa variáveis e imports como não usados): `*.astro` ficou fora do Biome em `biome.json`.
