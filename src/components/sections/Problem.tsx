import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Problem.module.css";

const BAD_RESPONSE =
  `"You're on the Basic plan, so this feature isn't available on your tier. You'd need to upgrade to access it."`;

const GOOD_RESPONSE =
  `"My records show Basic plan, but that entry is 8 months old and my confidence is low — it may be stale. Let me verify your current plan before I answer."`;

function useTypewriter(text: string, started: boolean, delayMs: number, speed = 35) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!started) return;
    setDisplayed("");
    let i = 0;
    let timerId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;
    timerId = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(intervalId);
      }, speed);
    }, delayMs);
    return () => {
      clearTimeout(timerId);
      clearInterval(intervalId);
    };
  }, [started, text, delayMs, speed]);
  return displayed;
}

function useCountdown(from: number, to: number, started: boolean, delayMs: number, durationMs = 2000) {
  const [value, setValue] = useState(from);
  useEffect(() => {
    if (!started) return;
    setValue(from);
    let rafId: number;
    const timerId = setTimeout(() => {
      const startTime = performance.now();
      const diff = from - to;
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / durationMs, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(from - diff * eased);
        if (t < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }, delayMs);
    return () => {
      clearTimeout(timerId);
      cancelAnimationFrame(rafId);
    };
  }, [started, from, to, delayMs, durationMs]);
  return value.toFixed(2);
}

export function ProblemScenario({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const badTyping = useTypewriter(BAD_RESPONSE, isInView, 600, 35);
  const confidence = useCountdown(1.0, 0.31, isInView, 700, 2000);
  const goodTyping = useTypewriter(GOOD_RESPONSE, isInView, 4000, 35);

  const badDone = badTyping.length >= BAD_RESPONSE.length;
  const goodDone = goodTyping.length >= GOOD_RESPONSE.length;

  useEffect(() => {
    if (!goodDone) return;
    const id = setTimeout(onDone, 3200);
    return () => clearTimeout(id);
  }, [goodDone, onDone]);

  return (
    <div ref={ref} className={styles.scenario}>
      {/* Shared memory object */}
      <div className={styles.memCard}>
        <div className={styles.memCardInner}>
          <span className={styles.memType}>SEMANTIC · PREFERENCE</span>
          <p className={styles.memContent}>"Customer account: Basic Plan"</p>
          <div className={styles.memMeta}>
            <span>Stored 8 months ago</span>
            <span className={styles.dot}>·</span>
            <span>Source: CRM sync</span>
          </div>
        </div>
        <div className={styles.memArrows}>
          <div className={styles.arrow} />
          <div className={styles.arrow} />
        </div>
      </div>

      {/* Two panels */}
      <div className={styles.panels}>
        {/* ── Without Hakuya ── */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <span className={styles.panelLabel}>Without Hakuya</span>
            <div className={styles.confRow}>
              <span className={styles.confKey}>Confidence</span>
              <span className={`${styles.confVal} ${styles.confHigh}`}>1.00</span>
            </div>
          </div>
          <div className={styles.terminal}>
            <span className={styles.termPrompt}>agent</span>
            <p className={styles.termText}>
              {badTyping}
              {isInView && !badDone && <span className={styles.caret} />}
            </p>
          </div>
          {badDone && (
            <motion.div
              className={styles.verdict}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M6.5 3.5v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="6.5" cy="9.5" r="0.6" fill="currentColor" />
              </svg>
              Confident and wrong
            </motion.div>
          )}
        </div>

        {/* ── With Hakuya ── */}
        <div className={`${styles.panel} ${styles.panelAccent}`}>
          <div className={styles.panelHead}>
            <span className={`${styles.panelLabel} ${styles.panelLabelAccent}`}>
              With Hakuya
            </span>
            <div className={styles.confRow}>
              <span className={styles.confKey}>Confidence</span>
              <motion.span
                className={`${styles.confVal} ${styles.confLow}`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
              >
                {confidence}
              </motion.span>
              <motion.span
                className={styles.decayTag}
                initial={{ opacity: 0, x: -4 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 2.7 }}
              >
                ↓ decayed
              </motion.span>
            </div>
            <motion.div
              className={styles.staleWarning}
              initial={{ opacity: 0, y: 4 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2.9, duration: 0.3 }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1.5L11 10.5H1L6 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M6 5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="6" cy="8.5" r="0.5" fill="currentColor" />
              </svg>
              Staleness threshold exceeded — flagged for review
            </motion.div>
          </div>
          <div className={styles.terminal}>
            <span className={styles.termPrompt}>agent</span>
            <p className={styles.termText}>
              {goodTyping}
              {isInView && goodTyping.length > 0 && !goodDone && (
                <span className={styles.caret} />
              )}
              {isInView && goodTyping.length === 0 && (
                <span className={styles.waiting}>…</span>
              )}
            </p>
          </div>
          {goodDone && (
            <motion.div
              className={`${styles.verdict} ${styles.verdictGood}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M3.5 6.5l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Appropriately uncertain
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Problems cards ──────────────────────────────────────

const PAIN_POINTS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2v7l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "It keeps forgetting",
    body: "You want your support agent to remember that a client prefers email, dislikes upsells, and had a billing issue last quarter. Instead, every session starts blank. Users repeat themselves. The agent never improves.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "When it remembers, it's wrong",
    body: "You add a memory store. Now the agent confidently cites preferences from a year ago — a plan the customer upgraded from, a stack they stopped using, a constraint that no longer applies. Persistence without decay is just confident misinformation.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 6v4M9 12v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "You can't see what it knows",
    body: "There's no way to inspect what the agent believes, how old that belief is, or how confident it should be. When it gives a wrong answer, you're digging through logs trying to trace a memory that was written months ago.",
  },
] as const;

export default function Problem() {
  return (
    <section className={styles.section} id="problem">
      <div className="container">
        <div className={styles.header}>
          <p className={styles.tag}>The Problem</p>
          <h2 className={styles.heading}>
            Giving agents memory is easy.
            <br />
            Making that memory reliable is not.
          </h2>
          <p className={styles.sub}>
            Most teams reach for a vector database and call it done. What they get is
            an agent that either forgets everything or remembers the wrong thing forever.
          </p>
        </div>

        <div className={styles.cards}>
          {PAIN_POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className={styles.cardIcon}>{p.icon}</div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardBody}>{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
