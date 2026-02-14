import { Clock, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { Recipe } from '@/_types/recipe';

import { Badge } from '@/_components/ui/badge';
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
      className="group border-border bg-card flex flex-col overflow-hidden rounded-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:border"
      href={routes.recipeDetail(recipe.id)}
    >
      {/* Image */}
      <div className="bg-muted relative aspect-4/3 overflow-hidden">
        {recipe.image_path ? (
          <Image
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={recipe.image_path}
          />
        ) : (
          <div className="text-muted-foreground/40 flex h-full flex-col items-center justify-center gap-2">
            <UtensilsCrossed className="size-12" strokeWidth={1} />
          </div>
        )}

        {/* Easy badge overlay */}
        {recipe.metadata.difficulty === 'easy' && (
          <div className="absolute top-3 left-3">
            <Badge className="shadow-md">Easy</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 pt-3 lg:p-3">
        {/* Category label */}
        <p className="text-accent-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
          <span>{formatLabel(recipe.metadata.cuisine)}</span>
          <span className="text-muted-foreground">·</span>
          <span>{formatLabel(recipe.metadata.meal_type)}</span>
        </p>

        {/* Title */}
        <h2 className="text-card-foreground group-hover:text-accent-foreground text-xl leading-tight font-semibold transition-colors">
          {recipe.title}
        </h2>

        {/* Description */}
        <p className="text-card-foreground line-clamp-2 text-sm leading-relaxed">
          {recipe.description}
        </p>

        {/* Spacer to push metadata to bottom */}
        <div className="mt-auto" />

        {/* Metadata row */}
        <div className="text-card-foreground flex flex-wrap items-center gap-2 text-sm">
          {totalTime > 0 && (
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {formatTime(totalTime)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
