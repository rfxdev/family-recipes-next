import type { Recipe } from '@/_types/recipe';

export const dummyRecipes: Recipe[] = [
  {
    author_id: 'user_001',
    cook_time_minutes: 130,
    created_at: '2025-01-30T10:00:00Z',
    description:
      'A warming Moroccan-inspired one-pot dish with tender lamb, aromatic spices, and chickpeas. Perfect for making ahead as the flavours develop beautifully.',
    id: 'lamb-tagine-with-chickpeas',
    image_path: 'recipes/recipe_001/main.jpg',
    ingredient_groups: [
      {
        ingredients: [
          {
            item: 'lamb shoulder or neck fillet',
            order: 1,
            preparation: 'cut into large chunks',
            quantity_text: '1kg',
          },
          {
            item: 'ras el hanout',
            order: 2,
            quantity_text: '3 tbsp',
          },
          {
            item: 'olive oil',
            order: 3,
            preparation: 'plus an optional drizzle',
            quantity_text: '2 tbsp',
          },
          {
            item: 'onions',
            order: 4,
            preparation: 'chopped',
            quantity_text: '2',
          },
          {
            item: 'carrots',
            order: 5,
            preparation: 'cut into large chunks',
            quantity_text: '4',
          },
          {
            item: 'garlic cloves',
            order: 6,
            preparation: 'finely chopped',
            quantity_text: '6',
          },
          {
            item: 'ginger',
            order: 7,
            preparation: 'peeled and finely grated',
            quantity_text: 'thumb-sized piece',
          },
          {
            item: 'rose harissa paste',
            order: 8,
            quantity_text: '2 tbsp',
          },
          {
            item: 'preserved lemon',
            order: 9,
            preparation: 'finely chopped, or a peeled strip of lemon zest',
            quantity_text: '½',
          },
          {
            item: 'cinnamon stick',
            order: 10,
            quantity_text: '1',
          },
          {
            item: 'chopped tomatoes',
            order: 11,
            quantity_text: '400g can',
          },
          {
            item: 'chicken or lamb stock',
            order: 12,
            quantity_text: '600ml',
          },
          {
            item: 'chickpeas',
            order: 13,
            preparation: 'drained but not rinsed',
            quantity_text: '2 x 400g cans',
          },
          {
            item: 'dried apricots',
            order: 14,
            preparation: 'roughly chopped (optional)',
            quantity_text: '100g',
          },
        ],
        name: 'Main Ingredients',
        order: 1,
      },
      {
        ingredients: [
          {
            item: 'natural yogurt',
            order: 1,
            quantity_text: '150g',
          },
          {
            item: 'coriander',
            order: 2,
            preparation: 'roughly chopped',
            quantity_text: 'small bunch',
          },
          {
            item: 'flaked almonds',
            order: 3,
            preparation: 'toasted',
            quantity_text: 'small handful',
          },
          {
            item: 'couscous',
            order: 4,
            quantity_text: 'cooked',
          },
        ],
        name: 'To Serve',
        order: 2,
      },
    ],
    instructions: [
      'Toss the lamb pieces with the ras el hanout and a large pinch of salt to coat (can marinate for up to 4 hours).',
      'Heat the oven to 140°C fan.',
      'Heat the oil in a large flameproof casserole over medium heat and brown the lamb on all sides in batches. Transfer to a plate using a slotted spoon and set aside.',
      'Cook the onions and carrots in the pan for 10-12 minutes until soft and golden, adding more oil if the pan is dry.',
      'Add the garlic and ginger, and cook for 2 minutes.',
      'Stir in the 2 tbsp harissa and preserved lemon. Cook for another minute until the vegetables are coated and sticky.',
      'Add the cinnamon stick, then tip in the tomatoes and bring to a simmer. Cook for a few minutes until reduced to a thick paste.',
      'Return the lamb and its resting juices to the pan and pour over the stock. Season and bring to a simmer.',
      'Cover and transfer to the oven to cook for 1 hour.',
      'Stir in the chickpeas and apricots, cover again and return to the oven for 1 hour until the lamb is tender.',
      'Season to taste and leave the tagine to stand for 10 minutes.',
      'Scatter the tagine with coriander and flaked almonds. Serve with couscous and yogurt on the side.',
    ],
    prep_time_minutes: 20,
    servings: 6,
    source: {
      author: 'Tom Kerridge',
      details:
        'https://www.bbcgoodfood.com/recipes/one-pan-lamb-tagine-with-chickpeas',
      source_name: 'BBC Good Food',
    },
    tags: ['moroccan', 'one-pot', 'comfort-food', 'make-ahead', 'lamb'],
    title: 'One-Pan Lamb Tagine with Chickpeas',
    updated_at: '2025-01-30T10:00:00Z',
  },
  {
    author_id: 'user_002',
    cook_time_minutes: 15,
    created_at: '2025-01-30T11:00:00Z',
    description:
      'Saucy, sticky, crispy, sweet and savory cashew chicken! Just like your favourite takeout, but made easy at home.',
    id: 'cashew-chicken',
    image_path: 'recipes/recipe_002/main.jpg',
    ingredient_groups: [
      {
        ingredients: [
          {
            item: 'boneless skinless chicken breasts or thighs',
            order: 1,
            preparation: 'cut into bite-sized pieces',
            quantity_text: '450g',
          },
          {
            item: 'flour',
            order: 2,
            quantity_text: '90g',
          },
          {
            item: 'cornstarch',
            order: 3,
            quantity_text: '90g',
          },
          {
            item: 'salt',
            order: 4,
            quantity_text: '1 tsp',
          },
          {
            item: 'paprika',
            order: 5,
            quantity_text: '½ tsp',
          },
          {
            item: 'cold water',
            order: 6,
            preparation: 'for batter',
            quantity_text: '180ml',
          },
          {
            item: 'vegetable oil',
            order: 7,
            preparation: 'for frying',
            quantity_text: '120ml',
          },
          {
            item: 'cashew halves',
            order: 8,
            quantity_text: '150g',
          },
        ],
        name: 'Chicken',
        order: 1,
      },
      {
        ingredients: [
          {
            item: 'hoisin sauce',
            order: 1,
            quantity_text: '120ml',
          },
          {
            item: 'soy sauce',
            order: 2,
            quantity_text: '60ml',
          },
          {
            item: 'white vinegar',
            order: 3,
            quantity_text: '2 tbsp',
          },
          {
            item: 'sriracha',
            order: 4,
            preparation: 'optional',
            quantity_text: '1 tbsp',
          },
          {
            item: 'granulated sugar',
            order: 5,
            quantity_text: '50g',
          },
          {
            item: 'fresh garlic',
            order: 6,
            preparation: 'grated',
            quantity_text: '2 cloves',
          },
          {
            item: 'fresh ginger',
            order: 7,
            preparation: 'grated',
            quantity_text: '1 tbsp',
          },
        ],
        name: 'Sauce',
        order: 2,
      },
    ],
    instructions: [
      'Make the batter: Mix the flour, cornstarch, salt, and paprika together. Set aside half of the flour mixture in a small bowl. Mix the other half with 180ml cold water to form a loose batter.',
      'Preheat the air fryer to 200°C.',
      'Dredge the chicken pieces in the dry flour mixture, then dip into the batter, letting excess drip off. Place in the air fryer basket in a single layer, working in batches if needed.',
      'Air fry for 12-15 minutes, flipping halfway through, until golden and crispy.',
      'While the chicken cooks, toast the cashews in a dry pan over medium heat for 2-3 minutes until fragrant. Remove and set aside.',
      'Whisk the sauce ingredients together, then add to the same pan and heat for 5 minutes, stirring occasionally.',
      'Add the cooked chicken and toasted cashews to the pan with the sauce. Toss for about 1 minute until everything is coated.',
      'Serve immediately over steamed rice with roasted or steamed broccoli on the side.',
    ],
    notes:
      'This works well without the batter too - just air fry the plain chicken pieces and toss with the sauce. Lighter, quicker, and easier to make gluten-free.',
    prep_time_minutes: 15,
    servings: 4,
    source: {
      author: 'Lindsay Ostrom',
      details: 'https://pinchofyum.com/cashew-chicken',
      source_name: 'Pinch of Yum',
    },
    tags: ['chinese-inspired', 'takeout', 'fried', 'comfort-food', 'quick'],
    title: 'Cashew Chicken',
    updated_at: '2025-01-30T11:00:00Z',
  },
];
