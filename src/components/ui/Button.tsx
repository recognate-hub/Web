import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-base text-text-primary shadow-neu hover:shadow-neu-hover active:shadow-neu-inset":
              variant === "default",
            "bg-accent text-white shadow-primary-btn hover:bg-accent-hover active:scale-95":
              variant === "primary",
            "border-2 border-base shadow-neu bg-transparent text-text-primary hover:shadow-neu-hover active:shadow-neu-inset":
              variant === "outline",
            "hover:bg-black/5 text-text-secondary hover:text-text-primary active:bg-black/10":
              variant === "ghost",
            "h-10 px-6 py-2": size === "default",
            "h-8 rounded-xl px-4 text-xs": size === "sm",
            "h-12 rounded-2xl px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
