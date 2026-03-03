'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CATEGORY_SECTIONS } from '@/_config/recipes';
import { routes } from '@/_config/routes';
import { buildRecipeUrl } from '@/_lib/utils/buildRecipeUrl';
import { cn } from '@/_lib/utils/cn';
import { sortByOrder } from '@/_lib/utils/sortByOrder';
import { sortCategoryItems } from '@/_lib/utils/sortCategoryItems';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';

export function DesktopNav() {
  const pathname = usePathname();
  const isRecipesActive = pathname.startsWith('/recipes');
  const isPlannerActive = pathname.startsWith('/planner');

  // Only show sections that have at least one matching recipe
  const sections = sortByOrder(
    CATEGORY_SECTIONS.filter((s) => s.showInMenu),
  ).filter((s) => sortCategoryItems(s.items).length > 0);

  return (
    <NavigationMenu viewportContainerClassName="right-0 left-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              'hover:bg-foreground/5 focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 rounded-md px-2 py-1 font-semibold focus-visible:ring-[3px] focus-visible:outline-1',
              isRecipesActive ? 'text-accent-foreground' : 'text-foreground',
            )}
          >
            Recipes
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="w-170 p-6">
              {/* Banner: Recipe Home */}
              <NavigationMenuLink asChild variant="banner">
                <Link href={routes.recipes}>
                  <span className="text-foreground text-base">
                    Discover Recipes
                  </span>
                  <span className="text-muted-foreground group-hover:text-accent-foreground text-sm transition-colors">
                    Find your next favourite
                  </span>
                </Link>
              </NavigationMenuLink>

              {/* Category grid — CSS columns so Tab order goes down each column before the next */}
              <div className="columns-3 gap-x-8">
                {sections.map((section) => {
                  const items = sortCategoryItems(section.items);
                  return (
                    <div className="mb-5 break-inside-avoid" key={section.id}>
                      <p className="text-accent-foreground mb-2 text-sm font-semibold tracking-wider uppercase">
                        {section.title}
                      </p>
                      <ul className="space-y-0.5">
                        {items.map((item) => (
                          <li key={item.label}>
                            <NavigationMenuLink asChild variant="content-link">
                              <Link href={buildRecipeUrl(item.filters)}>
                                {item.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Footer: All Recipes flat list */}
              <div className="border-border/40 mt-5 border-t pt-3">
                <NavigationMenuLink asChild variant="content-link">
                  <Link href={routes.recipesAll}>Browse all recipes</Link>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            active={isPlannerActive}
            asChild
            className={cn(
              'rounded-md px-2 py-1 text-base font-semibold transition-colors hover:bg-transparent',
              isPlannerActive ? 'text-accent-foreground' : 'text-foreground',
            )}
          >
            <Link href={routes.planner}>Planner</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
