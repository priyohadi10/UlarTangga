/** Seeded PRNG (mulberry32) — cepat dan cukup baik untuk kebutuhan game ringan */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type RngFn = () => number;

/** Integer acak inklusif [min, max] */
export function randInt(rng: RngFn, min: number, max: number): number {
  if (max < min) return min;
  return Math.floor(rng() * (max - min + 1)) + min;
}

/** Pilih satu elemen acak dari array */
export function randChoice<T>(rng: RngFn, arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[randInt(rng, 0, arr.length - 1)];
}

/** Fisher-Yates shuffle, tidak mutasi array asli */
export function shuffle<T>(arr: T[], rng: RngFn): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randInt(rng, 0, i);
    const a = result[i] as T;
    const b = result[j] as T;
    result[i] = b;
    result[j] = a;
  }
  return result;
}

/** Cek peluang acak (0-1) menggunakan rng yang diberikan */
export function chance(rng: RngFn, probability: number): boolean {
  return rng() < probability;
}
