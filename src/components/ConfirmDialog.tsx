import type { Locale } from "../types";
import { t } from "../i18n";

type ConfirmDialogProps = {
  locale: Locale;
  title: string;
  message: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  locale,
  title,
  message,
  confirmLabel,
  onCancel,
  onConfirm
}: ConfirmDialogProps) {
  return (
    <div className="dialog-backdrop" role="presentation">
      <section className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <h2 id="confirm-title">{title}</h2>
        <p>{message}</p>
        <div className="dialog-actions">
          <button className="secondary-action" type="button" onClick={onCancel}>
            {t(locale, "actions.cancel")}
          </button>
          <button className="danger-action" type="button" onClick={onConfirm}>
            {confirmLabel ?? t(locale, "actions.confirm")}
          </button>
        </div>
      </section>
    </div>
  );
}
