import type { Player } from "@/types";
import { MANUAL_POWERS } from "@/lib/config/powers";

/**
 * AI bot sederhana: memutuskan apakah bot ingin memakai sebuah power manual
 * yang dimilikinya sebelum melempar dadu. Strategi heuristik ringan:
 * - selalu pakai "sprint"/"rocket" jika punya (agresif maju)
 * - "freeze"/"swap-position" dipakai jika ada lawan yang jauh di depan
 */
export function botDecideManualPower(
  bot: Player,
  allPlayers: Player[]
): string | null {
  const ownedManual = bot.powers.find((p) =>
    MANUAL_POWERS.includes(p.powerId as (typeof MANUAL_POWERS)[number])
  );
  if (!ownedManual) return null;

  const leader = [...allPlayers]
    .filter((p) => p.id !== bot.id && !p.isFinished)
    .sort((a, b) => b.position - a.position)[0];

  const isBehind = leader && leader.position - bot.position > 8;

  if (ownedManual.powerId === "sprint" || ownedManual.powerId === "rocket") {
    return ownedManual.uid;
  }
  if (ownedManual.powerId === "swap-position" && isBehind) {
    return ownedManual.uid;
  }
  if (ownedManual.powerId === "freeze" && isBehind) {
    return ownedManual.uid;
  }
  if (ownedManual.powerId === "teleport") {
    return ownedManual.uid;
  }

  return null;
}

/** Pilih target lawan untuk power swap/freeze: prioritaskan yang paling depan */
export function botPickTarget(bot: Player, allPlayers: Player[]): Player | null {
  const candidates = allPlayers.filter((p) => p.id !== bot.id && !p.isFinished);
  if (candidates.length === 0) return null;
  return [...candidates].sort((a, b) => b.position - a.position)[0] ?? null;
}

/** Delay berpikir bot (ms) supaya terasa natural, bukan instan */
export function botThinkingDelay(): number {
  return 650 + Math.random() * 500;
}
