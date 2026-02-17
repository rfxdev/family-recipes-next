import type { SortValue } from '@/_types/filters';

import { SORT_VALUES } from '@/_config/filters';

/** Checks whether a string is a valid sort value. */
export function isSortValue(value: string): value is SortValue {
  return (Object.values(SORT_VALUES) as string[]).includes(value);
}
