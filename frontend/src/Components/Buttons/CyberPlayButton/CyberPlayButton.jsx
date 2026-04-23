import "./CyberPlayButton.css";

export default function CyberPlayButton({
  onClick,
  disabled = false,
  className = "",
  children = "P L A Y",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cyber-play-btn ${className}`}
    >
      {children}

      <div className="cyber-play-btn-clip">
        <div id="leftTop" className="corner" />
        <div id="rightBottom" className="corner" />
        <div id="rightTop" className="corner" />
        <div id="leftBottom" className="corner" />
      </div>

      <span id="rightArrow" className="arrow" />
      <span id="leftArrow" className="arrow" />
    </button>
  );
}