"use client";

import { cn } from "@/lib/utils/cn";
import { POWERS } from "@/lib/config/powers";
import { getTileBackground } from "@/game/tile-style";
import type { BoardConfig, BoardSize } from "@/types";

interface BoardTileProps {
  tile: number;
  board: BoardConfig;
  isSnakeHead: boolean;
  isLadderBottom: boolean;
}

export function BoardTile({ tile, board, isSnakeHead, isLadderBottom }: BoardTileProps) {
  const powerId = board.powerTiles[tile];
  const powerDef = powerId ? POWERS[powerId] : undefined;
  const isStart = tile === 1;
  const isFinish = tile === board.totalTiles;

  return (
    <div
      className={cn(
        "relative flex aspect-square items-start justify-start rounded-md border border-ink/[0.04] p-0.5 sm:rounded-lg sm:p-1"
      )}
      style={{ backgroundColor: getTileBackground(tile, board.size as BoardSize) }}
    >
      <span className="text-[8px] font-bold text-ink/35 sm:text-[10px]">{tile}</span>

      {isFinish && (
        <span className="absolute right-0.5 top-0.5 text-xs sm:text-base">🏁</span>
      )}
      {isStart && !isFinish && (
        <span className="absolute right-0.5 top-0.5 text-xs sm:text-base">🚩</span>
      )}

      {powerDef && (
        <span
          className="absolute bottom-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] shadow-sm sm:h-6 sm:w-6 sm:text-sm"
          style={{
            background: `linear-gradient(135deg, ${powerDef.colorFrom}, ${powerDef.colorTo})`,
          }}
          title={powerDef.name}
        >
          {powerDef.icon}
        </span>
      )}

      {isSnakeHead && (
        <span className="absolute inset-0 flex items-center justify-center text-base sm:text-2xl">
          🐍
        </span>
      )}
      {isLadderBottom && !isSnakeHead && (
        <span className="absolute inset-0 flex items-center justify-center text-base sm:text-2xl">
          🪜
        </span>
      )}
    </div>
  );
}
