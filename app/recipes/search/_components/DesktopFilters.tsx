'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import type { Recipe } from '@/_types/recipe';

import { useFilterState } from '@/_lib/hooks/useFilterState';
import { DesktopSort } from '@/recipes/search/_components/DesktopSort';
import { FilterContent } from '@/recipes/search/_components/FilterContent';

interface DesktopFiltersProps {
  recipes: Recipe[];
}

export function DesktopFilters({ recipes }: DesktopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { activeFilters, facetedCounts, hasActiveFilters, sortedSections } =
    useFilterState(recipes);

  const updateUrl = useCallback(
    (params: URLSearchParams) => {
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  const handleFilterToggle = useCallback(
    (key: string, value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      if (checked) {
        params.append(key, value);
      } else {
        // Remove only this specific value from the key
        const remaining = params.getAll(key).filter((v) => v !== value);
        params.delete(key);
        remaining.forEach((v) => params.append(key, v));
      }
      updateUrl(params);
    },
    [searchParams, updateUrl],
  );

  const handleClearAll = useCallback(() => {
    const params = new URLSearchParams();
    // Keep search query if present
    const q = searchParams.get('q');
    if (q) params.set('q', q);
    updateUrl(params);
  }, [searchParams, updateUrl]);

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-8 h-fit">
        <DesktopSort />
        <FilterContent
          activeFilters={activeFilters}
          facetedCounts={facetedCounts}
          hasActiveFilters={hasActiveFilters}
          onClearAll={handleClearAll}
          onFilterToggle={handleFilterToggle}
          sections={sortedSections}
        />
      </div>
    </aside>
  );
}
