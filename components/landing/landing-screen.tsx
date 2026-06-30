"use client";

import { Hero } from "@/components/landing/hero";
import { FeatureCard } from "@/components/landing/feature-card";
import { FloatingDecor } from "@/components/layout/floating-decor";
import type { GameMode } from "@/types";

interface LandingScreenProps {
  onStart: (mode: GameMode) => void;
  onOpenLeaderboard: () => void;
  onOpenAchievements: () => void;
  onOpenHowToPlay: () => void;
  onOpenPowers: () => void;
}

export function LandingScreen({
  onStart,
  onOpenLeaderboard,
  onOpenAchievements,
  onOpenHowToPlay,
  onOpenPowers,
}: LandingScreenProps) {
  return (
    <div className="relative">
      <FloatingDecor />
      <Hero onPlaySingle={() => onStart("single")} onPlayMultiplayer={() => onStart("multiplayer")} />

      <section className="relative mx-auto max-w-3xl px-4 pb-16 sm:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <FeatureCard icon="🎲" title="Mode Board" subtitle="Pilih ukuran papan" onClick={() => onStart("single")} />
          <FeatureCard icon="⭐" title="Level" subtitle="Pilih tingkat kesulitan" onClick={() => onStart("single")} />
          <FeatureCard icon="🏆" title="Leaderboard" subtitle="Papan peringkat" onClick={onOpenLeaderboard} />
          <FeatureCard icon="🏅" title="Achievement" subtitle="Koleksi pencapaian" onClick={onOpenAchievements} />
          <FeatureCard icon="📖" title="How To Play" subtitle="Pelajari cara bermain" onClick={onOpenHowToPlay} />
          <FeatureCard icon="⚡" title="Super Powers" subtitle="Lihat semua power" onClick={onOpenPowers} />
          <FeatureCard icon="🤖" title="Single Player" subtitle="Main melawan bot" onClick={() => onStart("single")} />
          <FeatureCard icon="👥" title="Multiplayer" subtitle="Main bersama teman" onClick={() => onStart("multiplayer")} />
        </div>
      </section>
    </div>
  );
}
