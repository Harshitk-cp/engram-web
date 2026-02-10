import { useEffect, useRef } from "react";
import styles from "./GradientBackground.module.css";

export default function GradientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.002;
      const orbs = container.querySelectorAll<HTMLDivElement>(`.${styles.orb}`);

      orbs.forEach((orb, i) => {
        const speed = 0.3 + i * 0.15;
        const xRange = 15 + i * 5;
        const yRange = 10 + i * 5;
        const x = Math.sin(time * speed + i * 1.5) * xRange;
        const y = Math.cos(time * speed * 0.8 + i * 2) * yRange;
        orb.style.transform = `translate(${x}%, ${y}%)`;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div ref={containerRef} className={styles.bg} aria-hidden="true">
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />
      <div className={`${styles.orb} ${styles.orb4}`} />
      <div className={styles.noise} />
    </div>
  );
}
