import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SectionTitle from "../Components/SectionTitle";
import AboutDev from "../Components/Dev/AboutDev";
import AboutProject from "../Components/Dev/AboutProject";
import Feedback from "../Components/Dev/Feedback";
import DMS from "../Components/Dev/DevMessages";
import TechStack from "../Components/Dev/TechStack"
import devA from "../assets/dev/devA.webp";
import devB from "../assets/dev/devB.webp";
import devP from "../assets/dev/devP.webp";
import devD from "../assets/dev/devD.webp";

export default function DevPage() {
  const navigate = useNavigate();

  const navItems = [
    { id: "1", label: "Home", onClick: () => navigate("/") },
    {
      id: "2", label: "Contact Developer", onClick: () => {
        const element = document.getElementById("contact-dev");
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - 10;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    },
  ];

  return (
    <div
      style={{ background: "radial-gradient(ellipse at top, #0d2b2e 0%, #08080f 60%)" }}
      className="min-h-screen w-full"
    >
      {/* TOP PAGE BACKGROUND AREA */}
      <div className="relative overflow-hidden">
        <img
          src={devA}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[72%_center] sm:object-[66%_center] md:object-center opacity-28 sm:opacity-34 md:opacity-40"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/28 sm:bg-black/22 md:bg-black/18" />

        <div className="relative z-10">
          <Navbar navItems={navItems} />

          <div className="w-full pt-20 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10">
              <SectionTitle
                title1="The Developer"
                title2="Behind The Build"
                subtitle1="A closer look at who I am, what I build,"
                subtitle2="and the perspective that shapes each project."
              />

              <div id="contact-dev">
                <AboutDev />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT PROJECT */}
      <div className="relative overflow-hidden z-0">
        <img
          src={devP}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[70%_center] sm:object-[62%_center] md:object-center opacity-18 sm:opacity-14 md:opacity-9"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/32 sm:bg-black/24 md:bg-black/15" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10">
          <AboutProject />
        </div>
      </div>

      {/* FEEDBACK + DMS */}
      <div className="relative overflow-hidden z-0">
        <img
          src={devD}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[74%_center] sm:object-[68%_center] md:object-center opacity-30 md:opacity-12"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/15 md:bg-black/28" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10">
          <Feedback />
          <DMS />
        </div>
      </div>

      {/* TECH STACK */}
      <div className="relative overflow-hidden z-0">
        <img
          src={devB}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[76%_center] sm:object-[68%_center] md:object-center opacity-40 sm:opacity-30 md:opacity-18"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/15 md:bg-black/15" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10">
          <TechStack />
        </div>
      </div>

      <Footer
        quickLinks={[
          { label: "Home", onClick: () => navigate("/") },
          { label: "Facilities", onClick: () => navigate("/facilities") },
          { label: "Gallery", onClick: () => { } },
          { label: "Contact", onClick: () => { } },
        ]}
      />
    </div>
  );
}