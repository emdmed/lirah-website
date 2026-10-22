// A context-window fill drawn as a moon phase, waxing from new to full. The
// lit part turns warn at `warnAt` and fault at 95%, like the Meter.
export function ContextMoon({ ratio, warnAt = 0.8, size = 14 }: { ratio: number; warnAt?: number; size?: number }) {
  const r = Math.min(1, Math.max(0, ratio));
  const color = r >= 0.95 ? "var(--ins-fault)" : r >= warnAt ? "var(--ins-warn)" : "var(--foreground)";
  // Terminator: an ellipse whose x-radius sweeps from +R (new) to -R (full).
  const R = 6;
  const rx = Math.abs(R * (1 - 2 * r));
  const sweepOuter = 1;
  const sweepInner = r < 0.5 ? 0 : 1;
  const d = `M7 1 A${R} ${R} 0 0 ${sweepOuter} 7 13 A${rx} ${R} 0 0 ${sweepInner} 7 1Z`;
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" role="img" aria-label={`Context ${Math.round(r * 100)}% full`}>
      <circle cx="7" cy="7" r={R} fill="var(--ins-lamp-off)" />
      {r > 0.01 && <path d={d} fill={color} />}
    </svg>
  );
}
