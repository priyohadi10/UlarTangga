export * from "./characters";
export * from "./powers";
export * from "./events";
export * from "./levels";
export * from "./player-colors";

export const GAME_NAME = "Ular Tangga Mania";
export const GAME_TAGLINE = "Game klasik dengan pengalaman modern.";

/** koordinat dadu minimum/maksimum standar */
export const DICE_MIN = 1;
export const DICE_MAX = 6;

/** delay animasi antar langkah pion saat bergerak (ms) */
export const STEP_MOVE_DELAY_MS = 220;

/** key local storage */
export const STORAGE_KEYS = {
  stats: "utm_stats_v1",
  leaderboard: "utm_leaderboard_v1",
  achievements: "utm_achievements_v1",
  settings: "utm_settings_v1",
} as const;
