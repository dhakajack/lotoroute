import { describe, expect, it } from "vitest";
import { findNearestLocationCode, getGeoNode, haversineKm, isKnownLocationCode } from "../data/geo";
import { ALL_PLATE_ITEMS } from "../data/plates";
import { areNeighbors, getGraphDistance, scoreItem, scoreItemsForLocation } from "./difficulty";

describe("location-aware rarity scoring", () => {
  it("has geo metadata for every playable code and rejects France as F", () => {
    const missing = ALL_PLATE_ITEMS.filter((item) => !getGeoNode(item.code)).map((item) => item.code);

    expect(missing).toEqual([]);
    expect(isKnownLocationCode("F")).toBe(false);
  });

  it("calculates graph distance and shared borders", () => {
    expect(getGraphDistance("75", "92")).toBe(1);
    expect(areNeighbors("06", "MC")).toBe(true);
    expect(getGraphDistance("75", "FIN")).toBeGreaterThan(1);
  });

  it("calculates Haversine distances in a sensible order", () => {
    const paris = getGeoNode("75");
    const lyon = getGeoNode("69");
    const finland = getGeoNode("FIN");

    expect(paris && lyon && finland).toBeTruthy();
    expect(haversineKm(paris!.latitude, paris!.longitude, lyon!.latitude, lyon!.longitude)).toBeLessThan(
      haversineKm(paris!.latitude, paris!.longitude, finland!.latitude, finland!.longitude)
    );
  });

  it("scores nearby populous neighbors as less rare than distant small places", () => {
    expect(scoreItem("92", "75")).toBeLessThan(scoreItem("V", "75"));
  });

  it("normalizes scored items to a 0-100 rarity scale", () => {
    const scored = scoreItemsForLocation(ALL_PLATE_ITEMS, "75");

    expect(Math.min(...scored.map((entry) => entry.normalizedScore))).toBe(0);
    expect(Math.max(...scored.map((entry) => entry.normalizedScore))).toBe(100);
  });

  it("resolves GPS coordinates to the nearest configured location code", () => {
    expect(findNearestLocationCode(48.86, 2.35)).toBe("75");
  });
});
