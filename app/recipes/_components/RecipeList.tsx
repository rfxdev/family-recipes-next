'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import type { Recipe } from '@/_types/recipe';

import { filterRecipes } from '@/_lib/utils/filterRecipes';

import { RecipeCard } from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
}

export function RecipeList({ recipes }: RecipeListProps) {
  const searchParams = useSearchParams();

  const filteredRecipes = useMemo(
    () => filterRecipes(recipes, searchParams),
    [recipes, searchParams],
  );

  return (
    <>
      <p className="text-muted-foreground mb-4">
        {filteredRecipes.length}{' '}
        {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
      </p>

      {filteredRecipes.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground py-12 text-center">
          No recipes found for this category.
        </p>
      )}
    </>
  );
}
