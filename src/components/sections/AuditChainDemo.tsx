import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./AuditChainDemo.module.css";

/**
 * A live, tamperable SHA-256 hash chain — the same construction Hakuya
 * writes for every memory mutation. All hashes are computed in the
 * visitor's browser with Web Crypto. Edit a record, watch the chain break,
 * run verification, watch it get caught.
 */

interface Record_ {
  seq: number;
  type: string;
  content: string;
}

const PRISTINE: Record_[] = [
  { seq: 1, type: "created", content: 'memory "Prefers TypeScript" · conf 0.90' },
  { seq: 2, type: "reinforced", content: "conf 0.90 → 0.94 · used in reply" },
  { seq: 3, type: "contradicted", content: '"now prefers Go" · conf 0.94 → 0.61' },
  { seq: 4, type: "reviewed", content: "contradiction resolved · prior belief superseded" },
  { seq: 5, type: "redacted", content: "GDPR erasure · subject anchor purged" },
];

const GENESIS = "0000000000000000";

async function sha256Hex(text: string): Promise<string> {
  // crypto.subtle is undefined on non-secure origins; degrade to a
  // deterministic FNV-1a stamp so the demo never crashes the page.
  if (typeof crypto === "undefined" || !crypto.subtle) {
    let h1 = 0x811c9dc5;
    let h2 = 0xcbf29ce4;
    for (let i = 0; i < text.length; i++) {
      h1 = Math.imul(h1 ^ text.charCodeAt(i), 0x01000193);
      h2 = Math.imul(h2 ^ text.charCodeAt(i), 0x01000197);
    }
    return (
      (h1 >>> 0).toString(16).padStart(8, "0") + (h2 >>> 0).toString(16).padStart(8, "0")
    ).repeat(4);
  }
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function short(hash: string) {
  return hash ? `${hash.slice(0, 6)}…${hash.slice(-4)}` : "…";
}

async function computeChain(records: Record_[]): Promise<string[]> {
  const hashes: string[] = [];
  let prev = GENESIS;
  for (const r of records) {
    const h = await sha256Hex(`${r.seq}|${r.type}|${r.content}|${prev}`);
    hashes.push(h);
    prev = h;
  }
  return hashes;
}

type Verdict =
  | { state: "idle" }
  | { state: "scanning"; at: number }
  | { state: "valid" }
  | { state: "broken"; at: number };

export default function AuditChainDemo() {
  const [records, setRecords] = useState<Record_[]>(PRISTINE);
  const [storedHashes, setStoredHashes] = useState<string[]>([]);
  const [liveHashes, setLiveHashes] = useState<string[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [verdict, setVerdict] = useState<Verdict>({ state: "idle" });
  const [hint, setHint] = useState<"idle" | "teasing" | "your-turn">("idle");
  const scanTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const teaserRan = useRef(false);
  const teaserTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // stored hashes = what was sealed at append time (pristine content)
  useEffect(() => {
    computeChain(PRISTINE).then((h) => {
      setStoredHashes(h);
      setLiveHashes(h);
    });
  }, []);

  // live hashes = recomputed from current (possibly tampered) content
  useEffect(() => {
    let cancelled = false;
    computeChain(records).then((h) => {
      if (!cancelled) setLiveHashes(h);
    });
    return () => {
      cancelled = true;
    };
  }, [records]);

  const firstBroken = useMemo(() => {
    if (!storedHashes.length || !liveHashes.length) return -1;
    for (let i = 0; i < records.length; i++) {
      if (storedHashes[i] !== liveHashes[i]) return i;
    }
    return -1;
  }, [storedHashes, liveHashes, records.length]);

  // the scan verdict must reflect the chain state at scan end, not at click time
  const firstBrokenRef = useRef(firstBroken);
  useEffect(() => {
    firstBrokenRef.current = firstBroken;
  }, [firstBroken]);

  const tampered = firstBroken !== -1;

  const setContent = (i: number, content: string) => {
    setVerdict({ state: "idle" });
    setRecords((rs) => rs.map((r, j) => (j === i ? { ...r, content } : r)));
  };

  const reset = () => {
    teaserTimers.current.forEach(clearTimeout);
    teaserTimers.current = [];
    if (hint === "teasing") setHint("your-turn");
    if (scanTimer.current) clearTimeout(scanTimer.current);
    setRecords(PRISTINE);
    setEditing(null);
    setVerdict({ state: "idle" });
  };

  // ── attract loop: tamper with ourselves once, on first scroll into view ──
  const cancelTeaser = useCallback(() => {
    if (!teaserTimers.current.length) return;
    teaserTimers.current.forEach(clearTimeout);
    teaserTimers.current = [];
    if (scanTimer.current) clearTimeout(scanTimer.current);
    setRecords(PRISTINE);
    setVerdict({ state: "idle" });
    setHint("your-turn");
  }, []);

  const startTeaser = useCallback(() => {
    if (teaserRan.current) return;
    teaserRan.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHint("your-turn");
      return;
    }
    setHint("teasing");
    const t = (ms: number, fn: () => void) =>
      teaserTimers.current.push(setTimeout(fn, ms));
    // forge record #3 → chain snaps
    t(900, () =>
      setRecords((rs) =>
        rs.map((r, i) => (i === 2 ? { ...r, content: "conf 0.94 → 0.99 ⟵ forged" } : r)),
      ),
    );
    // scripted verification scan (record #3 is index 2)
    t(2100, () => setVerdict({ state: "scanning", at: 0 }));
    t(2340, () => setVerdict({ state: "scanning", at: 1 }));
    t(2580, () => setVerdict({ state: "scanning", at: 2 }));
    t(2880, () => setVerdict({ state: "broken", at: 2 }));
    // heal, hand over
    t(5600, () => {
      teaserTimers.current = [];
      setRecords(PRISTINE);
      setVerdict({ state: "idle" });
      setHint("your-turn");
    });
  }, []);

  useEffect(() => () => teaserTimers.current.forEach(clearTimeout), []);

  const verify = useCallback(() => {
    cancelTeaser();
    if (scanTimer.current) clearTimeout(scanTimer.current);
    setEditing(null);
    let i = 0;
    const step = () => {
      const broken = firstBrokenRef.current;
      if (i < records.length && (broken === -1 || i <= broken)) {
        setVerdict({ state: "scanning", at: i });
        i++;
        scanTimer.current = setTimeout(step, 240);
      } else {
        setVerdict(broken === -1 ? { state: "valid" } : { state: "broken", at: broken });
      }
    };
    step();
  }, [records.length, cancelTeaser]);

  useEffect(() => () => {
    if (scanTimer.current) clearTimeout(scanTimer.current);
  }, []);

  const blockState = (i: number): "ok" | "tampered" | "orphaned" | "scanning" => {
    if (verdict.state === "scanning" && verdict.at === i) return "scanning";
    if (firstBroken === -1) return "ok";
    if (i === firstBroken) return "tampered";
    if (i > firstBroken) return "orphaned";
    return "ok";
  };

  const stateClass: Record<string, string> = {
    ok: "",
    scanning: styles.stateScanning,
    tampered: styles.stateTampered,
    orphaned: styles.stateOrphaned,
  };

  return (
    <motion.div
      className={styles.wrap}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      onViewportEnter={startTeaser}
      transition={{ duration: 0.55 }}
    >
      <div className={styles.head}>
        <div>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>Don&apos;t trust it. Verify it.</h3>
            <span
              className={`${styles.badge} ${hint === "teasing" ? styles.badgeTeasing : ""}`}
            >
              <span className={styles.badgeDot} aria-hidden="true" />
              {hint === "teasing"
                ? "watch — forging record #3…"
                : hint === "your-turn"
                  ? "your turn — click any record"
                  : "interactive demo"}
            </span>
          </div>
          <p className={styles.sub}>
            This is a real SHA-256 hash chain, computed in your browser — the same
            construction Hakuya seals around every memory mutation.{" "}
            <strong>Click any record and change it.</strong> Then run verification.
          </p>
        </div>
        <div className={styles.controls}>
          <button
            className={styles.btnVerify}
            onClick={verify}
            disabled={verdict.state === "scanning"}
            aria-busy={verdict.state === "scanning"}
          >
            Verify chain
          </button>
          <button
            className={styles.btnReset}
            onClick={reset}
            disabled={!tampered && verdict.state === "idle"}
          >
            Restore
          </button>
        </div>
      </div>

      <div className={styles.chain}>
        {records.map((r, i) => {
          const state = blockState(i);
          return (
            <div key={r.seq} className={styles.unit}>
              {i > 0 && (
                <div
                  className={`${styles.link} ${
                    firstBroken !== -1 && i > firstBroken ? styles.linkBroken : ""
                  }`}
                  aria-hidden="true"
                >
                  <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                    <rect x="1" y="4" width="9" height="6" rx="3" stroke="currentColor" strokeWidth="1.4" />
                    <rect x="12" y="4" width="9" height="6" rx="3" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </div>
              )}
              <div
                className={`${styles.block} ${stateClass[state]}`}
                role={editing === i ? undefined : "button"}
                tabIndex={editing === i ? undefined : 0}
                aria-label={editing === i ? undefined : `Edit audit record ${r.seq} (${r.type})`}
                onClick={() => {
                  cancelTeaser();
                  if (verdict.state !== "scanning") setEditing(i);
                }}
                onKeyDown={(e) => {
                  if (editing === i) return;
                  if ((e.key === "Enter" || e.key === " ") && verdict.state !== "scanning") {
                    e.preventDefault();
                    cancelTeaser();
                    setEditing(i);
                  }
                }}
              >
                {state === "ok" && editing !== i && (
                  <span className={styles.editHint} aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <path d="M11.3 1.7l3 3L5 14H2v-3l9.3-9.3z" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
                <div className={styles.blockHead}>
                  <span className={styles.seq}>#{r.seq}</span>
                  <span className={styles.type}>{r.type}</span>
                  {state === "tampered" && <span className={styles.flag}>⚠ modified</span>}
                  {state === "orphaned" && <span className={styles.flagDim}>✗ prev_hash</span>}
                </div>

                {editing === i ? (
                  <input
                    className={styles.input}
                    value={r.content}
                    autoFocus
                    onChange={(e) => setContent(i, e.target.value)}
                    onBlur={() => setEditing(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === "Escape") setEditing(null);
                    }}
                  />
                ) : (
                  <p className={styles.content}>{r.content}</p>
                )}

                <div className={styles.hashes}>
                  <span>
                    prev <code>{short(i === 0 ? GENESIS : storedHashes[i - 1] ?? "")}</code>
                  </span>
                  <span className={state === "tampered" ? styles.hashBad : ""}>
                    hash <code>{short(liveHashes[i] ?? "")}</code>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.terminal} aria-live="polite">
        <span className={styles.prompt}>$</span>
        <span className={styles.cmd}>GET /v1/audit/verify</span>
        <span className={styles.arrow}>→</span>
        {verdict.state === "idle" && <span className={styles.dim}>awaiting verification…</span>}
        {verdict.state === "scanning" && (
          <span className={styles.dim}>recomputing chain… block {verdict.at + 1}/{records.length}</span>
        )}
        {verdict.state === "valid" && (
          <span className={styles.ok}>{'{"valid": true, "entries": 5}'}</span>
        )}
        {verdict.state === "broken" && (
          <span className={styles.bad}>
            {`{"valid": false, "broken_at": ${verdict.at + 1}, "reason": "row_hash mismatch"}`}
          </span>
        )}
      </div>
    </motion.div>
  );
}
