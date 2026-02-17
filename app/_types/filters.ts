import type {
  Cuisine,
  DietaryRestriction,
  Difficulty,
  MealType,
  TimeCategory,
} from './recipe';

/** Metadata fields that can be used as filter or browse keys. */
export type FilterableMetadataKey =
  | 'cuisine'
  | 'dietary_restrictions'
  | 'difficulty'
  | 'meal_type'
  | 'time_category';

/** Maps each filterable key to its value union. */
export type FilterableMetadataValue<K extends FilterableMetadataKey> =
  K extends 'cuisine'
    ? Cuisine
    : K extends 'meal_type'
      ? MealType
      : K extends 'dietary_restrictions'
        ? DietaryRestriction
        : K extends 'difficulty'
          ? Difficulty
          : K extends 'time_category'
            ? TimeCategory
            : never;

export interface CategoryItem {
  filter: { key: FilterableMetadataKey; value: string };
  image: string;
  label: string;
}

export interface CategorySection {
  id: FilterableMetadataKey;
  items: CategoryItem[];
  order: number;
  showInMenu: boolean;
  title: string;
}

export interface FilterItem {
  label: string;
  value: string;
}

export interface FilterSection {
  id: FilterableMetadataKey;
  items: FilterItem[];
  order: number;
  title: string;
}

export type SortValue = 'newest' | 'oldest' | 'title-asc' | 'title-desc';
