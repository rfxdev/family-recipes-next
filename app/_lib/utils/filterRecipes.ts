import type { Recipe, RecipeMetadata } from '@/_types/recipe';

import { CATEGORY_FILTER_KEYS } from '@/_config/recipes';

/** Filters recipes by matching search params against recipe metadata. */
export function filterRecipes(
  recipes: Recipe[],
  searchParams: URLSearchParams,
): Recipe[] {
  // Collect active filters by checking which category keys have a URL param value
  // e.g. ?cuisine=italian&meal_type=main → [{ key: 'cuisine', value: 'italian' }, ...]
  const activeFilters = CATEGORY_FILTER_KEYS.map((key) => ({
    key,
    value: searchParams.get(key),
  })).filter((f): f is { key: string; value: string } => f.value !== null);

  if (activeFilters.length === 0) return recipes;

  // Every active filter must match (AND logic).
  // Array fields (e.g. dietary_restrictions) use .includes(), scalars use equality.
  return recipes.filter((recipe) =>
    activeFilters.every(({ key, value }) => {
      const field = recipe.metadata[key as keyof RecipeMetadata];
      if (Array.isArray(field)) return (field as string[]).includes(value);
      return field === value;
    }),
  );
}
