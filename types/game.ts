// ============================================================================
// CORE GAME TYPES
// ============================================================================

export type BoardSize = 7 | 10 | 12;

export type GameLevel = "easy" | "medium" | "hard";

export type GameMode = "single" | "multiplayer";

export type GameScreen =
  | "landing"
  | "mode-select"
  | "setup"
  | "playing"
  | "game-over";

export type CharacterId =
  | "robot"
  | "knight"
  | "ninja"
  | "panda"
  | "kucing"
  | "alien"
  | "bebek"
  | "dino";

export interface Character {
  id: CharacterId;
  name: string;
  emoji: string;
  colorFrom: string;
  colorTo: string;
}

// ----------------------------------------------------------------------------
// BOARD OBJECTS
// ----------------------------------------------------------------------------

export interface SnakeDef {
  /** kotak kepala ular (posisi lebih tinggi) */
  head: number;
  /** kotak ekor ular (posisi lebih rendah, tujuan turun) */
  tail: number;
}

export interface LadderDef {
  /** kotak dasar tangga (posisi lebih rendah) */
  bottom: number;
  /** kotak puncak tangga (posisi lebih tinggi, tujuan naik) */
  top: number;
}

export type PowerTileEffect = { type: "power"; powerId: PowerId };
export type EventTileEffect = { type: "none" };

export interface BoardConfig {
  size: BoardSize;
  totalTiles: number;
  snakes: SnakeDef[];
  ladders: LadderDef[];
  powerTiles: Record<number, PowerId>;
}

// ----------------------------------------------------------------------------
// SUPER POWER SYSTEM
// ----------------------------------------------------------------------------

export type PowerId =
  | "sprint"
  | "double-dice"
  | "shield"
  | "reverse-snake"
  | "rocket"
  | "teleport"
  | "lucky-roll"
  | "freeze"
  | "swap-position"
  | "extra-turn";

export type PowerTrigger = "instant" | "on-snake-bite" | "on-dice-roll";

export interface PowerDef {
  id: PowerId;
  name: string;
  description: string;
  icon: string;
  colorFrom: string;
  colorTo: string;
  trigger: PowerTrigger;
  /** apakah power ini disimpan dan dipakai manual oleh pemain */
  consumable: boolean;
}

export interface OwnedPower {
  powerId: PowerId;
  /** id unik per instance supaya bisa stack power yang sama */
  uid: string;
}

// ----------------------------------------------------------------------------
// EVENT SYSTEM
// ----------------------------------------------------------------------------

export type EventId =
  | "lucky-time"
  | "chaos-time"
  | "snake-frenzy"
  | "golden-dice"
  | "double-ladder";

export interface EventDef {
  id: EventId;
  name: string;
  description: string;
  icon: string;
  durationRounds: number;
}

export interface ActiveEvent {
  eventId: EventId;
  roundsLeft: number;
}

// ----------------------------------------------------------------------------
// PLAYER
// ----------------------------------------------------------------------------

export type PlayerKind = "human" | "bot";

export interface PlayerStatusFlags {
  shielded: boolean;
  frozenTurns: number;
  ghostTurns: number;
}

export interface Player {
  id: string;
  name: string;
  kind: PlayerKind;
  character: CharacterId;
  colorToken: PlayerColorToken;
  position: number;
  powers: OwnedPower[];
  status: PlayerStatusFlags;
  isFinished: boolean;
  finishRank: number | null;
}

export type PlayerColorToken = "red" | "blue" | "green" | "yellow" | "purple" | "orange";

// ----------------------------------------------------------------------------
// HISTORY / LOG
// ----------------------------------------------------------------------------

export interface HistoryEntry {
  id: string;
  playerId: string;
  playerName: string;
  message: string;
  kind: "move" | "snake" | "ladder" | "power" | "event" | "win" | "info";
  timestamp: number;
}

// ----------------------------------------------------------------------------
// GAME CONFIGURATION (set saat setup)
// ----------------------------------------------------------------------------

export interface GameSetupConfig {
  mode: GameMode;
  playerCount: number;
  botCount: number;
  boardSize: BoardSize;
  level: GameLevel;
  humanCharacters: CharacterId[];
}

// ----------------------------------------------------------------------------
// GAME STATE (runtime)
// ----------------------------------------------------------------------------

export type TurnPhase =
  | "idle"
  | "rolling"
  | "moving"
  | "resolving-tile"
  | "resolving-power"
  | "resolving-event"
  | "turn-end";

export interface GameStatistics {
  totalWins: number;
  totalLosses: number;
  snakesBitten: number;
  laddersClimbed: number;
  powersUsed: number;
  stepsWalked: number;
  gamesPlayed: number;
}

export interface GameState {
  screen: GameScreen;
  config: GameSetupConfig | null;
  board: BoardConfig | null;
  players: Player[];
  currentPlayerIndex: number;
  diceValue: number | null;
  turnPhase: TurnPhase;
  round: number;
  history: HistoryEntry[];
  activeEvent: ActiveEvent | null;
  winnerOrder: string[];
}
