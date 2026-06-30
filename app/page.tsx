"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { LandingScreen } from "@/components/landing/landing-screen";
import { SetupScreen } from "@/components/setup/setup-screen";
import { GameScreen } from "@/components/game/game-screen";
import { Modal } from "@/components/ui/modal";
import { LeaderboardContent } from "@/components/modals/leaderboard-content";
import { AchievementsContent } from "@/components/modals/achievements-content";
import { PowersContent } from "@/components/modals/powers-content";
import { HowToPlayContent } from "@/components/modals/how-to-play-content";
import { useGameStore } from "@/store/game-store";
import type { GameMode } from "@/types";

type ModalKind = "leaderboard" | "achievements" | "powers" | "how-to-play" | null;

export default function HomePage() {
  const screen = useGameStore((s) => s.screen);
  const setScreen = useGameStore((s) => s.setScreen);
  const [setupMode, setSetupMode] = useState<GameMode>("single");
  const [activeModal, setActiveModal] = useState<ModalKind>(null);

  const handleStart = (mode: GameMode) => {
    setSetupMode(mode);
    setScreen("setup");
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-cream">
      {screen !== "playing" && screen !== "game-over" && (
        <Navbar
          onOpenLeaderboard={() => setActiveModal("leaderboard")}
          onOpenAchievements={() => setActiveModal("achievements")}
        />
      )}

      {screen === "landing" && (
        <LandingScreen
          onStart={handleStart}
          onOpenLeaderboard={() => setActiveModal("leaderboard")}
          onOpenAchievements={() => setActiveModal("achievements")}
          onOpenHowToPlay={() => setActiveModal("how-to-play")}
          onOpenPowers={() => setActiveModal("powers")}
        />
      )}

      {screen === "setup" && (
        <SetupScreen initialMode={setupMode} onBack={() => setScreen("landing")} />
      )}

      {(screen === "playing" || screen === "game-over") && <GameScreen />}

      <Modal
        open={activeModal === "leaderboard"}
        onClose={() => setActiveModal(null)}
        title="🏆 Leaderboard & Statistik"
      >
        <LeaderboardContent />
      </Modal>

      <Modal
        open={activeModal === "achievements"}
        onClose={() => setActiveModal(null)}
        title="🏅 Achievement"
      >
        <AchievementsContent />
      </Modal>

      <Modal
        open={activeModal === "powers"}
        onClose={() => setActiveModal(null)}
        title="⚡ Super Powers"
      >
        <PowersContent />
      </Modal>

      <Modal
        open={activeModal === "how-to-play"}
        onClose={() => setActiveModal(null)}
        title="📖 Cara Bermain"
      >
        <HowToPlayContent />
      </Modal>
    </main>
  );
}
