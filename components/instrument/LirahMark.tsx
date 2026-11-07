// The Lirah mark: Ithil's crescent drawn up into a bare lyre (tall horns, no
// strings) and, above it, one body in its ring, the orrery's planet on its orbit.
// One flat colour, drawn on a 100-unit grid. Mirrors the app's LirahMark.jsx.
const BODY =
  "M22 8C24 34 12 48 14 64C16 84 32 94 50 94C68 94 84 84 86 64C88 48 76 34 78 8C77 34 70 48 70 60C70 74 62 80 50 80C38 80 30 74 30 60C30 48 23 34 22 8Z";
const LYRE = "translate(50 52) scale(.86) translate(-50 -49.5)";

const FULL = { ring: 1.6, body: 4.2 };
const SMALL = { ring: 2.6, body: 5 };

export function LirahMark({
  size = 48,
  title,
  lit,
  className = "",
}: {
  size?: number;
  title?: string;
  lit?: boolean;
  className?: string;
}) {
  const weight = size <= 24 ? SMALL : FULL;
  return (
    <svg
      width={size}
      height={size}
      viewBox="6 6 88 88"
      className={`ins-mark ${className}`}
      data-lit={lit || undefined}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={BODY} transform={LYRE} style={{ stroke: "none" }} />
      <circle cx="50" cy="27" r="9.5" style={{ fill: "none", strokeWidth: weight.ring }} />
      <circle className="ins-mark-body" cx="50" cy="27" r={weight.body} style={{ stroke: "none" }} />
    </svg>
  );
}
