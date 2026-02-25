import type { CategoryItem } from '@/_types/filters';

/** Filters out items with no matching recipes and sorts by count (desc) then label (asc). */
export function sortCategoryItems(items: CategoryItem[]): CategoryItem[] {
  return items
    .filter((item) => item.order > 0)
    .sort((a, b) => b.order - a.order || a.label.localeCompare(b.label));
}
