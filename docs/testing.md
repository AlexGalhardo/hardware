# Testes

Executor: `bun test` (arquivos `*.test.ts`). Nenhum teste usa rede ou segredo.

| Arquivo | Cobre |
| --- | --- |
| `lib/affiliate-links.test.ts` | Contrato com o dashboard: o que é um link, `href` do redirect, problemas do catálogo, envio com novas tentativas, falhas sem nova tentativa (401, 409, 207, 400), CSV, saúde do dashboard |
| `scripts/catalogue.test.ts` | Catálogo real do site: toda página presente uma vez, com link `https://`; id pela categoria da rota |
| `lib/env.test.ts` | Validação das variáveis de ambiente |
| `lib/base.test.ts` | `withBase` e `stripBase` sem base |
| `tests/pages.test.ts` | O `dist/` do `astro build`: toda página pública, título, canonical e nenhum asset do Next. Pulado sem `dist/` |

Rede: `syncCatalogue` e `isDashboardUp` recebem `fetch` por parâmetro; os testes passam um falso.

## Rodar

```bash
bun run build && bun run test      # tudo, com o teste do dist/
bun test lib/base.test.ts          # um arquivo
bun run ci                         # tipos, lint, testes, markdownlint e build
```

## O que não tem teste automático

As páginas públicas no navegador (comparação, busca, tema). A conferência é manual: `bun run build && bun run preview`, abrir uma ficha de produto e uma comparação.

Lógica nova nasce com teste. Não enfraqueça um teste para ele passar.
