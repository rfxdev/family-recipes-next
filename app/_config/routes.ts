export const routes = {
  createRecipe: '/recipes/new',
  editRecipe: (id: string) => `/recipes/${id}/edit`,
  home: '/recipes',
  planner: '/planner',
  plannerShopping: '/planner/shopping',
  plannerTracker: '/planner/tracker',
  plannerWeek: '/planner/week',
  recipeDetail: (id: string) => `/recipes/${id}`,
  recipes: '/recipes',
  recipesAll: '/recipes?all=true',
  search: '/recipes/search',
} as const;
