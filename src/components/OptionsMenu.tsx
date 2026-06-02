import { Gauge, Languages, MapPin, RotateCcw, Shuffle, Smartphone, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { findNearestLocationCode, normalizeLocationCode } from "../data/geo";
import { getPlateItemByCode, getPlateName } from "../data/plates";
import { DIFFICULTY_LEVELS } from "../game/difficulty";
import type { DifficultyLevel, GameMode, Locale } from "../types";
import { difficultyLabel, modeLabel, t } from "../i18n";

type OptionsMenuProps = {
  open: boolean;
  locale: Locale;
  mode: GameMode;
  difficulty: DifficultyLevel;
  locationCode: string;
  haptics: boolean;
  seed: string;
  onOpenChange: (open: boolean) => void;
  onLocaleChange: (locale: Locale) => void;
  onModeChange: (mode: GameMode) => void;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
  onLocationChange: (locationCode: string) => void;
  onHapticsChange: (enabled: boolean) => void;
  onResetRequest: () => void;
  onNewCardRequest: () => void;
};

const modes: GameMode[] = ["mixed", "france", "countries"];

export default function OptionsMenu({
  open,
  locale,
  mode,
  difficulty,
  locationCode,
  haptics,
  seed,
  onOpenChange,
  onLocaleChange,
  onModeChange,
  onDifficultyChange,
  onLocationChange,
  onHapticsChange,
  onResetRequest,
  onNewCardRequest
}: OptionsMenuProps) {
  const [locationMode, setLocationMode] = useState<"manual" | "gps">("manual");
  const [manualLocation, setManualLocation] = useState(locationCode);
  const [gpsMessage, setGpsMessage] = useState("");
  const currentLocation = getPlateItemByCode(locationCode);
  const manualCode = normalizeLocationCode(manualLocation);
  const manualMatch = useMemo(() => getPlateItemByCode(manualCode), [manualCode]);

  useEffect(() => {
    setManualLocation(locationCode);
  }, [locationCode]);

  if (!open) {
    return null;
  }

  function requestGpsLocation() {
    setLocationMode("gps");
    setGpsMessage("");

    if (!("geolocation" in navigator)) {
      setGpsMessage(t(locale, "setup.gpsUnavailable"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextCode = findNearestLocationCode(position.coords.latitude, position.coords.longitude);
        setManualLocation(nextCode);
        setLocationMode("manual");
        onLocationChange(nextCode);
      },
      () => setGpsMessage(t(locale, "setup.gpsUnavailable")),
      { enableHighAccuracy: false, maximumAge: 300000, timeout: 10000 }
    );
  }

  return (
    <div className="menu-backdrop" onClick={() => onOpenChange(false)}>
          <section className="options-menu" aria-label={t(locale, "actions.options")} onClick={(event) => event.stopPropagation()}>
            <header className="menu-header">
              <h2>{t(locale, "actions.options")}</h2>
              <button className="icon-button" type="button" aria-label={t(locale, "actions.close")} onClick={() => onOpenChange(false)}>
                <X aria-hidden="true" />
              </button>
            </header>

            <div className="setting-row">
              <span className="setting-label">
                <Shuffle size={18} aria-hidden="true" />
                {t(locale, "actions.mode")}
              </span>
              <div className="segmented" role="group" aria-label={t(locale, "actions.mode")}>
                {modes.map((candidate) => (
                  <button
                    key={candidate}
                    type="button"
                    className={candidate === mode ? "is-selected" : ""}
                    onClick={() => onModeChange(candidate)}
                  >
                    {modeLabel(locale, candidate)}
                  </button>
                ))}
              </div>
            </div>

            <div className="setting-row">
              <span className="setting-label">
                <Gauge size={18} aria-hidden="true" />
                {t(locale, "actions.difficulty")}
              </span>
              <div className="segmented difficulty-grid" role="group" aria-label={t(locale, "actions.difficulty")}>
                {DIFFICULTY_LEVELS.map((candidate) => (
                  <button
                    key={candidate}
                    type="button"
                    className={candidate === difficulty ? "is-selected" : ""}
                    onClick={() => onDifficultyChange(candidate)}
                  >
                    {difficultyLabel(locale, candidate)}
                  </button>
                ))}
              </div>
            </div>

            <div className="setting-row">
              <span className="setting-label">
                <MapPin size={18} aria-hidden="true" />
                {t(locale, "actions.location")}
              </span>
              <div className="segmented compact" role="group" aria-label={t(locale, "actions.location")}>
                <button
                  type="button"
                  className={locationMode === "manual" ? "is-selected" : ""}
                  onClick={() => setLocationMode("manual")}
                >
                  {t(locale, "actions.manual")}
                </button>
                <button
                  type="button"
                  className={locationMode === "gps" ? "is-selected" : ""}
                  onClick={requestGpsLocation}
                >
                  {t(locale, "actions.gps")}
                </button>
              </div>
              <div className="location-control">
                <input
                  type="text"
                  value={manualLocation}
                  inputMode="text"
                  autoCapitalize="characters"
                  spellCheck={false}
                  placeholder={t(locale, "setup.locationPlaceholder")}
                  aria-label={t(locale, "actions.location")}
                  onChange={(event) => {
                    setLocationMode("manual");
                    setManualLocation(normalizeLocationCode(event.target.value));
                    setGpsMessage("");
                  }}
                />
                <button
                  className="secondary-action location-apply"
                  type="button"
                  disabled={!manualMatch || manualMatch.code === locationCode}
                  onClick={() => {
                    if (manualMatch) {
                      onLocationChange(manualMatch.code);
                    }
                  }}
                >
                  {t(locale, "actions.confirm")}
                </button>
              </div>
              <p className={`location-match${manualMatch ? " has-match" : ""}`}>
                {manualMatch
                  ? `${manualMatch.code} - ${getPlateName(manualMatch, locale)}`
                  : gpsMessage || t(locale, "setup.locationNoMatch")}
              </p>
              {currentLocation ? (
                <p className="location-current">
                  {t(locale, "actions.location")}: {currentLocation.code} - {getPlateName(currentLocation, locale)}
                </p>
              ) : null}
            </div>

            <div className="setting-row">
              <span className="setting-label">
                <Languages size={18} aria-hidden="true" />
                {t(locale, "actions.language")}
              </span>
              <div className="segmented compact" role="group" aria-label={t(locale, "actions.language")}>
                <button type="button" className={locale === "fr" ? "is-selected" : ""} onClick={() => onLocaleChange("fr")}>
                  FR
                </button>
                <button type="button" className={locale === "en" ? "is-selected" : ""} onClick={() => onLocaleChange("en")}>
                  EN
                </button>
              </div>
            </div>

            <label className="toggle-row">
              <span className="setting-label">
                <Smartphone size={18} aria-hidden="true" />
                {t(locale, "actions.haptics")}
              </span>
              <input
                type="checkbox"
                checked={haptics}
                onChange={(event) => onHapticsChange(event.target.checked)}
              />
            </label>

            <div className="seed-line">
              <span>{t(locale, "actions.seed")}</span>
              <strong>{seed}</strong>
            </div>

            <div className="menu-actions">
              <button className="secondary-action" type="button" onClick={onResetRequest}>
                <RotateCcw size={18} aria-hidden="true" />
                {t(locale, "actions.resetMarks")}
              </button>
              <button className="primary-action" type="button" onClick={onNewCardRequest}>
                <Shuffle size={18} aria-hidden="true" />
                {t(locale, "actions.newCard")}
              </button>
            </div>
          </section>
        </div>
  );
}
