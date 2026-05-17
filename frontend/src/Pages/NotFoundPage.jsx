import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const navItems = [
    { videoId: "1", label: "Home", onClick: () => navigate('/') },
  ];

  const quickLinks = [
    { label: "Home", onClick: () => navigate("/") },
    { label: "About", onClick: () => navigate("/about") },
    { label: "Facilities", onClick: () => navigate("/facilities") },
    { label: "Gallery", onClick: () => navigate("/gallery") },
    { label: "Testimonials", onClick: () => navigate("/testimonial") },
  ];

  return (
    <div style={{ background: "radial-gradient(ellipse at top, #0f2d3d 0%, #09101f 40%, #060812 70%)" }} 
        className="relative min-h-screen flex flex-col overflow-hidden text-white"
      >
      <Navbar navItems={navItems} />

      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[14%] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-[8%] top-[26%] h-[220px] w-[220px] rounded-full bg-violet-500/10 blur-[110px]" />
        <div className="absolute left-[8%] bottom-[18%] h-[220px] w-[220px] rounded-full bg-sky-500/10 blur-[110px]" />
      </div>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-14">
        <div className="w-full max-w-[920px] text-center">
          <div className="px-2 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.72rem] sm:text-[0.78rem] font-medium uppercase tracking-[0.22em] text-white/65">
              Error • Lost in Space
            </div>

            <h1 className="select-none text-[5.8rem] sm:text-[7.5rem] md:text-[9.5rem] lg:text-[11rem] font-semibold tracking-[-0.09em] leading-none text-white/92">
              404
            </h1>

            <h2 className="mt-4 text-[1.45rem] sm:text-[1.8rem] md:text-[2.2rem] font-semibold tracking-[-0.04em] text-white/95">
              This page wandered off.
            </h2>

            <p className="mt-5 mx-auto max-w-[680px] text-white/62 text-[0.95rem] sm:text-[1rem] md:text-[1.05rem] leading-7 sm:leading-8 font-light">
              The page you’re trying to access doesn’t exist, was moved,
              or the route might be incorrect.
            </p>

            {/* Button */}
            <div className="mt-10 flex items-center justify-center">
              <button
                onClick={() => navigate("/")}
                className="group relative inline-flex min-h-[54px] items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/[0.08] px-8 sm:px-10 py-3 text-[0.95rem] font-semibold tracking-[0.08em] uppercase text-white shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-md"
              >
                <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_35%,rgba(255,255,255,0.06))]" />
                <span className="absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
                <span className="relative z-10">Back to Home</span>
              </button>
            </div>

            <div className="mt-10 mx-auto h-px w-full max-w-[220px] bg-gradient-to-r from-transparent via-white/18 to-transparent" />

            <p className="mt-5 text-[0.8rem] sm:text-[0.85rem] tracking-[0.16em] uppercase text-white/35">
              Error Code / Route Not Found
            </p>
          </div>
        </div>
      </main>

      <Footer quickLinks={quickLinks} />
    </div>
  );
}