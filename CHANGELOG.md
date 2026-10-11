# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/AlexGalhardo/tudohardware.com/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/AlexGalhardo/tudohardware.com/compare/42fadac...v1.1.0
[1.0.0]: https://github.com/AlexGalhardo/tudohardware.com/commit/42fadac
