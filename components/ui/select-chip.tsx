"use client";

import { cn } from "@/lib/utils/cn";

interface SelectChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  colorToken?: "yellow" | "green" | "red" | "blue";
  className?: string;
}

const selectedColorMap: Record<NonNullable<SelectChipProps["colorToken"]>, string> = {
  yellow: "bg-brand-yellow border-brand-yellow-dark text-ink",
  green: "bg-brand-green border-brand-green-dark text-white",
  red: "bg-brand-red border-brand-red-dark text-white",
  blue: "bg-brand-blue border-brand-blue-dark text-white",
};

export function SelectChip({
  label,
  selected,
  onClick,
  icon,
  colorToken = "yellow",
  className,
}: SelectChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "font-display font-bold text-sm sm:text-base rounded-2xl border-2 px-3 py-2.5 sm:px-4 sm:py-3 transition-all duration-150 flex items-center justify-center gap-1.5",
        selected
          ? cn(selectedColorMap[colorToken], "shadow-chunky-sm -translate-y-0.5")
          : "bg-white border-ink/10 text-ink/70 hover:border-ink/20 hover:-translate-y-0.5",
        className
      )}
    >
      {icon}
      {label}
    </button>
  );
}
