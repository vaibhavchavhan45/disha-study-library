import CTAForm from "./CTAForm";
import ShineText from "../Element/ShineText/ShineText"
import "../../Animations/landingFormGlow.css"

export default function CTASection() {
  return (
    <section className="w-full pt-15 md:pt-20 px-4 md:px-6 lg:px-8"
      style={{ background: "radial-gradient(ellipse at top, #0f2d3d 0%, #09101f 40%, #060812 70%)" }}
    >

      {/* Section Label */}
      <div className="flex justify-center mb-7">
        <div className="px-5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-md">
          <ShineText>
            Get Early Access
          </ShineText>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight">
          <span className="text-white">Ready to Start</span>
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #22d3ee, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Studying?
          </span>
        </h2>
        <p className="mt-4 text-white/50 text-sm max-w-sm mx-auto leading-relaxed">
          Seats fill up fast. Reserve yours before it&apos;s too late.
        </p>
      </div>

      {/* Form Card */}
      <div
        className="relative max-w-lg mx-auto w-full rounded-[2rem] p-8 overflow-hidden"
        style={{
  background: "linear-gradient(160deg, #141416 0%, #141416 42%, #151518 58%, #17171b 78%, #1a1a1f 100%)",
  border: "1.5px solid rgba(255,255,255,0.07)",
  backdropFilter: "blur(22px)",
  animation: "glowPulse 3s ease-in-out infinite",
  boxShadow: `
    0 60px 140px rgba(0,0,0,0.82),
    0 30px 70px rgba(0,0,0,0.50),
    0 10px 35px rgba(124,58,237,0.06),
    inset 0 1px 0 rgba(255,255,255,0.05)
  `,
}}
      >
        {/* Top Gradient Strip */}
        <div className="absolute top-0 left-0 w-full h-[4px] rounded-t-[2rem] bg-[linear-gradient(90deg,#7c3aed_0%,#06b6d4_26%,#6366f1_50%,#ec4899_100%)]" />

        <CTAForm />
      </div>

      {/* HR */}
      <div className="w-full border-t border-white/10 mt-22 md:mt-24 lg:mt-30 xl:mt-30" />
    </section>
  );
}