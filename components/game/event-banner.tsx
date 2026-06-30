"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EVENTS } from "@/lib/config/events";
import type { ActiveEvent } from "@/types";

interface EventBannerProps {
  activeEvent: ActiveEvent | null;
}

export function EventBanner({ activeEvent }: EventBannerProps) {
  return (
    <AnimatePresence>
      {activeEvent && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="flex items-center gap-3 rounded-2xl border-2 border-brand-purple/30 bg-gradient-to-r from-brand-purple/10 to-brand-pink/10 px-4 py-3"
        >
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            {EVENTS[activeEvent.eventId].icon}
          </motion.span>
          <div className="min-w-0">
            <p className="font-display text-sm font-extrabold text-brand-purple">
              {EVENTS[activeEvent.eventId].name}
            </p>
            <p className="truncate text-xs text-ink/55">
              {EVENTS[activeEvent.eventId].description}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
