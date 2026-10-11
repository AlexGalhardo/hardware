# AGENTS.md

Instruções para agentes de código neste repositório. O `CLAUDE.md` importa este arquivo; edite sempre aqui.

## O que é o projeto

Site de fichas técnicas e comparação de produtos com links de afiliado, em produção em <https://tudohardware.com>. Não há banco nem CMS: o conteúdo são os arquivos JSON de `data/`, importados estaticamente.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript 7 strict · Tailwind CSS 4 · Radix/shadcn (`components/ui`) · Biome · Bun.

## Mapa

| Caminho | Papel |
| --- | --- |
| `data/*.json` | Um array de produtos por categoria. Fonte única do conteúdo |
| `lib/data.ts` | Categorias (`categories`) e o mapa categoria → arquivo. O id da categoria é o da URL, não o nome do arquivo |
| `lib/specs/`, `lib/spec-configs.ts` | Tipos e seções de especificação por categoria |
| `app/[category]/page.tsx` | Página de comparação da categoria (`?products=`) |
| `app/[category]/[productId]/` | Ficha do produto |
| `components/comparison/` | Cards, tabela e busca da comparação |
| `lib/affiliate-links.ts` | Contrato com o dashboard de links. O mesmo arquivo existe nos outros sites: mude nos dois |
| `lib/affiliate-catalogue.ts` | Como um produto vira id e `href` no dashboard. Importado por componentes de cliente: não importe `lib/data.ts` aqui |
| `scripts/catalogue.ts`, `scripts/sync-links.ts` | Monta o catálogo e o envia ao dashboard antes do build |
| `scripts/create-sitemap.ts`, `create-csv.ts`, `data-jsons-stats.ts` | Geram `public/sitemap.xml`, `telegram/produtos.csv` e `data-stats.json` no build |
| `telegram/` | Bot de ofertas separado (Fly.io). Fora do typecheck do site |
| `docs/` | Prompts usados para gerar o JSON de cada categoria |

## Regras

- **Links de afiliado só pelo dashboard.** Use `productAffiliateHref`. O único caso em que o botão aponta direto para a loja é o desvio de `useDashboardDown()`, quando o dashboard não responde. Ver "Links de afiliado" no [`README.md`](README.md).
- **`id` do produto é único na categoria e estável.** Id repetido falha o build; id trocado apaga os cliques do produto no dashboard.
- **Categoria nova:** arquivo em `data/`, entrada em `categories` e no mapa de `lib/data.ts`, e entrada em `categoryFileMap` de `scripts/create-sitemap.ts` e nos mapas de `scripts/create-csv.ts`.
- **Segredos:** nada de chave real no repositório. `.env` e `telegram/.env` são ignorados pelo git; `.env.example` só tem placeholders.
- **Dependências:** última versão estável, com versão exata, sem `^` nem `~`. Dependência nova só com aprovação do dono.
- **TypeScript:** sem `any` (o Biome recusa), sem `@ts-ignore`. O build falha com erro de tipo.
- **Lint:** `bun run lint` precisa passar sem erro. `biome-ignore` só com o motivo escrito na mesma linha.
- **Idioma:** código, comentários e commits em inglês; textos de interface e documentação em português do Brasil.

## Antes de entregar

```bash
bun run typecheck
bun run lint
bun run test
bun run lint:md
bun run build
```

`bun run ci` roda os cinco. O hook `pre-commit` roda tipos e lint; o `pre-push` roda o build. Mudança visual é conferida no navegador.

## Commits e versões

- Conventional Commits, validados pelo commitlint no hook `commit-msg`.
- SemVer: `feat` sobe a minor, `fix` e os demais sobem a patch, `!` sobe a major.
- Registre a mudança em `## [Unreleased]` no [`CHANGELOG.md`](CHANGELOG.md). Ao fechar a versão: mova o texto para `## [X.Y.Z] - AAAA-MM-DD`, atualize `version` no `package.json`, crie a tag `vX.Y.Z` e o GitHub Release com as notas da versão.

## Dívida conhecida

- `scripts/create-csv.ts` não conhece as categorias `cafeteiras`, `impressoras` e `fechaduras`.
- O bot do Telegram publica o link direto da loja, sem passar pelo dashboard.
- O push para `main` não dispara deploy na Vercel; o deploy é feito com `vercel deploy --prod`.
