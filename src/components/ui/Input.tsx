import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const inputVariants = cva(
  "w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all disabled:opacity-60 disabled:bg-gray-100",
  {
    variants: {
      variant: {
        default: "border-gray-300 focus:border-primary focus:ring-primary",
        error:
          "border-red-500 text-red-700 focus:border-red-500 focus:ring-red-500",
        filled:
          "border-transparent bg-gray-100 focus:border-primary focus:ring-primary",
      },
      inputSize: {
        sm: "h-8 text-sm",
        md: "h-10 text-base",
        lg: "h-12 text-lg",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
      rounded: "lg",
    },
  }
);

export interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, variant, inputSize, rounded, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          inputVariants({ variant, inputSize, rounded }),
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
