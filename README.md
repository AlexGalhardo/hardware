# TudoHardware

Site de fichas técnicas e comparação de produtos (smartphones, CPUs, GPUs, eletrodomésticos e mais), com links de afiliado. Em produção em <https://alexgalhardo.github.io/tudohardware>.

- **Stack:** Next.js 16 (App Router), React 19, TypeScript 7, Tailwind CSS 4, Biome, Bun.
- **Conteúdo:** arquivos JSON em `data/`, um por categoria. Cada produto vira a página `/<categoria>/<id>`.
- **Links de afiliado:** gerenciados pelo dashboard de links (`links.lekzera.xyz`). Os botões do site apontam para o redirect do dashboard, e todo build registra o catálogo lá.

## Rodar

```bash
bun install
cp .env.example .env   # preencha o que for usar
bun run dev
```

## Comandos

| Comando | O que faz |
| --- | --- |
| `bun run dev` | Servidor de desenvolvimento |
| `bun run build` | Sincroniza os links, gera CSV, sitemap e estatísticas, e roda o `next build` |
| `bun run typecheck` | TypeScript sem emitir |
| `bun run test` | Testes (`bun test`) |
| `bun run lint` | Biome em `app`, `components`, `lib` e `scripts` |
| `bun run lint:md` | markdownlint |
| `bun run format` | Biome com correção, depois de regenerar CSV e estatísticas |
| `bun run ci` | `typecheck`, `test`, `lint:md` e `build` |
| `bun run sync-links` | Valida o catálogo de links; com `LINKS_DASHBOARD_TOKEN`, envia ao dashboard |

## Links de afiliado

1. Cada produto guarda o endereço real da loja em `mercadolivreUrl`, `amazonUrl` e `shopeeUrl`.
2. `scripts/sync-links.ts` roda antes de todo build e envia o catálogo inteiro ao dashboard (`PUT /api/v1/links`). Se o dashboard recusar ou estiver fora do ar, o build falha e o site continua na versão anterior.
3. Os botões apontam para `https://links.lekzera.xyz/link?id=<id>&store=<loja>`. O id de um produto é `https://alexgalhardo.github.io/tudohardware/<categoria>/<id do produto>`.

Regras:

- O `id` do produto é único dentro da categoria. Id repetido falha o build.
- Só endereço `https://` vira link. `null`, vazio e `#` não geram botão.
- Trocar o `id` de um produto cria um registro novo no dashboard e apaga o antigo, com os cliques dele.

O token do projeto (`LINKS_DASHBOARD_TOKEN`) fica só nas variáveis da Vercel. Sem ele, o build de produção falha; os outros builds só validam o catálogo.

## Variáveis de ambiente

Descritas em [`.env.example`](.env.example). O `.env` não é versionado.

## Bot do Telegram

`telegram/` é um bot separado (Bun, deploy no Fly.io) que publica ofertas a partir de `telegram/produtos.csv`, gerado no build por `scripts/create-csv.ts`. As credenciais ficam nos secrets do Fly.io (`flyctl secrets set ...`) e em `telegram/.env` local, nunca no repositório.

## Convenções

- Commits: [Conventional Commits](https://www.conventionalcommits.org/), validados pelo commitlint.
- Versões: [SemVer](https://semver.org/). Histórico em [`CHANGELOG.md`](CHANGELOG.md), no formato [Keep a Changelog](https://keepachangelog.com/).
- Cada versão é uma tag `vX.Y.Z` com GitHub Release.
- Formatação: tab de largura 4 (Biome e `.editorconfig`).
- Guia para agentes de código: [`AGENTS.md`](AGENTS.md).
