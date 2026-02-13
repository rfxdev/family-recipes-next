export interface Recipe {
  cook_time_minutes?: number;
  created_at: string; // ISO 8601 datetime
  description: string;
  id: string; // Firestore document ID that doubles up as URL-friendly slug
  image_path?: string;
  ingredient_groups: IngredientGroup[];
  metadata: RecipeMetadata;
  method: string[];
  notes?: string;
  prep_time_minutes?: number;
  servings: number;
  title: string;
  updated_at: string; // ISO 8601 datetime
  uploaded_by: string; // Firebase Auth UID
}

export interface RecipeMetadata {
  cuisine: Cuisine;
  dietary_restrictions?: DietaryRestriction[];
  difficulty: Difficulty;
  ingredient_categories: IngredientCategory[];
  meal_type: MealType;
  recipe_author?: string; // Freeform: "Grandma Maria", "Jamie Oliver"
  source_details?: string; // Additional context
  source_name?: string; // Freeform: "BBC Good Food", "handwritten note"
  source_url?: string; // URL if imported
  special_occasions?: SpecialOccasion[];
  time_category: TimeCategory; // Auto-calculated
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
  quantity_text?: string; // Flexible quantity: "2 x 400g", "6", "thumb-sized piece"
}

export type Cuisine =
  | 'american'
  | 'british'
  | 'chinese'
  | 'french'
  | 'indian'
  | 'italian'
  | 'japanese'
  | 'mediterranean'
  | 'mexican'
  | 'moroccan'
  | 'other'
  | 'thai';

export type MealType =
  | 'appetiser'
  | 'breakfast'
  | 'condiment'
  | 'dessert'
  | 'drink'
  | 'main'
  | 'side'
  | 'snack';

export type Difficulty = 'challenging' | 'easy' | 'moderate';

export type TimeCategory = 'long' | 'medium' | 'quick';

export type DietaryRestriction =
  | 'dairy-free'
  | 'egg-free'
  | 'gluten-free'
  | 'low-carb'
  | 'nut-free'
  | 'pescatarian'
  | 'vegan'
  | 'vegetarian';

export type IngredientCategory =
  | 'beef'
  | 'cheese'
  | 'eggs'
  | 'fish'
  | 'lamb'
  | 'legumes'
  | 'pasta'
  | 'pork'
  | 'poultry'
  | 'rice'
  | 'seafood'
  | 'vegan'
  | 'vegetarian';

export type SpecialOccasion =
  | 'barbecue'
  | 'birthday'
  | 'christmas'
  | 'easter'
  | 'fathers-day'
  | 'mothers-day'
  | 'new-year'
  | 'picnic'
  | 'sunday-roast'
  | 'thanksgiving'
  | 'valentines';
