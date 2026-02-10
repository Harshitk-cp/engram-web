import { motion } from "framer-motion";
import { FLOW_STEPS } from "../../constants/content";
import SectionHeader from "../ui/SectionHeader";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader tag="Architecture" title="How Engram works" />
        <div className={styles.steps}>
          {FLOW_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className={styles.stepGroup}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {i > 0 && (
                <div className={styles.connector}>
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                    <path
                      d="M0 12h36m0 0l-6-6m6 6l-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.2"
                    />
                  </svg>
                </div>
              )}
              <div className={styles.step}>
                <span className={styles.number}>{step.number}</span>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.desc}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
