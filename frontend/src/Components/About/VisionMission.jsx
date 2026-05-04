import dishaBg from "../../assets/library/disha.webp";

import VisionMissionHeader from "./VisionMissionHeader";
import VisionMissionCard from "./VisionMissionCard";

export default function VisionMissionSection() {
    return (
        <section className="relative w-full overflow-hidden pt-8 pb-14 sm:pt-10 sm:pb-16 md:pt-12 md:pb-20 lg:pt-14 lg:pb-24">
            {/* Background image */}
<div
className="absolute inset-0 bg-no-repeat bg-cover bg-[center_100%] sm:bg-[center_95%] md:bg-center"    style={{
        backgroundImage: `url(${dishaBg})`,
    }}
/>

{/* Mobile / Small device overlays */}
<div className="absolute inset-0 md:hidden">
    <div
        className="absolute inset-0"
        style={{
            backgroundImage: `
                linear-gradient(180deg, rgba(6,8,18,0.64) 0%, rgba(6,8,18,0.78) 36%, rgba(6,8,18,0.90) 72%, rgba(6,8,18,0.97) 100%),
                linear-gradient(90deg, rgba(6,8,18,0.84) 0%, rgba(6,8,18,0.36) 48%, rgba(6,8,18,0.74) 100%)
            `,
        }}
    />
</div>

{/* md and above overlays (same as before) */}
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

            {/* Ambient glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[130px]" />
                <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-cyan-400/10 blur-[120px]" />
                <div className="absolute right-0 top-1/3 h-[280px] w-[280px] rounded-full bg-fuchsia-500/10 blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10">
                <VisionMissionHeader />

                {/* Vision */}
                <VisionMissionCard
                    label="Vision"
                    title={
                        <>
                            A Space Where
                            <br />
                            Students Can
                            <br />
                            Truly Focus
                        </>
                    }
                    description1="The vision of Disha Study Center is to create a calm, disciplined, and deeply motivating environment where students can study with complete focus and consistency. It is built around the belief that when the right atmosphere is created, students naturally become more committed, productive, and confident in their preparation."
                    description2="More than just a study space, it is meant to become a place where clarity grows, distractions reduce, and every student feels encouraged to give their best every single day."
                    gradientLine="from-cyan-400/70 to-transparent"
                    glowColor="bg-cyan-400/10"
                    titleGradient="linear-gradient(90deg, #FFFFFF 0%, #E6EDFF 45%, #C9D8FF 100%)"
                    textShadow="0 1px 16px rgba(120,160,255,0.08)"
                    reverse={false}
                    align="left"
                />

                {/* divider */}
                <div className="mx-auto my-14 sm:my-16 md:my-20 max-w-5xl">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                {/* Mission */}
                <VisionMissionCard
                    label="Mission"
                    title={
                        <>
                            Discipline,
                            <br />
                            Consistency,
                            <br />
                            and Real Progress
                        </>
                    }
                    description1="The mission is to provide students with a serious, distraction-free, and thoughtfully managed study environment where daily effort becomes easier to sustain. Every element of the space is designed to help learners remain consistent, stay motivated, and continue moving forward with purpose."
                    description2="Through discipline, structure, and a strong academic atmosphere, the goal is to help students transform regular study into meaningful long-term growth and achievement."
                    gradientLine="from-fuchsia-400/70 to-transparent"
                    glowColor="bg-fuchsia-500/10"
                    titleGradient="linear-gradient(90deg, #FFFFFF 0%, #F2E8FF 45%, #E2CCFF 100%)"
                    textShadow="0 1px 16px rgba(180,130,255,0.08)"
                    reverse={true}
                    align="right"
                />
            </div>
        </section>
    );
}