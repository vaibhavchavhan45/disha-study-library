import TestimonialStars from "./TestimonialStars";

const TestimonialCardContent = ({ testimonial }) => (
  <div
    style={{
      padding: "24px 28px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flex: 1,
      minWidth: 0,
    }}
  >
    <div>
      <p style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>
        {testimonial.name}
      </p>
      <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "3px" }}>
        {testimonial.loc}
      </p>
    </div>
    <p
      style={{
        fontSize: "13px",
        color: "rgba(255,255,255,0.6)",
        lineHeight: 1.75,
        flex: 1,
        padding: "14px 0",
      }}
    >
      "{testimonial.quote}"
    </p>
    <TestimonialStars rating={testimonial.rating} />
  </div>
);

export default TestimonialCardContent;