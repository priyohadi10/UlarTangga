"use client";

import { Card } from "@/components/ui/card";
import { SelectChip } from "@/components/ui/select-chip";
import { LEVEL_LIST } from "@/lib/config/levels";
import type { BoardSize, GameLevel } from "@/types";

interface BoardLevelPanelProps {
  boardSize: BoardSize;
  level: GameLevel;
  onChangeBoardSize: (size: BoardSize) => void;
  onChangeLevel: (level: GameLevel) => void;
}

const BOARD_SIZES: BoardSize[] = [7, 10, 12];

const levelColorMap: Record<GameLevel, "green" | "yellow" | "red"> = {
  easy: "green",
  medium: "yellow",
  hard: "red",
};

export function BoardLevelPanel({
  boardSize,
  level,
  onChangeBoardSize,
  onChangeLevel,
}: BoardLevelPanelProps) {
  return (
    <Card>
      <div className="mb-3">
        <h3 className="font-display text-base font-extrabold text-ink">Mode Board</h3>
        <p className="text-xs text-ink/50">Pilih ukuran papan permainan</p>
      </div>
      <div className="mb-5 grid grid-cols-3 gap-2">
        {BOARD_SIZES.map((size) => (
          <SelectChip
            key={size}
            label={`${size}x${size}`}
            selected={boardSize === size}
            onClick={() => onChangeBoardSize(size)}
            colorToken="blue"
          />
        ))}
      </div>

      <div className="mb-3">
        <h3 className="font-display text-base font-extrabold text-ink">Pilih Level</h3>
        <p className="text-xs text-ink/50">Tingkat kesulitan permainan</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {LEVEL_LIST.map((l) => (
          <SelectChip
            key={l.label}
            label={l.label}
            icon={<span>{l.icon}</span>}
            selected={level === l.label.toLowerCase()}
            onClick={() => onChangeLevel(l.label.toLowerCase() as GameLevel)}
            colorToken={levelColorMap[l.label.toLowerCase() as GameLevel]}
          />
        ))}
      </div>
    </Card>
  );
}
