import { useState } from "react";
import SectionTitle from "../SectionTitle";
import { faqs } from "../../Data/FAQ";

export default function LandingPageFAQ() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      style={{ background: "radial-gradient(ellipse at top, #0f2d3d 0%, #09101f 40%, #060812 70%)" }}
      className="w-full pt-12 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10">

        {/* Title */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-12 xl:mb-12">
          <SectionTitle
            title1="Frequently Asked"
            title2="Questions"
            subtitle1="Everything you need to know before joining our library,"
            subtitle2="from timings and charges to admission and study environment."
          />
        </div>

        {/* FAQ Accordion */}
        <div className="w-full">
          <div className="mx-5 sm:mx-10 md:mx-25 lg:mx-30 -mt-5">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div key={faq.id}>
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between gap-4 text-left py-5 sm:py-5 md:py-6"
                  >
                    <h3
                      className={`text-[15px] sm:text-base md:text-lg font-medium leading-relaxed transition-all duration-300 cursor-pointer ${isOpen
                          ? "text-white drop-shadow-[0_0_8px_rgba(103,232,249,0.12)]"
                          : "text-white/90"
                        }`}
                    >
                      {faq.question}
                    </h3>

                    <div
                      className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-lg sm:text-xl font-light transition-all duration-300 cursor-pointer ${isOpen
                          ? "rotate-45 text-cyan-300 bg-cyan-400/5"
                          : "rotate-0 text-white/60 bg-transparent"
                        }`}
                    >
                      +
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-in-out ${isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-5 sm:pb-5 md:pb-6">
                        <p className="max-w-4xl text-sm sm:text-[15px] md:text-base leading-7 text-white/65 text-justify">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* subtle underline */}
                  <div
                    className={`h-px w-full transition-all duration-300 ${isOpen
                        ? "bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"
                        : "bg-white/6"
                      }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* HR */}
      <div className="w-full border-t border-white/8 mt-18  md:mt-22 lg:mt-24 xl:mt-24" />
    </div>
  );
}