import type { GameMode, Locale, PlateItem, WinningLine } from "./types";

type TranslationKey =
  | "app.subtitle"
  | "actions.close"
  | "actions.cancel"
  | "actions.confirm"
  | "actions.newCard"
  | "actions.resetMarks"
  | "actions.options"
  | "actions.details"
  | "actions.seed"
  | "actions.mode"
  | "actions.language"
  | "actions.haptics"
  | "toast.removed"
  | "toast.marked"
  | "win.single"
  | "win.multiple"
  | "confirm.resetTitle"
  | "confirm.resetMessage"
  | "confirm.newTitle"
  | "confirm.newMessage"
  | "confirm.modeTitle"
  | "confirm.modeMessage"
  | "detail.department"
  | "detail.country"
  | "detail.region"
  | "detail.rarity"
  | "mode.mixed"
  | "mode.france"
  | "mode.countries"
  | "rarity.common"
  | "rarity.medium"
  | "rarity.rare";

const messages: Record<Locale, Record<TranslationKey, string>> = {
  fr: {
    "app.subtitle": "Loto de route",
    "actions.close": "Fermer",
    "actions.cancel": "Annuler",
    "actions.confirm": "Confirmer",
    "actions.newCard": "Nouvelle carte",
    "actions.resetMarks": "Effacer les marques",
    "actions.options": "Options",
    "actions.details": "Details",
    "actions.seed": "Graine",
    "actions.mode": "Mode",
    "actions.language": "Langue",
    "actions.haptics": "Vibrations",
    "toast.removed": "retire",
    "toast.marked": "marque",
    "win.single": "Ligne complete",
    "win.multiple": "Lignes completes",
    "confirm.resetTitle": "Effacer les marques ?",
    "confirm.resetMessage": "La carte reste la meme, mais toutes les cases cochees seront effacees.",
    "confirm.newTitle": "Nouvelle carte ?",
    "confirm.newMessage": "La carte actuelle sera remplacee par un nouveau tirage.",
    "confirm.modeTitle": "Changer de mode ?",
    "confirm.modeMessage": "Changer de mode remplacera la carte actuelle par un nouveau tirage.",
    "detail.department": "Departement",
    "detail.country": "Pays",
    "detail.region": "Region",
    "detail.rarity": "Frequence",
    "mode.mixed": "France + Europe",
    "mode.france": "France",
    "mode.countries": "Pays",
    "rarity.common": "courant",
    "rarity.medium": "moyen",
    "rarity.rare": "rare"
  },
  en: {
    "app.subtitle": "Road bingo",
    "actions.close": "Close",
    "actions.cancel": "Cancel",
    "actions.confirm": "Confirm",
    "actions.newCard": "New card",
    "actions.resetMarks": "Clear marks",
    "actions.options": "Options",
    "actions.details": "Details",
    "actions.seed": "Seed",
    "actions.mode": "Mode",
    "actions.language": "Language",
    "actions.haptics": "Vibration",
    "toast.removed": "removed",
    "toast.marked": "marked",
    "win.single": "Complete line",
    "win.multiple": "Complete lines",
    "confirm.resetTitle": "Clear marks?",
    "confirm.resetMessage": "The card stays the same, but every marked square will be cleared.",
    "confirm.newTitle": "New card?",
    "confirm.newMessage": "The current card will be replaced with a new draw.",
    "confirm.modeTitle": "Change mode?",
    "confirm.modeMessage": "Changing mode will replace the current card with a new draw.",
    "detail.department": "Department",
    "detail.country": "Country",
    "detail.region": "Region",
    "detail.rarity": "Frequency",
    "mode.mixed": "France + Europe",
    "mode.france": "France",
    "mode.countries": "Countries",
    "rarity.common": "common",
    "rarity.medium": "medium",
    "rarity.rare": "rare"
  }
};

export function t(locale: Locale, key: TranslationKey): string {
  return messages[locale][key];
}

export function modeLabel(locale: Locale, mode: GameMode): string {
  return t(locale, `mode.${mode}`);
}

export function plateKindLabel(locale: Locale, item: PlateItem): string {
  if (item.kind === "FR_DEPT") {
    return t(locale, "detail.department");
  }

  return t(locale, "detail.country");
}

export function formatWinMessage(locale: Locale, lines: WinningLine[]): string {
  const label = lines.length > 1 ? t(locale, "win.multiple") : t(locale, "win.single");
  return `${label} (${lines.length})`;
}
