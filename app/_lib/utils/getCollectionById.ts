import type { CategoryItem } from '@/_types/filters';

import { CATEGORY_SECTIONS } from '@/_config/recipes';

/** Finds the CategoryItem matching the given id across all sections. Returns null if not found. */
export function getCollectionById(id: string): CategoryItem | null {
  for (const section of CATEGORY_SECTIONS) {
    const item = section.items.find((i) => i.id === id);
    if (item) return item;
  }
  return null;
}
