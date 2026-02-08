# Recipe Management

Platform-agnostic specification for managing recipes in the Family Recipes application. Covers manual entry and editing, import methods (URL parsing, camera scanning), and shared utilities.

---

## Overview

Recipes can be created through three methods:

1. **Manual Entry**: Users fill out a form with all recipe details
2. **URL Import**: Auto-populate form from recipe websites (schema.org structured data)
3. **Camera Scanning**: Extract text from photos via OCR

All methods share the same underlying utilities (ID generation, time category calculation) and result in the same data structure defined in [`data-model.md`](data-model.md).

Editing uses the same form as manual entry, pre-populated with the existing recipe data. The recipe ID is not regenerated on edit.

---

## Manual Entry and Editing

### User Flow (Create)

1. User clicks "Create Recipe" button
2. Form displays with required and optional fields
3. User enters recipe data:
   - **Basic Info**: Title (required), description (required)
   - **Metadata**: Cuisine, meal type, difficulty (all required). Dietary restrictions, ingredient categories, special occasions (all optional). Values defined in [`data-model.md`](data-model.md).
   - **Times**: Prep time, cook time (optional, in minutes)
   - **Servings**: Number of servings (required)
   - **Ingredient Groups**: Add groups (optional grouping), add ingredients within groups
   - **Instructions**: Add numbered steps
   - **Optional Fields**: Notes, recipe author, source information
   - **Image**: Upload photo (optional)
4. Form validation checks required fields
5. On submit:
   - Generate unique recipe ID from title (see Shared Utilities)
   - Calculate time category from prep/cook times (see Shared Utilities)
   - Upload image to Firebase Storage if provided
   - Save recipe document to Firestore
6. Navigate to new recipe detail page

### User Flow (Edit)

1. User clicks "Edit Recipe" from recipe detail page
2. Same form as create, pre-populated with existing recipe data
3. User modifies fields as needed
4. On submit:
   - Recalculate time category if prep/cook times changed
   - Update `updated_at` timestamp
   - Save updated document to Firestore
5. Navigate back to recipe detail page

### Ingredient Input

Based on the flexible `quantity_text` approach (see `data-model.md`):

- **Quantity** (required text input): "2 cups", "1 lb", "2 x 400g tins", "to taste"
- **Item** (required text input): "flour", "ground beef", "tinned tomatoes"
- **Preparation** (optional text input): "chopped", "drained", "at room temperature"
- **Add to group** button: Creates new ingredient row
- **Reorder** controls: Drag handles or up/down buttons

**Display format:** `[quantity_text] [item][, preparation]` — e.g., "2 x 400g tinned tomatoes, drained"

---

## Import Methods

Import methods pre-populate the manual entry form with extracted data. Users review and edit before saving.

### URL Import

**Technology:** HTTP fetch + HTML parsing for schema.org JSON-LD. Works with most major recipe sites that use structured data (AllRecipes, BBC Good Food, Serious Eats, most modern food blogs).

#### User Flow

1. User clicks "Import from URL"
2. Paste or type recipe URL
3. App fetches page HTML and parses for `<script type="application/ld+json">` tags
4. If schema.org Recipe found:
   - Auto-populate form fields
   - User reviews and adjusts as needed
   - User saves recipe
5. If not found:
   - Display message: "Couldn't auto-import from this site"
   - Offer option to open URL in browser for manual copy/paste

#### Schema.org Mapping

| Schema.org Field           | Maps To           | Notes                                      |
| -------------------------- | ----------------- | ------------------------------------------ |
| name                       | title             | Recipe title                               |
| description                | description       | Short description                          |
| recipeIngredient           | ingredient_groups | Array of strings, parse into ingredients   |
| recipeInstructions         | instructions      | Convert to array (split on newlines/steps) |
| recipeYield                | servings          | e.g., "8 servings" → 8                     |
| prepTime                   | prep_time_minutes | ISO 8601 duration → minutes                |
| cookTime                   | cook_time_minutes | ISO 8601 duration → minutes                |
| image                      | image_path        | URL to download and store                  |
| keywords or recipeCategory | metadata fields   | Map to cuisine, meal_type, etc.            |

#### Ingredient String Parsing

Schema.org provides ingredients as strings (e.g., "2 cups flour, sifted"). The parsing approach:

1. **Try splitting on comma + preparation verb** (chopped, diced, drained, sifted, melted, etc.): text before comma becomes quantity + item, text after becomes preparation.
2. **Fallback**: Store entire string as quantity_text + item.

Use basic string splitting rather than complex parsing. Users can manually adjust imported ingredients before saving.

#### CORS Considerations (Web)

Web browsers block cross-origin requests to recipe sites. Options include a server-side proxy, or accepting the limitation and suggesting browser copy/paste for unsupported sites.

### Camera Scanning

**Technology:** OCR text recognition (e.g., Firebase ML Kit on mobile, Tesseract.js on web).

**Approach:** Capture or upload a photo of a recipe (from a book, magazine, or card), extract text via OCR, then present the raw text for the user to copy into the recipe form fields. The user handles organising text into structured fields — no automatic parsing of ingredients vs instructions.

**Limitations:** Best with clear, printed text. Poor accuracy on handwritten recipes or decorative fonts.

---

## Shared Utilities

Utilities used by all recipe creation and editing methods. Implemented in application code (Next.js/Flutter) before saving to Firestore.

### Recipe ID Generation

Generates unique, URL-safe IDs from recipe titles. The ID serves as both the Firestore document ID and URL slug.

**Input:** Recipe title (string), existing recipe IDs (array)
**Output:** Unique ID string

**Algorithm:**

1. Convert title to lowercase
2. Remove all characters except letters, numbers, spaces, and hyphens
3. Replace all spaces with hyphens
4. Collapse multiple consecutive hyphens to single hyphen
5. Trim leading and trailing hyphens
6. Check if generated ID already exists in existing IDs
7. If duplicate, append `-2`, `-3`, etc. until unique

**Examples:**

- "Chicken Berry Britannia" + no conflicts → `"chicken-berry-britannia"`
- "Grandma's Lasagna!" + no conflicts → `"grandmas-lasagna"`
- "30-Minute Pasta!" → `"30-minute-pasta"`
- "Lasagna" + `"lasagna"` exists → `"lasagna-2"`
- "Lasagna" + `"lasagna"` and `"lasagna-2"` exist → `"lasagna-3"`

Only called during recipe creation. Editing does not regenerate the ID.

### Time Category Calculation

Calculates time category from prep and cook times. Must be recalculated whenever prep or cook times change (both on create and edit).

**Input:** prep_time_minutes (number or undefined), cook_time_minutes (number or undefined)
**Output:** `"quick"` | `"medium"` | `"long"`

**Algorithm:**

1. Sum prep_time_minutes and cook_time_minutes (treat undefined as 0)
2. If total < 30: return `"quick"`
3. If total 30–60 (inclusive): return `"medium"`
4. If total > 60: return `"long"`

**Examples:**

- prep: 15, cook: 10 → total 25 → `"quick"`
- prep: 20, cook: 30 → total 50 → `"medium"`
- prep: 30, cook: 60 → total 90 → `"long"`
- prep: undefined, cook: 20 → total 20 → `"quick"`
- prep: undefined, cook: undefined → total 0 → `"quick"`

The value is stored in `metadata.time_category`.
