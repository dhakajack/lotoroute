import { describe, expect, it } from "vitest";
import { generateCard } from "./generator";

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
});
