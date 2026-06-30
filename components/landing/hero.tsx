"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { GAME_TAGLINE } from "@/lib/config";

interface HeroProps {
  onPlaySingle: () => void;
  onPlayMultiplayer: () => void;
}

export function Hero({ onPlaySingle, onPlayMultiplayer }: HeroProps) {
  return (
    <section className="relative px-4 pb-10 pt-4 text-center sm:px-8 sm:pb-14">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto flex max-w-3xl flex-col items-center"
      >
        <div className="mb-3 flex items-center gap-3 text-4xl sm:text-5xl">
          <motion.span
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            🐍
          </motion.span>
        </div>

        <Logo size="lg" />

        <p className="font-display mt-5 text-base font-bold text-ink/70 sm:text-xl">
          Game klasik dengan pengalaman modern!
        </p>
        <p className="mt-1 max-w-xl text-sm text-ink/55 sm:text-base">
          {GAME_TAGLINE} Super Power, Event Acak, dan Arena yang selalu berubah.
        </p>

        <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" variant="secondary" onClick={onPlaySingle} className="group">
            <span className="text-xl">🤖</span>
            Single Player
          </Button>
          <Button size="lg" variant="primary" onClick={onPlayMultiplayer}>
            <span className="text-xl">👥</span>
            Multiplayer
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
