"use client";

import { Card } from "@/components/ui/card";
import { SelectChip } from "@/components/ui/select-chip";
import { Button } from "@/components/ui/button";
import type { GameMode } from "@/types";

interface ModeSelectPanelProps {
  mode: GameMode;
  botCount: number;
  playerCount: number;
  onChangeBotCount: (n: number) => void;
  onChangePlayerCount: (n: number) => void;
}

const BOT_OPTIONS = [2, 3, 4, 5, 6];
const PLAYER_OPTIONS = [2, 3, 4, 5, 6, 7, 8, 9, 10];

export function ModeSelectPanel({
  mode,
  botCount,
  playerCount,
  onChangeBotCount,
  onChangePlayerCount,
}: ModeSelectPanelProps) {
  return (
    <Card>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-2xl">
          {mode === "single" ? "🤖" : "👥"}
        </div>
        <div>
          <h3 className="font-display text-lg font-extrabold text-ink">
            {mode === "single" ? "Single Player" : "Multiplayer"}
          </h3>
          <p className="text-xs text-ink/50">
            {mode === "single" ? "Pilih jumlah bot" : "Pilih jumlah pemain"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {mode === "single"
          ? BOT_OPTIONS.map((n) => (
              <SelectChip
                key={n}
                label={`${n} BOT`}
                selected={botCount === n}
                onClick={() => onChangeBotCount(n)}
                colorToken="yellow"
              />
            ))
          : PLAYER_OPTIONS.map((n) => (
              <SelectChip
                key={n}
                label={`${n} Pemain`}
                selected={playerCount === n}
                onClick={() => onChangePlayerCount(n)}
                colorToken="blue"
              />
            ))}
      </div>
    </Card>
  );
}
