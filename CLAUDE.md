# CLAUDE.md

## Documentation

Comprehensive specs live in `docs/` — read these before making changes:

- `docs/roadmap.md` — Current phase and priorities
- `docs/data-model.md` — Database schemas and field definitions
- `docs/recipe-management.md` — Entry, editing, and import specs
- `docs/security-rules.md` — Firebase security and authentication

These are platform-agnostic (shared with a planned Flutter app) — keep them in sync when making changes that deviate from the specs.

## Conventions

- **British English** in all UI text, comments, and documentation
- **Import alias:** `@/*` maps to `app/*`
- **Tailwind class merging** via `cn()` utility (clsx + tailwind-merge)

## Workflow

Follow this order when developing features:

1. **Build the feature** — focus on working code, iterate until happy
2. **Code quality** — only run linting/formatting when asked, or if errors are blocking. Pre-commit hooks will catch issues. Do not run Prettier or ESLint after every change
3. **Update documentation** — update any affected files in `docs/`, the README, and this file (CLAUDE.md)
4. **Tests** — write or update tests, iterate on the feature if issues surface
5. **Commit** — use conventional commits (feat:, fix:, docs:, chore:) enforced by commitlint
