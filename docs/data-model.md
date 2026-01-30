# Data Model

Platform-agnostic specification for the Family Recipes application data model. Implement using appropriate types and syntax for your chosen platform (TypeScript, Dart, etc.).

---

## Collections

Three Firestore collections:

- `users` — Family member profiles and preferences
- `recipes` — Recipe content with embedded ingredient groups
- `favourites` — User-recipe junction for bookmarking (optional, add when needed)

---

## User Document

```json
{
  "id": "user_456",
  "email": "mom@family.com",
  "display_name": "Mom",
  "unit_preference": "imperial",
  "is_active": true,
  "created_at": "2024-12-24T10:00:00Z"
}
```

| Field           | Type            | Notes                                               |
| --------------- | --------------- | --------------------------------------------------- |
| id              | string          | Matches Firebase Auth UID                           |
| email           | string          | User's email address                                |
| display_name    | string          | Display name for UI                                 |
| unit_preference | string          | `"imperial"`, `"metric"`, `"both"`, or `"original"` |
| is_active       | boolean         | Set false to revoke access without deleting account |
| created_at      | ISO 8601 string | Account creation timestamp                          |

---

## Recipe Document

```json
{
  "id": "recipe_123",
  "title": "Grandma's Lasagna",
  "description": "Family favorite comfort food",
  "author_id": "user_456",

  "source": {
    "author": "Grandma Maria",
    "source_name": "handwritten note",
    "details": null
  },
  "notes": "I reduce the garlic by half - our family prefers it milder",

  "ingredient_groups": [
    {
      "name": "Main Layers",
      "order": 1,
      "ingredients": [
        {
          "item": "ground beef",
          "quantity": 1,
          "unit": "lb",
          "order": 1
        },
        {
          "item": "ricotta cheese",
          "quantity": 2,
          "unit": "cups",
          "order": 2
        }
      ]
    },
    {
      "name": "Sauce",
      "order": 2,
      "ingredients": [
        {
          "item": "marinara sauce",
          "quantity": 24,
          "unit": "oz",
          "order": 1
        },
        {
          "item": "salt",
          "quantity": 1,
          "unit": "to taste",
          "order": 2
        }
      ]
    }
  ],

  "instructions": [
    "Brown the beef in a large skillet over medium-high heat.",
    "Mix ricotta with egg, parmesan, and seasonings in a bowl.",
    "Layer noodles, meat sauce, and cheese mixture in a baking dish.",
    "Cover with foil and bake at 375°F for 45 minutes.",
    "Remove foil, top with mozzarella, and bake 15 minutes more until golden."
  ],
  "servings": 8,
  "prep_time_minutes": 30,
  "cook_time_minutes": 60,

  "image_path": "recipes/recipe_123/main.jpg",

  "tags": ["italian", "comfort-food"],
  "created_at": "2024-12-24T10:00:00Z",
  "updated_at": "2024-12-24T10:00:00Z"
}
```

### Field Notes

**instructions** (array of strings): Each step is a separate string. Render as ordered list (<ol>) in UI. No need to include step numbers in the text.

**source** (optional object)

- `author`: Who created the recipe (chef name, family member, "Unknown")
- `source_name`: Where it came from (book title, website, "handwritten note")
- `details`: Additional context (page number, URL, date)

**notes** (optional string): User's personal modifications, distinct from source attribution.

**image_path**: Firebase Storage path, not URL. URLs include expiring security tokens. Thumbnails auto-generated as `_200x200.jpg`, `_800x800.jpg`.

**ingredient_groups**: Nested array for sectioned recipes. Simple recipes use a single group with empty name: `{"name": "", "order": 1, "ingredients": [...]}`.

---

## Unit Lists

### Volume

`cups`, `tbsp`, `tsp`, `ml`, `L`, `fl oz`

### Weight

`lb`, `oz`, `g`, `kg`

### Count

`whole`, `clove`, `piece`, `slice`, `can`, `package`, `bunch`

### Flexible (non-scaling)

`to taste`, `as needed`, `pinch`, `dash`, `handful`

---

## Scaling Logic

**Concept:** Flexible units don't scale. All others scale proportionally based on servings ratio.

**Algorithm:**

1. Check if unit is in non-scaling list (flexible units)
2. If yes: display as-is with no quantity change
3. If no: multiply quantity by (new servings / original servings)

**Example:**

- Original: 2 cups flour for 4 servings
- Scaled to 8 servings: 4 cups flour
- "Salt to taste" remains "to taste" regardless of servings

---

## Unit Conversion

**Principle:** Store ingredients in original units as entered. Convert at display time based on user preference.

**Conversion Factors:**

| From    | To  | Factor |
| ------- | --- | ------ |
| 1 cup   | ml  | 240    |
| 1 tbsp  | ml  | 15     |
| 1 tsp   | ml  | 5      |
| 1 fl oz | ml  | 30     |
| 1 lb    | g   | 450    |
| 1 oz    | g   | 28     |

**Non-converting units**: Count-based and flexible units display as-is regardless of user preference.

**Example:**

- Database: `{"quantity": 2, "unit": "cups", "item": "flour"}`
- User preference "imperial": Display "2 cups flour"
- User preference "metric": Display "480 ml flour"
- User preference "both": Display "2 cups (480 ml) flour"
- User preference "original": Display "2 cups flour"

---

## Ingredient Input UX Concept

**Goal:** Structured input that guides users to proper quantity + unit + item format.

**Recommended approach:**

1. Ingredient name text field (free text)
2. Measurement type selector (Volume, Weight, Count, Flexible)
3. Quantity field (number input, disabled for flexible)
4. Unit dropdown (filtered by measurement type)

**Smart defaults** based on ingredient name patterns:

- "milk", "water", "oil" → Volume
- "flour", "sugar", "paprika" → Volume
- "beef", "chicken", "cheese" → Weight
- "garlic", "onion", "egg" → Count
- "salt" (without amount context) → Flexible

**Implementation:** Adapt this concept to your platform's UI patterns (radio buttons, segmented controls, dropdowns, etc.).
