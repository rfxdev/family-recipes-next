# Recipe Import

Platform-agnostic specification for importing recipes from external sources. Phase 1 scope: basic text extraction and structured URL parsing. Users organise results manually.

---

## Camera Scanning (Mobile Platforms)

**Technology:** Firebase ML Kit Text Recognition or equivalent OCR library

**Capabilities:**

- On-device text extraction from photos
- Works offline
- Free tier typically ~1,000 requests/month
- Best for printed text, poor for handwritten recipes

**Platform Availability:**

- ✅ Mobile (iOS/Android): Native camera access
- ❌ Web: No direct camera file access for OCR
- 🔄 Web Alternative: File upload → OCR service (see Web Implementation below)

### User Flow (Mobile)

1. User taps "Scan Recipe" button
2. Camera interface opens
3. User takes photo of recipe (from book, magazine, card)
4. ML Kit extracts all text from image
5. Display extracted text in editable text area
6. User copies relevant portions into recipe form fields (title, ingredients, instructions)
7. User verifies and saves recipe

### Implementation Concept

**Steps:**

1. Open native camera with photo capture
2. Pass captured image to text recognition API
3. Parse recognised text blocks into single string
4. Present in editable field for user review

**Limitations:**

- User must manually organise text into structured fields
- Poor accuracy on handwritten recipes
- Works best with clear, printed text
- May struggle with decorative fonts or low contrast

### Web Implementation Alternative

Since web browsers don't provide direct camera → OCR pipeline:

**Option 1: File Upload + Server-Side OCR**

- User uploads image file
- Send to OCR service (Tesseract.js client-side, or server API)
- Display extracted text

**Option 2: Manual Entry Only**

- Skip camera scanning entirely on web
- Rely solely on URL import and manual typing
- Simpler, no OCR dependency

---

## URL Import (All Platforms)

**Technology:** HTTP fetch + HTML parsing for schema.org JSON-LD

**Capabilities:**

- Works with ~60-70% of major recipe sites
- Free (standard HTTP requests)
- Platform-agnostic (works on web and mobile)

### Supported Sites

Sites using schema.org Recipe structured data:

- AllRecipes
- Food Network
- Serious Eats
- Bon Appétit
- BBC Good Food
- Most modern food blogs

### User Flow

1. User taps/clicks "Import from URL"
2. Paste or type recipe URL
3. App fetches page HTML
4. Parse for `<script type="application/ld+json">` tags
5. If schema.org Recipe found:
   - Auto-populate form fields (title, description, ingredients, instructions, etc.)
   - User reviews and adjusts as needed
   - User saves recipe
6. If not found:
   - Display message: "Couldn't auto-import from this site"
   - Offer option to open URL in browser for manual copy/paste

### Implementation Concept

**Steps:**

1. **Fetch page HTML**
   - Make HTTP GET request to provided URL
   - Handle CORS (may need proxy on web platforms)

2. **Parse HTML for JSON-LD scripts**
   - Find all `<script type="application/ld+json">` elements
   - Parse each as JSON
   - Look for `@type: "Recipe"` in root or `@graph` array

3. **Extract recipe data**
   - Map schema.org fields to internal data model
   - Parse ingredient strings into structured format

4. **Present to user**
   - Pre-fill recipe creation form
   - Allow user to edit before saving

### Schema.org Mapping

| Schema.org Field           | Maps To           | Notes                           |
| -------------------------- | ----------------- | ------------------------------- |
| name                       | title             | Recipe title                    |
| description                | description       | Short description               |
| recipeIngredient           | ingredient_groups | Array of strings, needs parsing |
| recipeInstructions         | instructions      | May be string or structured     |
| recipeYield                | servings          | e.g., "8 servings" → 8          |
| prepTime                   | prep_time_minutes | ISO 8601 duration → minutes     |
| cookTime                   | cook_time_minutes | ISO 8601 duration → minutes     |
| image                      | image_path        | URL to download and store       |
| keywords or recipeCategory | tags              | Comma-separated → array         |

### Ingredient String Parsing

**Challenge:** Schema.org provides ingredients as strings like:

- "2 cups all-purpose flour"
- "1 lb ground beef"
- "Salt to taste"

**Goal:** Parse into structured format: `{quantity, unit, item}`

**Algorithm:**

1. Try pattern: `[number] [unit] [item]`
   - Example: "2 cups flour" → `{quantity: 2, unit: "cups", item: "flour"}`

2. Try pattern: `[number] [item]` (no unit)
   - Example: "3 eggs" → `{quantity: 3, unit: "whole", item: "eggs"}`

3. Try pattern: `[item] to taste` (flexible)
   - Example: "Salt to taste" → `{quantity: 1, unit: "to taste", item: "salt"}`

4. Fallback: Store entire string as item
   - Example: "A pinch of love" → `{quantity: 1, unit: "as needed", item: "A pinch of love"}`

**Implementation:** Use regular expressions appropriate for your platform.

### CORS Considerations (Web)

**Problem:** Web browsers block cross-origin requests to recipe sites.

**Solutions:**

1. **Server-side proxy:** Route requests through your backend
2. **CORS proxy service:** Use third-party service (not recommended for production)
3. **Browser extension:** Fetch from extension with elevated permissions
4. **Accept limitation:** Show error message, suggest browser copy/paste

---

## Phase 2 Enhancements (Future)

Not in current scope, revisit based on usage:

### Camera Scanning

- Heuristic parsing to detect ingredient lists vs instructions
- Auto-categorisation of text blocks
- Support for multiple page scanning

### URL Import

- Site-specific scrapers for non-schema.org sites
- Handle recipe sites with authentication/paywalls
- Extract multiple recipes from collection pages

### LLM-Assisted Parsing

- Use AI to structure loosely formatted text
- Handle natural language ingredient descriptions
- Generate missing metadata (prep time, servings)

---

## Platform-Specific Notes

### Mobile Implementation

- Use native camera APIs for photo capture
- Firebase ML Kit Text Recognition (iOS/Android)
- Direct network requests (no CORS issues)

### Web Implementation

- File upload input for image selection
- Tesseract.js or server-side OCR for text extraction
- CORS proxy or server-side fetching for URL import

### Shared Logic

- Schema.org parsing (same algorithm)
- Ingredient string parsing (same regex patterns)
- User review flow (same UX concept)
