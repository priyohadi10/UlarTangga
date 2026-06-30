"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { POWERS, MANUAL_POWERS } from "@/lib/config/powers";
import { cn } from "@/lib/utils/cn";
import type { OwnedPower, Player } from "@/types";

interface PowerPanelProps {
  currentPlayer: Player | undefined;
  otherPlayers: Player[];
  onActivate: (uid: string, targetPlayerId?: string) => void;
  disabled: boolean;
}

export function PowerPanel({
  currentPlayer,
  otherPlayers,
  onActivate,
  disabled,
}: PowerPanelProps) {
  const [pendingTarget, setPendingTarget] = useState<OwnedPower | null>(null);

  if (!currentPlayer) return null;

  const manualPowers = currentPlayer.powers.filter((p) =>
    MANUAL_POWERS.includes(p.powerId as (typeof MANUAL_POWERS)[number])
  );

  const needsTarget = (powerId: string) =>
    powerId === "freeze" || powerId === "swap-position";

  const handleClick = (owned: OwnedPower) => {
    if (needsTarget(owned.powerId)) {
      setPendingTarget(owned);
      return;
    }
    onActivate(owned.uid);
  };

  return (
    <Card padding="sm">
      <h3 className="font-display mb-2 px-1 text-sm font-extrabold text-ink/70">
        Super Powers Kamu
      </h3>
      {manualPowers.length === 0 ? (
        <p className="px-1 text-xs text-ink/40">
          Belum ada power. Dapatkan di kotak ⚡ saat berjalan!
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {manualPowers.map((owned) => {
            const def = POWERS[owned.powerId];
            return (
              <button
                key={owned.uid}
                type="button"
                disabled={disabled}
                onClick={() => handleClick(owned)}
                title={def.description}
                className="flex items-center gap-1.5 rounded-xl border-2 border-ink/10 bg-cream px-2.5 py-1.5 text-xs font-bold text-ink transition-all hover:-translate-y-0.5 hover:border-brand-yellow-dark disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[10px]"
                  style={{
                    background: `linear-gradient(135deg, ${def.colorFrom}, ${def.colorTo})`,
                  }}
                >
                  {def.icon}
                </span>
                {def.name}
              </button>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {pendingTarget && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden rounded-xl bg-ink/[0.03] p-3"
          >
            <p className="mb-2 text-xs font-bold text-ink/60">Pilih target lawan:</p>
            <div className="flex flex-wrap gap-2">
              {otherPlayers
                .filter((p) => !p.isFinished)
                .map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      onActivate(pendingTarget.uid, p.id);
                      setPendingTarget(null);
                    }}
                    className={cn(
                      "rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-ink shadow-chunky-sm transition-transform hover:-translate-y-0.5"
                    )}
                  >
                    {p.name}
                  </button>
                ))}
              <button
                type="button"
                onClick={() => setPendingTarget(null)}
                className="rounded-lg px-3 py-1.5 text-xs font-bold text-ink/40 hover:text-ink/60"
              >
                Batal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
