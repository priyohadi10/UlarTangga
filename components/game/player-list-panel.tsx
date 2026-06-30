"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CHARACTERS } from "@/lib/config/characters";
import { PLAYER_COLORS } from "@/lib/config/player-colors";
import { POWERS } from "@/lib/config/powers";
import { cn } from "@/lib/utils/cn";
import type { Player } from "@/types";

interface PlayerListPanelProps {
  players: Player[];
  currentPlayerIndex: number;
}

export function PlayerListPanel({ players, currentPlayerIndex }: PlayerListPanelProps) {
  return (
    <Card padding="sm" className="flex flex-col gap-2">
      <h3 className="font-display px-1 text-sm font-extrabold text-ink/70">Pemain</h3>
      <div className="flex flex-col gap-1.5">
        {players.map((p, idx) => {
          const character = CHARACTERS[p.character];
          const colorDef = PLAYER_COLORS[p.colorToken];
          const isActive = idx === currentPlayerIndex && !p.isFinished;
          return (
            <motion.div
              key={p.id}
              layout
              className={cn(
                "flex items-center gap-2.5 rounded-xl border-2 p-2 transition-colors",
                isActive
                  ? "border-brand-yellow-dark bg-brand-yellow/15"
                  : "border-transparent bg-cream/60",
                p.isFinished && "opacity-50"
              )}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base shadow-sm"
                style={{
                  background: `linear-gradient(135deg, ${character.colorFrom}, ${character.colorTo})`,
                }}
              >
                {character.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-bold text-ink">{p.name}</span>
                  {p.isFinished && <span className="text-xs">🏁</span>}
                </div>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: colorDef.hex }}>
                  <span>{colorDef.label}</span>
                  {p.status.shielded && <span title="Shield aktif">🛡️</span>}
                  {p.status.frozenTurns > 0 && <span title="Dibekukan">❄️</span>}
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="font-display text-xs font-extrabold text-ink/60">
                  ⭐ {p.position}
                </span>
                {p.powers.length > 0 && (
                  <div className="flex -space-x-1">
                    {p.powers.slice(0, 3).map((pow) => {
                      const def = POWERS[pow.powerId];
                      return (
                        <span
                          key={pow.uid}
                          className="flex h-4 w-4 items-center justify-center rounded-full border border-white text-[8px] shadow-sm"
                          style={{
                            background: `linear-gradient(135deg, ${def.colorFrom}, ${def.colorTo})`,
                          }}
                          title={def.name}
                        >
                          {def.icon}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
