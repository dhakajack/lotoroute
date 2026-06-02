import type { CSSProperties } from "react";
import type { Locale, PlateItem } from "../types";
import BingoSquare from "./BingoSquare";

type BingoBoardProps = {
  squares: PlateItem[];
  marked: Record<string, boolean>;
  size: number;
  winningIndexes: Set<number>;
  locale: Locale;
  onToggle: (item: PlateItem) => void;
  onLongPress: (item: PlateItem) => void;
};

export default function BingoBoard({
  squares,
  marked,
  size,
  winningIndexes,
  locale,
  onToggle,
  onLongPress
}: BingoBoardProps) {
  return (
    <div
      className="board"
      style={{ "--board-size": size } as CSSProperties}
      aria-label="Lotoroute board"
    >
      {squares.map((item, index) => (
        <BingoSquare
          key={item.code}
          item={item}
          marked={Boolean(marked[item.code])}
          winning={winningIndexes.has(index)}
          locale={locale}
          onToggle={() => onToggle(item)}
          onLongPress={() => onLongPress(item)}
        />
      ))}
    </div>
  );
}
