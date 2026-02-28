import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all select-none active:scale-95 focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        dark: "bg-dark text-white hover:bg-dark/90",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        light: "bg-light text-dark hover:bg-light/90",
        outline: "border border-dark text-dark hover:bg-dark hover:text-white",
        primary: "bg-primary text-white hover:bg-primary/90",
        secondary: "bg-secondary text-white hover:bg-secondary/90",
      },

      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },

      rounded: {
        none: "rounded-none",
        sm: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-full",
      },

      width: {
        full: "w-full",
        fit: "w-fit",
      },

      loading: {
        true: "opacity-90",
        false: "",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "lg",
      width: "fit",
      loading: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, rounded, loading, width, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={loading}
        className={cn(
          buttonVariants({ variant, size, rounded, loading, width }),
          className
        )}
        {...props}
      >
        {loading && (
          <span className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
