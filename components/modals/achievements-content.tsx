"use client";

import { ACHIEVEMENTS } from "@/lib/config/achievements";

export function AchievementsContent() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {ACHIEVEMENTS.map((a) => (
        <div
          key={a.id}
          className="flex items-center gap-3 rounded-xl border-2 border-ink/[0.06] bg-cream p-3"
        >
          <span className="text-2xl">{a.icon}</span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">{a.name}</p>
            <p className="truncate text-xs text-ink/50">{a.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
