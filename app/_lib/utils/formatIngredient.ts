import type { Ingredient } from '@/_types/recipe';

/**
 * Format ingredient for display
 * Examples:
 *   "2 x 400g cans chickpeas, drained"
 *   "6 garlic cloves, finely chopped"
 *   "thumb-sized piece ginger, peeled and grated"
 */
export function formatIngredient(ingredient: Ingredient): string {
  let result = ingredient.item;

  if (ingredient.quantity_text) {
    result = `${ingredient.quantity_text} ${result}`;
  }

  if (ingredient.preparation) {
    result = `${result}, ${ingredient.preparation}`;
  }

  return result;
}
