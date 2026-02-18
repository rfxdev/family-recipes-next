'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

import type { Recipe } from '@/_types/recipe';

import { useFilterState } from '@/_lib/hooks/useFilterState';
import { FilterDrawer } from '@/recipes/search/_components/FilterDrawer';

interface MobileFiltersProps {
  recipes: Recipe[];
}

export function MobileFilters({ recipes }: MobileFiltersProps) {
  const [open, setOpen] = useState(false);
  const { activeFilterCount } = useFilterState(recipes);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 p-4 lg:hidden">
        <button
          className="bg-accent-foreground text-background mx-auto flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-lg"
          onClick={() => setOpen(true)}
          type="button"
        >
          <SlidersHorizontal className="size-4" />
          Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
        </button>
      </div>

      <FilterDrawer onOpenChange={setOpen} open={open} recipes={recipes} />
    </>
  );
}
