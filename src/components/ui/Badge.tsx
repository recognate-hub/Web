import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "accent" | "outline" | "inset";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
        {
          "bg-base text-text-primary shadow-neu": variant === "default",
          "bg-accent text-white shadow-primary-btn": variant === "accent",
          "border border-black/10 text-text-secondary": variant === "outline",
          "bg-base text-text-primary shadow-neu-inset": variant === "inset",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
