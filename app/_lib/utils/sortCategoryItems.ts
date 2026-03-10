import type { CategoryItem } from '@/_types/filters';

/** Filters out items with no matching recipes. Sorts by explicit order first, then count (desc), then label (asc). */
export function sortCategoryItems(items: CategoryItem[]): CategoryItem[] {
  return items
    .filter((item) => item.count > 0)
    .sort((a, b) => {
      const aOrder = a.order ?? Infinity;
      const bOrder = b.order ?? Infinity;
      if (aOrder !== bOrder) return aOrder - bOrder;
      if (a.count !== b.count) return b.count - a.count;
      return a.label.localeCompare(b.label);
    });
}
