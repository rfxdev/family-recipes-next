'use client';

import { ArrowLeft, Clock, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import type { Recipe } from '@/_types/recipe';

import { Badge } from '@/_components/ui/badge';
import { Checkbox } from '@/_components/ui/checkbox';
import { routes } from '@/_lib/routes';
import { cn } from '@/_lib/utils/cn';
import { formatIngredient } from '@/_lib/utils/formatIngredient';
import { formatLabel } from '@/_lib/utils/formatLabel';
import { formatTime } from '@/_lib/utils/formatTime';

interface RecipeDetailProps {
  recipe: Recipe;
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(
    new Set(),
  );

  const totalTime =
    (recipe.prep_time_minutes ?? 0) + (recipe.cook_time_minutes ?? 0);

  const toggleIngredient = (id: string) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1.5 text-sm transition-colors"
        href={routes.recipes}
      >
        <ArrowLeft className="size-4" />
        Back to Recipes
      </Link>

      {/* Row 1: Title + author left, image right */}
      <div className="grid gap-8 lg:grid-cols-[3fr_5fr] lg:gap-12">
        <div className="flex flex-col justify-center">
          <h1 className="text-foreground mb-4 text-3xl font-bold lg:text-5xl">
            {recipe.title}
          </h1>

          {/* Source attribution */}
          {(recipe.metadata.recipe_author || recipe.metadata.source_name) && (
            <p className="text-muted-foreground text-xs italic">
              {recipe.metadata.recipe_author &&
                `By ${recipe.metadata.recipe_author}`}
              {recipe.metadata.recipe_author &&
                recipe.metadata.source_name &&
                ' · '}
              {recipe.metadata.source_name &&
                `From ${recipe.metadata.source_name}`}
              {recipe.metadata.source_details &&
                `, ${recipe.metadata.source_details}`}
            </p>
          )}
        </div>

        {/* Image */}
        <div className="bg-muted relative aspect-4/3 overflow-hidden rounded-lg">
          {recipe.image_path ? (
            <Image
              alt={recipe.title}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={recipe.image_path}
            />
          ) : (
            <div className="text-muted-foreground/40 flex h-full flex-col items-center justify-center">
              <UtensilsCrossed className="size-16" strokeWidth={1} />
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Metadata left, description right */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[3fr_5fr] lg:gap-12">
        <div className="text-muted-foreground flex flex-col gap-2 text-sm">
          {totalTime > 0 && (
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4" />
              {formatTime(totalTime)}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <UtensilsCrossed className="size-4" />
            {recipe.servings} servings
          </span>
          <span>{formatLabel(recipe.metadata.difficulty)}</span>
          {recipe.metadata.dietary_restrictions.map((restriction) => (
            <Badge
              className="bg-primary/10 text-primary border-primary/20 w-fit"
              key={restriction}
              variant="outline"
            >
              {formatLabel(restriction)}
            </Badge>
          ))}
        </div>

        <p className="text-muted-foreground text-base leading-relaxed lg:text-lg">
          {recipe.description}
        </p>
      </div>

      {/* Ingredients & Method */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[3fr_5fr] lg:gap-12">
        <div>
          <h2 className="text-foreground mb-6 text-2xl font-semibold">
            Ingredients
          </h2>
          <div className="space-y-6">
            {recipe.ingredient_groups.map((group) => (
              <div key={group.order}>
                {group.name && (
                  <h3 className="text-foreground mt-6 mb-3 text-lg font-semibold first:mt-0">
                    {group.name}
                  </h3>
                )}
                <div className="space-y-2">
                  {group.ingredients.map((ingredient) => {
                    const ingredientId = `ingredient-${group.order}-${ingredient.order}`;
                    const isChecked = checkedIngredients.has(ingredientId);

                    return (
                      <div
                        className="flex items-start gap-3"
                        key={ingredient.order}
                      >
                        <Checkbox
                          checked={isChecked}
                          className="mt-1"
                          id={ingredientId}
                          onCheckedChange={() => toggleIngredient(ingredientId)}
                        />
                        <label
                          className="flex-1 cursor-pointer"
                          htmlFor={ingredientId}
                        >
                          <span
                            className={cn(
                              'text-base',
                              isChecked &&
                                'text-muted-foreground/60 line-through',
                            )}
                          >
                            {formatIngredient(ingredient)}
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-foreground mb-6 text-2xl font-semibold">
            Method
          </h2>
          <ol className="list-none space-y-6">
            {recipe.instructions.map((step, index) => (
              <li className="flex gap-4" key={index}>
                <span className="text-muted-foreground shrink-0 text-lg font-medium">
                  {index + 1}.
                </span>
                <p className="text-foreground text-base leading-relaxed lg:text-lg">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          {recipe.notes && (
            <div className="border-border bg-muted/50 mt-12 rounded-lg border p-6">
              <h3 className="text-foreground mb-3 text-lg font-semibold">
                Cook&apos;s Notes
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed italic">
                {recipe.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
