# Testes

O que cada teste cobre e como eles isolam rede, arquivos e sessão: [`docs/testing.md`](../../docs/testing.md). Aqui ficam só as regras.

- Executor: `bun test`. Arquivo de teste fica ao lado do código, com o sufixo `.test.ts`.
- Lógica nova nasce com teste. Correção de bug começa por um teste que reproduz o bug.
- Não enfraqueça um teste para ficar verde: nada de `.skip`, asserção removida ou limite afrouxado sem o dono concordar.
- Nenhum teste depende de rede ou de segredo. O que fala com fora recebe `fetch` por parâmetro (`syncCatalogue`, `isDashboardUp`, `githubStore`) e o teste passa um falso.
- Teste que grava arquivo usa uma pasta temporária (`localStore(pasta)` ou a variável `DATA_ROOT`), nunca o `data/` do repositório.
- Rota nova em `app/api/admin/` entra em `app/api/admin/admin-api.test.ts`, com o caso de `401` sem sessão.
- Variável de ambiente nova entra em `lib/env.ts` com um caso em `lib/env.test.ts`.
- Valide com o arquivo afetado antes da suíte toda: `bun test <arquivo>`.
- Mudança visual ou de fluxo é conferida no navegador: `bun run build && bunx next start`. Não há testes de navegador automatizados; o login com Google depende de uma conta real.
- Antes de entregar: `bun run ci`.
