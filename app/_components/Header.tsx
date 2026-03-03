'use client';

import type { SubmitEvent } from 'react';

import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { routes } from '@/_config/routes';
import { cn } from '@/_lib/utils/cn';

import { DesktopNav } from './DesktopNav';
import { NavDrawer } from './NavDrawer';
import { Button } from './ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [prevSearchParams, setPrevSearchParams] = useState(searchParams);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const isOnSearchPage = pathname.startsWith(routes.search);
  const effectiveOpen = isSearchOpen || isOnSearchPage;

  // Sync query from URL on the search page (adjust state during render)
  if (searchParams !== prevSearchParams) {
    setPrevSearchParams(searchParams);
    if (isOnSearchPage) {
      setQuery(searchParams.get('q') ?? '');
    }
  }

  // Auto-focus mobile input when expanded (not on search page where it's always open)
  useEffect(() => {
    if (isSearchOpen && !isOnSearchPage) {
      mobileInputRef.current?.focus();
    }
  }, [isSearchOpen, isOnSearchPage]);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const params = new URLSearchParams(searchParams);
    params.set('q', trimmedQuery);

    if (!isOnSearchPage) {
      setQuery('');
      setIsSearchOpen(false);
    }
    router.push(`${routes.search}?${params.toString()}`);
  }

  return (
    <Collapsible asChild onOpenChange={setIsSearchOpen} open={effectiveOpen}>
      <header className="border-border bg-background border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between gap-4">
            {/* Left: hamburger (mobile) + logo */}
            <div className="flex items-center gap-1">
              <div className="sm:hidden">
                <NavDrawer />
              </div>
              <Link
                className="text-accent-foreground text-xl font-semibold"
                href={routes.home}
              >
                Kitchen Companion
              </Link>
            </div>

            {/* Desktop search — always visible on sm+ */}
            <form
              className="relative hidden max-w-xs flex-1 sm:block"
              onSubmit={handleSubmit}
            >
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

            {/* Right: search icon (mobile) + desktop nav links */}
            <div className="flex items-center gap-4">
              {/* Mobile search trigger — hidden on sm+ */}
              <CollapsibleTrigger
                className={cn(
                  'text-muted-foreground hover:text-foreground sm:hidden',
                  effectiveOpen && 'text-foreground',
                )}
              >
                <Search className="size-5" />
                <span className="sr-only">Search</span>
              </CollapsibleTrigger>

              {/* Desktop nav — hidden on mobile */}
              <div className="hidden sm:block">
                <DesktopNav />
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile expandable search */}
        <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden sm:hidden">
          <div className="border-border border-t px-4 py-3">
            <form className="flex items-center gap-2" onSubmit={handleSubmit}>
              <div className="relative flex-1">
                <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <input
                  className={cn(
                    'border-input bg-background placeholder:text-muted-foreground w-full rounded-md border py-1.5 pr-3 pl-9 text-sm',
                    'focus:ring-ring focus:ring-2 focus:outline-none',
                  )}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What would you like to cook?"
                  ref={mobileInputRef}
                  type="search"
                  value={query}
                />
              </div>
              {!isOnSearchPage && (
                <Button
                  onClick={() => setIsSearchOpen(false)}
                  size="icon"
                  variant="ghost"
                >
                  <X className="size-5" />
                  <span className="sr-only">Close search</span>
                </Button>
              )}
            </form>
          </div>
        </CollapsibleContent>
      </header>
    </Collapsible>
  );
}
