import { useEffect, useRef, useState } from "react";
import styles from "./ChainRail.module.css";

/**
 * Scroll progress rendered as an audit chain: each section is a block that
 * gets "sealed" (hash stamp) once you scroll past it. Reaching the end
 * verifies the chain. Desktop only, aria-hidden — purely decorative.
 */

const SECTIONS = [
  { id: "trust", label: "trust" },
  { id: "features", label: "engine" },
  { id: "memory-systems", label: "memory" },
  { id: "benchmarks", label: "proof" },
  { id: "pricing", label: "pricing" },
  { id: "quickstart", label: "start" },
];

// deterministic pseudo-hash per label — decorative stamp, not real crypto
function stamp(label: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < label.length; i++) {
    h ^= label.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 6);
}

interface RailState {
  sealed: boolean[];
  active: number;
  done: boolean;
}

export default function ChainRail() {
  const [state, setState] = useState<RailState>(() => ({
    sealed: SECTIONS.map(() => false),
    active: -1,
    done: false,
  }));
  const ticking = useRef(false);
  const raf = useRef(0);
  const els = useRef<(HTMLElement | null)[]>(SECTIONS.map(() => null));

  useEffect(() => {
    const update = () => {
      ticking.current = false;
      const mid = window.innerHeight * 0.5;
      const nextSealed = SECTIONS.map((s, i) => {
        els.current[i] ??= document.getElementById(s.id);
        const el = els.current[i];
        return el ? el.getBoundingClientRect().top < mid : false;
      });
      let act = -1;
      for (let i = 0; i < SECTIONS.length; i++) if (nextSealed[i]) act = i;
      const nearBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 200;
      const done = nearBottom && nextSealed.every(Boolean);
      setState((prev) =>
        prev.active === act &&
        prev.done === done &&
        prev.sealed.every((v, i) => v === nextSealed[i])
          ? prev
          : { sealed: nextSealed, active: act, done },
      );
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        raf.current = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const { sealed, active, done } = state;

  return (
    <div className={styles.rail} aria-hidden="true">
      {SECTIONS.map((s, i) => (
        <div key={s.id} className={styles.segment}>
          {i > 0 && (
            <div className={`${styles.line} ${sealed[i] ? styles.lineSealed : ""}`} />
          )}
          <a
            href={`#${s.id}`}
            className={`${styles.node} ${sealed[i] ? styles.nodeSealed : ""} ${
              active === i ? styles.nodeActive : ""
            }`}
          >
            <span className={styles.dot} />
            <span className={styles.meta}>
              <span className={styles.label}>{s.label}</span>
              <span className={styles.hash}>{sealed[i] ? stamp(s.label) : "······"}</span>
            </span>
          </a>
        </div>
      ))}
      <div className={`${styles.verdict} ${done ? styles.verdictOn : ""}`}>
        <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
          <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M3.5 6.5l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        chain verified
      </div>
    </div>
  );
}
