# Painel `/admin`

Gerencia os produtos do site. Nunca é indexado: `robots.txt` bloqueia `/admin` e `/api`, e as respostas levam `X-Robots-Tag: noindex`.

## Login

- Só com Google, via better-auth em modo sem banco: a sessão fica em um cookie assinado com `BETTER_AUTH_SECRET`.
- Só entram os e-mails de `ADMIN_EMAILS` (separados por vírgula), e só se o Google os marcar como verificados. A lista é conferida em toda requisição: tirar um e-mail bloqueia o dono na hora.
- Uma conta do Google fora da lista volta para o login com o aviso "não tem acesso".
- Sem `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` ou `ADMIN_EMAILS`, a página de login mostra quais variáveis faltam e o painel fica inacessível.
- URI de redirecionamento a cadastrar no Google Cloud: `<origem>/api/auth/callback/google` (produção: `https://alexgalhardo.github.io/tudohardware/api/auth/callback/google`).

Cada página do painel chama `requireAdmin()` por conta própria: o layout não protege os dados que a página carrega.

## Telas

| Caminho | O que faz |
| --- | --- |
| `/admin/login` | Botão "Entrar com Google" |
| `/admin` | Categorias com a contagem publicada e os botões de exportação |
| `/admin/<categoria>` | Produtos da categoria, lidos do armazenamento (já com o que foi salvo e ainda não publicado) |
| `/admin/<categoria>/novo` | Criar produto. A ficha técnica começa com os campos de outro produto da categoria, vazios |
| `/admin/<categoria>/<id>` | Editar ou excluir |

## Onde os dados são gravados

| Situação | Armazenamento |
| --- | --- |
| `GITHUB_TOKEN` e `GITHUB_REPO` definidos | Um commit por alteração em `data/<arquivo>.json`, na branch `GITHUB_BRANCH` (padrão `main`), pela API de conteúdo do GitHub |
| Sem o token, fora da Vercel | Arquivo local em `data/` (desenvolvimento). `DATA_ROOT` troca a pasta raiz, usado nos testes |
| Sem o token, na Vercel | O painel mostra o aviso para definir as variáveis; nada é gravado |

Mensagem do commit: `content: add|update|remove product <id> in|from <categoria> (<e-mail do admin>)`.

O site só reflete a alteração depois do deploy disparado pelo commit. Para isso o projeto da Vercel precisa estar conectado ao repositório (ver [workflows.md](workflows.md)).

## Regras de um produto

- `id`: minúsculas, números, hífen e ponto; único na categoria. Faz parte da URL e do id no dashboard de links: trocar muda o endereço da página e zera os cliques.
- `name`, `brand`, `image`: obrigatórios.
- `mercadolivreUrl`, `amazonUrl`, `shopeeUrl`: endereço `https://` ou vazio. Ao menos um é obrigatório, porque o build recusa produto sem link.
- `category` é sempre a da tela, qualquer que seja o valor enviado.
- Os demais campos (a ficha técnica) são guardados como enviados.
- Não é possível excluir o último produto de uma categoria.

Duas pessoas editando o mesmo arquivo: quem salvar depois recebe `409` e precisa recarregar. O controle é o hash do arquivo (`sha`) enviado junto com cada gravação.

## API do painel

Todas exigem sessão de admin (`401` sem ela).

| Método e caminho | O que faz |
| --- | --- |
| `GET /api/admin/products/<categoria>` | `{ products, sha }` |
| `POST /api/admin/products/<categoria>` | Cria. Corpo: `{ sha, product }` |
| `PUT /api/admin/products/<categoria>/<id>` | Atualiza. Corpo: `{ sha, product }` |
| `DELETE /api/admin/products/<categoria>/<id>` | Exclui. Corpo: `{ sha }` |
| `GET /api/admin/export?format=json\|csv` | Todos os produtos publicados com seus links, no formato de importação do dashboard de links |

Erros: `400` produto inválido (com `details`), `404` categoria ou produto inexistente, `409` arquivo alterado por outra edição, `502` falha do GitHub.

## Exportação

Os botões "Exportar produtos (JSON)" e "(CSV)" em `/admin` baixam o catálogo publicado:

| Formato | Conteúdo |
| --- | --- |
| JSON | Array de `{ externalId, name, pageUrl, category, links: [{ url, store }] }` |
| CSV | Cabeçalho `externalId,url,name,pageUrl,category,store`, uma linha por link |

É o mesmo conteúdo que o build envia ao dashboard, e o arquivo pode ser enviado em Projetos → "Importar JSON/CSV" de lá.
