import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    return (
      <div className='relative'>
        <input
          type={showPassword ? 'text' : type}
          className={twMerge(
            'flex h-10 w-full rounded-md border-none bg-gray-700 px-3 py-2 text-sm',
            'ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
            'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <Button
            type="button"
            variant='ghost'
            className='absolute top-1/2 -translate-y-1/2 right-1 w-auto p-2 '
            onClick={() => setShowPassword(value => !value)}
          >
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </Button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };