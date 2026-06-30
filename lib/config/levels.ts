import type { GameLevel } from "@/types";

export interface LevelDensityConfig {
  /** rasio ular terhadap total kotak (0-1) */
  snakeRatio: number;
  /** rasio tangga terhadap total kotak (0-1) */
  ladderRatio: number;
  /** rasio kotak power terhadap total kotak (0-1) */
  powerRatio: number;
  /** apakah event acak aktif di level ini */
  eventsEnabled: boolean;
  /** apakah board berubah dinamis tiap beberapa ronde (khusus hard) */
  dynamicBoard: boolean;
  /** setiap berapa ronde board reshuffle (hanya dipakai jika dynamicBoard true) */
  reshuffleIntervalRounds: number;
  label: string;
  description: string;
  icon: string;
  colorToken: "green" | "yellow" | "red";
}

export const LEVEL_CONFIG: Record<GameLevel, LevelDensityConfig> = {
  easy: {
    snakeRatio: 0.06,
    ladderRatio: 0.12,
    powerRatio: 0.1,
    eventsEnabled: false,
    dynamicBoard: false,
    reshuffleIntervalRounds: 0,
    label: "Easy",
    description: "Mudah untuk pemula",
    icon: "⭐",
    colorToken: "green",
  },
  medium: {
    snakeRatio: 0.1,
    ladderRatio: 0.1,
    powerRatio: 0.12,
    eventsEnabled: true,
    dynamicBoard: false,
    reshuffleIntervalRounds: 0,
    label: "Medium",
    description: "Tantangan seimbang",
    icon: "👑",
    colorToken: "yellow",
  },
  hard: {
    snakeRatio: 0.14,
    ladderRatio: 0.08,
    powerRatio: 0.14,
    eventsEnabled: true,
    dynamicBoard: true,
    reshuffleIntervalRounds: 6,
    label: "Hard",
    description: "Untuk pemain expert",
    icon: "💀",
    colorToken: "red",
  },
};

export const LEVEL_LIST = Object.values(LEVEL_CONFIG);
