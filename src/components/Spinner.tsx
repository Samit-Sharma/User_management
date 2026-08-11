export default function Spinner({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="spinner" />
      <span>{text}</span>
    </div>
  );
}