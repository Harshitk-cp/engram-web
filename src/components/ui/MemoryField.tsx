import { useEffect, useRef } from "react";
import styles from "./MemoryField.module.css";

/**
 * A living field of memory nodes behind the hero.
 *
 * Each node is a "memory" whose brightness is its confidence:
 *  - confidence decays continuously (memory decay)
 *  - cursor proximity reinforces nearby memories (attention = reinforcement)
 *  - every few seconds two nearby beliefs "contradict": both flash, the
 *    weaker one is suppressed (competition-aware decay)
 *  - memories that decay below the floor are archived and a fresh one is
 *    written elsewhere
 */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  conf: number;
  hue: number; // 0 = purple, 1 = blue
  flash: number; // contradiction flash timer (s)
  archiving: number; // fade-out progress 0..1 (0 = alive)
  born: number; // write-flash progress 1..0
  suppressIn: number; // countdown (s) until contradiction suppression lands; 0 = none
}

interface Ring {
  x: number;
  y: number;
  r: number;
  alpha: number;
}

const PURPLE = { r: 167, g: 139, b: 250 };
const BLUE = { r: 96, g: 165, b: 250 };
const ROSE = { r: 251, g: 113, b: 133 };

const EDGE_DIST = 120;
const CURSOR_RADIUS = 150;
const DECAY_RATE = 0.012;
const REINFORCE_RATE = 0.5;
const FLOOR = 0.12;

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function nodeColor(n: Node) {
  const f = Math.min(n.flash, 1);
  const r = mix(mix(PURPLE.r, BLUE.r, n.hue), ROSE.r, f);
  const g = mix(mix(PURPLE.g, BLUE.g, n.hue), ROSE.g, f);
  const b = mix(mix(PURPLE.b, BLUE.b, n.hue), ROSE.b, f);
  return { r, g, b };
}

export default function MemoryField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    const rings: Ring[] = [];
    let raf = 0;
    let running = false;
    let last = 0;
    let contradictionAt = 3 + Math.random() * 3;
    const cursor = { x: -9999, y: -9999, active: false };

    const spawn = (fresh = false): Node => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 7,
      vy: (Math.random() - 0.5) * 7,
      conf: fresh ? 0.45 + Math.random() * 0.3 : 0.2 + Math.random() * 0.8,
      hue: Math.random(),
      flash: 0,
      archiving: 0,
      born: fresh ? 1 : 0,
      suppressIn: 0,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(110, Math.round((width * height) / 14000));
      while (nodes.length < target) nodes.push(spawn());
      if (nodes.length > target) nodes = nodes.slice(0, target);
    };

    const drawFrame = (dt: number) => {
      ctx.clearRect(0, 0, width, height);

      // ── contradiction event ──
      contradictionAt -= dt;
      if (contradictionAt <= 0) {
        contradictionAt = 4 + Math.random() * 4;
        const strong = nodes.filter((n) => n.conf > 0.45 && n.archiving === 0);
        outer: for (let i = 0; i < strong.length; i++) {
          for (let j = i + 1; j < strong.length; j++) {
            const dx = strong[i].x - strong[j].x;
            const dy = strong[i].y - strong[j].y;
            if (dx * dx + dy * dy < 160 * 160) {
              strong[i].flash = 1.2;
              strong[j].flash = 1.2;
              const weaker = strong[i].conf < strong[j].conf ? strong[i] : strong[j];
              weaker.suppressIn = 0.65; // suppression lands as the flash fades
              break outer;
            }
          }
        }
      }

      // ── update nodes ──
      for (const n of nodes) {
        if (n.archiving > 0) {
          n.archiving += dt * 1.4;
          if (n.archiving >= 1) Object.assign(n, spawn(true));
          continue;
        }

        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        n.conf -= DECAY_RATE * dt;
        n.flash = Math.max(0, n.flash - dt);
        n.born = Math.max(0, n.born - dt * 1.5);
        if (n.suppressIn > 0) {
          n.suppressIn -= dt;
          if (n.suppressIn <= 0) {
            n.suppressIn = 0;
            n.conf = Math.min(n.conf, 0.22);
          }
        }

        if (cursor.active) {
          const dx = n.x - cursor.x;
          const dy = n.y - cursor.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CURSOR_RADIUS) {
            const falloff = Math.pow(1 - d / CURSOR_RADIUS, 1.5);
            const before = n.conf;
            n.conf = Math.min(1, n.conf + REINFORCE_RATE * falloff * dt);
            if (before < 0.85 && n.conf >= 0.85) {
              rings.push({ x: n.x, y: n.y, r: 4, alpha: 0.5 });
            }
          }
        }

        if (n.conf <= FLOOR) n.archiving = 0.001;
      }

      // ── edges ──
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (a.archiving > 0) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (b.archiving > 0) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > EDGE_DIST * EDGE_DIST) continue;
          const d = Math.sqrt(d2);
          const strength = (1 - d / EDGE_DIST) * Math.min(a.conf, b.conf);
          const flashing = a.flash > 0 && b.flash > 0;
          const alpha = strength * (flashing ? 0.5 : 0.1);
          if (alpha < 0.008) continue;
          const ca = nodeColor(a);
          ctx.strokeStyle = `rgba(${ca.r | 0},${ca.g | 0},${ca.b | 0},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // ── nodes ──
      for (const n of nodes) {
        const fade = n.archiving > 0 ? 1 - n.archiving : 1;
        const { r, g, b } = nodeColor(n);
        const radius = 1 + n.conf * 2.4 + n.born * 2;
        const alpha = (0.18 + n.conf * 0.6) * fade;

        // halo
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha * 0.16})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius * 3.2, 0, Math.PI * 2);
        ctx.fill();
        // core
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── reinforcement rings ──
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.r += dt * 46;
        ring.alpha -= dt * 0.9;
        if (ring.alpha <= 0) {
          rings.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(${PURPLE.r},${PURPLE.g},${PURPLE.b},${ring.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ── cursor aura ──
      if (cursor.active) {
        const grad = ctx.createRadialGradient(
          cursor.x, cursor.y, 0,
          cursor.x, cursor.y, CURSOR_RADIUS,
        );
        grad.addColorStop(0, "rgba(167,139,250,0.05)");
        grad.addColorStop(1, "rgba(167,139,250,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, CURSOR_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      if (!running) return;
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      drawFrame(dt);
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

    resize();
    window.addEventListener("resize", resize);

    if (reduced) drawFrame(0); // static constellation until preference changes

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.02 },
    );
    io.observe(canvas);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    const onMotionChange = (e: MediaQueryListEvent) => {
      reduced = e.matches;
      if (reduced) {
        stop();
        drawFrame(0);
      } else {
        start();
      }
    };
    motionQuery.addEventListener("change", onMotionChange);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursor.x = e.clientX - rect.left;
      cursor.y = e.clientY - rect.top;
      cursor.active =
        cursor.x >= 0 && cursor.x <= rect.width && cursor.y >= 0 && cursor.y <= rect.height;
    };
    const onLeave = () => (cursor.active = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      io.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.field} aria-hidden="true" />;
}
