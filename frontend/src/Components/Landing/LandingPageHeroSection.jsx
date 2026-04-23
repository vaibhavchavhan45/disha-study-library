import { useNavigate } from "react-router-dom";
import StarButton from "../Buttons/StarButton/StarButton";
import student1 from "../../assets/student1.jpg";
import student2 from "../../assets/student2.png";
import logo from "../../assets/logo.png";
import "../../Animations/logoEffectLandingPage.css";
import "../../Animations/landingAnimations.css";
import "../../Animations/floatUpLandingPage.css"


export default function LandingPageHeroSection() {
  const navigate = useNavigate();
  
  return (
    <div style={{ background: "radial-gradient(ellipse at top, #0f2d3d 0%, #09101f 40%, #060812 70%)" }} className="width-full">

      {/* Pill */}
      <div className="w-full text-center pt-20 sm:pt-20 md:pt-28 lg:pt-36 xl:pt-36">
        <div className="inline-flex items-center gap-2 bg-[#67e8f9]/10 border border-[#67e8f9]/25 text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full tracking-wide font-semibold max-w-[85%] md:max-w-none">
          <svg width="25" height="25" viewBox="0 0 24 24" className="shrink-0">
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="16">
              📖
            </text>
          </svg>
          <span style={{ background: "linear-gradient(90deg, #67e8f9, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Your peaceful study destination
          </span>
        </div>
      </div>
      {/* PILL ENDS */}

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 pt-4 sm:pt-4 md:pt-5 lg:pt-5 xl:pt-5 pb-10 sm:pb-10 md:pb-10 lg:pb-10 xl:pb-10 flex flex-col md:flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">

        {/* Left */}
        <div className="flex-1 flex flex-col items-center md:items-center lg:items-start">

          {/* Title */}
          <h1 className="mt-4 sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-[4.5rem] font-black leading-[0.95] lg:leading-tight mb-4 sm:mb-5 md:mb-6 lg:mb-6 xl:mb-7 text-center lg:text-left tracking-[-0.03em] lg:tracking-normal">
            <span className="text-white lg:drop-shadow-none drop-shadow-[0_2px_18px_rgba(255,255,255,0.06)]">
              Welcome to
            </span>
            <br />
            <span
              className="whitespace-nowrap"
              style={{
                background: "linear-gradient(90deg, #67e8f9, #818cf8, #be185d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "1.16em",
                filter: "drop-shadow(0 6px 24px rgba(129,140,248,0.14))",
              }}
            >
              Disha Study Library
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-white/72 text-sm sm:text-sm md:text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-lg mb-8 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-24 mt-3 sm:mt-2 md:mt-3 lg:mt-4 xl:mt-5 font-medium text-center lg:text-left">
            <span className="block whitespace-nowrap tracking-[0.015em] text-white/65">
              Every great journey begins at the very first page.
            </span>
            <span className="block whitespace-nowrap tracking-[0.015em] mt-1 sm:mt-1.5 text-white/85">
              Explore knowledge &amp; discover your path to success.
            </span>
          </p>

          {/* Button */}
          <div className={`flex justify-center lg:justify-start lg:ml-55 xl:-mt-7 mb-[50px] sm:mb-0 md:mb-0 lg:mb-0 xl:mb-0`}>
            <StarButton onClick={() => navigate("/", { state: { scrollTo: "join-form" } })}>Book Your Seat</StarButton>
          </div>
        </div>
        {/*LEFT END */}

        {/* Right */}
        <div className="flex-1 relative flex justify-center items-center min-h-[300px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] xl:min-h-[500px] px-4 sm:px-4 md:px-6 lg:pl-16 xl:pl-16">

          {/* Blob */}
          <div className="absolute w-44 h-44 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-64 xl:h-64 rounded-full left-1/2 sm:left-1/2 md:left-1/2 lg:left-[50%] xl:left-[70%] top-1/2 sm:top-1/2 md:top-1/2 lg:top-1/2 xl:top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              background: "conic-gradient(from 180deg, #67e8f9, #818cf8, #a855f7, #e67eaf, #38bdf8, #67e8f9)",
              opacity: 0.9,
              filter: "blur(1px)",
              animation: "blobCircular 12s ease-in-out infinite"
            }} />


          {/* Card 1 */}
          <div className="absolute -top-3 sm:top-3 md:top-6 lg:top-6 xl:top-5 -left-16 sm:-left-12 md:-left-16 lg:left-20 xl:left-[40%] -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/25 rounded-2xl p-2 sm:p-3 md:p-4 lg:p-5 xl:p-5 w-36 sm:w-36 md:w-40 lg:w-44 xl:w-44 shadow-xl z-20"
            style={{ animation: "floatUp 4s ease-in-out infinite" }}>
            <img src={student1} alt="student1"
              className="w-10 sm:w-10 md:w-10 lg:w-14 xl:w-14 h-10 sm:h-10 md:h-10 lg:h-14 xl:h-14 rounded-full object-cover mx-auto mb-2 sm:mb-2 md:mb-3 lg:mb-3 xl:mb-3 border-2 border-[#67e8f9]" />
            <p className="text-white font-semibold text-[10px] sm:text-[10px] md:text-xs lg:text-sm xl:text-sm text-center">Chetan Chavhan</p>
            <p className="text-white/60 text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs text-center mt-1">IBPS — BANKING</p>
            <div className="mt-2 sm:mt-2 md:mt-3 lg:mt-3 xl:mt-3 mx-auto w-fit bg-[#67e8f9]/10 border border-[#67e8f9]/30 text-[#67e8f9] text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs px-1 sm:px-2 md:px-3 lg:px-3 xl:px-3 py-0.5 rounded-full whitespace-nowrap">
              ⭐ Premium Member
            </div>
          </div>

          {/* Card 2 */}
          <div className="absolute -bottom-3 md:bottom-7 lg:bottom-5 xl:bottom-4 right-[-125px] md:right-[-140px] lg:right-[-10px] xl:right-[-100px] bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-2 sm:p-3 md:p-4 lg:p-5 xl:p-5 w-36 sm:w-36 md:w-40 lg:w-44 xl:w-44 shadow-xl z-30"
            style={{ animation: "floatUp 4s ease-in-out infinite 1s" }}>
            <img src={student2} alt="student2"
              className="w-10 sm:w-10 md:w-10 lg:w-14 xl:w-14 h-10 sm:h-10 md:h-10 lg:h-14 xl:h-14 rounded-full object-cover mx-auto mb-2 sm:mb-2 md:mb-3 lg:mb-3 xl:mb-3 border-2 border-[#c084fc]" />
            <p className="text-white font-semibold text-[10px] sm:text-[10px] md:text-xs lg:text-sm xl:text-sm text-center">Priya Patel</p>
            <p className="text-white/60 text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs text-center mt-1">Class 12 — Arts</p>
            <div className="mt-2 sm:mt-2 md:mt-3 lg:mt-3 xl:mt-3 mx-auto w-fit bg-[#c084fc]/10 border border-[#c084fc]/30 text-[#c084fc] text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs px-1 sm:px-2 md:px-3 lg:px-3 xl:px-3 py-0.5 rounded-full whitespace-nowrap">
              ⭐ Regular Member
            </div>
          </div>
        </div>
        {/* Right ENDS*/}

      </div>
      {/* Hero END*/}

      {/* HR */}
      {/* <div className="w-full border-t border-white/10" /> */}
      <div className="w-full border-t-[0.5px] border-white/5" />

      {/* STATS SECTION */}
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-6 xl:px-6 py-8 sm:py-12 md:py-16 lg:py-16 xl:py-16">

        {/* HEADING */}
        <div className="text-center mb-8 sm:mb-12 md:mb-12 lg:mb-12 xl:mb-12">
          <p className="text-white/20 text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs tracking-[3px] mb-2">
            TRUSTED BY STUDENTS
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-semibold text-white/90">
            Our Success Metrics
          </p>
        </div>

        {/* GRID (4 cols) */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-8">

          {/* col1 - LOGO */}
          <div className="flex justify-center items-center" style={{ perspective: "1000px" }} >
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 border-2 sm:border-2 md:border-3 lg:border-4 xl:border-4 rounded-lg sm:rounded-lg md:rounded-2xl lg:rounded-[2rem] xl:rounded-[2rem] bg-gradient-to-r from-cyan-300 via-indigo-400 to-pink-600 shadow-[0_0_15px_rgba(99,102,241,0.7)] overflow-hidden"
              style={{ animation: "logo3DEffect 10s ease-in-out infinite" }} >
              <img src={logo} alt="logo" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Col2 - 500+ */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm md:text-2xl lg:text-3xl xl:text-4xl font-black" style={{
              background: "linear-gradient(90deg, #67e8f9, #818cf8, #be185d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              500+
            </p>
            <p className="text-white/40 text-[7px] sm:text-xs md:text-xs lg:text-sm xl:text-sm mt-1 sm:mt-2 text-center">Total Students</p>
          </div>

          {/* Col3 - 1+ */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm md:text-2xl lg:text-3xl xl:text-4xl font-black" style={{
              background: "linear-gradient(90deg, #67e8f9, #818cf8, #be185d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              1+
            </p>
            <p className="text-white/40 text-[7px] sm:text-xs md:text-xs lg:text-sm xl:text-sm mt-1 sm:mt-2 text-center">Years of Trust</p>
          </div>

          {/* Col4 - 100% */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm md:text-2xl lg:text-3xl xl:text-4xl font-black" style={{
              background: "linear-gradient(90deg, #67e8f9, #818cf8, #be185d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              100%
            </p>
            <p className="text-white/40 text-[7px] sm:text-xs md:text-xs lg:text-sm xl:text-sm mt-1 sm:mt-2 text-center">Satisfied Students</p>
          </div>

        </div>

      </div>
      {/* STATS ENDS */}

      { /* HR */}
      <div className="w-full border-t-[0.5px] border-white/3 mt-12 sm:mt-12 md:mt-16 lg:mt-16 xl:mt-20" />
    </div>

  );
}