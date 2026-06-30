"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { HistoryEntry } from "@/types";

interface HistoryPanelProps {
  history: HistoryEntry[];
}

const KIND_ICON: Record<HistoryEntry["kind"], string> = {
  move: "👣",
  snake: "🐍",
  ladder: "🪜",
  power: "⚡",
  event: "🌪️",
  win: "🎉",
  info: "ℹ️",
};

export function HistoryPanel({ history }: HistoryPanelProps) {
  return (
    <Card padding="sm" className="flex max-h-64 flex-col gap-1 overflow-hidden">
      <h3 className="font-display px-1 text-sm font-extrabold text-ink/70">Riwayat</h3>
      <div className="flex flex-col gap-1 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {history.slice(0, 12).map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-2 rounded-lg px-2 py-1.5 text-xs hover:bg-ink/[0.03]"
            >
              <span className="shrink-0">{KIND_ICON[entry.kind]}</span>
              <span className="text-ink/65">{entry.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {history.length === 0 && (
          <p className="px-2 py-2 text-xs text-ink/35">Belum ada aktivitas.</p>
        )}
      </div>
    </Card>
  );
}
