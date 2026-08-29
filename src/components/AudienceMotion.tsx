"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CTAButton from "@/components/CTAButton";

// ─── Types ───────────────────────────────────────────────────────────────────

type Stage = "idle" | "attention" | "relevance" | "amplify" | "move" | "final";
type PGroup = "neutral" | "interested" | "curious" | "irrelevant" | "ready";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  tx: number; ty: number;
  hx: number; hy: number;
  r: number;
  op: number; opT: number;
  group: PGroup;
  phase: number; phaseSpeed: number;
  springK: number; damp: number;
}

// ─── Pure helpers (stable references — defined outside component) ─────────────

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const PHI = Math.PI * (3 - Math.sqrt(5));

// Accent colour from globals.css: #ed2830
const ACCENT_R = 237, ACCENT_G = 40, ACCENT_B = 48;

const P_COLORS: Record<PGroup, readonly [number, number, number]> = {
  interested: [ACCENT_R, ACCENT_G, ACCENT_B],
  ready:      [ACCENT_R, ACCENT_G, ACCENT_B],
  curious:    [195, 195, 210],
  irrelevant: [110, 110, 122],
  neutral:    [205, 205, 215],
};

const GROUPS: PGroup[]  = ["neutral", "interested", "curious", "irrelevant", "ready"];
const G_DIST            = [0.20,      0.35,          0.20,      0.15,          0.10];

const STAGE_ORDER: Stage[] = ["idle", "attention", "relevance", "amplify", "move"];

const NOISE_STR     = 0.27;
const CURSOR_R_DESK = 125;
const CURSOR_R_MOB  = 80;
const REPEL_STR     = 7.5;
const ATTRACT_STR   = 4.5;

function blobPositions(
  n: number, cx: number, cy: number, rx: number, ry: number,
): [number, number][] {
  return Array.from({ length: n }, (_, i) => {
    const radial = Math.sqrt((i + 0.5) / n) * (0.9 + rnd(-0.13, 0.13));
    const angle  = i * PHI + rnd(-0.07, 0.07);
    return [cx + Math.cos(angle) * radial * rx, cy + Math.sin(angle) * radial * ry];
  });
}

function makeParticles(
  n: number, cx: number, cy: number, rx: number, ry: number,
): Particle[] {
  return blobPositions(n, cx, cy, rx, ry).map(([x, y]) => {
    let cum = 0, group: PGroup = "neutral";
    const roll = Math.random();
    for (let i = 0; i < GROUPS.length; i++) {
      cum += G_DIST[i];
      if (roll < cum) { group = GROUPS[i]; break; }
    }
    const baseOp = rnd(0.28, 0.65);
    return {
      x, y,
      vx: rnd(-0.2, 0.2), vy: rnd(-0.2, 0.2),
      tx: x, ty: y,
      hx: x, hy: y,
      r: rnd(1.3, 3.1),
      op: baseOp, opT: baseOp,
      group,
      phase: rnd(0, Math.PI * 2), phaseSpeed: rnd(0.005, 0.013),
      springK: 0.038 + rnd(-0.01, 0.01),
      damp: 0.876 + rnd(-0.025, 0.025),
    };
  });
}

function applyTargets(
  stage: Stage, particles: Particle[],
  cx: number, cy: number, rx: number, ry: number, h: number,
) {
  switch (stage) {
    case "idle":
      particles.forEach(p => { p.tx = p.hx; p.ty = p.hy; p.opT = rnd(0.28, 0.65); });
      break;

    case "attention":
      particles.forEach(p => {
        const pull = p.group === "interested" || p.group === "ready";
        if (pull) {
          const a = rnd(0, Math.PI * 2), r = rnd(0, 58);
          p.tx = cx + Math.cos(a) * r; p.ty = cy + Math.sin(a) * r;
          p.opT = rnd(0.72, 1.0);
        } else {
          p.tx = p.hx; p.ty = p.hy; p.opT = rnd(0.1, 0.26);
        }
      });
      break;

    case "relevance":
      particles.forEach(p => {
        switch (p.group) {
          case "interested": {
            const a = rnd(-0.5, 0.5) - Math.PI * 0.55, r = rnd(42, ry * 0.9);
            p.tx = cx + Math.cos(a) * r; p.ty = cy + Math.sin(a) * r;
            p.opT = rnd(0.78, 0.97);
            break;
          }
          case "curious": {
            const a = rnd(Math.PI * 0.58, Math.PI * 0.95), r = rnd(52, rx * 0.88);
            p.tx = cx + Math.cos(a) * r; p.ty = cy + Math.sin(a) * r;
            p.opT = rnd(0.45, 0.65);
            break;
          }
          case "irrelevant":
            p.tx = p.hx + rnd(-28, 28); p.ty = p.hy + rnd(-28, 28); p.opT = rnd(0.04, 0.12);
            break;
          case "ready": {
            const a = rnd(-0.3, 0.3), r = rnd(10, 40);
            p.tx = cx + Math.cos(a) * r; p.ty = cy + Math.sin(a) * r;
            p.opT = 1.0;
            break;
          }
          default: {
            const a = rnd(0.1, 0.55), r = rnd(42, rx * 0.92);
            p.tx = cx + Math.cos(a) * r; p.ty = cy + Math.sin(a) * r;
            p.opT = rnd(0.28, 0.48);
          }
        }
      });
      break;

    case "amplify":
      particles.forEach(p => {
        p.tx = cx + (p.tx - cx) * 1.4;
        p.ty = cy + (p.ty - cy) * 1.4;
        if (p.group !== "irrelevant") p.opT = Math.min(p.opT * 1.28, 1.0);
      });
      break;

    case "move": {
      let riIdx = 0;
      particles.forEach(p => {
        if (p.group === "interested" || p.group === "ready") {
          const slot = riIdx++ % 3;
          const yBase = [h * 0.33, h * 0.54, h * 0.73][slot];
          const a = rnd(-0.45, 0.45), r = rnd(0, 48 + slot * 14);
          p.tx = cx + Math.cos(a) * r; p.ty = yBase + rnd(-16, 16);
          p.opT = slot === 2 ? 1.0 : rnd(0.68, 0.92);
        } else if (p.group === "curious") {
          if (Math.random() < 0.28) {
            p.tx = cx + rnd(-72, 72); p.ty = h * 0.33 + rnd(-24, 24); p.opT = 0.55;
          } else {
            p.tx = p.hx + rnd(-75, 75); p.ty = p.hy + rnd(-75, 75); p.opT = 0.05;
          }
        } else {
          p.tx = p.hx + rnd(-90, 90); p.ty = p.hy + rnd(-90, 90); p.opT = rnd(0.02, 0.08);
        }
      });
      break;
    }

    case "final":
      particles.forEach((p, i) => {
        if (p.group === "ready" || (p.group === "interested" && i % 6 === 0)) {
          const a = rnd(0, Math.PI * 2), r = rnd(0, 32);
          p.tx = cx + Math.cos(a) * r; p.ty = cy + Math.sin(a) * r;
          p.opT = 1.0;
        } else {
          p.tx = cx + rnd(-300, 300); p.ty = cy + rnd(-260, 260); p.opT = 0;
        }
      });
      break;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AudienceMotion() {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const sectionRef    = useRef<HTMLDivElement>(null);
  const rafRef        = useRef<number | null>(null);
  const stageRef      = useRef<Stage>("idle");
  const mouseRef      = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, active: false });
  const particlesRef  = useRef<Particle[]>([]);
  const tRef          = useRef(0);
  const sizeRef       = useRef({ w: 0, h: 0, mobile: false });
  const interactedRef = useRef(false);
  const autoRef       = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [stage, setStage]         = useState<Stage>("idle");
  const [showHint, setShowHint]   = useState(true);
  const [showFinal, setShowFinal] = useState(false);
  const [metrics, setMetrics]     = useState({ audience: 0, interested: 0, intent: 0, action: 0 });

  // Initialise / reinitialise particles for current canvas size
  const init = useCallback(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const w      = section.clientWidth;
    const mobile = w < 768;
    const h      = mobile ? 300 : 480;
    const count  = mobile ? 200 : 500;
    const cx = w / 2, cy = h / 2;
    const rx = Math.min(w * 0.37, 262), ry = Math.min(h * 0.43, 202);

    canvas.width  = w;
    canvas.height = h;
    sizeRef.current = { w, h, mobile };

    particlesRef.current = makeParticles(count, cx, cy, rx, ry);
    setMetrics(m => ({ ...m, audience: count }));
  }, []);

  // Per-frame canvas draw — only touches refs, never React state
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h, mobile } = sizeRef.current;
    if (!w || !h) return;

    const particles = particlesRef.current;
    const mouse     = mouseRef.current;
    const curStage  = stageRef.current;
    const cursorR   = mobile ? CURSOR_R_MOB : CURSOR_R_DESK;

    // Mouse velocity (for dynamic cursor force)
    const mvx = mouse.x - mouse.prevX;
    const mvy = mouse.y - mouse.prevY;
    const mSpd = Math.sqrt(mvx * mvx + mvy * mvy);
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;

    ctx.clearRect(0, 0, w, h);

    // Physics pass
    for (const p of particles) {
      p.phase += p.phaseSpeed;
      const nx = Math.sin(p.phase) * Math.cos(p.phase * 0.63 + 0.4) * NOISE_STR;
      const ny = Math.cos(p.phase * 1.27 + 1) * Math.sin(p.phase * 0.53) * NOISE_STR;

      p.vx += (p.tx - p.x) * p.springK + nx;
      p.vy += (p.ty - p.y) * p.springK + ny;

      if (mouse.active) {
        const cdx = p.x - mouse.x, cdy = p.y - mouse.y;
        const cd  = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cd < cursorR && cd > 0.5) {
          const frac    = (cursorR - cd) / cursorR;
          const attract = curStage === "attention" &&
                          (p.group === "interested" || p.group === "ready");
          const str = (attract ? -ATTRACT_STR : REPEL_STR) * frac * 0.08 * (1 + mSpd * 0.06);
          p.vx += (cdx / cd) * str;
          p.vy += (cdy / cd) * str;
        }
      }

      p.vx *= p.damp; p.vy *= p.damp;
      p.x  += p.vx;   p.y  += p.vy;
      p.op += (p.opT - p.op) * 0.038;
    }

    // Render pass
    for (const p of particles) {
      if (p.op < 0.012) continue;

      const [r, g, b] = curStage === "idle"
        ? ([205, 205, 215] as const)
        : P_COLORS[p.group];

      const hdx = p.x - mouse.x, hdy = p.y - mouse.y;
      const hd  = Math.sqrt(hdx * hdx + hdy * hdy);
      const boost = hd < 18 ? 2.1 : hd < 46 ? 1.38 : 1.0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * boost, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(p.op, 1)})`;
      ctx.fill();
    }

    // Subtle cursor aura
    if (mouse.active && mouse.x > -100 && mouse.x < w + 100) {
      const auraR = cursorR * 0.52;
      const grad  = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, auraR);
      grad.addColorStop(0, `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},0.055)`);
      grad.addColorStop(1, `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},0)`);
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, auraR, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    tRef.current += 0.016;
  }, []);

  const loop = useCallback(() => {
    drawFrame();
    rafRef.current = requestAnimationFrame(loop);
  }, [drawFrame]);

  // Metrics update — throttled at 850ms
  useEffect(() => {
    if (showFinal) return;
    const iv = setInterval(() => {
      const ps  = particlesRef.current;
      const st  = stageRef.current;
      let interested = 0, intent = 0, action = 0;
      for (const p of ps) {
        if (p.group === "interested" || p.group === "ready") interested++;
        if (p.group === "ready") intent++;
      }
      if (st === "move" || st === "final") action = Math.floor(intent * 0.28);
      setMetrics({ audience: ps.length, interested, intent, action });
    }, 850);
    return () => clearInterval(iv);
  }, [showFinal]);

  // Canvas setup + event wiring
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    init();
    loop();

    const ro = new ResizeObserver(() => {
      init();
      const { w, h } = sizeRef.current;
      const cx = w / 2, cy = h / 2;
      const rx = Math.min(w * 0.37, 262), ry = Math.min(h * 0.43, 202);
      applyTargets(stageRef.current, particlesRef.current, cx, cy, rx, ry, h);
    });
    if (sectionRef.current) ro.observe(sectionRef.current);

    const canvas = canvasRef.current;
    if (!canvas) return;

    function onMove(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = clientX - rect.left;
      mouseRef.current.y = clientY - rect.top;
      mouseRef.current.active = true;
      if (!interactedRef.current) {
        interactedRef.current = true;
        setShowHint(false);
      }
    }
    function onLeave() {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }
    function onMouseMove(e: MouseEvent)  { onMove(e.clientX, e.clientY); }
    function onTouch(e: TouchEvent)      { if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY); }

    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove",  onTouch, { passive: true });
    canvas.addEventListener("touchend",   onLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (autoRef.current) clearTimeout(autoRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove",  onMouseMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove",  onTouch);
      canvas.removeEventListener("touchend",   onLeave);
    };
  }, [init, loop]);

  // Stage transition handler
  const goStage = useCallback((next: Stage) => {
    if (autoRef.current) clearTimeout(autoRef.current);
    stageRef.current = next;
    setStage(next);
    setShowFinal(false);

    const { w, h } = sizeRef.current;
    const cx = w / 2, cy = h / 2;
    const rx = Math.min(w * 0.37, 262), ry = Math.min(h * 0.43, 202);
    applyTargets(next, particlesRef.current, cx, cy, rx, ry, h);

    if (next === "move") {
      autoRef.current = setTimeout(() => {
        const { w: w2, h: h2 } = sizeRef.current;
        const cx2 = w2 / 2, cy2 = h2 / 2;
        const rx2 = Math.min(w2 * 0.37, 262), ry2 = Math.min(h2 * 0.43, 202);
        stageRef.current = "final";
        setStage("final");
        applyTargets("final", particlesRef.current, cx2, cy2, rx2, ry2, h2);
        setTimeout(() => setShowFinal(true), 1000);
      }, 3400);
    }
  }, []);

  const EASE = [0.16, 1, 0.3, 1] as const;
  const stageIdx = STAGE_ORDER.indexOf(stage);

  const controls = [
    { id: "attention" as Stage, label: "ATTENTION", hint: "Draw the audience in" },
    { id: "relevance" as Stage, label: "RELEVANCE", hint: "Segment by behaviour" },
    { id: "amplify"   as Stage, label: "AMPLIFY",   hint: "Expand your reach"    },
    { id: "move"      as Stage, label: "MOVE",      hint: "Drive toward action"  },
  ];

  const stageBadge: Partial<Record<Stage, string>> = {
    attention: "ATTENTION",
    relevance: "RELEVANCE",
    amplify:   "AMPLIFIED",
    move:      "IN MOTION",
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
      aria-label="Audience motion — interactive marketing experience"
    >
      {/* Accessibility: text summary for screen readers */}
      <p className="sr-only">
        An interactive particle simulation showing how targeted social media marketing moves
        the right audience from awareness through to action. Use the stage controls below to
        step through Attention, Relevance, Amplify, and Move.
      </p>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">

        {/* ── Headline ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-10 max-w-2xl"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/30">
            Social Media Marketing
          </span>
          <h2 className="mt-3 font-heading text-5xl font-bold uppercase leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
            Make the
            <br />
            <span className="text-accent">Audience</span>
            <br />
            Move.
          </h2>
          <p className="mt-5 max-w-xs text-base leading-7 text-white/40">
            Attention is easy to chase.
            <br />
            Building movement is different.
          </p>
        </motion.div>

        {/* ── Canvas ────────────────────────────────────────────────────────── */}
        <div className="relative select-none overflow-hidden rounded-2xl border border-white/[0.06]">
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="w-full touch-none"
            style={{ cursor: "none", display: "block" }}
          />

          {/* Cursor hint */}
          <AnimatePresence>
            {showHint && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                aria-hidden="true"
                className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.26em] text-white/15"
              >
                Move your cursor
              </motion.p>
            )}
          </AnimatePresence>

          {/* Stage badge */}
          <AnimatePresence mode="wait">
            {stage !== "idle" && stage !== "final" && stageBadge[stage] && (
              <motion.div
                key={stage}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.38, ease: EASE }}
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="rounded-full border border-white/10 bg-black/72 px-6 py-2.5 backdrop-blur-sm">
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
                    {stageBadge[stage]}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Move state: funnel labels */}
          <AnimatePresence>
            {stage === "move" && !showFinal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-around py-8"
              >
                {["INTEREST", "INTENT", "ACTION"].map((label, i) => (
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.5, ease: EASE }}
                    className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/20"
                  >
                    {label}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final resolution overlay */}
          <AnimatePresence>
            {showFinal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0 }}
                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
                  className="text-sm font-medium text-white/40"
                >
                  Marketing isn&apos;t about making more noise.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.7, ease: EASE }}
                  className="mt-1.5 text-sm font-medium text-white/40"
                >
                  It&apos;s about creating movement.
                </motion.p>
                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7, duration: 0.8, ease: EASE }}
                  className="mt-8 font-heading text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl"
                >
                  Don&apos;t reach everyone.
                  <br />
                  <span className="text-accent">Move the right ones.</span>
                </motion.h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Controls + Metrics ─────────────────────────────────────────────── */}
        <div className="mt-7 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">

          {/* Stage controls */}
          <div className="flex flex-wrap gap-2.5" role="group" aria-label="Marketing stage controls">
            {controls.map(ctrl => {
              const isActive = stage === ctrl.id;
              const isPast   = STAGE_ORDER.indexOf(ctrl.id) < stageIdx && stageIdx > 0;
              return (
                <button
                  key={ctrl.id}
                  type="button"
                  onClick={() => goStage(ctrl.id)}
                  disabled={stage === "final"}
                  aria-pressed={isActive}
                  className={`flex flex-col gap-1 rounded-xl border px-5 py-3.5 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed ${
                    isActive
                      ? "border-accent bg-accent/10 text-white"
                      : isPast
                      ? "border-white/[0.12] bg-white/[0.03] text-white/35"
                      : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/28 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]">
                    {isActive && (
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    )}
                    {ctrl.label}
                  </span>
                  <span className="text-[11px] text-white/22">{ctrl.hint}</span>
                </button>
              );
            })}
          </div>

          {/* Live simulation metrics */}
          <div className="flex flex-col gap-1.5 sm:items-end">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/20">
              Audience Model — Live Simulation
            </p>
            <div className="flex gap-5">
              {[
                { label: "AUDIENCE",   value: metrics.audience   },
                { label: "INTERESTED", value: metrics.interested },
                { label: "INTENT",     value: metrics.intent     },
                { label: "ACTION",     value: metrics.action     },
              ].map(m => (
                <div key={m.label} className="flex flex-col">
                  <span className="font-heading text-xl font-bold tabular-nums text-white sm:text-2xl">
                    {m.value.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/28">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Final CTA ─────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {showFinal && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7, duration: 0.8, ease: EASE }}
              className="mt-14 flex justify-center"
            >
              <CTAButton href="/contact" variant="inverted" size="lg">
                Start a Conversation
              </CTAButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
