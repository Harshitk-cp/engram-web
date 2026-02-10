import { motion } from "framer-motion";
import { GITHUB_URL } from "../../constants/content";
import CodeBlock from "../ui/CodeBlock";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className={styles.badgeDot} />
          Open Source &middot; Built on Cognitive Science
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Give your AI agents
          <br />
          <span className={styles.gradientText}>a brain that learns</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          Cognitive memory infrastructure for AI agents. Store, recall, and
          evolve typed memories via a simple HTTP API. Memories strengthen with
          use, decay when forgotten, and update from feedback &mdash; just like
          the human mind.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="#quickstart" className={styles.btnPrimary}>
            Get Started
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10m0 0L9 4m4 4L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </motion.div>

        <motion.div
          className={styles.codeWrap}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <CodeBlock label="quickstart.sh">
            <span className={styles.comment}># Store a memory</span>
            {"\n"}curl -X POST http://localhost:8080/v1/memories \{"\n"}
            {"  "}-H{" "}
            <span className={styles.string}>
              "Authorization: Bearer $API_KEY"
            </span>{" "}
            \{"\n"}
            {"  "}-d{" "}
            <span className={styles.string}>
              {
                '\'{"agent_id": "...", "content": "User prefers dark mode", "memory_type": "preference"}\''
              }
            </span>
            {"\n\n"}
            <span className={styles.comment}>
              # Recall with hybrid vector + graph search
            </span>
            {"\n"}curl http://localhost:8080/v1/memories/recall?query=
            <span className={styles.string}>"user+preferences"</span>
            &amp;agent_id=...
          </CodeBlock>
        </motion.div>
      </div>
    </section>
  );
}
