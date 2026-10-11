# Git, commits e releases

Passo a passo de versão e release: skill `project-release` e [`docs/workflows.md`](../../docs/workflows.md). Aqui ficam só as regras.

## Commits

- Conventional Commits, em inglês: `tipo(escopo opcional): descrição no imperativo`. O commitlint (`commitlint.config.mjs`) valida no hook `commit-msg`; cada linha do corpo tem até 100 caracteres.
- Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. O painel `/admin` grava commits com o prefixo `content:` pela API do GitHub, fora dos hooks.
- Um commit por mudança lógica.
- Nunca commite `.env`, chaves ou tokens.
- Os hooks do git (tabela em [`docs/tooling.md`](../../docs/tooling.md)) rodam tipos, lint e markdownlint no commit e o build no push. Nunca use `--no-verify`: corrija a causa.
- Nunca faça push forçado em `main` sem o dono pedir.

## Todo commit enviado é uma release

- No mesmo commit entram a mudança, a versão nova no `package.json` e a seção da versão no `CHANGELOG.md`. Depois dele: tag anotada `vX.Y.Z`, push e GitHub Release com as notas da versão.
- SemVer: `feat` sobe a minor; `fix` e os demais sobem a patch; `!` ou `BREAKING CHANGE:` sobe a major.
- Exceção: os commits `content:` do painel não geram versão.
- O push na `main` publica em produção. Confira o deploy depois (`docs/workflows.md`).

## CI

- Não há workflows do GitHub Actions: a verificação é a dos hooks e de `bun run ci`. Não crie workflows sem o dono pedir.
