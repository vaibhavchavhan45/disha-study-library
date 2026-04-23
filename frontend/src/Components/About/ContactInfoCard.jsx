import SectionMiniHeader from "./SectionMiniHeader";

export default function ContactInfoCard({
    label,
    title,
    children,
    wrapperClassName = "",
    titleTracking = "tracking-[-0.025em]",
}) {
    return (
        <div className={`flex flex-col items-center text-center ${wrapperClassName}`}>
            <SectionMiniHeader label={label} />

            <h4
                className={`mt-4 text-[20px] sm:text-[21px] font-semibold ${titleTracking} leading-snug`}
                style={{
                    background:
                        "linear-gradient(90deg, #F5F7FF 0%, #DCE6FF 45%, #B8CCFF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 1px 12px rgba(120,160,255,0.08)",
                }}
            >
                {title}
            </h4>

            {children}
        </div>
    );
}