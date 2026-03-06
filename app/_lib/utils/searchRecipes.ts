import type { Recipe } from '@/_types/recipe';

/** Filters recipes by case-insensitive text match across key fields. */
export function searchRecipes(
  recipes: Recipe[],
  searchParams: URLSearchParams,
): Recipe[] {
  const trimmedQuery = (searchParams.get('q') ?? '').trim();
  if (!trimmedQuery) return recipes;

  // Use word boundaries so "pie" matches "pie" and "pies" but not "pieces"
  const escapedQuery = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const wordPattern = new RegExp(`\\b${escapedQuery}\\b`, 'i');

  const matches = (text: string) => wordPattern.test(text);

  return recipes.filter(
    (recipe) => matches(recipe.title) || matches(recipe.description),
  );
}
