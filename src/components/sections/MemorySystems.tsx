import { motion } from "framer-motion";
import { MEMORY_SYSTEMS } from "../../constants/content";
import SectionHeader from "../ui/SectionHeader";
import styles from "./MemorySystems.module.css";

const colorMap: Record<string, string> = {
  purple: "#a78bfa",
  blue: "#60a5fa",
  indigo: "#818cf8",
  violet: "#c084fc",
};

export default function MemorySystems() {
  return (
    <section className={styles.section} id="memory-systems">
      <div className="container">
        <SectionHeader
          tag="Cognitive Architecture"
          title="Four memory systems,<br/>one unified API"
          description="Inspired by CoALA, Mem0, and ACT-R research. Each memory type serves a distinct cognitive function."
        />
        <div className={styles.grid}>
          {MEMORY_SYSTEMS.map((m, i) => (
            <motion.div
              key={m.type}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={
                {
                  "--card-color": colorMap[m.color],
                } as React.CSSProperties
              }
            >
              <div className={styles.accent} />
              <span className={styles.tag}>{m.type}</span>
              <h3 className={styles.title}>{m.title}</h3>
              <p className={styles.desc}>{m.description}</p>
              <div className={styles.example}>
                <code>
                  {m.example} <span className={styles.badge}>{m.badge}</span>
                </code>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
