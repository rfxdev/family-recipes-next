import type { FilterSection, SortValue } from '@/_types/filters';

// Only values with matching dummy recipes are included.

export const FILTER_SECTIONS: FilterSection[] = [
  {
    id: 'cuisine',
    items: [
      { label: 'British', value: 'british' },
      { label: 'Chinese', value: 'chinese' },
      { label: 'French', value: 'french' },
      { label: 'Indian', value: 'indian' },
      { label: 'Italian', value: 'italian' },
      { label: 'Moroccan', value: 'moroccan' },
    ],
    order: 1,
    title: 'Cuisine',
  },
  {
    id: 'meal_type',
    items: [
      { label: 'Breakfast', value: 'breakfast' },
      { label: 'Main', value: 'main' },
      { label: 'Pudding', value: 'pudding' },
      { label: 'Side', value: 'side' },
    ],
    order: 2,
    title: 'Meal Type',
  },
  {
    id: 'dish_style',
    items: [
      { label: 'Curry', value: 'curry' },
      { label: 'Noodles', value: 'noodles' },
      { label: 'Pasta', value: 'pasta' },
      { label: 'Pie', value: 'pie' },
      { label: 'Pizza', value: 'pizza' },
      { label: 'Rice Dish', value: 'rice-dish' },
      { label: 'Roast', value: 'roast' },
      { label: 'Salad', value: 'salad' },
      { label: 'Soup', value: 'soup' },
      { label: 'Stew & Casserole', value: 'stew-casserole' },
      { label: 'Stir Fry', value: 'stir-fry' },
    ],
    order: 3,
    title: 'Dish Style',
  },
  {
    id: 'proteins',
    items: [
      { label: 'Beef', value: 'beef' },
      { label: 'Eggs', value: 'eggs' },
      { label: 'Fish', value: 'fish' },
      { label: 'Lamb', value: 'lamb' },
      { label: 'Legumes', value: 'legumes' },
      { label: 'Pork', value: 'pork' },
      { label: 'Poultry', value: 'poultry' },
      { label: 'Seafood', value: 'seafood' },
    ],
    order: 4,
    title: 'Protein',
  },
  {
    id: 'special_occasions',
    items: [
      { label: 'BBQ', value: 'bbq' },
      { label: 'Christmas', value: 'christmas' },
      { label: 'Sunday Roast', value: 'sunday-roast' },
    ],
    order: 5,
    title: 'Occasion',
  },
  {
    id: 'dietary_restrictions',
    items: [
      { label: 'Gluten Free', value: 'gluten-free' },
      { label: 'Pescatarian', value: 'pescatarian' },
      { label: 'Vegetarian', value: 'vegetarian' },
    ],
    order: 6,
    title: 'Dietary',
  },
  {
    id: 'difficulty',
    items: [
      { label: 'Easy', value: 'easy' },
      { label: 'Moderate', value: 'moderate' },
      { label: 'Challenging', value: 'challenging' },
    ],
    order: 7,
    title: 'Difficulty',
  },
  {
    id: 'time_category',
    items: [
      { label: 'Quick', value: 'quick' },
      { label: 'Medium', value: 'medium' },
      { label: 'Long', value: 'long' },
    ],
    order: 8,
    title: 'Cook Time',
  },
];

/** Filter section ids used as metadata filter keys for the search sidebar. */
export const FILTER_KEYS = FILTER_SECTIONS.map((section) => section.id);

export const SORT_VALUES = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  TITLE_ASC: 'title-asc',
  TITLE_DESC: 'title-desc',
} as const satisfies Record<string, SortValue>;

export const SORT_OPTIONS = [
  { label: 'Title A\u2013Z', value: SORT_VALUES.TITLE_ASC },
  { label: 'Title Z\u2013A', value: SORT_VALUES.TITLE_DESC },
  { label: 'Newest First', value: SORT_VALUES.NEWEST },
  { label: 'Oldest First', value: SORT_VALUES.OLDEST },
] as const;

export const DEFAULT_SORT: SortValue = SORT_VALUES.TITLE_ASC;
