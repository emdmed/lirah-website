// Plate I: an orrery of the workspace, engraved in code in the atlas style of
// mylatestwork.dev. The terminal is the sun; everything Lirah adds orbits it.
// Rendered on the server; every line is deterministic so hydration never differs.

const W = 924;
const H = 900;
const CX = 530;
const CY = 392;
const TILT = (-11 * Math.PI) / 180;
const FLAT = 0.47; // ry / rx: how far the orbital plane leans back

const f = (n: number) => n.toFixed(1);

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A point on orbit `rx` at angle `deg` (90 = nearest the viewer), tilted. */
function at(rx: number, deg: number) {
  const t = (deg * Math.PI) / 180;
  const x = rx * Math.cos(t);
  const y = rx * FLAT * Math.sin(t);
  return { x: CX + x * Math.cos(TILT) - y * Math.sin(TILT), y: CY + x * Math.sin(TILT) + y * Math.cos(TILT) };
}

// The full-width backdrop: hairline sky, dust and contour land, like the atlas plate.
const SW = 1920;

const SKY = (() => {
  let d = "";
  for (let k = 0; k < 58; k++) {
    const y0 = 8 + k * 12.5;
    for (let x = 0; x <= SW; x += 24) d += `${x ? "L" : "M"}${x} ${f(y0 + Math.sin(x / 96 + k * 0.7) * 3.2 + Math.sin(x / 41 + k) * 1.1)}`;
  }
  return d;
})();

const DUST = (() => {
  const r = rng(7);
  return Array.from({ length: 300 }, () => ({ x: r() * SW, y: r() * 720, r: 0.5 + r() * 1.1, o: 0.2 + r() * 0.55 }));
})();

const LAND = Array.from({ length: 26 }, (_, i) => {
  const base = 700 + i * 6;
  const a = 46 - i * 1.4;
  let d = "";
  for (let x = 0; x <= SW; x += 14) {
    const ridge = Math.sin(x / 150 + 0.4) * 0.55 + Math.sin(x / 61 + i * 0.18) * 0.25 + Math.sin(x / 23 + i * 0.5) * 0.08;
    d += `${x ? "L" : "M"}${x} ${f(base - a * Math.max(0, ridge + 0.35))}`;
  }
  return d;
});

export function OrrerySky({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={`0 0 ${SW} ${H}`} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path d={SKY} fill="none" stroke="var(--ink)" strokeWidth=".3" opacity=".13" />
      <g fill="var(--ink)">
        {DUST.map((s, i) => (
          <circle key={i} cx={f(s.x)} cy={f(s.y)} r={f(s.r)} opacity={f(s.o)} />
        ))}
      </g>
      <path d={`${LAND[0]}L${SW} ${H}L0 ${H}Z`} fill="var(--deep)" />
      <g fill="none" stroke="var(--ink)" strokeWidth=".45">
        {LAND.map((d, i) => (
          <path key={i} d={d} opacity={f(0.22 + (i / LAND.length) * 0.3)} />
        ))}
      </g>
      {/* the sun: Lirah, drawn last so no passing body covers it */}
      <g stroke="var(--gold)" fill="none">
        <circle cx={CX} cy={CY} r="38" strokeWidth=".6" strokeDasharray="1 3" />
        <circle cx={CX} cy={CY} r="26" strokeWidth=".8" fill="var(--deep)" />
        <path d={`M${CX - 56} ${CY}H${CX - 30}M${CX + 30} ${CY}H${CX + 56}M${CX} ${CY - 50}V${CY - 30}M${CX} ${CY + 30}V${CY + 50}`} strokeWidth=".8" />
      </g>
      <svg x={CX - 17} y={CY - 18} width="34" height="34" fill="var(--gold)" stroke="var(--gold)" aria-hidden="true">
        <use href="#lyre" />
      </svg>
    </svg>
  );
}

const ORBITS = [98, 148, 198, 248, 298];
const SANDBOX = 334;

// The scale on the sandbox ring: a tick every 5°, a long one every 30°.
const TICKS = Array.from({ length: 72 }, (_, i) => {
  const a = at(SANDBOX, i * 5);
  const b = at(SANDBOX + (i % 6 ? 6 : 13), i * 5);
  return `M${f(a.x)} ${f(a.y)}L${f(b.x)} ${f(b.y)}`;
}).join("");

// Inner orbits run faster, as in a real orrery. Seconds per revolution.
const PERIOD: Record<number, number> = { [ORBITS[0]]: 54, [ORBITS[1]]: 86, [ORBITS[2]]: 124, [ORBITS[3]]: 172, [ORBITS[4]]: 236 };

/** The orbit as a closed polyline in plate coordinates, and the share of it before `deg`. */
function track(rx: number, deg: number) {
  const pts = Array.from({ length: 121 }, (_, i) => at(rx, i * 3));
  const seg = pts.slice(1).map((p, i) => Math.hypot(p.x - pts[i].x, p.y - pts[i].y));
  const total = seg.reduce((a, b) => a + b, 0);
  const start = (((deg % 360) + 360) % 360) / 3;
  const before = seg.slice(0, Math.floor(start)).reduce((a, b) => a + b, 0) + (start % 1) * (seg[Math.floor(start)] ?? 0);
  return { d: "M" + pts.map((p) => `${f(p.x)} ${f(p.y)}`).join("L") + "Z", share: before / total };
}

type Body = { rx: number; deg: number; name?: string; note: string };

const BODIES: Body[] = [
  { rx: ORBITS[0], deg: 160, name: "Context", note: "EDIT · READ · COPY" },
  { rx: ORBITS[1], deg: -50, name: "Index", note: "grep-first index" },
  { rx: ORBITS[2], deg: 15, name: "Git", note: "commits drafted" },
  { rx: ORBITS[3], deg: -125, name: "Jobs", note: "headless agents" },
  { rx: ORBITS[3], deg: 115, name: "Plans", note: "chunk by chunk" },
  { rx: ORBITS[4], deg: -90, note: "acme-api" },
  { rx: ORBITS[4], deg: 165, note: "acme-web" },
  { rx: ORBITS[4], deg: 45, note: "infra" },
];

const halo = { stroke: "var(--deep)", paintOrder: "stroke" } as const;

export function Orrery({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="An orrery drawn in fine lines: the Lirah lyre at the centre as the sun, with Context, Index, Git, Jobs, Plans and project tabs orbiting it, inside a ring marked Sandbox."
    >
      {/* faint meridians from the sun, as on a chart's graticule */}
      <g stroke="var(--ink)" strokeWidth=".5" strokeDasharray="1 5" opacity=".35">
        {[0, 30, 60, 90, 120, 150].map((deg) => {
          const a = at(SANDBOX + 40, deg);
          const b = at(SANDBOX + 40, deg + 180);
          return <path key={deg} d={`M${f(a.x)} ${f(a.y)}L${f(b.x)} ${f(b.y)}`} />;
        })}
      </g>

      <g transform={`rotate(${f((TILT * 180) / Math.PI)} ${CX} ${CY})`} fill="none" stroke="var(--ink)">
        {ORBITS.map((rx) => (
          <ellipse key={rx} cx={CX} cy={CY} rx={rx} ry={f(rx * FLAT)} strokeWidth=".6" opacity=".5" />
        ))}
        <ellipse cx={CX} cy={CY} rx={SANDBOX} ry={f(SANDBOX * FLAT)} strokeWidth=".7" strokeDasharray="6 4" opacity=".7" />
      </g>
      <path d={TICKS} stroke="var(--ink)" strokeWidth=".5" opacity=".45" />
      {[180, 270].map((deg) => {
        const p = at(SANDBOX + 26, deg);
        return (
          <text key={deg} x={f(p.x)} y={f(p.y + 4)} textAnchor="middle" fontFamily="var(--f-mono)" fontSize="10" fill="var(--faint)">
            {deg}°
          </text>
        );
      })}
      {(() => {
        const p = at(SANDBOX, 90);
        return (
          <text x={f(p.x)} y={f(p.y + 26)} textAnchor="middle" fontFamily="var(--f-mono)" fontSize="11" className="note" letterSpacing=".06em" fill="var(--muted)">
            SANDBOX · BUBBLEWRAP · LINUX
          </text>
        );
      })()}
      {/* fixed labels sit outside the sandbox ring, clear of every orbit */}
      <text x="640" y="188" fontFamily="var(--f-display)" className="nm" fontStyle="italic" fontWeight="300" fontSize="22" fill="var(--ink-hi)">
        Workspace
      </text>
      <text x="640" y="204" className="note" fontFamily="var(--f-mono)" fontSize="10.5" fill="var(--muted)">
        outer orbit · an agent per project tab
      </text>
      {/* a leader from the sun out past the ring, as on the atlas callouts */}
      <path d={`M${CX + 22} ${CY + 18}L690 556H698`} fill="none" stroke="var(--ink)" strokeWidth=".5" opacity=".55" />
      <circle cx="698" cy="556" r="2" fill="var(--ink)" />
      <text x="708" y="562" fontFamily="var(--f-display)" className="nm" fontStyle="italic" fontWeight="300" fontSize="30" fill="var(--ink-hi)">
        Terminal
      </text>
      <text x="709" y="579" className="note" fontFamily="var(--f-mono)" fontSize="11" fill="var(--muted)">
        the real CLI, unchanged
      </text>

      {BODIES.map((b) => {
        const { d, share } = track(b.rx, b.deg);
        const dur = PERIOD[b.rx];
        return (
          <g key={`${b.rx}-${b.deg}`}>
            {/* a negative begin puts each body at its own place on the orbit from the first frame */}
            <animateMotion path={d} dur={`${dur}s`} begin={`${f(-share * dur)}s`} repeatCount="indefinite" calcMode="paced" />
            <g stroke="var(--ink)" strokeWidth=".7" fill="none">
              <path d="M-9 0H9M0 -9V9" />
              <circle r="4.6" fill="var(--deep)" />
              <circle r="1.8" fill="var(--ink)" stroke="none" />
            </g>
            {b.name ? (
              <>
                <text x="16" y="-4" fontFamily="var(--f-display)" className="nm" fontStyle="italic" fontWeight="300" fontSize="22" fill="var(--ink-hi)" strokeWidth="5" {...halo}>
                  {b.name}
                </text>
                <text x="16" y="12" className="note" fontFamily="var(--f-mono)" fontSize="10.5" fill="var(--muted)" strokeWidth="4" {...halo}>
                  {b.note}
                </text>
              </>
            ) : (
              <text x="16" y="4" className="note tab" fontFamily="var(--f-mono)" fontSize="10.5" fill="var(--muted)" strokeWidth="4" {...halo}>
                {b.note}
              </text>
            )}
          </g>
        );
      })}
      {/* the sun: Lirah, drawn last so no passing body covers it */}
      <g stroke="var(--gold)" fill="none">
        <circle cx={CX} cy={CY} r="38" strokeWidth=".6" strokeDasharray="1 3" />
        <circle cx={CX} cy={CY} r="26" strokeWidth=".8" fill="var(--deep)" />
        <path d={`M${CX - 56} ${CY}H${CX - 30}M${CX + 30} ${CY}H${CX + 56}M${CX} ${CY - 50}V${CY - 30}M${CX} ${CY + 30}V${CY + 50}`} strokeWidth=".8" />
      </g>
      <svg x={CX - 17} y={CY - 18} width="34" height="34" fill="var(--gold)" stroke="var(--gold)" aria-hidden="true">
        <use href="#lyre" />
      </svg>
    </svg>
  );
}
