import { facilities } from "../../Data/facilitiesData";
import { cardLayouts, getRowSlices, getGridColsClass, getCardSpanClass } from "../../config/layoutConfig";
import { useState } from "react";

const Card = ({ facility, height = "h-48" }) => {
  const [expanded, setExpanded] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <div className="group cursor-pointer" onClick={() => { setExpanded(!expanded); setClicked(!clicked); }}>
      <div className={`relative ${height} rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border transition-all duration-300 ${clicked ? "border-white/30" : "border-white/10"} hover:border-white/30`}>
        <img src={facility.image} alt={facility.title} className="w-full h-full object-cover breathe-3d" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 mb-[10px]">
          <p className="text-white font-semibold text-xs sm:text-sm mb-1 whitespace-nowrap">{facility.title}</p>
          <p
            className={`text-white/70 font-semibold text-[11px] sm:text-sm cursor-pointer ${expanded ? "text-justify" : "line-clamp-1"}`}
            title={facility.content}
            onClick={(e) => e.stopPropagation()}
          >
            {facility.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function FacilitiesGrid({ showAll = false }) {

  const mobileRows = getRowSlices(cardLayouts.mobile.rows, facilities);
  const tabletRows = getRowSlices(cardLayouts.tablet.rows, facilities);
  const desktopRows = getRowSlices(cardLayouts.desktop.rows, facilities);

  const mobileVisible = showAll ? mobileRows : mobileRows.slice(0, 3);
  const tabletVisible = showAll ? tabletRows : tabletRows.slice(0, 3);
  const desktopVisible = showAll ? desktopRows : desktopRows.slice(0, 3);

  return (
    <div className={`w-full ${showAll ? "pb-0" : "pt-0 lg:pt-2 xl:pt-2 pb-0"}`}>
      <div className="md:hidden space-y-6">
        {mobileVisible.map((row, idx) => (
          <div key={idx} className={`grid gap-6 ${row.length === 1 ? "grid-cols-1" : getGridColsClass(cardLayouts.mobile.cols)}`}>
            {row.map((facility) => (
              <Card key={facility.id} facility={facility} height="h-48" />
            ))}
          </div>
        ))}
      </div>

      {/* Tablet Grid */}
      <div className="hidden md:block lg:hidden">
        <div className="space-y-6">
          {tabletVisible.map((row, idx) => (
            <div key={idx} className={`grid ${getGridColsClass(cardLayouts.tablet.cols)} gap-6`}>
              {row.map((facility) => (
                <div key={facility.id} className={row.length === 1 ? `${getCardSpanClass(cardLayouts.tablet.cols)}` : ""}>
                  <Card facility={facility} height={row.length === 1 ? "h-72" : "h-56"} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:block">
        <div className="space-y-8 xl:space-y-10">
          {desktopVisible.map((row, idx) => (
            <div key={idx} className={`grid ${getGridColsClass(cardLayouts.desktop.cols)} gap-6 xl:gap-8`}>
              {row.map((facility) => (
                <div key={facility.id} className={row.length === 1 ? `${getCardSpanClass(cardLayouts.desktop.cols)}` : ""}>
                  <Card facility={facility} height={row.length === 1 ? "h-72 xl:h-80" : "h-52 xl:h-64"} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}