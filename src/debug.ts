import { getGeoNode } from "./data/geo";
import { getPlateName, getItemsForMode } from "./data/plates";
import { DIFFICULTY_LEVELS, getScoreBreakdown, scoreItemsForLocation } from "./game/difficulty";
import { difficultyLabel } from "./i18n";
import type { Card, DifficultyLevel, Locale, PlateItem } from "./types";

export const DEBUG_MODE = import.meta.env.VITE_LOTOROUTE_DEBUG === "true";

export function logSquareDebug(item: PlateItem, card: Card, locale: Locale): void {
  if (!DEBUG_MODE) {
    return;
  }

  const breakdown = getScoreBreakdown(item.code, card.locationCode);
  const scoredItems = scoreItemsForLocation(getItemsForMode(card.mode), card.locationCode);
  const scoredItem = scoredItems.find((entry) => entry.item.code === item.code);
  const normalizedScore = scoredItem?.normalizedScore ?? null;
  const calculatedDifficulty = normalizedScore === null ? null : getCalculatedDifficulty(normalizedScore);
  const location = getGeoNode(card.locationCode);

  console.log("[Lotoroute debug] square selected");
  console.log(`  selected: ${item.code} ${getPlateName(item, locale)}`);
  console.log(`  player location: ${card.locationCode}${location ? ` (${location.latitude}, ${location.longitude})` : ""}`);
  console.log(`  destination: ${item.code}${breakdown ? ` (${breakdown.coordinates.item.latitude}, ${breakdown.coordinates.item.longitude})` : ""}`);
  console.log(`  selected game difficulty: ${card.difficulty} / ${difficultyLabel(locale, card.difficulty)}`);

  if (!breakdown) {
    console.log("  no scoring breakdown available");
    return;
  }

  console.log(`  graph route: ${breakdown.route.join("->") || "none"}`);
  console.log(`  graph distance: ${breakdown.graphDistance ?? "none"} capped=${breakdown.cappedGraphDistance}`);
  console.log(`  haversine km: ${round(breakdown.distanceKm)} capped=${round(breakdown.cappedDistanceKm)}`);
  console.log(`  population: ${breakdown.population} term=${round(breakdown.populationTerm)}`);
  console.log(`  shared border bonus: ${breakdown.sharedBorderBonus}`);
  console.log(`  pair adjustment: ${round(breakdown.pairAdjustment)}`);
  console.log("  score components:");
  console.log(`    base=${round(breakdown.base)}`);
  console.log(`    graph=${round(breakdown.graphDistanceComponent)}`);
  console.log(`    distance=${round(breakdown.distanceLogComponent)}`);
  console.log(`    sharedBorder=${round(breakdown.sharedBorderComponent)}`);
  console.log(`    population=${round(breakdown.populationComponent)}`);
  console.log(`    pairAdjustment=${round(breakdown.pairAdjustment)}`);
  console.log(`  raw score: ${round(breakdown.rawScore)}`);
  console.log(`  rating: ${normalizedScore === null ? "unknown" : `${round(normalizedScore)}/100`}`);
  console.log(
    `  calculated difficulty: ${
      calculatedDifficulty ? `${calculatedDifficulty} / ${difficultyLabel(locale, calculatedDifficulty)}` : "unknown"
    }`
  );
}

function getCalculatedDifficulty(score: number): DifficultyLevel {
  const index = Math.min(DIFFICULTY_LEVELS.length - 1, Math.floor(score / (100 / DIFFICULTY_LEVELS.length)));

  return DIFFICULTY_LEVELS[index];
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}
