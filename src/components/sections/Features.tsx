import { motion } from "framer-motion";
import { FEATURES } from "../../constants/content";
import SectionHeader from "../ui/SectionHeader";
import styles from "./Features.module.css";

const icons: Record<string, React.ReactNode> = {
  layers: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
  clock: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  ),
  graph: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="18" r="3" />
      <line x1="9" y1="6" x2="15" y2="6" /><line x1="6" y1="9" x2="6" y2="15" /><line x1="18" y1="9" x2="18" y2="15" /><line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  ),
  chat: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  procedure: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4" />
    </svg>
  ),
  brain: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" /><path d="M12 8v4l3 3" /><path d="M8 14s1.5 2 4 2 4-2 4-2" />
    </svg>
  ),
};

const colorMap: Record<string, string> = {
  purple: "var(--accent-purple)",
  blue: "var(--accent-blue)",
  indigo: "var(--accent-indigo)",
  violet: "var(--accent-violet)",
  fuchsia: "var(--accent-fuchsia)",
  rose: "var(--accent-rose)",
};

export default function Features() {
  return (
    <section className={styles.features} id="features">
      <div className="container">
        <SectionHeader
          tag="Core Capabilities"
          title="Everything agents need to remember"
          description="Engram goes beyond simple vector storage. It models memory the way cognitive science says it should work."
        />
        <div className={styles.grid}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div
                className={styles.icon}
                style={
                  {
                    "--icon-color": colorMap[f.color],
                  } as React.CSSProperties
                }
              >
                {icons[f.icon]}
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
