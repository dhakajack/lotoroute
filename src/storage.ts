import type { Card, Locale, StoredGame } from "./types";
import { getItemsForMode } from "./data/plates";
import { isKnownLocationCode } from "./data/geo";
import { DEFAULT_DIFFICULTY, DEFAULT_LOCATION_CODE, DIFFICULTY_LEVELS } from "./game/difficulty";
import { DEFAULT_BOARD_SIZE, DEFAULT_MODE, generateCard } from "./game/generator";

const STORAGE_KEY = "lotoroute.game.v1";
const DEFAULT_LOCALE: Locale = "fr";

export function loadStoredGame(): StoredGame {
  if (!canUseStorage()) {
    return createDefaultGame();
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return createDefaultGame();
  }

  try {
    const parsed = JSON.parse(raw) as Partial<StoredGame>;
    if (!isValidLocale(parsed.locale) || !isValidCard(parsed.card)) {
      return createDefaultGame();
    }

    return {
      locale: parsed.locale,
      card: parsed.card
    };
  } catch {
    return createDefaultGame();
  }
}

export function saveStoredGame(game: StoredGame): void {
  if (!canUseStorage()) {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
}

export function clearStoredGame(): void {
  if (canUseStorage()) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function createDefaultGame(): StoredGame {
  return {
    locale: DEFAULT_LOCALE,
    card: generateCard({
      size: DEFAULT_BOARD_SIZE,
      mode: DEFAULT_MODE,
      difficulty: DEFAULT_DIFFICULTY,
      locationCode: DEFAULT_LOCATION_CODE
    })
  };
}

function canUseStorage(): boolean {
  try {
    return typeof localStorage !== "undefined";
  } catch {
    return false;
  }
}

function isValidLocale(locale: unknown): locale is Locale {
  return locale === "fr" || locale === "en";
}

function isValidCard(card: unknown): card is Card {
  if (!card || typeof card !== "object") {
    return false;
  }

  const candidate = card as Partial<Card>;
  const squareCount = (candidate.size ?? 0) * (candidate.size ?? 0);

  if (
    typeof candidate.id === "string" &&
    typeof candidate.seed === "string" &&
    typeof candidate.size === "number" &&
    candidate.size > 0 &&
    (candidate.mode === "mixed" || candidate.mode === "france" || candidate.mode === "countries") &&
    isValidDifficulty(candidate.difficulty) &&
    typeof candidate.locationCode === "string" &&
    isKnownLocationCode(candidate.locationCode) &&
    Array.isArray(candidate.squares) &&
    candidate.squares.length === squareCount &&
    typeof candidate.marked === "object" &&
    candidate.marked !== null &&
    typeof candidate.createdAt === "string"
  ) {
    const validCodes = new Set(getItemsForMode(candidate.mode).map((item) => item.code));
    return candidate.squares.every((item) => validCodes.has(item.code));
  }

  return false;
}

function isValidDifficulty(difficulty: unknown): difficulty is Card["difficulty"] {
  return typeof difficulty === "string" && DIFFICULTY_LEVELS.includes(difficulty as Card["difficulty"]);
}
