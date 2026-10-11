---
name: project-release
description: Publica a release de um commit do tudohardware.com - escolhe a versão, fecha a seção do CHANGELOG, cria a tag e o GitHub Release. Use em todo commit enviado a este repositório e quando pedirem uma versão ou uma tag.
---

# Release

Todo commit enviado é uma release: leva a própria versão no `package.json`, a própria seção no `CHANGELOG.md`, uma tag anotada `vX.Y.Z` e um GitHub Release. Regras em [`.claude/rules/git-and-releases.md`](../../rules/git-and-releases.md); contexto de deploy em [`docs/workflows.md`](../../../docs/workflows.md). Não existe script de release: os passos são manuais.

## 1. Escolha a versão

| Mensagem do commit | Sobe |
| --- | --- |
| `feat` | minor |
| `fix`, `perf`, `docs`, `chore`, `test`, `build`, `refactor`, `style` | patch |
| `!` depois do tipo ou `BREAKING CHANGE:` no corpo | major |

A versão atual está em `package.json` e na última tag (`git describe --tags --abbrev=0`).

## 2. Antes do commit

```bash
bun run ci
```

No `CHANGELOG.md` (Keep a Changelog, em inglês):

1. Escreva a mudança sob `## [X.Y.Z] - AAAA-MM-DD`, logo abaixo de `## [Unreleased]`, na subseção certa (`Added`, `Changed`, `Fixed`, `Removed`, `Security`).
2. No rodapé, aponte `[Unreleased]` para `compare/vX.Y.Z...HEAD` e acrescente a linha `[X.Y.Z]: .../compare/v<anterior>...vX.Y.Z`.

No `package.json`: `"version": "X.Y.Z"`.

## 3. Commit, tag e publicação

```bash
git add -A
git commit -m "feat: descrição do commit"
git tag -a vX.Y.Z -m "vX.Y.Z"
git push origin main vX.Y.Z
gh release create vX.Y.Z --repo AlexGalhardo/tudohardware.com --title vX.Y.Z --notes-file notas.md --latest
```

`notas.md` é o texto da seção `## [X.Y.Z]` do `CHANGELOG.md`, sem o título.

Os hooks rodam sozinhos: `pre-commit` (tipos, lint e markdownlint), `commit-msg` (commitlint) e `pre-push` (build). Se um falhar, corrija a causa.

## 4. Conferir

```bash
git describe --tags --exact-match          # a tag aponta para o HEAD
gh release view vX.Y.Z --repo AlexGalhardo/tudohardware.com --json tagName,isDraft
vercel ls tudohardware-com                 # o deploy do commit ficou Ready
```

O push na `main` publica em produção. O build de produção falha se uma variável essencial faltar ou se o dashboard de links recusar o catálogo; nesse caso o site continua na versão anterior.

## Exceção

Os commits `content:` que o painel `/admin` grava pela API do GitHub não geram versão nem tag.
