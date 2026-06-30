import type { PowerDef, PowerId } from "@/types";

export const POWERS: Record<PowerId, PowerDef> = {
  sprint: {
    id: "sprint",
    name: "Langkah Ekstra",
    description: "Maju 6 langkah langsung!",
    icon: "⚡",
    colorFrom: "#FFC233",
    colorTo: "#F2A500",
    trigger: "instant",
    consumable: true,
  },
  "double-dice": {
    id: "double-dice",
    name: "Gandakan Dadu",
    description: "Lempar dadu lagi, hasil x2!",
    icon: "🎲",
    colorFrom: "#FF5DA2",
    colorTo: "#D6398A",
    trigger: "on-dice-roll",
    consumable: true,
  },
  shield: {
    id: "shield",
    name: "Kebal Ular",
    description: "Aman dari ular selama 1 giliran!",
    icon: "🛡️",
    colorFrom: "#3DCB6C",
    colorTo: "#23A350",
    trigger: "on-snake-bite",
    consumable: true,
  },
  "reverse-snake": {
    id: "reverse-snake",
    name: "Kebal Ular",
    description: "Naik ke kepala ular alih-alih turun!",
    icon: "🔄",
    colorFrom: "#9B5DE5",
    colorTo: "#7A3FC2",
    trigger: "on-snake-bite",
    consumable: true,
  },
  rocket: {
    id: "rocket",
    name: "Maju ke Tangga",
    description: "Langsung naik ke tangga terdekat!",
    icon: "🚀",
    colorFrom: "#FF7A2E",
    colorTo: "#E55A0E",
    trigger: "instant",
    consumable: true,
  },
  teleport: {
    id: "teleport",
    name: "Teleport",
    description: "Pindah ke kotak mana saja (maks 10 kotak)!",
    icon: "✨",
    colorFrom: "#2E8EFF",
    colorTo: "#1565D8",
    trigger: "instant",
    consumable: true,
  },
  "lucky-roll": {
    id: "lucky-roll",
    name: "Lucky Roll",
    description: "Pilih angka dadu (1-6)!",
    icon: "🍀",
    colorFrom: "#3DCB6C",
    colorTo: "#23A350",
    trigger: "on-dice-roll",
    consumable: true,
  },
  freeze: {
    id: "freeze",
    name: "Freeze",
    description: "Bekukan 1 lawan selama 1 giliran!",
    icon: "❄️",
    colorFrom: "#7CD4FD",
    colorTo: "#2E8EFF",
    trigger: "instant",
    consumable: true,
  },
  "swap-position": {
    id: "swap-position",
    name: "Tukar Posisi",
    description: "Tukar posisi dengan pemain lain!",
    icon: "🔀",
    colorFrom: "#FF4757",
    colorTo: "#D62839",
    trigger: "instant",
    consumable: true,
  },
  "extra-turn": {
    id: "extra-turn",
    name: "Main Lagi",
    description: "Dapat giliran tambahan setelah ini!",
    icon: "🎉",
    colorFrom: "#FFC233",
    colorTo: "#FF7A2E",
    trigger: "instant",
    consumable: true,
  },
};

export const POWER_LIST = Object.values(POWERS);
export const POWER_IDS = Object.keys(POWERS) as PowerId[];

/** Power yang dipakai otomatis saat kena ular (tidak perlu klik manual) */
export const SNAKE_DEFENSE_POWERS: PowerId[] = ["shield", "reverse-snake"];

/** Power yang dipakai otomatis saat lempar dadu (tidak perlu klik manual) */
export const DICE_MODIFIER_POWERS: PowerId[] = ["double-dice", "lucky-roll"];

/** Power yang harus diaktifkan manual oleh pemain lewat tombol */
export const MANUAL_POWERS: PowerId[] = [
  "sprint",
  "rocket",
  "teleport",
  "freeze",
  "swap-position",
];
