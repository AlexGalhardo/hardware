# Testes

O que cada teste cobre e como eles isolam rede, arquivos e sessão: [`docs/testing.md`](../../docs/testing.md). Aqui ficam só as regras.

- Executor: `bun test`. Arquivo de teste fica ao lado do código, com o sufixo `.test.ts`.
- Lógica nova nasce com teste. Correção de bug começa por um teste que reproduz o bug.
- Não enfraqueça um teste para ficar verde: nada de `.skip`, asserção removida ou limite afrouxado sem o dono concordar.
- Nenhum teste depende de rede ou de segredo. O que fala com fora recebe `fetch` por parâmetro (`syncCatalogue`, `isDashboardUp`) e o teste passa um falso.
- Variável de ambiente nova entra em `lib/env.ts` com um caso em `lib/env.test.ts`.
- Valide com o arquivo afetado antes da suíte toda: `bun test <arquivo>`.
- Mudança visual ou de fluxo é conferida no navegador: `bun run build && bun run preview`. Não há testes de navegador automatizados. `tests/pages.test.ts` confere o `dist/` e só roda depois do build.
- Antes de entregar: `bun run ci`.
