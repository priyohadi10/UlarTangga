import type { Character, CharacterId } from "@/types";

export const CHARACTERS: Record<CharacterId, Character> = {
  robot: {
    id: "robot",
    name: "Robot",
    emoji: "🤖",
    colorFrom: "#FF7A2E",
    colorTo: "#E55A0E",
  },
  knight: {
    id: "knight",
    name: "Knight",
    emoji: "⚔️",
    colorFrom: "#2E8EFF",
    colorTo: "#1565D8",
  },
  ninja: {
    id: "ninja",
    name: "Ninja",
    emoji: "🥷",
    colorFrom: "#1A1A2E",
    colorTo: "#3A3A55",
  },
  panda: {
    id: "panda",
    name: "Panda",
    emoji: "🐼",
    colorFrom: "#9B5DE5",
    colorTo: "#7A3FC2",
  },
  kucing: {
    id: "kucing",
    name: "Kucing",
    emoji: "🐱",
    colorFrom: "#FFC233",
    colorTo: "#F2A500",
  },
  alien: {
    id: "alien",
    name: "Alien",
    emoji: "👽",
    colorFrom: "#3DCB6C",
    colorTo: "#23A350",
  },
  bebek: {
    id: "bebek",
    name: "Bebek",
    emoji: "🦆",
    colorFrom: "#FFC233",
    colorTo: "#FF7A2E",
  },
  dino: {
    id: "dino",
    name: "Dino",
    emoji: "🦕",
    colorFrom: "#3DCB6C",
    colorTo: "#1565D8",
  },
};

export const CHARACTER_LIST = Object.values(CHARACTERS);
