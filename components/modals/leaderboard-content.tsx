"use client";

import { useEffect, useState } from "react";
import { getStats, getWinRate } from "@/lib/storage/stats-storage";
import type { GameStatistics } from "@/types";

export function LeaderboardContent() {
  const [stats, setStats] = useState<GameStatistics | null>(null);

  useEffect(() => {
    setStats(getStats());
  }, []);

  if (!stats) return null;

  const winRate = getWinRate(stats);

  const rows = [
    { label: "Total Menang", value: stats.totalWins, icon: "🏆" },
    { label: "Total Kalah", value: stats.totalLosses, icon: "💔" },
    { label: "Total Permainan", value: stats.gamesPlayed, icon: "🎮" },
    { label: "Win Rate", value: `${winRate}%`, icon: "📊" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-ink/55">
        Statistikmu disimpan secara lokal di perangkat ini. Mainkan lebih banyak untuk
        meningkatkan peringkat!
      </p>
      <div className="grid grid-cols-2 gap-3">
        {rows.map((r) => (
          <div key={r.label} className="rounded-xl bg-cream p-3 text-center">
            <div className="text-2xl">{r.icon}</div>
            <div className="font-display mt-1 text-lg font-extrabold text-ink">{r.value}</div>
            <div className="text-xs text-ink/50">{r.label}</div>
          </div>
        ))}
      </div>
      {stats.gamesPlayed === 0 && (
        <p className="rounded-xl bg-brand-yellow/15 p-3 text-center text-xs font-bold text-brand-orange-dark">
          Belum ada riwayat. Mainkan permainan pertamamu sekarang!
        </p>
      )}
    </div>
  );
}
