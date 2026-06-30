"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CHARACTERS } from "@/lib/config/characters";
import { PLAYER_COLORS } from "@/lib/config/player-colors";
import { useConfetti } from "@/hooks/use-confetti";
import type { Player } from "@/types";

interface GameOverScreenProps {
  players: Player[];
  onPlayAgain: () => void;
  onBackToHome: () => void;
}

export function GameOverScreen({ players, onPlayAgain, onBackToHome }: GameOverScreenProps) {
  const { fire } = useConfetti();

  const ranked = [...players].sort((a, b) => {
    if (a.finishRank && b.finishRank) return a.finishRank - b.finishRank;
    if (a.finishRank) return -1;
    if (b.finishRank) return 1;
    return b.position - a.position;
  });

  useEffect(() => {
    fire();
  }, [fire]);

  const champion = ranked[0];

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="text-center" padding="lg">
          <div className="mb-2 text-5xl">🏆</div>
          <h2 className="font-display text-2xl font-extrabold text-ink">Permainan Selesai!</h2>
          {champion && (
            <p className="mt-1 text-sm text-ink/55">
              Selamat,{" "}
              <span className="font-bold" style={{ color: PLAYER_COLORS[champion.colorToken].hex }}>
                {champion.name}
              </span>{" "}
              menjadi juara! 🎉
            </p>
          )}

          <div className="mt-6 flex flex-col gap-2">
            {ranked.map((p, idx) => {
              const character = CHARACTERS[p.character];
              const colorDef = PLAYER_COLORS[p.colorToken];
              const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "🎖️";
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex items-center gap-3 rounded-xl bg-cream px-3 py-2.5 text-left"
                >
                  <span className="text-lg">{medal}</span>
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm"
                    style={{
                      background: `linear-gradient(135deg, ${character.colorFrom}, ${character.colorTo})`,
                    }}
                  >
                    {character.emoji}
                  </span>
                  <span className="flex-1 truncate text-sm font-bold" style={{ color: colorDef.hex }}>
                    {p.name}
                  </span>
                  <span className="text-xs font-bold text-ink/40">Kotak {p.position}</span>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-7 flex flex-col gap-2.5">
            <Button variant="secondary" size="md" onClick={onPlayAgain}>
              Main Lagi
            </Button>
            <Button variant="outline" size="md" onClick={onBackToHome}>
              Kembali ke Menu
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
