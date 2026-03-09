import type { Recipe } from '@/_types/recipe';

import { RecipeCard } from './RecipeCard';

interface RecipeGridProps {
  recipes: Recipe[];
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <>
      <p className="text-muted-foreground mb-4">
        {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}
      </p>

      {recipes.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground py-12 text-center">
          No recipes found for this collection.
        </p>
      )}
    </>
  );
}
