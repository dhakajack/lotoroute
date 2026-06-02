export const titlePlateUrl = new URL("../assets/images/lotoroute.png", import.meta.url).href;
export const gearUrl = new URL("../assets/images/gear.svg", import.meta.url).href;

const flagAssets: Record<string, string> = {
  ad: new URL("../assets/images/flags-w320/ad.png", import.meta.url).href,
  at: new URL("../assets/images/flags-w320/at.png", import.meta.url).href,
  be: new URL("../assets/images/flags-w320/be.png", import.meta.url).href,
  bg: new URL("../assets/images/flags-w320/bg.png", import.meta.url).href,
  ch: new URL("../assets/images/flags-w320/ch.png", import.meta.url).href,
  cy: new URL("../assets/images/flags-w320/cy.png", import.meta.url).href,
  cz: new URL("../assets/images/flags-w320/cz.png", import.meta.url).href,
  de: new URL("../assets/images/flags-w320/de.png", import.meta.url).href,
  dk: new URL("../assets/images/flags-w320/dk.png", import.meta.url).href,
  ee: new URL("../assets/images/flags-w320/ee.png", import.meta.url).href,
  es: new URL("../assets/images/flags-w320/es.png", import.meta.url).href,
  fi: new URL("../assets/images/flags-w320/fi.png", import.meta.url).href,
  gb: new URL("../assets/images/flags-w320/gb.png", import.meta.url).href,
  gr: new URL("../assets/images/flags-w320/gr.png", import.meta.url).href,
  hr: new URL("../assets/images/flags-w320/hr.png", import.meta.url).href,
  hu: new URL("../assets/images/flags-w320/hu.png", import.meta.url).href,
  ie: new URL("../assets/images/flags-w320/ie.png", import.meta.url).href,
  is: new URL("../assets/images/flags-w320/is.png", import.meta.url).href,
  it: new URL("../assets/images/flags-w320/it.png", import.meta.url).href,
  li: new URL("../assets/images/flags-w320/li.png", import.meta.url).href,
  lt: new URL("../assets/images/flags-w320/lt.png", import.meta.url).href,
  lu: new URL("../assets/images/flags-w320/lu.png", import.meta.url).href,
  lv: new URL("../assets/images/flags-w320/lv.png", import.meta.url).href,
  mc: new URL("../assets/images/flags-w320/mc.png", import.meta.url).href,
  mt: new URL("../assets/images/flags-w320/mt.png", import.meta.url).href,
  nl: new URL("../assets/images/flags-w320/nl.png", import.meta.url).href,
  no: new URL("../assets/images/flags-w320/no.png", import.meta.url).href,
  pl: new URL("../assets/images/flags-w320/pl.png", import.meta.url).href,
  pt: new URL("../assets/images/flags-w320/pt.png", import.meta.url).href,
  ro: new URL("../assets/images/flags-w320/ro.png", import.meta.url).href,
  se: new URL("../assets/images/flags-w320/se.png", import.meta.url).href,
  si: new URL("../assets/images/flags-w320/si.png", import.meta.url).href,
  sk: new URL("../assets/images/flags-w320/sk.png", import.meta.url).href,
  sm: new URL("../assets/images/flags-w320/sm.png", import.meta.url).href,
  va: new URL("../assets/images/flags-w320/va.png", import.meta.url).href
};

const regionAssets: Record<string, string> = {
  als: new URL("../assets/images/regions/als.png", import.meta.url).href,
  ara: new URL("../assets/images/regions/ara.png", import.meta.url).href,
  bfc: new URL("../assets/images/regions/bfc.png", import.meta.url).href,
  bre: new URL("../assets/images/regions/bre.png", import.meta.url).href,
  cor: new URL("../assets/images/regions/cor.png", import.meta.url).href,
  cvl: new URL("../assets/images/regions/cvl.png", import.meta.url).href,
  ges: new URL("../assets/images/regions/ges.png", import.meta.url).href,
  hdf: new URL("../assets/images/regions/hdf.png", import.meta.url).href,
  idf: new URL("../assets/images/regions/idf.png", import.meta.url).href,
  naq: new URL("../assets/images/regions/naq.png", import.meta.url).href,
  nor: new URL("../assets/images/regions/nor.png", import.meta.url).href,
  occ: new URL("../assets/images/regions/occ.png", import.meta.url).href,
  pac: new URL("../assets/images/regions/pac.png", import.meta.url).href,
  pdl: new URL("../assets/images/regions/pdl.png", import.meta.url).href
};

const regionCodes: Record<string, keyof typeof regionAssets> = {
  "Auvergne-Rhone-Alpes": "ara",
  "Bourgogne-Franche-Comte": "bfc",
  Bretagne: "bre",
  "Centre-Val de Loire": "cvl",
  Corse: "cor",
  "Grand Est": "ges",
  "Hauts-de-France": "hdf",
  "Ile-de-France": "idf",
  Normandie: "nor",
  "Nouvelle-Aquitaine": "naq",
  Occitanie: "occ",
  "Pays de la Loire": "pdl",
  "Provence-Alpes-Cote d'Azur": "pac"
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
  UK: "gb",
  V: "va"
};

export function getCountryFlagUrl(code: string, assetCode?: string): string | null {
  const flagCode = (assetCode ?? countryFlagCodes[code])?.toLowerCase() as keyof typeof flagAssets | undefined;

  if (!flagCode) {
    return null;
  }

  return flagAssets[flagCode] ?? null;
}

export function getRegionLogoUrl(region?: string, regionAsset?: string): string | null {
  const regionCode = (regionAsset ?? (region ? regionCodes[region] : undefined))?.toLowerCase() as
    | keyof typeof regionAssets
    | undefined;

  if (!regionCode) {
    return null;
  }

  return regionAssets[regionCode] ?? null;
}
