import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../SectionTitle";
import ShineText from "../Element/ShineText/ShineText";
import heroImg from "../../assets/library/heroImg.png";
import AboutHeroSlider from "./AboutHeroSlider";
import AboutFeaturesSection from "./AboutFeaturesSection";
import "../../Animations/aboutHeroAnimation.css";
import "../../Animations/aboutHeroServiceFloat.css";

export default function AboutHeroSection() {
  const navigate = useNavigate();

  const navItems = [
    { id: "1", label: "Home", onClick: () => navigate("/") },
    { id: "2", label: "Facilities", onClick: () => navigate("/facilities") },
    { id: "3", label: "Gallery", onClick: () => navigate("/gallery") },
    { id: "4", label: "Testimonials", onClick: () => navigate("/testimonial") },
    { id: "5", label: "Admin", onClick: () => navigate('/admin') },
    { id: "6", label: "Creator", onClick: () => navigate("/dev") },
  ];

  return (
    <section className="relative w-full overflow-hidden">
  {/* Background image */}
  <div
    className="absolute inset-0 bg-no-repeat bg-cover bg-top sm:bg-top md:bg-center"
    style={{
      backgroundImage: `url(${heroImg})`,
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
      {/* subtle premium texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_84%,transparent)]" />
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar navItems={navItems} />
      </div>

      {/* Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        <div className="min-h-[92vh] sm:min-h-[94vh] flex items-center pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-14 sm:pb-18 md:pb-20 lg:pb-24">
          <div className="w-full">
            {/* TOP CENTERED INTRO */}
            <div className="w-full flex flex-col items-center text-center mb-5 sm:mb-6 md:mb-7 lg:mb-8">
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-1">
                <span className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent to-white/25" />
                <ShineText className="text-[11px] sm:text-xs md:text-sm lg:text-[15px] tracking-[0.24em] sm:tracking-[0.28em] uppercase text-white/45 font-medium whitespace-nowrap">
                  Premium Study Environment
                </ShineText>
                <span className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent to-white/25" />
              </div>
            </div>

            {/* TITLE / SUBTITLE */}
            <div className="w-full flex flex-col items-center text-center mb-4 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7">
              <div className="w-full whitespace-nowrap">
                <SectionTitle
                  title1="The Study Hub"
                  title2="For Focus"
                  subtitle1="A quiet and disciplined environment designed for deep focus."
                  subtitle2="Where consistency meets the right atmosphere to succeed."
                />
              </div>
            </div>

            {/* HERO SLIDER */}
            <AboutHeroSlider />

            {/* FEATURES SECTION */}
            <AboutFeaturesSection />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-b from-transparent to-[#060812]" />
      <div className="relative z-10 w-full border-t border-white/[0.06]" />
    </section>
  );
}