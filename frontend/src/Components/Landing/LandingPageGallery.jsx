import { useNavigate } from "react-router-dom";
import { galleryImages } from "../../Data/galleryData";
import SeeMore from "../Buttons/SeeMoreButton/SeeMore";
import useMarquee from "../../Hooks/useMarquee";
import "../../Animations/marqueeLandingPage.css";
import SectionTitle from "../SectionTitle";

const marqueeImages = [...galleryImages.slice(0, 8), ...galleryImages.slice(0, 8)];

export default function LandingPageGallery() {
  const navigate = useNavigate();
  const {
    trackRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove
  } = useMarquee();

  return (
    <div style={{ background: "radial-gradient(ellipse at top, #0f2d3d 0%, #09101f 40%, #060812 70%)" }} className="w-full pt-12 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10">

        {/* Title */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-12 xl:mb-12">
          <SectionTitle
            title1="A Glimpse of Our"
            title2="Quiet Spaces"
            subtitle1="Explore the moments captured inside our study space,"
            subtitle2="Real glimpses of the space and its overall atmosphere."
          />
        </div>

      </div>

      {/* Marquee — full width */}
      <div className="w-full overflow-hidden" style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
      }}>
        <div
          ref={trackRef}
          className="flex gap-4 marquee-track cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          {marqueeImages.map((img, idx) => (
            <div key={idx} className="shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 xl:w-96 h-52 sm:h-56 md:h-64 lg:h-72 xl:h-72 rounded-xl border border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.08)] overflow-hidden">
              <img
                src={img.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* See More Button */}
      <div className="flex justify-center mt-10">
        <SeeMore onClick={() => navigate("/gallery")} label="View Gallery" />
      </div>

      {/* HR */}
      <div className="w-full border-t border-white/10 mt-16 sm:mt-16 md:mt-20 lg:mt-20 xl:mt-20" />

    </div>
  );
}