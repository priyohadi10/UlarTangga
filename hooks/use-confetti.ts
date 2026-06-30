"use client";

import { useCallback } from "react";
import confetti from "canvas-confetti";

export function useConfetti() {
  const fire = useCallback(() => {
    const duration = 2200;
    const end = Date.now() + duration;
    const colors = ["#FF7A2E", "#FFC233", "#2E8EFF", "#3DCB6C", "#FF5DA2"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return { fire };
}
