import { notFound } from 'next/navigation';

import { dummyRecipes } from '@/_lib/data/dummy-recipes';
import { formatIngredient } from '@/_lib/utils/formatIngredient';
import { formatTime } from '@/_lib/utils/formatTime';
import { isUrl } from '@/_lib/utils/isUrl';

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = dummyRecipes.find((r) => r.id === id);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{recipe.title}</h1>
        <p className="mt-3 text-lg text-gray-600">{recipe.description}</p>

        {/* Meta info */}
        <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">
          {recipe.prep_time_minutes && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Prep:</span>
              <span>{formatTime(recipe.prep_time_minutes)}</span>
            </div>
          )}
          {recipe.cook_time_minutes && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Cook:</span>
              <span>{formatTime(recipe.cook_time_minutes)}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="font-medium">Servings:</span>
            <span>{recipe.servings}</span>
          </div>
        </div>

        {/* Tags */}
        {recipe.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <span
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image */}
      <div className="mb-8 aspect-video overflow-hidden rounded-lg bg-gray-100">
        {recipe.image_path ? (
          <img
            alt={recipe.title}
            className="h-full w-full object-cover"
            src={recipe.image_path}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <svg
              className="h-24 w-24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
              />
            </svg>
          </div>
        )}
      </div>

      {/* Main content - Ingredients and Instructions */}
      <div className="grid gap-8 lg:grid-cols-[1fr,2fr]">
        {/* Ingredients */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Ingredients
          </h2>
          <div className="space-y-6">
            {recipe.ingredient_groups.map((group) => (
              <div key={group.order}>
                {group.name && (
                  <h3 className="mb-3 font-medium text-gray-900">
                    {group.name}
                  </h3>
                )}
                <ul className="space-y-2">
                  {group.ingredients.map((ingredient) => (
                    <li className="text-gray-700" key={ingredient.order}>
                      {formatIngredient(ingredient)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Instructions
          </h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li className="flex gap-4" key={index}>
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                  {index + 1}
                </span>
                <p className="flex-1 text-gray-700">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Source and Notes */}
      {(recipe.source || recipe.notes) && (
        <div className="mt-8 space-y-4 border-t pt-8">
          {recipe.source && (
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-2 font-medium text-gray-900">Source</h3>
              <p className="text-sm text-gray-700">
                {recipe.source.author && <span>By {recipe.source.author}</span>}
                {recipe.source.author && recipe.source.source_name && (
                  <span> • </span>
                )}
                {recipe.source.source_name && (
                  <span>{recipe.source.source_name}</span>
                )}
              </p>
              {recipe.source.details && (
                <p className="mt-1 text-sm text-gray-600">
                  {isUrl(recipe.source.details) ? (
                    <a
                      className="text-blue-600 hover:underline"
                      href={recipe.source.details}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      View original recipe
                    </a>
                  ) : (
                    recipe.source.details
                  )}
                </p>
              )}
            </div>
          )}

          {recipe.notes && (
            <div className="rounded-lg bg-amber-50 p-4">
              <h3 className="mb-2 font-medium text-gray-900">Notes</h3>
              <p className="text-sm text-gray-700">{recipe.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
