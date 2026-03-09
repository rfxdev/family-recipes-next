import { dummyRecipes } from '@/_lib/data/dummy-recipes';
import { RecipeGrid } from '@/recipes/_components/RecipeGrid';

export default function AllRecipesPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-foreground text-3xl font-bold">All Recipes</h1>
        <p className="text-muted-foreground mt-2">
          Everything in the collection.
        </p>
      </div>

      <RecipeGrid recipes={dummyRecipes} />
    </>
  );
}
