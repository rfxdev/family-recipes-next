import Link from 'next/link';

import { CATEGORY_SECTIONS } from '@/_config/recipes';
import { sortByOrder } from '@/_lib/utils/sortByOrder';
import { sortCategoryItems } from '@/_lib/utils/sortCategoryItems';

import { RecipeSection } from './RecipeSection';

export function RecipeHomepage() {
  const sections = sortByOrder(CATEGORY_SECTIONS).filter(
    (s) => sortCategoryItems(s.items).length > 0,
  );

  return (
    <div className="space-y-10">
      <p className="text-muted-foreground">
        Browse by how much time you have, what you fancy, or who made it.
      </p>

      {sections.map((section) => (
        <RecipeSection key={section.id} section={section} />
      ))}

      <Link
        className="text-accent-foreground hover:underline"
        href="/recipes?all=true"
      >
        Browse All Recipes
      </Link>
    </div>
  );
}
