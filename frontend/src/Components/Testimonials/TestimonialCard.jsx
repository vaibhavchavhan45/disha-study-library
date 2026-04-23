import TestimonialCardContent from "./TestimonialCardContent";
import TestimonialPhotoSection from "./TestimonialPhotoSection";

const TestimonialCard = ({
  testimonial,
  photoRight,
  rotation,
  marginTop = "0px",
  photoSize = "200px",
  solo = false,
}) => (
  <div
    className="rounded-2xl overflow-hidden"
    style={{
      background: testimonial.id % 2 === 0 ? "#0d1114" : "#0e0e14",
      display: "flex",
      flexDirection: photoRight ? "row" : "row-reverse",
      minHeight: "260px",
      transform: `rotate(${rotation})`,
      marginTop,
      width: solo ? "50%" : undefined,
      flex: solo ? "none" : 1,
      boxShadow: "0 0 0 1px rgba(103,232,249,0.15), 0 0 20px rgba(103,232,249,0.05)",
    }}
  >
    <TestimonialCardContent testimonial={testimonial} />
    <TestimonialPhotoSection
      photo={testimonial.photo}
      name={testimonial.name}
      photoRight={photoRight}
      size={photoSize}
    />
  </div>
);

export default TestimonialCard;