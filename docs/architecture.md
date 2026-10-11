# Arquitetura

Site de fichas técnicas e comparação de produtos, com links de afiliado. Next.js 16 (App Router), sem banco de dados: o conteúdo são arquivos JSON versionados no repositório.

## Pastas

| Caminho | Papel |
| --- | --- |
| `data/*.json` | Um array de produtos por categoria. Fonte única do conteúdo |
| `lib/data.ts` | `categories` e o mapa categoria → dados importados no build |
| `lib/types.ts`, `lib/specs/`, `lib/spec-configs.ts` | Tipos de produto e seções de especificação por categoria |
| `app/[category]/` | Página de comparação (`?products=`) e ficha do produto (`[productId]`) |
| `components/comparison/` | Cards, tabela e busca da comparação |
| `lib/affiliate-links.ts` | Contrato com o dashboard de links (mesmo arquivo em todos os sites) |
| `lib/affiliate-catalogue.ts`, `hooks/use-dashboard-down.ts` | Id e `href` de cada botão de loja, e o desvio para a loja quando o dashboard cai |
| `scripts/` | Passos do build: `sync-links`, `create-sitemap`, `data-jsons-stats` |
| `app/admin/`, `app/api/admin/`, `lib/admin/`, `components/admin/` | Painel de produtos. Ver [admin.md](admin.md) |
| `app/api/auth/[...all]` | better-auth (login com Google do painel) |
| `infra/`, `setups/` | Docker e scripts de preparação. Ver [agent-setup.md](agent-setup.md) |
| `docs/prompts/` | Prompts usados para gerar o JSON de cada categoria |

## Fluxo de uma página

1. `generateStaticParams` em `app/[category]/[productId]/page.tsx` gera uma página por produto de `data/`.
2. O id da categoria na URL vem de `categories` (`lib/data.ts`), não do nome do arquivo: `smart-tvs` lê `data/smartvs.json`. O mapa completo está em `lib/admin/category-files.ts`.
3. Os botões de loja usam `productAffiliateHref`, que aponta para o redirect do dashboard de links.

## Fluxo do conteúdo

```text
painel /admin ──commit──▶ GitHub (data/*.json) ──push──▶ Vercel build
edição direta no git ───────────────────────────────────────┘
                                                             │
                              scripts/sync-links.ts (registra tudo no dashboard; falha = build falha)
                                                             ▼
                                                     site estático novo
```

- Toda alteração de produto é um commit. O site só muda depois do deploy seguinte.
- O build é o único ponto que registra links no dashboard, então cobre o painel e a edição direta.

## Decisões

| Decisão | Motivo |
| --- | --- |
| Conteúdo em JSON no repositório, sem banco | Histórico e rollback pelo git; site 100% estático |
| Painel grava por commit na API do GitHub | Mesmo fluxo da edição manual; nenhum armazenamento a mais |
| Sessão do painel em cookie assinado, sem banco | Só existe login com Google e uma lista de e-mails (`ADMIN_EMAILS`) |
| Links de afiliado só pelo dashboard | Contagem de cliques e troca de link morto sem rebuild |
| Desvio para a loja quando o dashboard cai | A venda não pode depender de outro serviço |
| Ficha técnica editada como JSON no painel | São 24 categorias com campos diferentes; um formulário por categoria não se paga |

## Limites conhecidos

- O painel não envia imagens: o campo de imagem recebe um endereço.
