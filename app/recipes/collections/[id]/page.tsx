import { notFound } from 'next/navigation';

import { dummyRecipes } from '@/_lib/data/dummy-recipes';
import { applyRecipeParams } from '@/_lib/utils/applyRecipeParams';
import { getCollectionById } from '@/_lib/utils/getCollectionById';
import { RecipeGrid } from '@/recipes/_components/RecipeGrid';

interface CollectionPageProps {
  params: Promise<{ id: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { id } = await params;
  const item = getCollectionById(id);

  if (!item) notFound();

  // Build URLSearchParams from the collection's filters to reuse applyRecipeParams.
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(item.filters)) {
    if (Array.isArray(value)) {
      for (const v of value) searchParams.append(key, v);
    } else {
      searchParams.set(key, value);
    }
  }

  const recipes = applyRecipeParams(dummyRecipes, searchParams);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-foreground text-3xl font-bold">{item.label}</h1>
        {item.description && (
          <p className="text-muted-foreground mt-2">{item.description}</p>
        )}
      </div>

      <RecipeGrid recipes={recipes} />
    </>
  );
}
