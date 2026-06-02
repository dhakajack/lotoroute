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
    const first = generateCard({ seed: "SETUP", mode: "mixed", difficulty: "challenging", locationCode: "33", size: 5 });
    const second = generateCard({ seed: "SETUP", mode: "mixed", difficulty: "challenging", locationCode: "33", size: 5 });

    expect(first.squares.map((item) => item.code)).toEqual(second.squares.map((item) => item.code));
    expect(first.difficulty).toBe("challenging");
    expect(first.locationCode).toBe("33");
  });

  it("skews harder difficulties toward higher dynamic rarity scores", () => {
    const scores = new Map(scoreItemsForLocation(getItemsForMode("mixed"), "75").map((entry) => [entry.item.code, entry.normalizedScore]));
    const seeds = Array.from({ length: 40 }, (_, index) => `SKEW-${index}`);

    const cakewalkAverage = averageCardScore(seeds, "cakewalk", scores);
    const insaneAverage = averageCardScore(seeds, "insane", scores);

    expect(insaneAverage).toBeGreaterThan(cakewalkAverage);
  });
});

function averageCardScore(seeds: string[], difficulty: "cakewalk" | "insane", scores: Map<string, number>): number {
  const cardScores = seeds.map((seed) => {
    const card = generateCard({ seed, mode: "mixed", difficulty, locationCode: "75", size: 5 });
    return card.squares.reduce((sum, item) => sum + (scores.get(item.code) ?? 0), 0) / card.squares.length;
  });

  return cardScores.reduce((sum, score) => sum + score, 0) / cardScores.length;
}
