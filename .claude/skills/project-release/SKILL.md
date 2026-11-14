---
name: project-release
description: Fecha uma versão do tudohardware - escolhe a versão, fecha a seção do CHANGELOG e cria a tag. Use quando pedirem uma versão, uma tag ou uma release.
---

# Release

Cada versão tem a própria seção no `CHANGELOG.md`, a versão no `package.json` e uma tag anotada `vX.Y.Z`. O GitHub Release e a imagem Docker saem do workflow `release.yml` ao subir a tag. Regras em [`.claude/rules/git-and-releases.md`](../../rules/git-and-releases.md); contexto de deploy em [`docs/workflows.md`](../../../docs/workflows.md). Não existe script de release: os passos são manuais.

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
```

O `release.yml` cria o GitHub Release com a seção `## [X.Y.Z]` do `CHANGELOG.md` e publica a imagem no GHCR e no Docker Hub.

Os hooks rodam sozinhos: `pre-commit` (tipos, lint e markdownlint), `commit-msg` (commitlint) e `pre-push` (build). Se um falhar, corrija a causa.

## 4. Conferir

```bash
git describe --tags --exact-match          # a tag aponta para o HEAD
gh run list --workflow release --limit 1  # o release.yml da tag terminou
```

O push na `main` publica no GitHub Pages (`pages.yml`).
