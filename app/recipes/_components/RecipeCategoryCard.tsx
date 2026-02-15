import Image from 'next/image';
import Link from 'next/link';

interface RecipeCategoryCardProps {
  href: string;
  image: string;
  label: string;
}

export function RecipeCategoryCard({
  href,
  image,
  label,
}: RecipeCategoryCardProps) {
  return (
    <Link
      className="group border-border bg-card relative flex aspect-4/3 items-end overflow-hidden rounded-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:border"
      href={href}
    >
      <Image
        alt={label}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        src={image}
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

      <span className="relative px-3 pb-3 text-lg font-semibold text-white">
        {label}
      </span>
    </Link>
  );
}
