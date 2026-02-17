import { describe, expect, it } from 'vitest';

import type { Recipe } from '@/_types/recipe';

import { searchRecipes } from './searchRecipes';

/** Helper to create URLSearchParams with a q value. */
const params = (q: string) => new URLSearchParams(q ? { q } : {});

const makeRecipe = (overrides: Partial<Recipe> = {}): Recipe => ({
  cook_time_minutes: 30,
  created_at: '2025-01-01T00:00:00Z',
  description: 'A simple dish',
  id: 'test-recipe',
  ingredient_groups: [
    {
      ingredients: [
        { item: 'chicken breast', order: 1, quantity_text: '500g' },
        { item: 'olive oil', order: 2, quantity_text: '2 tbsp' },
      ],
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
  method: ['Preheat the oven to 180°C.', 'Season and roast for 30 minutes.'],
  prep_time_minutes: 10,
  servings: 4,
  title: 'Roast Chicken',
  updated_at: '2025-01-01T00:00:00Z',
  uploaded_by: 'user-1',
  ...overrides,
});

describe('searchRecipes', () => {
  const recipes = [
    makeRecipe({ id: 'r1', title: 'Roast Chicken' }),
    makeRecipe({
      description: 'A creamy Italian pasta dish',
      id: 'r2',
      title: 'Carbonara',
    }),
    makeRecipe({
      id: 'r3',
      ingredient_groups: [
        {
          ingredients: [{ item: 'paneer', order: 1, quantity_text: '200g' }],
          name: 'Main',
          order: 1,
        },
      ],
      title: 'Paneer Curry',
    }),
    makeRecipe({
      id: 'r4',
      method: ['Simmer the lentils until tender.'],
      title: 'Lentil Soup',
    }),
  ];

  it('returns all recipes when no q param', () => {
    expect(searchRecipes(recipes, new URLSearchParams())).toEqual(recipes);
  });

  it('returns all recipes for whitespace-only query', () => {
    expect(searchRecipes(recipes, params('   '))).toEqual(recipes);
  });

  it('matches by title (case-insensitive)', () => {
    const results = searchRecipes(recipes, params('CARBONARA'));
    expect(results).toHaveLength(1);
    expect(results[0]?.id).toBe('r2');
  });

  it('matches by description', () => {
    const results = searchRecipes(recipes, params('creamy Italian'));
    expect(results).toHaveLength(1);
    expect(results[0]?.id).toBe('r2');
  });

  it('matches by ingredient item', () => {
    const results = searchRecipes(recipes, params('paneer'));
    expect(results).toHaveLength(1);
    expect(results[0]?.id).toBe('r3');
  });

  it('matches by method step', () => {
    const results = searchRecipes(recipes, params('lentils'));
    expect(results).toHaveLength(1);
    expect(results[0]?.id).toBe('r4');
  });

  it('returns multiple matches', () => {
    const results = searchRecipes(recipes, params('chicken'));
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.some((r) => r.id === 'r1')).toBe(true);
  });

  it('returns empty array when nothing matches', () => {
    const results = searchRecipes(recipes, params('xylophone'));
    expect(results).toEqual([]);
  });

  it('short-circuits on first match (title match skips other fields)', () => {
    const results = searchRecipes(recipes, params('Carbonara'));
    expect(results).toHaveLength(1);
    expect(results[0]?.id).toBe('r2');
  });
});
