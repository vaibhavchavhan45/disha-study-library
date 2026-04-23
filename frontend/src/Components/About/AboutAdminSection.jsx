import lib from "../../assets/library/lib.png";

import SectionTitle from "../SectionTitle";
import ShineText from "../Element/ShineText/ShineText";

import AdminCardsSection from "./AdminCardsSection";
import AdminContactSection from "./AdminContactSection";

export default function AboutAdminSection() {
    return (
        <section className="relative w-full overflow-hidden py-10 sm:py-12 md:py-14 lg:py-16">
            {/* Background library image */}
            <div
                className="
                    absolute inset-0
                    bg-no-repeat
                    bg-top
                    bg-cover
                    sm:bg-top
                    md:bg-center
                "
                style={{
                    backgroundImage: `url(${lib})`,
                }}
            />

            {/* Mobile / Small device overlays */}
            <div className="absolute inset-0 md:hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(180deg, rgba(6,8,18,0.62) 0%, rgba(6,8,18,0.76) 36%, rgba(6,8,18,0.89) 72%, rgba(6,8,18,0.96) 100%),
                            linear-gradient(90deg, rgba(6,8,18,0.82) 0%, rgba(6,8,18,0.34) 48%, rgba(6,8,18,0.72) 100%)
                        `,
                    }}
                />
            </div>

            {/* md and above overlays (same look as your current one) */}
            <div className="absolute inset-0 hidden md:block">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(180deg, rgba(6,8,18,0.42) 0%, rgba(6,8,18,0.58) 28%, rgba(6,8,18,0.76) 60%, rgba(6,8,18,0.90) 100%),
                            linear-gradient(90deg, rgba(6,8,18,0.74) 0%, rgba(6,8,18,0.42) 42%, rgba(6,8,18,0.68) 100%)
                        `,
                    }}
                />
            </div>

            {/* Soft ambient glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-10 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[90px] sm:top-10 sm:h-[300px] sm:w-[300px] sm:blur-[100px] md:top-8 md:h-[420px] md:w-[420px] md:blur-[130px]" />
                <div className="absolute bottom-0 right-0 h-[180px] w-[180px] rounded-full bg-cyan-400/10 blur-[80px] sm:h-[240px] sm:w-[240px] sm:blur-[95px] md:h-[320px] md:w-[320px] md:blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10">
                {/* ── TOP LABEL ── */}
                <div className="flex justify-center">
                    <div className="mb-4 flex items-center justify-center gap-3 sm:mb-5 sm:gap-4 md:mb-6">
                        <span className="h-px w-10 bg-gradient-to-r from-transparent to-white/25 sm:w-14 md:w-16" />
                        <ShineText className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.26em] text-white/45 sm:text-xs sm:tracking-[0.28em] md:text-sm">
                            About the Admins
                        </ShineText>
                        <span className="h-px w-10 bg-gradient-to-l from-transparent to-white/25 sm:w-14 md:w-16" />
                    </div>
                </div>

                {/* ── TITLE / SUBTITLE ── */}
                <div className="mb-10 text-center sm:mb-12 md:mb-14 lg:mb-16">
                    <SectionTitle
                        title1="Leadership Behind"
                        title2="Disha Study Center"
                        subtitle1="Driven by discipline, clarity, and a commitment to growth which supports focused learning."
                        subtitle2="A calm, motivating environment where consistency and ambition come together."
                    />
                </div>

                {/* ── ADMINS SHOWCASE ── */}
                <AdminCardsSection />

                {/* ── PRESENCE & CONTACT ── */}
                <AdminContactSection />
            </div>
        </section>
    );
}