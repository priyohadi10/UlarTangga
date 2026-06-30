import type { PlayerColorToken } from "@/types";

export interface PlayerColorDef {
  token: PlayerColorToken;
  label: string;
  hex: string;
  hexDark: string;
  bgClass: string;
  textClass: string;
  ringClass: string;
}

export const PLAYER_COLORS: Record<PlayerColorToken, PlayerColorDef> = {
  red: {
    token: "red",
    label: "Merah",
    hex: "#FF4757",
    hexDark: "#D62839",
    bgClass: "bg-brand-red",
    textClass: "text-brand-red",
    ringClass: "ring-brand-red",
  },
  blue: {
    token: "blue",
    label: "Biru",
    hex: "#2E8EFF",
    hexDark: "#1565D8",
    bgClass: "bg-brand-blue",
    textClass: "text-brand-blue",
    ringClass: "ring-brand-blue",
  },
  green: {
    token: "green",
    label: "Hijau",
    hex: "#3DCB6C",
    hexDark: "#23A350",
    bgClass: "bg-brand-green",
    textClass: "text-brand-green",
    ringClass: "ring-brand-green",
  },
  yellow: {
    token: "yellow",
    label: "Kuning",
    hex: "#FFC233",
    hexDark: "#F2A500",
    bgClass: "bg-brand-yellow",
    textClass: "text-brand-yellow-dark",
    ringClass: "ring-brand-yellow",
  },
  purple: {
    token: "purple",
    label: "Ungu",
    hex: "#9B5DE5",
    hexDark: "#7A3FC2",
    bgClass: "bg-brand-purple",
    textClass: "text-brand-purple",
    ringClass: "ring-brand-purple",
  },
  orange: {
    token: "orange",
    label: "Oranye",
    hex: "#FF7A2E",
    hexDark: "#E55A0E",
    bgClass: "bg-brand-orange",
    textClass: "text-brand-orange",
    ringClass: "ring-brand-orange",
  },
};

export const PLAYER_COLOR_ORDER: PlayerColorToken[] = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
];
