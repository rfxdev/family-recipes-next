import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/_lib/utils/cn';

interface RecipeHeroCardProps {
  className?: string;
  description: string;
  href: string;
  image: string;
  label: string;
  priority?: boolean;
}

export function RecipeHeroCard({
  className,
  description,
  href,
  image,
  label,
  priority,
}: RecipeHeroCardProps) {
  return (
    <Link
      className={cn(
        'group border-border bg-card relative flex aspect-3/4 items-end overflow-hidden rounded-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:border',
        className,
      )}
      href={href}
    >
      <Image
        alt={label}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        fill
        priority={priority}
        sizes="(max-width: 640px) 80vw, 33vw"
        src={image}
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

      <div className="relative px-4 pb-4">
        <p className="text-xl font-bold text-white">{label}</p>
        <p className="mt-1 text-sm text-white/80">{description}</p>
      </div>
    </Link>
  );
}
