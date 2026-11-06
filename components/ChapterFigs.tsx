// Engraved figures for the numbered chapters, drawn in the same hand as Plate I.
// Server components; lines are CSS or hairline SVG, text stays HTML so it reflows.

import { BODIES, ORBITS, SANDBOX, TILT_DEG, FLAT, f } from "./orreryGeom";

const T = (TILT_DEG * Math.PI) / 180;
// a point on the locator's plane, centred on the sun at 0,0
const pt = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  const x = r * Math.cos(a);
  const y = r * FLAT * Math.sin(a);
  return { x: x * Math.cos(T) - y * Math.sin(T), y: x * Math.sin(T) + y * Math.cos(T) };
};
const plane = `rotate(${TILT_DEG}) scale(1 ${FLAT})`;

/** The chapter's place on Plate I: the whole orrery in miniature, its own body lit. */
// a chapter can own more than one body: context explains the index too, jobs the plans
const OWNS: Record<string, string[]> = { context: ["#context", "#index"], jobs: ["#jobs", "#plans"] };

export function Locator({ id }: { id: string }) {
  const owns = OWNS[id] ?? [`#${id}`];
  const sun = id === "install";
  const ring = id === "sandbox";
  return (
    <svg className="loc" viewBox="-350 -190 700 380" aria-hidden="true">
      <g transform={plane} fill="none" stroke="var(--ink)" vectorEffect="non-scaling-stroke">
        {ORBITS.map((r) => {
          const on = BODIES.some((b) => owns.includes(b.href) && b.rx === r);
          return <circle key={r} r={r} strokeWidth={on ? 1.4 : 0.7} opacity={on ? 1 : 0.28} stroke={on ? "var(--ink-hi)" : undefined} style={{ vectorEffect: "non-scaling-stroke" }} />;
        })}
        <circle r={SANDBOX} strokeDasharray="6 5" strokeWidth={ring ? 1.4 : 0.7} opacity={ring ? 1 : 0.35} stroke={ring ? "var(--ink-hi)" : undefined} style={{ vectorEffect: "non-scaling-stroke" }} />
      </g>
      <circle r={sun ? 22 : 14} fill="var(--deep)" stroke="var(--gold)" strokeWidth="2" />
      <circle r="5" fill="var(--gold)" />
      {sun && <circle r="40" fill="none" stroke="var(--gold)" strokeWidth="2" strokeDasharray="2 6" />}
      {BODIES.map((b, i) => {
        const p = pt(b.rx, b.deg);
        const on = owns.includes(b.href);
        return on ? (
          <g key={i} transform={`translate(${f(p.x)} ${f(p.y)})`} stroke="var(--gold)" fill="var(--deep)" strokeWidth="2.4">
            <path d="M-26 0H26M0 -26V26" />
            <circle r="12" />
            <circle r="4.5" fill="var(--gold)" stroke="none" />
          </g>
        ) : (
          <circle key={i} cx={f(p.x)} cy={f(p.y)} r="6" fill="var(--ink)" opacity=".45" />
        );
      })}
    </svg>
  );
}

/** Fig. 1b: one index hit, each part leadered to what it tells the agent. */
export function Hit() {
  return (
    <figure className="fig hit">
      <div className="hitline" role="img" aria-label="An index hit for rotateRefresh: src/auth/tokens.ts lines 42 to 61, inside rotateRefresh(), called from login.ts and refresh.ts">
        <span><code>src/auth/tokens.ts:42–61</code><em>the lines to read</em></span>
        <span><code>rotateRefresh()</code><em>the enclosing function</em></span>
        <span><code>← login.ts · refresh.ts</code><em>its callers</em></span>
      </div>
      <figcaption className="cap"><span><b>Fig. 1b</b> · One index hit</span><span>demo data</span></figcaption>
    </figure>
  );
}

// Eärendil's star, the app's lit lamp; an unlit lamp is a plain lens
const Star = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0Q13 10 24 12Q13 14 12 24Q11 14 0 12Q11 10 12 0Z" /></svg>
);

const TABS = [
  { n: 1, p: "acme-api", a: "claude", s: "editing limiter.ts" },
  { n: 2, p: "acme-web", a: "opencode", s: "asks: run the migration now?", lit: true },
  { n: 3, p: "acme-db", a: "claude", s: "idle" },
  { n: 4, p: "infra", a: "opencode", s: "idle" },
];

/** Fig. 2a: one row per project tab; the one whose agent needs you is lit and boxed. */
export function Tabs() {
  return (
    <figure className="fig tabs">
      <ol aria-label="Project tabs, one agent each">
        {TABS.map((t) => (
          <li key={t.n} className={t.lit ? "lit" : undefined}>
            <kbd>{t.n}</kbd>
            <b>{t.p}</b>
            <span>{t.a}</span>
            <em>{t.s}</em>
            {t.lit ? <Star /> : <i aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <figcaption className="cap"><span><b>Fig. 2a</b> · Four tabs, one agent waiting on you</span><span>demo data</span></figcaption>
    </figure>
  );
}

/** Fig. 3a: three agents race one task from a shared start line. */
export function Race() {
  return (
    <figure className="fig race">
      <div className="lanes" role="img" aria-label="Race: add rate limiting to /login. Claude is still editing limiter.ts; Codex is done, +84 −12, ready to compare; Gemini stopped on a conflict in routes/login.ts.">
        <div className="lane run">
          <b>claude</b>
          <i style={{ "--w": "64%" } as React.CSSProperties} />
          <span>editing limiter.ts<em>running</em></span>
        </div>
        <div className="lane on">
          <b>codex</b>
          <i style={{ "--w": "100%" } as React.CSSProperties} />
          <span>done, ready to compare<em>+84 −12</em></span>
        </div>
        <div className="lane stop">
          <b>gemini</b>
          <i style={{ "--w": "38%" } as React.CSSProperties} />
          <span>conflict in routes/login.ts<em>stopped</em></span>
        </div>
      </div>
      <figcaption className="cap"><span><b>Fig. 3a</b> · Race: rate limit /login</span></figcaption>
    </figure>
  );
}

const CHUNKS = [
  { n: "1–3", t: "implemented · 3 commits", s: "done" },
  { n: "4", t: "rotate refresh tokens on use", s: "now" },
  { n: "5", t: "revoke sessions on password change", s: "next" },
  { n: "6–7", t: "add api key scopes · audit log for auth events", s: "queued" },
];

/** Fig. 3b: a plan committing itself, chunk by chunk, along one track. */
export function PlanTrack() {
  return (
    <figure className="fig plan" id="plans">
      <ol className="track" aria-label="Plan: auth-hardening">
        {CHUNKS.map((c) => (
          <li key={c.n} className={c.s}>
            <i aria-hidden="true" />
            <b>{c.n}</b>
            <span>{c.t}</span>
            <em>{c.s}</em>
          </li>
        ))}
      </ol>
      <p className="foot">Autopilot stops when the agent asks a question, needs permission or skips a commit.</p>
      <figcaption className="cap"><span><b>Fig. 3b</b> · Plan on autopilot</span></figcaption>
    </figure>
  );
}

/** Fig. 4: the merge drawn as branches, keyed to the commands that act on them. */
const STEPS = [
  { cmd: "git checkout main", x: "8%", y: "73.3%" },
  { cmd: "git merge --no-ff feat/token-rotation", x: "83.75%", y: "73.3%" },
  { cmd: "git branch -d feat/token-rotation", x: "65%", y: "26.7%" },
];
const xy = (x: string, y: string) => ({ "--x": x, "--y": y }) as React.CSSProperties;

export function Merge() {
  return (
    <figure className="fig merge">
      <div className="draw" aria-hidden="true">
        <svg viewBox="0 0 800 150" preserveAspectRatio="none">
          <path d="M0 110H800" />
          <path className="g" d="M150 110C220 110 230 40 300 40H520C560 40 590 50 610 70C630 92 650 110 670 110" />
        </svg>
        <span className="node" style={xy("18.75%", "73.3%")} />
        <span className="node g" style={xy("50%", "26.7%")} />
        <span className="node g big" style={xy("83.75%", "73.3%")} />
        <span className="br" style={xy("0%", "73.3%")}>main</span>
        <span className="br up" style={xy("37.5%", "26.7%")}>feat/token-rotation</span>
        <span className="msg" style={xy("50%", "26.7%")}>feat(auth): rotate refresh tokens on use<em>drafted by the agent</em></span>
        {STEPS.map((s, i) => <b key={i} className="key" style={xy(s.x, s.y)}>{i + 1}</b>)}
      </div>
      <ol className="steps" aria-label="Auto merge: feat/token-rotation into main">
        {STEPS.map((s, i) => (
          <li key={i}><b>{i + 1}</b><code>{s.cmd}</code><em>listed</em></li>
        ))}
      </ol>
      <p className="foot">Nothing runs until you confirm. Lirah never pushes or pulls.</p>
      <figcaption className="cap"><span><b>Fig. 4</b> · Auto merge into main</span><span>demo data</span></figcaption>
    </figure>
  );
}

const RINGS = [
  { k: "isolated", what: <>pid · ipc · uts namespaces</>, s: "own" },
  { k: "read-only", what: <><code>/</code> · <code>~/.ssh</code> · <code>~/.gnupg</code> · <code>~/.gitconfig</code> · shell rc files</>, s: "locked" },
  { k: "read-write", what: <><code>~</code> · <code>~/projects/acme-api</code></>, s: "open" },
  { k: "private", what: <><code>/tmp</code></>, s: "per tab" },
];

/** Fig. 5: the sandbox as nested rings around the agent, as on the outer ring of Plate I. */
export function Rings() {
  return (
    <figure className="fig rings">
      <div className="dial" aria-hidden="true">
        <div className="r1"><div className="r2"><div className="r3"><span>agent</span></div></div></div>
        <div className="tmp" />
        {["I", "II", "III", "IV"].map((n, i) => <b key={n} className={`n${i + 1}`}>{n}</b>)}
      </div>
      <ol className="legend" aria-label="Access inside the sandbox">
        {RINGS.map((r, i) => (
          <li key={r.k} className={r.s === "open" ? "on" : undefined}>
            <b>{["I", "II", "III", "IV"][i]}</b>
            <span><strong>{r.k}</strong>{r.what}</span>
            <em>{r.s}</em>
          </li>
        ))}
      </ol>
      <figcaption className="cap"><span><b>Fig. 5</b> · One tab in bubblewrap</span><span>Linux</span></figcaption>
    </figure>
  );
}
