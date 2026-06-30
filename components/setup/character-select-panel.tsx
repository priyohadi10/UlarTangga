"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CHARACTER_LIST } from "@/lib/config/characters";
import { cn } from "@/lib/utils/cn";
import type { CharacterId } from "@/types";

interface CharacterSelectPanelProps {
  selected: CharacterId;
  onSelect: (id: CharacterId) => void;
}

export function CharacterSelectPanel({ selected, onSelect }: CharacterSelectPanelProps) {
  return (
    <Card>
      <div className="mb-3">
        <h3 className="font-display text-base font-extrabold text-ink">
          Pilih Karakter / Pion
        </h3>
        <p className="text-xs text-ink/50">Hanya kosmetik, tidak memengaruhi gameplay</p>
      </div>
      <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-8">
        {CHARACTER_LIST.map((c) => {
          const isSelected = selected === c.id;
          return (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => onSelect(c.id)}
              whileTap={{ scale: 0.92 }}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl border-2 p-2.5 transition-all",
                isSelected
                  ? "border-brand-yellow-dark bg-brand-yellow/20 shadow-chunky-sm -translate-y-0.5"
                  : "border-ink/10 bg-cream hover:-translate-y-0.5"
              )}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full text-xl"
                style={{
                  background: `linear-gradient(135deg, ${c.colorFrom}, ${c.colorTo})`,
                }}
              >
                {c.emoji}
              </span>
              <span className="text-[10px] font-bold text-ink/70">{c.name}</span>
            </motion.button>
          );
        })}
      </div>
    </Card>
  );
}
