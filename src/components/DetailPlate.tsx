import { getCountryFlagUrl, getRegionLogoUrl } from "../assets";
import { getGeoNode } from "../data/geo";
import { getPlateName } from "../data/plates";
import { t } from "../i18n";
import type { Locale, PlateItem } from "../types";

type DetailPlateProps = {
  item: PlateItem | null;
  locale: Locale;
};

export default function DetailPlate({ item, locale }: DetailPlateProps) {
  if (!item) {
    return (
      <aside className="detail-plate is-empty" aria-label={t(locale, "actions.details")}>
        <p>{t(locale, "detail.empty")}</p>
      </aside>
    );
  }

  const assetUrl =
    item.kind === "FR_DEPT"
      ? getRegionLogoUrl(item.region, item.regionAsset)
      : getCountryFlagUrl(item.code, item.assetCode);
  const label = item.kind === "FR_DEPT" ? t(locale, "detail.department") : t(locale, "detail.country");
  const primaryPlace = item.kind === "FR_DEPT" ? item.chefLieu : item.capital;
  const primaryPlaceLabel = item.kind === "FR_DEPT" ? t(locale, "detail.chefLieu") : t(locale, "detail.capital");
  const population = item.population ?? getGeoNode(item.code)?.population;

  return (
    <aside className="detail-plate" aria-label={t(locale, "actions.details")}>
      <div className="detail-copy">
        <p>
          {label}: <strong>{getPlateName(item, locale)} ({item.code})</strong>
        </p>
        {primaryPlace ? (
          <p>
            {primaryPlaceLabel}: <strong>{primaryPlace}</strong>
          </p>
        ) : null}
        {typeof population === "number" ? (
          <p>
            {t(locale, "detail.population")}: <strong>{formatPopulation(population, locale)}</strong>
          </p>
        ) : null}
      </div>
      <div className="detail-asset" aria-hidden="true">
        {assetUrl ? <img src={assetUrl} alt="" /> : <span>{item.region ? item.region.slice(0, 2).toUpperCase() : item.code}</span>}
      </div>
    </aside>
  );
}

function formatPopulation(population: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US").format(population);
}
