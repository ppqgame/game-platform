export function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="banner banner--error" role="alert">
      {message}
    </div>
  );
}

export function Spinner({ label }: { label?: string }) {
  return (
    <div className="spinnerRow" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <div className="spinnerLabel">{label ?? "Loading..."}</div>
    </div>
  );
}
