import { routes } from '@/_config/routes';

/** Builds the URL for a collection page, e.g. `/recipes/collections/pasta` */
export function buildCollectionUrl(id: string): string {
  return routes.collection(id);
}
