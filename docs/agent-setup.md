# Preparar o projeto do zero (guia para agentes)

Siga na ordem. Cada passo tem o comando e como conferir que deu certo. Não avance com um passo falhando.

## 1. Ferramentas

| Ferramenta | Conferir | Se faltar |
| --- | --- | --- |
| Bun 1.3 ou mais novo | `bun --version` | <https://bun.sh/docs/installation> |
| Git | `git --version` | <https://git-scm.com/downloads> |
| GitHub CLI | `gh auth status` mostra a conta logada | `gh auth login` (o dono faz o login interativo) |
| Vercel CLI | `vercel whoami` mostra a conta | `bun add -g vercel` e `vercel login` (o dono faz o login) |
| Docker (opcional) | `docker info` responde | Docker Desktop: <https://docs.docker.com/get-docker/> |

No Windows, rode os scripts pelo Git Bash.

## 2. Caminho rápido

```bash
bash setups/setup-windows-local.sh          # Windows (Git Bash)
bash setups/setup-unix-local.sh             # macOS, Linux, WSL
bash setups/setup-windows-with-docker.sh    # Docker no Windows
bash setups/setup-unix-with-docker.sh       # Docker no macOS, Linux, WSL
```

Opcionais: `PORT=<porta>`, `NO_START=1` (prepara e não sobe), `SKIP_CHECKS=1` (pula tipos e testes, só nos scripts locais).

O que os scripts fazem: conferem as ferramentas, instalam dependências, criam `.env` a partir de `.env.example` sem sobrescrever o que existe, preenchem `BETTER_AUTH_SECRET` e `BETTER_AUTH_URL` se estiverem vazios, escolhem outra porta se a pedida estiver ocupada, rodam tipos e testes e sobem o servidor. Rodar de novo é seguro.

**Conferir:** o script termina com `==> Pronto` ou `==> No ar em http://localhost:<porta>`, e a página abre.

## 3. Passo a passo manual

```bash
bun install --frozen-lockfile     # confere: termina sem erro e existe node_modules/
cp .env.example .env              # só se .env não existir
bun run typecheck                 # confere: sem saída de erro
bun run test                      # confere: "0 fail"
bun run dev                       # confere: http://localhost:3000 abre
```

Não há banco de dados nem seed: o conteúdo já está em `data/*.json`.

## 4. Variáveis de ambiente

Todas descritas em [`.env.example`](../.env.example). Nenhuma é obrigatória para o site público rodar em desenvolvimento.

Todo build começa por `bun run check-env` (`lib/env.ts`, zod):

- **Valor mal formado** (segredo do Google fora do formato, e-mail inválido, URL sem `http`): o build falha em qualquer ambiente.
- **Variável essencial ausente:** só falha no build de produção (`VERCEL_ENV=production`). Essenciais: `LINKS_DASHBOARD_TOKEN`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `ADMIN_EMAILS`, `GITHUB_TOKEN`, `GITHUB_REPO`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
- **Opcional:** `GITHUB_BRANCH` (padrão `main`).

A mensagem diz o nome da variável, nunca o valor.

| Variável | Para quê | Sem ela |
| --- | --- | --- |
| `LINKS_DASHBOARD_TOKEN` | Registrar os links no dashboard no build | Build de produção falha; os outros só validam |
| `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `ADMIN_EMAILS` | Login do painel | `/admin/login` lista as que faltam |
| `GITHUB_TOKEN`, `GITHUB_REPO`, `GITHUB_BRANCH` | Painel grava por commit | Em desenvolvimento, grava em `data/` local |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Formulário de `/contato` envia ao Telegram | O envio falha com aviso ao visitante |

Nunca imprima nem commite valores de `.env`.

## 5. Docker

```bash
docker compose -f infra/docker-compose.yml up --build -d   # confere: http://localhost:3000 responde
docker compose -f infra/docker-compose.yml logs -f
docker compose -f infra/docker-compose.yml down
```

`infra/Dockerfile` é multi-estágio, com imagem `oven/bun` de versão fixa e usuário sem privilégios. O build dentro da imagem não envia nada ao dashboard de links (não há chave).

## 6. Painel em desenvolvimento

1. Preencha `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` e `ADMIN_EMAILS` no `.env`.
2. No Google Cloud, o cliente OAuth precisa ter `http://localhost:3000/api/auth/callback/google` como URI de redirecionamento.
3. `bun run dev` e abra `/admin`. **Conferir:** depois do login aparece a lista de categorias.

Sem `GITHUB_TOKEN`, salvar um produto altera o arquivo em `data/` da sua cópia. Não commite alterações de teste.

## 7. GitHub

```bash
gh auth status                                     # conta logada
git remote -v                                      # origin = https://github.com/AlexGalhardo/tudohardware.git
```

Commits, versão e release: [workflows.md](workflows.md). Nunca use `git push --force` sem o dono pedir.

## 8. Vercel

```bash
vercel whoami                                      # conta do dono
vercel link --yes --project tudohardware-com       # cria .vercel/ (ignorado pelo git); apague o .env.local que ele gerar
vercel env ls production                           # nomes das variáveis de produção
printf '%s' "$VALOR" | vercel env add NOME production --sensitive   # definir uma variável sem expor o valor
vercel deploy --prod                               # deploy manual
```

Regras:

- Não leia nem imprima valores de variáveis de produção.
- Deploy de produção e mudança de variável só quando o dono pedir.
- **Conferir um deploy:** `vercel ls tudohardware-com` mostra `Ready`, e `https://alexgalhardo.github.io/tudohardware/smartphones/nokia-2.4` abre com o botão de loja apontando para `links.lekzera.xyz`.

O servidor MCP da Vercel, quando configurado no agente, faz as mesmas operações; prefira o CLI quando os dois existirem.

## 9. Conectar ao dashboard de links

Nada a cadastrar no dashboard. Defina `LINKS_DASHBOARD_TOKEN` na Vercel com a chave do dashboard (a variável `LINKS_API_KEY` do projeto do dashboard). No primeiro build de produção o dashboard cria o projeto `tudohardware` e recebe o catálogo.

**Conferir:** o log do build mostra `Links sincronizados com https://links.lekzera.xyz: <n> produtos`.

## Problemas comuns

| Sintoma | Causa e saída |
| --- | --- |
| `Catálogo inválido: ... id repetido` | Dois produtos com o mesmo `id` no mesmo arquivo de `data/`. Remova ou renomeie um |
| `Catálogo inválido: ... sem link de afiliado` | Produto sem nenhum endereço `https://` de loja |
| Build de produção: `Chave do dashboard ausente ou errada (401)` | `LINKS_DASHBOARD_TOKEN` diferente da `LINKS_API_KEY` do dashboard |
| Build de produção: `project_offline (409)` | O dashboard não conseguiu abrir `https://alexgalhardo.github.io/tudohardware` |
| Painel: "Defina GITHUB_TOKEN e GITHUB_REPO" | Variáveis ausentes na Vercel |
| Painel salvou e o site não mudou | O commit foi feito mas o deploy não disparou: confira a conexão do projeto com o repositório ([workflows.md](workflows.md)) |
| Porta ocupada | Os scripts escolhem a próxima livre; ou passe `PORT=<porta>` |
| Build: `Variáveis de ambiente com problema` | Corrija a variável citada. `GOOGLE_CLIENT_SECRET` inválido costuma ser outra variável colada na mesma linha do `.env` |
| Login com Google volta com `?error=invalid_code` | O Google recusou o segredo: `GOOGLE_CLIENT_SECRET` errado na Vercel |
