import { useState } from "react";
import styles from "./SeeMore.module.css";

export default function SeeMore({ onClick, label }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
      onClick();
    }, 1000);
  };

  return (
    <button className={`${styles["see-more-btn"]} ${isActive ? styles.active : ""}`} onClick={handleClick}>
      <span>{label}</span>
    </button>
  );
}