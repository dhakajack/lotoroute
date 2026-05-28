import { getItemsForMode } from "../data/plates";
import type { Card, GameMode, PlateItem } from "../types";
import { createReadableSeed, createSeededRandom } from "./random";

export const DEFAULT_BOARD_SIZE = 5;
export const DEFAULT_MODE: GameMode = "mixed";

export function generateCard(options: {
  seed?: string;
  size?: number;
  mode?: GameMode;
  createdAt?: string;
} = {}): Card {
  const size = options.size ?? DEFAULT_BOARD_SIZE;
  const mode = options.mode ?? DEFAULT_MODE;
  const seed = options.seed ?? createReadableSeed();
  const pool = getItemsForMode(mode);
  const squareCount = size * size;

  if (pool.length < squareCount) {
    throw new Error(`Not enough plate items for a ${size}x${size} ${mode} card.`);
  }

  const squares = pickUnique(pool, squareCount, seed);

  return {
    id: `${mode}-${size}-${seed}`,
    seed,
    size,
    mode,
    squares,
    marked: {},
    createdAt: options.createdAt ?? new Date().toISOString()
  };
}

export function pickUnique(items: PlateItem[], count: number, seed: string): PlateItem[] {
  const random = createSeededRandom(seed);
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy.slice(0, count);
}
