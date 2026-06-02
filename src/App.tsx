import { useEffect, useMemo, useState } from "react";
import BingoBoard from "./components/BingoBoard";
import ConfirmDialog from "./components/ConfirmDialog";
import DetailPlate from "./components/DetailPlate";
import LearningMessage from "./components/LearningMessage";
import OptionsMenu from "./components/OptionsMenu";
import TitlePlate from "./components/TitlePlate";
import { logSquareDebug } from "./debug";
import { DEFAULT_BOARD_SIZE, generateCard } from "./game/generator";
import { detectWinningLines, getWinningIndexSet } from "./game/win";
import { t } from "./i18n";
import { loadStoredGame, saveStoredGame } from "./storage";
import type { Card, DifficultyLevel, GameMode, Locale, PlateItem } from "./types";

type ConfirmAction = "reset" | "new-card" | "setup" | null;
type PendingSetup = {
  mode: GameMode;
  difficulty: DifficultyLevel;
  locationCode: string;
};

export default function App() {
  const [storedGame, setStoredGame] = useState(loadStoredGame);
  const [learningItem, setLearningItem] = useState<PlateItem | null>(null);
  const [detailItem, setDetailItem] = useState<PlateItem | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [pendingSetup, setPendingSetup] = useState<PendingSetup | null>(null);
  const [haptics, setHaptics] = useState(true);

  const { card, locale } = storedGame;
  const winningLines = useMemo(() => detectWinningLines(card), [card]);
  const winningIndexes = useMemo(() => getWinningIndexSet(winningLines), [winningLines]);

  useEffect(() => {
    saveStoredGame(storedGame);
  }, [storedGame]);

  function updateCard(updater: (card: Card) => Card) {
    setStoredGame((current) => ({
      ...current,
      card: updater(current.card)
    }));
  }

  function showToastForItem(item: PlateItem) {
    setLearningItem(item);
    setDetailItem(null);
  }

  function toggleItem(item: PlateItem) {
    const currentlyMarked = Boolean(card.marked[item.code]);
    logSquareDebug(item, card, locale);

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

    showToastForItem(item);
  }

  function changeLocale(nextLocale: Locale) {
    setStoredGame((current) => ({ ...current, locale: nextLocale }));
  }

  function changeMode(nextMode: GameMode) {
    if (nextMode === card.mode) {
      return;
    }

    stageSetupChange({ mode: nextMode });
  }

  function changeDifficulty(nextDifficulty: DifficultyLevel) {
    if (nextDifficulty === card.difficulty) {
      return;
    }

    stageSetupChange({ difficulty: nextDifficulty });
  }

  function changeLocation(nextLocationCode: string) {
    if (nextLocationCode === card.locationCode) {
      return;
    }

    stageSetupChange({ locationCode: nextLocationCode });
  }

  function stageSetupChange(change: Partial<PendingSetup>) {
    setPendingSetup({
      mode: change.mode ?? card.mode,
      difficulty: change.difficulty ?? card.difficulty,
      locationCode: change.locationCode ?? card.locationCode
    });
    setConfirmAction("setup");
  }

  function confirmSetupChange() {
    if (!pendingSetup) {
      setConfirmAction(null);
      return;
    }

    setStoredGame((current) => ({
      ...current,
      card: generateCard({
        size: DEFAULT_BOARD_SIZE,
        mode: pendingSetup.mode,
        difficulty: pendingSetup.difficulty,
        locationCode: pendingSetup.locationCode
      })
    }));
    setPendingSetup(null);
    setConfirmAction(null);
    setMenuOpen(false);
    setDetailItem(null);
  }

  function resetMarks() {
    updateCard((currentCard) => ({ ...currentCard, marked: {} }));
    setConfirmAction(null);
    setPendingSetup(null);
    setMenuOpen(false);
    setDetailItem(null);
  }

  function newCard() {
    setStoredGame((current) => ({
      ...current,
      card: generateCard({
        size: DEFAULT_BOARD_SIZE,
        mode: current.card.mode,
        difficulty: current.card.difficulty,
        locationCode: current.card.locationCode
      })
    }));
    setConfirmAction(null);
    setPendingSetup(null);
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
        : confirmAction === "setup"
          ? {
              title: t(locale, "confirm.setupTitle"),
              message: t(locale, "confirm.setupMessage"),
              onConfirm: confirmSetupChange
            }
        : null;

  return (
    <main className="app-shell">
      <TitlePlate locale={locale} menuOpen={menuOpen} onOptionsClick={() => setMenuOpen(true)} />
      <OptionsMenu
        open={menuOpen}
        locale={locale}
        mode={card.mode}
        difficulty={card.difficulty}
        locationCode={card.locationCode}
        haptics={haptics}
        seed={card.seed}
        onOpenChange={setMenuOpen}
        onLocaleChange={changeLocale}
        onModeChange={changeMode}
        onDifficultyChange={changeDifficulty}
        onLocationChange={changeLocation}
        onHapticsChange={setHaptics}
        onResetRequest={() => setConfirmAction("reset")}
        onNewCardRequest={() => setConfirmAction("new-card")}
      />

      <LearningMessage item={learningItem} locale={locale} />

      <BingoBoard
        squares={card.squares}
        marked={card.marked}
        size={card.size}
        winningIndexes={winningIndexes}
        locale={locale}
        onToggle={toggleItem}
        onLongPress={setDetailItem}
      />

      <DetailPlate item={detailItem} locale={locale} />

      {confirmCopy ? (
        <ConfirmDialog
          locale={locale}
          title={confirmCopy.title}
          message={confirmCopy.message}
          onCancel={() => {
            setConfirmAction(null);
            setPendingSetup(null);
          }}
          onConfirm={confirmCopy.onConfirm}
        />
      ) : null}
    </main>
  );
}
