type InfoToastProps = {
  message: string | null;
};

export default function InfoToast({ message }: InfoToastProps) {
  return (
    <div className={`toast${message ? " is-visible" : ""}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
