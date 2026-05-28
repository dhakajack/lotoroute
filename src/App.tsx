import { useEffect, useMemo, useState } from "react";
import BingoBoard from "./components/BingoBoard";
import ConfirmDialog from "./components/ConfirmDialog";
import DetailPanel from "./components/DetailPanel";
import InfoToast from "./components/InfoToast";
import OptionsMenu from "./components/OptionsMenu";
import WinBanner from "./components/WinBanner";
import { getPlateName } from "./data/plates";
import { DEFAULT_BOARD_SIZE, generateCard } from "./game/generator";
import { detectWinningLines, getWinningIndexSet } from "./game/win";
import { modeLabel, t } from "./i18n";
import { loadStoredGame, saveStoredGame } from "./storage";
import type { Card, GameMode, Locale, PlateItem } from "./types";

type ConfirmAction = "reset" | "new-card" | "mode" | null;

export default function App() {
  const [storedGame, setStoredGame] = useState(loadStoredGame);
  const [toast, setToast] = useState<string | null>(null);
  const [detailItem, setDetailItem] = useState<PlateItem | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [pendingMode, setPendingMode] = useState<GameMode | null>(null);
  const [haptics, setHaptics] = useState(true);

  const { card, locale } = storedGame;
  const winningLines = useMemo(() => detectWinningLines(card), [card]);
  const winningIndexes = useMemo(() => getWinningIndexSet(winningLines), [winningLines]);

  useEffect(() => {
    saveStoredGame(storedGame);
  }, [storedGame]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => setToast(null), 1900);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function updateCard(updater: (card: Card) => Card) {
    setStoredGame((current) => ({
      ...current,
      card: updater(current.card)
    }));
  }

  function showToastForItem(item: PlateItem, removed: boolean) {
    const suffix = removed ? t(locale, "toast.removed") : t(locale, "toast.marked");
    setToast(`${item.code} - ${getPlateName(item, locale)} ${suffix}`);
  }

  function toggleItem(item: PlateItem) {
    const currentlyMarked = Boolean(card.marked[item.code]);

    updateCard((currentCard) => ({
      ...currentCard,
      marked: {
        ...currentCard.marked,
        [item.code]: !currentlyMarked
      }
    }));

    if (haptics && "vibrate" in navigator) {
      navigator.vibrate(currentlyMarked ? 10 : 20);
    }

    showToastForItem(item, currentlyMarked);
  }

  function changeLocale(nextLocale: Locale) {
    setStoredGame((current) => ({ ...current, locale: nextLocale }));
  }

  function changeMode(nextMode: GameMode) {
    if (nextMode === card.mode) {
      return;
    }

    setPendingMode(nextMode);
    setConfirmAction("mode");
  }

  function confirmModeChange() {
    if (!pendingMode) {
      setConfirmAction(null);
      return;
    }

    setStoredGame((current) => ({
      ...current,
      card: generateCard({ size: DEFAULT_BOARD_SIZE, mode: pendingMode })
    }));
    setPendingMode(null);
    setConfirmAction(null);
    setMenuOpen(false);
    setDetailItem(null);
  }

  function resetMarks() {
    updateCard((currentCard) => ({ ...currentCard, marked: {} }));
    setConfirmAction(null);
    setPendingMode(null);
    setMenuOpen(false);
    setDetailItem(null);
  }

  function newCard() {
    setStoredGame((current) => ({
      ...current,
      card: generateCard({ size: DEFAULT_BOARD_SIZE, mode: current.card.mode })
    }));
    setConfirmAction(null);
    setPendingMode(null);
    setMenuOpen(false);
    setDetailItem(null);
  }

  const confirmCopy =
    confirmAction === "reset"
      ? {
          title: t(locale, "confirm.resetTitle"),
          message: t(locale, "confirm.resetMessage"),
          onConfirm: resetMarks
        }
      : confirmAction === "new-card"
        ? {
            title: t(locale, "confirm.newTitle"),
            message: t(locale, "confirm.newMessage"),
            onConfirm: newCard
          }
        : confirmAction === "mode"
          ? {
              title: t(locale, "confirm.modeTitle"),
              message: t(locale, "confirm.modeMessage"),
              onConfirm: confirmModeChange
            }
        : null;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p>{t(locale, "app.subtitle")}</p>
          <h1>Autoroloto</h1>
        </div>
        <OptionsMenu
          open={menuOpen}
          locale={locale}
          mode={card.mode}
          haptics={haptics}
          seed={card.seed}
          onOpenChange={setMenuOpen}
          onLocaleChange={changeLocale}
          onModeChange={changeMode}
          onHapticsChange={setHaptics}
          onResetRequest={() => setConfirmAction("reset")}
          onNewCardRequest={() => setConfirmAction("new-card")}
        />
      </header>

      <section className="game-meta" aria-label="Game details">
        <span>{modeLabel(locale, card.mode)}</span>
        <span>{card.size} x {card.size}</span>
        <span>{card.seed}</span>
      </section>

      <WinBanner locale={locale} lines={winningLines} />

      <BingoBoard
        squares={card.squares}
        marked={card.marked}
        size={card.size}
        winningIndexes={winningIndexes}
        locale={locale}
        onToggle={toggleItem}
        onLongPress={setDetailItem}
      />

      {detailItem ? <DetailPanel item={detailItem} locale={locale} onClose={() => setDetailItem(null)} /> : null}

      <InfoToast message={toast} />

      {confirmCopy ? (
        <ConfirmDialog
          locale={locale}
          title={confirmCopy.title}
          message={confirmCopy.message}
          onCancel={() => {
            setConfirmAction(null);
            setPendingMode(null);
          }}
          onConfirm={confirmCopy.onConfirm}
        />
      ) : null}
    </main>
  );
}
