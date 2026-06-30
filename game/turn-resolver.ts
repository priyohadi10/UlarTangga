import type { BoardConfig, Player } from "@/types";
import { findLadderAt, findNearestLadderAbove, findSnakeAt } from "./board-generator";

export type TileResolution =
  | { kind: "none"; finalPosition: number }
  | { kind: "ladder"; from: number; to: number; finalPosition: number }
  | {
      kind: "snake-bite";
      from: number;
      to: number;
      finalPosition: number;
    }
  | {
      kind: "snake-shielded";
      from: number;
      finalPosition: number;
    }
  | {
      kind: "snake-reversed";
      from: number;
      to: number;
      finalPosition: number;
    }
  | { kind: "power"; powerId: string; finalPosition: number };

/**
 * Resolusi efek kotak tempat pion mendarat. Murni fungsi (tidak mutasi player),
 * mengembalikan deskripsi hasil agar reducer/store yang menerapkan side effect.
 */
export function resolveTileLanding(
  board: BoardConfig,
  player: Player,
  landedTile: number
): TileResolution {
  const snake = findSnakeAt(board, landedTile);
  if (snake) {
    if (player.status.shielded) {
      return { kind: "snake-shielded", from: landedTile, finalPosition: landedTile };
    }
    const hasReverse = player.powers.some((p) => p.powerId === "reverse-snake");
    if (hasReverse) {
      // dikonsumsi oleh caller; di sini hanya melaporkan kemungkinan posisi
      return {
        kind: "snake-reversed",
        from: landedTile,
        to: snake.head,
        finalPosition: snake.head,
      };
    }
    return {
      kind: "snake-bite",
      from: landedTile,
      to: snake.tail,
      finalPosition: snake.tail,
    };
  }

  const ladder = findLadderAt(board, landedTile);
  if (ladder) {
    return { kind: "ladder", from: landedTile, to: ladder.top, finalPosition: ladder.top };
  }

  const powerId = board.powerTiles[landedTile];
  if (powerId) {
    return { kind: "power", powerId, finalPosition: landedTile };
  }

  return { kind: "none", finalPosition: landedTile };
}

/** Hitung posisi akhir pion setelah melempar dadu, dibatasi oleh total kotak */
export function computeMoveTarget(
  currentPosition: number,
  diceValue: number,
  totalTiles: number
): number {
  const target = currentPosition + diceValue;
  if (target > totalTiles) {
    // pantulan sederhana: harus pas di kotak terakhir
    return totalTiles - (target - totalTiles);
  }
  return target;
}

/** Cari tangga terdekat di atas posisi untuk power Rocket */
export function resolveRocketTarget(board: BoardConfig, position: number): number {
  const nearest = findNearestLadderAbove(board, position);
  return nearest ? nearest.top : position;
}
