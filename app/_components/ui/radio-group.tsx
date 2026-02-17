'use client';

import type { ComponentPropsWithoutRef, ComponentRef } from 'react';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { forwardRef } from 'react';

import { cn } from '@/_lib/utils/cn';

const RadioGroup = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    className={cn('grid gap-2', className)}
    ref={ref}
    {...props}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    className={cn(
      'border-accent-foreground ring-offset-background focus-visible:ring-ring data-[state=checked]:border-accent-foreground data-[state=checked]:text-accent-foreground peer size-4 shrink-0 rounded-full border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    ref={ref}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <Circle className="fill-accent-foreground size-2.5" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
