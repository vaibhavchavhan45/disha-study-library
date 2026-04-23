export default function SectionTitle({ title1, title2, subtitle1, subtitle2 }) {
  return (
    <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-12 xl:mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-black leading-tight mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-6 text-center lg:text-left">
        <span className="text-white">{title1}</span><br />
        <span
          className="whitespace-nowrap"
          style={{
            background: "linear-gradient(90deg, #67e8f9, #818cf8, #be185d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.05em",
            fontFamily: "'DM Serif Display', serif",
            fontSize: "1.2em"
          }}
        >
          {title2}
        </span>
      </h2>

      <p className="text-white/70 text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg leading-relaxed mb-8 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-24 font-semibold text-center lg:text-left">
        <span className="block whitespace-nowrap">{subtitle1}</span>
        <span className="block whitespace-nowrap">{subtitle2}</span>
      </p>
    </div>
  );
}