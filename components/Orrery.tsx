// Plate I: an orrery of the workspace, engraved in code in the atlas style of
// mylatestwork.dev. The terminal is the sun; everything Lirah adds orbits it.
// Rendered on the server at rest; OrreryMotion turns it and tilts it on the client.

import { BODIES, CX, CY, ORBITS, SANDBOX, at, f, planeTransform, pose, type Body } from "./orreryGeom";

const W = 924;
const H = 900;

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
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
  return Array.from({ length: 300 }, () => ({
    x: r() * SW,
    y: r() * 720,
    r: 0.5 + r() * 1.1,
    o: 0.2 + r() * 0.55,
  }));
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
    </svg>
  );
}

// The scale on the sandbox ring, in plane coordinates so it turns with the dial: a tick every 5°, a long one every 30°.
const TICKS = Array.from({ length: 72 }, (_, i) => {
  const t = (i * 5 * Math.PI) / 180;
  const a = SANDBOX;
  const b = SANDBOX + (i % 6 ? 6 : 13);
  return `M${f(a * Math.cos(t))} ${f(a * Math.sin(t))}L${f(b * Math.cos(t))} ${f(b * Math.sin(t))}`;
}).join("");

// Each orbit as its near half and its far half, so the near side can be drawn brighter and over the sun.
const half = (r: number, near: boolean) => (near ? `M${r} 0A${r} ${r} 0 0 1 ${-r} 0` : `M${-r} 0A${r} ${r} 0 0 1 ${r} 0`);

const halo = { stroke: "var(--deep)", paintOrder: "stroke" } as const;
const hair = { vectorEffect: "non-scaling-stroke" } as const;

function Orbits({ near }: { near: boolean }) {
  return (
    <g data-plane transform={planeTransform()} fill="none" stroke="var(--ink)">
      {ORBITS.map((r) => (
        <path key={r} className={`orb ${near ? "n" : "b"}`} data-rx={r} d={half(r, near)} strokeWidth={near ? ".8" : ".5"} style={hair} />
      ))}
    </g>
  );
}

function BodyMark({ b, i }: { b: Body; i: number }) {
  const { foot, head, scale } = pose(b.rx, b.deg);
  return (
    <g className="bd" data-body={i} data-rx={b.rx} transform={`translate(${f(head.x)} ${f(head.y)})`}>
      <a href={b.href} aria-label={`${b.name ?? `Project tab ${b.note}`}: ${b.name ? `${b.note}. ` : ""}Go to the section`}>
        {/* the stem down to the orbit, and the point where it meets the plane */}
        <path data-stem d={`M0 0L${f(foot.x - head.x)} ${f(foot.y - head.y)}`} stroke="var(--ink)" strokeWidth=".6" opacity=".6" />
        <circle data-foot cx={f(foot.x - head.x)} cy={f(foot.y - head.y)} r="1.6" fill="var(--ink)" opacity=".7" />
        <g data-s transform={`scale(${scale.toFixed(3)})`}>
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
        {/* a generous hit area for the hover, invisible */}
        <circle className="hit" r="18" fill="transparent" />
      </a>
    </g>
  );
}

export function Orrery({ className }: { className?: string }) {
  const placed = BODIES.map((b, i) => ({
    b,
    i,
    near: pose(b.rx, b.deg).near >= 0,
  }));
  const axis = pose(0, 0);
  const up = { x: axis.head.x - CX, y: axis.head.y - CY };
  return (
    <svg
      className={className}
      // the viewBox is centred on the sun, so the sun sits at the middle of whatever box holds it
      viewBox={`0 ${CY - H / 2} ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="group"
      aria-label="An orrery drawn in fine lines: the Lirah lyre at the centre as the sun, with Context, Index, Git, Jobs, Plans and project tabs orbiting it, inside a dashed outer ring. Each body links to its section."
    >
      {/* the dial: meridians, the sandbox ring and its scale, all on the plane so they turn together */}
      <g data-dial transform={planeTransform()} fill="none" stroke="var(--ink)">
        <g strokeWidth=".5" strokeDasharray="1 5" opacity=".35">
          {[0, 30, 60, 90, 120, 150].map((deg) => {
            const t = (deg * Math.PI) / 180;
            const r = SANDBOX + 40;
            return <path key={deg} d={`M${f(r * Math.cos(t))} ${f(r * Math.sin(t))}L${f(-r * Math.cos(t))} ${f(-r * Math.sin(t))}`} style={hair} />;
          })}
        </g>
        <circle r={SANDBOX} strokeWidth=".7" strokeDasharray="6 4" opacity=".7" style={hair} />
        <path d={TICKS} strokeWidth=".5" opacity=".45" style={hair} />
      </g>
      {[180, 270].map((deg) => {
        const p = at(SANDBOX + 26, deg);
        return (
          <text key={deg} data-deg={deg} aria-hidden="true" x={f(p.x)} y={f(p.y + 4)} textAnchor="middle" fontFamily="var(--f-mono)" fontSize="10" fill="var(--muted)">
            {deg}°
          </text>
        );
      })}
      {/* a leader from the sun out past the ring, as on the atlas callouts */}
      <path d={`M${CX + 22} ${CY + 18}L690 556H698`} fill="none" stroke="var(--ink)" strokeWidth=".5" opacity=".55" />
      <circle cx="698" cy="556" r="2" fill="var(--ink)" />
      <text aria-hidden="true" x="708" y="562" fontFamily="var(--f-display)" className="nm" fontStyle="italic" fontWeight="300" fontSize="30" fill="var(--ink-hi)">
        Terminal
      </text>
      <text aria-hidden="true" x="709" y="579" className="note" fontFamily="var(--f-mono)" fontSize="11" fill="var(--muted)">
        the real CLI, unchanged
      </text>

      <Orbits near={false} />
      {/* the brass arms of the orrery, from the spindle to the foot of each body */}
      <g data-arms stroke="var(--ink)" strokeWidth=".5" opacity=".28">
        {BODIES.map((b, i) => {
          const { foot } = pose(b.rx, b.deg);
          return <line key={i} x1={CX} y1={CY} x2={f(foot.x)} y2={f(foot.y)} />;
        })}
      </g>
      <g data-layer="far">
        {placed
          .filter((p) => !p.near)
          .map((p) => (
            <BodyMark key={p.i} {...p} />
          ))}
      </g>

      {/* the sun: Lirah on its spindle, the axis the whole plane turns about */}
      <path
        data-axis
        d={`M${f(CX - up.x * 3.4)} ${f(CY - up.y * 3.4)}L${f(CX + up.x * 3.4)} ${f(CY + up.y * 3.4)}`}
        stroke="var(--ink)"
        strokeWidth=".5"
        strokeDasharray="1 4"
        opacity=".5"
      />
      <g data-sun-g>
        <g stroke="var(--gold)" fill="none">
          <circle cx={CX} cy={CY} r="38" strokeWidth=".6" strokeDasharray="1 3" />
          <circle data-sun cx={CX} cy={CY} r="26" strokeWidth=".8" fill="var(--deep)" />
          <path d={`M${CX - 56} ${CY}H${CX - 30}M${CX + 30} ${CY}H${CX + 56}M${CX} ${CY - 50}V${CY - 30}M${CX} ${CY + 30}V${CY + 50}`} strokeWidth=".8" />
        </g>
        <svg x={CX - 17} y={CY - 18} width="34" height="34" fill="var(--gold)" stroke="var(--gold)" aria-hidden="true">
          <use href="#lyre" />
        </svg>
      </g>

      <Orbits near />
      <g data-layer="near">
        {placed
          .filter((p) => p.near)
          .map((p) => (
            <BodyMark key={p.i} {...p} />
          ))}
      </g>
    </svg>
  );
}
