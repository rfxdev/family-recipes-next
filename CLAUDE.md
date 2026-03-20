# CLAUDE.md

@AGENTS.md

## Documentation

Comprehensive specs live in `docs/` — **read the relevant doc(s) before starting any task**. Known patterns, gotchas, and conventions are documented there; re-discovering them from first principles wastes time and causes regressions.

- `docs/roadmap.md` — Current phase and priorities. Items describe user-facing features and behaviour — not components, utilities, or config. No implementation detail.
- `docs/data-model.md` — Database schemas and field definitions
- `docs/recipe-management.md` — Entry, editing, and import specs
- `docs/recipe-views.md` — Browse groups, category children, and homepage structure
- `docs/routes.md` — URL conventions and filter param patterns
- `docs/security-rules.md` — Firebase security and authentication
- `docs/design-system.md` — Colour tokens, badge variants, component styling, and Radix/Tailwind patterns
- `docs/style-guide.md` — Recipe presentation and writing style conventions

**Where to document new learnings:** `docs/` is the default for anything useful to both humans and Claude — patterns, conventions, gotchas, design decisions. CLAUDE.md is reserved for instructions that are Claude-specific (workflow, tool use, repo conventions). When in doubt, prefer `docs/`.

## Conventions

- **British English** in all UI text, comments, and documentation
- **Import alias:** `@/*` maps to `app/*`
- **Type imports** — use a separate `import type { Foo }` statement for type-only imports (not inline `import { type Foo }`). Enforced by ESLint.
- **Import ordering** — enforced alphabetically by `eslint-plugin-perfectionist`; the linter will auto-fix ordering, so don't manually rearrange.
- **Tailwind class merging** via `cn()` utility (clsx + tailwind-merge)
- **CSS utilities and variables over repeated values** — when the same layout or colour value is needed in multiple files, extract it. Shared layout patterns belong in a `@utility` in `globals.css` (e.g. `page-container`); colour values belong in CSS variables in `:root` (e.g. `--footer-*`). Never hardcode `oklch(...)` values directly in components — define a named variable in `globals.css` and reference it.
- **Component variants** via `cva()` from `class-variance-authority` — use this when a component has multiple visual variants (see `app/_components/ui/badge.tsx`). Prefer adding a `variant` prop over passing style overrides via `className` when working with primitive wrappers — tailwind-merge cannot reliably deduplicate CSS variable colour classes, and `asChild` slot boundaries don't merge classes at all. See `docs/design-system.md` for the full reasoning.
- **Single source of truth** — reuse existing constants, arrays, and types rather than duplicating values. Derive new constants from existing ones, never hardcode the same list in two places
- **Code organisation** — keep files focused on one concern:
  - `app/_config/` — static configuration data (routes, category sections, filter sections, sort options, navigation links). If a component contains a hardcoded static array or object, move it here — especially if it could be reused or extended elsewhere.
  - `app/_lib/utils/` — utility/helper functions (one function per file). Extract non-trivial logic from components into utils so it can be tested independently
  - `app/_lib/hooks/` — custom React hooks (one hook per file)
  - `app/_lib/data/` — dummy/seed data
  - `app/_types/` — TypeScript interfaces and type unions. Split by concern: `recipe.ts` for the data model, `filters.ts` for filter/browse/sort display types
  - Don't mix types, config, and utils in one file — types go in `_types/`, helpers go in `_lib/utils/`
- **Comments** — prefer inline comments inside functions to explain non-obvious logic, rather than lengthy JSDoc blocks above the function. Keep the JSDoc summary to one line
- **UI components** — `app/_components/ui/` contains shadcn/Radix primitive wrappers only. Use `npx shadcn add <component>` where a recipe exists, or import directly from the `radix-ui` package (already installed — all primitives available as namespace exports, e.g. `import { Collapsible } from 'radix-ui'`) and create the wrapper manually. Do not put bespoke application components here — see `docs/design-system.md` for full details. **Never bypass a wrapper to use primitives directly** — if a wrapper doesn't support a variation (e.g. `DrawerContent` needing a `direction` prop), extend the wrapper to be configurable rather than importing from the primitive library in application code. Before building a custom UI pattern (toggles, tabs, selects, etc.), run `npx shadcn add <component>` first — shadcn covers most common patterns and provides accessibility for free. When introducing a component, check whichever of these sources are relevant — not all components exist in both:
  - `https://ui.shadcn.com/docs/components/<name>` — API and code examples
  - `https://www.shadcn.io/ui/<name>` — implementation advice and best practices
  - `https://www.radix-ui.com/primitives/docs/components/<name>` — primitive API, accessibility, and keyboard behaviour
- **Push variant logic down** — if a parent branches on a prop to pick between two child components, that branching belongs in the child. The parent should pass data and let the child decide how to render.
- **No raw `<button>` elements** — always use `Button` from `@/_components/ui/button`. Use `variant` for colour (`accent`, `ghost`, `ghost-accent`, `link`, `outline`, etc.) and `className` to override radius (e.g. `className="rounded-full"` for pill shapes).

## Workflow

- **Pre-write security hook** — `security_reminder_hook.py` scans file content for security-sensitive terms and can block the `Write` tool on false positives. Known trigger: food words that match Python serialisation library names (e.g. a condiment description). Rephrase the offending word to unblock.

Follow this order when developing features:

1. **Build the feature** — focus on working code, iterate until happy
2. **Code quality** — only run linting/formatting when asked, or if errors are blocking. Pre-commit hooks will catch issues. Do not run Prettier or ESLint after every change, and do not manually fix formatting issues via shell commands — use existing project tooling when needed. **TypeScript diagnostics in the IDE are often stale** — verify with `npx tsc --noEmit` before acting on them.
3. **Update documentation** — update any affected files in `docs/`, the README, and this file (CLAUDE.md)
4. **Tests** — write or update tests, iterate on the feature if issues surface
   - Test files live co-located with source in `app/_lib/utils/` (e.g. `foo.test.ts` next to `foo.ts`)
   - Vitest `globals: true` — no need to import `describe`, `it`, or `expect`
   - `pre-push` hook runs the full test suite; failing tests will block a push
5. **Commit** — use conventional commits (feat:, fix:, docs:, chore:) enforced by commitlint
