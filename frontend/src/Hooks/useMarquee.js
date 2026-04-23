import { useRef } from "react";

export default function useMarquee() {
  const trackRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    trackRef.current.style.animationPlayState = "paused";
    startX = e.pageX - trackRef.current.offsetLeft;
    scrollLeft = trackRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    trackRef.current.style.animationPlayState = "running";
  };

  const handleMouseUp = () => {
    isDown = false;
    trackRef.current.style.animationPlayState = "running";
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    trackRef.current.style.animationPlayState = "paused";
    startX = e.touches[0].pageX - trackRef.current.offsetLeft;
    scrollLeft = trackRef.current.scrollLeft;
  };

  const handleTouchEnd = () => {
    trackRef.current.style.animationPlayState = "running";
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  return {
    trackRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove
  };
}