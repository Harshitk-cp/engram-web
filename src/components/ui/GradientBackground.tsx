import styles from "./GradientBackground.module.css";

export default function GradientBackground() {
  return (
    <div className={styles.bg} aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.glow} />
    </div>
  );
}
