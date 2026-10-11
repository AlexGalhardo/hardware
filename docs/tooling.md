# Ferramentas

| Ferramenta | Uso | Configuração |
| --- | --- | --- |
| Bun 1.4 | Gerenciador de pacotes, executor de scripts e de testes | `bun.lock` |
| Next.js 16 (Turbopack) | Framework, build e servidor | `next.config.mjs` |
| TypeScript 7, modo estrito | Tipos. Erro de tipo falha o build | `tsconfig.json` (`types: node, bun`) |
| Biome 2 | Formatador e linter únicos. `any` explícito é erro | `biome.json` |
| markdownlint-cli2 | Lint dos arquivos Markdown da raiz e de `.claude/` | `.markdownlint-cli2.jsonc` |
| commitlint | Conventional Commits no hook `commit-msg` | `commitlint.config.mjs` |
| husky | Hooks do git | `.husky/` |
| Tailwind CSS 4 | Estilos | `app/globals.css`, `postcss.config.mjs` |
| better-auth | Login com Google do painel | `lib/admin/auth.ts` |
| Docker | Imagem de produção para rodar local | `infra/` |

## Scripts

| Comando | O que faz |
| --- | --- |
| `bun run dev` | Servidor de desenvolvimento |
| `bun run build` | `sync-links`, `sitemap`, `stats` e `next build` |
| `bun run typecheck` | `next typegen` (tipos das rotas) e `tsc --noEmit` |
| `bun run lint` | Biome em `app`, `components`, `lib`, `scripts`, `hooks` |
| `bun run lint:md` | markdownlint |
| `bun run format` | Regenera as estatísticas e aplica o Biome |
| `bun run test` | `bun test` |
| `bun run ci` | `typecheck`, `lint`, `test`, `lint:md` e `build` |
| `bun run sync-links` | Valida o catálogo; com `LINKS_DASHBOARD_TOKEN`, envia ao dashboard |

## Hooks do git

| Hook | Roda |
| --- | --- |
| `pre-commit` | `typecheck`, `lint`, `stats`, `format` |
| `commit-msg` | `commitlint` |
| `pre-push` | `stats`, `format`, `build` |

Nunca use `--no-verify`. Se um hook falhar, corrija a causa.

## Regras de dependências

- Última versão estável, com versão exata no `package.json` (sem `^` nem `~`, sem `rc`/`beta`).
- Dependência nova só com aprovação do dono.
- `bun.lock` é o único lockfile.

## Formatação

Tab de largura 4, linha de até 120 colunas, aspas duplas (`.editorconfig` e `biome.json`). YAML usa 2 espaços.
