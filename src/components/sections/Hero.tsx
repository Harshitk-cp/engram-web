import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ProblemScenario } from "./Problem";
import DecayPlayground from "./DecayPlayground";
import MemoryField from "../ui/MemoryField";
import { GITHUB_URL } from "../../constants/content";
import styles from "./Hero.module.css";

export default function Hero() {
  const [cycle, setCycle] = useState(0);
  const handleDone = useCallback(() => setCycle((c) => c + 1), []);

  return (
    <section className={styles.hero}>
      <MemoryField />
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <motion.p
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              Provable Agent Memory
            </motion.p>

            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Memory you can
              <br />
              <span className={styles.titleAccent}>prove.</span>
            </motion.h1>

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
            >
              Every other memory layer asks you to trust a black box. Engram
              records where each belief came from, lets it decay when it goes
              stale, can erase any subject on request, and writes every change
              to a tamper-evident audit trail — so you can prove what your
              agent knows, and why.
            </motion.p>

            <motion.div
              className={styles.ctas}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
            >
              <a href="#quickstart" className={styles.btnPrimary}>
                Get started
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSecondary}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Star on GitHub
              </a>
            </motion.div>
          </div>

          <motion.div
            className={styles.playground}
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.3 }}
          >
            <DecayPlayground />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <ProblemScenario key={cycle} onDone={handleDone} />
        </motion.div>
      </div>
    </section>
  );
}
