# Conteúdo: produtos

O conteúdo do site são os arquivos `data/*.json`: um array de produtos por categoria. Não há banco. Passo a passo para criar ou editar: skill `project-product`. Aqui ficam só as regras.

- Cada produto vira a página `/<categoria>/<id>`. A categoria da URL é o id de `categories` em `lib/data.ts`, não o nome do arquivo: `smart-tvs` lê `data/smartvs.json`.
- O `id` é único dentro da categoria e não muda depois de publicado. Ele faz parte da URL e do id do produto no dashboard de links (`https://alexgalhardo.github.io/tudohardware/<categoria>/<id>`): trocar muda o endereço da página e apaga o histórico de cliques. Id repetido falha o build.
- Formato do `id`: minúsculas, números, hífen e ponto.
- `name`, `brand` e `image` são obrigatórios.
- `mercadolivreUrl`, `amazonUrl` e `shopeeUrl` guardam o endereço real da loja, com `https://`, ou `null`. Ao menos um é obrigatório: o build recusa produto sem link. Nunca escreva o endereço do dashboard de links no JSON; o site o monta.
- `category` do produto é o id da categoria. Valor diferente quebra o link do resultado da busca.
- Os demais campos são a ficha técnica da categoria (`lib/specs/`). Campo sem valor fica `null`.
- Edição direta no arquivo segue estas regras; `bun run sync-links` valida o catálogo inteiro.
- Não é possível deixar uma categoria sem produtos.
- Categoria nova: arquivo em `data/`, entrada em `categories` e no mapa de `lib/data.ts` e em `categoryFileMap` de `scripts/create-sitemap.ts`, mais os tipos em `lib/types.ts` e `lib/specs/`.
