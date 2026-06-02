import { beforeEach, describe, expect, it } from "vitest";
import { generateCard } from "./game/generator";
import { loadStoredGame, saveStoredGame } from "./storage";

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("creates a French default game when storage is empty", () => {
    const game = loadStoredGame();

    expect(game.locale).toBe("fr");
    expect(game.card.size).toBe(5);
    expect(game.card.mode).toBe("mixed");
  });

  it("loads a valid stored game", () => {
    const stored = {
      locale: "en" as const,
      card: generateCard({ seed: "SAVE", mode: "france", size: 5 })
    };

    saveStoredGame(stored);

    expect(loadStoredGame()).toEqual(stored);
  });

  it("falls back when storage contains malformed JSON", () => {
    localStorage.setItem("autoroloto.game.v1", "{not-json");

    expect(loadStoredGame().locale).toBe("fr");
  });

  it("falls back when a stored card contains stale dataset items", () => {
    const stale = generateCard({ seed: "STALE", mode: "france", size: 5 });
    stale.squares[0] = {
      code: "976",
      name: "Mayotte",
      kind: "FR_DEPT",
      region: "Outre-mer"
    };
    saveStoredGame({ locale: "fr", card: stale });

    expect(loadStoredGame().card.squares.some((item) => item.code === "976")).toBe(false);
  });
});
