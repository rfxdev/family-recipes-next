import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  },
  test: {
    coverage: {
      exclude: [
        'app/_components/ui/**', // radix primitives copied into project
        'app/_config/**',
        'app/_lib/data/**',
        'app/_types/**',
      ],
      include: ['app/**/*.{ts,tsx}'],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
  },
});
