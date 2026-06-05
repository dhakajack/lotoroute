import { ChevronLeft, ExternalLink, Gauge, Info, Languages, MapPin, RotateCcw, Shuffle, Smartphone, X } from "lucide-react";
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

const sourceCodeUrl = "https://github.com/dhakajack/lotoroute";

const creditLinks = {
  font: "https://github.com/playbeing/dinish",
  fontLicense: "https://openfontlicense.org/",
  flags: "https://flagpedia.net/",
  regions:
    "https://www.interieur.gouv.fr/actualites/actualites-du-ministere/nouvelles-regions-chartes-graphiques-des-plaques-dimmatriculation-de-vehicules",
  geoApi: "https://geo.api.gouv.fr/",
  notices: `${sourceCodeUrl}/blob/main/THIRD_PARTY_NOTICES.md`
};

export default function OptionsMenu({
  open,
  locale,
  mode,
  difficulty,
  locationCode,
  haptics,
  onOpenChange,
  onLocaleChange,
  onModeChange,
  onDifficultyChange,
  onLocationChange,
  onHapticsChange,
  onResetRequest,
  onNewCardRequest
}: OptionsMenuProps) {
  const [panel, setPanel] = useState<"options" | "credits">("options");
  const [locationMode, setLocationMode] = useState<"manual" | "gps">("manual");
  const [manualLocation, setManualLocation] = useState(locationCode);
  const [gpsMessage, setGpsMessage] = useState("");
  const currentLocation = getPlateItemByCode(locationCode);
  const manualCode = normalizeLocationCode(manualLocation);
  const manualMatch = useMemo(() => getPlateItemByCode(manualCode), [manualCode]);

  useEffect(() => {
    setManualLocation(locationCode);
  }, [locationCode]);

  useEffect(() => {
    if (!open) {
      setPanel("options");
    }
  }, [open]);

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
          {panel === "credits" ? (
            <CreditsPanel locale={locale} onBack={() => setPanel("options")} onClose={() => onOpenChange(false)} />
          ) : (
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

            <div className="menu-card-actions">
              <button className="secondary-action" type="button" onClick={onResetRequest}>
                <RotateCcw size={18} aria-hidden="true" />
                {t(locale, "actions.resetMarks")}
              </button>
              <button className="primary-action" type="button" onClick={onNewCardRequest}>
                <Shuffle size={18} aria-hidden="true" />
                {t(locale, "actions.newCard")}
              </button>
            </div>
            <div className="menu-secondary-actions">
              <button className="secondary-action quiet-action" type="button" onClick={() => setPanel("credits")}>
                <Info size={18} aria-hidden="true" />
                {t(locale, "actions.credits")}
              </button>
            </div>
          </section>
          )}
        </div>
  );
}

function CreditsPanel({ locale, onBack, onClose }: { locale: Locale; onBack: () => void; onClose: () => void }) {
  const entries =
    locale === "fr"
      ? [
          {
            title: "Code source",
            text: "Le code source et la documentation du projet Lotoroute sont sous licence MIT, par Jack Welch.",
            links: [{ label: sourceCodeUrl, href: sourceCodeUrl }]
          },
          {
            title: "Police",
            text: "Les codes de la grille utilisent DINish Condensed Bold, par The DINish Project Authors, sous licence SIL Open Font License 1.1.",
            links: [
              { label: "DINish", href: creditLinks.font },
              { label: "SIL OFL 1.1", href: creditLinks.fontLicense }
            ]
          },
          {
            title: "Drapeaux",
            text: "Les images de drapeaux proviennent de Flagpedia.",
            links: [{ label: "flagpedia.net", href: creditLinks.flags }]
          },
          {
            title: "Logos régionaux",
            text: "Les logos des régions françaises sont dérivés des chartes graphiques publiées par le Ministère de l'intérieur.",
            links: [{ label: "Chartes graphiques", href: creditLinks.regions }]
          },
          {
            title: "Données géographiques",
            text: "Les coordonnées, populations et connexions sont compilées à partir de sources publiques et d'ajustements manuels documentés pour le modèle de jeu. Les départements français s'appuient notamment sur Geo API Gouv.",
            links: [
              { label: "Geo API Gouv", href: creditLinks.geoApi },
              { label: "Notices tierces", href: creditLinks.notices }
            ]
          }
        ]
      : [
          {
            title: "Source Code",
            text: "Lotoroute source code and project documentation are licensed by Jack Welch under the MIT License.",
            links: [{ label: sourceCodeUrl, href: sourceCodeUrl }]
          },
          {
            title: "Font",
            text: "Grid codes use DINish Condensed Bold, by The DINish Project Authors, under the SIL Open Font License 1.1.",
            links: [
              { label: "DINish", href: creditLinks.font },
              { label: "SIL OFL 1.1", href: creditLinks.fontLicense }
            ]
          },
          {
            title: "Flags",
            text: "Flag images come from Flagpedia.",
            links: [{ label: "flagpedia.net", href: creditLinks.flags }]
          },
          {
            title: "Regional Logos",
            text: "French regional logos are derived from the graphic charters published by the French Ministry of the Interior.",
            links: [{ label: "Graphic charters", href: creditLinks.regions }]
          },
          {
            title: "Geographic Data",
            text: "Coordinates, populations, and graph connections are compiled from public references plus manual adjustments documented for the game model. French departments use Geo API Gouv as a key reference.",
            links: [
              { label: "Geo API Gouv", href: creditLinks.geoApi },
              { label: "Third-party notices", href: creditLinks.notices }
            ]
          }
        ];

  return (
    <section className="options-menu credits-panel" aria-label={t(locale, "actions.credits")} onClick={(event) => event.stopPropagation()}>
      <header className="menu-header credits-header">
        <button className="icon-button" type="button" aria-label={t(locale, "actions.back")} onClick={onBack}>
          <ChevronLeft aria-hidden="true" />
        </button>
        <h2>{t(locale, "actions.credits")}</h2>
        <button className="icon-button" type="button" aria-label={t(locale, "actions.close")} onClick={onClose}>
          <X aria-hidden="true" />
        </button>
      </header>

      <div className="credits-content">
        {entries.map((entry) => (
          <section className="credit-entry" key={entry.title}>
            <h3>{entry.title}</h3>
            <p>{entry.text}</p>
            <div className="credit-links">
              {entry.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
