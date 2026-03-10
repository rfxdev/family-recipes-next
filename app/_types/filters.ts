/** Metadata fields that can be used as filter or browse keys. */
export type FilterableMetadataKey =
  | 'cooking_method'
  | 'cuisine'
  | 'dietary_restrictions'
  | 'difficulty'
  | 'dish_style'
  | 'meal_type'
  | 'proteins'
  | 'special_occasions'
  | 'time_category';

export interface CategoryItem {
  /** Number of matching recipes. Items with count === 0 are hidden. */
  count: number;
  /** Short descriptor shown on hero cards and collection pages. */
  description: string;
  /** Filter params to apply when the item is selected. Supports multi-key (Pick Your Pace) and multi-value (repeated params) filters. */
  filters: Record<string, string | string[]>;
  /**
   * Unique identifier used as the collection URL path param (`/recipes/collections/{id}`).
   * Must be unique across ALL items in CATEGORY_SECTIONS, not just within a single section.
   * Use kebab-case, e.g. 'weeknight-winners', 'pasta', 'stew-and-casserole'.
   */
  id: string;
  image: string;
  label: string;
  /** Optional explicit display position. Takes precedence over count-based ordering. */
  order?: number;
}

export interface CategorySection {
  /** Marks this section for the hero layout (desktop 3-col grid, mobile carousel of tall cards). */
  hero?: boolean;
  /** Section identifier. Usually matches a metadata field, but may be a computed view ID (e.g. 'pick_your_pace'). */
  id: string;
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
