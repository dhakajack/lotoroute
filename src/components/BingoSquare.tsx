import { useRef } from "react";
import { getPlateName } from "../data/plates";
import type { Locale, PlateItem } from "../types";

type BingoSquareProps = {
  item: PlateItem;
  marked: boolean;
  winning: boolean;
  locale: Locale;
  onToggle: () => void;
  onLongPress: () => void;
};

const LONG_PRESS_MS = 520;

export default function BingoSquare({
  item,
  marked,
  winning,
  locale,
  onToggle,
  onLongPress
}: BingoSquareProps) {
  const timer = useRef<number | null>(null);
  const longPressed = useRef(false);

  function clearTimer() {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }

  function startPress() {
    longPressed.current = false;
    clearTimer();
    timer.current = window.setTimeout(() => {
      longPressed.current = true;
      onLongPress();
    }, LONG_PRESS_MS);
  }

  function endPress() {
    clearTimer();

    if (longPressed.current) {
      longPressed.current = false;
      return;
    }

    onToggle();
  }

  return (
    <button
      className={`square${marked ? " is-marked" : ""}${winning ? " is-winning" : ""}`}
      type="button"
      aria-pressed={marked}
      aria-label={`${item.code} - ${getPlateName(item, locale)}`}
      onPointerDown={startPress}
      onPointerUp={endPress}
      onPointerCancel={clearTimer}
      onPointerLeave={clearTimer}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggle();
        }
      }}
    >
      <span>{item.code}</span>
    </button>
  );
}
