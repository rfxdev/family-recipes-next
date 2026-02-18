'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import type { Recipe } from '@/_types/recipe';

import { DEFAULT_SORT, FILTER_KEYS, FILTER_SECTIONS } from '@/_config/filters';
import { computeFilterCounts } from '@/_lib/utils/computeFilterCounts';
import { filterRecipes } from '@/_lib/utils/filterRecipes';
import { searchRecipes } from '@/_lib/utils/searchRecipes';
import { sortByOrder } from '@/_lib/utils/sortByOrder';

/** Derived filter state from URL search params — shared by sidebar and drawer. */
export function useFilterState(recipes: Recipe[]) {
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort') ?? DEFAULT_SORT;

  // Pre-compute searched recipes (before any filters) for faceted counting
  const searchedRecipes = useMemo(
    () => searchRecipes(recipes, searchParams),
    [recipes, searchParams],
  );

  // Active filter values per dimension, derived from URL
  const activeFilters = useMemo(() => {
    const filters: Record<string, string[]> = {};
    for (const key of FILTER_KEYS) {
      const values = searchParams.getAll(key);
      if (values.length > 0) {
        filters[key] = values;
      }
    }
    return filters;
  }, [searchParams]);

  const hasActiveFilters = useMemo(
    () => FILTER_KEYS.some((key) => searchParams.getAll(key).length > 0),
    [searchParams],
  );

  const activeFilterCount = useMemo(
    () =>
      FILTER_KEYS.reduce(
        (sum, key) => sum + searchParams.getAll(key).length,
        0,
      ),
    [searchParams],
  );

  // Faceted counts: for each dimension, count from recipes filtered by all OTHER active dimensions
  const facetedCounts = useMemo(() => {
    const counts: Record<string, Record<string, number>> = {};

    for (const section of FILTER_SECTIONS) {
      const paramsWithout = new URLSearchParams();
      for (const otherKey of FILTER_KEYS) {
        if (otherKey === section.id) continue;
        for (const val of searchParams.getAll(otherKey)) {
          paramsWithout.append(otherKey, val);
        }
      }

      const recipesForCounting = filterRecipes(searchedRecipes, paramsWithout);
      const sectionCounts = computeFilterCounts(recipesForCounting, section.id);

      const sectionMap: Record<string, number> = {};
      for (const { count, value } of sectionCounts) {
        sectionMap[value] = count;
      }
      counts[section.id] = sectionMap;
    }

    return counts;
  }, [searchedRecipes, searchParams]);

  const sortedSections = useMemo(() => sortByOrder(FILTER_SECTIONS), []);

  return {
    activeFilterCount,
    activeFilters,
    currentSort,
    facetedCounts,
    hasActiveFilters,
    searchedRecipes,
    sortedSections,
  };
}
