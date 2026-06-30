import type { BoardSize } from "@/types";

const TILE_BG_PALETTE = [
  "#FFF3E0",
  "#E3F2FD",
  "#E8F5E9",
  "#FCE4EC",
  "#F3E5F5",
  "#FFFDE7",
];

/** Warna kotak berdasarkan pola checker lembut, bukan acak murni, supaya konsisten antar render */
export function getTileBackground(tile: number, size: BoardSize): string {
  const seedVal = (tile * 7 + size * 3) % TILE_BG_PALETTE.length;
  return TILE_BG_PALETTE[seedVal] ?? "#FFFDF7";
}
