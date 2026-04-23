import { useNavigate } from "react-router-dom";
import SectionTitle from "../Components/SectionTitle";
import Navbar from "../Components/Navbar";
import FacilitiesGrid from "../Components/Facilities/FacilitiesGrid";
import SpaceButton from "../Components/Buttons/SpaceButton/SpaceButton";
import Footer from "../Components/Footer";

export default function FacilitiesPage() {
  const navigate = useNavigate();

  const navItems = [
    { id: "1", label: "Home", onClick: () => navigate("/") },
    { id: "2", label: "About", onClick: () => navigate("/about") },
    { id: "3", label: "Gallery", onClick: () => navigate("/gallery") },
    { id: "4", label: "Testimonials", onClick: () => navigate("/testimonial") },
    { id: "5", label: "Admin", onClick: () => navigate('/admin') },
    { id: "6", label: "Creator", onClick: () => navigate("/dev") },
  ];

  return (
    <div style={{ background: "radial-gradient(ellipse at top, #0f2d3d 0%, #09101f 40%, #060812 70%)" }} className="min-h-screen w-full">

      {/* Navbar */}
      <Navbar navItems={navItems} />

      {/* Main Content */}
      <div className="w-full pt-20 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10">

          <SectionTitle
            title1="Features and"
            title2="Facilities"
            subtitle1="Premium facilities designed for focus, and productivity."
            subtitle2="A well-equipped space for effective study experience."
          />

          <FacilitiesGrid showAll={true} />

        </div>
      </div>

      {/* Back to Home */}
      <div className="flex justify-center py-10 md:py-15 lg:py-20">
        <SpaceButton onClick={() => navigate("/")} label="⟵ BACK TO HOME" />
      </div>

      {/* Footer */}
      <Footer quickLinks={[
        { label: "Home", onClick: () => navigate("/") },
        { label: "About", onClick: () => navigate("/about") },
        { label: "Gallery", onClick: () => navigate("/gallery") },
        { label: "Testimonials", onClick: () => navigate("/testimonial") },
      ]} />

    </div>
  );
}