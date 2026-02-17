import type { FilterableMetadataKey } from '@/_types/filters';
import type { Recipe } from '@/_types/recipe';

import { FILTER_SECTIONS } from '@/_config/filters';

interface FilterCount {
  count: number;
  value: string;
}

/** Counts how many recipes match each value for the given filter dimension. */
export function computeFilterCounts(
  recipes: Recipe[],
  filterKey: FilterableMetadataKey,
): FilterCount[] {
  const section = FILTER_SECTIONS.find((s) => s.id === filterKey);
  if (!section) return [];

  return section.items.map(({ value }) => {
    const count = recipes.filter((recipe) => {
      const field = recipe.metadata[filterKey];
      if (Array.isArray(field)) return (field as string[]).includes(value);
      return field === value;
    }).length;

    return { count, value };
  });
}
