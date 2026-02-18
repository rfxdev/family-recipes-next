import { FILTER_SECTIONS } from '@/_config/filters';

/** Looks up the human-readable label for a filter value. */
export function getFilterLabel(key: string, value: string): string | undefined {
  const section = FILTER_SECTIONS.find((s) => s.id === key);
  return section?.items.find((item) => item.value === value)?.label;
}
