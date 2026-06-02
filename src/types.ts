export type PlateKind = "FR_DEPT" | "EU_COUNTRY" | "EUROPE_COUNTRY";
export type Rarity = "common" | "medium" | "rare" | "insane";
export type GameMode = "mixed" | "france" | "countries";
export type Locale = "fr" | "en";

export type PlateItem = {
  code: string;
  name: string;
  englishName?: string;
  shortName?: string;
  kind: PlateKind;
  region?: string;
  chefLieu?: string;
  capital?: string;
  population?: number;
  assetCode?: string;
  regionAsset?: string;
  rarity?: Rarity;
};

export type Card = {
  id: string;
  seed: string;
  size: number;
  mode: GameMode;
  squares: PlateItem[];
  marked: Record<string, boolean>;
  createdAt: string;
};

export type WinningLineType = "row" | "column" | "diagonal";

export type WinningLine = {
  id: string;
  type: WinningLineType;
  indexes: number[];
};

export type StoredGame = {
  card: Card;
  locale: Locale;
};
