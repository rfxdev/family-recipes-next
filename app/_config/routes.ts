export const routes = {
  createRecipe: '/recipes/new',
  editRecipe: (id: string) => `/recipes/${id}/edit`,
  home: '/recipes',
  recipeDetail: (id: string) => `/recipes/${id}`,
  recipes: '/recipes',
  search: '/recipes/search',
} as const;
