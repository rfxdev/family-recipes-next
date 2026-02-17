# CLAUDE.md

## Documentation

Comprehensive specs live in `docs/` — read these before making changes:

- `docs/roadmap.md` — Current phase and priorities
- `docs/data-model.md` — Database schemas and field definitions
- `docs/recipe-management.md` — Entry, editing, and import specs
- `docs/security-rules.md` — Firebase security and authentication
- `docs/design-system.md` — Colour tokens, badge variants, and component styling

These are platform-agnostic (shared with a planned Flutter app) — keep them in sync when making changes that deviate from the specs.

## Conventions

- **British English** in all UI text, comments, and documentation
- **Import alias:** `@/*` maps to `app/*`
- **Tailwind class merging** via `cn()` utility (clsx + tailwind-merge)
- **Single source of truth** — reuse existing constants, arrays, and types rather than duplicating values. Derive new constants from existing ones (e.g. `CATEGORY_FILTER_KEYS` is derived from `CATEGORY_SECTIONS`), never hardcode the same list in two places
- **Code organisation** — keep files focused on one concern:
  - `app/_config/` — static configuration data (routes, recipe category sections)
  - `app/_lib/utils/` — utility/helper functions (one function per file). Extract non-trivial logic from components into utils so it can be tested independently
  - `app/_lib/data/` — dummy/seed data
  - `app/_types/` — TypeScript interfaces and type unions
  - Don't mix types, config, and utils in one file — types go in `_types/`, helpers go in `_lib/utils/`
- **Comments** — prefer inline comments inside functions to explain non-obvious logic, rather than lengthy JSDoc blocks above the function. Keep the JSDoc summary to one line
- **UI components** — the `shadcn` CLI is not compatible with this project (no Babel). Install Radix UI primitives directly (`npm install @radix-ui/react-*`) and create the wrapper component in `app/_components/ui/` manually

## Workflow

Follow this order when developing features:

1. **Build the feature** — focus on working code, iterate until happy
2. **Code quality** — only run linting/formatting when asked, or if errors are blocking. Pre-commit hooks will catch issues. Do not run Prettier or ESLint after every change, and do not manually fix formatting issues via shell commands — use existing project tooling when needed
3. **Update documentation** — update any affected files in `docs/`, the README, and this file (CLAUDE.md)
4. **Tests** — write or update tests, iterate on the feature if issues surface
5. **Commit** — use conventional commits (feat:, fix:, docs:, chore:) enforced by commitlint
