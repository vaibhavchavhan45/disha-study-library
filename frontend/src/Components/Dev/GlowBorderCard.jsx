import { useState, useEffect, useRef } from "react";
import "../../Animations/glowStyles.css";

export default function GlowBorderCard({ children, className = "", style = {} }) {
  const wrapperRef = useRef(null);
  const [perimeter, setPerimeter] = useState(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const radius = 16;

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      setDims({ w, h });
      const p = 2 * (w - 2 * radius) + 2 * (h - 2 * radius) + 2 * Math.PI * radius;
      setPerimeter(Math.round(p));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = dims;
  const r = radius;

  const path = w && h
    ? `M ${r} 0 H ${w - r} Q ${w} 0 ${w} ${r} V ${h - r} Q ${w} ${h} ${w - r} ${h} H ${r} Q 0 ${h} 0 ${h - r} V ${r} Q 0 0 ${r} 0 Z`
    : "";

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ position: "relative", borderRadius: `${radius}px`, ...style }}
    >
      <div
        style={{
          position: "absolute", inset: 0,
          borderRadius: `${radius}px`,
          border: "1px solid rgba(255,255,255,0.4)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {path && (
        <svg className="glow-svg" viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
          <path
            className="glow-path"
            d={path}
            style={{ strokeDasharray: `80 ${perimeter}` }}
          />
        </svg>
      )}
      <div style={{ position: "relative", zIndex: 3 }}>
        {children}
      </div>
    </div>
  );
}