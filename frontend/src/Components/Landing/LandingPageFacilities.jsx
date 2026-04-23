import { useNavigate } from "react-router-dom";
import FacilitiesGrid from "../Facilities/FacilitiesGrid";
import SeeMore from "../Buttons/SeeMoreButton/SeeMore";
import SectionTitle from "../SectionTitle";

export default function LandingPageFacilities() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "radial-gradient(ellipse at top, #0f2d3d 0%, #09101f 40%, #060812 70%)" }} className="w-full pt-8 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10">

        <SectionTitle
          title1="Features and"
          title2="Facilities"
          subtitle1="Premium facilities designed for focus, and productivity."
          subtitle2="A well-equipped space for effective study experience."
        />

        <FacilitiesGrid />

        {/* See More Button */}
        <div className="flex justify-center mt-4">
          <SeeMore onClick={() => navigate("/facilities")} label="See More" />
        </div>

      </div>

      {/* HR */}
      <div className="w-full border-t border-white/10 mt-16 sm:mt-16 md:mt-20 lg:mt-20 xl:mt-20" />

    </div>
  );
}