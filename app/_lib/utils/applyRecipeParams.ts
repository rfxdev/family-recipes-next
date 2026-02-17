import type { Recipe } from '@/_types/recipe';

import { filterRecipes } from './filterRecipes';
import { searchRecipes } from './searchRecipes';
import { sortRecipes } from './sortRecipes';

/** Applies URL search params to recipes — searches by `q`, filters by category params, then sorts. */
export function applyRecipeParams(
  recipes: Recipe[],
  searchParams: URLSearchParams,
): Recipe[] {
  const searched = searchRecipes(recipes, searchParams);
  const filtered = filterRecipes(searched, searchParams);
  return sortRecipes(filtered, searchParams);
}
