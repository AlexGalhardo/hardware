---
name: project-product
description: Cria, edita ou remove um produto do site em data/*.json, direto no arquivo, respeitando as regras de id e de links de loja. Use quando pedirem um produto novo, a correção de uma ficha técnica, a troca de um link de afiliado ou uma categoria nova.
---

# Produto

Regras que não podem ser quebradas: [`.claude/rules/content.md`](../../rules/content.md). Leia as regras antes de editar.

## Direto no arquivo

1. Descubra o arquivo da categoria no mapa de `lib/data.ts` (o id da categoria na URL nem sempre é o nome do arquivo).
2. Edite `data/<arquivo>.json`. Para um produto novo, copie um produto da mesma categoria e troque os valores; campo sem valor fica `null`.
3. Valide o catálogo inteiro:

   ```bash
   bun run sync-links
   ```

   Sem `LINKS_DASHBOARD_TOKEN` o script só valida e não envia nada. "id repetido" e "sem link de afiliado" aparecem aqui.
4. Confira a página: `bun run dev` e abra `/<categoria>/<id>`.
5. Antes de entregar: `bun run ci`.

## Cuidados

- **Não troque o `id` de um produto publicado** sem o dono pedir: muda o endereço da página e apaga os cliques dele no dashboard de links.
- **Link de loja é o endereço da loja.** O redirect pelo dashboard é montado pelo site.
- **Remover um produto** tira a página do ar e o registro do dashboard no build seguinte. A categoria não pode ficar vazia.
- **Imagem** é um endereço (`https://` ou caminho em `public/`).

## Categoria nova

Siga a lista da última regra de `rules/content.md`. Depois rode `bun run ci`.

## Commit

Alteração feita direto no arquivo é um commit como qualquer outro (`feat:` para produto novo, `fix:` para correção) e segue a skill `project-release`.
