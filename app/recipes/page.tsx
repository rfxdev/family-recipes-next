import Link from 'next/link';

import { CATEGORY_SECTIONS } from '@/_config/recipes';
import { routes } from '@/_config/routes';
import { sortByOrder } from '@/_lib/utils/sortByOrder';
import { sortCategoryItems } from '@/_lib/utils/sortCategoryItems';

import { RecipeSection } from './_components/RecipeSection';

export default function RecipesPage() {
  const sections = sortByOrder(CATEGORY_SECTIONS).filter(
    (s) => sortCategoryItems(s.items).length > 0,
  );

  return (
    <>
      <h1 className="text-foreground mb-4 text-3xl font-bold">Recipes</h1>

      <div className="space-y-10">
        <p className="text-muted-foreground">
          Browse by how much time you have, what you fancy, or who made it.
        </p>

        {sections.map((section) => (
          <RecipeSection key={section.id} section={section} />
        ))}

        <Link
          className="text-accent-foreground hover:underline"
          href={routes.recipesAll}
        >
          Browse All Recipes
        </Link>
      </div>
    </>
  );
}
