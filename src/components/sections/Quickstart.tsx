import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import CodeBlock from "../ui/CodeBlock";
import styles from "./Quickstart.module.css";

const steps = [
  {
    num: 1,
    title: "Start the server",
    label: "terminal",
    code: (
      <>
        <span className={styles.comment}># Clone and start with Docker</span>
        {"\n"}git clone https://github.com/Harshitk-cp/engram.git{"\n"}
        <span className={styles.keyword}>cd</span> engram{"\n"}
        docker compose up -d{"\n"}
        mise run run
      </>
    ),
  },
  {
    num: 2,
    title: "Create an agent",
    label: "terminal",
    code: (
      <>
        <span className={styles.comment}># Register a new agent</span>
        {"\n"}curl -X POST http://localhost:8080/v1/agents \{"\n"}
        {"  "}-H <span className={styles.string}>"Authorization: Bearer $API_KEY"</span> \{"\n"}
        {"  "}-H <span className={styles.string}>"Content-Type: application/json"</span> \{"\n"}
        {"  "}-d <span className={styles.string}>{'\'{"name": "my-assistant"}\''}</span>
      </>
    ),
  },
  {
    num: 3,
    title: "Store and recall memories",
    label: "terminal",
    code: (
      <>
        <span className={styles.comment}># Store a memory</span>
        {"\n"}curl -X POST http://localhost:8080/v1/memories \{"\n"}
        {"  "}-H <span className={styles.string}>"Authorization: Bearer $API_KEY"</span> \{"\n"}
        {"  "}-d <span className={styles.string}>{'\'{"agent_id":"$AGENT_ID",'}</span>{"\n"}
        {"    "}<span className={styles.string}>{'  "content":"User prefers TypeScript",'}</span>{"\n"}
        {"    "}<span className={styles.string}>{'  "memory_type":"preference"}\''}</span>
        {"\n\n"}
        <span className={styles.comment}># Recall relevant memories</span>
        {"\n"}curl <span className={styles.string}>"http://localhost:8080/v1/memories/recall?query=language+preferences&amp;agent_id=$AGENT_ID"</span> \{"\n"}
        {"  "}-H <span className={styles.string}>"Authorization: Bearer $API_KEY"</span>
      </>
    ),
  },
];

export default function Quickstart() {
  return (
    <section className={styles.section} id="quickstart">
      <div className="container">
        <SectionHeader tag="Get Started" title="Up and running in 2 minutes" />
        <div className={styles.grid}>
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              className={styles.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className={styles.header}>
                <span className={styles.num}>{s.num}</span>
                <h3>{s.title}</h3>
              </div>
              <CodeBlock label={s.label}>{s.code}</CodeBlock>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
