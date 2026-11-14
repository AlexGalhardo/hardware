# Estilo de código

- Indentação com **tab de largura 4**, linha de até 120 colunas, aspas duplas. YAML usa 2 espaços (`.editorconfig`). O Biome aplica: `bun run format`.
- Biome 2 é o único formatador e linter de código (`biome.json`). Não adicione ESLint nem Prettier. `bun run lint` precisa passar sem erro.
- TypeScript estrito (`strict` no `tsconfig.json`). `any` explícito é erro do Biome: use `unknown` e estreite o tipo. Sem `@ts-ignore`. Um `biome-ignore` leva o motivo na mesma linha.
- React 19 só em ilhas (`client:*` no Astro); páginas e layouts são `.astro`.
- Link interno e imagem de `public/` passam por `withBase` (`lib/base.ts`): o site roda sob `/tudohardware` no Pages.
- React 19 só em ilhas (`client:*` no Astro); páginas e layouts são `.astro`.
- Link interno e imagem de `public/` passam por `withBase` (`lib/base.ts`): o site roda sob `/tudohardware` no Pages.
- Imports internos com o alias `@/...` (aponta para a raiz do repositório) ou caminho relativo, sem extensão.
- `lib/affiliate-catalogue.ts` é importado por componentes de cliente: não importe `lib/data.ts` nele, senão todos os JSON de `data/` entram no bundle do navegador.
- Estilo com Tailwind CSS 4; os tokens ficam em `astro/styles/globals.css`. Componentes de base em `components/ui/`.
- Comentários explicam o porquê, não o quê. Atalho consciente leva um comentário `ponytail:` dizendo o limite e quando evoluir.
- Código, comentários e commits em inglês; textos de interface e documentação em português do Brasil.
