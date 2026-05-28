import { Trophy } from "lucide-react";
import { formatWinMessage } from "../i18n";
import type { Locale, WinningLine } from "../types";

type WinBannerProps = {
  locale: Locale;
  lines: WinningLine[];
};

export default function WinBanner({ locale, lines }: WinBannerProps) {
  if (lines.length === 0) {
    return null;
  }

  return (
    <aside className="win-banner" aria-live="polite">
      <Trophy size={22} aria-hidden="true" />
      <span>{formatWinMessage(locale, lines)}</span>
    </aside>
  );
}
