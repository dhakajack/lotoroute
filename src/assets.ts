export const titlePlateUrl = new URL("../assets/images/lotoroute.png", import.meta.url).href;
export const gearUrl = new URL("../assets/images/gear.png", import.meta.url).href;

const flagAssets: Record<string, string> = {
  ad: new URL("../assets/images/w640/ad.png", import.meta.url).href,
  at: new URL("../assets/images/w640/at.png", import.meta.url).href,
  be: new URL("../assets/images/w640/be.png", import.meta.url).href,
  bg: new URL("../assets/images/w640/bg.png", import.meta.url).href,
  ch: new URL("../assets/images/w640/ch.png", import.meta.url).href,
  cy: new URL("../assets/images/w640/cy.png", import.meta.url).href,
  cz: new URL("../assets/images/w640/cz.png", import.meta.url).href,
  de: new URL("../assets/images/w640/de.png", import.meta.url).href,
  dk: new URL("../assets/images/w640/dk.png", import.meta.url).href,
  ee: new URL("../assets/images/w640/ee.png", import.meta.url).href,
  es: new URL("../assets/images/w640/es.png", import.meta.url).href,
  fi: new URL("../assets/images/w640/fi.png", import.meta.url).href,
  gb: new URL("../assets/images/w640/gb.png", import.meta.url).href,
  gr: new URL("../assets/images/w640/gr.png", import.meta.url).href,
  hr: new URL("../assets/images/w640/hr.png", import.meta.url).href,
  hu: new URL("../assets/images/w640/hu.png", import.meta.url).href,
  ie: new URL("../assets/images/w640/ie.png", import.meta.url).href,
  is: new URL("../assets/images/w640/is.png", import.meta.url).href,
  it: new URL("../assets/images/w640/it.png", import.meta.url).href,
  li: new URL("../assets/images/w640/li.png", import.meta.url).href,
  lt: new URL("../assets/images/w640/lt.png", import.meta.url).href,
  lu: new URL("../assets/images/w640/lu.png", import.meta.url).href,
  lv: new URL("../assets/images/w640/lv.png", import.meta.url).href,
  mc: new URL("../assets/images/w640/mc.png", import.meta.url).href,
  mt: new URL("../assets/images/w640/mt.png", import.meta.url).href,
  nl: new URL("../assets/images/w640/nl.png", import.meta.url).href,
  no: new URL("../assets/images/w640/no.png", import.meta.url).href,
  pl: new URL("../assets/images/w640/pl.png", import.meta.url).href,
  pt: new URL("../assets/images/w640/pt.png", import.meta.url).href,
  ro: new URL("../assets/images/w640/ro.png", import.meta.url).href,
  se: new URL("../assets/images/w640/se.png", import.meta.url).href,
  si: new URL("../assets/images/w640/si.png", import.meta.url).href,
  sk: new URL("../assets/images/w640/sk.png", import.meta.url).href,
  sm: new URL("../assets/images/w640/sm.png", import.meta.url).href
};

const countryFlagCodes: Record<string, keyof typeof flagAssets> = {
  A: "at",
  AND: "ad",
  B: "be",
  BG: "bg",
  CH: "ch",
  CY: "cy",
  CZ: "cz",
  D: "de",
  DK: "dk",
  E: "es",
  EST: "ee",
  FIN: "fi",
  FL: "li",
  GB: "gb",
  GR: "gr",
  H: "hu",
  HR: "hr",
  I: "it",
  IRL: "ie",
  IS: "is",
  L: "lu",
  LT: "lt",
  LV: "lv",
  M: "mt",
  MC: "mc",
  N: "no",
  NL: "nl",
  P: "pt",
  PL: "pl",
  RO: "ro",
  RSM: "sm",
  S: "se",
  SK: "sk",
  SLO: "si",
  UK: "gb"
};

export function getCountryFlagUrl(code: string, assetCode?: string): string | null {
  const flagCode = (assetCode ?? countryFlagCodes[code])?.toLowerCase() as keyof typeof flagAssets | undefined;

  if (!flagCode) {
    return null;
  }

  return flagAssets[flagCode] ?? null;
}
