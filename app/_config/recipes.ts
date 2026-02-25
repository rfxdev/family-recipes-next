import type { CategorySection } from '@/_types/filters';

// order = number of matching recipes in the current dataset.
// Items with order === 0 are hidden in the UI but kept here so they appear
// automatically once recipes are added (run sortCategoryItems in components).

export const CATEGORY_SECTIONS: CategorySection[] = [
  {
    id: 'pick_your_pace',
    items: [
      {
        filters: {
          difficulty: 'easy',
          meal_type: 'main',
          time_category: 'quick',
        },
        image: '/images/recipes/cashew-chicken.webp',
        label: 'Weeknight Winners',
        order: 1,
      },
      {
        filters: { difficulty: 'moderate', time_category: ['medium', 'long'] },
        image: '/images/recipes/lamb-tagine.jpg',
        label: 'Worth the Effort',
        order: 8,
      },
      {
        filters: { difficulty: 'challenging', time_category: 'long' },
        image: '/images/recipes/steak-rarebit.webp',
        label: 'Weekend Project',
        order: 1,
      },
    ],
    order: 1,
    showInMenu: true,
    title: 'Pick Your Pace',
  },
  {
    id: 'dish_style',
    items: [
      {
        filters: { dish_style: 'curry' },
        image: '',
        label: 'Curry',
        order: 0,
      },
      {
        filters: { dish_style: 'noodles' },
        image: '',
        label: 'Noodles',
        order: 0,
      },
      {
        filters: { dish_style: 'pasta' },
        image: '/images/recipes/creamy-prawn-tagliatelle.webp',
        label: 'Pasta',
        order: 3,
      },
      {
        filters: { dish_style: 'pie' },
        image: '/images/recipes/curried-lentil-cottage-pie.webp',
        label: 'Pie',
        order: 1,
      },
      {
        filters: { dish_style: 'pizza' },
        image: '',
        label: 'Pizza',
        order: 0,
      },
      {
        filters: { dish_style: 'rice-dish' },
        image: '/images/recipes/pilau-rice.webp',
        label: 'Rice Dish',
        order: 1,
      },
      {
        filters: { dish_style: 'roast' },
        image: '',
        label: 'Roast',
        order: 0,
      },
      {
        filters: { dish_style: 'salad' },
        image: '',
        label: 'Salad',
        order: 0,
      },
      {
        filters: { dish_style: 'soup' },
        image: '',
        label: 'Soup',
        order: 0,
      },
      {
        filters: { dish_style: 'stew-casserole' },
        image: '/images/recipes/lamb-tagine.jpg',
        label: 'Stew & Casserole',
        order: 1,
      },
    ],
    order: 2,
    showInMenu: true,
    title: 'In the Mood For',
  },
  {
    id: 'meal_type',
    items: [
      {
        filters: { meal_type: 'appetiser' },
        image: '',
        label: 'Appetiser',
        order: 0,
      },
      {
        filters: { meal_type: 'breakfast' },
        image: '/images/recipes/ham-and-cheese-galettes.webp',
        label: 'Breakfast',
        order: 1,
      },
      {
        filters: { meal_type: 'condiment' },
        image: '',
        label: 'Condiment',
        order: 0,
      },
      {
        filters: { meal_type: 'drink' },
        image: '',
        label: 'Drink',
        order: 0,
      },
      {
        filters: { meal_type: 'main' },
        image: '/images/recipes/lamb-tagine.jpg',
        label: 'Main',
        order: 10,
      },
      {
        filters: { meal_type: 'pudding' },
        image: '/images/recipes/sticky-date-and-banana-pudding.webp',
        label: 'Pudding',
        order: 1,
      },
      {
        filters: { meal_type: 'side' },
        image: '/images/recipes/gunpowder-potatoes.webp',
        label: 'Side',
        order: 2,
      },
      {
        filters: { meal_type: 'snack' },
        image: '',
        label: 'Snack',
        order: 0,
      },
    ],
    order: 3,
    showInMenu: true,
    title: 'By Meal Type',
  },
  {
    id: 'cuisine',
    items: [
      {
        filters: { cuisine: 'american' },
        image: '',
        label: 'American',
        order: 0,
      },
      {
        filters: { cuisine: 'british' },
        image: '/images/recipes/steak-rarebit.webp',
        label: 'British',
        order: 4,
      },
      {
        filters: { cuisine: 'chinese' },
        image: '/images/recipes/cashew-chicken.webp',
        label: 'Chinese',
        order: 1,
      },
      {
        filters: { cuisine: 'french' },
        image: '/images/recipes/ham-and-cheese-galettes.webp',
        label: 'French',
        order: 1,
      },
      {
        filters: { cuisine: 'greek' },
        image: '',
        label: 'Greek',
        order: 0,
      },
      {
        filters: { cuisine: 'indian' },
        image: '/images/recipes/chicken-berry-britannia.webp',
        label: 'Indian',
        order: 4,
      },
      {
        filters: { cuisine: 'italian' },
        image: '/images/recipes/creamy-prawn-tagliatelle.webp',
        label: 'Italian',
        order: 3,
      },
      {
        filters: { cuisine: 'japanese' },
        image: '',
        label: 'Japanese',
        order: 0,
      },
      {
        filters: { cuisine: 'mexican' },
        image: '',
        label: 'Mexican',
        order: 0,
      },
      {
        filters: { cuisine: 'moroccan' },
        image: '/images/recipes/lamb-tagine.jpg',
        label: 'Moroccan',
        order: 1,
      },
      {
        filters: { cuisine: 'spanish' },
        image: '',
        label: 'Spanish',
        order: 0,
      },
      {
        filters: { cuisine: 'thai' },
        image: '',
        label: 'Thai',
        order: 0,
      },
      {
        filters: { cuisine: 'turkish' },
        image: '',
        label: 'Turkish',
        order: 0,
      },
    ],
    order: 4,
    showInMenu: true,
    title: 'By Cuisine',
  },
  {
    id: 'proteins',
    items: [
      {
        filters: { proteins: 'beef' },
        image: '/images/recipes/steak-rarebit.webp',
        label: 'Beef',
        order: 1,
      },
      {
        filters: { proteins: 'eggs' },
        image: '/images/recipes/ham-and-cheese-galettes.webp',
        label: 'Eggs',
        order: 1,
      },
      {
        filters: { proteins: 'fish' },
        image: '/images/recipes/cod-with-roasted-chilli-butter.webp',
        label: 'Fish',
        order: 1,
      },
      {
        filters: { proteins: 'lamb' },
        image: '/images/recipes/lamb-tagine.jpg',
        label: 'Lamb',
        order: 1,
      },
      {
        filters: { proteins: 'legumes' },
        image: '/images/recipes/curried-lentil-cottage-pie.webp',
        label: 'Legumes',
        order: 2,
      },
      {
        filters: { proteins: 'pork' },
        image: '',
        label: 'Pork',
        order: 0,
      },
      {
        filters: { proteins: 'poultry' },
        image: '/images/recipes/chilli-chicken.webp',
        label: 'Poultry',
        order: 3,
      },
      {
        filters: { proteins: 'seafood' },
        image: '/images/recipes/clam-prawn-chorizo-linguine.webp',
        label: 'Seafood',
        order: 3,
      },
    ],
    order: 5,
    showInMenu: true,
    title: 'Ingredients',
  },
  {
    id: 'special_occasions',
    items: [
      {
        filters: { special_occasions: 'bbq' },
        image: '',
        label: 'BBQ',
        order: 0,
      },
      {
        filters: { special_occasions: 'christmas' },
        image: '',
        label: 'Christmas',
        order: 0,
      },
      {
        filters: { special_occasions: 'sunday-roast' },
        image: '',
        label: 'Sunday Roast',
        order: 0,
      },
    ],
    order: 6,
    showInMenu: true,
    title: 'Occasions',
  },
  {
    id: 'dietary_restrictions',
    items: [
      {
        filters: { dietary_restrictions: 'gluten-free' },
        image: '/images/recipes/ham-and-cheese-galettes.webp',
        label: 'Gluten Free',
        order: 1,
      },
      {
        filters: { dietary_restrictions: 'pescatarian' },
        image: '',
        label: 'Pescatarian',
        order: 0,
      },
      {
        filters: { dietary_restrictions: 'vegetarian' },
        image: '/images/recipes/curried-lentil-cottage-pie.webp',
        label: 'Vegetarian',
        order: 3,
      },
    ],
    order: 7,
    showInMenu: true,
    title: 'By Dietary',
  },
];
