import { useEffect, useRef, useState } from "react";
import styles from "./DecayPlayground.module.css";

/**
 * Live decay playground in the hero: one memory, its confidence decaying in
 * real time on a chart. The visitor can Reinforce or Contradict it and watch
 * tier transitions + the stale flag fire. Left alone, it tells the story on
 * its own: decay → flagged stale → re-verified → decay…
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

type EventKind = "reinforced" | "contradicted" | "flagged" | "reverified";

interface Marker {
  index: number; // sample index (shifts left as window scrolls)
  conf: number;
  kind: EventKind;
}

const EVENT_LABEL: Record<EventKind, string> = {
  reinforced: "reinforced · recall hit",
  contradicted: "contradicted · belief demoted",
  flagged: "stale — agent verifies before trusting",
  reverified: "re-verified · source confirmed",
};

function yFor(conf: number) {
  const usable = H - PAD_TOP - PAD_BOTTOM;
  return PAD_TOP + (1 - conf) * usable;
}

function tierFor(conf: number): "hot" | "warm" | "stale" {
  if (conf >= 0.7) return "hot";
  if (conf >= THRESHOLD) return "warm";
  return "stale";
}

export default function DecayPlayground() {
  const pathRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  // simulation lives in refs; React state only for low-frequency labels
  const sim = useRef({
    conf: 0.92,
    points: [] as number[],
    markers: [] as Marker[],
    sinceSample: 0,
    sinceInteraction: 99,
    flaggedFor: 0,
    wasStale: false,
  });

  const [label, setLabel] = useState({
    conf: 0.92,
    tier: "hot" as "hot" | "warm" | "stale",
    event: "memory written · source: CRM sync" as string,
  });
  const labelTick = useRef(0);

  const bump = (kind: "reinforce" | "contradict") => {
    const s = sim.current;
    s.sinceInteraction = 0;
    if (kind === "reinforce") {
      s.conf = Math.min(0.97, s.conf + (1 - s.conf) * 0.5);
      s.markers.push({ index: s.points.length - 1, conf: s.conf, kind: "reinforced" });
      setLabel((l) => ({ ...l, event: EVENT_LABEL.reinforced }));
    } else {
      s.conf = Math.max(FLOOR, s.conf * 0.45 - 0.05);
      s.markers.push({ index: s.points.length - 1, conf: s.conf, kind: "contradicted" });
      setLabel((l) => ({ ...l, event: EVENT_LABEL.contradicted }));
    }
  };

  useEffect(() => {
    const s = sim.current;
    s.points = Array.from({ length: SAMPLES }, () => 0.92);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = false;
    let last = 0;

    const render = () => {
      const usableW = W;
      const step = usableW / (SAMPLES - 1);
      let d = "";
      for (let i = 0; i < s.points.length; i++) {
        d += `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${yFor(s.points[i]).toFixed(1)}`;
      }
      pathRef.current?.setAttribute("d", d);
      areaRef.current?.setAttribute("d", `${d}L${W},${H}L0,${H}Z`);
      const lastY = yFor(s.points[s.points.length - 1]);
      dotRef.current?.setAttribute("cy", String(lastY));
    };

    const tick = (dt: number) => {
      s.sinceInteraction += dt;
      // exponential decay toward floor
      s.conf = FLOOR + (s.conf - FLOOR) * Math.exp(-DECAY_PER_SEC * dt);

      // self-narrating loop: once stale for a while, the agent re-verifies
      const stale = s.conf < THRESHOLD;
      if (stale && !s.wasStale) {
        s.markers.push({ index: s.points.length - 1, conf: s.conf, kind: "flagged" });
        setLabel((l) => ({ ...l, event: EVENT_LABEL.flagged }));
        s.flaggedFor = 0;
      }
      if (stale) {
        s.flaggedFor += dt;
        if (s.flaggedFor > 2.4 && s.sinceInteraction > 3) {
          s.conf = 0.92;
          s.markers.push({ index: s.points.length - 1, conf: s.conf, kind: "reverified" });
          setLabel((l) => ({ ...l, event: EVENT_LABEL.reverified }));
        }
      }
      s.wasStale = s.conf < THRESHOLD;

      // sampling window
      s.sinceSample += dt;
      const interval = 1 / SAMPLE_HZ;
      while (s.sinceSample >= interval) {
        s.sinceSample -= interval;
        s.points.push(s.conf);
        if (s.points.length > SAMPLES) {
          s.points.shift();
          for (const m of s.markers) m.index -= 1;
        }
      }
      s.markers = s.markers.filter((m) => m.index >= 0);

      // low-frequency label refresh
      labelTick.current += dt;
      if (labelTick.current > 0.2) {
        labelTick.current = 0;
        setLabel((l) => {
          const tier = tierFor(s.conf);
          const conf = Math.round(s.conf * 100) / 100;
          return l.conf === conf && l.tier === tier ? l : { ...l, conf, tier };
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
      // static snapshot: a pre-drawn decay curve, no animation
      for (let i = 0; i < SAMPLES; i++) {
        s.points[i] = FLOOR + (0.92 - FLOOR) * Math.exp(-2.2 * (i / SAMPLES));
      }
      s.conf = s.points[SAMPLES - 1];
      render();
      setLabel({ conf: Math.round(s.conf * 100) / 100, tier: tierFor(s.conf), event: EVENT_LABEL.flagged });
      return;
    }

    const el = pathRef.current?.closest("svg");
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
  }, []);

  const stale = label.tier === "stale";

  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.liveDot} aria-hidden="true" />
        <span className={styles.cardTitle}>live · memory decay</span>
        <span className={styles.timeScale}>1 month ≈ 6 s</span>
      </div>

      <div className={`${styles.memChip} ${stale ? styles.memChipStale : ""}`}>
        <div className={styles.memMeta}>
          <span className={styles.memType}>semantic · preference</span>
          <span className={`${styles.tier} ${styles[`tier_${label.tier}`]}`}>
            {stale ? "⚠ stale" : label.tier}
          </span>
        </div>
        <p className={styles.memContent}>"Customer account: Basic Plan"</p>
        <div className={styles.memFoot}>
          <span>source: CRM sync</span>
          <span className={styles.confRead}>
            confidence{" "}
            <strong className={styles[`conf_${label.tier}`]}>{label.conf.toFixed(2)}</strong>
          </span>
        </div>
      </div>

      <svg
        className={styles.chart}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Memory confidence decaying over time, with reinforcement and contradiction events"
      >
        <defs>
          <linearGradient id="decayArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1="0"
            x2={W}
            y1={yFor(g)}
            y2={yFor(g)}
            className={styles.gridline}
          />
        ))}
        <line
          x1="0"
          x2={W}
          y1={yFor(THRESHOLD)}
          y2={yFor(THRESHOLD)}
          className={styles.threshold}
        />
        <text x={W - 4} y={yFor(THRESHOLD) - 5} className={styles.thresholdLabel} textAnchor="end">
          stale threshold
        </text>
        <path ref={areaRef} fill="url(#decayArea)" />
        <path ref={pathRef} className={styles.curve} fill="none" />
        <circle ref={dotRef} cx={W} r="3.5" className={styles.tip} />
      </svg>

      <div className={styles.foot}>
        <span className={styles.eventLine} aria-live="polite">
          {label.event}
        </span>
        <div className={styles.actions}>
          <button className={styles.btnReinforce} onClick={() => bump("reinforce")}>
            ↑ Reinforce
          </button>
          <button className={styles.btnContradict} onClick={() => bump("contradict")}>
            ↯ Contradict
          </button>
        </div>
      </div>
    </div>
  );
}
