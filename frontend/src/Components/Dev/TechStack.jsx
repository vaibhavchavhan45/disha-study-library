import { FaJsSquare } from "react-icons/fa";
import NeonText from "../Element/NeonText/NeonText";
import TechStackLeft from "./TechStackLeft";
import TechStackTerminal from "./TechStackTerminal";

function TechStack() {
  return (
    <section className="relative w-full px-4 pt-10 md:pt-12 lg:pt-16 mb-16 md:mb-20 lg:mb-24 text-zinc-200 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-20 h-72 w-72 rounded-full bg-violet-500/8 blur-3xl" />
        <div className="absolute right-[10%] top-32 h-72 w-72 rounded-full bg-cyan-500/8 blur-3xl" />
        <div className="absolute left-[30%] bottom-10 h-64 w-64 rounded-full bg-emerald-400/6 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        <h2 className="mb-10 flex items-end justify-center gap-4 text-center md:gap-5">
          <span className="pb-[2px] text-[1.6rem] font-semibold leading-none tracking-[0.01em] text-white/95 md:text-[1.9rem] lg:text-[2.2rem]">
            Core
          </span>

          <NeonText className="text-[2rem] leading-none tracking-[0.06em] md:text-[2.5rem] md:tracking-[0.08em] lg:text-[3rem]">
            TechStack
          </NeonText>
        </h2>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(11,18,32,0.98),rgba(6,11,23,0.98))] shadow-[0_25px_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl">
          {/* DESKTOP HEADER */}
          <div className="hidden border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] lg:flex">
            <div className="relative flex w-[58%] items-center justify-center py-3.5">
              <div className="absolute left-5 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/90 shadow-[0_0_10px_rgba(248,113,113,0.18)]"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-300/90 shadow-[0_0_10px_rgba(253,224,71,0.18)]"></span>
                <span className="h-3 w-3 rounded-full bg-emerald-400/90 shadow-[0_0_10px_rgba(52,211,153,0.18)]"></span>
              </div>

              <div className="rounded-t-xl border border-white/8 border-b-transparent bg-white/[0.04] px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-2 font-mono text-sm text-zinc-200">
                  <FaJsSquare className="text-[15px] text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.25)]" />
                  <p className="tracking-[0.02em] text-zinc-100">techStack.js</p>
                </div>
              </div>
            </div>

            <div className="flex w-[42%] items-center justify-center border-l border-white/8 py-3.5">
              <div className="rounded-t-xl border border-white/6 border-b-transparent bg-white/[0.02] px-4 py-1.5">
                <p className="font-mono text-sm tracking-[0.03em] text-zinc-400">
                  terminal
                </p>
              </div>
            </div>
          </div>

          {/* MOBILE HEADER */}
          <div className="flex items-center justify-between border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.012))] px-4 py-3 lg:hidden">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/90"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-300/90"></span>
              <span className="h-3 w-3 rounded-full bg-emerald-400/90"></span>
            </div>

            <div className="flex items-center gap-2 font-mono text-sm text-zinc-300">
              <FaJsSquare className="text-[14px] text-yellow-300" />
              <p className="tracking-[0.02em] text-zinc-100">techStack.js</p>
            </div>

            <div className="w-[52px]" />
          </div>

          <div className="flex flex-col lg:flex-row">
            <TechStackLeft />
            <TechStackTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechStack;