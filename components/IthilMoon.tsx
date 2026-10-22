"use client";

import { useEffect, useRef } from "react";

// Ithil, the bowl of the Lirah mark, drawn the way a terminal draws an image:
// a dithered disc of glyphs. It shows today's real phase, so like a lamp it
// carries a true state rather than decoration.

const SYNODIC_DAYS = 29.530588853;
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);
const RAMP = " ..::-=++*";

// 0 = new, 0.5 = full.
function moonPhase(now: number) {
  const days = (now - KNOWN_NEW_MOON) / 864e5;
  return (((days / SYNODIC_DAYS) % 1) + 1) % 1;
}

function seeded(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function drawMoon(canvas: HTMLCanvasElement, phase: number) {
  const size = canvas.clientWidth;
  if (!size) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = canvas.height = Math.round(size * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);

  const style = getComputedStyle(canvas);
  const ink = getComputedStyle(document.documentElement).getPropertyValue("--fg-strong").trim() || "#f1ebda";
  const cw = Math.max(7, size / 80);
  const ch = cw * 1.45;
  ctx.font = `${(cw * 1.33).toFixed(1)}px ${style.fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = ink;

  const R = size * 0.46;
  const c = size / 2;
  // Sun direction: behind the moon at new, in front at full, from the right while waxing.
  const th = phase * 2 * Math.PI;
  const lx = Math.sin(th);
  const lz = -Math.cos(th);

  const rnd = seeded(4242);
  const maria = Array.from({ length: 9 }, () => ({
    x: rnd() * 1.3 - 0.65,
    y: rnd() * 1.3 - 0.65,
    r: 0.12 + rnd() * 0.22,
    d: 0.25 + rnd() * 0.3,
  }));
  const craters = Array.from({ length: 40 }, () => ({ x: rnd() * 1.8 - 0.9, y: rnd() * 1.8 - 0.9, r: 0.02 + rnd() * 0.06 }));

  for (let y = c - R; y <= c + R; y += ch) {
    for (let x = c - R; x <= c + R; x += cw) {
      const nx = (x - c) / R;
      const ny = (y - c) / R;
      const d2 = nx * nx + ny * ny;
      if (d2 > 1) continue;
      const nz = Math.sqrt(1 - d2);
      let albedo = 1;
      for (const m of maria) {
        const q = Math.hypot(nx - m.x, ny - m.y);
        if (q < m.r) albedo -= m.d * (1 - q / m.r);
      }
      for (const k of craters) {
        const q = Math.hypot(nx - k.x, ny - k.y);
        if (q < k.r) albedo += q > k.r * 0.7 ? 0.25 : -0.2;
      }
      albedo = Math.min(1.2, Math.max(0.35, albedo));
      const lit = Math.pow(Math.max(0, nx * lx + nz * lz), 0.8) * albedo;
      if (lit > 0.03) {
        ctx.globalAlpha = 0.06 + lit * 0.3;
        ctx.fillText(RAMP[Math.min(9, Math.max(1, Math.round(lit * 9)))], x, y);
      } else {
        // Earthshine: the dark side stays faintly there.
        ctx.globalAlpha = 0.035;
        ctx.fillText(d2 > 0.86 || albedo >= 0.8 ? "." : ":", x, y);
      }
    }
  }
}

export function IthilMoon({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const phase = moonPhase(Date.now());
    const draw = () => drawMoon(canvas, phase);
    draw();
    document.fonts?.ready.then(draw);
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`aspect-square font-mono ${className ?? ""}`} />;
}
