import { describe, expect, it } from 'vitest';

import type { Recipe } from '@/_types/recipe';

import { filterRecipes } from './filterRecipes';

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

const recipes: Recipe[] = [
  makeRecipe({
    id: 'r1',
    metadata: {
      cuisine: 'british',
      difficulty: 'easy',
      meal_type: 'main',
      time_category: 'quick',
    },
  }),
  makeRecipe({
    id: 'r2',
    metadata: {
      cuisine: 'italian',
      difficulty: 'moderate',
      meal_type: 'main',
      time_category: 'medium',
    },
  }),
  makeRecipe({
    id: 'r3',
    metadata: {
      cuisine: 'british',
      dietary_restrictions: ['vegetarian'],
      difficulty: 'easy',
      meal_type: 'pudding',
      time_category: 'long',
    },
  }),
  makeRecipe({
    id: 'r4',
    metadata: {
      cuisine: 'italian',
      dietary_restrictions: ['vegetarian', 'gluten-free'],
      difficulty: 'challenging',
      meal_type: 'main',
      time_category: 'quick',
    },
  }),
];

describe('filterRecipes', () => {
  it('returns all recipes when no filter params', () => {
    const result = filterRecipes(recipes, new URLSearchParams());
    expect(result).toEqual(recipes);
  });

  it('filters by a single scalar value', () => {
    const params = new URLSearchParams('cuisine=italian');
    const result = filterRecipes(recipes, params);
    expect(result.map((r) => r.id)).toEqual(['r2', 'r4']);
  });

  it('supports multi-select within a dimension (OR logic)', () => {
    const params = new URLSearchParams('cuisine=italian&cuisine=british');
    const result = filterRecipes(recipes, params);
    expect(result).toHaveLength(4);
  });

  it('combines dimensions with AND logic', () => {
    const params = new URLSearchParams('cuisine=italian&difficulty=moderate');
    const result = filterRecipes(recipes, params);
    expect(result.map((r) => r.id)).toEqual(['r2']);
  });

  it('filters array fields (dietary_restrictions)', () => {
    const params = new URLSearchParams('dietary_restrictions=vegetarian');
    const result = filterRecipes(recipes, params);
    expect(result.map((r) => r.id)).toEqual(['r3', 'r4']);
  });

  it('supports multi-select on array fields', () => {
    const params = new URLSearchParams(
      'dietary_restrictions=vegetarian&dietary_restrictions=gluten-free',
    );
    const result = filterRecipes(recipes, params);
    // OR within dimension: recipes with vegetarian OR gluten-free
    expect(result.map((r) => r.id)).toEqual(['r3', 'r4']);
  });

  it('cross-dimension AND with multi-select OR', () => {
    const params = new URLSearchParams(
      'cuisine=italian&dietary_restrictions=vegetarian',
    );
    const result = filterRecipes(recipes, params);
    // Must be Italian AND vegetarian
    expect(result.map((r) => r.id)).toEqual(['r4']);
  });

  it('filters by difficulty', () => {
    const params = new URLSearchParams('difficulty=easy');
    const result = filterRecipes(recipes, params);
    expect(result.map((r) => r.id)).toEqual(['r1', 'r3']);
  });

  it('filters by time_category', () => {
    const params = new URLSearchParams('time_category=quick');
    const result = filterRecipes(recipes, params);
    expect(result.map((r) => r.id)).toEqual(['r1', 'r4']);
  });

  it('returns empty when no recipes match', () => {
    const params = new URLSearchParams('cuisine=french');
    const result = filterRecipes(recipes, params);
    expect(result).toEqual([]);
  });

  it('ignores unknown filter keys', () => {
    const params = new URLSearchParams('unknown=value');
    const result = filterRecipes(recipes, params);
    expect(result).toEqual(recipes);
  });
});
