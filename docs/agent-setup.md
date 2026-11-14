# Preparar o projeto

Requisitos: [Bun](https://bun.sh) 1.4 e, opcionalmente, Docker.

```bash
bun install            # dependências e hooks do git (husky)
cp .env.example .env   # opcional: só LINKS_DASHBOARD_TOKEN e BASE_PATH
bun run dev            # http://localhost:4321/tudohardware
```

- Sem `.env` o projeto builda: o `sync-links` só valida o catálogo.
- Para servir na raiz, use `BASE_PATH=/ bun run dev`.
- Docker: ver [tooling.md](tooling.md#docker).
- Pages: Settings → Pages → Source: GitHub Actions.
- Release: crie a variável `DOCKERHUB_USERNAME` e o segredo `DOCKERHUB_TOKEN` no repositório.
