import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ProblemScenario } from "./Problem";
import CodeBlock from "../ui/CodeBlock";
import styles from "./Hero.module.css";

export default function Hero() {
  const [cycle, setCycle] = useState(0);
  const handleDone = useCallback(() => setCycle((c) => c + 1), []);

  return (
    <section className={styles.hero}>
      <div className="container">
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          Agent Memory Infrastructure
        </motion.p>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Memory that knows
          <br />
          <span className={styles.titleAccent}>what it knows.</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26 }}
        >
          Without lifecycle management, a memory stored on day one persists
          at full confidence forever. Your agent will always sound certain.
          It will often be wrong.
        </motion.p>

        <motion.div
          className={styles.codeWrap}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
        >
          <CodeBlock label="quickstart.sh">
            <span className={styles.comment}># Store a typed, confidence-scored memory</span>
            {"\n"}curl -X POST http://localhost:8080/v1/memories \{"\n"}
            {"  "}-H <span className={styles.string}>"Authorization: Bearer $API_KEY"</span> \{"\n"}
            {"  "}-d <span className={styles.string}>{'\'{"agent_id":"$ID","content":"Prefers TypeScript","memory_type":"preference"}\''}</span>
            {"\n\n"}
            <span className={styles.comment}># Recall with hybrid vector + graph traversal</span>
            {"\n"}curl <span className={styles.string}>"http://localhost:8080/v1/memories/recall?query=language+preferences&amp;agent_id=$ID"</span> \{"\n"}
            {"  "}-H <span className={styles.string}>"Authorization: Bearer $API_KEY"</span>
          </CodeBlock>
        </motion.div>

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
