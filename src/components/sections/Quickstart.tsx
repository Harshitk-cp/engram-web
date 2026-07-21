import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import CodeBlock from "../ui/CodeBlock";
import { DOCS_URL } from "../../constants/content";
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
        <span className={styles.comment}># Set a setup token, then start</span>
        {"\n"}ENGRAM_SETUP_TOKEN=changeme docker compose up -d{"\n\n"}
        <span className={styles.comment}># Get your master API key (run once)</span>
        {"\n"}curl -X POST http://localhost:8080/v1/setup \{"\n"}
        {"  "}-H <span className={styles.string}>"X-Setup-Token: changeme"</span> \{"\n"}
        {"  "}-H <span className={styles.string}>"Content-Type: application/json"</span> \{"\n"}
        {"  "}-d <span className={styles.string}>{'\'{"org_name":"My Org"}\''}</span>{"\n"}
        <span className={styles.comment}># → {"{"}"api_key":"mk_..."{"}"} — save this</span>
      </>
    ),
  },
  {
    num: 2,
    title: "Install the SDK",
    label: "terminal",
    code: (
      <>
        pip install engram.to
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
        <span className={styles.keyword}>import</span> Hakuya{"\n\n"}
        client = Hakuya({"\n"}
        {"    "}base_url=<span className={styles.string}>"http://localhost:8080"</span>,{"\n"}
        {"    "}api_key=<span className={styles.string}>"mk_..."</span>,{"\n"}
        ){"\n\n"}
        <span className={styles.comment}># Register an agent</span>
        {"\n"}agent = client.agents.create({"\n"}
        {"    "}external_id=<span className={styles.string}>"my-assistant"</span>,{"\n"}
        {"    "}name=<span className={styles.string}>"My Assistant"</span>,{"\n"}
        ){"\n\n"}
        <span className={styles.comment}># Store a typed, confidence-scored memory</span>
        {"\n"}client.memories.store({"\n"}
        {"    "}agent_id=agent.id,{"\n"}
        {"    "}content=<span className={styles.string}>"User prefers TypeScript over JavaScript"</span>,{"\n"}
        {"    "}type=<span className={styles.string}>"preference"</span>,{"\n"}
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
        <span className={styles.comment}># Set a setup token, then start</span>
        {"\n"}ENGRAM_SETUP_TOKEN=changeme docker compose up -d{"\n\n"}
        <span className={styles.comment}># Get your master API key (run once)</span>
        {"\n"}curl -X POST http://localhost:8080/v1/setup \{"\n"}
        {"  "}-H <span className={styles.string}>"X-Setup-Token: changeme"</span> \{"\n"}
        {"  "}-H <span className={styles.string}>"Content-Type: application/json"</span> \{"\n"}
        {"  "}-d <span className={styles.string}>{'\'{"org_name":"My Org"}\''}</span>{"\n"}
        <span className={styles.comment}># → {"{"}"api_key":"mk_..."{"}"} — save this as $API_KEY</span>
      </>
    ),
  },
  {
    num: 2,
    title: "Create an agent",
    label: "terminal",
    code: (
      <>
        curl -X POST http://localhost:8080/v1/agents/ \{"\n"}
        {"  "}-H <span className={styles.string}>"Authorization: Bearer $API_KEY"</span> \{"\n"}
        {"  "}-H <span className={styles.string}>"Content-Type: application/json"</span> \{"\n"}
        {"  "}-d <span className={styles.string}>{'\'{"external_id":"my-assistant","name":"My Assistant"}\''}</span>
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
        {"\n"}curl -X POST http://localhost:8080/v1/memories/ \{"\n"}
        {"  "}-H <span className={styles.string}>"Authorization: Bearer $API_KEY"</span> \{"\n"}
        {"  "}-H <span className={styles.string}>"Content-Type: application/json"</span> \{"\n"}
        {"  "}-d <span className={styles.string}>{'\'{"agent_id":"$AGENT_ID",'}</span>{"\n"}
        {"    "}<span className={styles.string}>{'  "content":"User prefers TypeScript",'}</span>{"\n"}
        {"    "}<span className={styles.string}>{'  "type":"preference",'}</span>{"\n"}
        {"    "}<span className={styles.string}>{'  "confidence":0.9}\''}</span>
        {"\n\n"}
        <span className={styles.comment}># Recall with hybrid retrieval</span>
        {"\n"}curl <span className={styles.string}>"http://localhost:8080/v1/memories/recall?query=language+preferences&agent_id=$AGENT_ID"</span> \{"\n"}
        {"  "}-H <span className={styles.string}>"Authorization: Bearer $API_KEY"</span>
      </>
    ),
  },
];

const langchainSteps = [
  {
    num: 1,
    title: "Install",
    label: "terminal",
    code: (
      <>
        <span className={styles.comment}># Requires a running Hakuya server — see Python SDK tab</span>
        {"\n"}pip install langchain-engram
      </>
    ),
  },
  {
    num: 2,
    title: "Drop-in chat memory",
    label: "python",
    code: (
      <>
        <span className={styles.keyword}>from</span> langchain_engram{" "}
        <span className={styles.keyword}>import</span> EngramChatMemory{"\n"}
        <span className={styles.keyword}>from</span> langchain.chains{" "}
        <span className={styles.keyword}>import</span> ConversationChain{"\n"}
        <span className={styles.keyword}>from</span> langchain_openai{" "}
        <span className={styles.keyword}>import</span> ChatOpenAI{"\n\n"}
        memory = EngramChatMemory({"\n"}
        {"    "}agent_id=<span className={styles.string}>"your-agent-id"</span>,{"\n"}
        {"    "}api_key=<span className={styles.string}>"mk_..."</span>,{"\n"}
        {"    "}base_url=<span className={styles.string}>"http://localhost:8080"</span>,{"\n"}
        ){"\n\n"}
        chain = ConversationChain(llm=ChatOpenAI(), memory=memory){"\n\n"}
        <span className={styles.comment}># Memories persist across sessions in Hakuya</span>
        {"\n"}chain.predict(input=<span className={styles.string}>"I always prefer dark mode"</span>){"\n"}
        chain.predict(input=<span className={styles.string}>"What are my display preferences?"</span>){"\n"}
        <span className={styles.comment}># → recalls from Hakuya, not RAM</span>
      </>
    ),
  },
  {
    num: 3,
    title: "Memory-backed retriever",
    label: "python",
    code: (
      <>
        <span className={styles.keyword}>from</span> langchain_engram{" "}
        <span className={styles.keyword}>import</span> EngramRetriever{"\n"}
        <span className={styles.keyword}>from</span> langchain.chains{" "}
        <span className={styles.keyword}>import</span> RetrievalQA{"\n\n"}
        retriever = EngramRetriever({"\n"}
        {"    "}agent_id=<span className={styles.string}>"your-agent-id"</span>,{"\n"}
        {"    "}api_key=<span className={styles.string}>"mk_..."</span>,{"\n"}
        {"    "}base_url=<span className={styles.string}>"http://localhost:8080"</span>,{"\n"}
        {"    "}top_k=<span className={styles.num}>5</span>,{"\n"}
        {"    "}min_confidence=<span className={styles.num}>0.6</span>,{"\n"}
        ){"\n\n"}
        qa = RetrievalQA.from_chain_type(llm=ChatOpenAI(), retriever=retriever){"\n"}
        answer = qa.invoke({"{"}<span className={styles.string}>"query"</span>: <span className={styles.string}>"display preferences"</span>{"}"})
      </>
    ),
  },
];

const mcpSteps = [
  {
    num: 1,
    title: "Connect your agent — no install",
    label: "terminal",
    code: (
      <>
        <span className={styles.comment}># Point any MCP client at Hakuya — no install, no config file</span>
        {"\n"}claude mcp add --transport http engram \{"\n"}
        {"  "}<span className={styles.string}>"https://console.hakuya.ai/mcp?agent_id=your-agent-id"</span> \{"\n"}
        {"  "}--header <span className={styles.string}>"Authorization: Bearer mk_..."</span>
      </>
    ),
  },
  {
    num: 2,
    title: "Self-hosting? Point at your own server",
    label: "terminal",
    code: (
      <>
        <span className={styles.comment}># Every Hakuya server exposes a built-in /mcp endpoint</span>
        {"\n"}claude mcp add --transport http engram \{"\n"}
        {"  "}<span className={styles.string}>"https://your-engram-host/mcp?agent_id=your-agent-id"</span> \{"\n"}
        {"  "}--header <span className={styles.string}>"Authorization: Bearer mk_..."</span>
      </>
    ),
  },
  {
    num: 3,
    title: "Your agent now has memory",
    label: "claude",
    code: (
      <>
        <span className={styles.comment}># 37 memory tools appear in Claude, Cursor, Windsurf…</span>
        {"\n"}
        <span className={styles.comment}># remember · recall · recall_graph · get_hot_context · …</span>
        {"\n\n"}
        <span className={styles.string}>"Remember that I prefer dark mode"</span>
        {"\n"}
        <span className={styles.comment}># → stored, typed, confidence-scored</span>
        {"\n\n"}
        <span className={styles.string}>"What are my display preferences?"</span>
        {"\n"}
        <span className={styles.comment}># → recalled across sessions, not RAM</span>
      </>
    ),
  },
];

const TABS = [
  { id: "python", label: "Python SDK" },
  { id: "mcp", label: "MCP" },
  { id: "langchain", label: "LangChain" },
  { id: "rest", label: "REST API" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Quickstart() {
  const [activeTab, setActiveTab] = useState<TabId>("python");
  const steps =
    activeTab === "python"
      ? pythonSteps
      : activeTab === "mcp"
      ? mcpSteps
      : activeTab === "langchain"
      ? langchainSteps
      : restSteps;

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

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
        >
          <p className={styles.ctaText}>
            Ready to go deeper? The full docs cover memory types, scopes,
            confidence, the graph, and the complete API reference.
          </p>
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            Read the docs
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
