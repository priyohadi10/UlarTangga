"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const DICE_FACE_DOTS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [
    [25, 25],
    [75, 75],
  ],
  3: [
    [25, 25],
    [50, 50],
    [75, 75],
  ],
  4: [
    [25, 25],
    [75, 25],
    [25, 75],
    [75, 75],
  ],
  5: [
    [25, 25],
    [75, 25],
    [50, 50],
    [25, 75],
    [75, 75],
  ],
  6: [
    [25, 25],
    [75, 25],
    [25, 50],
    [75, 50],
    [25, 75],
    [75, 75],
  ],
};

interface DiceProps {
  value: number | null;
  isRolling: boolean;
  disabled: boolean;
  onRoll: () => void;
  /** varian ringkas: dadu kecil + tombol pendek sejajar, untuk sticky bar mobile */
  compact?: boolean;
}

export function Dice({ value, isRolling, disabled, onRoll, compact = false }: DiceProps) {
  const displayValue = value ?? 6;
  const dots = DICE_FACE_DOTS[Math.min(displayValue, 6)] ?? DICE_FACE_DOTS[6]!;

  if (compact) {
    return (
      <div className="flex items-center gap-2.5">
        <motion.div
          aria-hidden="true"
          animate={isRolling ? { rotate: [0, 90, 180, 270, 360] } : {}}
          transition={isRolling ? { duration: 0.6, ease: "easeInOut" } : {}}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-ink/10 bg-white shadow-chunky-sm"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full p-1.5">
            {dots.map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={9} fill="#1A1A2E" />
            ))}
          </svg>
        </motion.div>
        <Button
          onClick={onRoll}
          disabled={disabled}
          variant="primary"
          size="sm"
          className="whitespace-nowrap"
        >
          {isRolling ? "..." : "Lempar"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        type="button"
        onClick={onRoll}
        disabled={disabled}
        aria-label="Lempar dadu"
        animate={isRolling ? { rotate: [0, 90, 180, 270, 360] } : {}}
        transition={isRolling ? { duration: 0.6, ease: "easeInOut" } : {}}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        className="relative h-16 w-16 rounded-2xl border-2 border-ink/10 bg-white shadow-chunky disabled:cursor-not-allowed disabled:opacity-60 sm:h-20 sm:w-20"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full p-2">
          {dots.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={8} fill="#1A1A2E" />
          ))}
        </svg>
      </motion.button>
      <Button onClick={onRoll} disabled={disabled} variant="primary" size="md">
        {isRolling ? "Melempar..." : "Lempar Dadu"}
      </Button>
    </div>
  );
}
