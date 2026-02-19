'use client';

import type { ComponentProps } from 'react';

import { Collapsible as CollapsiblePrimitive } from 'radix-ui';

import { cn } from '@/_lib/utils/cn';

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

function CollapsibleTrigger({
  className,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      className={cn('cursor-pointer', className)}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
