import { useEffect, useState } from "react";
import { heroSlides } from "../../Data/heroSlides";

export default function AboutHeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex justify-center w-full mt-2 sm:mt-4">
      <div className="relative w-full max-w-7xl">
        {/* Premium ambient glow */}
        <div className="absolute -inset-3 rounded-[2.3rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_35%)] blur-2xl opacity-80" />

        {/* Outer shell */}
        <div className="relative rounded-[2.15rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.025))] backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.38)] overflow-hidden p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Image Slider */}
          <div className="relative h-[280px] sm:h-[360px] md:h-[460px] lg:h-[450px] xl:h-[500px] rounded-[1.65rem] overflow-hidden border border-white/[0.08] shadow-[0_18px_60px_rgba(0,0,0,0.30)]">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeSlide === index ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
                  }`}
                style={{
                  backgroundImage: `
                    linear-gradient(180deg, rgba(5,7,16,0.10) 0%, rgba(5,7,16,0.14) 42%, rgba(5,7,16,0.50) 100%),
                    url(${slide.image})
                  `,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            ))}

            {/* subtle premium inner top shine */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

            {/* Integrated Premium Title */}
            <div className="absolute top-4 sm:top-5 md:top-6 left-4 sm:left-5 md:left-6 lg:left-8 right-4 sm:right-5 md:right-6 lg:right-8">
              <div className="inline-block max-w-[82%]">
                <div
                  className="inline-block rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2"
                  style={{
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.16)",
                  }}
                >
                  <h3
                    className="inline-block text-sm sm:text-[15px] md:text-[17px] lg:text-[20px] xl:text-[22px] font-semibold tracking-[0.01em] leading-snug bg-gradient-to-r from-white via-slate-100 to-cyan-100 bg-clip-text text-transparent"
                    style={{
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: "0 1px 18px rgba(255,255,255,0.06)",
                    }}
                  >
                    {heroSlides[activeSlide].title}
                  </h3>
                </div>
                {/* underline */}
                <div className="mt-1 h-[2px] w-full relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent rounded-full blur-[0.2px]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-300/70 to-transparent rounded-full" />
                </div>
              </div>
            </div>

            {/* Premium Bottom Glass Subtitle */}
            <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 w-[90%] sm:w-[82%] md:w-[72%] lg:w-[60%] xl:w-[54%] rounded-[1.15rem] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.13),rgba(255,255,255,0.06))] backdrop-blur-[10px] px-4 sm:px-5 md:px-6 lg:px-7 py-3 sm:py-3.5 md:py-4 shadow-[0_8px_28px_rgba(0,0,0,0.20)] text-center">
              <p className="text-white/88 text-[11px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-medium leading-relaxed">
                {heroSlides[activeSlide].subtitle}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 sm:mt-5 flex items-center justify-between px-1 sm:px-2">
            <p className="text-[10px] sm:text-[11px] md:text-xs lg:text-[13px] xl:text-[14px] tracking-[0.22em] sm:tracking-[0.28em] uppercase text-white/28">
              Study Environment
            </p>

            <div className="flex items-center gap-2">
              {heroSlides.map((slide, index) => (
                <span
                  key={slide.id}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${activeSlide === index ? "bg-white/80 scale-110" : "bg-white/18"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Outer frame ring */}
        <div className="absolute -inset-[1px] rounded-[2.15rem] border border-white/[0.04] pointer-events-none" />
      </div>
    </div>
  );
}