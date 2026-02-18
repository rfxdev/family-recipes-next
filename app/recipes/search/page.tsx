import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { routes } from '@/_config/routes';
import { dummyRecipes } from '@/_lib/data/dummy-recipes';

import { SearchResults } from './_components/SearchResults';

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q.trim() : '';

  if (!query) redirect(routes.recipes);

  return (
    <Suspense>
      <SearchResults recipes={dummyRecipes} />
    </Suspense>
  );
}
