import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cva } from 'class-variance-authority';
import { ChevronDownIcon } from 'lucide-react';
import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui';

import { cn } from '@/_lib/utils/cn';

function NavigationMenu({
  children,
  className,
  viewport = true,
  viewportContainerClassName,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
  viewportContainerClassName?: string;
}) {
  return (
    <NavigationMenuPrimitive.Root
      className={cn(
        'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
        className,
      )}
      data-slot="navigation-menu"
      data-viewport={viewport}
      {...props}
    >
      {children}
      {viewport && (
        <NavigationMenuViewport
          containerClassName={viewportContainerClassName}
        />
      )}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuItem({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      className={cn('relative', className)}
      data-slot="navigation-menu-item"
      {...props}
    />
  );
}

function NavigationMenuList({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      className={cn(
        'group flex flex-1 list-none items-center justify-center gap-1',
        className,
      )}
      data-slot="navigation-menu-list"
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva(
  'group inline-flex items-center justify-center gap-1 rounded-md font-medium transition-colors outline-none disabled:pointer-events-none disabled:opacity-50',
);

function NavigationMenuContent({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      className={cn(
        'data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto',
        'group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200',
        className,
      )}
      data-slot="navigation-menu-content"
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      className={cn(
        'data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in top-full z-1 flex h-1.5 items-end justify-center overflow-hidden',
        className,
      )}
      data-slot="navigation-menu-indicator"
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
}

const navigationMenuLinkVariants = cva(
  "outline-none transition-all [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
  {
    defaultVariants: { variant: 'default' },
    variants: {
      variant: {
        // Featured card link at the top of menu content
        banner:
          'group mb-5 flex flex-col gap-1 rounded-md border border-border bg-accent/50 px-3 py-2.5 font-medium hover:border-accent-foreground/50 hover:bg-accent focus:border-accent-foreground/50 focus:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1',
        // Plain text link inside menu content
        'content-link':
          'py-0.5 text-sm text-foreground hover:text-accent-foreground focus:text-accent-foreground rounded-sm focus-visible:px-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1',
        // Full interactive styling: background fill on hover/focus, padding, active state
        default:
          'flex flex-col gap-1 rounded-sm p-2 text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground data-[active=true]:hover:bg-accent data-[active=true]:focus:bg-accent',
      },
    },
  },
);

function NavigationMenuLink({
  className,
  variant,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Link> &
  VariantProps<typeof navigationMenuLinkVariants>) {
  return (
    <NavigationMenuPrimitive.Link
      className={cn(navigationMenuLinkVariants({ variant }), className)}
      data-slot="navigation-menu-link"
      {...props}
    />
  );
}

function NavigationMenuTrigger({
  children,
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(navigationMenuTriggerStyle(), 'group', className)}
      data-slot="navigation-menu-trigger"
      {...props}
    >
      {children}{' '}
      <ChevronDownIcon
        aria-hidden="true"
        className="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuViewport({
  className,
  containerClassName,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Viewport> & {
  containerClassName?: string;
}) {
  return (
    <div
      className={cn(
        'absolute top-full left-0 isolate z-50 flex justify-center',
        containerClassName,
      )}
    >
      <NavigationMenuPrimitive.Viewport
        className={cn(
          'origin-top-center bg-popover text-popover-foreground data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden rounded-md border shadow md:w-(--radix-navigation-menu-viewport-width)',
          className,
        )}
        data-slot="navigation-menu-viewport"
        {...props}
      />
    </div>
  );
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
};
