// shared/ui/primitives/dropdown.tsx
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';

const Root = DropdownPrimitive.Root;
const Trigger = DropdownPrimitive.Trigger;

const Content = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DropdownPrimitive.Portal>
    <DropdownPrimitive.Content
      ref={ref}
      className={twMerge(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md',
        'data-[side=top]:animate-slideDownAndFade',
        'data-[side=right]:animate-slideLeftAndFade',
        'data-[side=bottom]:animate-slideUpAndFade',
        'data-[side=left]:animate-slideRightAndFade',
        className
      )}
      {...props}
    >
      {children}
    </DropdownPrimitive.Content>
  </DropdownPrimitive.Portal>
));

const Item = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <DropdownPrimitive.Item
    ref={ref}
    className={twMerge(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
      'focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    {children}
  </DropdownPrimitive.Item>
));

export const DropdownMenu = {
  Root,
  Trigger,
  Content,
  Item,
};