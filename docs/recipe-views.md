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

- Curry
- Pasta
- Noodles
- Pizza
- Soup
- Pie
- Salad
- Rice Dish
- Stew & Casserole
- Roast

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

### Ingredients

Browsing by the star protein — the ingredient the dish is built around. Maps to the `proteins` metadata field. Supporting ingredients (aromatics, condiments, garnishes) are not tagged.

- Beef
- Lamb
- Pork
- Poultry
- Fish
- Seafood
- Eggs
- Legumes

### Occasions

Cross-cutting views for recipes suited to a specific event or setting. A single occasion may span multiple cuisines and meal types — a BBQ spread might include a salsa, a slaw, and a pudding. Maps to the `special_occasions` metadata field.

- BBQ
- Christmas
- Sunday Roast

### By Dietary

Browsing by dietary restriction. Maps to the `dietary_restrictions` metadata field.

- Gluten Free
- Pescatarian
- Vegetarian

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

Each `CategorySection` has an `order` field that determines its display position on the homepage. Each `CategoryItem` has an `order` field that holds the count of matching recipes in the current dataset.

### Hiding Empty Children

Children with no matching recipes should not appear on the homepage or in the navigation. This prevents sparse or misleading browsing categories.

**Mechanism:** The `order` field on each `CategoryItem` stores the count of matching recipes. Items with `order === 0` are hidden at render time; items with a count greater than zero are shown, sorted by count descending then label ascending. After adding recipes, update the `order` values in `app/_config/recipes.ts` to reflect the new counts.

**Threshold:** A child is considered active when it has at least one matching recipe (`order > 0`). This may be revised to a higher threshold if single-recipe categories feel sparse in practice.

### Navigation Visibility

Each `CategorySection` has a `showInMenu` boolean. Sections where `showInMenu: true` appear in the `NavDrawer` navigation; sections where it is `false` are shown on the homepage only. Currently all sections have `showInMenu: true`.

### Rendering Utilities

| Utility             | Location                              | Description                                                                |
| ------------------- | ------------------------------------- | -------------------------------------------------------------------------- |
| `sortCategoryItems` | `app/_lib/utils/sortCategoryItems.ts` | Filters items with `order === 0`; sorts remainder by count desc, label asc |
| `sortByOrder`       | `app/_lib/utils/sortByOrder.ts`       | Sorts any `{ order: number }[]` ascending — used for section ordering      |

`RecipeHomepage` calls `sortByOrder` on sections and `sortCategoryItems` on each section's items. `NavDrawer` filters sections by `showInMenu` then calls `sortCategoryItems` on each section's items.
