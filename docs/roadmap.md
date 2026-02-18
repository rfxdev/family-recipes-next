# Roadmap

Development phases for the Kitchen Companion application.

---

## Phase 0: Foundation - Complete

- [x] Project documentation (README)
- [x] Next.js project structure with colocation strategy
- [x] TypeScript configuration with strict settings
- [x] Development tooling (ESLint, Prettier, Vitest, Husky, commitlint)
- [x] GitHub Actions for CI/CD
- [x] Dependabot for dependency updates

## Phase 1: Core Features (Dummy Data) - Complete

- [x] TypeScript interfaces (Recipe types)
- [x] Sample recipes in JSON format
- [x] App layout and navigation (Header component)
- [x] Recipe list page with grid layout
- [x] Recipe detail page with full recipe display
- [x] Deploy to Vercel

## Phase 2: Design & Discovery

### Route Architecture

**Three distinct pages:**

- `/recipes` — Homepage with category cards (no params)
- `/recipes?{filters}` — Curated browsing via predefined categories
- `/recipes/search?q={term}&{filters}` — Search results (optionally refined with filters)

**Shared utilities:**

- `applyRecipeParams(recipes, searchParams)` — orchestrates search then filter, used by both routes
- `searchRecipes(recipes, searchParams)` — extracts `q` param internally, free-text matching
- `filterRecipes(recipes, searchParams)` — extracts category params internally, metadata matching
- Filter UI components (sidebar on search route, drawer/pills planned)
- Sort logic — integrated into `applyRecipeParams`

---

### ✅ 2.0 Design Refresh

- [x] Apply warm colour palette from design system
- [x] Typography polish (headings, body text)
- [x] Spacing consistency
- [x] Layout and design system tokens

### ✅ 2.1 Component & Config Foundation

- [x] RecipeCard component
- [x] RecipeList component
- [x] RecipeCategoryCard component (homepage category cards with image)
- [x] Recipe config (`app/_config/recipes.ts`)
  - `CATEGORY_SECTIONS` array with id, title, order, showInMenu properties
  - Sections: cuisine, meal_type, dietary_restrictions (only values with matching recipes)
  - Each item has label, filter (key/value), and representative recipe image
  - Types (`CategorySection`, `CategoryItem`) in `app/_types/filters.ts`
- [x] `buildRecipeUrl(filters)` helper (`app/_lib/utils/buildRecipeUrl.ts`)
- [x] Routes config (`app/_config/routes.ts`)
  - URL params match metadata field names: `cuisine`, `meal_type`, `dietary_restrictions`

### ✅ 2.2 Recipe Homepage & Filtered Results

- [x] RecipeHomepage component (`app/recipes/_components/RecipeHomepage.tsx`)
  - Renders category sections sorted by order via `sortByOrder` utility
  - Each section: h2 heading + grid of RecipeCategoryCard components
  - "Browse All Recipes" link to `/recipes?all=true`
- [x] `app/recipes/page.tsx` conditional rendering
  - No params → `<RecipeHomepage />`
  - `?all` or any category filter → `<RecipeList />`
- [x] Config-driven filtering (`app/_lib/utils/filterRecipes.ts`)
  - Filter keys derived from `CATEGORY_SECTIONS` ids (`CATEGORY_FILTER_KEYS`)
  - Matches search params against recipe metadata (array fields use `.includes()`, scalars use equality)
  - All active filters combine with AND logic
- [x] Result count display and empty state

### ✅ 2.3 Search Route & Functionality

Build search as a separate route with distinct behaviour from curated browsing.

**Create Search Route**

- [x] Create `app/recipes/search/page.tsx`
- [x] Extract search params: `q` (required), filter params (optional)
- [x] Handle missing `q` param → redirect to `/recipes`

**Search Input (Global Header)**

- [x] Add search input to header component
  - Visible on all pages and screen sizes
  - Placeholder: "What would you like to cook?"
  - Submit navigates to `/recipes/search?q={term}`
  - Preserve any active category filters when searching from filtered view

**Search Implementation**

- [x] Create `searchRecipes(recipes, searchParams)` utility (`app/_lib/utils/searchRecipes.ts`)
  - Extracts `q` param internally
  - Search across: title, description, ingredient items, method steps
  - Case-insensitive whole-word matching (word boundaries prevent partial matches)
  - Short-circuits on first match per recipe
  - Returns all recipes if query is empty/whitespace

**Search + Filter Combination**

- [x] `applyRecipeParams(recipes, searchParams)` orchestrates search then filter
  - Both `searchRecipes` and `filterRecipes` receive `searchParams` and extract the params they need
  - Example: `/recipes/search?q=curry&cuisine=indian`
  - Both use AND logic
- [x] `RecipeList` and `SearchResults` both use `applyRecipeParams` — single entry point for URL param handling

**Search Results View**

- [x] Create SearchResults component (`app/recipes/search/_components/SearchResults.tsx`)
  - Reuses RecipeCard component
  - Shows "X results for 'query'" heading
  - Shows result count reflecting search + filters
  - Empty state: "No recipes found for 'query'"

**Implementation Notes:**

- Search route is distinct from curated browsing (`/recipes?cuisine=italian`)
- Shared components/utilities minimise duplication
- Clear semantic difference: search is free-form, filters are curated
- Header wrapped in `<Suspense>` in layout due to `useSearchParams()` usage

### ✅ 2.3.1 Mobile Search: Expandable Search Icon

- [x] Install `@radix-ui/react-collapsible` and create `app/_components/ui/collapsible.tsx` wrapper
- [x] Mobile: search icon button in header expands full-width input below nav bar
- [x] Desktop: no change — inline input always visible
- [x] On search results page (`/recipes/search`): input stays expanded with current query, no close button
- [x] Collapsible slide-down/slide-up animation via `data-state` attributes
- [x] Query syncs from URL params for browser back/forward support

### ✅ 2.4 Desktop Filter Sidebar

Persistent sidebar for refining search results on the search route only.

**Scope:** Search route (`/recipes/search?q=...`) only. Browse route (`/recipes?{filters}`) is unchanged.

**Filter Config**

- [x] `FILTER_SECTIONS` config in `app/_config/filters.ts` (separate from `CATEGORY_SECTIONS`)
  - Sections: cuisine, meal_type, dietary_restrictions, difficulty, time_category
  - `FilterSection`, `FilterItem`, and `SortValue` types in `app/_types/filters.ts`
  - `FILTER_KEYS` derived from section ids

**Sort Utility**

- [x] `sortRecipes(recipes, sortBy)` utility (`app/_lib/utils/sortRecipes.ts`)
  - Options: best-match (passthrough), title-asc, title-desc, newest, oldest
  - Immutable — returns new array
- [x] Integrated into `applyRecipeParams`: search → filter → sort

**Filter Utility Updates**

- [x] `filterRecipes` updated to use `FILTER_KEYS` (superset of `CATEGORY_FILTER_KEYS`)
  - Multi-select via `searchParams.getAll(key)`
  - AND across dimensions, OR within a dimension
- [x] `computeFilterCounts(recipes, filterKey)` utility for faceted counting

**DesktopFilters Component** (`app/_components/DesktopFilters.tsx`)

- [x] Sort section with radio buttons, synced with `?sort=` URL param
- [x] Collapsible accordion filter sections (all open by default)
- [x] Checkboxes with faceted counts (per-dimension counts exclude own active filters)
- [x] Immediate URL updates on check/uncheck and sort change
- [x] "Clear all filters" button — keeps `?q=term`, clears filter and sort params
- [x] Desktop only (`hidden lg:block`, `sticky top-8`, `w-64`)

**UI Components**

- [x] `app/_components/ui/accordion.tsx` — Radix Accordion wrapper
- [x] `app/_components/ui/radio-group.tsx` — Radix Radio Group wrapper

**Integration**

- [x] `SearchResults.tsx` updated with flex layout and sidebar
- [x] Grid adjusted: `sm:grid-cols-2 xl:grid-cols-3` to account for sidebar width

### ✅ 2.5 Mobile Filter Drawer & Pills

Mobile-specific filter UI with visibility layer on the search route.

**Shared Filter Infrastructure**

- [x] Extract `FilterContent` component (`app/recipes/search/_components/FilterContent.tsx`)
  - Render-only: accordion filter sections + clear button (no sort)
  - Receives all state via props — no hooks, no URL access
  - Used by `DesktopFilters` only
- [x] Extract `useFilterState` hook (`app/_lib/hooks/useFilterState.ts`)
  - Derives faceted counts, active filters, and section data from URL search params
  - Shared by `DesktopFilters`, `MobileFilters`, and `FilterDrawer`
- [x] Refactor `DesktopFilters` to delegate rendering to `FilterContent`

**UI Primitives**

- [x] Install `@radix-ui/react-dialog`
- [x] Install `vaul` — replaces Radix Dialog as the drawer primitive
- [x] Create `app/_components/ui/drawer.tsx` — bottom-sheet drawer built on vaul
  - Slide-up from bottom, drag handle, backdrop overlay, close button in header
- [x] Install `@radix-ui/react-popover`
- [x] Create `app/_components/ui/popover.tsx` — Radix Popover wrapper

**Filter Pills Component**

- [x] Create FilterPills component (`app/recipes/search/_components/FilterPills.tsx`)
- [x] Show below search/above results (mobile only, `lg:hidden`)
- [x] Active filter pills with × remove button
  - Format: "Italian ×", "Vegetarian ×", "Quick ×"
  - Styled `bg-accent-foreground text-background` (brick red, white text)
  - Click × updates URL (removes single filter value)
- [x] Horizontally scrollable pill row

**Mobile Sort**

- [x] Create MobileSort component (`app/recipes/search/_components/MobileSort.tsx`)
- [x] Popover trigger showing current sort label + sort icon
- [x] Popover lists all sort options with checkmark on active selection
- [x] Immediate URL update on selection (no batching)
- [x] Shown on mobile only (wrapped in `lg:hidden` in `SearchResults`)

**Desktop Sort**

- [x] Create DesktopSort component (`app/recipes/search/_components/DesktopSort.tsx`)
- [x] Sort radio group, self-contained URL updates
- [x] Rendered as sibling above `FilterContent` inside `DesktopFilters`

**Mobile Filters**

- [x] Create MobileFilters component (`app/recipes/search/_components/MobileFilters.tsx`)
- [x] Mobile only (`lg:hidden`), fixed at bottom of viewport
- [x] Badge count: "Filters (3)" when active
- [x] Opens drawer on click

**Mobile Filter Sections Component**

- [x] Create `MobileFilterSections` component (`app/recipes/search/_components/MobileFilterSections.tsx`)
  - Render-only: flat sections with no accordions
  - Sections flow in two columns (`columns-2`) with `break-inside-avoid` per section
  - Each item: checkbox + label + inline count in parentheses
  - Receives all state via props — no hooks, no URL access

**Filter Drawer Component**

- [x] Create FilterDrawer component (`app/recipes/search/_components/FilterDrawer.tsx`)
- [x] Bottom drawer (mobile), filter management only (no sort)
- [x] Renders `MobileFilterSections` — flat layout, no accordions
- [x] URL-derived state via `useFilterState` — no local filter state, no re-sync on open
- [x] Immediate URL updates on each checkbox toggle (same pattern as `DesktopFilters`)

**Drawer Actions**

- [x] "See Results" button (primary) — closes drawer; results already reflect URL state
- [x] "Clear all filters" button (secondary, outline) — removes filter params, preserves `q` and `sort`
- [x] Close on backdrop click or drag handle

**Integration**

- [x] `SearchResults.tsx` updated: `FilterPills` above results, results count + `MobileSort` on same row, `MobileFilters` trigger fixed at bottom

**Implementation Notes:**

- Sort is a distinct concern from filtering — kept in separate components (`DesktopSort`, `MobileSort`)
- Desktop sort and filters update URL immediately; mobile filters are batched via drawer
- `FilterContent` is render-only for filter sections only — sort is never passed through it

### 2.6 Header Menu Updates

Curated navigation entry points (distinct from search).

**Mobile Menu (Hamburger)**

- [ ] Add "Recipes" accordion item
- [ ] Sections from `CATEGORY_SECTIONS` where `showInMenu === true`
  - "By Cuisine" → British, Chinese, French, Indian, Italian, Moroccan
  - "By Meal Type" → Breakfast, Main, Pudding
  - "By Dietary" → Vegetarian, Vegan, Gluten-Free
- [ ] Links to `/recipes?{filter}` via `buildRecipeUrl()`
  - Clears any existing filters (fresh curated experience)
- [ ] "Recipes" top-level → `/recipes` (homepage)

**Desktop Menu (Mega Dropdown)**

- [ ] Dropdown on "Recipes" nav item
- [ ] Three-column layout from `CATEGORY_SECTIONS`
- [ ] Same category links as mobile
- [ ] Closes on link click or outside click
- [ ] "Recipes" nav link → `/recipes`

**Interaction with Search**

- [ ] Clicking menu category clears active search
  - If on `/recipes/search?q=curry`, clicking "Italian" → `/recipes?cuisine=italian`
- [ ] Menu provides fresh start for curated browsing

### 2.7 Empty States & Polish

Context-aware empty states for different scenarios.

**Filtered Browsing Empty States** (`/recipes?{filters}`)

- [ ] No results with filters
  - "No recipes match these filters"
  - "Try removing some filters"
  - "Clear filters" button → `/recipes`

**Search Empty States** (`/recipes/search`)

- [ ] Search with no results (no filters)
  - "No recipes found for 'curry'"
  - "Try a different search term"
  - Input to try new search

- [ ] Search + filters with no results
  - "No recipes found for 'curry' with these filters"
  - "Try a different search term or fewer filters"
  - Clear search button → `/recipes`
  - Clear filters button → `/recipes/search?q=curry`

**Result Count Display**

- [ ] Filtered browsing: "8 recipes"
- [ ] Search: "12 results for 'curry'"
- [ ] Both reflect combined state

### 2.8 Testing & Polish

Comprehensive testing across both routes.

**Route Behaviour**

- [ ] `/recipes` → homepage (no params)
- [ ] `/recipes?cuisine=italian` → filtered browsing
- [ ] `/recipes?cuisine=italian&cuisine=indian` → multi-select works
- [ ] `/recipes/search` (no q param) → redirects to `/recipes`
- [ ] `/recipes/search?q=curry` → search results
- [ ] `/recipes/search?q=curry&cuisine=indian` → search + filters

**Filter Combinations** (both routes)

- [ ] Single filter
- [ ] Multi-select within dimension
- [ ] Multi-dimension filters
- [ ] Clear filters from sidebar vs pills vs drawer
- [ ] URL direct access
- [ ] Invalid filter values gracefully ignored

**Search Specific**

- [ ] Search from homepage
- [ ] Search from filtered browsing (preserves filters)
- [ ] Search then add filters
- [ ] Clear search (keeps filters on search route)
- [ ] Clear filters (keeps search term)

**Navigation Flows**

- [ ] Homepage → category card → filtered browsing
- [ ] Filtered browsing → search (filters carry over)
- [ ] Search → menu category → filtered browsing (clears search)
- [ ] Browser back/forward across routes

**Responsiveness**

- [ ] Sidebar (desktop only, both routes)
- [ ] Drawer (mobile only, both routes)
- [ ] Pills (mobile only, both routes)
- [ ] Search input (all screens)
- [ ] Results grid (1/2/3 columns based on viewport)
- [ ] Homepage category cards

**Interaction Polish**

- [ ] Keyboard navigation (checkboxes, search input, menu)
- [ ] Focus states (checkboxes, buttons, links)
- [ ] Loading states if needed (probably not with client-side filtering)
- [ ] Smooth transitions (drawer slide, accordion expand)

**URL & Sharing**

- [ ] URLs are shareable
- [ ] Browser back/forward works
- [ ] Bookmarking works correctly
- [ ] URL is readable (`cuisine=italian` not `c=it`)

---

## Architecture Decisions

**Route Separation**

- `/recipes` — Homepage only, no params
- `/recipes?{filters}` — Curated browsing via predefined categories
- `/recipes/search?q={term}` — Free-form search, optionally refined

**Shared Utilities**

- `applyRecipeParams(recipes, searchParams)` — orchestrates search + filter, used by both routes
- `searchRecipes(recipes, searchParams)` — extracts `q`, whole-word matching
- `filterRecipes(recipes, searchParams)` — extracts category keys, metadata matching
- `sortRecipes(recipes, sortBy)` — immutable sort by title, date, or passthrough
- `computeFilterCounts(recipes, filterKey)` — faceted counting per filter dimension
- `buildRecipeUrl(filters)` — generates filter URLs
- FilterContent — render-only filter UI for desktop (accordion checkboxes + clear button, no sort)
- MobileFilterSections — render-only filter UI for drawer (flat columns layout, checkboxes + inline counts)
- DesktopSort — desktop sort radio group, self-contained URL updates
- DesktopFilters — desktop sidebar (DesktopSort + FilterContent, immediate URL updates)
- MobileSort — mobile sort popover, self-contained URL updates
- MobileFilters — mobile sticky trigger + FilterDrawer
- FilterDrawer — mobile bottom-sheet drawer (MobileFilterSections, immediate URL updates, two footer CTAs)
- FilterPills — mobile active filter pill row with removal
- useFilterState — shared hook deriving filter/section state from URL params

**Search Preservation**

When searching from filtered browsing, filters carry over:

- `/recipes?cuisine=italian` → search "pasta" → `/recipes/search?q=pasta&cuisine=italian`
- Makes sense: "search within Italian recipes"

**Menu Navigation**

Menu items always clear existing filters (fresh curated experience):

- Clicking "Italian" from anywhere → `/recipes?cuisine=italian`

**Mobile vs Desktop**

- Desktop: persistent sidebar, immediate URL updates
- Mobile: drawer + pills, immediate URL updates on each toggle; "See Results" closes the drawer
- Same underlying filter logic, same URL update pattern — different presentation only

**Result Count Philosophy**

Counts in sidebar/drawer reflect current result set:

- Example: searching "pasta" shows "Italian (12)" not "Italian (18)"
- Helps users understand what's available given their current query

**Future Flexibility**

"Collections" could be `/recipes/collections/{slug}` with pre-configured filters:

- Example: `/recipes/collections/quick-weeknight-dinners`
- Collections route would also use shared filter/sort utilities

## Phase 3: Firebase Integration & Recipe Management

Backend integration and CRUD functionality.

- [ ] Firebase setup and configuration (demo + production projects)
- [ ] Authentication (admin-managed users)
- [ ] Firestore integration (replace dummy data)
- [ ] Error boundaries for data-fetching routes (search, filtered browsing, recipe detail)
- [ ] Create, edit, and delete recipes via forms
- [ ] Image upload and storage
- [ ] Security rules deployment

## Phase 4: Recipe Features

Import methods and user experience improvements.

- [ ] URL import (schema.org structured data)
- [ ] Camera scanning / OCR import
- [ ] Favourites

## Phase 5: Meal Planning & Extensions

Build incrementally: meal planner → shopping list → meal tracker.

- [ ] Meal planner (assign recipes to dates/meal slots)
- [ ] Shopping list generation from planned meals
- [ ] Meal history tracker with usage statistics
- [ ] Discovery prompts (try new recipes, revisit favourites)

## Phase 6: Flutter Mobile App - Future

- [ ] Flutter app with Material Design
- [ ] Shared Firebase backend with web app
- [ ] Native camera integration for recipe scanning
- [ ] iOS and Android support
- [ ] Offline support with local caching
