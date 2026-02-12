import { dummyRecipes } from '@/_lib/data/dummy-recipes';

import { RecipeCard } from './_components/RecipeCard';

export default function RecipesPage() {
  return (
    <>
      <div className="mb-4">
        <h1 className="text-foreground text-3xl font-bold">Recipes</h1>
        <p className="text-muted-foreground mt-2">
          {dummyRecipes.length}{' '}
          {dummyRecipes.length === 1 ? 'recipe' : 'recipes'}
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {dummyRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
