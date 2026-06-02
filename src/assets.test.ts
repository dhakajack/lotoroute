import { describe, expect, it } from "vitest";
import { getCountryFlagUrl } from "./assets";

describe("getCountryFlagUrl", () => {
  it("maps registration codes to available flag assets", () => {
    expect(getCountryFlagUrl("D")).toContain("/assets/");
    expect(getCountryFlagUrl("IRL")).toContain("/assets/");
    expect(getCountryFlagUrl("SLO")).toContain("/assets/");
    expect(getCountryFlagUrl("UK")).toContain("/assets/");
  });

  it("returns null for missing flag mappings", () => {
    expect(getCountryFlagUrl("ZZZ")).toBeNull();
  });
});
