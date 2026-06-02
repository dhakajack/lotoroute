import { GEO_NODES, getGeoNode, haversineKm } from "../data/geo";
import type { DifficultyLevel, PlateItem } from "../types";
import { createSeededRandom } from "./random";

export const DEFAULT_DIFFICULTY: DifficultyLevel = "average";
export const DEFAULT_LOCATION_CODE = "75";

export const DIFFICULTY_LEVELS: DifficultyLevel[] = ["cakewalk", "average", "insane"];

type DifficultyProfile = {
  easyWeight: number;
  easyPower: number;
  midWeight: number;
  midCenter: number;
  midSpread: number;
  hardWeight: number;
  hardPower: number;
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
    cakewalk: {
      easyWeight: 250,
      easyPower: 6.5,
      midWeight: 1,
      midCenter: 36,
      midSpread: 10,
      hardWeight: 0.0005,
      hardPower: 6,
      floor: 0.00005
    },
    average: {
      easyWeight: 100,
      easyPower: 5,
      midWeight: 12,
      midCenter: 47,
      midSpread: 13,
      hardWeight: 0.01,
      hardPower: 5,
      floor: 0.0005
    },
    insane: {
      easyWeight: 0.08,
      easyPower: 3,
      midWeight: 2,
      midCenter: 62,
      midSpread: 24,
      hardWeight: 7,
      hardPower: 1.3,
      floor: 0.03
    }
  } satisfies Record<DifficultyLevel, DifficultyProfile>
};

export type ScoredPlateItem = {
  item: PlateItem;
  rawScore: number;
  normalizedScore: number;
};

export type ScoreBreakdown = {
  locationCode: string;
  itemCode: string;
  route: string[];
  coordinates: {
    location: { latitude: number; longitude: number };
    item: { latitude: number; longitude: number };
  };
  graphDistance: number | null;
  cappedGraphDistance: number;
  graphDistanceComponent: number;
  distanceKm: number;
  cappedDistanceKm: number;
  distanceLogComponent: number;
  sharedBorderBonus: number;
  sharedBorderComponent: number;
  population: number;
  populationTerm: number;
  populationComponent: number;
  pairAdjustment: number;
  base: number;
  rawScore: number;
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
  return getScoreBreakdown(itemCode, locationCode)?.rawScore ?? 100;
}

export function getScoreBreakdown(itemCode: string, locationCode: string): ScoreBreakdown | null {
  const item = getGeoNode(itemCode);
  const location = getGeoNode(locationCode);

  if (!item || !location) {
    return null;
  }

  const graphDistance = getGraphDistance(location.code, item.code);
  const cappedGraphDistance = Math.min(
    graphDistance ?? rarityScoringConfig.disconnectedGraphDistance,
    rarityScoringConfig.maxGraphDistance
  );
  const distanceKm = haversineKm(location.latitude, location.longitude, item.latitude, item.longitude);
  const cappedDistanceKm = Math.min(distanceKm, rarityScoringConfig.maxDistanceKm);
  const sharedBorder = areNeighbors(location.code, item.code) ? 1 : 0;
  const populationTerm = Math.min(Math.log(item.population / 100000 + 1), rarityScoringConfig.maxPopulationTerm);
  const pairAdjustment = getPairAdjustment(location.code, item.code);
  const graphDistanceComponent = rarityScoringConfig.graphDistanceWeight * cappedGraphDistance;
  const distanceLogComponent = rarityScoringConfig.distanceLogWeight * Math.log(cappedDistanceKm + 1);
  const sharedBorderComponent = -rarityScoringConfig.sharedBorderWeight * sharedBorder;
  const populationComponent = -rarityScoringConfig.populationLogWeight * populationTerm;
  const rawScore =
    rarityScoringConfig.base +
    graphDistanceComponent +
    distanceLogComponent +
    sharedBorderComponent +
    populationComponent +
    pairAdjustment;

  return {
    locationCode: location.code,
    itemCode: item.code,
    route: getGraphPath(location.code, item.code) ?? [],
    coordinates: {
      location: { latitude: location.latitude, longitude: location.longitude },
      item: { latitude: item.latitude, longitude: item.longitude }
    },
    graphDistance,
    cappedGraphDistance,
    graphDistanceComponent,
    distanceKm,
    cappedDistanceKm,
    distanceLogComponent,
    sharedBorderBonus: sharedBorder,
    sharedBorderComponent,
    population: item.population,
    populationTerm,
    populationComponent,
    pairAdjustment,
    base: rarityScoringConfig.base,
    rawScore
  };
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
  const path = getGraphPath(startCode, targetCode);

  return path ? path.length - 1 : null;
}

export function getGraphPath(startCode: string, targetCode: string): string[] | null {
  const start = getGeoNode(startCode);
  const target = getGeoNode(targetCode);

  if (!start || !target) {
    return null;
  }

  if (start.code === target.code) {
    return [start.code];
  }

  const adjacency = getBidirectionalAdjacency();
  const seen = new Set([start.code]);
  const queue: Array<{ code: string; path: string[] }> = [{ code: start.code, path: [start.code] }];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) {
      break;
    }

    for (const neighbor of adjacency[current.code] ?? []) {
      if (neighbor === target.code) {
        return [...current.path, neighbor];
      }

      if (!seen.has(neighbor)) {
        seen.add(neighbor);
        queue.push({ code: neighbor, path: [...current.path, neighbor] });
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
  const midDistance = normalizedScore - profile.midCenter;
  const midBell = Math.exp(-(midDistance * midDistance) / (2 * profile.midSpread * profile.midSpread));

  return (
    profile.floor +
    profile.easyWeight * Math.pow(commonness, profile.easyPower) +
    profile.midWeight * midBell +
    profile.hardWeight * Math.pow(rarity, profile.hardPower)
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
