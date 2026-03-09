'use client';

import type { CategorySection } from '@/_types/filters';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/_components/ui/carousel';
import { buildCollectionUrl } from '@/_lib/utils/buildCollectionUrl';
import { cn } from '@/_lib/utils/cn';
import { sortCategoryItems } from '@/_lib/utils/sortCategoryItems';

import { RecipeCategoryCard } from './RecipeCategoryCard';
import { RecipeHeroCard } from './RecipeHeroCard';

interface RecipeSectionProps {
  section: CategorySection;
}

export function RecipeSection({ section }: RecipeSectionProps) {
  const isHero = section.hero;

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-foreground text-2xl font-bold">{section.title}</h2>
        {section.description && (
          <p className="text-muted-foreground mt-1 text-sm">
            {section.description}
          </p>
        )}
      </div>

      <Carousel opts={{ align: 'start' }}>
        <CarouselContent className="-ml-4">
          {sortCategoryItems(section.items).map((item) => (
            <CarouselItem
              className={cn(
                'pl-4',
                isHero
                  ? 'basis-4/5 sm:basis-1/3'
                  : 'basis-[47%] sm:basis-1/3 lg:basis-1/4',
              )}
              key={item.label}
            >
              {isHero ? (
                <RecipeHeroCard
                  description={item.description ?? ''}
                  href={buildCollectionUrl(item.id)}
                  image={item.image}
                  label={item.label}
                  priority
                />
              ) : (
                <RecipeCategoryCard
                  href={buildCollectionUrl(item.id)}
                  image={item.image}
                  label={item.label}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
