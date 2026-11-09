<div align="center">

<h1><strong><a href="https://alexgalhardo.github.io/tudohardware" target="_blank">TudoHardware</a></strong></h1>

[![Bun 1.4](https://img.shields.io/badge/bun-1.4-000000?logo=bun&logoColor=white)](package.json)
[![Next.js 16](https://img.shields.io/badge/next.js-16-000000?logo=nextdotjs&logoColor=white)](package.json)

<h3><strong>Fichas técnicas e comparação de produtos de hardware e eletrônicos</strong></h3>

</div>

## Introdução

Site de fichas técnicas e comparação de produtos (smartphones, CPUs, GPUs, eletrodomésticos e mais), com links de afiliado. Em produção em <https://alexgalhardo.github.io/tudohardware>.

- **Stack:** Next.js 16 (App Router), React 19, TypeScript 7, Tailwind CSS 4, Biome, Bun.
- **Conteúdo:** arquivos JSON em `data/`, um por categoria. Cada produto vira a página `/<categoria>/<id>`.
- **Painel:** `/admin`, com login do Google, cria, edita e exclui produtos por commits no repositório e exporta o catálogo em JSON e CSV.
- **Links de afiliado:** gerenciados pelo dashboard de links (`links.lekzera.xyz`). Os botões do site apontam para o redirect do dashboard, e todo build registra o catálogo lá.

## Sumário

- [Introdução](#introdução)
- [Rodar](#rodar)
- [Comandos](#comandos)
- [Links de afiliado](#links-de-afiliado)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Documentação](#documentação)
- [Estabilidade](#estabilidade)
- [Contribuindo](#contribuindo)
- [Código de conduta](#código-de-conduta)
- [Vulnerabilidades de segurança](#vulnerabilidades-de-segurança)

## Rodar

```bash
bash setups/setup-windows-local.sh   # Windows (Git Bash)
bash setups/setup-unix-local.sh      # macOS, Linux, WSL
```

Há também `setup-*-with-docker.sh`, que sobe a imagem de `infra/`. O passo a passo completo, incluindo GitHub e Vercel, está em [`docs/agent-setup.md`](docs/agent-setup.md).

## Comandos

| Comando | O que faz |
| --- | --- |
| `bun run dev` | Servidor de desenvolvimento |
| `bun run build` | Sincroniza os links, gera sitemap e estatísticas, e roda o `next build` |
| `bun run typecheck` | TypeScript sem emitir |
| `bun run test` | Testes (`bun test`) |
| `bun run lint` | Biome em `app`, `components`, `lib` e `scripts` |
| `bun run lint:md` | markdownlint |
| `bun run format` | Biome com correção, depois de regenerar as estatísticas |
| `bun run ci` | `typecheck`, `lint`, `test`, `lint:md` e `build` |
| `bun run sync-links` | Valida o catálogo de links; com `LINKS_DASHBOARD_TOKEN`, envia ao dashboard |

## Links de afiliado

1. Cada produto guarda o endereço real da loja em `mercadolivreUrl`, `amazonUrl` e `shopeeUrl`.
2. `scripts/sync-links.ts` roda antes de todo build e envia o catálogo inteiro ao dashboard (`PUT /api/v1/links`). Se o dashboard recusar ou estiver fora do ar, o build falha e o site continua na versão anterior.
3. Os botões apontam para `https://links.lekzera.xyz/link?id=<id>&store=<loja>`. O id de um produto é `https://alexgalhardo.github.io/tudohardware/<categoria>/<id do produto>`.
4. Ao abrir a página, o navegador consulta `https://links.lekzera.xyz/health`. Sem resposta, os botões passam a apontar direto para a loja: a venda não depende do dashboard, só a contagem do clique.

Regras:

- O `id` do produto é único dentro da categoria. Id repetido falha o build.
- Só endereço `https://` vira link. `null`, vazio e `#` não geram botão.
- Trocar o `id` de um produto cria um registro novo no dashboard e apaga o antigo, com os cliques dele.

O site se identifica pelo próprio endereço e o dashboard cria o projeto dele sozinho. A chave do dashboard (`LINKS_DASHBOARD_TOKEN`, a mesma em todos os sites) fica só nas variáveis da Vercel. Sem ela, o build de produção falha; os outros builds só validam o catálogo.

## Variáveis de ambiente

Descritas em [`.env.example`](.env.example). O `.env` não é versionado.

## Documentação

| Documento | Assunto |
| --- | --- |
| [`docs/agent-setup.md`](docs/agent-setup.md) | Preparar o projeto do zero |
| [`docs/architecture.md`](docs/architecture.md) | Pastas, fluxos e decisões |
| [`docs/admin.md`](docs/admin.md) | Painel `/admin` |
| [`docs/tooling.md`](docs/tooling.md) | Ferramentas, scripts e hooks |
| [`docs/testing.md`](docs/testing.md) | Testes |
| [`docs/workflows.md`](docs/workflows.md) | Commits, release, deploy e conteúdo |

## Estabilidade

O projeto segue [SemVer](https://semver.org/lang/pt-BR/). Cada versão é uma tag `vX.Y.Z` com GitHub Release, e o histórico está em [`CHANGELOG.md`](CHANGELOG.md), no formato [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## Contribuindo

O guia completo está em [`CONTRIBUTING.md`](CONTRIBUTING.md). Guia para agentes de código: [`AGENTS.md`](AGENTS.md).

- Formatação: tab de largura 4 (Biome e `.editorconfig`).

### Pull requests

1. Crie um branch a partir da `main`.
2. Faça um commit por mudança lógica, com testes.
3. Abra o pull request contra a `main`.

### Commits

[Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/) em inglês, validados pelo commitlint no hook `commit-msg`.

## Código de conduta

Leia e siga o [Código de Conduta](CODE_OF_CONDUCT.md).

## Vulnerabilidades de segurança

Siga a [política de segurança](SECURITY.md) em vez de abrir uma issue pública.
