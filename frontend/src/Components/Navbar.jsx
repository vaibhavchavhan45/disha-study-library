import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo2 from "../assets/logo2.webp";

function Navbar({ navItems }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const websiteName = "DISHA";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-3 sm:px-5 md:px-8 lg:px-10 py-2 sm:py-3 md:py-3 lg:py-4">
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap" rel="stylesheet" />
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-2xl border border-white/25 rounded-full px-4 sm:px-5 md:px-6 lg:px-6 py-1.5 sm:py-2 md:py-2 lg:py-2 shadow-xl">

          {/* Left side - Logo + Name */}
          <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-3">
            <img src={logo2} alt="logo" className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[42px] md:h-[42px] lg:w-[45px] lg:h-[45px] rounded-full object-cover" />
            <div className="flex flex-col leading-tight">
              <span
                className="relative"
                style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "3px", color: "transparent", WebkitTextStroke: "1px white" }}
              >
                {websiteName}
                <span
                  aria-hidden="true"
                  className="absolute top-[2px] left-[3px] -z-10"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "3px", color: "#a78bfa", WebkitTextStroke: "0px", opacity: 0.6, filter: "blur(1px)" }}
                >
                  {websiteName}
                </span>
              </span>
              <span className="text-white/50 text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] lg:text-[0.6rem] tracking-[2px] sm:tracking-[2.5px] md:tracking-[3px] lg:tracking-[3px]">STUDY CENTER ARNI</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 sm:gap-6 md:gap-7 lg:gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveItem(item.id); item.onClick(); }}
                className="relative text-white/90 hover:text-white transition pb-1 text-xs sm:text-xs md:text-sm lg:text-base cursor-pointer"
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 bg-red-400/50 ${activeItem === item.id ? "w-full" : "w-0"}`} />
              </button>
            ))}
            <button
              onClick={() => navigate("/", { state: { scrollTo: "join-form" } })}
              className="text-white cursor-pointer px-4 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-1.5 md:py-2 lg:py-2 rounded-full font-medium text-xs sm:text-xs md:text-sm lg:text-base transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.7)]"
              style={{ background: "linear-gradient(to bottom, #6366f1, #38bdf8)" }}
            >
              Join Now
            </button>
          </div>

          {/* Hamburger - Mobile */}
          <div
            className={`lg:hidden cursor-pointer flex flex-col items-center justify-center gap-[6px] sm:gap-[6.5px] w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] transition-transform duration-300 ${menuOpen ? "-rotate-90" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={`w-full h-[3px] sm:h-[3.5px] bg-white rounded-full transition-all duration-300 ${menuOpen ? "translate-y-[26px] sm:translate-y-[28px] -rotate-[60deg] origin-left" : ""}`} />
            <div className={`w-full h-[3px] sm:h-[3.5px] bg-white rounded-full transition-all duration-300 ${menuOpen ? "translate-y-[13px] sm:translate-y-[14px] rotate-[60deg] origin-right" : ""}`} />
            <div className="w-full h-[3px] sm:h-[3.5px] bg-white rounded-full transition-all duration-300" />
          </div>

        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden mt-2 sm:mt-2.5 md:mt-3 lg:mt-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-3 sm:p-4 md:p-5 lg:p-5 flex flex-col gap-3 sm:gap-3 md:gap-4 lg:gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveItem(item.id); item.onClick(); setMenuOpen(false); }}
                className={`text-left transition pb-2 sm:pb-2.5 md:pb-3 lg:pb-3 border-b text-xs sm:text-xs md:text-sm lg:text-base cursor-pointer ${activeItem === item.id ? "text-white border-red-400/50" : "text-white/70 border-transparent"}`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { navigate("/", { state: { scrollTo: "join-form" } }); setMenuOpen(false); }}
              className="text-white px-3 sm:px-4 md:px-4 lg:px-4 py-1.5 sm:py-1.5 md:py-2 lg:py-2 rounded-full font-medium text-xs sm:text-xs md:text-sm lg:text-base transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.7)]"
              style={{ background: "linear-gradient(to bottom, #6366f1, #38bdf8)" }}
            >
              Join Now
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;