import type { Card, WinningLine } from "../types";

export function detectWinningLines(card: Card): WinningLine[] {
  const lines: WinningLine[] = [];
  const { size } = card;

  for (let row = 0; row < size; row += 1) {
    const indexes = Array.from({ length: size }, (_, column) => row * size + column);
    if (isLineMarked(card, indexes)) {
      lines.push({ id: `row-${row}`, type: "row", indexes });
    }
  }

  for (let column = 0; column < size; column += 1) {
    const indexes = Array.from({ length: size }, (_, row) => row * size + column);
    if (isLineMarked(card, indexes)) {
      lines.push({ id: `column-${column}`, type: "column", indexes });
    }
  }

  const downward = Array.from({ length: size }, (_, index) => index * size + index);
  if (isLineMarked(card, downward)) {
    lines.push({ id: "diagonal-down", type: "diagonal", indexes: downward });
  }

  const upward = Array.from({ length: size }, (_, index) => index * size + (size - 1 - index));
  if (isLineMarked(card, upward)) {
    lines.push({ id: "diagonal-up", type: "diagonal", indexes: upward });
  }

  return lines;
}

function isLineMarked(card: Card, indexes: number[]): boolean {
  return indexes.every((index) => {
    const item = card.squares[index];
    return Boolean(item && card.marked[item.code]);
  });
}

export function getWinningIndexSet(lines: WinningLine[]): Set<number> {
  return new Set(lines.flatMap((line) => line.indexes));
}
