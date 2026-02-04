import { dummyRecipes } from '@/_lib/data/dummy-recipes';

import { RecipeCard } from './_components/RecipeCard';

export default function RecipesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Recipes</h1>
        <p className="mt-2 text-gray-600">
          {dummyRecipes.length}{' '}
          {dummyRecipes.length === 1 ? 'recipe' : 'recipes'}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dummyRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
