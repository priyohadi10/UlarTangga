"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface FeatureCardProps {
  icon: string;
  title: string;
  subtitle: string;
  onClick?: () => void;
  className?: string;
}

export function FeatureCard({ icon, title, subtitle, onClick, className }: FeatureCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ y: 0, scale: 0.98 }}
      className={cn(
        "flex items-center gap-3 rounded-2xl border-2 border-ink/[0.06] bg-white p-4 text-left shadow-chunky-sm transition-colors hover:border-brand-yellow/60",
        className
      )}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream text-2xl">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="font-display truncate text-sm font-bold text-ink">{title}</div>
        <div className="truncate text-xs text-ink/50">{subtitle}</div>
      </div>
    </motion.button>
  );
}
