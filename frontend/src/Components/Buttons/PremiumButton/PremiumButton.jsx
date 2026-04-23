export default function PremiumButton({
  type = "button",
  children,
  onClick,
  disabled = false,
  submitting = false,
  minWidth = "210px",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden px-6 py-3 rounded-full text-sm font-semibold tracking-[0.14em] uppercase transition-all duration-300 active:scale-[0.985] ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}
      style={{
        minWidth,
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 38%, #1e293b 72%, #334155 100%)",
        color: "#f8fafc",
        border: "1px solid rgba(255,255,255,0.10)",
        opacity: disabled ? 0.72 : 1,
        boxShadow:
          "0 10px 30px rgba(15,23,42,0.32), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(255,255,255,0.04)",
        transform: "translateY(0)",
        backdropFilter: "blur(12px)",
        letterSpacing: "0.14em",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background =
          "linear-gradient(135deg, #111827 0%, #0f172a 35%, #1f2937 68%, #475569 100%)";
        e.currentTarget.style.boxShadow =
          "0 16px 40px rgba(15,23,42,0.42), 0 0 0 1px rgba(255,255,255,0.06) inset, inset 0 1px 0 rgba(255,255,255,0.12)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background =
          "linear-gradient(135deg, #0f172a 0%, #111827 38%, #1e293b 72%, #334155 100%)";
        e.currentTarget.style.boxShadow =
          "0 10px 30px rgba(15,23,42,0.32), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(255,255,255,0.04)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
      onMouseDown={(e) => {
        if (disabled) return;
        e.currentTarget.style.boxShadow =
          "0 6px 20px rgba(15,23,42,0.28), 0 0 24px rgba(148,163,184,0.12)";
        e.currentTarget.style.transform = "translateY(1px)";
      }}
      onMouseUp={(e) => {
        if (disabled) return;
        e.currentTarget.style.boxShadow =
          "0 16px 40px rgba(15,23,42,0.42), 0 0 0 1px rgba(255,255,255,0.06) inset, inset 0 1px 0 rgba(255,255,255,0.12)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
    >
      {/* top shine */}
      <span
        className="pointer-events-none absolute inset-x-6 top-[1px] h-[38%] rounded-full"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.22), rgba(255,255,255,0.02))",
          filter: "blur(0.2px)",
        }}
      />

      {/* gloss strip */}
      <span
        className="pointer-events-none absolute inset-y-0 -left-[35%] w-[32%] rotate-[18deg]"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)",
          transition: "all 0.6s ease",
        }}
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {submitting && (
          <span className="h-4 w-4 rounded-full border-2 border-white/25 border-t-white animate-spin"></span>
        )}
        {children}
      </span>
    </button>
  );
}