'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { PLANNER_NAV_LINKS } from '@/_config/planner';
import { CATEGORY_SECTIONS } from '@/_config/recipes';
import { routes } from '@/_config/routes';
import { buildRecipeUrl } from '@/_lib/utils/buildRecipeUrl';
import { cn } from '@/_lib/utils/cn';
import { sortCategoryItems } from '@/_lib/utils/sortCategoryItems';

import { Button } from './ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const navLinkClass = (active: boolean) =>
  cn(
    'flex items-center border-b py-3.5 text-sm font-medium transition-colors last:border-b-0',
    active
      ? 'text-accent-foreground'
      : 'text-foreground hover:text-accent-foreground',
  );

export function NavDrawer() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const defaultTab = pathname.startsWith('/planner') ? 'planner' : 'recipes';

  function close() {
    setOpen(false);
  }

  return (
    <Drawer direction="left" onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button className="-ml-2" size="icon" variant="ghost">
          <Menu className="size-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="flex flex-col" direction="left">
        <DrawerTitle className="sr-only">Navigation</DrawerTitle>

        {/* Close button */}
        <div className="flex shrink-0 justify-end px-3 pt-3">
          <DrawerClose asChild>
            <Button size="icon" variant="ghost">
              <X className="size-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </DrawerClose>
        </div>

        {/* Mode tabs */}
        <Tabs
          className="flex flex-1 flex-col overflow-hidden px-5 pt-2 pb-4"
          defaultValue={defaultTab}
          key={defaultTab}
        >
          <TabsList className="w-full rounded-full">
            <TabsTrigger
              className="flex-1 rounded-full text-sm"
              value="recipes"
              variant="accent"
            >
              Recipes
            </TabsTrigger>
            <TabsTrigger
              className="flex-1 rounded-full text-sm"
              value="planner"
              variant="accent"
            >
              Planner
            </TabsTrigger>
          </TabsList>

          <TabsContent className="mt-0 flex-1 overflow-y-auto" value="recipes">
            <nav className="pb-8">
              <Link
                className={navLinkClass(pathname === routes.recipes)}
                href={routes.recipes}
                onClick={close}
              >
                All Recipes
              </Link>

              {CATEGORY_SECTIONS.filter((s) => s.showInMenu).map((section) => (
                <div
                  className="border-b py-3.5 last:border-b-0"
                  key={section.id}
                >
                  <p className="text-muted-foreground mb-2.5 text-xs font-semibold tracking-wider uppercase">
                    {section.title}
                  </p>
                  {sortCategoryItems(section.items).map((item) => (
                    <Link
                      className="text-foreground hover:text-accent-foreground flex items-center py-1.5 text-sm transition-colors"
                      href={buildRecipeUrl(item.filters)}
                      key={item.label}
                      onClick={close}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </TabsContent>

          <TabsContent className="mt-0 flex-1 overflow-y-auto" value="planner">
            <nav className="pb-8">
              {PLANNER_NAV_LINKS.map(({ href, label }) => (
                <Link
                  className={navLinkClass(pathname === href)}
                  href={href}
                  key={href}
                  onClick={close}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
}
