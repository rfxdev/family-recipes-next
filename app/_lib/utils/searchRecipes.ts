import type { Recipe } from '@/_types/recipe';

/** Filters recipes by case-insensitive text match across key fields. */
export function searchRecipes(
  recipes: Recipe[],
  searchParams: URLSearchParams,
): Recipe[] {
  const trimmedQuery = (searchParams.get('q') ?? '').trim().toLowerCase();
  if (!trimmedQuery) return recipes;

  // Use word boundaries so "pie" matches "pie" and "pies" but not "pieces"
  const escapedQuery = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const wordPattern = new RegExp(`\\b${escapedQuery}\\b`);

  const matches = (text: string) => wordPattern.test(text.toLowerCase());

  return recipes.filter((recipe) => {
    if (matches(recipe.title)) return true;
    if (matches(recipe.description)) return true;

    // Check ingredient items across all groups
    for (const group of recipe.ingredient_groups) {
      for (const ingredient of group.ingredients) {
        if (matches(ingredient.item)) return true;
      }
    }

    // Check method steps
    for (const step of recipe.method) {
      if (matches(step)) return true;
    }

    return false;
  });
}
