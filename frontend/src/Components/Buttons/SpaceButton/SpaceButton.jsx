import styles from "./SpaceButton.module.css";

export default function SpaceButton({ onClick, label = "⟵ BACK TO HOME" }) {
  return (
    <button type="button" className={styles.bttn} onClick={onClick}>
      <strong>{label}</strong>
      <div className={styles["container-starss"]}>
        <div className={styles.starss}></div>
      </div>
      <div className={styles.glow}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </button>
  );
}