# Ferramentas

| Ferramenta | Uso | Configuração |
| --- | --- | --- |
| Bun 1.4 | Gerenciador de pacotes, executor de scripts e de testes | `bun.lock` |
| Astro 7.4 | Framework e build estático | `astro.config.ts` |
| TypeScript 7, modo estrito | Tipos | `tsconfig.json` |
| Biome 2 | Formatador e linter únicos. `any` explícito é erro | `biome.json` |
| markdownlint-cli2 | Lint dos arquivos Markdown | `.markdownlint-cli2.jsonc` |
| commitlint | Conventional Commits no hook `commit-msg` | `commitlint.config.mjs` |
| husky | Hooks do git | `.husky/` |
| Tailwind CSS 4 | Estilos, pelo plugin do Vite | `astro/styles/globals.css` |
| Docker | Imagem estática (bun + Caddy) | `Dockerfile`, `Caddyfile`, `docker-compose.yml` |
| GitHub Actions | CI, Pages e release | `.github/workflows/` |

## Scripts

| Comando | O que faz |
| --- | --- |
| `bun run dev` | Servidor de desenvolvimento do Astro |
| `bun run build` | `check-env`, `sync-links`, `sitemap`, `stats` e `astro build` (saída em `dist/`) |
| `bun run preview` | Serve o `dist/` |
| `bun run check-env` | Confere as variáveis de ambiente (`lib/env.ts`) |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run lint` | Biome |
| `bun run lint:md` | markdownlint |
| `bun run format` | Regenera as estatísticas e aplica o Biome |
| `bun run test` | `bun test` (os testes de `tests/pages.test.ts` precisam do `dist/`) |
| `bun run ci` | `typecheck`, `lint`, `test`, `lint:md` e `build` |
| `bun run sync-links` | Valida o catálogo; com `LINKS_DASHBOARD_TOKEN`, envia ao dashboard |

## Docker

```bash
docker build -t tudohardware .
docker run --rm -p 8080:80 tudohardware     # http://localhost:8080
docker compose up --build                   # o mesmo, na porta ${PORT:-8080}
```

A imagem builda com `BASE_PATH=/` e o Caddy serve o `dist/`.

## GitHub Pages

`pages.yml` publica o `dist/` a cada push na `main` em <https://alexgalhardo.github.io/tudohardware>. Ative em Settings → Pages → Source: GitHub Actions.

## Hooks do git

| Hook | Roda |
| --- | --- |
| `pre-commit` | `typecheck`, `lint`, `lint:md`, `stats`, `format` |
| `commit-msg` | `commitlint` |
| `pre-push` | `stats`, `format`, `build` |

Nunca use `--no-verify`. Se um hook falhar, corrija a causa.

## Regras de dependências

- Última versão estável, com versão exata no `package.json` (sem `^` nem `~`, sem `rc`/`beta`).
- Dependência nova só com aprovação do dono.
- `bun.lock` é o único lockfile.

## Formatação

Tab de largura 4, linha de até 120 colunas, aspas duplas (`.editorconfig` e `biome.json`). YAML usa 2 espaços.
