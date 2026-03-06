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
    author_id: 'test',
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
    makeRecipe({ id: 'r3', title: 'Paneer Curry' }),
    makeRecipe({ id: 'r4', title: 'Lentil Soup' }),
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

  it('returns multiple matches', () => {
    const results = searchRecipes(recipes, params('chicken'));
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.some((r) => r.id === 'r1')).toBe(true);
  });

  it('returns empty array when nothing matches', () => {
    const results = searchRecipes(recipes, params('xylophone'));
    expect(results).toEqual([]);
  });

  it('matches whole words only, not substrings within other words', () => {
    const testRecipes = [
      makeRecipe({ id: 'pie', title: 'Steak Pie' }),
      makeRecipe({
        description: 'Cut into pieces.',
        id: 'pieces',
        title: 'Chicken Bites',
      }),
    ];
    const results = searchRecipes(testRecipes, params('pie'));
    expect(results).toHaveLength(1);
    expect(results[0]?.id).toBe('pie');
  });

  it('does not match partial words', () => {
    const results = searchRecipes(recipes, params('car'));
    expect(results).toHaveLength(0);
  });
});
