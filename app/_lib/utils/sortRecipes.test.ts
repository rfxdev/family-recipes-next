import { describe, expect, it } from 'vitest';

import type { Recipe } from '@/_types/recipe';

import { sortRecipes } from './sortRecipes';

/** Helper to create URLSearchParams with an optional sort value. */
const params = (sort?: string) => new URLSearchParams(sort ? { sort } : {});

const makeRecipe = (overrides: Partial<Recipe> = {}): Recipe => ({
  cook_time_minutes: 30,
  created_at: '2025-01-01T00:00:00Z',
  description: 'A simple dish',
  id: 'test-recipe',
  ingredient_groups: [
    {
      ingredients: [{ item: 'chicken', order: 1, quantity_text: '500g' }],
      name: 'Main',
      order: 1,
    },
  ],
  metadata: {
    cuisine: 'british',
    difficulty: 'easy',
    meal_type: 'main',
    time_category: 'medium',
  },
  method: ['Cook it.'],
  prep_time_minutes: 10,
  servings: 4,
  title: 'Test Recipe',
  updated_at: '2025-01-01T00:00:00Z',
  uploaded_by: 'user-1',
  ...overrides,
});

const recipes = [
  makeRecipe({
    created_at: '2025-02-01T00:00:00Z',
    id: 'b',
    title: 'Banana Bread',
  }),
  makeRecipe({
    created_at: '2025-01-01T00:00:00Z',
    id: 'a',
    title: 'Apple Pie',
  }),
  makeRecipe({
    created_at: '2025-03-01T00:00:00Z',
    id: 'c',
    title: 'Chicken Curry',
  }),
];

describe('sortRecipes', () => {
  it('returns a new array (immutable)', () => {
    const result = sortRecipes(recipes, params());
    expect(result).not.toBe(recipes);
  });

  it('defaults to title-asc when no sort param given', () => {
    const result = sortRecipes(recipes, params());
    expect(result.map((r) => r.id)).toEqual(['a', 'b', 'c']);
  });

  it('sorts by title ascending', () => {
    const result = sortRecipes(recipes, params('title-asc'));
    expect(result.map((r) => r.id)).toEqual(['a', 'b', 'c']);
  });

  it('sorts by title descending', () => {
    const result = sortRecipes(recipes, params('title-desc'));
    expect(result.map((r) => r.id)).toEqual(['c', 'b', 'a']);
  });

  it('sorts by newest first', () => {
    const result = sortRecipes(recipes, params('newest'));
    expect(result.map((r) => r.id)).toEqual(['c', 'b', 'a']);
  });

  it('sorts by oldest first', () => {
    const result = sortRecipes(recipes, params('oldest'));
    expect(result.map((r) => r.id)).toEqual(['a', 'b', 'c']);
  });

  it('does not mutate the original array', () => {
    const original = [...recipes];
    sortRecipes(recipes, params('title-asc'));
    expect(recipes).toEqual(original);
  });
});
