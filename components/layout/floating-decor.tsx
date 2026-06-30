"use client";

import { motion } from "framer-motion";

export function FloatingDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* awan kiri atas */}
      <motion.div
        className="absolute left-[4%] top-[8%] text-5xl opacity-90 sm:text-6xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        ☁️
      </motion.div>

      {/* awan kanan */}
      <motion.div
        className="absolute right-[6%] top-[18%] text-4xl opacity-80 sm:text-5xl"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        ☁️
      </motion.div>

      {/* dadu kecil */}
      <motion.div
        className="absolute left-[3%] top-[40%] text-4xl sm:text-5xl"
        animate={{ rotate: [0, 12, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🎲
      </motion.div>

      {/* sparkle */}
      <motion.div
        className="absolute right-[10%] top-[6%] text-2xl text-brand-yellow sm:text-3xl"
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute left-[14%] top-[58%] text-xl text-brand-pink sm:text-2xl"
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute right-[4%] top-[52%] text-2xl text-brand-blue sm:text-3xl"
        animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        ✦
      </motion.div>

      {/* smiley */}
      <motion.div
        className="absolute right-[16%] top-[36%] text-3xl sm:text-4xl"
        animate={{ rotate: [-6, 6, -6] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        😊
      </motion.div>
    </div>
  );
}
