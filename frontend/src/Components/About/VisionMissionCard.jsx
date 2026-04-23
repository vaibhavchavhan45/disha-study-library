export default function VisionMissionCard({
    label,
    title,
    description1,
    description2,
    gradientLine,
    glowColor,
    titleGradient,
    textShadow,
    reverse = false,
    align = "left",
}) {
    return (
        <div className="mx-auto max-w-5xl">
            <div
                className={`grid grid-cols-1 ${
                    reverse
                        ? "lg:grid-cols-[1.1fr_0.9fr]"
                        : "lg:grid-cols-[0.9fr_1.1fr]"
                } gap-10 md:gap-12 lg:gap-16 items-start`}
            >
                {/* Title Side */}
                <div
                    className={`${
                        reverse ? "order-1 lg:order-2 text-right" : ""
                    }`}
                >
                    <div
                        className={`mb-5 flex items-center gap-3 ${
                            align === "right" ? "justify-end" : ""
                        }`}
                    >
                        <span
                            className={`h-px w-10 bg-gradient-to-r ${gradientLine}`}
                        />
                        <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.30em] uppercase text-white/38">
                            {label}
                        </p>
                    </div>

                    <h3
                        className="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[46px] font-semibold tracking-[-0.04em] leading-[1.08]"
                        style={{
                            background: titleGradient,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow: textShadow,
                        }}
                    >
                        {title}
                    </h3>
                </div>

                {/* Content Side */}
                <div
                    className={`relative ${
                        reverse ? "order-2 lg:order-1" : ""
                    }`}
                >
                    <div
                        className={`pointer-events-none absolute -top-8 ${
                            align === "right" ? "right-0" : "left-0"
                        } h-32 w-32 rounded-full ${glowColor} blur-[90px]`}
                    />

                    <div className="relative">
                        <p className="text-[15px] sm:text-[16px] md:text-[17px] leading-[2] text-white/72 text-justify">
                            {description1}
                        </p>

                        <p className="mt-5 hidden sm:block text-[15px] sm:text-[16px] md:text-[17px] leading-[2] text-white/72 text-justify">
                            {description2}
                        </p>

                        {/* mobile single para */}
                        <p className="mt-5 block sm:hidden text-[15px] leading-[2] text-white/72 text-justify">
                            {description2}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}