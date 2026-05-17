import SectionTitle from "../SectionTitle";
import ShineText from "../Element/ShineText/ShineText";

export default function VisionMissionHeader() {
    return (
        <>
            {/* TOP LABEL */}
            <div className="flex justify-center">
                <div className="mb-4 sm:mb-5 md:mb-6 flex items-center justify-center gap-3 sm:gap-4">
                    <span className="h-px w-10 sm:w-14 md:w-16 bg-gradient-to-r from-transparent to-white/25" />
                    <ShineText className="text-[11px] sm:text-xs md:text-sm tracking-[0.26em] sm:tracking-[0.28em] uppercase text-white/45 font-medium whitespace-nowrap">
                        Our Foundation
                    </ShineText>
                    <span className="h-px w-10 sm:w-14 md:w-16 bg-gradient-to-l from-transparent to-white/25" />
                </div>
            </div>

            {/* TITLE / SUBTITLE */}
            <div className="mb-14 sm:mb-16 md:mb-20 text-center">
                <SectionTitle
                    title1="Vision and Mission"
                    title2="Behind Disha"
                    subtitle1="Rooted in purpose and clarity, this vision is to create the ideal environment for serious study."
                    subtitle2="The mission is to inspire discipline, consistency, and meaningful academic progress every day."
                />
            </div>
        </>
    );
}