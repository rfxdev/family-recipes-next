'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { routes } from '@/_config/routes';
import { cn } from '@/_lib/utils/cn';

export function Header() {
  const pathname = usePathname();
  const isRecipesActive = pathname.startsWith('/recipes');

  return (
    <header className="border-border bg-background border-b">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <Link
            className="text-foreground text-xl font-semibold"
            href={routes.home}
          >
            Family Recipes
          </Link>

          <div className="flex gap-6">
            <Link
              className={cn(
                'transition-colors',
                isRecipesActive
                  ? 'text-accent-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground',
              )}
              href={routes.recipes}
            >
              Recipes
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
