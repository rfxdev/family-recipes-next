'use client';

import type { ComponentProps } from 'react';

import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/_lib/utils/cn';

const Drawer = DrawerPrimitive.Root;

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerTitle = DrawerPrimitive.Title;

type DrawerDirection = 'bottom' | 'left' | 'right' | 'top';

function DrawerContent({
  children,
  className,
  direction = 'bottom',
  ...props
}: ComponentProps<typeof DrawerPrimitive.Content> & {
  direction?: DrawerDirection;
}) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cn(
          'bg-background fixed z-50 flex flex-col shadow-lg',
          direction === 'bottom' &&
            'inset-x-0 bottom-0 max-h-[85dvh] rounded-t-2xl',
          direction === 'top' && 'inset-x-0 top-0 max-h-[85dvh] rounded-b-2xl',
          direction === 'left' && 'inset-y-0 left-0 h-full w-4/5 max-w-sm',
          direction === 'right' && 'inset-y-0 right-0 h-full w-4/5 max-w-sm',
          className,
        )}
        {...props}
      >
        {/* Drag handle for top/bottom sheet drawers only */}
        {(direction === 'bottom' || direction === 'top') && (
          <div className="bg-muted mx-auto mt-4 h-1 w-25 shrink-0 rounded-full" />
        )}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('mt-auto border-t px-4 py-3', className)} {...props} />
  );
}

function DrawerHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-b px-4 py-3',
        className,
      )}
      {...props}
    />
  );
}

function DrawerOverlay({
  className,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      className={cn('fixed inset-0 z-50 bg-black/50', className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
};
