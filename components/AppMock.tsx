// Plate II: the app itself, drawn in HTML from the Rivendell theme with the demo session of the old
// screenshot. Sized in em off its own width, so it scales like an image. `data-to` names the orrery
// body that becomes this part on scroll (OrreryMorph).
import { GitBranch } from "lucide-react";

type Row = { d?: string; f?: string; k?: string };

const FILES: Row[] = [
  { d: "src/" }, { f: "server.ts" },
  { d: "src/db/" }, { f: "schema.ts", k: "2.1k" },
  { d: "src/db/migrations/" }, { f: "0007_sessions.sql" },
  { d: "src/lib/" }, { f: "token.ts", k: "1.9k" },
  { d: "src/middleware/" }, { f: "auth.ts", k: "3.2k" },
  { d: "src/routes/" }, { f: "session.ts", k: "800" }, { f: "index.ts" },
  { d: "tests/" }, { f: "auth.test.ts", k: "500" },
  { d: "tests/fixtures/" }, { f: "users.json" },
  { d: "docs/" }, { f: "api.md" },
  { d: "dist/" }, { f: "server.js" },
];

const CHIPS = [
  ["EDIT", "auth.ts", "full"],
  ["EDIT", "token.ts", "full"],
  ["READ", "session.ts", "signatures"],
  ["READ", "schema.ts", "signatures"],
  ["COPY", "auth.test.ts", "skeleton"],
];

const TABS = [
  { to: "acme-api", name: "acme-api", diff: ["-1", "+8"], branch: "feat/token-rotation", state: "edited 2 · 3 cmds · now", on: true, moon: 0.25 },
  { to: "acme-web", name: "acme-web", diff: ["-3", "+14"], branch: "main", state: "waiting on you", moon: 0.5 },
  { to: "infra", name: "infra", diff: null, branch: "ops/tf-1.9", state: "plan complete · 9m ago", moon: 0.5 },
];

function Star() {
  return (
    <svg className="star" viewBox="-5 -5 10 10" aria-hidden="true">
      <path d="M0-5Q.6-.6 5 0Q.6.6 0 5Q-.6.6-5 0Q-.6-.6 0-5Z" />
    </svg>
  );
}

// the context moon: how full the tab's context is, as a lit fraction
function Moon({ lit }: { lit: number }) {
  return (
    <svg className="moon" viewBox="-6 -6 12 12" aria-hidden="true">
      <circle r="5" />
      <path d={`M0-5A5 5 0 0 1 0 5A${(5 * (1 - 2 * lit)).toFixed(1)} 5 0 0 ${lit < 0.5 ? 0 : 1} 0-5Z`} />
    </svg>
  );
}

const Kc = ({ children }: { children: React.ReactNode }) => <kbd>{children}</kbd>;

function Head({ n, name, side }: { n: number; name: string; side?: string }) {
  return (
    <div className="ph">
      <b>{n}</b>
      {name}
      {side && <span>{side}</span>}
    </div>
  );
}

export function AppMock() {
  return (
    <div className="mock" role="img" aria-label="Lirah: files pane, terminal running Claude Code, context chips and workspace tabs">
      <div className="mk" aria-hidden="true">
        <header className="tb">
          <svg className="lyre"><use href="#lyre" /></svg>
          <span className="gold">+ [1 waiting]</span>
          <span className="ctx">
            CTX <i style={{ "--w": "4.25%" } as React.CSSProperties} /> 8.5k/200k
          </span>
          <span className="sp" />
          <span>+ claude</span>
          <span data-to="index" className="idx">
            <em className="lamp" /> index <Kc>^</Kc><Kc>⇧</Kc><Kc>P</Kc>
          </span>
          <span>SANDBOX</span>
          <span>SETTINGS</span>
        </header>

        <section className="pane files">
          <Head n={1} name="FILES" />
          <p className="cnt"><span>5 in prompt</span><span>14 of 14</span></p>
          <ul>
            {FILES.map((r, i) =>
              r.d ? (
                <li key={i} className="dir">{r.d}</li>
              ) : (
                <li key={i} className={r.k ? "sel" : undefined}>
                  <span>{r.k && "›"}</span>
                  {r.f}
                  {r.k && <em>{r.k}</em>}
                </li>
              ),
            )}
          </ul>
        </section>

        <section className="pane term" data-to="sun">
          <Head n={2} name="TERMINAL" side="CLAUDE" />
          <pre>
            <span className="fd">~/projects/acme-api</span> <span className="gold">main</span> $ claude{"\n\n"}
            <span className="gold">&gt;</span> [5 files] add refresh-token rotation to the auth middleware{"\n\n"}
            <span className="ok">●</span> Update(src/middleware/auth.ts){"\n"}
            <span className="fd">  └ Updated </span>src/middleware/auth.ts <span className="fd">(+2 -1)</span>{"\n"}
            <span className="fd">      41  </span>if (session.expiresSoon()) {"{"}{"\n"}
            <span className="del"><span className="fd">      42 </span>- res.cookie(&quot;refresh&quot;, session.refresh, cookieOpts)</span>
            <span className="add"><span className="fd">      42 </span>+ const next = await rotateRefreshToken(session)</span>
            <span className="add"><span className="fd">      43 </span>+ res.cookie(&quot;refresh&quot;, next.token, cookieOpts)</span>
            <span className="fd">      44  </span>{"}"}{"\n\n"}
            <span className="ok">●</span> Update(src/lib/token.ts){"\n"}
            <span className="fd">  └ Updated </span>src/lib/token.ts <span className="fd">(+6)</span>{"\n\n"}
            8.5k of context. No files read outside the prompt.
          </pre>
        </section>

        <section className="pane ctxp" data-to="context">
          <div className="ph">
            <b>3</b>CONTEXT
            <span className="mode">type prompts in <u>terminal</u><u className="on">prompt box</u></span>
          </div>
          <div className="chips">
            {CHIPS.map(([m, f, d]) => (
              <span key={f} className={`chip ${m.toLowerCase()}`}><b>{m}</b>{f}<i>{d}</i></span>
            ))}
          </div>
          <div className="box">add refresh-token rotation to the auth middleware<span className="caret" /></div>
          <p className="foot"><span>~8.5k tokens attached</span><span>send <Kc>^</Kc><Kc>↵</Kc></span></p>
        </section>

        <section className="pane ws">
          <Head n={4} name="WORKSPACE" />
          <nav>
            <span className="on">tabs 3</span>
            <span data-to="jobs">jobs</span>
            <span data-to="plans">plans</span>
            <span>tasks</span>
          </nav>
          {TABS.map((t) => (
            <div key={t.to} className={`tab${t.on ? " on" : ""}`} data-to={t.to}>
              <p className="nm">
                <span className="car">{t.on && "›"}</span>
                <Moon lit={t.moon} />
                {t.name}
                <span className="df">
                  {t.diff ? (<><em className="del">{t.diff[0]}</em> <em className="add">{t.diff[1]}</em></>) : "clean"}
                  <Star />
                </span>
              </p>
              <p className="br" data-to={t.on ? "git" : undefined}><GitBranch aria-hidden="true" />{t.branch}</p>
              <p className="st">{t.state}</p>
            </div>
          ))}
          <p className="foot"><span>[1 waiting]</span><span><Kc>alt</Kc><Kc>A</Kc></span></p>
        </section>
      </div>
    </div>
  );
}
