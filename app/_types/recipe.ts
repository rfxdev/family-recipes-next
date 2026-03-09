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
  author_id: string; // References an Author document by id
  cooking_method?: CookingMethod;
  cuisine: Cuisine;
  dietary_restrictions?: DietaryRestriction[];
  difficulty: Difficulty;
  dish_style?: DishStyle;
  meal_type: MealType;
  proteins?: Protein[];
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
  | 'greek'
  | 'indian'
  | 'italian'
  | 'japanese'
  | 'mexican'
  | 'moroccan'
  | 'spanish'
  | 'thai'
  | 'turkish';

export type MealType =
  | 'appetiser'
  | 'breakfast'
  | 'condiment'
  | 'drink'
  | 'main'
  | 'pudding'
  | 'side'
  | 'snack';

export type Difficulty = 'challenging' | 'easy' | 'moderate';

export type TimeCategory = 'long' | 'medium' | 'quick';

export type DietaryRestriction =
  | 'dairy-free'
  | 'gluten-free'
  | 'vegan'
  | 'vegetarian';

export const PROTEINS = [
  'beef',
  'chicken',
  'eggs',
  'fish',
  'lamb',
  'legumes',
  'pork',
  'seafood',
  'turkey',
] as const;

export type Protein = (typeof PROTEINS)[number];

export type DishStyle =
  | 'curry'
  | 'noodles'
  | 'pasta'
  | 'pie'
  | 'pizza'
  | 'rice-dish'
  | 'roast'
  | 'salad'
  | 'soup'
  | 'stew-casserole'
  | 'stir-fry';

export type SpecialOccasion = 'bbq' | 'christmas' | 'sunday-roast';

export type CookingMethod =
  | 'air-fryer'
  | 'grill'
  | 'one-pot'
  | 'pressure-cooker'
  | 'slow-cooker'
  | 'smoker'
  | 'traybake';
