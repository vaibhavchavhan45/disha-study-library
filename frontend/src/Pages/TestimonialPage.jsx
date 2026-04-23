import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TestimonialCard from "../Components/Testimonials/TestimonialCard";
import { testimonialsPageImages } from "../Data/testimonialPageData";
import SectionTitle from "../Components/SectionTitle";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SpaceButton from "../Components/Buttons/SpaceButton/SpaceButton";
import { rotations } from "../config/testimonialRotation";
import { mdRows } from "../config/testimonialRotation";


export default function TestimonialsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navItems = [
    { id: "1", label: "Home", onClick: () => navigate("/") },
    { id: "2", label: "About", onClick: () => navigate("/about") },
    { id: "3", label: "Facilities", onClick: () => navigate("/facilities") },
    { id: "4", label: "Gallery", onClick: () => navigate("/gallery") },
    { id: "5", label: "Admin", onClick: () => navigate('/admin') },
    { id: "6", label: "Creator", onClick: () => navigate("/dev") },
  ];

  return (
    <div
      style={{ background: "radial-gradient(ellipse at top, #0f2d3d 0%, #09101f 40%, #060812 70%)" }}
      className="min-h-screen w-full"
    >

      {/* Navbar */}
      <Navbar navItems={navItems} />

      {/* Main Content */}
      <div className="w-full pt-20 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10">

          {/* Title */}
          <div className="mb-12 md:mb-28">
            <SectionTitle
              title1="Elite Discipline"
              title2="Voices That Prove It"
              subtitle1="An environment that elevates focus and consistent preparation."
              subtitle2="Clarity in preparation builds confidence followed by success."
            />
          </div>

          {/* Mobile — 1 col */}
          <div className="flex flex-col gap-4 md:hidden">
            {testimonialsPageImages.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                photoRight={index % 2 === 0}
                rotation={rotations[index]}
                marginTop={index % 2 === 0 ? "0px" : "14px"}
                photoSize="130px"
              />
            ))}
          </div>

          {/* MD — 2 cols */}
          <div className="hidden md:flex lg:hidden flex-col gap-4">
            {mdRows.map((row, row_idx) => (
              <div
                key={row_idx}
                className={`flex gap-8 items-start ${row.length === 1 ? "justify-center" : ""}`}
              >
                {row.map((dataIndex, col_idx) => (
                  <TestimonialCard
                    key={testimonialsPageImages[dataIndex].id}
                    testimonial={testimonialsPageImages[dataIndex]}
                    photoRight={col_idx % 2 === 0}
                    rotation={rotations[dataIndex]}
                    marginTop={col_idx % 2 === 0 ? "0px" : "16px"}
                    photoSize="150px"
                    solo={row.length === 1}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* LG — 2 cols */}
          <div className="hidden lg:flex xl:hidden flex-col gap-4">
            {[[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13], [14]].map((row, row_idx) => (
              <div
                key={row_idx}
                className={`flex gap-12 items-start ${row.length === 1 ? "justify-center" : ""}`}
              >
                {row.map((dataIndex, col_idx) => (
                  <TestimonialCard
                    key={testimonialsPageImages[dataIndex].id}
                    testimonial={testimonialsPageImages[dataIndex]}
                    photoRight={col_idx % 2 === 0}
                    rotation={rotations[dataIndex]}
                    marginTop={col_idx % 2 === 0 ? "0px" : "20px"}
                    photoSize="200px"
                    solo={row.length === 1}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* XL — 3 cols */}
          <div className="hidden xl:flex flex-col gap-4">
            {[[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11], [12, 13, 14]].map((row, row_idx) => (
              <div key={row_idx} className="flex gap-4 items-start">
                {row.map((dataIndex, col_idx) => (
                  <TestimonialCard
                    key={testimonialsPageImages[dataIndex].id}
                    testimonial={testimonialsPageImages[dataIndex]}
                    photoRight={true}
                    rotation={rotations[dataIndex]}
                    marginTop={col_idx % 2 === 0 ? "0px" : "20px"}
                    photoSize="200px"
                  />
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Space Button */}
      <div className="flex justify-center py-10 md:py-15 lg:py-20">
        <SpaceButton onClick={() => navigate("/")} label="⟵ BACK TO HOME" />
      </div>

      {/* Footer */}
      <Footer quickLinks={[
        { label: "Home", onClick: () => navigate("/") },
        { label: "About", onClick: () => navigate("/about") },
        { label: "Facilities", onClick: () => navigate("/facilities") },
        { label: "Gallery", onClick: () => navigate("/gallery") },
      ]} />

    </div>
  );
}