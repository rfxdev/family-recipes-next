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
      {!isHero && (
        <h2 className="text-foreground mb-4 text-2xl font-bold">
          {section.title}
        </h2>
      )}

      {isHero ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {sortCategoryItems(section.items).map((item, index) => (
            <RecipeHeroCard
              className={cn(
                index === 0 &&
                  'col-span-2 aspect-video sm:col-span-1 sm:aspect-3/4',
              )}
              description={item.description ?? ''}
              href={buildCollectionUrl(item.id)}
              image={item.image}
              key={item.label}
              label={item.label}
              priority
            />
          ))}
        </div>
      ) : (
        <Carousel opts={{ align: 'start' }}>
          <CarouselContent className="-ml-4">
            {sortCategoryItems(section.items).map((item) => (
              <CarouselItem
                className="basis-[47%] pl-4 sm:basis-1/3 lg:basis-1/4"
                key={item.label}
              >
                <RecipeCategoryCard
                  href={buildCollectionUrl(item.id)}
                  image={item.image}
                  label={item.label}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </section>
  );
}
