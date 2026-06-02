import { GEO_NODES, getGeoNode, haversineKm } from "../data/geo";
import type { DifficultyLevel, PlateItem } from "../types";
import { createSeededRandom } from "./random";

export const DEFAULT_DIFFICULTY: DifficultyLevel = "average";
export const DEFAULT_LOCATION_CODE = "75";

export const DIFFICULTY_LEVELS: DifficultyLevel[] = ["cakewalk", "easy", "average", "challenging", "insane"];

type DifficultyProfile = {
  rarityPower: number;
  commonPower: number;
  rarityWeight: number;
  commonWeight: number;
  floor: number;
};

export const rarityScoringConfig = {
  base: 1,
  graphDistanceWeight: 0.4,
  distanceLogWeight: 0.3,
  sharedBorderWeight: 0.5,
  populationLogWeight: 0.25,
  maxGraphDistance: 8,
  maxDistanceKm: 3200,
  maxPopulationTerm: 8,
  disconnectedGraphDistance: 8,
  pairAdjustments: {
    "75:92": -0.4,
    "75:93": -0.4,
    "75:94": -0.4,
    "06:MC": -0.7,
    "59:B": -0.5,
    "67:D": -0.5,
    "68:CH": -0.5
  } as Record<string, number>,
  difficultyProfiles: {
    cakewalk: { rarityPower: 3, commonPower: 0.45, rarityWeight: 0.15, commonWeight: 1.6, floor: 0.08 },
    easy: { rarityPower: 2, commonPower: 0.7, rarityWeight: 0.45, commonWeight: 1.3, floor: 0.1 },
    average: { rarityPower: 1, commonPower: 1, rarityWeight: 1, commonWeight: 1, floor: 0.18 },
    challenging: { rarityPower: 0.7, commonPower: 2, rarityWeight: 1.4, commonWeight: 0.45, floor: 0.08 },
    insane: { rarityPower: 0.45, commonPower: 3, rarityWeight: 1.8, commonWeight: 0.12, floor: 0.04 }
  } satisfies Record<DifficultyLevel, DifficultyProfile>
};

export type ScoredPlateItem = {
  item: PlateItem;
  rawScore: number;
  normalizedScore: number;
};

export function scoreItemsForLocation(items: PlateItem[], locationCode: string): ScoredPlateItem[] {
  const location = getGeoNode(locationCode) ?? GEO_NODES[DEFAULT_LOCATION_CODE];
  const raw = items.map((item) => ({
    item,
    rawScore: scoreItem(item.code, location.code)
  }));
  const values = raw.map((entry) => entry.rawScore);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = max - min || 1;

  return raw.map((entry) => ({
    ...entry,
    normalizedScore: ((entry.rawScore - min) / spread) * 100
  }));
}

export function scoreItem(itemCode: string, locationCode: string): number {
  const item = getGeoNode(itemCode);
  const location = getGeoNode(locationCode);

  if (!item || !location) {
    return 100;
  }

  const graphDistance = Math.min(
    getGraphDistance(location.code, item.code) ?? rarityScoringConfig.disconnectedGraphDistance,
    rarityScoringConfig.maxGraphDistance
  );
  const distanceKm = Math.min(
    haversineKm(location.latitude, location.longitude, item.latitude, item.longitude),
    rarityScoringConfig.maxDistanceKm
  );
  const sharedBorder = areNeighbors(location.code, item.code) ? 1 : 0;
  const populationTerm = Math.min(Math.log(item.population / 100000 + 1), rarityScoringConfig.maxPopulationTerm);
  const pairAdjustment = getPairAdjustment(location.code, item.code);

  return (
    rarityScoringConfig.base +
    rarityScoringConfig.graphDistanceWeight * graphDistance +
    rarityScoringConfig.distanceLogWeight * Math.log(distanceKm + 1) -
    rarityScoringConfig.sharedBorderWeight * sharedBorder -
    rarityScoringConfig.populationLogWeight * populationTerm +
    pairAdjustment
  );
}

export function pickWeightedByDifficulty(
  scoredItems: ScoredPlateItem[],
  count: number,
  seed: string,
  difficulty: DifficultyLevel
): PlateItem[] {
  const random = createSeededRandom(`${seed}-${difficulty}`);
  const pool = scoredItems.map((entry) => ({ ...entry }));
  const selected: PlateItem[] = [];
  const profile = rarityScoringConfig.difficultyProfiles[difficulty];

  while (selected.length < count && pool.length > 0) {
    const weights = pool.map((entry) => getDifficultyWeight(entry.normalizedScore, profile));
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let cursor = random() * totalWeight;
    let selectedIndex = 0;

    for (let index = 0; index < weights.length; index += 1) {
      cursor -= weights[index];
      if (cursor <= 0) {
        selectedIndex = index;
        break;
      }
    }

    selected.push(pool[selectedIndex].item);
    pool.splice(selectedIndex, 1);
  }

  return selected;
}

export function getGraphDistance(startCode: string, targetCode: string): number | null {
  const start = getGeoNode(startCode);
  const target = getGeoNode(targetCode);

  if (!start || !target) {
    return null;
  }

  if (start.code === target.code) {
    return 0;
  }

  const adjacency = getBidirectionalAdjacency();
  const seen = new Set([start.code]);
  const queue: Array<{ code: string; distance: number }> = [{ code: start.code, distance: 0 }];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) {
      break;
    }

    for (const neighbor of adjacency[current.code] ?? []) {
      if (neighbor === target.code) {
        return current.distance + 1;
      }

      if (!seen.has(neighbor)) {
        seen.add(neighbor);
        queue.push({ code: neighbor, distance: current.distance + 1 });
      }
    }
  }

  return null;
}

export function areNeighbors(firstCode: string, secondCode: string): boolean {
  return (getBidirectionalAdjacency()[firstCode] ?? []).includes(secondCode);
}

function getDifficultyWeight(normalizedScore: number, profile: DifficultyProfile): number {
  const rarity = normalizedScore / 100;
  const commonness = 1 - rarity;

  return (
    profile.floor +
    profile.rarityWeight * Math.pow(rarity, profile.rarityPower) +
    profile.commonWeight * Math.pow(commonness, profile.commonPower)
  );
}

function getPairAdjustment(locationCode: string, itemCode: string): number {
  const forward = `${locationCode}:${itemCode}`;
  const reverse = `${itemCode}:${locationCode}`;

  return rarityScoringConfig.pairAdjustments[forward] ?? rarityScoringConfig.pairAdjustments[reverse] ?? 0;
}

let adjacencyCache: Record<string, string[]> | null = null;

function getBidirectionalAdjacency(): Record<string, string[]> {
  if (adjacencyCache) {
    return adjacencyCache;
  }

  const adjacency: Record<string, Set<string>> = {};

  for (const node of Object.values(GEO_NODES)) {
    adjacency[node.code] = adjacency[node.code] ?? new Set();

    for (const neighbor of node.neighbors) {
      if (!GEO_NODES[neighbor]) {
        continue;
      }

      adjacency[node.code].add(neighbor);
      adjacency[neighbor] = adjacency[neighbor] ?? new Set();
      adjacency[neighbor].add(node.code);
    }
  }

  adjacencyCache = Object.fromEntries(
    Object.entries(adjacency).map(([code, neighbors]) => [
      code,
      [...neighbors].sort((a, b) => a.localeCompare(b, "fr", { numeric: true }))
    ])
  );

  return adjacencyCache;
}
