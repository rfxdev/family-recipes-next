import type { Recipe } from '@/_types/recipe';

import { FILTER_KEYS } from '@/_config/filters';

/** Filters recipes by matching search params against recipe metadata. */
export function filterRecipes(
  recipes: Recipe[],
  searchParams: URLSearchParams,
): Recipe[] {
  // Collect active filters using getAll() for multi-select support
  // e.g. ?cuisine=italian&cuisine=thai&meal_type=main
  const activeFilters = FILTER_KEYS.map((key) => ({
    key,
    values: searchParams.getAll(key),
  })).filter((f) => f.values.length > 0);

  if (activeFilters.length === 0) return recipes;

  // AND across dimensions, OR within a dimension
  return recipes.filter((recipe) =>
    activeFilters.every(({ key, values }) => {
      const field = recipe.metadata[key];
      if (Array.isArray(field)) {
        // Array field (e.g. dietary_restrictions): at least one selected value must be present
        return values.some((v) => (field as string[]).includes(v));
      }
      // Scalar field: value must match one of the selected values
      return values.includes(field as string);
    }),
  );
}
