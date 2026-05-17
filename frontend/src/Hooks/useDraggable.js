import { useState, useRef } from "react";

export default function useDraggable(initialX, initialY) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const onMouseDown = (e) => {
    dragging.current = true;
    hasMoved.current = false;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
  if (!dragging.current) return;
  hasMoved.current = true;
  const btnW = 160;
  const btnH = 40;
  const x = Math.min(Math.max(0, e.clientX - offset.current.x), window.innerWidth - btnW);
  const y = Math.min(Math.max(0, e.clientY - offset.current.y), window.innerHeight - btnH);
  setPos({ x, y });
};

  const onMouseUp = () => {
    dragging.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    dragging.current = true;
    hasMoved.current = false;
    offset.current = { x: touch.clientX - pos.x, y: touch.clientY - pos.y };
  };

  const onTouchMove = (e) => {
  if (!dragging.current) return;
  hasMoved.current = true;
  const touch = e.touches[0];
  const btnW = 160;
  const btnH = 40;
  const x = Math.min(Math.max(0, touch.clientX - offset.current.x), window.innerWidth - btnW);
  const y = Math.min(Math.max(0, touch.clientY - offset.current.y), window.innerHeight - btnH);
  setPos({ x, y });
};

  const onTouchEnd = () => {
    dragging.current = false;
  };

  return {
    pos,
    hasMoved,
    onMouseDown,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}