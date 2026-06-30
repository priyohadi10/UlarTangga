import { STORAGE_KEYS } from "@/lib/config";
import type { GameStatistics } from "@/types";

const DEFAULT_STATS: GameStatistics = {
  totalWins: 0,
  totalLosses: 0,
  snakesBitten: 0,
  laddersClimbed: 0,
  powersUsed: 0,
  stepsWalked: 0,
  gamesPlayed: 0,
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getStats(): GameStatistics {
  if (!isBrowser()) return DEFAULT_STATS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.stats);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw) as Partial<GameStatistics>;
    return { ...DEFAULT_STATS, ...parsed };
  } catch {
    return DEFAULT_STATS;
  }
}

function saveStats(stats: GameStatistics): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(stats));
  } catch {
    // localStorage tidak tersedia (mode privat dsb), abaikan secara aman
  }
}

export function recordGameResult(result: { won: boolean }): GameStatistics {
  const stats = getStats();
  const updated: GameStatistics = {
    ...stats,
    gamesPlayed: stats.gamesPlayed + 1,
    totalWins: stats.totalWins + (result.won ? 1 : 0),
    totalLosses: stats.totalLosses + (result.won ? 0 : 1),
  };
  saveStats(updated);
  return updated;
}

export function getWinRate(stats: GameStatistics): number {
  if (stats.gamesPlayed === 0) return 0;
  return Math.round((stats.totalWins / stats.gamesPlayed) * 100);
}

export function resetStats(): GameStatistics {
  saveStats(DEFAULT_STATS);
  return DEFAULT_STATS;
}
