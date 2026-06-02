import { describe, expect, it } from "vitest";
import { generateCard } from "./generator";
import { scoreItemsForLocation } from "./difficulty";
import { getItemsForMode } from "../data/plates";

describe("generateCard", () => {
  it("generates deterministic boards for the same seed, mode, and size", () => {
    const first = generateCard({ seed: "ROAD42", mode: "mixed", size: 5, createdAt: "2026-01-01T00:00:00.000Z" });
    const second = generateCard({ seed: "ROAD42", mode: "mixed", size: 5, createdAt: "2026-01-01T00:00:00.000Z" });

    expect(first.squares.map((item) => item.code)).toEqual(second.squares.map((item) => item.code));
  });

  it("does not duplicate square codes", () => {
    const card = generateCard({ seed: "UNIQUE", mode: "mixed", size: 5 });
    const codes = card.squares.map((item) => item.code);

    expect(new Set(codes).size).toBe(codes.length);
  });

  it("filters France-only cards to departments", () => {
    const card = generateCard({ seed: "FRANCE", mode: "france", size: 5 });

    expect(card.squares.every((item) => item.kind === "FR_DEPT")).toBe(true);
  });

  it("filters country cards away from departments", () => {
    const card = generateCard({ seed: "COUNTRIES", mode: "countries", size: 5 });

    expect(card.squares.every((item) => item.kind !== "FR_DEPT")).toBe(true);
  });

  it("keeps cards deterministic for the same difficulty and location", () => {
    const first = generateCard({ seed: "SETUP", mode: "mixed", difficulty: "insane", locationCode: "33", size: 5 });
    const second = generateCard({ seed: "SETUP", mode: "mixed", difficulty: "insane", locationCode: "33", size: 5 });

    expect(first.squares.map((item) => item.code)).toEqual(second.squares.map((item) => item.code));
    expect(first.difficulty).toBe("insane");
    expect(first.locationCode).toBe("33");
  });

  it("balances cakewalk toward easy, average toward mid-range, and insane toward hard", () => {
    const scores = new Map(scoreItemsForLocation(getItemsForMode("mixed"), "75").map((entry) => [entry.item.code, entry.normalizedScore]));
    const seeds = Array.from({ length: 140 }, (_, index) => `SKEW-${index}`);

    const cakewalk = summarizeCards(seeds, "cakewalk", scores);
    const average = summarizeCards(seeds, "average", scores);
    const insane = summarizeCards(seeds, "insane", scores);

    expect(cakewalk.easy).toBeGreaterThan(seeds.length * 7);
    expect(cakewalk.hard).toBeLessThan(seeds.length * 2);
    expect(average.mid).toBeGreaterThan(average.easy);
    expect(average.easy).toBeGreaterThan(average.hard);
    expect(insane.hard).toBeGreaterThan(insane.mid);
    expect(insane.easy).toBeLessThan(insane.hard / 3);
    expect(cakewalk.averageScore).toBeLessThan(average.averageScore);
    expect(average.averageScore).toBeLessThan(insane.averageScore);
  });
});

function summarizeCards(seeds: string[], difficulty: "cakewalk" | "average" | "insane", scores: Map<string, number>) {
  const summary = { easy: 0, mid: 0, hard: 0, scoreTotal: 0, itemCount: 0 };

  for (const seed of seeds) {
    const card = generateCard({ seed, mode: "mixed", difficulty, locationCode: "75", size: 5 });

    for (const item of card.squares) {
      const score = scores.get(item.code) ?? 0;
      summary.scoreTotal += score;
      summary.itemCount += 1;

      if (score < 34) {
        summary.easy += 1;
      } else if (score < 67) {
        summary.mid += 1;
      } else {
        summary.hard += 1;
      }
    }
  }

  return {
    ...summary,
    averageScore: summary.scoreTotal / summary.itemCount
  };
}
