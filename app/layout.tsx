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
        <main>{children}</main>
      </body>
    </html>
  );
}
