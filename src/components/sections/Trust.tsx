import { motion } from "framer-motion";
import { TRUST_PILLARS } from "../../constants/content";
import SectionHeader from "../ui/SectionHeader";
import AuditChainDemo from "./AuditChainDemo";
import styles from "./Trust.module.css";

const icons: Record<string, React.ReactNode> = {
  shield: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l8 3v6c0 5-3.4 8.5-8 11-4.6-2.5-8-6-8-11V5l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  chain: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="7" height="5" rx="1.5" />
      <rect x="14" y="11" width="7" height="5" rx="1.5" />
      <path d="M10 6.5h2.5a2 2 0 012 2V11M14 13.5h-2.5a2 2 0 01-2-2V9" />
    </svg>
  ),
  key: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="5" />
      <path d="M11.5 11.5L21 21M18 18l2-2M15 15l2-2" />
    </svg>
  ),
  broom: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M19 3l-9 9" />
      <path d="M11 11l2 2-5 6c-1.5 1.8-4.5 1.8-6 0 1.8-1.5 1.8-4.5 0-6l6-5 2 2z" />
      <path d="M6.5 14.5l3 3" />
    </svg>
  ),
};

const WHY_NOW = [
  {
    stat: "ASI06",
    label: "OWASP named memory poisoning a top-10 agentic risk (2026).",
  },
  {
    stat: "Aug 2026",
    label: "The EU AI Act becomes fully applicable — auditable AI is mandatory.",
  },
  {
    stat: "97.8%",
    label: "of entries in one audited memory store were junk after 32 days.",
  },
];

export default function Trust() {
  return (
    <section className={styles.section} id="trust">
      <div className="container">
        <SectionHeader
          tag="Trust & Governance"
          title="Memory you can <span>prove</span>"
          description="Every other memory layer asks you to trust it. Engram lets you verify — provenance on every belief, a tamper-evident audit trail, cryptographic erasure, and memory that cleans itself. The controls regulated teams and production agents now require, shipped today."
        />

        <div className={styles.grid}>
          {TRUST_PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              className={styles.card}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className={styles.icon}>{icons[p.icon]}</div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.description}</p>
            </motion.div>
          ))}
        </div>

        <AuditChainDemo />

        <motion.div
          className={styles.whyNow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.whyNowLabel}>Why now</span>
          <div className={styles.whyNowItems}>
            {WHY_NOW.map((w) => (
              <div key={w.stat} className={styles.whyNowItem}>
                <span className={styles.whyNowStat}>{w.stat}</span>
                <span className={styles.whyNowText}>{w.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
