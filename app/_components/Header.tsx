'use client';

import type { SubmitEvent } from 'react';

import { Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { routes } from '@/_config/routes';
import { cn } from '@/_lib/utils/cn';

import { DesktopNav } from './DesktopNav';
import { NavDrawer } from './NavDrawer';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [prevSearchParams, setPrevSearchParams] = useState(searchParams);

  const isOnSearchPage = pathname.startsWith(routes.search);
  const isOnRecipesPage = pathname.startsWith('/recipes');

  // Sync query from URL on the search page (adjust state during render)
  if (searchParams !== prevSearchParams) {
    setPrevSearchParams(searchParams);
    if (isOnSearchPage) {
      setQuery(searchParams.get('q') ?? '');
    }
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const params = new URLSearchParams(searchParams);
    params.set('q', trimmedQuery);

    if (!isOnSearchPage) {
      setQuery('');
    }
    router.push(`${routes.search}?${params.toString()}`);
  }

  return (
    <>
      {/* Sticky nav — direct child of body so sticky persists for the full page */}
      <header className="border-border bg-background sticky top-0 z-10 border-b">
        <div className="page-container py-2 lg:py-4">
          <nav className="grid grid-cols-[1fr_auto_1fr] items-center">
            {/* Left: navigation */}
            <div>
              <div className="sm:hidden">
                <NavDrawer />
              </div>
              <div className="hidden sm:block">
                <DesktopNav />
              </div>
            </div>

            {/* Centre: logo */}
            <div className="flex justify-center">
              <Link
                className="text-accent-foreground text-xl font-semibold"
                href={routes.home}
              >
                Kitchen Companion
              </Link>
            </div>

            {/* Right: reserved for user account */}
            <div />
          </nav>
        </div>
      </header>

      {/* Search sub-header — only on recipe pages, not sticky so it scrolls away */}
      {isOnRecipesPage && (
        <div className="border-border bg-background border-b">
          <div className="page-container py-3">
            <form className="relative" onSubmit={handleSubmit}>
              <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <input
                className={cn(
                  'border-input bg-background placeholder:text-muted-foreground w-full rounded-md border py-1.5 pr-3 pl-9 text-sm',
                  'focus:ring-ring focus:ring-2 focus:outline-none',
                )}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What would you like to cook?"
                type="search"
                value={query}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
