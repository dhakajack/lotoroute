import { Languages, Menu, RotateCcw, Shuffle, Smartphone, X } from "lucide-react";
import type { GameMode, Locale } from "../types";
import { modeLabel, t } from "../i18n";

type OptionsMenuProps = {
  open: boolean;
  locale: Locale;
  mode: GameMode;
  haptics: boolean;
  seed: string;
  onOpenChange: (open: boolean) => void;
  onLocaleChange: (locale: Locale) => void;
  onModeChange: (mode: GameMode) => void;
  onHapticsChange: (enabled: boolean) => void;
  onResetRequest: () => void;
  onNewCardRequest: () => void;
};

const modes: GameMode[] = ["mixed", "france", "countries"];

export default function OptionsMenu({
  open,
  locale,
  mode,
  haptics,
  seed,
  onOpenChange,
  onLocaleChange,
  onModeChange,
  onHapticsChange,
  onResetRequest,
  onNewCardRequest
}: OptionsMenuProps) {
  return (
    <>
      <button
        className="icon-button"
        type="button"
        aria-label={t(locale, "actions.options")}
        aria-expanded={open}
        onClick={() => onOpenChange(true)}
      >
        <Menu aria-hidden="true" />
      </button>

      {open ? (
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
      ) : null}
    </>
  );
}
