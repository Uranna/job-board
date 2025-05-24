import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition-colors' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
        outline: 'border border-blue-500 hover:bg-black/20 active:bg-black/30',
        ghost: 'hover:bg-black/20 active:bg-black/30',
      },
      size: {
        sm: 'px-3 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={twMerge(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };