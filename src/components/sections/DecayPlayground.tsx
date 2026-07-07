import { useEffect, useRef, useState } from "react";
import styles from "./DecayPlayground.module.css";

/**
 * Live decay playground in the hero. Two tracks tell the three-axis story:
 * EVIDENCE (how strongly a belief is supported) holds steady over time and moves
 * only on real observations, while FRESHNESS (currency) decays as the belief goes
 * unseen. When freshness crosses the stale line the memory is flagged for
 * re-verification — the evidence was never in question. Salience (retrieval rank)
 * = evidence × freshness.
 *
 * Every change also appends a hash-linked block to a tamper-evident audit chain
 * beneath the chart — memory that evolves *and* proves every change. Forget
 * crypto-shreds the memory while the audit trail retains the proof it happened.
 */

const W = 440;
const H = 170;
const PAD_TOP = 10;
const PAD_BOTTOM = 16;
const THRESHOLD = 0.4;
const FLOOR = 0.05;
const DECAY_PER_SEC = 0.085; // λ scaled: ~1 month of idle decay ≈ 6 s
const SAMPLES = 150;
const SAMPLE_HZ = 30;
const CHAIN_MAX = 7; // visible audit blocks (older scroll off the left)

type FreshState = "fresh" | "aging" | "stale";
type AuditKind =
  | "written"
  | "reinforced"
  | "contradicted"
  | "flagged"
  | "reverified"
  | "erased";

interface Block {
  seq: number;
  kind: AuditKind;
  hash: string;
}

const EVENT_LABEL: Record<string, string> = {
  reinforced: "reinforced · evidence up, freshness restored",
  contradicted: "contradicted · evidence drops",
  flagged: "stale — agent re-verifies before trusting",
  reverified: "re-verified · fresh again, evidence unchanged",
  written: "memory written · source: CRM sync",
  erased: "erased · content shredded, proof retained",
};

// FNV-1a → 6 hex chars. Chained (each hash feeds the next) so the row is a real
// hash chain, not decoration.
function shortHash(str: string): string {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h.toString(16).padStart(8, "0").slice(0, 6);
}

function yFor(v: number) {
  const usable = H - PAD_TOP - PAD_BOTTOM;
  return PAD_TOP + (1 - v) * usable;
}

function freshFor(freshness: number): FreshState {
  if (freshness >= 0.7) return "fresh";
  if (freshness >= THRESHOLD) return "aging";
  return "stale";
}

export default function DecayPlayground() {
  const evRef = useRef<SVGPathElement>(null);
  const frRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const evDotRef = useRef<SVGCircleElement>(null);
  const frDotRef = useRef<SVGCircleElement>(null);

  // simulation lives in refs; React state only for low-frequency labels
  const sim = useRef({
    evidence: 0.92,
    freshness: 1.0,
    ev: [] as number[],
    fr: [] as number[],
    sinceSample: 0,
    sinceInteraction: 99,
    flaggedFor: 0,
    wasStale: false,
    erased: false,
    auditSeq: 0,
    prevHash: "genesis",
  });

  const [label, setLabel] = useState({
    evidence: 0.92,
    freshness: 1.0,
    state: "fresh" as FreshState,
    event: EVENT_LABEL.written,
  });
  const [chain, setChain] = useState<Block[]>([]);
  const [erased, setErased] = useState(false);
  const labelTick = useRef(0);

  const appendAudit = (kind: AuditKind) => {
    const s = sim.current;
    s.auditSeq += 1;
    const seq = s.auditSeq;
    const hash = shortHash(s.prevHash + kind + seq);
    s.prevHash = hash;
    setChain((c) => [...c, { seq, kind, hash }].slice(-CHAIN_MAX));
  };

  const bump = (kind: "reinforce" | "contradict") => {
    const s = sim.current;
    if (s.erased) return;
    s.sinceInteraction = 0;
    if (kind === "reinforce") {
      // new supporting evidence: strengthens the belief AND refreshes it
      s.evidence = Math.min(0.97, s.evidence + (1 - s.evidence) * 0.5);
      s.freshness = 1.0;
      setLabel((l) => ({ ...l, event: EVENT_LABEL.reinforced }));
      appendAudit("reinforced");
    } else {
      // contradicting evidence: weakens the belief; freshness keeps decaying
      s.evidence = Math.max(FLOOR, s.evidence * 0.45 - 0.05);
      setLabel((l) => ({ ...l, event: EVENT_LABEL.contradicted }));
      appendAudit("contradicted");
    }
  };

  const forget = () => {
    const s = sim.current;
    if (s.erased) return;
    s.erased = true;
    setErased(true);
    setLabel((l) => ({ ...l, event: EVENT_LABEL.erased }));
    appendAudit("erased");
  };

  const reset = () => {
    const s = sim.current;
    s.evidence = 0.92;
    s.freshness = 1.0;
    s.ev = Array.from({ length: SAMPLES }, () => 0.92);
    s.fr = Array.from({ length: SAMPLES }, () => 1.0);
    s.sinceSample = 0;
    s.sinceInteraction = 99;
    s.flaggedFor = 0;
    s.wasStale = false;
    s.erased = false;
    s.auditSeq = 0;
    s.prevHash = "genesis";
    setErased(false);
    setChain([]);
    setLabel({ evidence: 0.92, freshness: 1.0, state: "fresh", event: EVENT_LABEL.written });
    appendAudit("written");
  };

  useEffect(() => {
    const s = sim.current;
    s.ev = Array.from({ length: SAMPLES }, () => 0.92);
    s.fr = Array.from({ length: SAMPLES }, () => 1.0);
    if (s.auditSeq === 0) appendAudit("written"); // genesis block (guard StrictMode double-mount)

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = false;
    let last = 0;

    const pathFor = (pts: number[]) => {
      const step = W / (SAMPLES - 1);
      let d = "";
      for (let i = 0; i < pts.length; i++) {
        d += `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${yFor(pts[i]).toFixed(1)}`;
      }
      return d;
    };

    const render = () => {
      const evD = pathFor(s.ev);
      const frD = pathFor(s.fr);
      evRef.current?.setAttribute("d", evD);
      frRef.current?.setAttribute("d", frD);
      areaRef.current?.setAttribute("d", `${frD}L${W},${H}L0,${H}Z`);
      evDotRef.current?.setAttribute("cy", String(yFor(s.ev[s.ev.length - 1])));
      frDotRef.current?.setAttribute("cy", String(yFor(s.fr[s.fr.length - 1])));
    };

    const tick = (dt: number) => {
      if (s.erased) return; // frozen once shredded
      s.sinceInteraction += dt;
      // Only freshness decays with elapsed time; evidence is invariant to time —
      // it moves only on reinforcement / contradiction.
      s.freshness = FLOOR + (s.freshness - FLOOR) * Math.exp(-DECAY_PER_SEC * dt);

      // self-narrating loop: once stale for a while, a recall re-verifies it
      const stale = s.freshness < THRESHOLD;
      if (stale && !s.wasStale) {
        setLabel((l) => ({ ...l, event: EVENT_LABEL.flagged }));
        appendAudit("flagged");
        s.flaggedFor = 0;
      }
      if (stale) {
        s.flaggedFor += dt;
        if (s.flaggedFor > 2.4 && s.sinceInteraction > 3) {
          s.freshness = 1.0; // re-verification restores freshness…
          setLabel((l) => ({ ...l, event: EVENT_LABEL.reverified })); // …evidence untouched
          appendAudit("reverified");
        }
      }
      s.wasStale = s.freshness < THRESHOLD;

      // sampling window
      s.sinceSample += dt;
      const interval = 1 / SAMPLE_HZ;
      while (s.sinceSample >= interval) {
        s.sinceSample -= interval;
        s.ev.push(s.evidence);
        s.fr.push(s.freshness);
        if (s.ev.length > SAMPLES) s.ev.shift();
        if (s.fr.length > SAMPLES) s.fr.shift();
      }

      // low-frequency label refresh
      labelTick.current += dt;
      if (labelTick.current > 0.2) {
        labelTick.current = 0;
        setLabel((l) => {
          const evidence = Math.round(s.evidence * 100) / 100;
          const freshness = Math.round(s.freshness * 100) / 100;
          const state = freshFor(s.freshness);
          return l.evidence === evidence && l.freshness === freshness && l.state === state
            ? l
            : { ...l, evidence, freshness, state };
        });
      }
    };

    const loop = (t: number) => {
      if (!running) return;
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      tick(dt);
      render();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduced) {
      // static snapshot: flat evidence, a pre-drawn freshness decay curve
      for (let i = 0; i < SAMPLES; i++) {
        s.ev[i] = 0.92;
        s.fr[i] = FLOOR + (1.0 - FLOOR) * Math.exp(-2.2 * (i / SAMPLES));
      }
      s.freshness = s.fr[SAMPLES - 1];
      render();
      setLabel({
        evidence: 0.92,
        freshness: Math.round(s.freshness * 100) / 100,
        state: freshFor(s.freshness),
        event: EVENT_LABEL.flagged,
      });
      return;
    }

    const el = evRef.current?.closest("svg");
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.05 },
    );
    if (el) io.observe(el);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stale = label.state === "stale";
  const salience = erased ? 0 : Math.round(label.evidence * label.freshness * 100) / 100;
  const badgeLabel = erased ? "⛌ erased" : stale ? "⚠ stale" : label.state;
  const badgeClass = erased || stale ? "tier_stale" : label.state === "aging" ? "tier_warm" : "tier_hot";
  const total = chain.length ? chain[chain.length - 1].seq : 0;

  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.liveDot} aria-hidden="true" />
        <span className={styles.cardTitle}>live · evidence vs. freshness</span>
        <span className={styles.timeScale}>1 month ≈ 6 s</span>
      </div>

      <div className={`${styles.memChip} ${erased || stale ? styles.memChipStale : ""}`}>
        <div className={styles.memMeta}>
          <span className={styles.memType}>semantic · preference</span>
          <span className={`${styles.tier} ${styles[badgeClass]}`}>{badgeLabel}</span>
        </div>
        <p className={`${styles.memContent} ${erased ? styles.memShredded : ""}`}>
          {erased ? "enc:v1:•• ••• •••••• ••" : '"Customer account: Basic Plan"'}
        </p>
        <div className={styles.memFoot}>
          <span>source: CRM sync</span>
          <span className={styles.confRead}>
            evidence <strong className={styles.conf_hot}>{label.evidence.toFixed(2)}</strong>
            <span className={styles.steady}> · steady</span>
          </span>
        </div>
      </div>

      <svg
        className={styles.chart}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Evidence holding steady while memory freshness decays over time; when freshness crosses the stale threshold the belief is flagged and re-verified"
      >
        <defs>
          <linearGradient id="freshArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1="0" x2={W} y1={yFor(g)} y2={yFor(g)} className={styles.gridline} />
        ))}
        <line x1="0" x2={W} y1={yFor(THRESHOLD)} y2={yFor(THRESHOLD)} className={styles.threshold} />
        <text x={W - 4} y={yFor(THRESHOLD) - 5} className={styles.thresholdLabel} textAnchor="end">
          stale threshold
        </text>
        <path ref={areaRef} fill="url(#freshArea)" />
        <path ref={frRef} className={styles.freshCurve} fill="none" />
        <path ref={evRef} className={styles.evCurve} fill="none" />
        <circle ref={frDotRef} cx={W} r="3.5" className={styles.frTip} />
        <circle ref={evDotRef} cx={W} r="3.5" className={styles.evTip} />
      </svg>

      <div className={styles.readout}>
        <span className={styles.legendItem}>
          <span className={`${styles.swatch} ${styles.swEv}`} /> evidence{" "}
          <strong>{label.evidence.toFixed(2)}</strong>
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.swatch} ${styles.swFr}`} /> freshness{" "}
          <strong>{erased ? "—" : label.freshness.toFixed(2)}</strong>
        </span>
        <span className={styles.legendItem}>
          salience <strong>{erased ? "—" : salience.toFixed(2)}</strong>
        </span>
      </div>

      <div className={styles.audit}>
        <div className={styles.auditHead}>
          <span className={styles.auditTitle}>tamper-evident audit chain</span>
          <span className={styles.verified}>✓ verified · {total} events</span>
        </div>
        <div className={styles.chainRow}>
          {chain.map((b) => (
            <span
              key={b.seq}
              className={`${styles.block} ${styles[`ev_${b.kind}`]}`}
              title={`#${b.seq} · ${b.kind} · ${b.hash}`}
            >
              {b.hash}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.foot}>
        <span className={styles.eventLine} aria-live="polite">
          {label.event}
        </span>
        <div className={styles.actions}>
          {erased ? (
            <button className={styles.btnReset} onClick={reset}>
              ↻ New memory
            </button>
          ) : (
            <>
              <button className={styles.btnReinforce} onClick={() => bump("reinforce")}>
                ↑ Reinforce
              </button>
              <button className={styles.btnContradict} onClick={() => bump("contradict")}>
                ↯ Contradict
              </button>
              <button className={styles.btnForget} onClick={forget}>
                ⌫ Forget
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
