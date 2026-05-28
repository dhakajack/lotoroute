import { describe, expect, it } from "vitest";
import type { Card } from "../types";
import { generateCard } from "./generator";
import { detectWinningLines } from "./win";

function withMarkedIndexes(card: Card, indexes: number[]): Card {
  return {
    ...card,
    marked: Object.fromEntries(indexes.map((index) => [card.squares[index].code, true]))
  };
}

describe("detectWinningLines", () => {
  it("detects a completed row", () => {
    const card = withMarkedIndexes(generateCard({ seed: "ROWS", size: 5 }), [0, 1, 2, 3, 4]);

    expect(detectWinningLines(card)).toEqual([{ id: "row-0", type: "row", indexes: [0, 1, 2, 3, 4] }]);
  });

  it("detects a completed column", () => {
    const card = withMarkedIndexes(generateCard({ seed: "COLS", size: 5 }), [1, 6, 11, 16, 21]);

    expect(detectWinningLines(card)).toEqual([{ id: "column-1", type: "column", indexes: [1, 6, 11, 16, 21] }]);
  });

  it("detects both diagonals", () => {
    const card = withMarkedIndexes(generateCard({ seed: "DIAGS", size: 5 }), [0, 4, 6, 8, 12, 16, 18, 20, 24]);

    expect(detectWinningLines(card).map((line) => line.id)).toEqual(["diagonal-down", "diagonal-up"]);
  });

  it("returns no lines for partial marks", () => {
    const card = withMarkedIndexes(generateCard({ seed: "NONE", size: 5 }), [0, 1, 2, 3]);

    expect(detectWinningLines(card)).toEqual([]);
  });

  it("removes a win after a square is unmarked", () => {
    const winning = withMarkedIndexes(generateCard({ seed: "UNDO", size: 5 }), [0, 1, 2, 3, 4]);
    const undone = {
      ...winning,
      marked: {
        ...winning.marked,
        [winning.squares[3].code]: false
      }
    };

    expect(detectWinningLines(winning)).toHaveLength(1);
    expect(detectWinningLines(undone)).toEqual([]);
  });
});
