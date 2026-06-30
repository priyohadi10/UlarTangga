"use client";

import { motion } from "framer-motion";
import { CHARACTERS } from "@/lib/config/characters";
import { PLAYER_COLORS } from "@/lib/config/player-colors";
import { tileToGrid } from "@/game/board-generator";
import type { BoardSize, Player } from "@/types";

interface PlayerTokenProps {
  player: Player;
  boardSize: BoardSize;
  totalPlayers: number;
  indexAmongPlayers: number;
  isCurrentTurn: boolean;
}

export function PlayerToken({
  player,
  boardSize,
  totalPlayers,
  indexAmongPlayers,
  isCurrentTurn,
}: PlayerTokenProps) {
  const { row, col } = tileToGrid(Math.max(1, player.position), boardSize);
  const character = CHARACTERS[player.character];
  const colorDef = PLAYER_COLORS[player.colorToken];

  // offset kecil supaya token tidak tumpuk persis saat berbagi kotak
  const offsetAngle = (indexAmongPlayers / Math.max(totalPlayers, 1)) * Math.PI * 2;
  const offsetRadius = totalPlayers > 1 ? 16 : 0;
  const offsetX = Math.cos(offsetAngle) * offsetRadius;
  const offsetY = Math.sin(offsetAngle) * offsetRadius;

  const cellPercent = 100 / boardSize;

  return (
    <motion.div
      className="pointer-events-none absolute z-10 flex items-center justify-center"
      style={{
        width: `${cellPercent}%`,
        height: `${cellPercent}%`,
      }}
      animate={{
        left: `${col * cellPercent}%`,
        top: `${row * cellPercent}%`,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <motion.div
        animate={{
          x: offsetX * 0.4,
          y: offsetY * 0.4,
          scale: isCurrentTurn ? 1.15 : 1,
        }}
        className="relative"
      >
        {isCurrentTurn && (
          <motion.span
            className="absolute -inset-1 rounded-full"
            style={{ backgroundColor: colorDef.hex, opacity: 0.35 }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <div
          className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white text-[10px] shadow-md sm:h-7 sm:w-7 sm:text-base"
          style={{
            background: `linear-gradient(135deg, ${character.colorFrom}, ${character.colorTo})`,
            boxShadow: isCurrentTurn ? `0 0 0 2px ${colorDef.hex}` : undefined,
          }}
          title={player.name}
        >
          {character.emoji}
        </div>
        {player.status.shielded && (
          <span className="absolute -right-1 -top-1 text-[9px] sm:text-xs">🛡️</span>
        )}
      </motion.div>
    </motion.div>
  );
}
