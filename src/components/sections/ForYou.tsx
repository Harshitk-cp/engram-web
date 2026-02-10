import { motion } from "framer-motion";
import { PERSONAS, NOT_FOR_YOU } from "../../constants/content";
import SectionHeader from "../ui/SectionHeader";
import styles from "./ForYou.module.css";

const icons: Record<string, React.ReactNode> = {
  users: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  monitor: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" />
    </svg>
  ),
  stack: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
  book: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  ),
};

export default function ForYou() {
  return (
    <section className={styles.section} id="for-you">
      <div className="container">
        <SectionHeader
          tag="Use Cases"
          title="Is Engram right for you?"
          description="If your agents need to remember, learn, or improve — yes."
        />

        <div className={styles.grid}>
          {PERSONAS.map((p, i) => (
            <motion.div
              key={p.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.iconWrap}>{icons[p.icon]}</div>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.desc}>{p.description}</p>
              <div className={styles.example}>
                <strong>Example:</strong> {p.example}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.notFor}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className={styles.notForTitle}>
            Probably not the right fit if you...
          </h3>
          <div className={styles.notForItems}>
            {NOT_FOR_YOU.map((item) => (
              <div key={item} className={styles.notItem}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 4l8 8m0-8L4 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
