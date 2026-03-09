# Routes

Route architecture, URL conventions, and navigation behaviour for Kitchen Companion.

---

## Route Structure

Five distinct routes serving different user intents:

| Route                       | Purpose                                                                |
| --------------------------- | ---------------------------------------------------------------------- |
| `/recipes`                  | Homepage with category cards                                           |
| `/recipes/collections/{id}` | Curated collection page — title, description, and pre-filtered results |
| `/recipes/all`              | Browse all recipes without filtering                                   |
| `/recipes/search?q={term}`  | Free-form search, optionally refined with filters                      |
| `/recipes/{id}`             | Recipe detail — `id` doubles as URL slug                               |

Collections map to `CategoryItem` entries in `app/_config/recipes.ts`. Each item's `id` field is
used directly as the URL path param. IDs must be unique across all items in `CATEGORY_SECTIONS`,
not just within a single section.

## URL Conventions

Filter param names match metadata field names directly (e.g. `cuisine`, `meal_type`). Multi-value selections use repeated params — not comma-separated:

| Pattern                      | Example                                   |
| ---------------------------- | ----------------------------------------- |
| Single value                 | `/recipes?cuisine=italian`                |
| Multi-value (OR within)      | `/recipes?cuisine=italian&cuisine=indian` |
| Multi-dimension (AND across) | `/recipes?cuisine=italian&meal_type=main` |

Filter params are used internally by collection pages (via `applyRecipeParams`) and by the search
route. They are no longer used as the primary navigation destination — curated browsing goes via
`/recipes/collections/{id}`.

## Filter Logic

- **AND across dimensions** — `cuisine=italian&meal_type=main` returns only Italian mains
- **OR within a dimension** — `cuisine=italian&cuisine=indian` returns both cuisines
- Multi-value selections use `searchParams.getAll(key)` — repeated params, not comma-separated

---

## Navigation Behaviour

**Search preservation**

When searching from the search page, active filters carry over:

- `/recipes/search?q=pasta&cuisine=italian`
- Makes sense: "search within Italian recipes"

**Menu navigation**

Menu items link to collection pages for a clean, curated starting point:

- Clicking "Italian" → `/recipes/collections/italian`

---

## Shared Utilities

| Utility               | Location                                | Description                                                              |
| --------------------- | --------------------------------------- | ------------------------------------------------------------------------ |
| `applyRecipeParams`   | `app/_lib/utils/applyRecipeParams.ts`   | Orchestrates search → filter → sort                                      |
| `searchRecipes`       | `app/_lib/utils/searchRecipes.ts`       | Extracts `q`, whole-word case-insensitive match on title and description |
| `filterRecipes`       | `app/_lib/utils/filterRecipes.ts`       | Extracts category keys, metadata matching                                |
| `sortRecipes`         | `app/_lib/utils/sortRecipes.ts`         | Immutable sort (title, date, or passthrough)                             |
| `computeFilterCounts` | `app/_lib/utils/computeFilterCounts.ts` | Faceted counting per filter dimension                                    |
| `buildRecipeUrl`      | `app/_lib/utils/buildRecipeUrl.ts`      | Generates filter URLs, handles multi-value                               |

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
