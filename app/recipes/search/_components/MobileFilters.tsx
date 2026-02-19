'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

import type { Recipe } from '@/_types/recipe';

import { Button } from '@/_components/ui/button';
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
      <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center p-4 lg:hidden">
        <Button
          className="rounded-full px-5 shadow-lg"
          onClick={() => setOpen(true)}
          variant="accent"
        >
          <SlidersHorizontal className="size-4" />
          Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
        </Button>
      </div>

      <FilterDrawer onOpenChange={setOpen} open={open} recipes={recipes} />
    </>
  );
}
