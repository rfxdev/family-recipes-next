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
  item: string; // Core ingredient name
  order: number;
  preparation?: string; // Optional: "chopped", "drained", etc.
  quantity_text: string; // Flexible quantity: "2 x 400g", "6", "thumb-sized piece"
}

export interface RecipeSource {
  author?: string;
  details?: null | string;
  source_name?: string;
}
