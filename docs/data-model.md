# Data Model

Platform-agnostic specification for the Family Recipes application data model. Implement using appropriate types and syntax for your chosen platform (TypeScript, Dart, etc.).

---

## Implementation Notes

### Optional Fields

Optional fields should be **omitted entirely** when they have no value, rather than storing `null`.

```
{
  "id": "chicken-berry-britannia",
  "title": "Chicken Berry Britannia",
  "prep_time_minutes": 60
  // cook_time_minutes not included (no value)
  // image_path not included (no value)
  // notes not included (no value)
}
```

When implementing in TypeScript/Dart, mark fields as optional (`?`) and simply don't include them in objects when there's no value. Firestore will automatically omit undefined fields when saving documents.

### Recipe IDs and URLs

The recipe `id` field serves as both the Firestore document ID and URL slug (e.g., `/recipes/chicken-berry-britannia`).

**Format requirements:**

- Lowercase, alphanumeric with hyphens only
- Generated from recipe titles
- Must be unique across all recipes (duplicates resolved by appending `-2`, `-3`, etc.)

See [`recipe-management.md`](recipe-management.md) for the generation algorithm.

---

## Recipe Example

```json
{
  "id": "grandmas-lasagna",
  "title": "Grandma's Lasagna",
  "description": "Family favourite comfort food",
  "uploaded_by": "user_456",
  "metadata": {
    "cuisine": "italian",
    "meal_type": "main",
    "difficulty": "moderate",
    "time_category": "long",
    "dietary_restrictions": ["vegetarian"],
    "ingredient_categories": ["pasta", "beef", "cheese"],
    "special_occasions": ["christmas"],
    "recipe_author": "Grandma Maria",
    "source_name": "handwritten note",
    "source_details": "From recipe box, 1985"
  },
  "notes": "I reduce the garlic by half - our family prefers it milder",
  "ingredient_groups": [
    {
      "name": "Main Layers",
      "order": 1,
      "ingredients": [
        {
          "item": "ground beef",
          "quantity_text": "1 lb",
          "order": 1
        },
        {
          "item": "ricotta cheese",
          "quantity_text": "2 cups",
          "order": 2
        },
        {
          "item": "onion",
          "quantity_text": "1 large",
          "preparation": "finely chopped",
          "order": 3
        }
      ]
    },
    {
      "name": "Sauce",
      "order": 2,
      "ingredients": [
        {
          "item": "tinned tomatoes",
          "quantity_text": "2 x 400g",
          "preparation": "drained",
          "order": 1
        },
        {
          "item": "salt",
          "order": 2
        }
      ]
    }
  ],
  "method": [
    "Brown the beef in a large pan over medium-high heat.",
    "Mix ricotta with egg and herbs.",
    "Layer sauce, noodles, meat, and cheese mixture.",
    "Bake at 180°C (160°C fan) for 45 minutes until golden."
  ],
  "servings": 8,
  "prep_time_minutes": 30,
  "cook_time_minutes": 60,
  "image_path": "recipes/grandmas-lasagna/main.jpg",
  "created_at": "2024-12-24T10:00:00Z",
  "updated_at": "2024-12-24T10:00:00Z"
}
```

**Note:** This example includes all fields for documentation purposes. In practice, optional fields without values should be omitted entirely.

---

## Recipe Type Details

Field definitions for the Recipe type (implemented in `app/_types/recipe.ts`).

### Core Fields

**id** (required string): URL-safe slug used as both Firestore document ID and URL path. Lowercase alphanumeric with hyphens only. Must be unique. See [`recipe-management.md`](recipe-management.md) for the generation algorithm.

**uploaded_by** (required string): Firebase Auth UID of the user who owns this recipe. Used for edit permissions in security rules.

**notes** (optional string): User's personal modifications or cooking tips, distinct from source attribution.

**method** (required array of strings): Each string represents a step. Displayed as a numbered list in the UI.

**image_path** (optional string): Firebase Storage path, not URL. URLs include expiring security tokens. Thumbnails auto-generated as `_200x200.jpg`, `_800x800.jpg`.

**ingredient_groups** (required array): Nested array for sectioned recipes. Simple recipes use a single group with empty name: `{"name": "", "order": 1, "ingredients": [...]}`.

### Ingredient Fields

Each ingredient within a group has:

- **item** (required string): Core ingredient name, e.g., "minced beef", "tinned tomatoes"
- **quantity_text** (optional string): Flexible quantity as text, e.g., "2 x 400g", "thumb-sized piece". Omit for ingredients that don't need a quantity (e.g., salt, pepper)
- **preparation** (optional string): How to prepare the ingredient, e.g., "chopped", "drained", "at room temperature"
- **order** (required number): Display order within the group

The free-text `quantity_text` approach handles complex real-world quantities that don't fit structured formats. This simplifies input and display at the cost of programmatic scaling and unit conversion. See [`style-guide.md`](style-guide.md) for formatting conventions and examples.

**Display format:** `[quantity_text ][item][, preparation]` — e.g., "2 x 400g tinned tomatoes, drained", "salt"

### Metadata Object

All descriptive and categorisation data about the recipe, including both structured filters and supplementary information.

#### Structured Filters (Required)

**cuisine** (required, single-select):

- Allowed values: `american`, `british`, `chinese`, `french`, `indian`, `italian`, `japanese`, `mediterranean`, `mexican`, `moroccan`, `thai`, `other`

**meal_type** (required, single-select):

- Allowed values: `appetiser`, `breakfast`, `condiment`, `pudding`, `drink`, `main`, `side`, `snack`

**difficulty** (required, single-select):

- Allowed values: `easy`, `moderate`, `challenging`

**time_category** (required, auto-calculated):

- Allowed values: `quick`, `medium`, `long`
- Auto-calculated from `prep_time_minutes + cook_time_minutes`. See [`recipe-management.md`](recipe-management.md) for calculation logic.

#### Structured Filters (Optional)

**dietary_restrictions** (optional, multi-select array):

- Allowed values: `dairy-free`, `egg-free`, `gluten-free`, `low-carb`, `nut-free`, `pescatarian`, `vegan`, `vegetarian`

**ingredient_categories** (optional, multi-select array):

- Allowed values: `beef`, `cheese`, `eggs`, `fish`, `lamb`, `legumes`, `pasta`, `pork`, `poultry`, `rice`, `seafood`
- Used for queries like "what can I make with chicken?"

**special_occasions** (optional, multi-select array):

- Allowed values: `barbecue`, `birthday`, `christmas`, `easter`, `fathers-day`, `mothers-day`, `new-year`, `picnic`, `sunday-roast`, `thanksgiving`, `valentines`

#### Supplementary Information (Optional)

**recipe_author** (optional, freeform string): Who created the recipe originally. Examples: "Grandma Maria", "Jamie Oliver"

**source_name** (optional, freeform string): Where the recipe came from. Examples: "handwritten note", "BBC Good Food", "30 Minute Meals cookbook"

**source_url** (optional, string): URL if recipe was imported from a website.

**source_details** (optional, freeform string): Additional context about the recipe's origin. Examples: "Page 42", "From recipe box, 1985", "Adapted from original"
