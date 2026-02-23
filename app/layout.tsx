import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Suspense } from 'react';

import { Header } from './_components/Header';
import './globals.css';

export const metadata: Metadata = {
  description: 'Your family recipes and meal planner, all in one place',
  title: 'Kitchen Companion',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <Header />
        </Suspense>
        <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
