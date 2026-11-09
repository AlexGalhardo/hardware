# Contribuindo com o TudoHardware

Obrigado por considerar contribuir. O TudoHardware é um site de fichas técnicas e comparação de produtos feito com Next.js 16, React 19, TypeScript e Tailwind CSS 4.

## Antes de começar

- Leia [`docs/architecture.md`](docs/architecture.md), [`docs/workflows.md`](docs/workflows.md) e as regras de [`.claude/rules/`](.claude/rules/).
- Para algo maior que uma correção pequena, abra uma issue antes para combinar a abordagem.

## Configuração local

Requisito: [Bun](https://bun.sh) 1.4.

```bash
bun install
bun run dev
```

O passo a passo completo (incluindo variáveis de ambiente, GitHub e Vercel) está em [`docs/agent-setup.md`](docs/agent-setup.md). O `bun install` ativa os hooks do git (husky).

| Comando | O que faz |
| --- | --- |
| `bun run dev` | Servidor de desenvolvimento |
| `bun run build` | Sincroniza os links, gera sitemap e estatísticas, e roda o `next build` |
| `bun run typecheck` | TypeScript sem emitir |
| `bun run test` | Testes (`bun test`) |
| `bun run lint` | Biome |
| `bun run lint:md` | markdownlint |
| `bun run format` | Biome com correção |
| `bun run ci` | `typecheck`, `lint`, `test`, `lint:md` e `build` |

## Fazendo uma mudança

- Escreva o teste junto com a mudança e mantenha o foco em um assunto.
- Código e commits em inglês; textos de interface e documentação em português do Brasil.
- Sem dependência nova sem combinar antes; versões exatas, sempre a última estável.
- Conteúdo (`data/*.json`): o `id` de um produto é estável depois de publicado, e cada produto precisa de ao menos um link de loja com `https://`. Veja [`.claude/rules/`](.claude/rules/).
- Atualize a documentação afetada na mesma mudança.

## Verificações

Rode antes de abrir o pull request:

```bash
bun run ci
```

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/) em inglês: `tipo(escopo opcional): descrição no imperativo`. O commitlint confere o cabeçalho no hook `commit-msg`. Nunca use `--no-verify`.

Neste repositório, todo commit enviado é uma versão: a mudança, o `package.json` e o `CHANGELOG.md` entram no mesmo commit, e o mantenedor cuida da tag e do GitHub Release (detalhes em [`docs/workflows.md`](docs/workflows.md)).

## Pull requests

1. Crie um branch a partir da `main`.
2. Faça um commit por mudança lógica, com testes.
3. Abra o pull request contra a `main`, descrevendo o que mudou e como testou. O pull request é mesclado por rebase.

## Bugs e segurança

- Bugs e ideias: abra uma issue com passos para reproduzir.
- Vulnerabilidades: não abra issue pública; siga o [SECURITY.md](SECURITY.md).
