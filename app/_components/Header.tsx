'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { routes } from '@/_lib/routes';
import { cn } from '@/_lib/utils/cn';

export function Header() {
  const pathname = usePathname();
  const isRecipesActive = pathname.startsWith('/recipes');

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <Link
            className="text-xl font-semibold text-gray-900"
            href={routes.home}
          >
            Family Recipes
          </Link>

          <div className="flex gap-6">
            <Link
              className={cn(
                'transition-colors',
                isRecipesActive
                  ? 'font-semibold text-gray-900'
                  : 'text-gray-600 hover:text-gray-900',
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
