const getInitials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

const TestimonialPhotoSection = ({ photo, name, photoRight, size = "200px" }) => (
  <div
    style={{
      position: "relative",
      width: size,
      flexShrink: 0,
      overflow: "hidden",
      background: "#0b1a1c",
    }}
  >
    {photo ? (
      <img
        src={photo}
        alt={name}
        style={{
          position: "absolute",
          top: "1px",
          [photoRight ? "right" : "left"]: 0,
          width: "100%",
          height: "calc(100% - 1px)",
          objectFit: "cover",
          objectPosition: "top center",
        }}
      />
    ) : (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "40px",
          fontWeight: 900,
          color: "rgba(103,232,249,0.2)",
        }}
      >
        {getInitials(name)}
      </div>
    )}
  </div>
);

export default TestimonialPhotoSection;