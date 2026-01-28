import vitest from '@vitest/eslint-plugin';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  perfectionist.configs['recommended-natural'],

  // TypeScript enhancements
  {
    extends: [tseslint.configs.recommended],
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Consistent type imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports',
        },
      ],
      // Unused variables (but allow _prefixed ones)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  // React/JSX enhancements
  {
    files: ['**/*.tsx'],
    rules: {
      // No unnecessary curly braces in JSX
      'react/jsx-curly-brace-presence': ['error', 'never'],
      // Self-closing tags when no children
      'react/self-closing-comp': 'error',
    },
  },

  // Vitest for test files
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },

  // Override default ignores of eslint-config-next
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'coverage/**',
    '.vitest/**',
  ]),
]);

export default eslintConfig;
