import { gearUrl, titlePlateUrl } from "../assets";
import { t } from "../i18n";
import type { Locale } from "../types";

type TitlePlateProps = {
  locale: Locale;
  menuOpen: boolean;
  onOptionsClick: () => void;
};

export default function TitlePlate({ locale, menuOpen, onOptionsClick }: TitlePlateProps) {
  return (
    <header className="title-plate">
      <img className="title-plate-image" src={titlePlateUrl} alt="Lotoroute" />
      <button
        className="title-gear-button"
        type="button"
        aria-label={t(locale, "actions.options")}
        aria-expanded={menuOpen}
        onClick={onOptionsClick}
      >
        <img src={gearUrl} alt="" aria-hidden="true" />
      </button>
    </header>
  );
}
