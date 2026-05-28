import { X } from "lucide-react";
import { getPlateName } from "../data/plates";
import { plateKindLabel, t } from "../i18n";
import type { Locale, PlateItem } from "../types";

type DetailPanelProps = {
  item: PlateItem;
  locale: Locale;
  onClose: () => void;
};

export default function DetailPanel({ item, locale, onClose }: DetailPanelProps) {
  return (
    <aside className="detail-panel" aria-label={t(locale, "actions.details")}>
      <div>
        <span className="detail-code">{item.code}</span>
        <h2>{getPlateName(item, locale)}</h2>
      </div>
      <dl>
        <div>
          <dt>{plateKindLabel(locale, item)}</dt>
          <dd>{item.kind === "FR_DEPT" ? item.code : getPlateName(item, locale)}</dd>
        </div>
        {item.region ? (
          <div>
            <dt>{t(locale, "detail.region")}</dt>
            <dd>{item.region}</dd>
          </div>
        ) : null}
        {item.rarity ? (
          <div>
            <dt>{t(locale, "detail.rarity")}</dt>
            <dd>{t(locale, `rarity.${item.rarity}`)}</dd>
          </div>
        ) : null}
      </dl>
      <button className="icon-button" type="button" aria-label={t(locale, "actions.close")} onClick={onClose}>
        <X aria-hidden="true" />
      </button>
    </aside>
  );
}
