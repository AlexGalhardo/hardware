# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.5.4] - 2026-10-11

### Fixed

- Table formatting in `.claude/skills/SOURCES.md` and in the project skills, which failed markdownlint in 1.5.3.

### Changed

- The `pre-commit` hook also runs markdownlint, so a Markdown error can no longer reach a release.

## [1.5.3] - 2026-10-11

### Changed

- `.claude/` adapted to this project. The rules and project skills had been copied from a SvelteKit blog and described posts, Markdown content and a release script that do not exist here; they now describe the product data, the admin panel and the manual release flow. `AGENTS.md` says which skills are loaded at session start and which per task.
- markdownlint also checks the project rules and project skills.

### Removed

- Skills `project-new-post` and `project-new-product-list` (replaced by `project-product`) and the vendored `graphify` skill, which nothing in this project uses.

## [1.5.2] - 2026-10-11

### Added

- Agent rules, skills, agents and reference checklists under `.claude/`, copied from the eletroradar.com.br project.

## [1.5.1] - 2026-10-11

### Changed

- Admin panel: the product photo appears beside the name in the category list and on the product page.

## [1.5.0] - 2026-10-11

### Added

- Environment check at the start of every build (`scripts/check-env.ts`, schema in `lib/env.ts`, zod 4): a malformed value always fails the build, and a production build fails when an essential variable is missing. Other builds need no variable.

### Changed

- An address that is not a page redirects to the home page: unknown top-level addresses in `proxy.ts`, unknown products in the product page. They used to answer 200 with the not-found screen.
- `bun run typecheck` generates the route types first, so it no longer depends on a previous build.

## [1.4.0] - 2026-10-11

### Removed

- Contact page, the contact e-mail route and the Resend integration (`resend` and `@react-email/components` dependencies, `RESEND_API_KEY`).
- Telegram offers bot (`telegram/`) and the build step that generated its CSV.

### Fixed

- `setups/_common.sh` appended a variable to `.env` without a line break when the file did not end with one, gluing it onto the last line. In this project that corrupted `GOOGLE_CLIENT_SECRET` and broke the Google sign-in with `invalid_code`. Covered by `setups/env.test.ts`.

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

- The site declared `tudohardware.com.br` as its canonical and Open Graph address; it is `tudohardware.com`.
- 26 duplicated product entries removed from `data/` (the first entry of each id was kept).
- `qcy-h3` had a category that does not exist, so its search result led to a 404.
- The product page no longer loads every product of the site for a prop that was not used.

### Security

- `.env` and `telegram/.env` are no longer tracked, and the Telegram bot token was removed from `README.md`. The token is still in the git history and must be revoked.

## [1.0.0] - 2026-07-01

Site as it was before this changelog started.

[Unreleased]: https://github.com/AlexGalhardo/tudohardware.com/compare/v1.5.4...HEAD
[1.5.4]: https://github.com/AlexGalhardo/tudohardware.com/compare/v1.5.3...v1.5.4
[1.5.3]: https://github.com/AlexGalhardo/tudohardware.com/compare/v1.5.2...v1.5.3
[1.5.2]: https://github.com/AlexGalhardo/tudohardware.com/compare/v1.5.1...v1.5.2
[1.5.1]: https://github.com/AlexGalhardo/tudohardware.com/compare/v1.5.0...v1.5.1
[1.5.0]: https://github.com/AlexGalhardo/tudohardware.com/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/AlexGalhardo/tudohardware.com/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/AlexGalhardo/tudohardware.com/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/AlexGalhardo/tudohardware.com/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/AlexGalhardo/tudohardware.com/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/AlexGalhardo/tudohardware.com/releases/tag/v1.0.0
