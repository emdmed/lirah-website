"use client";

import { useEffect, useRef } from "react";
import { DEMO_SOURCE } from "./ledger/demoSource";

const H = 280;
const CW = 12;
const STEP = 9;
const KEEP = { full: "fsk", signatures: "sk", skeleton: "k" } as const;
const ALPHA = { k: 0.45, s: 0.55, f: 0.2 } as const;

const levelAt = (y: number): keyof typeof KEEP => (y < 90 ? "full" : y < 240 ? "signatures" : "skeleton");

// The horizon made of code: each column is one source line set vertically, its height its length.
// Scrolling folds it like Lirah's detail levels: bodies drop (signatures), then all but exports (skeleton).
// Each column streams its line upward, read top to bottom, at its own pace (static under reduced motion).
export function CodeSkyline() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lines = DEMO_SOURCE.map((l) => {
      const txt = l.text.trim();
      return { k: l.level, txt, h: Math.min(30, Math.round(txt.length * 0.6) + 1) };
    });
    // Three spaces between repeats, so each pass reads as a fresh line.
    const GAP = 3;
    let cols: { k: "k" | "s" | "f"; txt: string; h: number; cur: number; off: number; speed: number }[] = [];
    let w = 0;
    let font = "";
    let colour = { k: "", s: "", f: "" };
    let scrollY = window.scrollY;
    let visible = false;
    let ready = false;
    let frame = 0;
    let prev = 0;

    const draw = (dt: number) => {
      const keep = KEEP[levelAt(scrollY)];
      const rate = reduced.matches ? 1 : 1 - Math.exp(-dt * 7);
      let settled = true;
      ctx.clearRect(0, 0, w, H);
      ctx.font = font;
      ctx.textAlign = "center";
      cols.forEach((col, i) => {
        const target = keep.includes(col.k) ? col.h : 0;
        col.cur += (target - col.cur) * rate;
        if (Math.abs(target - col.cur) < 0.01) col.cur = target;
        else settled = false;
        if (!reduced.matches) {
          col.off += dt * col.speed;
          settled = false;
        }
        const n = Math.round(col.cur);
        const len = col.txt.length + GAP;
        const head = Math.floor(col.off);
        ctx.fillStyle = colour[col.k];
        for (let j = 0; j < n; j++) {
          ctx.globalAlpha = ALPHA[col.k] * (j === n - 1 ? 0.6 : 1);
          // j counts up from the baseline; the top glyph is the earliest character in view.
          const ch = col.txt[(head + n - 1 - j) % len];
          if (ch && ch !== " ") ctx.fillText(ch, 4 + i * CW, H - 6 - j * STEP);
        }
      });
      ctx.globalAlpha = 1;
      return settled;
    };

    const tick = (now: number) => {
      frame = 0;
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!draw(dt) && visible) frame = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!ready || !visible || frame) return;
      prev = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const css = getComputedStyle(canvas);
      font = `11px ${css.fontFamily}`;
      colour = { k: css.getPropertyValue("--ins-lamp"), s: css.getPropertyValue("--foreground"), f: css.getPropertyValue("--foreground") };
      // Fewer columns on narrow viewports; existing columns keep their fold state.
      const n = Math.ceil((w - 4) / CW);
      cols = Array.from({ length: n }, (_, i) => cols[i] ?? { ...lines[i % lines.length], cur: 0, off: Math.random() * 40, speed: 2 + Math.random() * 4 });
      if (ready) draw(0);
    };

    // The hero's detail chips light from this attribute (CSS in HeroSection).
    const section = canvas.closest("section");
    const mark = () => section?.setAttribute("data-level", levelAt(scrollY));
    const onScroll = () => {
      scrollY = window.scrollY;
      mark();
      kick();
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const ro = new ResizeObserver(resize);
    mark();
    resize();
    ro.observe(canvas);
    io.observe(canvas);
    window.addEventListener("scroll", onScroll, { passive: true });
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      ready = true;
      resize();
      // First paint grows the columns from the baseline, or snaps under reduced motion.
      kick();
    });

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      // The mask fades the columns out as they rise into the hero copy.
      className="pointer-events-none absolute inset-x-0 bottom-0 block h-[280px] w-full font-mono [mask-image:linear-gradient(to_top,#000_25%,transparent_78%)]"
    />
  );
}
