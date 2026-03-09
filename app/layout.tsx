import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Suspense } from 'react';

import { Footer } from './_components/Footer';
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
        <main className="bg-background">
          <div className="page-container pt-4 pb-6 lg:pt-6 lg:pb-8">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
