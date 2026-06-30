"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play } from "lucide-react";
import { ModeSelectPanel } from "@/components/setup/mode-select-panel";
import { BoardLevelPanel } from "@/components/setup/board-level-panel";
import { CharacterSelectPanel } from "@/components/setup/character-select-panel";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/game-store";
import type { BoardSize, CharacterId, GameLevel, GameMode } from "@/types";

interface SetupScreenProps {
  initialMode: GameMode;
  onBack: () => void;
}

export function SetupScreen({ initialMode, onBack }: SetupScreenProps) {
  const [mode, setMode] = useState<GameMode>(initialMode);
  const [botCount, setBotCount] = useState(3);
  const [playerCount, setPlayerCount] = useState(2);
  const [boardSize, setBoardSize] = useState<BoardSize>(10);
  const [level, setLevel] = useState<GameLevel>("medium");
  const [character, setCharacter] = useState<CharacterId>("robot");

  const startGame = useGameStore((s) => s.startGame);

  const handleStart = () => {
    startGame({
      mode,
      playerCount,
      botCount,
      boardSize,
      level,
      humanCharacters: [character],
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-sm font-bold text-ink shadow-chunky-sm transition-transform hover:-translate-y-0.5"
      >
        <ArrowLeft size={16} />
        Kembali
      </button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
      >
        <div className="mb-1 flex gap-2 rounded-2xl bg-white p-1.5 shadow-chunky-sm">
          <button
            onClick={() => setMode("single")}
            className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${
              mode === "single"
                ? "bg-brand-orange text-white shadow-chunky-sm"
                : "text-ink/50"
            }`}
          >
            🤖 Single Player
          </button>
          <button
            onClick={() => setMode("multiplayer")}
            className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${
              mode === "multiplayer"
                ? "bg-brand-blue text-white shadow-chunky-sm"
                : "text-ink/50"
            }`}
          >
            👥 Multiplayer
          </button>
        </div>

        <ModeSelectPanel
          mode={mode}
          botCount={botCount}
          playerCount={playerCount}
          onChangeBotCount={setBotCount}
          onChangePlayerCount={setPlayerCount}
        />

        <BoardLevelPanel
          boardSize={boardSize}
          level={level}
          onChangeBoardSize={setBoardSize}
          onChangeLevel={setLevel}
        />

        <CharacterSelectPanel selected={character} onSelect={setCharacter} />

        <Button size="lg" variant="primary" onClick={handleStart} className="mt-2 w-full">
          <Play size={20} />
          Mulai Bermain
        </Button>
      </motion.div>
    </div>
  );
}
