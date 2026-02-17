'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import type { Recipe } from '@/_types/recipe';

import { applyRecipeParams } from '@/_lib/utils/applyRecipeParams';
import { RecipeCard } from '@/recipes/_components/RecipeCard';

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
    <>
      <p className="text-muted-foreground mb-4">
        {results.length} {results.length === 1 ? 'result' : 'results'} for
        &lsquo;{query}&rsquo;
      </p>

      {results.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground py-12 text-center">
          No recipes found for &lsquo;{query}&rsquo;
        </p>
      )}
    </>
  );
}
