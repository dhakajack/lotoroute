import { describe, expect, it } from "vitest";
import { gearUrl, getCountryFlagUrl, getRegionLogoUrl } from "./assets";
import { COUNTRY_CODES, FRENCH_DEPARTMENTS } from "./data/plates";

describe("getCountryFlagUrl", () => {
  it("maps registration codes to available flag assets", () => {
    expect(getCountryFlagUrl("D")).toContain("/assets/");
    expect(getCountryFlagUrl("IRL")).toContain("/assets/");
    expect(getCountryFlagUrl("SLO")).toContain("/assets/");
    expect(getCountryFlagUrl("UK")).toContain("/assets/");
    expect(getCountryFlagUrl("V")).toContain("/assets/");
  });

  it("returns null for missing flag mappings", () => {
    expect(getCountryFlagUrl("ZZZ")).toBeNull();
  });

  it("uses the SVG gear asset", () => {
    expect(gearUrl).toContain("gear.svg");
  });

  it("maps regions and explicit region assets to logos", () => {
    expect(getRegionLogoUrl("Bretagne")).toContain("/assets/");
    expect(getRegionLogoUrl("Auvergne-Rhône-Alpes")).toContain("/assets/");
    expect(getRegionLogoUrl("Grand Est", "als")).toContain("/assets/");
    expect(getRegionLogoUrl("Missing")).toBeNull();
  });

  it("has a flag for every country item in the game", () => {
    const missing = COUNTRY_CODES.filter((item) => !getCountryFlagUrl(item.code, item.assetCode)).map((item) => item.code);

    expect(missing).toEqual([]);
  });

  it("has a region logo for every French department item in the game", () => {
    const missing = FRENCH_DEPARTMENTS.filter((item) => !getRegionLogoUrl(item.region, item.regionAsset)).map(
      (item) => item.code
    );

    expect(missing).toEqual([]);
  });
});
