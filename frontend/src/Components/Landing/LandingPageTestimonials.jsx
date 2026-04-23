import { useNavigate } from "react-router-dom";
import SectionTitle from "../SectionTitle";
import { photos } from "../../Data/testimonialData";
import CrystalButton from "../Buttons/CrystalButton/CrystalButton";
import {
  row1Indices,
  row2Indices,
  row1IndicesLg,
  row2IndicesLg,
  stagger1,
  stagger2,
  stagger1Lg,
  stagger2Lg
} from "../../config/testimonialLayout";


export default function TestimonialsSection() {
  const navigate = useNavigate();

  const renderRow = (indices, stagger, w, h) => (
    <div className="flex justify-between items-start gap-2 w-full lg:gap-4 ">
      {indices.map((pi, i) => (
        <div key={i} className="shrink-0"
          style={{
            marginTop: stagger[i],
            transform: `rotateY(${i < Math.floor(indices.length / 2) ? (Math.floor(indices.length / 2) - i) * 2 : (i - Math.floor(indices.length / 2)) * -2}deg)`,
            transformStyle: "preserve-3d",
          }}>
          <img src={photos[pi].src} alt={photos[pi].alt}
            className="rounded-xl object-cover"
            style={{
              width: w,
              height: h,
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              objectPosition: "center top",
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div
      style={{ background: "radial-gradient(ellipse at top, #0f2d3d 0%, #09101f 40%, #060812 70%)" }}
      className="w-full pt-12 md:pt-16 lg:pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10">

        <div className="mb-10 md:mb-16">
          <SectionTitle
            title1="Elite Discipline"
            title2="Voices That Prove It"
            subtitle1="An environment that elevates focus and consistent preparation."
            subtitle2="Clarity in preparation builds confidence followed by success."
          />
        </div>

        {/* Mobile / SM — 10 photos, 5+5 */}
        <div className="flex sm:hidden flex-col gap-3 w-full" style={{ perspective: "800px" }}>
          {renderRow(row1Indices, stagger1, "17vw", "22vw")}
          {renderRow(row2Indices, stagger2, "17vw", "22vw")}
        </div>

        {/* SM, MD: 10 photos, 2 rows */}
        <div className="hidden sm:flex md:hidden flex-col gap-4 w-full" style={{ perspective: "900px" }}>
          {renderRow(row1Indices, stagger1, "16vw", "21vw")}
          {renderRow(row2Indices, stagger2, "16vw", "21vw")}
        </div>

        {/* MD:10 photos 2 rows */}
        <div className="hidden md:flex lg:hidden flex-col gap-5 w-full" style={{ perspective: "1100px" }}>
          {renderRow(row1Indices, stagger1, "14vw", "18vw")}
          {renderRow(row2Indices, stagger2, "14vw", "18vw")}
        </div>

        {/* LG, XL: 12 photos, 2 rows */}
        <div className="hidden lg:flex flex-col gap-5 w-full" style={{ perspective: "1400px" }}>
          {renderRow(row1IndicesLg, stagger1Lg, "12vw", "16vw")}
          {renderRow(row2IndicesLg, stagger2Lg, "12vw", "16vw")}
        </div>

        {/* Text below */}
        <div className="flex flex-col items-center text-center mt-8 md:mt-12">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/50 mb-2 md:mb-3 
            border border-white/10 rounded-full px-3 md:px-4 py-1 
            bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-sm">
            Testimonials
          </span>
          <h3 className="text-base md:text-2xl font-bold text-white leading-snug mb-2">
            Trusted by students <span className="text-white/40">across Arni</span>
          </h3>
          <p className="text-white/40 text-xs md:text-sm leading-relaxed mb-4 md:mb-5 max-w-[260px] md:max-w-[340px]">
            Hear from students who found their focus, consistency, and growth at Disha.
          </p>
          <div className="text-black">
            <CrystalButton onClick={() => { navigate("/testimonial"); }} label={"Read Success Stories →"} />
          </div>
        </div>

      </div>
      {/* HR */}
      <div className="w-full border-t border-white/10 mt-16 sm:mt-16 md:mt-20 lg:mt-20 xl:mt-20" />

    </div>
  );
}
