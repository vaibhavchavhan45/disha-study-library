const TestimonialStars = ({ rating }) => (
  <div style={{ display: "flex", gap: "4px" }}>
    {[1, 2, 3, 4, 5].map((starNumber) => {
      const filled = rating >= starNumber;
      const half = !filled && rating >= starNumber - 0.5;
      return (
        <svg
          key={starNumber}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={filled ? "#f59e0b" : half ? "url(#half)" : "rgba(255,255,255,0.1)"}
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
          </defs>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      );
    })}
  </div>
);

export default TestimonialStars;