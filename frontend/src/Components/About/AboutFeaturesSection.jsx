import { features } from "../../Data/aboutHeroFeatures";

export default function AboutFeaturesSection() {
  return (
    <div className="mt-14 sm:mt-16 md:mt-18 lg:mt-20 xl:mt-24 w-full max-w-7xl mx-auto">
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="relative inline-block text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px] xl:text-[48px] font-bold tracking-tight bg-[linear-gradient(110deg,#ffffff_8%,#dbeafe_18%,#93c5fd_28%,#c4b5fd_42%,#f0abfc_56%,#ffffff_68%,#c4b5fd_80%,#ffffff_92%)] bg-[length:220%_100%] bg-clip-text text-transparent animate-[shineGlass_12s_ease-in-out_infinite]">
          Why Disha Study Center ?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 lg:gap-8 xl:gap-10">
        {features.map((f, index) => (
          <div
            key={f.id}
            className={`${index === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
          >
            <div className="w-full h-[190px] sm:h-[210px] md:h-[240px] lg:h-[210px] xl:h-[230px] overflow-hidden rounded-[1.7rem]">
              <img
                src={f.image}
                alt={f.label}
                className="w-full h-full object-cover object-center rounded-[1.7rem] animate-[serviceFloatZoom_8s_ease-in-out_infinite]"
              />
            </div>

            <div className="pt-5 sm:pt-6 text-center">
              <h3 className="text-white text-[15px] sm:text-[16px] md:text-[17px] font-semibold tracking-[0.02em]">
                {f.label}
              </h3>

              <p className="text-white/60 text-[12px] sm:text-[13px] md:text-[14px] mt-3 leading-[1.75] max-w-[300px] md:max-w-[340px] lg:max-w-[250px] mx-auto text-center text-wrap">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}