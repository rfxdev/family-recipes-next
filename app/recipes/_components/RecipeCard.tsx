import Link from 'next/link';

import type { Recipe } from '@/_types/recipe';

import { routes } from '@/_lib/routes';
import { formatLabel } from '@/_lib/utils/formatLabel';
import { formatTime } from '@/_lib/utils/formatTime';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime =
    (recipe.prep_time_minutes ?? 0) + (recipe.cook_time_minutes ?? 0);

  return (
    <Link
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
      href={routes.recipeDetail(recipe.id)}
    >
      {/* Image placeholder - will show actual images later */}
      <div className="aspect-[4/3] bg-gray-100">
        {recipe.image_path ? (
          <img
            alt={recipe.title}
            className="h-full w-full object-cover"
            src={recipe.image_path}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <svg
              className="h-12 w-12"
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

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
          {recipe.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-600">
          {recipe.description}
        </p>

        {/* Meta info */}
        <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
          {totalTime > 0 && (
            <div className="flex items-center gap-1">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <span>{formatTime(totalTime)}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        {/* Metadata badges */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
            {formatLabel(recipe.metadata.cuisine)}
          </span>
          <span className="rounded-full bg-purple-50 px-2 py-1 text-xs text-purple-700">
            {formatLabel(recipe.metadata.difficulty)}
          </span>
          <span className="rounded-full bg-green-50 px-2 py-1 text-xs text-green-700">
            {formatLabel(recipe.metadata.time_category)}
          </span>
        </div>
      </div>
    </Link>
  );
}
