# Fluxos de trabalho

## Mudança de código

1. Edite e rode `bun run ci`.
2. Registre a mudança em `## [Unreleased]` no `CHANGELOG.md`.
3. Feche a versão (abaixo), faça o commit e o push.

## Commits

Conventional Commits em inglês, validados pelo commitlint: `tipo(escopo): descrição no imperativo`. Linhas do corpo com até 100 caracteres.

| Tipo | Quando |
| --- | --- |
| `feat` | Funcionalidade nova |
| `fix` | Correção |
| `docs`, `chore`, `build`, `test`, `refactor`, `perf`, `ci` | O que o nome diz |
| `content` | Alteração de produto feita pelo painel (commit automático) |

## Versão e release

SemVer: `feat` sobe a minor, `fix` e os demais sobem a patch, `!` ou `BREAKING CHANGE:` sobe a major.

```bash
# 1. CHANGELOG.md: mova Unreleased para "## [X.Y.Z] - AAAA-MM-DD" e atualize os links do rodapé
# 2. package.json: "version": "X.Y.Z"
git add -A && git commit -m "feat: descrição"
git tag -a vX.Y.Z -m "vX.Y.Z"
git push origin main vX.Y.Z
gh release create vX.Y.Z --title vX.Y.Z --notes-file notas.md   # notas = seção da versão no CHANGELOG
```

Commits `content:` do painel não geram versão.

## Deploy

- Produção: <https://tudohardware.com>, projeto `tudohardware-com` na Vercel (time `galhardos-projects`).
- **Automático:** push na `main` dispara o deploy quando o projeto está conectado ao repositório. A conexão exige que o app da Vercel no GitHub tenha acesso ao repositório (GitHub → Settings → Applications → Vercel → Repository access). Para reconectar: `vercel git connect https://github.com/AlexGalhardo/tudohardware.com`.
- **Manual:** `vercel deploy --prod` na raiz do projeto.
- O build de produção exige `LINKS_DASHBOARD_TOKEN`. Se o dashboard de links recusar o catálogo ou estiver fora do ar, o build falha e o site continua na versão anterior.

Conferir um deploy:

```bash
vercel ls tudohardware-com          # estado do último deploy
vercel inspect <url> --logs         # log do build
```

## Conteúdo

- **Pelo painel:** `/admin` grava um commit por alteração. Ver [admin.md](admin.md).
- **Direto no repositório:** edite `data/<arquivo>.json`. O `id` é único na categoria; todo produto precisa de ao menos um link `https://`. `bun run sync-links` valida.
- **Categoria nova:** arquivo em `data/`, entrada em `categories` e no mapa de `lib/data.ts`, em `lib/admin/category-files.ts`, em `categoryFileMap` de `scripts/create-sitemap.ts` e nos mapas de `scripts/create-csv.ts`.

## Links de afiliado

O contrato com o dashboard de links está no `README.md` ("Links de afiliado") e no repositório do dashboard (`docs/api.md`). Resumo:

- O site se identifica pelo próprio endereço; o projeto é criado no dashboard no primeiro build.
- Uma variável só: `LINKS_DASHBOARD_TOKEN`, a chave do dashboard, a mesma em todos os sites.
- `lib/affiliate-links.ts` é o mesmo arquivo nos outros sites. Mudou aqui, mude lá.
