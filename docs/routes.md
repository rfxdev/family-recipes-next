# Routes

Route architecture, URL conventions, and navigation behaviour for Kitchen Companion.

---

## Route Structure

Four distinct routes serving different user intents:

| Route                      | Purpose                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------- |
| `/recipes`                 | Homepage with category cards (no params)                                              |
| `/recipes?{filters}`       | Curated browsing via predefined categories — see [`recipe-views.md`](recipe-views.md) |
| `/recipes/search?q={term}` | Free-form search, optionally refined with filters                                     |
| `/recipes/{id}`            | Recipe detail — `id` doubles as URL slug                                              |

## URL Conventions

Filter param names match metadata field names directly (e.g. `cuisine`, `meal_type`). Multi-value selections use repeated params — not comma-separated:

| Pattern                      | Example                                   |
| ---------------------------- | ----------------------------------------- |
| Single value                 | `/recipes?cuisine=italian`                |
| Multi-value (OR within)      | `/recipes?cuisine=italian&cuisine=indian` |
| Multi-dimension (AND across) | `/recipes?cuisine=italian&meal_type=main` |

## Filter Logic

- **AND across dimensions** — `cuisine=italian&meal_type=main` returns only Italian mains
- **OR within a dimension** — `cuisine=italian&cuisine=indian` returns both cuisines
- Multi-value selections use `searchParams.getAll(key)` — repeated params, not comma-separated

---

## Navigation Behaviour

**Search preservation**

When searching from filtered browsing, active filters carry over:

- `/recipes?cuisine=italian` → search "pasta" → `/recipes/search?q=pasta&cuisine=italian`
- Makes sense: "search within Italian recipes"

**Menu navigation**

Menu items always clear existing filters (fresh curated experience):

- Clicking "Italian" from anywhere → `/recipes?cuisine=italian`
- Provides a clean starting point for curated browsing

---

## Shared Utilities

| Utility               | Location                                | Description                                  |
| --------------------- | --------------------------------------- | -------------------------------------------- |
| `applyRecipeParams`   | `app/_lib/utils/applyRecipeParams.ts`   | Orchestrates search → filter → sort          |
| `searchRecipes`       | `app/_lib/utils/searchRecipes.ts`       | Extracts `q`, whole-word matching            |
| `filterRecipes`       | `app/_lib/utils/filterRecipes.ts`       | Extracts category keys, metadata matching    |
| `sortRecipes`         | `app/_lib/utils/sortRecipes.ts`         | Immutable sort (title, date, or passthrough) |
| `computeFilterCounts` | `app/_lib/utils/computeFilterCounts.ts` | Faceted counting per filter dimension        |
| `buildRecipeUrl`      | `app/_lib/utils/buildRecipeUrl.ts`      | Generates filter URLs, handles multi-value   |

## Filter UI Components

| Component              | Where rendered                | Notes                                            |
| ---------------------- | ----------------------------- | ------------------------------------------------ |
| `DesktopFilters`       | Desktop sidebar, search route | Sort + FilterContent, immediate URL updates      |
| `FilterContent`        | Inside DesktopFilters         | Render-only: accordion checkboxes + clear button |
| `DesktopSort`          | Desktop sidebar               | Sort radio group, self-contained URL updates     |
| `MobileFilters`        | Mobile sticky trigger         | Opens FilterDrawer                               |
| `FilterDrawer`         | Mobile bottom sheet           | MobileFilterSections, immediate URL updates      |
| `MobileFilterSections` | Inside FilterDrawer           | Render-only: flat columns layout                 |
| `FilterPills`          | Mobile, above results         | Active filter pills with × remove                |
| `MobileSort`           | Mobile, search route          | Sort popover                                     |
| `useFilterState`       | Hook                          | Derives filter/section state from URL params     |

## Mobile vs Desktop

- **Desktop:** persistent sidebar, immediate URL updates on each interaction
- **Mobile:** drawer + pills, immediate URL updates on each toggle; "See Results" closes the drawer
- Same underlying filter logic and URL update pattern — different presentation only

## Result Count Philosophy

Counts in the sidebar and drawer reflect the current result set, not the global total:

- Searching "pasta" shows "Italian (12)" not "Italian (18)"
- Helps users understand what's available given their current query
