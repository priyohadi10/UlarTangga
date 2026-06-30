"use client";

import { create } from "zustand";
import type {
  ActiveEvent,
  GameScreen,
  GameSetupConfig,
  GameState,
  HistoryEntry,
} from "@/types";
import { generateBoard } from "@/game/board-generator";
import { computeMoveTarget, resolveTileLanding } from "@/game/turn-resolver";
import { createInitialPlayers } from "@/game/player-factory";
import { POWERS } from "@/lib/config/powers";
import { EVENTS, EVENT_CHECK_INTERVAL_ROUNDS, EVENT_TRIGGER_CHANCE } from "@/lib/config/events";
import { LEVEL_CONFIG } from "@/lib/config/levels";
import { randChoice, mulberry32, chance } from "@/lib/utils/random";
import { recordGameResult } from "@/lib/storage/stats-storage";

interface GameActions {
  setScreen: (screen: GameScreen) => void;
  startGame: (config: GameSetupConfig) => void;
  rollDice: () => void;
  activateManualPower: (playerId: string, uid: string, targetPlayerId?: string) => void;
  resetGame: () => void;
  pushHistory: (entry: Omit<HistoryEntry, "id" | "timestamp">) => void;
}

type Store = GameState & GameActions;
type SetFn = (
  partial: Partial<Store> | ((s: Store) => Partial<Store>)
) => void;
type GetFn = () => Store;

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

const initialState: GameState = {
  screen: "landing",
  config: null,
  board: null,
  players: [],
  currentPlayerIndex: 0,
  diceValue: null,
  turnPhase: "idle",
  round: 1,
  history: [],
  activeEvent: null,
  winnerOrder: [],
};

export const useGameStore = create<Store>((set, get) => ({
  ...initialState,

  setScreen: (screen) => set({ screen }),

  startGame: (config) => {
    const board = generateBoard(config.boardSize, config.level);
    const players = createInitialPlayers(config);
    set({
      ...initialState,
      screen: "playing",
      config,
      board,
      players,
      currentPlayerIndex: 0,
      round: 1,
      history: [
        {
          id: uid(),
          playerId: "system",
          playerName: "Sistem",
          message: `Permainan dimulai! Level ${LEVEL_CONFIG[config.level].label}, papan ${config.boardSize}x${config.boardSize}.`,
          kind: "info",
          timestamp: Date.now(),
        },
      ],
    });
  },

  pushHistory: (entry) =>
    set((state) => ({
      history: [
        { ...entry, id: uid(), timestamp: Date.now() },
        ...state.history,
      ].slice(0, 40),
    })),

  rollDice: () => {
    const state = get();
    const { board, players, currentPlayerIndex, config } = state;
    if (!board || !config || state.turnPhase !== "idle") return;

    const player = players[currentPlayerIndex];
    if (!player || player.isFinished) return;

    set({ turnPhase: "rolling" });

    const hasDoubleDice = player.powers.find((p) => p.powerId === "double-dice");
    const hasLuckyRoll = player.powers.find((p) => p.powerId === "lucky-roll");

    let rawDice = Math.floor(Math.random() * 6) + 1;

    if (state.activeEvent?.eventId === "golden-dice" && rawDice < 4) {
      rawDice = 4 + Math.floor(Math.random() * 3);
    }

    let finalDice = rawDice;
    let usedPowerLabel = "";

    if (hasLuckyRoll) {
      finalDice = 6;
      usedPowerLabel = "Lucky Roll";
    } else if (hasDoubleDice) {
      finalDice = rawDice * 2;
      usedPowerLabel = "Double Dice";
    }

    if (player.status.frozenTurns > 0) {
      setTimeout(() => {
        set((s) => ({
          players: s.players.map((p, i) =>
            i === currentPlayerIndex
              ? { ...p, status: { ...p.status, frozenTurns: p.status.frozenTurns - 1 } }
              : p
          ),
          turnPhase: "idle",
        }));
        get().pushHistory({
          playerId: player.id,
          playerName: player.name,
          message: `${player.name} dibekukan dan melewatkan giliran!`,
          kind: "info",
        });
        advanceTurn(get, set);
      }, 500);
      return;
    }

    setTimeout(() => {
      set({ diceValue: finalDice, turnPhase: "moving" });

      if (usedPowerLabel) {
        consumePower(
          set,
          currentPlayerIndex,
          player.powers.find(
            (p) => p.powerId === (hasLuckyRoll ? "lucky-roll" : "double-dice")
          )?.uid
        );
        get().pushHistory({
          playerId: player.id,
          playerName: player.name,
          message: `${player.name} menggunakan ${usedPowerLabel}!`,
          kind: "power",
        });
      }

      animateMove(get, set, currentPlayerIndex, finalDice);
    }, 700);
  },

  activateManualPower: (playerId, powerUid, targetPlayerId) => {
    const state = get();
    const playerIdx = state.players.findIndex((p) => p.id === playerId);
    if (playerIdx === -1) return;
    const player = state.players[playerIdx];
    if (!player) return;
    const owned = player.powers.find((p) => p.uid === powerUid);
    if (!owned) return;

    const board = state.board;
    if (!board) return;

    switch (owned.powerId) {
      case "sprint": {
        const target = Math.min(player.position + 6, board.totalTiles);
        applyPosition(set, playerIdx, target);
        get().pushHistory({
          playerId: player.id,
          playerName: player.name,
          message: `${player.name} memakai Langkah Ekstra, maju ke kotak ${target}!`,
          kind: "power",
        });
        break;
      }
      case "rocket": {
        const nearestLadder = board.ladders
          .filter((l) => l.bottom > player.position)
          .sort((a, b) => a.bottom - b.bottom)[0];
        const target = nearestLadder ? nearestLadder.top : player.position;
        applyPosition(set, playerIdx, target);
        get().pushHistory({
          playerId: player.id,
          playerName: player.name,
          message: `${player.name} memakai Rocket, langsung naik ke kotak ${target}!`,
          kind: "power",
        });
        break;
      }
      case "teleport": {
        const maxJump = 10;
        const target = Math.min(player.position + maxJump, board.totalTiles);
        applyPosition(set, playerIdx, target);
        get().pushHistory({
          playerId: player.id,
          playerName: player.name,
          message: `${player.name} memakai Teleport ke kotak ${target}!`,
          kind: "power",
        });
        break;
      }
      case "freeze": {
        const targetIdx = targetPlayerId
          ? state.players.findIndex((p) => p.id === targetPlayerId)
          : -1;
        if (targetIdx === -1) break;
        set((s) => ({
          players: s.players.map((p, i) =>
            i === targetIdx
              ? { ...p, status: { ...p.status, frozenTurns: p.status.frozenTurns + 1 } }
              : p
          ),
        }));
        const targetName = state.players[targetIdx]?.name ?? "lawan";
        get().pushHistory({
          playerId: player.id,
          playerName: player.name,
          message: `${player.name} membekukan ${targetName}!`,
          kind: "power",
        });
        break;
      }
      case "swap-position": {
        const targetIdx = targetPlayerId
          ? state.players.findIndex((p) => p.id === targetPlayerId)
          : -1;
        if (targetIdx === -1) break;
        set((s) => {
          const a = s.players[playerIdx];
          const b = s.players[targetIdx];
          if (!a || !b) return s;
          const posA = a.position;
          const posB = b.position;
          return {
            players: s.players.map((p, i) => {
              if (i === playerIdx) return { ...p, position: posB };
              if (i === targetIdx) return { ...p, position: posA };
              return p;
            }),
          };
        });
        const targetName = state.players[targetIdx]?.name ?? "lawan";
        get().pushHistory({
          playerId: player.id,
          playerName: player.name,
          message: `${player.name} bertukar posisi dengan ${targetName}!`,
          kind: "power",
        });
        break;
      }
      default:
        break;
    }

    consumePower(set, playerIdx, powerUid);
  },

  resetGame: () => set({ ...initialState }),
}));

// ============================================================================
// HELPERS
// ============================================================================

function consumePower(set: SetFn, playerIdx: number, powerUid?: string) {
  if (!powerUid) return;
  set((s) => ({
    players: s.players.map((p, i) =>
      i === playerIdx
        ? { ...p, powers: p.powers.filter((pw) => pw.uid !== powerUid) }
        : p
    ),
  }));
}

function applyPosition(set: SetFn, playerIdx: number, position: number) {
  set((s) => ({
    players: s.players.map((p, i) => (i === playerIdx ? { ...p, position } : p)),
  }));
}

function animateMove(get: GetFn, set: SetFn, playerIdx: number, steps: number) {
  const state = get();
  const board = state.board;
  const player = state.players[playerIdx];
  if (!board || !player) return;

  const start = player.position;
  const rawTarget = computeMoveTarget(start, steps, board.totalTiles);
  const direction = rawTarget >= start ? 1 : -1;
  const totalSteps = Math.abs(rawTarget - start);

  let current = start;
  let stepCount = 0;

  const stepInterval = setInterval(() => {
    stepCount++;
    current += direction;
    applyPosition(set, playerIdx, current);

    if (stepCount >= totalSteps) {
      clearInterval(stepInterval);
      finalizeLanding(get, set, playerIdx, rawTarget);
    }
  }, 180);

  if (totalSteps === 0) {
    finalizeLanding(get, set, playerIdx, rawTarget);
  }
}

function finalizeLanding(get: GetFn, set: SetFn, playerIdx: number, landedTile: number) {
  const state = get();
  const board = state.board;
  const player = state.players[playerIdx];
  if (!board || !player) return;

  set({ turnPhase: "resolving-tile" });

  const resolution = resolveTileLanding(board, player, landedTile);

  switch (resolution.kind) {
    case "ladder": {
      applyPosition(set, playerIdx, resolution.to);
      get().pushHistory({
        playerId: player.id,
        playerName: player.name,
        message: `${player.name} naik tangga ke kotak ${resolution.to}! 🪜`,
        kind: "ladder",
      });
      break;
    }
    case "snake-bite": {
      applyPosition(set, playerIdx, resolution.to);
      get().pushHistory({
        playerId: player.id,
        playerName: player.name,
        message: `${player.name} digigit ular, turun ke kotak ${resolution.to}! 🐍`,
        kind: "snake",
      });
      break;
    }
    case "snake-shielded": {
      set((s) => ({
        players: s.players.map((p, i) =>
          i === playerIdx ? { ...p, status: { ...p.status, shielded: false } } : p
        ),
      }));
      get().pushHistory({
        playerId: player.id,
        playerName: player.name,
        message: `${player.name} terlindungi Shield dari ular! 🛡️`,
        kind: "power",
      });
      break;
    }
    case "snake-reversed": {
      const reversePower = player.powers.find((p) => p.powerId === "reverse-snake");
      applyPosition(set, playerIdx, resolution.to);
      consumePower(set, playerIdx, reversePower?.uid);
      get().pushHistory({
        playerId: player.id,
        playerName: player.name,
        message: `${player.name} membalik ular jadi tangga, naik ke ${resolution.to}! 🔄`,
        kind: "power",
      });
      break;
    }
    case "power": {
      const powerDef = POWERS[resolution.powerId as keyof typeof POWERS];
      if (powerDef) {
        set((s) => ({
          players: s.players.map((p, i) =>
            i === playerIdx
              ? {
                  ...p,
                  powers: [
                    ...p.powers,
                    { powerId: powerDef.id, uid: Math.random().toString(36).slice(2, 9) },
                  ],
                }
              : p
          ),
        }));
        get().pushHistory({
          playerId: player.id,
          playerName: player.name,
          message: `${player.name} mendapat power ${powerDef.name}! ${powerDef.icon}`,
          kind: "power",
        });

        if (powerDef.id === "shield") {
          set((s) => ({
            players: s.players.map((p, i) =>
              i === playerIdx ? { ...p, status: { ...p.status, shielded: true } } : p
            ),
          }));
        }
      }
      break;
    }
    default:
      break;
  }

  const finalPlayer = get().players[playerIdx];
  if (finalPlayer && finalPlayer.position >= board.totalTiles) {
    handleWin(get, set, playerIdx);
    return;
  }

  const hasExtraTurn = finalPlayer?.powers.find((p) => p.powerId === "extra-turn");
  if (hasExtraTurn) {
    consumePower(set, playerIdx, hasExtraTurn.uid);
    get().pushHistory({
      playerId: player.id,
      playerName: player.name,
      message: `${player.name} mendapat giliran tambahan! 🎉`,
      kind: "power",
    });
    set({ turnPhase: "idle", diceValue: null });
    return;
  }

  set({ turnPhase: "turn-end" });
  setTimeout(() => {
    advanceTurn(get, set);
  }, 500);
}

function handleWin(get: GetFn, set: SetFn, playerIdx: number) {
  const state = get();
  const player = state.players[playerIdx];
  if (!player) return;

  const rank = state.winnerOrder.length + 1;
  set((s) => ({
    players: s.players.map((p, i) =>
      i === playerIdx ? { ...p, isFinished: true, finishRank: rank } : p
    ),
    winnerOrder: [...s.winnerOrder, player.id],
  }));

  get().pushHistory({
    playerId: player.id,
    playerName: player.name,
    message: `${player.name} mencapai garis finish! 🎉 (Peringkat ${rank})`,
    kind: "win",
  });

  if (player.kind === "human" && rank === 1) {
    recordGameResult({ won: true });
  }

  const remaining = get().players.filter((p) => !p.isFinished);
  const shouldEndGame = remaining.length <= 1 || state.players.length === 2;

  if (shouldEndGame) {
    // catat kekalahan untuk semua pemain manusia yang belum finish di posisi 1
    const humanPlayers = get().players.filter((p) => p.kind === "human");
    humanPlayers.forEach((h) => {
      const isThisWinner = h.id === player.id && rank === 1;
      if (!isThisWinner) {
        recordGameResult({ won: false });
      }
    });
    set({ screen: "game-over", turnPhase: "idle" });
    return;
  }

  set({ turnPhase: "idle", diceValue: null });
  setTimeout(() => advanceTurn(get, set), 400);
}

function advanceTurn(get: GetFn, set: SetFn) {
  const state = get();
  const total = state.players.length;
  let nextIdx = (state.currentPlayerIndex + 1) % total;
  let guard = 0;
  while (state.players[nextIdx]?.isFinished && guard < total) {
    nextIdx = (nextIdx + 1) % total;
    guard++;
  }

  const isNewRound = nextIdx <= state.currentPlayerIndex;
  const newRound = isNewRound ? state.round + 1 : state.round;

  let activeEvent: ActiveEvent | null = state.activeEvent;
  if (activeEvent) {
    const roundsLeft = activeEvent.roundsLeft - (isNewRound ? 1 : 0);
    activeEvent = roundsLeft > 0 ? { ...activeEvent, roundsLeft } : null;
  }

  set({
    currentPlayerIndex: nextIdx,
    diceValue: null,
    turnPhase: "idle",
    round: newRound,
    activeEvent,
  });

  if (
    isNewRound &&
    !activeEvent &&
    state.config?.level &&
    LEVEL_CONFIG[state.config.level].eventsEnabled &&
    newRound % EVENT_CHECK_INTERVAL_ROUNDS === 0
  ) {
    const rng = mulberry32(Date.now() ^ Math.floor(Math.random() * 1e9));
    if (chance(rng, EVENT_TRIGGER_CHANCE)) {
      triggerRandomEvent(get, set);
    }
  }

  const nextPlayer = get().players[nextIdx];
  if (nextPlayer && nextPlayer.kind === "bot" && !nextPlayer.isFinished) {
    runBotTurn(get, set, nextIdx);
  }
}

function triggerRandomEvent(get: GetFn, set: SetFn) {
  const ids = Object.keys(EVENTS) as (keyof typeof EVENTS)[];
  const rng = mulberry32(Date.now() ^ Math.floor(Math.random() * 1e9));
  const picked = randChoice(rng, ids);
  if (!picked) return;
  const def = EVENTS[picked];

  set({ activeEvent: { eventId: def.id, roundsLeft: def.durationRounds } });
  get().pushHistory({
    playerId: "system",
    playerName: "Sistem",
    message: `Event "${def.name}" dimulai! ${def.description}`,
    kind: "event",
  });

  if (def.id === "lucky-time") {
    set((s) => ({
      players: s.players.map((p) => ({
        ...p,
        powers: [
          ...p.powers,
          { powerId: "extra-turn" as const, uid: Math.random().toString(36).slice(2, 9) },
        ],
      })),
    }));
  }

  if (def.id === "chaos-time") {
    const board = get().board;
    if (!board) return;
    const rngChaos = mulberry32(Date.now() ^ 777);
    set((s) => ({
      players: s.players.map((p) =>
        p.isFinished
          ? p
          : {
              ...p,
              position: Math.max(
                1,
                Math.min(board.totalTiles - 1, Math.floor(rngChaos() * board.totalTiles) + 1)
              ),
            }
      ),
    }));
  }
}

function runBotTurn(get: GetFn, set: SetFn, botIdx: number) {
  setTimeout(() => {
    const state = get();
    const bot = state.players[botIdx];
    if (!bot || bot.isFinished || state.turnPhase !== "idle") return;
    if (state.currentPlayerIndex !== botIdx) return;

    import("@/game/bot-ai").then(({ botDecideManualPower, botPickTarget }) => {
      const currentState = get();
      const currentBot = currentState.players[botIdx];
      if (!currentBot) return;
      const powerUid = botDecideManualPower(currentBot, currentState.players);
      if (powerUid) {
        const owned = currentBot.powers.find((p) => p.uid === powerUid);
        const needsTarget =
          owned?.powerId === "freeze" || owned?.powerId === "swap-position";
        const target = needsTarget
          ? botPickTarget(currentBot, currentState.players)
          : null;
        get().activateManualPower(currentBot.id, powerUid, target?.id);
      }

      setTimeout(() => {
        get().rollDice();
      }, 500);
    });
  }, 800);
}
