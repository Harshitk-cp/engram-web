import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import CodeBlock from "../ui/CodeBlock";
import styles from "./Quickstart.module.css";

const pythonSteps = [
  {
    num: 1,
    title: "Start the server",
    label: "terminal",
    code: (
      <>
        <span className={styles.comment}># Clone and start with Docker</span>
        {"\n"}git clone https://github.com/Harshitk-cp/engram.git{"\n"}
        <span className={styles.keyword}>cd</span> engram{"\n"}
        docker compose up -d
      </>
    ),
  },
  {
    num: 2,
    title: "Install the SDK",
    label: "terminal",
    code: (
      <>
        pip install engram
      </>
    ),
  },
  {
    num: 3,
    title: "Store and recall memories",
    label: "python",
    code: (
      <>
        <span className={styles.keyword}>from</span> engram{" "}
        <span className={styles.keyword}>import</span> Engram, MemoryType{"\n\n"}
        client = Engram({"\n"}
        {"    "}base_url=<span className={styles.string}>"http://localhost:8080"</span>,{"\n"}
        {"    "}api_key=<span className={styles.string}>"your-api-key"</span>,{"\n"}
        ){"\n\n"}
        <span className={styles.comment}># Register an agent</span>
        {"\n"}agent = client.agents.create(name=<span className={styles.string}>"my-assistant"</span>){"\n\n"}
        <span className={styles.comment}># Store a typed, confidence-scored memory</span>
        {"\n"}client.memories.store({"\n"}
        {"    "}agent_id=agent.id,{"\n"}
        {"    "}content=<span className={styles.string}>"User prefers TypeScript over JavaScript"</span>,{"\n"}
        {"    "}type=MemoryType.PREFERENCE,{"\n"}
        {"    "}confidence=<span className={styles.num}>0.9</span>,{"\n"}
        ){"\n\n"}
        <span className={styles.comment}># Recall with hybrid vector + graph retrieval</span>
        {"\n"}memories = client.memories.recall({"\n"}
        {"    "}agent_id=agent.id,{"\n"}
        {"    "}query=<span className={styles.string}>"language preferences"</span>,{"\n"}
        )
      </>
    ),
  },
];

const restSteps = [
  {
    num: 1,
    title: "Start the server",
    label: "terminal",
    code: (
      <>
        <span className={styles.comment}># Clone and start with Docker</span>
        {"\n"}git clone https://github.com/Harshitk-cp/engram.git{"\n"}
        <span className={styles.keyword}>cd</span> engram{"\n"}
        docker compose up -d
      </>
    ),
  },
  {
    num: 2,
    title: "Create an agent",
    label: "terminal",
    code: (
      <>
        curl -X POST http://localhost:8080/v1/agents \{"\n"}
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
        <span className={styles.comment}># Store a typed, confidence-scored memory</span>
        {"\n"}curl -X POST http://localhost:8080/v1/memories \{"\n"}
        {"  "}-H <span className={styles.string}>"Authorization: Bearer $API_KEY"</span> \{"\n"}
        {"  "}-H <span className={styles.string}>"Content-Type: application/json"</span> \{"\n"}
        {"  "}-d <span className={styles.string}>{'\'{"agent_id":"$AGENT_ID",'}</span>{"\n"}
        {"    "}<span className={styles.string}>{'  "content":"User prefers TypeScript",'}</span>{"\n"}
        {"    "}<span className={styles.string}>{'  "memory_type":"preference",'}</span>{"\n"}
        {"    "}<span className={styles.string}>{'  "confidence":0.9}\''}</span>
        {"\n\n"}
        <span className={styles.comment}># Recall with hybrid retrieval</span>
        {"\n"}curl <span className={styles.string}>"http://localhost:8080/v1/memories/recall?query=language+preferences&agent_id=$AGENT_ID"</span> \{"\n"}
        {"  "}-H <span className={styles.string}>"Authorization: Bearer $API_KEY"</span>
      </>
    ),
  },
];

const TABS = [
  { id: "python", label: "Python SDK" },
  { id: "rest", label: "REST API" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Quickstart() {
  const [activeTab, setActiveTab] = useState<TabId>("python");
  const steps = activeTab === "python" ? pythonSteps : restSteps;

  return (
    <section className={styles.section} id="quickstart">
      <div className="container">
        <SectionHeader tag="Get Started" title="Up and running in 2 minutes" />

        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={styles.grid}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                className={styles.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
              >
                <div className={styles.header}>
                  <span className={styles.num}>{s.num}</span>
                  <h3>{s.title}</h3>
                </div>
                <CodeBlock label={s.label}>{s.code}</CodeBlock>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
