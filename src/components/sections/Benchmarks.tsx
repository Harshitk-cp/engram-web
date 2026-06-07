import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { BENCHMARK_HEADLINE, BENCHMARK_TASKS } from "../../constants/content";
import styles from "./Benchmarks.module.css";

function barColor(score: number): string {
  if (score >= 90) return "var(--accent-green, #34d399)";
  if (score >= 75) return "var(--accent, #a78bfa)";
  return "var(--accent-amber, #fbbf24)";
}

export default function Benchmarks() {
  return (
    <section className={styles.section} id="benchmarks">
      <div className="container">
        <SectionHeader
          tag="Benchmarks"
          title="Measured on the hardest public memory benchmark"
          description="LongMemEval (ICLR 2025) grades long-term conversational memory across six task types, over chat histories that scale past a million tokens. Here is exactly how Engram performs — every task type, every number, nothing hidden."
        />

        <motion.div
          className={styles.headline}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <div className={`${styles.statCard} ${styles.statPrimary}`}>
            <span className={styles.statValue}>{BENCHMARK_HEADLINE.overall}</span>
            <span className={styles.statLabel}>{BENCHMARK_HEADLINE.overallSub}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValueSm}>{BENCHMARK_HEADLINE.dataset}</span>
            <span className={styles.statLabel}>{BENCHMARK_HEADLINE.datasetSub}</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.tableWrap}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.taskCol}>Task type</th>
                <th className={styles.whatCol}>What it tests</th>
                <th className={styles.scoreCol}>Score</th>
              </tr>
            </thead>
            <tbody>
              {BENCHMARK_TASKS.map((row) => (
                <tr key={row.task} className={styles.dataRow}>
                  <td className={styles.taskCell}>
                    <span className={styles.taskName}>{row.task}</span>
                  </td>
                  <td className={styles.whatCell}>{row.tests}</td>
                  <td className={styles.scoreCell}>
                    <div className={styles.scoreInner}>
                      <div className={styles.barTrack}>
                        <div
                          className={styles.barFill}
                          style={{ width: `${row.score}%`, background: barColor(row.score) }}
                        />
                      </div>
                      <span className={styles.scoreNum}>{row.score.toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className={styles.totalRow}>
                <td className={styles.taskCell}>
                  <span className={styles.taskName}>Overall</span>
                </td>
                <td className={styles.whatCell}>Every task type, including abstention.</td>
                <td className={styles.scoreCell}>
                  <div className={styles.scoreInner}>
                    <div className={styles.barTrack}>
                      <div className={styles.barFill} style={{ width: "91.4%", background: "var(--accent, #a78bfa)" }} />
                    </div>
                    <span className={`${styles.scoreNum} ${styles.scoreNumBold}`}>91.4%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        <div className={styles.notes}>
          <div className={styles.noteCard}>
            <h4 className={styles.noteTitle}>Methodology</h4>
            <p className={styles.noteBody}>
              Engram is the memory store and retrieval layer; the agent reads only what Engram returns. Answers are graded
              by LongMemEval's standard GPT-4o judge against the official LongMemEval set. Strongest areas — knowledge
              updates, abstention, and single-session recall — sit at 89–100%. Temporal reasoning is date-aware (the answerer
              is given the question's reference date) and is the area with the most remaining headroom. Multi-session
              aggregation uses a counting-aware answerer that scans every recalled session and de-duplicates instances
              across conversations.
            </p>
          </div>
          <div className={styles.noteCard}>
            <h4 className={styles.noteTitle}>How to read memory benchmarks</h4>
            <p className={styles.noteBody}>
              Memory-layer numbers are notoriously setup-dependent — published LongMemEval scores swing widely with the
              reader model and harness, and vendors have publicly disputed each other's figures. We publish the full
              per-task breakdown and methodology so you can reproduce it, rather than a single cherry-picked headline.
            </p>
          </div>
        </div>

        <p className={styles.footnote}>
          Benchmark: LongMemEval — Wu et al., ICLR 2025 (
          <a href="https://github.com/xiaowu0162/LongMemEval" target="_blank" rel="noopener noreferrer">github.com/xiaowu0162/LongMemEval</a>
          ,{" "}
          <a href="https://arxiv.org/abs/2410.10813" target="_blank" rel="noopener noreferrer">arXiv:2410.10813</a>
          ).
        </p>
      </div>
    </section>
  );
}
