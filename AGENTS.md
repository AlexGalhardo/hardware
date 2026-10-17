# AGENTS.md

Instruções para agentes de código neste repositório. O `CLAUDE.md` importa este arquivo; edite sempre aqui.

**Documentação:** o índice de `docs/` está em [`.claude/agents.md`](.claude/agents.md). Para preparar o projeto do zero, siga [`docs/agent-setup.md`](docs/agent-setup.md).

## O que é o projeto

Site de fichas técnicas e comparação de produtos com links de afiliado, em produção em <https://tudohardware.com>. Não há banco: o conteúdo são os arquivos JSON de `data/`, importados estaticamente. O painel `/admin` edita esses arquivos por commits no próprio repositório.

## Início de toda sessão

1. Carregue as três skills de sessão (em agentes sem ferramenta de skills, leia o `SKILL.md` de cada uma em `.claude/skills/<nome>/`):
   - `using-agent-skills`: o roteador que indica a skill de engenharia de cada tarefa;
   - `karpathy-guidelines`: pensar antes de codar, simplicidade, mudanças cirúrgicas, critérios verificáveis;
   - `ponytail`: a solução mais simples que funciona.
2. Leia o índice em [`.claude/agents.md`](.claude/agents.md) e, dele, só a documentação do assunto em que vai mexer.
3. As regras por assunto ficam em [`.claude/rules/`](.claude/rules/) (o Claude Code as carrega sozinho) e valem tanto quanto as deste arquivo.
4. Antes de usar uma API do Next.js 16 de que não tenha certeza, leia `node_modules/next/dist/docs/`.

## Skills, agentes e checklists

Tudo fica em `.claude/`. A origem dos pacotes de terceiros está em [`.claude/skills/SOURCES.md`](.claude/skills/SOURCES.md); o conteúdo deles não é editado aqui.

| Skill do projeto | Quando |
| --- | --- |
| `project-product` | Criar, editar ou remover um produto; categoria nova |
| `project-release` | Em todo commit enviado: versão, `CHANGELOG.md`, tag e GitHub Release |

As skills de engenharia do pacote agent-skills entram por tarefa, indicadas pelo `using-agent-skills`. As mais comuns aqui: `test-driven-development`, `debugging-and-error-recovery`, `frontend-ui-engineering`, `security-and-hardening` (login, painel e API), `code-review-and-quality` e `git-workflow-and-versioning`. Duas não têm uso hoje: `ci-cd-and-automation` (o repositório não tem workflows) e `browser-testing-with-devtools` (depende do servidor MCP do Chrome DevTools, não configurado).

As skills `ponytail-*` só entram quando o dono pedir. Os agentes de `.claude/agents/` (`code-reviewer`, `security-auditor`, `test-engineer`, `web-performance-auditor`) são chamados pelo nome como subagentes de revisão; os checklists de `.claude/references/` são consultados por eles e pelas skills do pacote.

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
| `scripts/create-sitemap.ts`, `data-jsons-stats.ts` | Geram `public/sitemap.xml` e `data-stats.json` no build |
| `app/admin/`, `app/api/admin/`, `lib/admin/`, `components/admin/` | Painel de produtos: login com Google (better-auth), CRUD por commit no GitHub, exportação. Ver [`docs/admin.md`](docs/admin.md) |
| `app/contato/`, `lib/contact.ts` | Formulário de contato: valida e envia ao Telegram com `@galhardoalex/telegram-logger` |
| `lib/scrapers.ts`, `components/CopyProtection.tsx` | Bloqueio de clientes de script no `proxy.ts` e de cópia no navegador. Não bloqueie buscadores nem crawlers de IA: o site depende de ser encontrado |
| `hooks/use-dashboard-down.ts` | Desvio dos botões para a loja quando o dashboard de links não responde |
| `infra/`, `setups/` | Docker e scripts de preparação |
| `docs/` | Documentação (índice em `.claude/agents.md`); `docs/prompts/` tem os prompts de geração de JSON |

## Regras

- **Links de afiliado só pelo dashboard.** Use `productAffiliateHref`. O único caso em que o botão aponta direto para a loja é o desvio de `useDashboardDown()`, quando o dashboard não responde. Ver "Links de afiliado" no [`README.md`](README.md).
- **`id` do produto é único na categoria e estável.** Id repetido falha o build; id trocado apaga os cliques do produto no dashboard.
- **Categoria nova:** arquivo em `data/`, entrada em `categories` e no mapa de `lib/data.ts`, em `lib/admin/category-files.ts`, e em `categoryFileMap` de `scripts/create-sitemap.ts`.
- **Painel:** toda página de `app/admin/(panel)/` chama `requireAdmin()` e toda rota de `app/api/admin/` passa por `adminRoute()`. O layout não protege os dados da página. Produto só é gravado por `saveProduct`/`deleteProduct` (`lib/admin/products.ts`).
- **Segredos:** nada de chave real no repositório. `.env` é ignorado pelo git; `.env.example` só tem placeholders.
- **Dependências:** última versão estável, com versão exata, sem `^` nem `~`. Dependência nova só com aprovação do dono.
- **TypeScript:** sem `any` (o Biome recusa), sem `@ts-ignore`. O build falha com erro de tipo.
- **Variáveis de ambiente:** toda variável nova entra no schema de `lib/env.ts` (e em `ESSENTIAL` se a produção não roda sem ela) e em `.env.example`.
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

`bun run ci` roda os cinco. O hook `pre-commit` roda tipos, lint e markdownlint; o `pre-push` roda o build. Mudança visual é conferida no navegador.

## Commits e versões

- Conventional Commits, validados pelo commitlint no hook `commit-msg`.
- SemVer: `feat` sobe a minor, `fix` e os demais sobem a patch, `!` sobe a major.
- Registre a mudança em `## [Unreleased]` no [`CHANGELOG.md`](CHANGELOG.md). Ao fechar a versão: mova o texto para `## [X.Y.Z] - AAAA-MM-DD`, atualize `version` no `package.json`, crie a tag `vX.Y.Z` e o GitHub Release com as notas da versão.

## Dívida conhecida

- O deploy por push depende de o app da Vercel no GitHub ter acesso ao repositório (ver [`docs/workflows.md`](docs/workflows.md)). Sem isso, o deploy é `vercel deploy --prod` e os commits do painel não entram no ar sozinhos.
- As telas do painel não têm teste no navegador (o login depende de uma conta Google real).
