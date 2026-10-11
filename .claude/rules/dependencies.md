# Dependências

- Toda dependência usa a **última versão estável** publicada, com **versão exata** no `package.json`. Nada de `^`, `~`, `latest`, `beta`, `rc`, `canary` ou `next`.
- Descubra a versão no registry antes de instalar: `npm view <pacote> version`. Não confie na memória.
- Instale com `bun add --exact <pacote>@<versão>`. O gerenciador é o Bun e o único lockfile é o `bun.lock`.
- Pacote novo só com aprovação do dono, e só depois de subir a escada da skill `ponytail`: já existe no projeto, a biblioteca padrão resolve, a plataforma resolve, algumas linhas resolvem?
- Exceção à última versão: quando ela não é aceita pelos `peerDependencies` de outro pacote, use a mais nova que é aceita e registre o motivo na tabela abaixo.
- Imagem Docker segue a mesma regra: tag de versão fixa (`infra/Dockerfile` usa `oven/bun`).

## Versões seguradas de propósito

Nenhuma. Todos os pacotes estão na última versão estável.
