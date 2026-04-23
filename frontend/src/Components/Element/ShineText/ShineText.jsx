import "./shineText.css";

export default function ShineText({ children, className = "" }) {
  return (
    <span className={`shine-text ${className}`}>
      {children}
    </span>
  );
}