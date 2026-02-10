import { notFound } from 'next/navigation';

import { dummyRecipes } from '@/_lib/data/dummy-recipes';

import { RecipeDetail } from './_components/RecipeDetail';

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = dummyRecipes.find((r) => r.id === id);

  if (!recipe) {
    notFound();
  }

  return <RecipeDetail recipe={recipe} />;
}
