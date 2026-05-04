import { sections } from "../../Data/aboutProjectData";
import NeonText from "../Element/NeonText/NeonText";
import SectionDivider from "../Element/SectionDivider/SectionDivider";
import { sectionGradients } from "../../Styles/AboutProjectStyle";


export default function AboutProject() {
  return (
    <section className="relative w-full mt-10 md:mt-12 lg:mt-14 overflow-hidden">
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-12 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-400/12 blur-3xl" />
        <div className="absolute top-28 right-[-4rem] h-72 w-72 rounded-full bg-indigo-500/12 blur-3xl" />
        <div className="absolute bottom-[-2rem] left-[-3rem] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(8,15,35,0.22),transparent)]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-5">
        {/* Heading */}
        <div className="mb-7 md:mb-8 lg:mb-10 flex items-center justify-center">
          <div className="flex items-end justify-center gap-3 md:gap-4">
            <span className="text-[1.55rem] md:text-[1.9rem] lg:text-[2.2rem] font-semibold text-white/90 tracking-[0.015em] leading-none pb-[2px]">
              About
            </span>

            <NeonText className="bg-transparent! shadow-none! text-[2rem] md:text-[2.55rem] lg:text-[3rem] tracking-[0.06em] md:tracking-[0.08em] leading-none">
              Project
          </NeonText>
          </div>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-5 md:gap-6">
          {sections.map((s, i) => (
            <div
              key={i}
              className={`group relative isolate overflow-hidden rounded-[28px] px-5 py-5 md:px-7 md:py-6 ${sectionGradients[i % sectionGradients.length]}`}
            >
              {/* Soft ambient glow */}
              <div className="pointer-events-none absolute -right-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-cyan-400/3 blur-3xl" />

              <div className="relative flex flex-col md:flex-row items-start gap-4 md:gap-6">
                {/* Keyword */}
                <div className="flex-shrink-0 md:w-44 w-full">
                  <span
                    className="text-lg md:text-[1.35rem] font-semibold tracking-[0.02em]"
                    style={{
                      background:
                        "linear-gradient(90deg, #67e8f9 0%, #a5b4fc 52%, #d946ef 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.keyword}
                  </span>
                </div>

                {/* Divider */}
                <div className="hidden md:flex self-stretch items-center justify-center">
                  <div className="relative h-full w-[1px] bg-white/8">
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-cyan-300/60 via-indigo-400/20 to-transparent blur-[0.4px]" />
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full border border-cyan-300/20 bg-cyan-300/12 shadow-[0_0_18px_rgba(103,232,249,0.35)]" />
                  </div>
                </div>

                {/* Text */}
                <p className="flex-1 text-white/85 text-[0.95rem] md:text-[1rem] leading-[1.95] md:leading-[2] text-justify font-normal tracking-[0.01em]" >
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HR */}
      <SectionDivider className="mt-15 sm:mt-15 md:mt-20 lg:mt-25" />
    </section>
  );
}