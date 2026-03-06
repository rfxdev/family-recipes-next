import { SiGithub } from '@icons-pack/react-simple-icons';
import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-(--footer-background) text-(--footer-foreground)">
      <div className="page-container py-6 lg:pt-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md lg:max-w-2xl">
            <p className="text-base font-semibold">About</p>
            <p className="mt-3 text-sm leading-relaxed">
              A lovingly curated recipe collection and meal planner for the
              whole family. Browse by cuisine and occasion, plan your week, and
              keep everything in one place.
            </p>
          </div>

          <Link
            className="flex items-center gap-2 text-sm transition-colors hover:underline"
            href="https://github.com/rfxdev/family-recipes-next"
            rel="noopener noreferrer"
            target="_blank"
          >
            <SiGithub className="size-4" />
            View source on GitHub
          </Link>
        </div>

        <div className="mt-6 border-t border-(--footer-border) pt-6">
          <p className="text-xs">© {year} Kitchen Companion</p>
        </div>
      </div>
    </footer>
  );
}
