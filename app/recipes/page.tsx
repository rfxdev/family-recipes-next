import { Suspense } from 'react';

import { dummyRecipes } from '@/_lib/data/dummy-recipes';

import { RecipeHomepage } from './_components/RecipeHomepage';
import { RecipeList } from './_components/RecipeList';

interface RecipesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const params = await searchParams;
  // Show the recipe list when any params are present, homepage grid otherwise.
  const hasFilter = Object.keys(params).length > 0;

  return (
    <>
      <h1 className="text-foreground mb-4 text-3xl font-bold">Recipes</h1>

      {hasFilter ? (
        <Suspense>
          <RecipeList recipes={dummyRecipes} />
        </Suspense>
      ) : (
        <Suspense>
          <RecipeHomepage />
        </Suspense>
      )}
    </>
  );
}
