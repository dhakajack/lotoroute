import { getPlateName } from "../data/plates";
import { t } from "../i18n";
import type { Locale, PlateItem } from "../types";

type LearningMessageProps = {
  item: PlateItem | null;
  locale: Locale;
};

export default function LearningMessage({ item, locale }: LearningMessageProps) {
  return (
    <section className={`learning-message${item ? " has-item" : ""}`} aria-live="polite">
      {item ? (
        <>
          <strong className="learning-code">{item.code}</strong>
          <span className="learning-name">{getPlateName(item, locale)}</span>
        </>
      ) : (
        <span>{t(locale, "learning.empty")}</span>
      )}
    </section>
  );
}
