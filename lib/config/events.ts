import type { EventDef, EventId } from "@/types";

export const EVENTS: Record<EventId, EventDef> = {
  "lucky-time": {
    id: "lucky-time",
    name: "Lucky Time",
    description: "Semua pemain mendapat power gratis!",
    icon: "🍀",
    durationRounds: 1,
  },
  "chaos-time": {
    id: "chaos-time",
    name: "Chaos Time",
    description: "Semua posisi pemain akan diacak!",
    icon: "🌪️",
    durationRounds: 1,
  },
  "snake-frenzy": {
    id: "snake-frenzy",
    name: "Snake Frenzy",
    description: "Semua ular menjadi lebih agresif!",
    icon: "🐍",
    durationRounds: 3,
  },
  "golden-dice": {
    id: "golden-dice",
    name: "Golden Dice",
    description: "Dadu minimal selalu keluar angka 4!",
    icon: "🎲",
    durationRounds: 3,
  },
  "double-ladder": {
    id: "double-ladder",
    name: "Double Ladder",
    description: "Semua tangga naik dua kali lebih tinggi!",
    icon: "🪜",
    durationRounds: 3,
  },
};

export const EVENT_LIST = Object.values(EVENTS);
export const EVENT_IDS = Object.keys(EVENTS) as EventId[];

/** setiap berapa ronde event acak punya kesempatan muncul */
export const EVENT_CHECK_INTERVAL_ROUNDS = 4;
/** peluang event muncul saat interval tercapai (0-1) */
export const EVENT_TRIGGER_CHANCE = 0.55;
