import type { Recipe } from '@/_types/recipe';

import { filterRecipes } from './filterRecipes';
import { searchRecipes } from './searchRecipes';

/** Applies URL search params to recipes — searches by `q` then filters by category params. */
export function applyRecipeParams(
  recipes: Recipe[],
  searchParams: URLSearchParams,
): Recipe[] {
  const searchedRecipes = searchRecipes(recipes, searchParams);
  return filterRecipes(searchedRecipes, searchParams);
}
