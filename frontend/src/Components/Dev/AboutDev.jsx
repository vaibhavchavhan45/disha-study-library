import { useState } from "react";
import Instagram from "../Buttons/SocialIcons/Instagram";
import Github from "../Buttons/SocialIcons/Github";
import Mail from "../Buttons/SocialIcons/Mail";
import Linkeden from "../Buttons/SocialIcons/Linkeden";
import selfPhoto from "../../assets/self/self.png";
import GlowBorderCard from "./GlowBorderCard";
import NeonText from "../Element/NeonText/NeonText";
import SectionDivider from "../Element/SectionDivider/SectionDivider";

export default function AboutDev() {
  const [imgOpen, setImgOpen] = useState(false);

  return (
    <section className="relative mt-12 w-full md:mt-14 lg:mt-16">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-[8%] top-16 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-[35%] h-72 w-72 rounded-full bg-emerald-400/6 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4">
        {/* Heading */}
        <h2 className="mb-8 flex items-end justify-center gap-3 text-center md:mb-9 md:gap-4">
          <span className="pb-[2px] text-[1.6rem] font-medium leading-none tracking-[0.01em] text-white/95 md:text-[1.9rem] lg:text-[2.2rem]">
            Developer
          </span>

          <NeonText className="text-[2rem] leading-none tracking-[0.06em] md:text-[2.5rem] md:tracking-[0.08em] lg:text-[3rem]">
            Profile
          </NeonText>
        </h2>

        {/* 3D rendered shell */}
        <div className="relative [perspective:2200px]">
          <div className="[transform:rotateX(5deg)_rotateY(-2deg)_translateZ(0)]">
            <GlowBorderCard
              className="relative w-full overflow-hidden rounded-[34px]"
              style={{
                background:
                  "radial-gradient(circle at 18% 16%, rgba(32,44,78,0.98) 0%, rgba(16,24,45,0.985) 28%, rgba(8,13,26,0.99) 58%, rgba(4,7,16,1) 100%)",
                boxShadow:
                  "0 42px 110px rgba(0,0,0,0.52), 0 16px 34px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(255,255,255,0.025), inset 0 0 90px rgba(80,120,255,0.03)",
                backdropFilter: "blur(22px)",
              }}
            >
              {/* premium internal layers */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-[1px] rounded-[33px] border border-white/[0.035]" />

                {/* top sheen */}
                <div className="absolute left-0 top-0 h-40 w-full bg-gradient-to-b from-white/[0.04] via-white/[0.015] to-transparent" />

                {/* premium glows */}
                <div className="absolute left-[12%] top-[22%] h-64 w-64 rounded-full bg-cyan-400/[0.05] blur-3xl" />
                <div className="absolute right-[10%] top-[16%] h-64 w-64 rounded-full bg-fuchsia-500/[0.045] blur-3xl" />
                <div className="absolute bottom-[8%] left-[38%] h-56 w-56 rounded-full bg-sky-400/[0.025] blur-3xl" />

                {/* glass grid */}
                <div
                  className="absolute inset-0 opacity-[0.014]"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: "30px 30px",
                  }}
                />

                {/* subtle vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.16)_100%)]" />
              </div>

              <div className="relative p-5 md:p-7 lg:p-8 xl:p-10">
                <div className="grid items-center gap-8 lg:grid-cols-[290px_1fr] lg:gap-12">
                  {/* Image block */}
                  <div className="flex justify-center lg:justify-start">
                    <div className="relative">
                      <div className="absolute inset-0 scale-110 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_65%)] blur-2xl" />

                      <div className="relative rounded-full border border-white/10 bg-white/[0.03] p-2 shadow-[0_22px_60px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md">
                        <div className="rounded-full border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04),rgba(255,255,255,0.12))] p-[4px]">
                          <img
                            src={selfPhoto}
                            alt="Vaibhav"
                            className="h-40 w-40 cursor-pointer rounded-full object-cover md:h-52 md:w-52 lg:h-64 lg:w-64"
                            style={{
                              border: "1px solid rgba(255,255,255,0.14)",
                              boxShadow:
                                "0 0 18px rgba(255,255,255,0.08), 0 0 40px rgba(255,255,255,0.04), 0 20px 40px rgba(0,0,0,0.28)",
                            }}
                            onClick={() => setImgOpen(true)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                    <div className="w-full max-w-2xl">
                      <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-white md:text-[2.4rem] lg:text-[2.85rem]">
                        Vaibhav Chavhan
                      </h1>

                      {/* role line */}
                      <div className="mt-2.5 flex justify-center lg:justify-start">
                        <div className="inline-block">
                          <p
                            className="text-sm font-medium tracking-[0.04em] md:text-[15px]"
                            style={{
                              background:
                                "linear-gradient(90deg, #9be7ff 0%, #7dd3fc 18%, #8b9dff 52%, #d2a8ff 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            SOFTWARE DEVELOPER · AI SYSTEM BUILDER
                          </p>

                          {/* HR EXACTLY under text width */}
                          <div className="relative mt-2.5 w-full">
                            {/* thin base line */}
                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                            {/* premium thin edges + bold center */}
                            <div
                              className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full"
                              style={{
                                width: "100%",
                                background:
                                  "linear-gradient(90deg, rgba(125,211,252,0.12) 0%, rgba(125,211,252,0.28) 18%, rgba(255,255,255,0.68) 50%, rgba(192,132,252,0.28) 82%, rgba(192,132,252,0.12) 100%)",
                                maskImage:
                                  "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.9) 22%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.9) 78%, rgba(0,0,0,0.45) 100%)",
                                WebkitMaskImage:
                                  "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.9) 22%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.9) 78%, rgba(0,0,0,0.45) 100%)",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* single paragraph */}
                      <p className="mt-6 text-justify text-sm leading-7 text-white/72 md:text-[15px] md:leading-7">
                        <span className="font-semibold text-white">Hi everyone, 👋</span>{" "}
                  I'm a Software developer who builds websites and real-world
                  applications, turning ideas into working products through code.
                  I specialize in simplifying complex architectures and making them
                  usable in everyday life. I enjoy building practical systems that
                  challenge me to think deeper, solve harder problems, and grow with
                  every build.
                      </p>
                    </div>

                    {/* Social section */}
                    <div className="mt-6 flex w-full items-center justify-center gap-4 lg:justify-start">
                      <div className="rounded-[18px] border border-white/8 bg-white/[0.03] p-[3px] shadow-[0_10px_28px_rgba(0,0,0,0.18)]">
                        <Mail href="https://mail.google.com/mail/?view=cm&fs=1&to=chavhanvaibhav708@gmail.com&su=Website%20%2F%20Project%20Inquiry&body=Hello%20Vaibhav%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20connect%20with%20you%20regarding%20a%20project%20or%20collaboration."/>
                      </div>

                      <div className="rounded-[18px] border border-white/8 bg-white/[0.03] p-[3px] shadow-[0_10px_28px_rgba(0,0,0,0.18)]">
                        <Instagram href="https://instagram.com/vaibhavchavhan45"/>
                      </div>

                      <div className="rounded-[18px] border border-white/8 bg-white/[0.03] p-[3px] shadow-[0_10px_28px_rgba(0,0,0,0.18)]">
                        <Github href="https://github.com/vaibhavchavhan45" />
                      </div>

                      <div className="rounded-[18px] border border-white/8 bg-white/[0.03] p-[3px] shadow-[0_10px_28px_rgba(0,0,0,0.18)]">
                        <Linkeden href="https://www.linkedin.com/in/vaibhavchavhan/"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlowBorderCard>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {imgOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          onClick={() => setImgOpen(false)}
        >
          <div className="rounded-[28px] border border-white/12 bg-white/[0.03] p-2 shadow-[0_0_70px_rgba(255,255,255,0.08)] backdrop-blur-xl">
            <img
              src={selfPhoto}
              alt="Vaibhav"
              className="max-w-xs rounded-2xl object-cover shadow-2xl md:max-w-sm"
              style={{
                border: "1.5px solid rgba(255,255,255,0.22)",
                boxShadow:
                  "0 0 18px rgba(255,255,255,0.12), 0 0 40px rgba(255,255,255,0.06)",
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <SectionDivider className="mt-18 sm:mt-18 md:mt-22 lg:mt-28" />
    </section>
  );
}