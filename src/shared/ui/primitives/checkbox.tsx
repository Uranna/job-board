import React, { forwardRef } from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";

type CheckboxRef = React.ElementRef<typeof CheckboxPrimitive.Root>;
type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  label?: string;
};

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(({ className, label, ...props }, ref) => (
  <label className="flex gap-3 items-center text-gray-200">
    <CheckboxPrimitive.Root
      ref={ref}
      className={`
      peer h-4 w-4 shrink-0 rounded-sm border border-gray-200 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
      focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
      data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500
      ${className}
    `}
      {...props}
    >
      <CheckboxPrimitive.Indicator className='flex items-center justify-center text-current'>
        <CheckIcon className="h-3 w-3 text-blue-200" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label}
  </label>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
