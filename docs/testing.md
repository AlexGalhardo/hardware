# Testes

Executor: `bun test` (arquivos `*.test.ts`). Nenhum teste usa rede ou segredo.

| Arquivo | Cobre |
| --- | --- |
| `lib/affiliate-links.test.ts` | Contrato com o dashboard: o que é um link, `href` do redirect, problemas do catálogo, envio com novas tentativas, falhas sem nova tentativa (401, 409, 207, 400), CSV, saúde do dashboard |
| `scripts/catalogue.test.ts` | Catálogo real do site: toda página presente uma vez, com link `https://`; id pela categoria da rota |
| `lib/admin/admin.test.ts` | Mapa de arquivos, lista de e-mails, criar/editar/excluir produto, validação, conflito de edição, armazenamento local e do GitHub (com `fetch` falso) |
| `app/api/admin/admin-api.test.ts` | Rotas do painel chamadas direto: `401` sem sessão, CRUD, cada erro com seu status, exportação JSON e CSV |

## Como os testes isolam o mundo

- **Rede:** `syncCatalogue`, `isDashboardUp` e `githubStore` recebem `fetch` por parâmetro; os testes passam um `fetch` falso.
- **Arquivos:** `localStore(pasta temporária)` nos testes de serviço; `DATA_ROOT` aponta as rotas para uma pasta temporária.
- **Sessão:** `mock.module("@/lib/admin/auth")` troca `getAdmin` nos testes das rotas.

## Rodar

```bash
bun run test                       # tudo
bun test lib/admin/admin.test.ts   # um arquivo
bun run ci                         # tipos, lint, testes, markdownlint e build
```

## O que não tem teste automático

- O fluxo de login com Google e as telas do painel no navegador (dependem de uma conta Google real).
- As páginas públicas no navegador. A conferência é manual: `bun run build && bunx next start`, abrir uma ficha de produto e uma comparação.

Lógica nova nasce com teste. Não enfraqueça um teste para ele passar.
