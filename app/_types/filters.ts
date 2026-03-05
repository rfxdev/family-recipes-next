/** Metadata fields that can be used as filter or browse keys. */
export type FilterableMetadataKey =
  | 'cuisine'
  | 'dietary_restrictions'
  | 'difficulty'
  | 'dish_style'
  | 'meal_type'
  | 'proteins'
  | 'special_occasions'
  | 'time_category';

export interface CategoryItem {
  /** Short descriptor shown on hero cards (Pick Your Pace only). */
  description?: string;
  /** Filter params to apply when the item is selected. Supports multi-key (Pick Your Pace) and multi-value (repeated params) filters. */
  filters: Record<string, string | string[]>;
  image: string;
  label: string;
  /** Number of matching recipes. Items with order === 0 are hidden. */
  order: number;
}

export interface CategorySection {
  /** Subtitle shown under the section heading. */
  description?: string;
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
