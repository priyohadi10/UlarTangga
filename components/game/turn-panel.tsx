"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Dice } from "./dice";
import { CHARACTERS } from "@/lib/config/characters";
import { PLAYER_COLORS } from "@/lib/config/player-colors";
import type { Player, TurnPhase } from "@/types";

interface TurnPanelProps {
  currentPlayer: Player | undefined;
  diceValue: number | null;
  turnPhase: TurnPhase;
  onRoll: () => void;
}

export function TurnPanel({ currentPlayer, diceValue, turnPhase, onRoll }: TurnPanelProps) {
  if (!currentPlayer) return null;

  const character = CHARACTERS[currentPlayer.character];
  const colorDef = PLAYER_COLORS[currentPlayer.colorToken];
  const isHumanTurn = currentPlayer.kind === "human";
  const canRoll = isHumanTurn && turnPhase === "idle";

  return (
    <Card padding="sm" className="flex flex-col items-center gap-3 text-center">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-ink/40">
          Giliran Sekarang
        </p>
        <motion.div
          key={currentPlayer.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-1 flex items-center justify-center gap-2"
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full text-base"
            style={{
              background: `linear-gradient(135deg, ${character.colorFrom}, ${character.colorTo})`,
            }}
          >
            {character.emoji}
          </span>
          <span className="font-display text-base font-extrabold" style={{ color: colorDef.hex }}>
            {currentPlayer.name}
          </span>
        </motion.div>
      </div>

      <Dice
        value={diceValue}
        isRolling={turnPhase === "rolling"}
        disabled={!canRoll}
        onRoll={onRoll}
      />

      {!isHumanTurn && turnPhase !== "idle" && (
        <p className="text-xs italic text-ink/40">Bot sedang berpikir...</p>
      )}
    </Card>
  );
}
