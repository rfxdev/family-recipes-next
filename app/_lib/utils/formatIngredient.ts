import type { Ingredient } from '@/_types/recipe';

/**
 * Format ingredient for display
 * Examples:
 *   "2 x 400g cans chickpeas, drained"
 *   "6 garlic cloves, finely chopped"
 *   "thumb-sized piece ginger, peeled and grated"
 */
export function formatIngredient(ingredient: Ingredient): string {
  const parts = [ingredient.quantity_text, ingredient.item];

  if (ingredient.preparation) {
    parts.push(ingredient.preparation);
    return `${parts[0]} ${parts[1]}, ${parts[2]}`;
  }

  return parts.join(' ');
}
