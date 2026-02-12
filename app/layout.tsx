import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';
import { Header } from './_components/Header';

export const metadata: Metadata = {
  description:
    'A modern web application for storing and sharing family recipes',
  title: 'Family Recipes',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
