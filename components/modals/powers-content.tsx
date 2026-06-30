"use client";

import { POWER_LIST } from "@/lib/config/powers";

export function PowersContent() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {POWER_LIST.map((p) => (
        <div
          key={p.id}
          className="flex items-center gap-3 rounded-xl border-2 border-ink/[0.06] bg-cream p-3"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base"
            style={{ background: `linear-gradient(135deg, ${p.colorFrom}, ${p.colorTo})` }}
          >
            {p.icon}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">{p.name}</p>
            <p className="truncate text-xs text-ink/50">{p.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
