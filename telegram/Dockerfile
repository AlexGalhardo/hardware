FROM oven/bun:1.1.38-alpine

WORKDIR /app

COPY package.json bun.lockb* ./

RUN bun install --frozen-lockfile --production

COPY . .

COPY produtos.csv ./produtos.csv

CMD ["bun", "run", "index.ts"]