export function formatTokens(n: number) {
  if (n >= 1000) return `${+(n / 1000).toFixed(n >= 100_000 ? 0 : 1)}k`;
  return String(Math.round(n));
}

const TICKS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// A meter for a quantity with a ceiling: ticks every 10%, a fill that turns
// warn at `warnAt` and fault at 95%, a hatched red zone, and a star needle.
export function Meter({
  value,
  max,
  warnAt = 0.8,
  label,
  size,
  readout = true,
  className = "",
}: {
  value: number;
  max: number;
  warnAt?: number;
  label: string;
  size?: "lg";
  readout?: boolean;
  className?: string;
}) {
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const level = ratio >= 0.95 ? "fault" : ratio >= warnAt ? "warn" : "ok";
  const fill = size === "lg" ? Math.max(ratio, 0.01) : ratio;
  return (
    <span
      className={`ins-meter ${className}`}
      data-level={level}
      data-size={size}
      data-calm={ratio < warnAt - 0.2 || undefined}
      role="meter"
      aria-label={label}
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuetext={`${formatTokens(value)} of ${formatTokens(max)} tokens`}
    >
      <span className="ins-meter-scale" aria-hidden="true">
        <span className="ins-meter-ticks">
          {TICKS.map((t) => (
            <span key={t} data-major={t % 50 === 0 || undefined} style={{ left: `${t}%` }} />
          ))}
        </span>
        <span className="ins-meter-track" />
        <span className="ins-meter-zone" style={{ left: `${warnAt * 100}%` }} />
        <span className="ins-meter-fill" style={{ transform: `scaleX(${fill})` }} />
        <span className="ins-meter-needle" style={{ left: `${(ratio * 100).toFixed(1)}%` }} />
      </span>
      {readout && (
        <span className="ins-meter-readout">
          {formatTokens(value)}
          <span className="ins-meter-max">/{formatTokens(max)}</span>
        </span>
      )}
    </span>
  );
}
