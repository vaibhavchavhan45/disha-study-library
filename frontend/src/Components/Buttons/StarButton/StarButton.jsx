import { useState } from "react";
import styles from "./StarButton.module.css"

function StarButton({ children, onClick }) {
  //click event
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    onClick();
    
    setTimeout(() => {
      setIsActive(false);
    }, 1000);
  };

  const star = (
    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1"
      style={{ shapeRendering:"geometricPrecision", textRendering:"geometricPrecision", imageRendering:"optimizeQuality", fillRule:"evenodd", clipRule:"evenodd" }}
      viewBox="0 0 784.11 815.53">
      <g>
        <path className={styles.fil0} d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"/>
      </g>
    </svg>
  );

  return (
    <button className={`${styles.btn} ${isActive ? styles.active : ''}`} 
      onClick={handleClick}>
      {children}
      <div className={styles['star-1']}>{star}</div>
      <div className={styles['star-2']}>{star}</div>
      <div className={styles['star-3']}>{star}</div>
      <div className={styles['star-4']}>{star}</div>
      <div className={styles['star-5']}>{star}</div>
      <div className={styles['star-6']}>{star}</div>
    </button>
  );
}

export default StarButton;