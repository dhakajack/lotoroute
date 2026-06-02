import type { DifficultyLevel, GameMode, Locale, PlateItem, WinningLine } from "./types";

type TranslationKey =
  | "actions.close"
  | "actions.cancel"
  | "actions.confirm"
  | "actions.newCard"
  | "actions.resetMarks"
  | "actions.options"
  | "actions.details"
  | "actions.seed"
  | "actions.mode"
  | "actions.difficulty"
  | "actions.location"
  | "actions.manual"
  | "actions.gps"
  | "actions.useGps"
  | "actions.language"
  | "actions.haptics"
  | "setup.locationPlaceholder"
  | "setup.locationNoMatch"
  | "setup.gpsUnavailable"
  | "win.single"
  | "win.multiple"
  | "confirm.resetTitle"
  | "confirm.resetMessage"
  | "confirm.newTitle"
  | "confirm.newMessage"
  | "confirm.modeTitle"
  | "confirm.modeMessage"
  | "confirm.setupTitle"
  | "confirm.setupMessage"
  | "detail.department"
  | "detail.country"
  | "detail.region"
  | "detail.chefLieu"
  | "detail.capital"
  | "detail.population"
  | "detail.empty"
  | "learning.empty"
  | "mode.mixed"
  | "mode.france"
  | "mode.countries"
  | "difficulty.cakewalk"
  | "difficulty.easy"
  | "difficulty.average"
  | "difficulty.challenging"
  | "difficulty.insane";

const messages: Record<Locale, Record<TranslationKey, string>> = {
  fr: {
    "actions.close": "Fermer",
    "actions.cancel": "Annuler",
    "actions.confirm": "Confirmer",
    "actions.newCard": "Nouvelle carte",
    "actions.resetMarks": "Effacer les marques",
    "actions.options": "Options",
    "actions.details": "Détails",
    "actions.seed": "Graine",
    "actions.mode": "Mode",
    "actions.difficulty": "Difficulté",
    "actions.location": "Position",
    "actions.manual": "Manuel",
    "actions.gps": "GPS",
    "actions.useGps": "Utiliser le GPS",
    "actions.language": "Langue",
    "actions.haptics": "Vibrations",
    "setup.locationPlaceholder": "Code département ou pays",
    "setup.locationNoMatch": "Aucun code valide",
    "setup.gpsUnavailable": "GPS indisponible",
    "win.single": "Ligne complète",
    "win.multiple": "Lignes complètes",
    "confirm.resetTitle": "Effacer les marques ?",
    "confirm.resetMessage": "La carte reste la même, mais toutes les cases cochées seront effacées.",
    "confirm.newTitle": "Nouvelle carte ?",
    "confirm.newMessage": "La carte actuelle sera remplacée par un nouveau tirage.",
    "confirm.modeTitle": "Changer de mode ?",
    "confirm.modeMessage": "Changer de mode remplacera la carte actuelle par un nouveau tirage.",
    "confirm.setupTitle": "Changer la configuration ?",
    "confirm.setupMessage": "Ce changement remplacera la carte actuelle par un nouveau tirage.",
    "detail.department": "Département",
    "detail.country": "Pays",
    "detail.region": "Région",
    "detail.chefLieu": "Chef-lieu",
    "detail.capital": "Capitale",
    "detail.population": "Population",
    "detail.empty": "Appui long pour afficher les détails",
    "learning.empty": "Touchez une plaque",
    "mode.mixed": "France + Europe",
    "mode.france": "France",
    "mode.countries": "Pays",
    "difficulty.cakewalk": "Balade",
    "difficulty.easy": "Facile",
    "difficulty.average": "Normal",
    "difficulty.challenging": "Corsé",
    "difficulty.insane": "Dément"
  },
  en: {
    "actions.close": "Close",
    "actions.cancel": "Cancel",
    "actions.confirm": "Confirm",
    "actions.newCard": "New card",
    "actions.resetMarks": "Clear marks",
    "actions.options": "Options",
    "actions.details": "Details",
    "actions.seed": "Seed",
    "actions.mode": "Mode",
    "actions.difficulty": "Difficulty",
    "actions.location": "Location",
    "actions.manual": "Manual",
    "actions.gps": "GPS",
    "actions.useGps": "Use GPS",
    "actions.language": "Language",
    "actions.haptics": "Vibration",
    "setup.locationPlaceholder": "Department or country code",
    "setup.locationNoMatch": "No valid code yet",
    "setup.gpsUnavailable": "GPS unavailable",
    "win.single": "Complete line",
    "win.multiple": "Complete lines",
    "confirm.resetTitle": "Clear marks?",
    "confirm.resetMessage": "The card stays the same, but every marked square will be cleared.",
    "confirm.newTitle": "New card?",
    "confirm.newMessage": "The current card will be replaced with a new draw.",
    "confirm.modeTitle": "Change mode?",
    "confirm.modeMessage": "Changing mode will replace the current card with a new draw.",
    "confirm.setupTitle": "Change setup?",
    "confirm.setupMessage": "This change will replace the current card with a new draw.",
    "detail.department": "Department",
    "detail.country": "Country",
    "detail.region": "Region",
    "detail.chefLieu": "Chef-lieu",
    "detail.capital": "Capital",
    "detail.population": "Population",
    "detail.empty": "Long press a square for details",
    "learning.empty": "Tap a plate",
    "mode.mixed": "France + Europe",
    "mode.france": "France",
    "mode.countries": "Countries",
    "difficulty.cakewalk": "Cake walk",
    "difficulty.easy": "Easy",
    "difficulty.average": "Average",
    "difficulty.challenging": "Challenging",
    "difficulty.insane": "Insane"
  }
};

export function t(locale: Locale, key: TranslationKey): string {
  return messages[locale][key];
}

export function modeLabel(locale: Locale, mode: GameMode): string {
  return t(locale, `mode.${mode}`);
}

export function difficultyLabel(locale: Locale, difficulty: DifficultyLevel): string {
  return t(locale, `difficulty.${difficulty}`);
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
