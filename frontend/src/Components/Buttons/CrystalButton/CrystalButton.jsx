import styles from "./CrystalButton.module.css";

const CrystalButton = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className={styles.crystal_button}>
      {label}
    </button>
  );
};

export default CrystalButton;