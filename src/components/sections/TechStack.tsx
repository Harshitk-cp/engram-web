import { motion } from "framer-motion";
import { TECH_STACK } from "../../constants/content";
import SectionHeader from "../ui/SectionHeader";
import styles from "./TechStack.module.css";

export default function TechStack() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          tag="Built With"
          title="Production-grade foundations"
        />
        <div className={styles.grid}>
          {TECH_STACK.map((t, i) => (
            <motion.div
              key={t.name}
              className={styles.item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <span className={styles.name}>{t.name}</span>
              <span className={styles.desc}>{t.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
