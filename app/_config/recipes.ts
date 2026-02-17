import type { CategorySection } from '@/_types/filters';

// Only values with matching dummy recipes are included.
// Images are picked from a representative recipe for each value.

export const CATEGORY_SECTIONS: CategorySection[] = [
  {
    id: 'cuisine',
    items: [
      {
        filter: { key: 'cuisine', value: 'british' },
        image: '/images/recipes/steak-rarebit.webp',
        label: 'British',
      },
      {
        filter: { key: 'cuisine', value: 'chinese' },
        image: '/images/recipes/cashew-chicken.webp',
        label: 'Chinese',
      },
      {
        filter: { key: 'cuisine', value: 'french' },
        image: '/images/recipes/ham-and-cheese-galettes.webp',
        label: 'French',
      },
      {
        filter: { key: 'cuisine', value: 'indian' },
        image: '/images/recipes/chicken-berry-britannia.webp',
        label: 'Indian',
      },
      {
        filter: { key: 'cuisine', value: 'italian' },
        image: '/images/recipes/creamy-prawn-tagliatelle.webp',
        label: 'Italian',
      },
      {
        filter: { key: 'cuisine', value: 'moroccan' },
        image: '/images/recipes/lamb-tagine.jpg',
        label: 'Moroccan',
      },
    ],
    order: 1,
    showInMenu: true,
    title: 'By Cuisine',
  },
  {
    id: 'meal_type',
    items: [
      {
        filter: { key: 'meal_type', value: 'breakfast' },
        image: '/images/recipes/ham-and-cheese-galettes.webp',
        label: 'Breakfast',
      },
      {
        filter: { key: 'meal_type', value: 'main' },
        image: '/images/recipes/lamb-tagine.jpg',
        label: 'Main',
      },
      {
        filter: { key: 'meal_type', value: 'pudding' },
        image: '/images/recipes/sticky-date-and-banana-pudding.webp',
        label: 'Pudding',
      },
      {
        filter: { key: 'meal_type', value: 'side' },
        image: '/images/recipes/gunpowder-potatoes.webp',
        label: 'Side',
      },
    ],
    order: 2,
    showInMenu: true,
    title: 'By Meal Type',
  },
  {
    id: 'dietary_restrictions',
    items: [
      {
        filter: { key: 'dietary_restrictions', value: 'gluten-free' },
        image: '/images/recipes/ham-and-cheese-galettes.webp',
        label: 'Gluten Free',
      },
      {
        filter: { key: 'dietary_restrictions', value: 'pescatarian' },
        image: '/images/recipes/creamy-prawn-tagliatelle.webp',
        label: 'Pescatarian',
      },
      {
        filter: { key: 'dietary_restrictions', value: 'vegetarian' },
        image: '/images/recipes/curried-lentil-cottage-pie.webp',
        label: 'Vegetarian',
      },
    ],
    order: 3,
    showInMenu: true,
    title: 'By Dietary',
  },
];

/** Category section ids used as metadata filter keys (e.g. cuisine, meal_type). */
export const CATEGORY_FILTER_KEYS = CATEGORY_SECTIONS.map(
  (section) => section.id,
);
