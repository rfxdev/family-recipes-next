import type { Recipe } from '@/_types/recipe';

export const dummyRecipes: Recipe[] = [
  {
    author_id: 'user_001',
    cook_time_minutes: 130,
    created_at: '2025-01-30T10:00:00Z',
    description:
      'A warming Moroccan-inspired one-pot dish with tender lamb, aromatic spices, and chickpeas. Perfect for making ahead as the flavours develop beautifully.',
    id: 'recipe_001',
    image_path: 'recipes/recipe_001/main.jpg',
    ingredient_groups: [
      {
        ingredients: [
          {
            item: 'lamb shoulder or neck fillet, diced',
            order: 1,
            quantity: 2,
            unit: 'lb',
          },
          {
            item: 'ras el hanout',
            order: 2,
            quantity: 2,
            unit: 'tbsp',
          },
          {
            item: 'olive oil',
            order: 3,
            quantity: 2,
            unit: 'tbsp',
          },
          {
            item: 'onions, roughly chopped',
            order: 4,
            quantity: 2,
            unit: 'whole',
          },
          {
            item: 'carrots, cut into chunks',
            order: 5,
            quantity: 2,
            unit: 'whole',
          },
          {
            item: 'garlic cloves, crushed',
            order: 6,
            quantity: 3,
            unit: 'clove',
          },
          {
            item: 'fresh ginger, grated',
            order: 7,
            quantity: 1,
            unit: 'tbsp',
          },
          {
            item: 'rose harissa',
            order: 8,
            quantity: 2,
            unit: 'tbsp',
          },
          {
            item: 'preserved lemon, roughly chopped',
            order: 9,
            quantity: 1,
            unit: 'whole',
          },
          {
            item: 'cinnamon stick',
            order: 10,
            quantity: 1,
            unit: 'whole',
          },
          {
            item: 'chopped tomatoes',
            order: 11,
            quantity: 14,
            unit: 'oz',
          },
          {
            item: 'chickpeas, drained',
            order: 12,
            quantity: 14,
            unit: 'oz',
          },
          {
            item: 'dried apricots, halved',
            order: 13,
            quantity: 3,
            unit: 'oz',
          },
          {
            item: 'salt',
            order: 14,
            quantity: 1,
            unit: 'to taste',
          },
        ],
        name: 'Main Ingredients',
        order: 1,
      },
      {
        ingredients: [
          {
            item: 'couscous',
            order: 1,
            quantity: 10,
            unit: 'oz',
          },
          {
            item: 'natural yogurt',
            order: 2,
            quantity: 5,
            unit: 'oz',
          },
          {
            item: 'rose harissa (for yogurt)',
            order: 3,
            quantity: 1,
            unit: 'tsp',
          },
          {
            item: 'fresh coriander, chopped',
            order: 4,
            quantity: 1,
            unit: 'handful',
          },
          {
            item: 'flaked almonds, toasted',
            order: 5,
            quantity: 2,
            unit: 'oz',
          },
        ],
        name: 'To Serve',
        order: 2,
      },
    ],
    instructions: [
      'Heat the oven to 160°C/140°C fan/gas 3. Toss the lamb pieces with the ras el hanout and a large pinch of salt to coat.',
      'Heat the oil in a large flameproof casserole over medium heat and brown the lamb on all sides in batches. Transfer to a plate using a slotted spoon.',
      'Add the onions and carrots to the pan and cook for 10-12 minutes until soft and golden, adding more oil if needed.',
      'Add the garlic and ginger, cook for 2 minutes, then stir in the 2 tbsp harissa and preserved lemon. Cook for another minute until the vegetables are coated and sticky.',
      'Add the cinnamon stick, then tip in the tomatoes and bring to a simmer. Return the lamb and any juices to the pan, season, cover and transfer to the oven for 1 hour.',
      'Stir in the chickpeas and apricots, cover again and return to the oven for 1 hour until the lamb is tender.',
      'Season to taste and leave the tagine to stand for 10 minutes.',
      'Meanwhile, swirl the 1 tsp harissa through the yogurt. Prepare the couscous according to package instructions.',
      'Scatter the tagine with coriander and flaked almonds. Serve with couscous and spiced yogurt on the side.',
    ],
    notes:
      "I sometimes add extra harissa for more heat. The preserved lemon really makes this dish - don't skip it!",
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
      'Saucy, sticky, crispy, sweet and savory cashew chicken! Just like your favorite takeout, but made easy at home.',
    id: 'recipe_002',
    image_path: 'recipes/recipe_002/main.jpg',
    ingredient_groups: [
      {
        ingredients: [
          {
            item: 'boneless skinless chicken breasts, cut into bite-sized pieces',
            order: 1,
            quantity: 1,
            unit: 'lb',
          },
          {
            item: 'flour',
            order: 2,
            quantity: 0.75,
            unit: 'cups',
          },
          {
            item: 'cornstarch',
            order: 3,
            quantity: 0.75,
            unit: 'cups',
          },
          {
            item: 'salt',
            order: 4,
            quantity: 1,
            unit: 'tsp',
          },
          {
            item: 'paprika',
            order: 5,
            quantity: 0.5,
            unit: 'tsp',
          },
          {
            item: 'cold water (for batter)',
            order: 6,
            quantity: 0.75,
            unit: 'cups',
          },
          {
            item: 'vegetable oil for frying',
            order: 7,
            quantity: 0.5,
            unit: 'cups',
          },
          {
            item: 'cashew halves',
            order: 8,
            quantity: 1,
            unit: 'cups',
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
            quantity: 0.5,
            unit: 'cups',
          },
          {
            item: 'soy sauce',
            order: 2,
            quantity: 0.25,
            unit: 'cups',
          },
          {
            item: 'white vinegar',
            order: 3,
            quantity: 2,
            unit: 'tbsp',
          },
          {
            item: 'sriracha (optional)',
            order: 4,
            quantity: 1,
            unit: 'tbsp',
          },
          {
            item: 'granulated sugar',
            order: 5,
            quantity: 0.25,
            unit: 'cups',
          },
          {
            item: 'fresh garlic, grated',
            order: 6,
            quantity: 2,
            unit: 'clove',
          },
          {
            item: 'fresh ginger, grated',
            order: 7,
            quantity: 1,
            unit: 'tbsp',
          },
        ],
        name: 'Sauce',
        order: 2,
      },
    ],
    instructions: [
      'Make the batter: Mix the flour, cornstarch, salt, and paprika together. Set aside half of the flour mixture in a small bowl. Mix the other half with 3/4 cup cold water to form a loose batter.',
      'Make the sauce: Whisk all sauce ingredients together and set aside.',
      'Heat the oil in a large nonstick skillet over medium heat until a drop of water sizzles across the top (about 350-375°F).',
      'Dredge the chicken pieces in the dry flour mixture, then dip into the batter, letting excess drip off. Add battered chicken to the hot oil and fry for 2-3 minutes on each side until golden and crispy. Work in batches if needed.',
      'Remove the fried chicken from the pan and drain on a paper towel-lined plate. Drain out any excess oil from the pan.',
      'Return the chicken to the pan. Add the sauce and cashews. Stir for about 1 minute until everything is coated and you can smell the garlic.',
      'Serve immediately over steamed rice with roasted or steamed broccoli on the side.',
    ],
    notes:
      'The chicken shortcut tip makes this so much easier - just toss all the chicken in flour and batter together instead of piece by piece. Game changer!',
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
