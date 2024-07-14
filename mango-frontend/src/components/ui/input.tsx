import * as React from "react"

import { cn } from "@/lib/utils"

// Extend InputProps to include the custom `place` property
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  place?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, place, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-10 w-full rounded-md ${place === 'list' ? '' : 'border'} bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
);
Input.displayName = "Input";

export { Input };
