# CLAUDE.md

## Documentation

Comprehensive specs live in `docs/` — read these before making changes:

- `docs/roadmap.md` — Current phase and priorities
- `docs/data-model.md` — Database schemas and field definitions
- `docs/recipe-management.md` — Entry, editing, and import specs
- `docs/security-rules.md` — Firebase security and authentication
- `docs/design-system.md` — Colour tokens, badge variants, and component styling
- `docs/style-guide.md` — Recipe presentation and writing style conventions

These are platform-agnostic (shared with a planned Flutter app) — keep them in sync when making changes that deviate from the specs.

## Conventions

- **British English** in all UI text, comments, and documentation
- **Import alias:** `@/*` maps to `app/*`
- **Type imports** — use a separate `import type { Foo }` statement for type-only imports (not inline `import { type Foo }`). Enforced by ESLint.
- **Import ordering** — enforced alphabetically by `eslint-plugin-perfectionist`; the linter will auto-fix ordering, so don't manually rearrange.
- **Tailwind class merging** via `cn()` utility (clsx + tailwind-merge)
- **Component variants** via `cva()` from `class-variance-authority` — use this when a component has multiple visual variants (see `app/_components/ui/badge.tsx`)
- **Single source of truth** — reuse existing constants, arrays, and types rather than duplicating values. Derive new constants from existing ones (e.g. `CATEGORY_FILTER_KEYS` is derived from `CATEGORY_SECTIONS`), never hardcode the same list in two places
- **Code organisation** — keep files focused on one concern:
  - `app/_config/` — static configuration data (routes, category sections, filter sections, sort options)
  - `app/_lib/utils/` — utility/helper functions (one function per file). Extract non-trivial logic from components into utils so it can be tested independently
  - `app/_lib/hooks/` — custom React hooks (one hook per file)
  - `app/_lib/data/` — dummy/seed data
  - `app/_types/` — TypeScript interfaces and type unions. Split by concern: `recipe.ts` for the data model, `filters.ts` for filter/browse/sort display types
  - Don't mix types, config, and utils in one file — types go in `_types/`, helpers go in `_lib/utils/`
- **Comments** — prefer inline comments inside functions to explain non-obvious logic, rather than lengthy JSDoc blocks above the function. Keep the JSDoc summary to one line
- **UI components** — `app/_components/ui/` contains shadcn/Radix primitive wrappers only. Use `npx shadcn add <component>` where a recipe exists, or import directly from the `radix-ui` package (already installed — all primitives available as namespace exports, e.g. `import { Collapsible } from 'radix-ui'`) and create the wrapper manually. Do not put bespoke application components here — see `docs/design-system.md` for full details.
- **No raw `<button>` elements** — always use `Button` from `@/_components/ui/button`. Use `variant` for colour (`accent`, `ghost`, `ghost-accent`, `link`, `outline`, etc.) and `className` to override radius (e.g. `className="rounded-full"` for pill shapes).

## Workflow

Follow this order when developing features:

1. **Build the feature** — focus on working code, iterate until happy
2. **Code quality** — only run linting/formatting when asked, or if errors are blocking. Pre-commit hooks will catch issues. Do not run Prettier or ESLint after every change, and do not manually fix formatting issues via shell commands — use existing project tooling when needed
3. **Update documentation** — update any affected files in `docs/`, the README, and this file (CLAUDE.md)
4. **Tests** — write or update tests, iterate on the feature if issues surface
   - Test files live co-located with source in `app/_lib/utils/` (e.g. `foo.test.ts` next to `foo.ts`)
   - Vitest `globals: true` — no need to import `describe`, `it`, or `expect`
   - `pre-push` hook runs the full test suite; failing tests will block a push
5. **Commit** — use conventional commits (feat:, fix:, docs:, chore:) enforced by commitlint
