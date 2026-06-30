import type { CharacterId, GameSetupConfig, Player, PlayerColorToken } from "@/types";
import { PLAYER_COLOR_ORDER } from "@/lib/config/player-colors";

const BOT_CHARACTER_POOL: CharacterId[] = [
  "knight",
  "ninja",
  "panda",
  "kucing",
  "alien",
  "bebek",
  "dino",
  "robot",
];

const BOT_NAME_POOL = [
  "Bot Kuning",
  "Bot Hijau",
  "Bot Biru",
  "Bot Ungu",
  "Bot Oranye",
  "Bot Merah",
  "Bot Perak",
  "Bot Emas",
  "Bot Kristal",
];

export function createInitialPlayers(config: GameSetupConfig): Player[] {
  const players: Player[] = [];
  let colorIdx = 0;

  const nextColor = (): PlayerColorToken => {
    const c = PLAYER_COLOR_ORDER[colorIdx % PLAYER_COLOR_ORDER.length] ?? "red";
    colorIdx++;
    return c;
  };

  if (config.mode === "single") {
    players.push({
      id: "player-human",
      name: "Kamu",
      kind: "human",
      character: config.humanCharacters[0] ?? "robot",
      colorToken: nextColor(),
      position: 1,
      powers: [],
      status: { shielded: false, frozenTurns: 0, ghostTurns: 0 },
      isFinished: false,
      finishRank: null,
    });

    for (let i = 0; i < config.botCount; i++) {
      players.push({
        id: `bot-${i + 1}`,
        name: BOT_NAME_POOL[i % BOT_NAME_POOL.length] ?? `Bot ${i + 1}`,
        kind: "bot",
        character: BOT_CHARACTER_POOL[i % BOT_CHARACTER_POOL.length] ?? "robot",
        colorToken: nextColor(),
        position: 1,
        powers: [],
        status: { shielded: false, frozenTurns: 0, ghostTurns: 0 },
        isFinished: false,
        finishRank: null,
      });
    }
  } else {
    for (let i = 0; i < config.playerCount; i++) {
      players.push({
        id: `player-${i + 1}`,
        name: `Pemain ${i + 1}`,
        kind: "human",
        character: config.humanCharacters[i] ?? BOT_CHARACTER_POOL[i % BOT_CHARACTER_POOL.length] ?? "robot",
        colorToken: nextColor(),
        position: 1,
        powers: [],
        status: { shielded: false, frozenTurns: 0, ghostTurns: 0 },
        isFinished: false,
        finishRank: null,
      });
    }
  }

  return players;
}
