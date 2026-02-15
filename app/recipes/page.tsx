import { Suspense } from 'react';

import { CATEGORY_FILTER_KEYS } from '@/_config/recipes';
import { dummyRecipes } from '@/_lib/data/dummy-recipes';

import { RecipeHomepage } from './_components/RecipeHomepage';
import { RecipeList } from './_components/RecipeList';

interface RecipesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const params = await searchParams;
  // Show the recipe list when ?all is set (browse all) or a category filter
  // is active (e.g. ?cuisine=italian). Otherwise show the homepage grid.
  const hasFilter =
    params.all !== undefined ||
    CATEGORY_FILTER_KEYS.some((key) => params[key] !== undefined);

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
