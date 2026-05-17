const motivationalLines = [
  "Every great achiever was once a student who refused to give up. Keep going.",
  "The seat you sit on today is building the life you'll live tomorrow.",
  "One day, all these late night studying and every efforts will turn into something you’ll be proud of.",
  "The next result will surely be in your favour. Have smile on face and keep doing your thing.",
  "Your future self will THANK YOU for not quitting in challenging times",
];

export default function VerdictSuccessCard({ thankYouRef, firstName, specialMessage }) {
  const displayMessage = specialMessage || motivationalLines[Math.floor(Math.random() * motivationalLines.length)];

  return (
    <div
      ref={thankYouRef}
      style={{
        marginTop: "40px",
        padding: "clamp(20px, 5vw, 32px) clamp(16px, 4vw, 28px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Verdict received tag */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
        <div style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7c3aed, #ec4899)",
          boxShadow: "0 0 10px rgba(124,58,237,0.6)",
          flexShrink: 0,
        }} />
        <p style={{
          fontSize: "9px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)",
          fontWeight: "600",
          margin: 0,
        }}>
          Viewer Response Received.
        </p>
      </div>

      {/* Thank you */}
      <h3 style={{
        fontSize: "clamp(17px, 5vw, 22px)",
        fontWeight: "300",
        color: "#fff",
        margin: "0 0 6px 18px",
        letterSpacing: "0.02em",
      }}>
        Thank you,{" "}
        <span style={{
          fontWeight: "600",
          background: "linear-gradient(90deg, #a78bfa, #f472b6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          {firstName}.
        </span>
      </h3>

      <p style={{
        fontSize: "13px",
        color: "rgba(255,255,255,0.2)",
        margin: "0 0 0 18px",
        lineHeight: "1.7",
        letterSpacing: "0.01em",
      }}>
        Received and appreciated. Thank you for your time.
      </p>

      {/* Message box */}
      <div style={{
        marginTop: "28px",
        padding: "clamp(16px, 4vw, 24px)",
        background: "rgba(124,58,237,0.05)",
        borderRadius: "12px",
        border: "1px solid rgba(124,58,237,0.12)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)",
        }} />

        <p style={{
          fontSize: "9px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(167,139,250,0.5)",
          fontWeight: "600",
          margin: "0 0 14px",
        }}>
          A message for you
        </p>

        <p style={{
          fontSize: "14px",
          color: "rgba(255,255,255,0.75)",
          lineHeight: "1.85",
          margin: "0 0 20px",
          fontWeight: "300",
          letterSpacing: "0.02em",
        }}>
          {displayMessage}
        </p>

        <p style={{
          fontSize: "10px",
          color: "rgba(239,68,68,0.4)",
          letterSpacing: "0.08em",
          margin: 0,
        }}>
          ⚠ This is a system generated message with the help of built-in method Math.random().
        </p>
      </div>
    </div>
  );
}