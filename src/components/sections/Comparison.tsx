import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import styles from "./Comparison.module.css";

type CellVal =
  | { status: "yes"; note?: string }
  | { status: "no"; note?: string }
  | { status: "partial"; note: string }
  | { status: "planned"; note?: string };

interface Row {
  feature: string;
  sub?: string;
  mem0: CellVal;
  zep: CellVal;
  engram: CellVal;
}

interface Group {
  category: string;
  rows: Row[];
}

const groups: Group[] = [
  {
    category: "Data Model",
    rows: [
      {
        feature: "Memory architecture",
        mem0: { status: "partial", note: "Vector-first; graph is an add-on requiring external Neo4j" },
        zep: { status: "partial", note: "Temporal knowledge graph (Graphiti); no semantic/episodic distinction" },
        engram: { status: "yes", note: "4-type cognitive model — semantic, episodic, procedural, working" },
      },
      {
        feature: "Cognitive memory types",
        sub: "Semantic, episodic, procedural memory as distinct first-class types",
        mem0: { status: "no", note: "Stores facts extracted from conversations; no type distinction" },
        zep: { status: "no", note: "Graph nodes and edges only; no cognitive type model" },
        engram: { status: "yes", note: "All four types, each with distinct storage and retrieval semantics" },
      },
    ],
  },
  {
    category: "Memory Quality",
    rows: [
      {
        feature: "Calibrated confidence scoring",
        sub: "Each memory carries a probabilistically meaningful confidence, not just a timestamp",
        mem0: { status: "no", note: "ADD / UPDATE / DELETE operations only; no confidence value on memories" },
        zep: { status: "no", note: "Temporal metadata (valid_at / invalid_at) tracks when, not how certain" },
        engram: { status: "yes", note: "Log-odds arithmetic — confidence changes with reinforcement, contradiction, and decay" },
      },
      {
        feature: "Memory decay",
        sub: "Stale, unused beliefs automatically lose confidence over time",
        mem0: { status: "no", note: "No configurable expiry or decay; memories stay at full weight indefinitely" },
        zep: { status: "no", note: "Temporal tracking does not expire or decay facts — manual deletion only" },
        engram: { status: "yes", note: "Mathematically principled decay formula with competition-aware suppression" },
      },
      {
        feature: "Contradiction detection",
        sub: "When two beliefs conflict, the system detects and resolves the tension",
        mem0: { status: "partial", note: "LLM reconciliation detects duplicates; does not model semantic tension" },
        zep: { status: "partial", note: "Temporal invalidation marks superseded facts; no semantic conflict analysis" },
        engram: { status: "yes", note: "LLM tension analysis with three resolution strategies: hard demote, temporal archive, contextual coexist" },
      },
    ],
  },
  {
    category: "Retrieval",
    rows: [
      {
        feature: "Graph retrieval",
        sub: "Traversal across entity relationships beyond single-hop similarity",
        mem0: { status: "partial", note: "Hybrid mode available but requires a separately hosted Neo4j instance" },
        zep: { status: "yes", note: "Native BFS traversal with temporal consistency; requires graph DB infrastructure" },
        engram: { status: "yes", note: "Built-in hybrid retrieval — pgvector + graph up to 2 hops, zero extra infrastructure" },
      },
      {
        feature: "Retrieval ranking model",
        sub: "How results are scored and ordered",
        mem0: { status: "partial", note: "Vector cosine similarity; graph mode adds entity score" },
        zep: { status: "partial", note: "Graph score + cosine + BM25 full-text; no confidence weighting" },
        engram: { status: "yes", note: "Relevance × recency × confidence — higher-confidence memories surface first" },
      },
    ],
  },
  {
    category: "Reliability & Compliance",
    rows: [
      {
        feature: "Self-hosted",
        sub: "Full functionality without a managed cloud dependency",
        mem0: { status: "yes", note: "Docker Compose (FastAPI + PostgreSQL + optional Neo4j)" },
        zep: { status: "no", note: "Community Edition deprecated April 2025; Graphiti library requires self-assembly" },
        engram: { status: "yes", note: "Single Go binary — no runtime dependencies beyond Postgres" },
      },
      {
        feature: "Knowledge health monitoring",
        sub: "Visibility into the quality and trustworthiness of an agent's knowledge state",
        mem0: { status: "partial", note: "Analytics dashboard — latency, token usage, accuracy metrics" },
        zep: { status: "no", note: "No health monitoring; temporal logs require manual querying" },
        engram: { status: "yes", note: "Confidence distribution, contradiction rate, staleness indicators, learning velocity" },
      },
      {
        feature: "Mutation audit trail",
        sub: "Explainable record of how every belief was created or changed",
        mem0: { status: "partial", note: "Operation log (ADD / UPDATE / DELETE / NOOP) without causality chain" },
        zep: { status: "partial", note: "Temporal provenance tracks ingest_at / valid_at / invalid_at per fact" },
        engram: { status: "yes", note: "Full mutation history with evidence source, confidence delta, and causal link" },
      },
    ],
  },
];

function Cell({ val }: { val: CellVal }) {
  if (val.status === "yes") {
    return (
      <div className={styles.cell}>
        <span className={styles.iconYes}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 6.5l3 3 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {val.note && <span className={styles.cellNote}>{val.note}</span>}
      </div>
    );
  }
  if (val.status === "no") {
    return (
      <div className={styles.cell}>
        <span className={styles.iconNo}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M3 3l7 7M10 3l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        {val.note && <span className={styles.cellNote}>{val.note}</span>}
      </div>
    );
  }
  if (val.status === "partial") {
    return (
      <div className={styles.cell}>
        <span className={styles.iconPartial}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 6.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        {val.note && <span className={styles.cellNote}>{val.note}</span>}
      </div>
    );
  }
  return (
    <div className={styles.cell}>
      <span className={styles.planned}>Planned</span>
      {val.note && <span className={styles.cellNote}>{val.note}</span>}
    </div>
  );
}

export default function Comparison() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          tag="Comparison"
          title="Where others stop, Engram starts"
          description="Mem0 and Zep solve retrieval. Engram solves reliability — tracking not just what agents know, but how confident they should be, when to doubt it, and why it changed."
        />
        <motion.div
          className={styles.tableWrap}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.featureCol}>Capability</th>
                <th>Mem0</th>
                <th>Zep</th>
                <th className={styles.engramCol}>Engram</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <>
                  <tr key={group.category} className={styles.groupRow}>
                    <td colSpan={4} className={styles.groupLabel}>{group.category}</td>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.feature} className={styles.dataRow}>
                      <td className={styles.featureCell}>
                        <span className={styles.featureName}>{row.feature}</span>
                        {row.sub && <span className={styles.featureSub}>{row.sub}</span>}
                      </td>
                      <td><Cell val={row.mem0} /></td>
                      <td><Cell val={row.zep} /></td>
                      <td className={styles.engramCol}><Cell val={row.engram} /></td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className={styles.footnote}>
          Based on public documentation as of May 2026. Zep Community Edition was deprecated in April 2025.
        </p>
      </div>
    </section>
  );
}
