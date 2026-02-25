import Link from 'next/link';

import { CATEGORY_SECTIONS } from '@/_config/recipes';
import { buildRecipeUrl } from '@/_lib/utils/buildRecipeUrl';
import { sortByOrder } from '@/_lib/utils/sortByOrder';
import { sortCategoryItems } from '@/_lib/utils/sortCategoryItems';

import { RecipeCategoryCard } from './RecipeCategoryCard';

export function RecipeHomepage() {
  return (
    <div className="space-y-10">
      {sortByOrder(CATEGORY_SECTIONS).map((section) => (
        <section key={section.id}>
          <h2 className="text-foreground mb-4 text-2xl font-bold">
            {section.title}
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {sortCategoryItems(section.items).map((item) => (
              <RecipeCategoryCard
                href={buildRecipeUrl(item.filters)}
                image={item.image}
                key={item.label}
                label={item.label}
              />
            ))}
          </div>
        </section>
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
