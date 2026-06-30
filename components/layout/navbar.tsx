"use client";

import { Music2, Settings, Trophy, Volume2 } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";

interface NavbarProps {
  onOpenLeaderboard: () => void;
  onOpenAchievements: () => void;
}

export function Navbar({ onOpenLeaderboard, onOpenAchievements }: NavbarProps) {
  const [soundOn, setSoundOn] = useState(true);

  return (
    <header className="relative z-20 flex items-center justify-between gap-3 px-4 py-4 sm:px-8">
      <Logo size="sm" className="hidden sm:block" />
      <div className="font-display text-xl font-extrabold sm:hidden">UTM</div>

      <nav className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onOpenLeaderboard}
          className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-sm font-bold text-ink shadow-chunky-sm transition-transform hover:-translate-y-0.5 sm:px-4"
        >
          <Trophy size={18} className="text-brand-yellow-dark" />
          <span className="hidden sm:inline">Leaderboard</span>
        </button>
        <button
          onClick={onOpenAchievements}
          className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-sm font-bold text-ink shadow-chunky-sm transition-transform hover:-translate-y-0.5 sm:px-4"
        >
          🏅
          <span className="hidden sm:inline">Achievement</span>
        </button>
        <button
          onClick={() => setSoundOn((s) => !s)}
          aria-label={soundOn ? "Matikan musik" : "Nyalakan musik"}
          className="rounded-full bg-white p-2.5 text-ink shadow-chunky-sm transition-transform hover:-translate-y-0.5"
        >
          <Music2 size={18} />
        </button>
        <button
          aria-label="Volume"
          onClick={() => setSoundOn((s) => !s)}
          className="rounded-full bg-white p-2.5 text-ink shadow-chunky-sm transition-transform hover:-translate-y-0.5"
        >
          <Volume2 size={18} />
        </button>
        <button
          aria-label="Pengaturan"
          className="rounded-full bg-white p-2.5 text-ink shadow-chunky-sm transition-transform hover:-translate-y-0.5"
        >
          <Settings size={18} />
        </button>
      </nav>
    </header>
  );
}
