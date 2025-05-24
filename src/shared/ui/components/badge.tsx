// shared/ui/components/badge.tsx
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-gray-600 text-gray-200",
        primary: "bg-blue-100 text-blue-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        danger: "bg-red-100 text-red-800",
        outline: "border border-gray-300 bg-transparent text-gray-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "outline";
}

export const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <span
      className={twMerge(badgeVariants({ variant }), className)}
      {...props}
    />
  );
};