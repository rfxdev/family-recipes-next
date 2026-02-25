import { describe, expect, it } from 'vitest';

import type { FilterableMetadataKey } from '@/_types/filters';
import type { Recipe } from '@/_types/recipe';

import { computeFilterCounts } from './computeFilterCounts';

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
    author_id: 'test',
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

describe('computeFilterCounts', () => {
  const recipes: Recipe[] = [
    makeRecipe({
      id: 'r1',
      metadata: {
        author_id: 'test',
        cuisine: 'british',
        difficulty: 'easy',
        meal_type: 'main',
        time_category: 'quick',
      },
    }),
    makeRecipe({
      id: 'r2',
      metadata: {
        author_id: 'test',
        cuisine: 'italian',
        difficulty: 'moderate',
        meal_type: 'main',
        time_category: 'medium',
      },
    }),
    makeRecipe({
      id: 'r3',
      metadata: {
        author_id: 'test',
        cuisine: 'british',
        difficulty: 'easy',
        meal_type: 'pudding',
        time_category: 'long',
      },
    }),
  ];

  it('counts scalar fields correctly', () => {
    const counts = computeFilterCounts(recipes, 'cuisine');
    const british = counts.find((c) => c.value === 'british');
    const italian = counts.find((c) => c.value === 'italian');
    expect(british?.count).toBe(2);
    expect(italian?.count).toBe(1);
  });

  it('returns zero for values with no matches', () => {
    const counts = computeFilterCounts(recipes, 'cuisine');
    const french = counts.find((c) => c.value === 'french');
    expect(french?.count).toBe(0);
  });

  it('counts array fields correctly', () => {
    const recipesWithDietary: Recipe[] = [
      makeRecipe({
        id: 'd1',
        metadata: {
          author_id: 'test',
          cuisine: 'british',
          dietary_restrictions: ['vegetarian', 'gluten-free'],
          difficulty: 'easy',
          meal_type: 'main',
          time_category: 'quick',
        },
      }),
      makeRecipe({
        id: 'd2',
        metadata: {
          author_id: 'test',
          cuisine: 'italian',
          dietary_restrictions: ['vegetarian'],
          difficulty: 'easy',
          meal_type: 'main',
          time_category: 'quick',
        },
      }),
      makeRecipe({
        id: 'd3',
        metadata: {
          author_id: 'test',
          cuisine: 'french',
          difficulty: 'moderate',
          meal_type: 'main',
          time_category: 'medium',
        },
      }),
    ];

    const counts = computeFilterCounts(
      recipesWithDietary,
      'dietary_restrictions',
    );
    const vegetarian = counts.find((c) => c.value === 'vegetarian');
    const glutenFree = counts.find((c) => c.value === 'gluten-free');
    const pescatarian = counts.find((c) => c.value === 'pescatarian');

    expect(vegetarian?.count).toBe(2);
    expect(glutenFree?.count).toBe(1);
    expect(pescatarian?.count).toBe(0);
  });

  it('returns empty array for unknown filter key', () => {
    // Cast to test runtime safety — TypeScript now prevents this at compile time
    const counts = computeFilterCounts(
      recipes,
      'unknown' as FilterableMetadataKey,
    );
    expect(counts).toEqual([]);
  });

  it('handles empty recipe list', () => {
    const counts = computeFilterCounts([], 'cuisine');
    expect(counts.every((c) => c.count === 0)).toBe(true);
  });
});
