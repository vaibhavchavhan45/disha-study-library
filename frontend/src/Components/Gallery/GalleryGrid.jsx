import { useState, useEffect } from "react";
import { galleryImages } from "../../Data/galleryData";
import { getGalleryRowSlices, getGalleryGridColsClass } from "../../config/galleryLayoutConfig";

export default function GalleryGrid({ showAll = false }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const images = showAll ? galleryImages : galleryImages.slice(0, 8);

  const rows = getGalleryRowSlices(images, isMobile);

  return (
    <>
      <div className="w-full space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-15">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className={`grid gap-6 md:gap-8 lg:gap-10 xl:gap-12 ${getGalleryGridColsClass(row.length)}`}
          >
            {row.map((img) => (
              <div
                key={img.id}
                className={`overflow-hidden rounded-xl cursor-pointer border border-white/10
                    ${row.length === 1 ? "aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                onClick={() => setSelectedImg(img)}
              >
                <img
                  src={img.image}
                  alt=""
                  className="w-full h-full object-cover object-[50%_15%]"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={() => setSelectedImg(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <img
              src={selectedImg.image}
              alt=""
              className="w-full max-h-[75vh] object-contain rounded-2xl border-2 border-transparent"
              style={{
                backgroundImage: "linear-gradient(#0d2b2e, #0d2b2e), linear-gradient(90deg, #67e8f9, #818cf8, #be185d)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box"
              }}
            />

            {/* Close Button */}
            <button
              onClick={() => setSelectedImg(null)}
              className="mt-6 mx-auto flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all duration-200 bg-white/5 backdrop-blur-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}