export interface Recipe {
  author_id: string;
  cook_time_minutes?: number;
  created_at: string; // ISO 8601 datetime
  description: string;
  id: string;
  image_path?: string;
  ingredient_groups: IngredientGroup[];
  instructions: string[];
  notes?: string;
  prep_time_minutes?: number;
  servings: number;
  source?: RecipeSource;
  tags: string[];
  title: string;
  updated_at: string; // ISO 8601 datetime
}

export interface IngredientGroup {
  ingredients: Ingredient[];
  name: string;
  order: number;
}

export interface Ingredient {
  item: string;
  order: number;
  quantity: number;
  unit: Unit;
}

export interface RecipeSource {
  author?: string;
  details?: null | string;
  source_name?: string;
}

export type Unit = CountUnit | FlexibleUnit | VolumeUnit | WeightUnit;

export type CountUnit =
  | 'bunch'
  | 'can'
  | 'clove'
  | 'package'
  | 'piece'
  | 'slice'
  | 'whole';

export type FlexibleUnit =
  | 'as needed'
  | 'dash'
  | 'handful'
  | 'pinch'
  | 'to taste';

export type VolumeUnit = 'cups' | 'fl oz' | 'L' | 'ml' | 'tbsp' | 'tsp';
export type WeightUnit = 'g' | 'kg' | 'lb' | 'oz';
