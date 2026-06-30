"use client";

import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BoardGrid } from "@/components/game/board-grid";
import { PlayerListPanel } from "@/components/game/player-list-panel";
import { TurnPanel } from "@/components/game/turn-panel";
import { PowerPanel } from "@/components/game/power-panel";
import { HistoryPanel } from "@/components/game/history-panel";
import { EventBanner } from "@/components/game/event-banner";
import { GameOverScreen } from "@/components/game/game-over-screen";
import { useGameStore } from "@/store/game-store";

export function GameScreen() {
  const screen = useGameStore((s) => s.screen);
  const board = useGameStore((s) => s.board);
  const players = useGameStore((s) => s.players);
  const currentPlayerIndex = useGameStore((s) => s.currentPlayerIndex);
  const diceValue = useGameStore((s) => s.diceValue);
  const turnPhase = useGameStore((s) => s.turnPhase);
  const history = useGameStore((s) => s.history);
  const activeEvent = useGameStore((s) => s.activeEvent);
  const round = useGameStore((s) => s.round);
  const rollDice = useGameStore((s) => s.rollDice);
  const activateManualPower = useGameStore((s) => s.activateManualPower);
  const resetGame = useGameStore((s) => s.resetGame);
  const setScreen = useGameStore((s) => s.setScreen);

  if (screen === "game-over") {
    return (
      <GameOverScreen
        players={players}
        onPlayAgain={() => {
          resetGame();
          setScreen("setup");
        }}
        onBackToHome={() => {
          resetGame();
          setScreen("landing");
        }}
      />
    );
  }

  if (!board) return null;

  const currentPlayer = players[currentPlayerIndex];
  const otherPlayers = players.filter((p) => p.id !== currentPlayer?.id);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          onClick={() => {
            resetGame();
            setScreen("landing");
          }}
          className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-sm font-bold text-ink shadow-chunky-sm transition-transform hover:-translate-y-0.5"
        >
          <ArrowLeft size={16} />
          Keluar
        </button>
        <div className="font-display rounded-xl bg-white px-4 py-2 text-sm font-bold text-ink/60 shadow-chunky-sm">
          Ronde {round}
        </div>
      </div>

      <EventBanner activeEvent={activeEvent} />

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr_300px]">
        {/* kiri: daftar pemain */}
        <div className="order-2 lg:order-1">
          <PlayerListPanel players={players} currentPlayerIndex={currentPlayerIndex} />
        </div>

        {/* tengah: board */}
        <div className="order-1 lg:order-2">
          <Card padding="sm">
            <BoardGrid board={board} players={players} currentPlayerIndex={currentPlayerIndex} />
          </Card>
        </div>

        {/* kanan: giliran, power, history */}
        <div className="order-3 flex flex-col gap-4">
          <TurnPanel
            currentPlayer={currentPlayer}
            diceValue={diceValue}
            turnPhase={turnPhase}
            onRoll={rollDice}
          />
          <PowerPanel
            currentPlayer={currentPlayer?.kind === "human" ? currentPlayer : undefined}
            otherPlayers={otherPlayers}
            onActivate={(uid, target) => {
              if (currentPlayer) activateManualPower(currentPlayer.id, uid, target);
            }}
            disabled={turnPhase !== "idle"}
          />
          <HistoryPanel history={history} />
        </div>
      </div>
    </div>
  );
}
