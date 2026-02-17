import type { Recipe } from '@/_types/recipe';

import { DEFAULT_SORT, SORT_VALUES } from '@/_config/filters';
import { isSortValue } from '@/_lib/utils/isSortValue';

/** Sorts recipes by the given option. Returns a new array (immutable). */
export function sortRecipes(
  recipes: Recipe[],
  searchParams: URLSearchParams,
): Recipe[] {
  const rawSort = searchParams.get('sort');
  const sortBy = rawSort && isSortValue(rawSort) ? rawSort : DEFAULT_SORT;

  const sortedRecipes = [...recipes];

  switch (sortBy) {
    case SORT_VALUES.NEWEST:
      sortedRecipes.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      break;
    case SORT_VALUES.OLDEST:
      sortedRecipes.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
      break;
    case SORT_VALUES.TITLE_ASC:
      sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case SORT_VALUES.TITLE_DESC:
      sortedRecipes.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

  return sortedRecipes;
}
