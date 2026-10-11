# Production image of the site. Build from the repository root:
#   docker build -f infra/Dockerfile -t tudohardware .
FROM oven/bun:1.4.2 AS build

WORKDIR /app

# Dependencies first: this layer is reused while package.json and bun.lock do not change.
# --ignore-scripts skips the husky "prepare" hook, which needs a git checkout.
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

# Without LINKS_DASHBOARD_TOKEN the build only validates the links catalogue and sends nothing.
RUN bun run build

FROM oven/bun:1.4.2 AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# The panel writes to data/ when no GitHub token is set, so the app files belong to the unprivileged user.
COPY --from=build --chown=bun:bun /app /app
USER bun

EXPOSE 3000
CMD ["bun", "run", "next", "start", "--hostname", "0.0.0.0", "--port", "3000"]
