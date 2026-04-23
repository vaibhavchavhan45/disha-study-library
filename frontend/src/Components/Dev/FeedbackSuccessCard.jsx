import "../../Animations/FeedbackSuccessAnimation.css"
import PremiumButton from "../Buttons/PremiumButton/PremiumButton";

export default function FeedbackSuccessCard({ thankYouRef, onReset }) {
  return (
    <div
      ref={thankYouRef}
      className="relative z-10 flex flex-col items-center text-center py-6 sm:py-8 md:py-10 lg:py-7 px-2"
    >
      {/* Animated check circles */}
      <div
        style={{
          position: "relative",
          width: "100px",
          height: "100px",
          marginBottom: "28px",
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid rgba(52, 211, 153, 0.15)",
            animation: "pulseRingOuter 1.8s ease-in-out infinite",
          }}
        />

        {/* Middle ring */}
        <div
          style={{
            position: "absolute",
            inset: "12px",
            borderRadius: "50%",
            border: "1px solid rgba(52, 211, 153, 0.3)",
            animation: "pulseRingMiddle 1.8s ease-in-out infinite",
          }}
        />

        {/* Inner circle with checkmark */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            borderRadius: "50%",
            background: "rgba(52, 211, 153, 0.12)",
            border: "1.5px solid rgba(52, 211, 153, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#34d399"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2 mb-8 sm:mb-10 md:mb-12 lg:mb-8">
        <h3
          className="text-base sm:text-lg md:text-xl font-semibold tracking-tight px-2 leading-snug"
          style={{ color: "white" }}
        >
          Thank you for submitting feedback
        </h3>
        <p className="text-white/60 text-xs sm:text-sm px-2 leading-relaxed max-w-xs">
          Your response has been recorded successfully.
        </p>
      </div>

      {/* Reset button */}
      <PremiumButton onClick={onReset} minWidth="230px">
          Submit another response
      </PremiumButton>
    </div>
  );
}