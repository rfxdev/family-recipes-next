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
    title: 'By Cuisine',
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
    title: 'By Meal Type',
  },
  {
    id: 'dietary_restrictions',
    items: [
      { label: 'Gluten Free', value: 'gluten-free' },
      { label: 'Pescatarian', value: 'pescatarian' },
      { label: 'Vegetarian', value: 'vegetarian' },
    ],
    order: 3,
    title: 'By Dietary',
  },
  {
    id: 'difficulty',
    items: [
      { label: 'Easy', value: 'easy' },
      { label: 'Moderate', value: 'moderate' },
      { label: 'Challenging', value: 'challenging' },
    ],
    order: 4,
    title: 'By Difficulty',
  },
  {
    id: 'time_category',
    items: [
      { label: 'Quick', value: 'quick' },
      { label: 'Medium', value: 'medium' },
      { label: 'Long', value: 'long' },
    ],
    order: 5,
    title: 'By Cook Time',
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
