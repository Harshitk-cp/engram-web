import { motion } from "framer-motion";
import { METRICS } from "../../constants/content";
import styles from "./Metrics.module.css";

export default function Metrics() {
  return (
    <section className={styles.metrics}>
      <div className="container">
        <motion.div
          className={styles.grid}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          {METRICS.map((m, i) => (
            <div key={m.label} className={styles.item}>
              {i > 0 && <div className={styles.divider} />}
              <div className={styles.content}>
                <span className={styles.value}>{m.value}</span>
                <span className={styles.label}>{m.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
