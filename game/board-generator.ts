import type { BoardConfig, BoardSize, GameLevel, LadderDef, SnakeDef } from "@/types";
import { LEVEL_CONFIG } from "@/lib/config/levels";
import { POWER_IDS } from "@/lib/config/powers";
import { mulberry32, randInt, shuffle } from "@/lib/utils/random";

/**
 * Generate board ular tangga secara prosedural berdasarkan ukuran & level.
 * Menggunakan seeded RNG supaya hasil deterministik jika seed sama,
 * namun tetap acak antar pertandingan karena seed berbasis Date.now() + random.
 */
export function generateBoard(
  size: BoardSize,
  level: GameLevel,
  seed?: number
): BoardConfig {
  const totalTiles = size * size;
  const rng = mulberry32(seed ?? Date.now() ^ (Math.random() * 1e9));
  const density = LEVEL_CONFIG[level];

  const snakeCount = Math.max(2, Math.round(totalTiles * density.snakeRatio));
  const ladderCount = Math.max(2, Math.round(totalTiles * density.ladderRatio));
  const powerCount = Math.max(3, Math.round(totalTiles * density.powerRatio));

  const occupied = new Set<number>([1, totalTiles]);
  const snakes: SnakeDef[] = [];
  const ladders: LadderDef[] = [];

  // --- generate snakes: head harus lebih tinggi dari tail, jarak minimal 8 ---
  let attempts = 0;
  while (snakes.length < snakeCount && attempts < snakeCount * 40) {
    attempts++;
    const head = randInt(rng, 12, totalTiles - 1);
    const maxDrop = Math.min(head - 2, Math.floor(totalTiles * 0.4));
    if (maxDrop < 8) continue;
    const drop = randInt(rng, 8, maxDrop);
    const tail = head - drop;
    if (tail < 2) continue;
    if (occupied.has(head) || occupied.has(tail)) continue;
    snakes.push({ head, tail });
    occupied.add(head);
    occupied.add(tail);
  }

  // --- generate ladders: bottom harus lebih rendah dari top, jarak minimal 8 ---
  attempts = 0;
  while (ladders.length < ladderCount && attempts < ladderCount * 40) {
    attempts++;
    const bottom = randInt(rng, 2, totalTiles - 12);
    const maxRise = Math.min(totalTiles - bottom - 1, Math.floor(totalTiles * 0.4));
    if (maxRise < 8) continue;
    const rise = randInt(rng, 8, maxRise);
    const top = bottom + rise;
    if (top >= totalTiles) continue;
    if (occupied.has(bottom) || occupied.has(top)) continue;
    ladders.push({ bottom, top });
    occupied.add(bottom);
    occupied.add(top);
  }

  // --- generate power tiles di kotak kosong sisanya ---
  const powerTiles: Record<number, (typeof POWER_IDS)[number]> = {};
  const freeTiles = shuffle(
    Array.from({ length: totalTiles - 2 }, (_, i) => i + 2).filter(
      (t) => !occupied.has(t)
    ),
    rng
  );

  for (let i = 0; i < powerCount && i < freeTiles.length; i++) {
    const tile = freeTiles[i];
    if (tile === undefined) continue;
    const powerId = POWER_IDS[randInt(rng, 0, POWER_IDS.length - 1)];
    if (!powerId) continue;
    powerTiles[tile] = powerId;
    occupied.add(tile);
  }

  return {
    size,
    totalTiles,
    snakes,
    ladders,
    powerTiles,
  };
}

/** Cari apakah sebuah kotak adalah kepala ular */
export function findSnakeAt(board: BoardConfig, tile: number): SnakeDef | undefined {
  return board.snakes.find((s) => s.head === tile);
}

/** Cari apakah sebuah kotak adalah dasar tangga */
export function findLadderAt(board: BoardConfig, tile: number): LadderDef | undefined {
  return board.ladders.find((l) => l.bottom === tile);
}

/** Cari tangga terdekat (di atas posisi saat ini) untuk power "Rocket" */
export function findNearestLadderAbove(
  board: BoardConfig,
  position: number
): LadderDef | undefined {
  return board.ladders
    .filter((l) => l.bottom > position)
    .sort((a, b) => a.bottom - b.bottom)[0];
}

/**
 * Konversi nomor kotak (1..N) ke koordinat grid {row, col} dengan pola
 * boustrophedon (zig-zag) khas ular tangga: baris bawah ke kanan,
 * baris berikutnya ke kiri, dst, dimulai dari kiri-bawah.
 */
export function tileToGrid(
  tile: number,
  size: BoardSize
): { row: number; col: number } {
  const index = tile - 1;
  const rowFromBottom = Math.floor(index / size);
  const positionInRow = index % size;
  const isEvenRow = rowFromBottom % 2 === 0;
  const col = isEvenRow ? positionInRow : size - 1 - positionInRow;
  const row = size - 1 - rowFromBottom;
  return { row, col };
}
