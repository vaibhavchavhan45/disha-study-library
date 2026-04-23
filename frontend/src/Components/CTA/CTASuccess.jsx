import "../../Animations/ctaSuccess.css"


export default function CTASuccess() {
  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      {/* Circles with bigger tick */}
      <div style={{ position: "relative", width: "100px", height: "100px" }}>
        {/* Outer ring */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "1px solid rgba(52, 211, 153, 0.15)",
          animation: "pingOnce 0.8s ease-out forwards",
        }} />
        {/* Middle ring */}
        <div style={{
          position: "absolute",
          inset: "12px",
          borderRadius: "50%",
          border: "1px solid rgba(52, 211, 153, 0.3)",
        }} />
        {/* Inner circle */}
        <div style={{
          position: "absolute",
          inset: "24px",
          borderRadius: "50%",
          background: "rgba(52, 211, 153, 0.12)",
          border: "1.5px solid rgba(52, 211, 153, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold" style={{ color: "#6ee7b7" }}>
          Seat Request Received!
        </h3>
        <p className="text-white/35 text-sm max-w-xs leading-relaxed">
          We will reach out to you shortly to confirm your seat at Disha Study Library.
        </p>
      </div>

      {/* Back to top btn */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mt-2 text-xs tracking-widest uppercase transition-all"
        style={{
          color: "rgba(255, 255, 255, 0.45)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
          paddingBottom: "2px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
          e.currentTarget.style.borderBottomColor = "rgba(255, 255, 255, 0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(255, 255, 255, 0.45)";
          e.currentTarget.style.borderBottomColor = "rgba(255, 255, 255, 0.15)";
        }}
      >
        ↑ Back to Top
      </button>

    </div>
  );
}