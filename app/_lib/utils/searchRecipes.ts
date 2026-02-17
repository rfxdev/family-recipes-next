import type { Recipe } from '@/_types/recipe';

/** Filters recipes by case-insensitive text match across key fields. */
export function searchRecipes(
  recipes: Recipe[],
  searchParams: URLSearchParams,
): Recipe[] {
  const trimmedQuery = (searchParams.get('q') ?? '').trim().toLowerCase();
  if (!trimmedQuery) return recipes;

  return recipes.filter((recipe) => {
    if (recipe.title.toLowerCase().includes(trimmedQuery)) return true;
    if (recipe.description.toLowerCase().includes(trimmedQuery)) return true;

    // Check ingredient items across all groups
    for (const group of recipe.ingredient_groups) {
      for (const ingredient of group.ingredients) {
        if (ingredient.item.toLowerCase().includes(trimmedQuery)) return true;
      }
    }

    // Check method steps
    for (const step of recipe.method) {
      if (step.toLowerCase().includes(trimmedQuery)) return true;
    }

    return false;
  });
}
