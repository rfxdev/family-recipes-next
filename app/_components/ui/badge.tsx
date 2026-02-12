import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/_lib/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border border-transparent px-3 py-1 text-sm font-medium whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none gap-1 transition-[color,box-shadow] overflow-hidden',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'bg-accent text-accent-foreground border-accent-foreground/20',
        secondary: 'bg-secondary text-secondary-foreground',
        tertiary: 'bg-tertiary text-tertiary-foreground',
      },
    },
  },
);

function Badge({
  className,
  variant = 'default',
  ...props
}: ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      data-slot="badge"
      data-variant={variant}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
