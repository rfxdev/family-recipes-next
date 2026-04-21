# Recipe Views

The recipes section is organised into named groups, each containing browsable views. The same structure drives both the homepage and the navigation — groups are section headings, children are clickable entry points that lead to a filtered recipe list.

Groups and their children appear on the homepage in the order defined below. Children with no matching recipes are hidden automatically (see [Config & Visibility](#config--visibility)).

For field definitions and allowed values, see [`data-model.md`](data-model.md). For URL conventions and filter logic, see [`routes.md`](routes.md).

---

## Groups & Children

### Pick Your Pace

Computed views based on combinations of `time_category`, `difficulty`, and optionally `meal_type`. Designed to answer the everyday question of how much effort you want to invest.

| Child             | time_category  | difficulty  | meal_type |
| ----------------- | -------------- | ----------- | --------- |
| Weeknight Winners | quick          | easy        | main      |
| Worth the Effort  | medium or long | moderate    |           |
| Weekend Project   | long           | challenging |           |

### In the Mood For

Browsing by dish style — the form or character of the dish rather than its cuisine or protein. Maps to the `dish_style` metadata field.

- Crispy Fried
- Curry
- Noodles
- Pancakes
- Pasta
- Pie
- Pizza
- Rice Dish
- Roast
- Salad
- Sandwich
- Soup
- Stew & Casserole
- Stir Fry

### How Do You Want to Cook It?

Browsing by the primary cooking equipment or technique. Maps to the `cooking_method` metadata field (single-select). Omit for recipes where standard hob or oven cooking is assumed.

- Slow Cooker
- Traybake
- One Pot
- Air Fryer
- Pressure Cooker
- Grill
- Smoker

### Meal Type

Browsing by when in a meal the dish is served. Maps to the `meal_type` metadata field.

- Breakfast
- Main
- Side
- Pudding
- Snack
- Appetiser
- Drink
- Condiment

### Cuisine

Browsing by national cuisine. Maps to the `cuisine` metadata field.

- American
- British
- Chinese
- French
- Greek
- Indian
- Italian
- Japanese
- Mexican
- Moroccan
- Spanish
- Thai
- Turkish

### By Ingredient

Browsing by the star protein — the ingredient the dish is built around. Maps to the `proteins` metadata field. Supporting ingredients (aromatics, condiments, garnishes) are not tagged.

- Beef
- Chicken
- Turkey
- Lamb
- Pork
- Fish
- Seafood
- Eggs
- Legumes

### By Occasion

Cross-cutting views for recipes suited to a specific event or setting. A single occasion may span multiple cuisines and meal types — a BBQ spread might include a salsa, a slaw, and a pudding. Maps to the `special_occasions` metadata field.

- BBQ
- Christmas
- Sunday Roast

### By Diet

Browsing by dietary restriction. Maps to the `dietary_restrictions` metadata field.

- Gluten Free
- Vegetarian
- Vegan
- Dairy Free

**Collection page layout:** Because dietary collections span mains, sides, puddings, and more, results are grouped by `meal_type` and displayed as labelled carousels — one carousel per meal type. Groups with no matching recipes are hidden. Sparse groups (1–2 recipes) are acceptable. Ordering follows the standard meal-type display order: Main → Side → Pudding → Snack → Breakfast → Appetiser → Condiment. Drinks are excluded — dietary restrictions are not captured on drink recipes.

### Author

Browsing by who created the recipe. Maps to the `author_id` field on a recipe, which references a document in the `authors` collection.

Authors are grouped by type in the browsing view:

| Type         | Description                         | Examples                     |
| ------------ | ----------------------------------- | ---------------------------- |
| `family`     | Family members and personal recipes | Grandma Maria, Mum           |
| `chef`       | Professional cooks and food writers | Tom Kerridge, Nigella Lawson |
| `restaurant` | Restaurants and food brands         | Dishoom, Ottolenghi          |
| `unknown`    | No known author                     | —                            |

---

## Config & Visibility

### Hardcoded Config

The groups and children above are defined in `app/_config/recipes.ts` as a static configuration. The structure, labels, and ordering are hardcoded. Each child maps to a filter (or filter combination for Pick Your Pace views) and optionally a representative recipe image for display on the homepage.

Each `CategorySection` has an `order` field that determines its display position on the homepage, and a `hero?: boolean` flag that marks it for the tall-card hero layout.

Each `CategoryItem` has:

- `id: string` — unique identifier used as the URL path param for `/recipes/collections/{id}`. Must be unique across **all** items in `CATEGORY_SECTIONS`, not just within a section. Use kebab-case.
- `count: number` — number of matching recipes; items with `count === 0` are hidden
- `order?: number` — optional manual display position; takes precedence over count-based ordering when set
- `description?: string` — shown on the collection page

### Hiding Empty Children

Children with no matching recipes should not appear on the homepage or in the navigation. This prevents sparse or misleading browsing categories.

**Mechanism:** The `count` field on each `CategoryItem` stores the number of matching recipes. Items with `count === 0` are hidden at render time. Visible items are sorted by explicit `order` (ascending) if set, then `count` descending, then label ascending. To pin a specific item to the front of a section, set its `order` field. After adding recipes, update the `count` values in `app/_config/recipes.ts` to reflect the new counts.

**Threshold:** A child is considered active when it has at least one matching recipe (`count > 0`). This may be revised to a higher threshold if single-recipe categories feel sparse in practice.

### Navigation Visibility

Each `CategorySection` has a `showInMenu` boolean. Sections where `showInMenu: true` appear in the `NavDrawer` navigation; sections where it is `false` are shown on the homepage only. Currently all sections have `showInMenu: true`.

### Rendering Utilities

| Utility              | Location                                     | Description                                                                             |
| -------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------- |
| `sortCategoryItems`  | `app/_lib/utils/sortCategoryItems.ts`        | Filters items with `count === 0`; sorts by `order` asc, then count desc, then label asc |
| `sortByOrder`        | `app/_lib/utils/sortByOrder.ts`              | Sorts any `{ order: number }[]` ascending — used for section ordering                   |
| `getCollectionById`  | `app/_lib/utils/getCollectionById.ts`        | Finds a `CategoryItem` by `id` across all sections; returns `null` if not found         |
| `buildCollectionUrl` | `app/_lib/utils/buildCollectionUrl.ts`       | Returns `/recipes/collections/{id}` for a given item id                                 |
| `RecipeHeroCard`     | `app/recipes/_components/RecipeHeroCard.tsx` | Tall card (full-bleed image, label) used in hero sections only                          |

The homepage (`app/recipes/page.tsx`) calls `sortByOrder` on sections, then splits into `heroSection` (first section with `hero: true`) and `otherSections`. The hero section is rendered first using the snap-scroll/grid layout, followed by a "Browse All Recipes" CTA linking to `/recipes/all`, then the remaining sections as carousels. `RecipeSection` branches on `section.hero` to use either `RecipeHeroCard` (hero) or `RecipeCategoryCard` (standard). All cards link to the collection page via `buildCollectionUrl(item.id)`. `NavDrawer` filters sections by `showInMenu` then calls `sortCategoryItems` on each section's items.
