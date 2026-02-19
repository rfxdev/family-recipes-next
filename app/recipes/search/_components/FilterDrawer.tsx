'use client';

import { X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import type { Recipe } from '@/_types/recipe';

import { Button } from '@/_components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/_components/ui/drawer';
import { useFilterState } from '@/_lib/hooks/useFilterState';
import { MobileFilterSections } from '@/recipes/search/_components/MobileFilterSections';

interface FilterDrawerProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  recipes: Recipe[];
}

export function FilterDrawer({
  onOpenChange,
  open,
  recipes,
}: FilterDrawerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { activeFilters, facetedCounts, sortedSections } =
    useFilterState(recipes);

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
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const handleClearAll = useCallback(() => {
    const params = new URLSearchParams();
    const q = searchParams.get('q');
    if (q) params.set('q', q);
    const sort = searchParams.get('sort');
    if (sort) params.set('sort', sort);
    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  return (
    <Drawer onOpenChange={onOpenChange} open={open}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-base font-semibold">Filters</DrawerTitle>
          <DrawerClose className="text-muted-foreground hover:text-foreground rounded-sm p-1">
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </DrawerClose>
        </DrawerHeader>

        <div className="no-scrollbar overflow-y-auto px-4 py-4">
          <MobileFilterSections
            activeFilters={activeFilters}
            facetedCounts={facetedCounts}
            onFilterToggle={handleFilterToggle}
            sections={sortedSections}
          />
        </div>

        <DrawerFooter>
          <div className="flex gap-3">
            <Button
              className="flex-1 rounded-lg"
              onClick={handleClearAll}
              variant="outline"
            >
              Clear all filters
            </Button>
            <Button
              className="flex-1 rounded-lg"
              onClick={() => onOpenChange(false)}
              variant="accent"
            >
              See Results
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
