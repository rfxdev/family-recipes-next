'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import type { Recipe } from '@/_types/recipe';

import { applyRecipeParams } from '@/_lib/utils/applyRecipeParams';
import { RecipeCard } from '@/recipes/_components/RecipeCard';
import { DesktopFilters } from '@/recipes/search/_components/DesktopFilters';
import { FilterPills } from '@/recipes/search/_components/FilterPills';
import { MobileFilters } from '@/recipes/search/_components/MobileFilters';
import { MobileSort } from '@/recipes/search/_components/MobileSort';

interface SearchResultsProps {
  recipes: Recipe[];
}

export function SearchResults({ recipes }: SearchResultsProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const results = useMemo(
    () => applyRecipeParams(recipes, searchParams),
    [recipes, searchParams],
  );

  return (
    <div className="flex gap-8">
      <DesktopFilters recipes={recipes} />

      <div className="min-w-0 flex-1">
        <FilterPills />

        <h1 className="text-foreground mb-4 text-3xl font-bold">
          Search Results
        </h1>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-muted-foreground">
            {results.length} {results.length === 1 ? 'result' : 'results'} for
            &lsquo;{query}&rsquo;
          </p>
          <div className="lg:hidden">
            <MobileSort />
          </div>
        </div>

        {results.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground py-12 text-center">
            No recipes found for &lsquo;{query}&rsquo;
          </p>
        )}
      </div>

      <MobileFilters recipes={recipes} />
    </div>
  );
}
