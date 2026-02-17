'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import type { Recipe } from '@/_types/recipe';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/_components/ui/accordion';
import { Checkbox } from '@/_components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/_components/ui/radio-group';
import {
  DEFAULT_SORT,
  FILTER_KEYS,
  FILTER_SECTIONS,
  SORT_OPTIONS,
} from '@/_config/filters';
import { computeFilterCounts } from '@/_lib/utils/computeFilterCounts';
import { filterRecipes } from '@/_lib/utils/filterRecipes';
import { searchRecipes } from '@/_lib/utils/searchRecipes';
import { sortByOrder } from '@/_lib/utils/sortByOrder';

interface FilterSidebarProps {
  recipes: Recipe[];
}

export function FilterSidebar({ recipes }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort') ?? DEFAULT_SORT;

  // Pre-compute searched recipes (before any filters) for faceted counting
  const searchedRecipes = useMemo(
    () => searchRecipes(recipes, searchParams),
    [recipes, searchParams],
  );

  const hasActiveFilters = useMemo(
    () => FILTER_KEYS.some((key) => searchParams.getAll(key).length > 0),
    [searchParams],
  );

  const updateUrl = useCallback(
    (params: URLSearchParams) => {
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  const handleSortChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      // Omit default sort from URL to keep it clean
      if (value === DEFAULT_SORT) {
        params.delete('sort');
      } else {
        params.set('sort', value);
      }
      updateUrl(params);
    },
    [searchParams, updateUrl],
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

  /** Faceted counts: for each dimension, count from recipes filtered by all OTHER active dimensions. */
  const facetedCounts = useMemo(() => {
    const counts: Record<string, Record<string, number>> = {};

    for (const section of FILTER_SECTIONS) {
      // Build params excluding the current dimension
      const paramsWithout = new URLSearchParams();
      for (const otherKey of FILTER_KEYS) {
        if (otherKey === section.id) continue;
        for (const val of searchParams.getAll(otherKey)) {
          paramsWithout.append(otherKey, val);
        }
      }

      // Filter searched recipes by all other dimensions
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

  // All section ids open by default
  const defaultOpenSections = useMemo(
    () => sortedSections.map((s) => s.id),
    [sortedSections],
  );

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-8 h-fit">
        {/* Sort section */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium">Sort by</h3>
          <RadioGroup onValueChange={handleSortChange} value={currentSort}>
            {SORT_OPTIONS.map((option) => (
              <label
                className="flex cursor-pointer items-center gap-2"
                key={option.value}
              >
                <RadioGroupItem value={option.value} />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Filter sections */}
        <Accordion defaultValue={defaultOpenSections} type="multiple">
          {sortedSections.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger>{section.title}</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  {section.items.map((item) => {
                    const count = facetedCounts[section.id]?.[item.value] ?? 0;
                    const isChecked = searchParams
                      .getAll(section.id)
                      .includes(item.value);

                    return (
                      <label
                        className="flex cursor-pointer items-center gap-2"
                        key={item.value}
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={(checked) =>
                            handleFilterToggle(
                              section.id,
                              item.value,
                              checked === true,
                            )
                          }
                        />
                        <span className="text-sm">{item.label}</span>
                        <span className="text-muted-foreground ml-auto text-xs">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Clear all filters */}
        {hasActiveFilters && (
          <button
            className="text-accent-foreground mt-4 text-sm underline underline-offset-2"
            onClick={handleClearAll}
            type="button"
          >
            Clear all filters
          </button>
        )}
      </div>
    </aside>
  );
}
