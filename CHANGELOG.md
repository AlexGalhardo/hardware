# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.0] - 2026-10-11

### Added

- Admin panel at `/admin`: Google sign-in restricted to `ADMIN_EMAILS`, product list per category, create, edit and delete. Every change is a commit in the repository through the GitHub Contents API (local files in development).
- "Exportar produtos" buttons in the panel: every published product with its store links as JSON or CSV, in the format the links dashboard imports.
- `docs/` for AI agents (architecture, admin, tooling, testing, workflows, setup from zero), indexed in `.claude/agents.md`.
- `setups/` with four scripts (local and Docker, Unix and Windows) and `infra/` with a multi-stage Dockerfile and a compose file.

### Changed

- `/admin` and `/api` are blocked in `robots.txt` and answer with `X-Robots-Tag: noindex`.
- The generation prompts moved from `docs/` to `docs/prompts/`.

### Fixed

- The contact route created the e-mail client when the module loaded, so any build without `RESEND_API_KEY` failed. It now answers 503 when the key is missing.

## [1.2.0] - 2026-10-11

### Added

- Store buttons fall back to the store address when the links dashboard does not answer its health check.

### Changed

- The build identifies the site to the links dashboard by its address and uses the dashboard's shared key; `LINKS_DASHBOARD_TOKEN` is now that key.
- `bun run lint` passes with no errors and is part of `bun run ci`; explicit `any` is refused by Biome. The `pre-commit` hook runs the type check and the lint.
- The suggestion rows of the comparison page are real buttons, usable from the keyboard.

### Fixed

- The category-change effect of the comparison page read `updateUrl` before it was declared.
- The toast hook registered its listener again on every state change.

### Removed

- Unused duplicate `components/theme-provider.tsx`.

## [1.1.0] - 2026-10-11

### Added

- Links dashboard integration: store buttons point to the `links.lekzera.xyz` redirect, and every build registers the whole catalogue there (`scripts/sync-links.ts`, `LINKS_DASHBOARD_TOKEN`). The production build fails when the dashboard refuses.
- Tests for the dashboard contract and for the site catalogue (`bun test`).
- `typecheck`, `lint`, `lint:md`, `test` and `ci` scripts; commit message linting, markdownlint, `.editorconfig`, `.env.example`, `AGENTS.md`.
- Canonical URL on every category and product page.
- The sitemap now includes the `cafeteiras`, `impressoras` and `fechaduras` categories (56 pages were missing).

### Changed

- Dependencies updated to the latest stable releases and pinned to exact versions (Next.js 16.4, React 19.3, TypeScript 7).
- Type errors fail the build (`ignoreBuildErrors` removed).
- `README.md` rewritten.

### Fixed

- The site declared `tudohardware.br` as its canonical and Open Graph address; it is `tudohardware`.
- 26 duplicated product entries removed from `data/` (the first entry of each id was kept).
- `qcy-h3` had a category that does not exist, so its search result led to a 404.
- The product page no longer loads every product of the site for a prop that was not used.

### Security

- `.env` and `telegram/.env` are no longer tracked, and the Telegram bot token was removed from `README.md`. The token is still in the git history and must be revoked.

## [1.0.0] - 2026-07-01

Site as it was before this changelog started.

[Unreleased]: https://github.com/AlexGalhardo/tudohardware/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/AlexGalhardo/tudohardware/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/AlexGalhardo/tudohardware/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/AlexGalhardo/tudohardware/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/AlexGalhardo/tudohardware/releases/tag/v1.0.0
