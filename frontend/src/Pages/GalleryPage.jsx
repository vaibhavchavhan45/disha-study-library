import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import SectionTitle from "../Components/SectionTitle";
import GalleryGrid from "../Components/Gallery/GalleryGrid";
import SpaceButton from "../Components/Buttons/SpaceButton/SpaceButton";
import Footer from "../Components/Footer"


export default function GalleryPage() {
  const navigate = useNavigate();

  const navItems = [
    { id: "1", label: "Home", onClick: () => navigate("/") },
    { id: "2", label: "About", onClick: () => navigate("/about") },
    { id: "3", label: "Facilities", onClick: () => navigate("/facilities") },
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

          {/* Title */}
          <SectionTitle
            title1="A Glimpse of Our"
            title2="Quiet Spaces"
            subtitle1="Explore the moments captured inside our study space,"
            subtitle2="Real glimpses of the space and its overall atmosphere."
          />

          {/* Gallery Grid */}
          <GalleryGrid showAll={true} />

        </div>
      </div>

      {/* Space Button */}
      <div className="flex justify-center py-10 md:py-15 lg:py-20">
        <SpaceButton onClick={() => navigate("/")} label="⟵ BACK TO HOME" />
      </div>

      {/* Footer */}
            <Footer quickLinks={[
              { label: "Home", onClick: () => navigate("/") },
              { label: "Facilities", onClick: () => navigate("/facilities") },
              { label: "Gallery", onClick: () => {} },
              { label: "Contact", onClick: () => {} },
            ]} />

    </div>
  );
}