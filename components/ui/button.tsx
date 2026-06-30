"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-yellow text-ink shadow-chunky hover:brightness-105 active:shadow-none active:translate-y-1",
  secondary:
    "bg-brand-orange text-white shadow-chunky hover:brightness-105 active:shadow-none active:translate-y-1",
  outline:
    "bg-white text-ink border-2 border-ink/10 shadow-chunky-sm hover:border-ink/20 active:shadow-none active:translate-y-1",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
  danger:
    "bg-brand-red text-white shadow-chunky hover:brightness-105 active:shadow-none active:translate-y-1",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-xl gap-1.5",
  md: "px-6 py-3 text-base rounded-2xl gap-2",
  lg: "px-8 py-4 text-lg rounded-2xl gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "font-display font-bold inline-flex items-center justify-center transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:shadow-chunky",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
