import Link from 'next/link';

import { Button } from '@/_components/ui/button';
import { CATEGORY_SECTIONS } from '@/_config/recipes';
import { routes } from '@/_config/routes';
import { sortByOrder } from '@/_lib/utils/sortByOrder';
import { sortCategoryItems } from '@/_lib/utils/sortCategoryItems';

import { RecipeSection } from './_components/RecipeSection';

export default function RecipesPage() {
  const sections = sortByOrder(CATEGORY_SECTIONS).filter(
    (s) => sortCategoryItems(s.items).length > 0,
  );

  const heroSection = sections.find((s) => s.hero);
  const otherSections = sections.filter((s) => !s.hero);

  return (
    <>
      <h1 className="text-foreground mb-4 text-center text-3xl font-bold">
        Recipes
      </h1>

      <div className="space-y-6">
        <p className="text-foreground text-center">
          Whether you&#39;ve got 20 minutes or the whole afternoon, there&#39;s
          something here worth cooking.
        </p>

        {heroSection && <RecipeSection section={heroSection} />}

        <div className="flex justify-center">
          <Button asChild className="rounded-full" size="lg" variant="accent">
            <Link href={routes.recipesAll}>Browse All Recipes →</Link>
          </Button>
        </div>

        {otherSections.map((section) => (
          <RecipeSection key={section.id} section={section} />
        ))}
      </div>
    </>
  );
}
