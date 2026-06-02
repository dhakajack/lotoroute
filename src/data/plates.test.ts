import { describe, expect, it } from "vitest";
import { COUNTRY_CODES, FRENCH_DEPARTMENTS } from "./plates";

describe("plate metadata", () => {
  it("has a chef-lieu for every French department", () => {
    const missing = FRENCH_DEPARTMENTS.filter((item) => !item.chefLieu).map((item) => item.code);

    expect(missing).toEqual([]);
  });

  it("has a capital for every country and microstate", () => {
    const missing = COUNTRY_CODES.filter((item) => !item.capital).map((item) => item.code);

    expect(missing).toEqual([]);
  });

  it("uses accented French labels for departments and chef-lieux", () => {
    expect(FRENCH_DEPARTMENTS.find((item) => item.code === "07")?.name).toBe("Ardèche");
    expect(FRENCH_DEPARTMENTS.find((item) => item.code === "25")?.chefLieu).toBe("Besançon");
    expect(FRENCH_DEPARTMENTS.find((item) => item.code === "75")?.region).toBe("Île-de-France");
  });

  it("uses accented French labels for country names and capitals", () => {
    expect(COUNTRY_CODES.find((item) => item.code === "GR")?.name).toBe("Grèce");
    expect(COUNTRY_CODES.find((item) => item.code === "GR")?.capital).toBe("Athènes");
    expect(COUNTRY_CODES.find((item) => item.code === "N")?.name).toBe("Norvège");
  });
});
