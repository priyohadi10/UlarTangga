"use client";

import { useMemo } from "react";
import { BoardTile } from "./board-tile";
import { PlayerToken } from "./player-token";
import { tileToGrid } from "@/game/board-generator";
import type { BoardConfig, BoardSize, Player } from "@/types";

interface BoardGridProps {
  board: BoardConfig;
  players: Player[];
  currentPlayerIndex: number;
}

function tileCenterPercent(tile: number, size: BoardSize) {
  const { row, col } = tileToGrid(tile, size);
  const cellPercent = 100 / size;
  return {
    x: col * cellPercent + cellPercent / 2,
    y: row * cellPercent + cellPercent / 2,
  };
}

export function BoardGrid({ board, players, currentPlayerIndex }: BoardGridProps) {
  const size = board.size as BoardSize;
  const tiles = useMemo(
    () => Array.from({ length: board.totalTiles }, (_, i) => board.totalTiles - i),
    [board.totalTiles]
  );

  const snakeHeadSet = useMemo(() => new Set(board.snakes.map((s) => s.head)), [board.snakes]);
  const ladderBottomSet = useMemo(
    () => new Set(board.ladders.map((l) => l.bottom)),
    [board.ladders]
  );

  return (
    <div className="relative w-full">
      <div
        className="grid w-full gap-[2px] rounded-2xl bg-ink/[0.04] p-1.5 sm:gap-1"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {tiles.map((tile) => (
          <BoardTile
            key={tile}
            tile={tile}
            board={board}
            isSnakeHead={snakeHeadSet.has(tile)}
            isLadderBottom={ladderBottomSet.has(tile)}
          />
        ))}
      </div>

      {/* overlay SVG untuk garis penghubung ular & tangga */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {board.snakes.map((s, i) => {
          const head = tileCenterPercent(s.head, size);
          const tail = tileCenterPercent(s.tail, size);
          return (
            <line
              key={`snake-line-${i}`}
              x1={head.x}
              y1={head.y}
              x2={tail.x}
              y2={tail.y}
              stroke="#3DCB6C"
              strokeWidth={0.6}
              strokeDasharray="2,1.4"
              strokeLinecap="round"
              opacity={0.55}
            />
          );
        })}
        {board.ladders.map((l, i) => {
          const bottom = tileCenterPercent(l.bottom, size);
          const top = tileCenterPercent(l.top, size);
          return (
            <line
              key={`ladder-line-${i}`}
              x1={bottom.x}
              y1={bottom.y}
              x2={top.x}
              y2={top.y}
              stroke="#FFC233"
              strokeWidth={0.6}
              strokeLinecap="round"
              opacity={0.5}
            />
          );
        })}
      </svg>

      {/* layer pion pemain */}
      <div className="absolute inset-0">
        {players.map((p, idx) => (
          <PlayerToken
            key={p.id}
            player={p}
            boardSize={size}
            totalPlayers={players.length}
            indexAmongPlayers={idx}
            isCurrentTurn={idx === currentPlayerIndex && !p.isFinished}
          />
        ))}
      </div>
    </div>
  );
}
