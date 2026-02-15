import { routes } from '@/_config/routes';

/** Builds a recipes URL from a set of filters, e.g. `/recipes?cuisine=italian&meal_type=main` */
export function buildRecipeUrl(
  filters: Record<string, string | string[]>,
): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        params.append(key, v);
      }
    } else {
      params.set(key, value);
    }
  }

  const query = params.toString();
  return query ? `${routes.recipes}?${query}` : routes.recipes;
}
