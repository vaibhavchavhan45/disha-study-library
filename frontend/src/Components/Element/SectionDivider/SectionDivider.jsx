import "../../../Animations/hr.css"


export default function SectionDivider({ className = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
    >
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div
        className="absolute h-px w-1/4 bg-gradient-to-r from-transparent via-violet-400/30 to-transparent"
        style={{ animation: "shimmer 5s ease-in-out infinite" }}
      />
    </div>
  );
}