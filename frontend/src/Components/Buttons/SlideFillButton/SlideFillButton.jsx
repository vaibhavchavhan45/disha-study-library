import "./slideFillButton.css";

export default function SlideFillButton({
  children,
  busy = false,
  disabled = false,
}) {
  return (
    <button
      type="submit"
      disabled={disabled || busy}
      className={`slide-fill-button ${busy ? "is-busy" : ""}`}
    >
      <span className="slide-fill-button__text">{children}</span>
    </button>
  );
}