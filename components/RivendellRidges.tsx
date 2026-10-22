"use client";

import { useEffect, useRef } from "react";

// Rivendell drawn the way a terminal draws an image: five ridges in
// atmospheric perspective, mist in the folds, a waterfall in the cleft and a
// thin moon above. Each cell is sampled in six regions and matched to the
// glyph whose shape fits best, so edges read as / \ | _ rather than a smear.

const GLYPHS = " .,:;'\"-_~=+*^!|/\\()<>[]{}#%@";
const FONT_PX = 9;

type Ridge = { base: number; amp: number; f: number; sp: number; tone: number; fog: number; rim: number };

// Far to near. Far layers sit higher, carry more mist and a dimmer rim.
const RIDGES: Ridge[] = [
  { base: 0.46, amp: 0.26, f: 0.0042, sp: 2, tone: 0.07, fog: 0.5, rim: 0.5 },
  { base: 0.57, amp: 0.27, f: 0.0052, sp: 4, tone: 0.03, fog: 0.42, rim: 0.55 },
  { base: 0.66, amp: 0.26, f: 0.0064, sp: 7, tone: 0, fog: 0.34, rim: 0.6 },
  { base: 0.78, amp: 0.22, f: 0.008, sp: 11, tone: 0, fog: 0.26, rim: 0.65 },
  { base: 0.92, amp: 0.18, f: 0.01, sp: 16, tone: 0, fog: 0.18, rim: 0.7 },
];

const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

const hash = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};
const noise1 = (x: number) => {
  const i = Math.floor(x);
  const f = x - i;
  return lerp(hash(i), hash(i + 1), f * f * (3 - 2 * f));
};
const fbm1 = (x: number) => {
  let s = 0;
  let a = 0.5;
  for (let o = 0; o < 5; o++) {
    s += a * noise1(x);
    x = x * 2.03 + 17.1;
    a *= 0.5;
  }
  return s;
};
const noise2 = (x: number, y: number) => {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const h = (a: number, b: number) => hash(a * 57.3 + b * 113.9);
  return lerp(lerp(h(ix, iy), h(ix + 1, iy), ux), lerp(h(ix, iy + 1), h(ix + 1, iy + 1), ux), uy);
};

type GlyphSet = { vecs: Float32Array; memo: Map<number, number> };
const glyphCache = new Map<string, GlyphSet>();

// Coverage of each glyph in a 2×3 grid of regions, measured in the real font.
function glyphSet(font: string, cw: number, ch: number): GlyphSet {
  const key = `${font}|${cw.toFixed(2)}`;
  const hit = glyphCache.get(key);
  if (hit) return hit;
  const S = 6;
  const W = Math.ceil(cw * S);
  const H = Math.ceil(ch * S);
  const oc = document.createElement("canvas");
  oc.width = W;
  oc.height = H;
  const o = oc.getContext("2d", { willReadFrequently: true })!;
  o.font = font.replace(`${FONT_PX}px`, `${FONT_PX * S}px`);
  o.textAlign = "center";
  o.textBaseline = "middle";
  o.fillStyle = "#fff";
  const vecs = new Float32Array(GLYPHS.length * 6);
  [...GLYPHS].forEach((c, i) => {
    o.clearRect(0, 0, W, H);
    o.fillText(c, W / 2, H / 2);
    const d = o.getImageData(0, 0, W, H).data;
    for (let r = 0; r < 3; r++)
      for (let q = 0; q < 2; q++) {
        let s = 0;
        let n = 0;
        for (let y = Math.floor((r * H) / 3); y < Math.floor(((r + 1) * H) / 3); y++)
          for (let x = Math.floor((q * W) / 2); x < Math.floor(((q + 1) * W) / 2); x++) {
            s += d[(y * W + x) * 4 + 3];
            n++;
          }
        vecs[i * 6 + r * 2 + q] = s / n / 255;
      }
  });
  let mx = 0;
  for (const v of vecs) mx = Math.max(mx, v);
  for (let i = 0; i < vecs.length; i++) vecs[i] /= mx;
  const set = { vecs, memo: new Map<number, number>() };
  glyphCache.set(key, set);
  return set;
}

function nearest(g: GlyphSet, v: Float32Array) {
  let key = 0;
  for (let i = 0; i < 6; i++) key = key * 16 + Math.min(15, (v[i] * 15 + 0.5) | 0);
  const hit = g.memo.get(key);
  if (hit !== undefined) return hit;
  let best = 0;
  let bd = Infinity;
  for (let c = 0; c < GLYPHS.length; c++) {
    let d = 0;
    for (let i = 0; i < 6; i++) {
      const e = g.vecs[c * 6 + i] - v[i];
      d += e * e;
    }
    if (d < bd) {
      bd = d;
      best = c;
    }
  }
  g.memo.set(key, best);
  return best;
}

type Scene = {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  cw: number;
  ch: number;
  cols: number;
  rows: number;
  glyphs: GlyphSet;
  ridges: Float32Array[];
  ink: string;
  strong: string;
};

function setup(canvas: HTMLCanvasElement): Scene | null {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (!w || !h) return null;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const font = `${FONT_PX}px ${getComputedStyle(canvas).fontFamily}`;
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const cw = ctx.measureText("M").width;
  const ch = Math.round(FONT_PX * 1.32);
  const cols = Math.ceil(w / cw);
  const root = getComputedStyle(document.documentElement);
  return {
    ctx,
    w,
    h,
    cw,
    ch,
    cols,
    rows: Math.ceil(h / ch),
    glyphs: glyphSet(font, cw, ch),
    ridges: RIDGES.map(() => new Float32Array(cols * 2)),
    ink: root.getPropertyValue("--foreground").trim() || "#e7e1cf",
    strong: root.getPropertyValue("--fg-strong").trim() || "#f1ebda",
  };
}

function field(s: Scene, x: number, y: number, ix: number, t: number) {
  const { w, h } = s;
  // A thin crescent, high on the right. On phones it would sit behind the headline.
  const mx = w * 0.7;
  const my = h * 0.14;
  const mr = h * 0.07;
  if (w >= 520 && Math.hypot(x - mx, y - my) < mr && Math.hypot(x - mx - mr * 0.42, y - my + mr * 0.12) > mr * 0.92) return 0.8;

  // Near to far: the first ridge above this point is the visible one.
  for (let i = RIDGES.length - 1; i >= 0; i--) {
    const top = s.ridges[i][ix];
    if (y < top) continue;
    const L = RIDGES[i];
    const dy = y - top;
    let v =
      L.tone +
      L.rim * Math.exp(-dy / (h * 0.005)) +
      L.fog * Math.exp(-dy / (h * 0.035)) * smooth(0.35, 0.75, noise2(x * 0.005 + t * 0.03 * (i + 1), i * 3.1 + y * 0.004));
    if (i === 2) {
      const dx = Math.abs(x - w * 0.47);
      if (dx < w * 0.012 && dy < h * 0.2)
        v += (0.45 + 0.5 * noise2(dx * 0.4, y * 0.09 - t * 2.4)) * (1 - dy / (h * 0.2)) * (1 - dx / (w * 0.012));
    }
    if (i === 3) {
      const dx = (x - w * 0.47) / (w * 0.05);
      v += 0.4 * Math.exp(-dx * dx) * Math.exp(-dy / (h * 0.03)) * (0.6 + 0.4 * noise2(x * 0.05, y * 0.05 - t * 0.8));
    }
    return v;
  }
  return 0.03 * smooth(h * 0.2, h * 0.5, y);
}

function draw(s: Scene, t: number) {
  const { ctx, w, h, cw, ch, cols, rows, glyphs } = s;
  for (let i = 0; i < RIDGES.length; i++) {
    const L = RIDGES[i];
    const R = s.ridges[i];
    for (let ix = 0; ix < cols * 2; ix++) {
      const x = ((ix + 0.5) * cw) / 2;
      let y = h * L.base - h * L.amp * (fbm1(x * L.f + i * 9.7 + t * L.sp * 0.01) * 1.6 - 0.3);
      if (i === 2) {
        const dx = (x - w * 0.47) / (w * 0.05);
        y += h * 0.05 * Math.exp(-dx * dx); // the cleft the waterfall drops through
      }
      R[ix] = y;
    }
  }

  ctx.clearRect(0, 0, w, h);
  const v = new Float32Array(6);
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      let sum = 0;
      let mx = 0;
      let moon = false;
      for (let rr = 0; rr < 3; rr++)
        for (let qq = 0; qq < 2; qq++) {
          const ix = c * 2 + qq;
          const val = clamp(field(s, ((ix + 0.5) * cw) / 2, ((r * 3 + rr + 0.5) * ch) / 3, ix, t));
          if (val === 0.8) moon = true;
          v[rr * 2 + qq] = val;
          sum += val;
          if (val > mx) mx = val;
        }
      const avg = sum / 6;
      if (avg < 0.025) continue;
      // Sharpen contrast inside the cell so edges pick directional glyphs.
      for (let i = 0; i < 6; i++) v[i] = Math.pow(v[i] / mx, 1.6) * mx;
      const glyph = GLYPHS[nearest(glyphs, v)];
      if (glyph === " ") continue;
      ctx.fillStyle = moon ? s.strong : s.ink;
      ctx.globalAlpha = clamp(0.15 + avg * 1.05, 0, 0.92);
      ctx.fillText(glyph, c * cw + cw / 2, r * ch + ch / 2);
    }
  ctx.globalAlpha = 1;
}

export function RivendellRidges({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scene: Scene | null = null;
    let raf = 0;
    let visible = false;
    const t0 = performance.now();

    const time = (now: number) => (motion.matches ? 5 : (now - t0) / 1000);
    const frame = (now: number) => {
      raf = 0;
      if (!scene) return;
      draw(scene, time(now));
      if (visible && !motion.matches) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    // Resizing clears the canvas, so redraw now rather than on the next frame.
    const resize = () => {
      scene = setup(canvas);
      if (scene) draw(scene, time(performance.now()));
      start();
    };

    resize();
    document.fonts?.ready.then(() => {
      glyphCache.clear();
      resize();
    });
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);
    motion.addEventListener("change", start);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      motion.removeEventListener("change", start);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`font-mono ${className ?? ""}`} />;
}
