# Git, commits e releases

Passo a passo de versão e release: skill `project-release` e [`docs/workflows.md`](../../docs/workflows.md). Aqui ficam só as regras.

## Commits

- Conventional Commits, em inglês: `tipo(escopo opcional): descrição no imperativo`. O commitlint (`commitlint.config.mjs`) valida no hook `commit-msg`; cada linha do corpo tem até 100 caracteres.
- Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Um commit por mudança lógica.
- Nunca commite `.env`, chaves ou tokens.
- Os hooks do git (tabela em [`docs/tooling.md`](../../docs/tooling.md)) rodam tipos, lint e markdownlint no commit e o build no push. Nunca use `--no-verify`: corrija a causa.
- Nunca faça push forçado em `main` sem o dono pedir.

## Versões

- SemVer: `feat` sobe a minor; `fix` e os demais sobem a patch; `!` ou `BREAKING CHANGE:` sobe a major.
- A versão fica no `package.json` e na seção `## [X.Y.Z]` do `CHANGELOG.md`, com itens `- **escopo:** texto ([sha](link))`. Depois: tag anotada `vX.Y.Z` e push.
- O push da tag estável dispara `release.yml`: GitHub Release com as notas da seção e imagem no GHCR e no Docker Hub.
- O push na `main` publica no GitHub Pages (`pages.yml`).

## CI

- `ci.yml` roda lint, markdownlint, tipos, build e testes. Actions ficam fixadas por SHA, com a versão em comentário.
