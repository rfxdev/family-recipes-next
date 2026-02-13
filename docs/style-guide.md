# Recipe Style Guide

Conventions for writing and formatting recipe content. Apply when entering recipes manually, reviewing imported recipes, or editing existing entries.

For data structure and field definitions, see [`data-model.md`](data-model.md). For entry workflows and import methods, see [`recipe-management.md`](recipe-management.md).

---

## Language

Use British English throughout: "colour" not "color", "flavour" not "flavor", "favourite" not "favorite", "labour" not "labor".

British vocabulary takes precedence: "coriander" not "cilantro", "aubergine" not "eggplant", "courgette" not "zucchini", "prawns" not "shrimp", "rocket" not "arugula", "cornflour" not "cornstarch".

---

## Titles

Use title case: "Chicken Berry Britannia", "Tomato, Chilli & Prawn Linguine". Use "&" rather than "and" when connecting short items in a title for brevity: "Ham & Cheese Galettes" rather than "Ham and Cheese Galettes". Either is acceptable — be consistent within a title.

Keep titles descriptive but concise. Include the key protein or distinguishing feature. Avoid generic titles like "Pasta Bake" when "Curried Lentil Cottage Pies" is more informative.

---

## Images

Use landscape orientation with a 4:3 aspect ratio (e.g., 1600×1200px, 1200×900px). The dish should be the primary focus — avoid cluttered backgrounds or excessive styling.

Photograph the finished dish, plated and ready to serve. Natural lighting works best. Keep compositions simple and appetising.

Save images as webp format for optimal web performance.

---

## Descriptions

Write 1–2 sentences that capture what makes the recipe appealing. Focus on flavour, texture, or occasion rather than listing ingredients. Use an engaging tone without being overly promotional.

**Good:** "A warming Moroccan-inspired one-pot dish with tender lamb, aromatic spices, and chickpeas. Perfect for making ahead as the flavours develop beautifully."

**Avoid:** "This recipe uses lamb, chickpeas, ras el hanout, harissa, and preserved lemon in a tagine."

---

## Ingredients

### Item Names

Use lowercase for all ingredient names: "basmati rice", "garlic cloves", "olive oil".

Be specific enough to avoid ambiguity but don't over-qualify. Include the form when necessary for clarity: "dried linguine" vs "fresh pasta", "passata" vs "chopped tomatoes". For items with an obvious form (like "chopped tomatoes" which are typically tinned), there's no need to specify "tinned".

Leave out unnecessary qualifiers: "olive oil" not "extra virgin olive oil" unless the distinction matters for the recipe.

### Quantity Text

The `quantity_text` field should contain the amount and unit only — not the item name or preparation. Container types (can, jar, bottle) can be included as an extension of the unit when relevant. Aim for the simplest expression that a cook can work with.

**Good:** "2 x 400g", "thumb-sized piece", "small bunch", "1 quantity"

**Avoid:** "400g can of chopped tomatoes" (the item name belongs in the `item` field)

#### Metric Units

Use metric as the primary system only. Do not include imperial equivalents.

| Type           | Format           | Examples               |
| -------------- | ---------------- | ---------------------- |
| Weight         | `g` or `kg`      | "500g", "1kg", "1.5kg" |
| Volume (large) | `ml` or `litres` | "300ml", "2 litres"    |
| Volume (small) | `tsp`, `tbsp`    | "1 tsp", "2 tbsp"      |

No space between number and unit for weight and volume: "500g" not "500 g". Space after number for `tsp` and `tbsp`: "1 tsp" not "1tsp".

#### Countable Items

For whole countable items, use a plain number with no unit: "2", "3", "1". Include a size descriptor when it matters: "1 large", "6 large".

#### Fractions

Use vulgar fractions: "½", "¼", "¾", "1½ tsp". Do not use decimals for small quantities — "½ tsp" not "0.5 tsp".

### Preparation

Use the `preparation` field for anything done to the ingredient before it goes into the recipe: "finely chopped", "drained", "peeled and grated", "at room temperature".

Write in lowercase without a trailing full stop. Use past participles: "chopped" not "chop", "drained" not "drain".

The preparation field can also indicate when an ingredient is optional: "optional", "roughly chopped (optional)", "plus an optional drizzle". Use descriptive phrasing that suits the context.

Keep preparation concise. If an ingredient needs extensive preparation, describe it in the method instead.

### Ingredient Groups

Use named groups when a recipe has distinct components: "Sauce", "Filling", "Topping", "To Serve". Use title case for group names.

For simple recipes with no logical groupings, use a single group with an empty name (`""`).

Don't over-group — a recipe with 8 ungrouped ingredients is clearer than one split into 3 groups of 2–3 items each.

---

## Method

### Structure

Each step should be a single paragraph describing one phase of cooking. Break the method into numbered steps — never write a recipe as one continuous block of text.

Use imperative voice throughout: "Heat the oil", "Add the onions", "Stir until combined". Not "You should heat the oil" or "The oil is heated".

A step can contain multiple related actions (e.g. "add the onions and cook for 5 minutes until soft"), but start a new step when the cook moves to a different task, piece of equipment, or stage. If a step exceeds 2–3 sentences, consider whether it should be split.

### Times and Ranges

Write "minutes" in full — do not abbreviate to "mins". Use hyphens for ranges: "12-15 minutes", "3-4 minutes". Include doneness cues alongside times where helpful: "cook for 5 minutes until golden", "simmer for 15 minutes or until thickened".

### Temperatures

For oven temperatures, always give conventional first, followed by fan in parentheses. Use °C only — no gas marks, no Fahrenheit.

**Format:** `[X]°C ([Y]°C fan)`

**Examples:**

- 200°C (180°C fan)
- 160°C (140°C fan)
- 220°C (200°C fan)

Write naturally within a step: "Heat the oven to 200°C (180°C fan)."

For hob/stovetop, use descriptive heat levels: "over medium heat", "over a high heat", "reduce to a low simmer". For appliances (air fryer, slow cooker), state the temperature plainly: "Preheat the air fryer to 200°C."

### Referencing Ingredients

Refer to ingredients naturally — don't repeat exact quantities from the ingredients list unless it aids clarity (e.g. when only part of a measured ingredient is used at that step). Write "add the garlic and ginger" rather than "add the 6 garlic cloves and thumb-sized piece of ginger".

When a step uses a portion of an ingredient, be explicit: "tear in ⅔ of the basil", "add half the stock".

### Serving Suggestions

Include serving suggestions in the final step rather than as a separate note: "Serve with couscous and yogurt on the side." Keep them brief.

---

## Notes

Use the `notes` field for personal tips, modifications, and adaptations — things the cook has learned from experience. Not for restating serving suggestions or repeating information from the method.

Write in a natural, first-person-friendly tone: "I reduce the garlic by half — our family prefers it milder."
