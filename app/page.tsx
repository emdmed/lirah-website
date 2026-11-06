import "./plate.css";
import { CROSS_FILE, EVALS_MODEL, EVALS_URL } from "@/components/evalResults";
import { CopyCommand, OrreryMorph, OrreryMotion, PlateDownload } from "@/components/PlateActions";
import { Orrery, OrrerySky } from "@/components/Orrery";
import { AppMock } from "@/components/AppMock";
import { Hit, Locator, Tabs, Merge, PlanTrack, Race, Rings } from "@/components/ChapterFigs";
import { REPO_URL, getLatestRelease } from "@/lib/releases";

export const revalidate = 3600;

const pct = (ratio: number) => Math.round((1 - ratio) * 100);
const { ownRepo } = CROSS_FILE;

const EVAL_ROWS = [
  { label: "Cost per cross-file question", scope: "Lirah's codebase", ratio: ownRepo.cost },
  { label: "Time to the same answer", scope: "Lirah's codebase", ratio: ownRepo.time },
  { label: "API cost", scope: "both repos", ratio: CROSS_FILE.cost },
  { label: "Tool calls", scope: "both repos", ratio: CROSS_FILE.tools },
];

// Engraved water above the footer: hairline sines, each a little out of phase.
const WAVES = Array.from({ length: 12 }, (_, k) => {
  let d = "";
  for (let x = 0; x <= 1200; x += 12) d += (x ? "L" : "M") + x + " " + (10 + k * 9 + Math.sin(x / 70 + k * 0.55) * (3 + k * 0.5)).toFixed(1);
  return d;
});

const TICKER = (
  <>
    <span>In the terminal</span><b>Claude Code</b><b>opencode</b><i>/</i>
    <span>As headless jobs</span><b>Codex</b><b>Gemini</b><b>Cursor</b><b>Amp</b><i>/</i>
    <span>Your own CLI, login and plan</span><i>/</i><span>No account</span><i>/</i><span>MIT licensed</span><i>/</i>
  </>
);

function Lyre() {
  return (
    <svg aria-hidden="true">
      <use href="#lyre" />
    </svg>
  );
}

function Dim({ ratio }: { ratio: number }) {
  return (
    <div className="dim" role="img" aria-label={`1.00 alone, ${ratio.toFixed(2)} with Lirah`}>
      <div className="ln"><em>alone</em><i /><u>1.00</u></div>
      <div className="ln on"><em>with Lirah</em><i style={{ "--w": `${ratio * 100}%` } as React.CSSProperties} /><u>{ratio.toFixed(2)}</u></div>
    </div>
  );
}

function Chapter({ id, no, name, children }: { id: string; no: string; name: string; children: React.ReactNode }) {
  return (
    <section className="ch ruled" id={id} aria-labelledby={`${id}-h`}>
      <div className="no">
        <div>
          <b>
            {no}
            {no !== "?" && <small> / 06</small>}
          </b>
          <span>{name}</span>
          {no !== "?" && <Locator id={id} />}
        </div>
      </div>
      <div className="body">{children}</div>
    </section>
  );
}

const w = (v: string) => ({ "--w": v }) as React.CSSProperties;

export default async function Home() {
  const release = await getLatestRelease();

  return (
    <div className="mp">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <symbol id="lyre" viewBox="2 1.5 96 96">
          <path d="M22 8C24 34 12 48 14 64C16 84 32 94 50 94C68 94 84 84 86 64C88 48 76 34 78 8C77 34 70 48 70 60C70 74 62 80 50 80C38 80 30 74 30 60C30 48 23 34 22 8Z" stroke="none" />
          <path d="M50 5Q51.28 15.08 58 17Q51.28 18.92 50 29Q48.72 18.92 42 17Q48.72 15.08 50 5Z" stroke="none" />
          <path d="M23.5 32Q50 41 76.5 32" fill="none" strokeWidth="3" strokeLinecap="round" />
          <path d="M40 35.6L40 78M50 37L50 80M60 35.6L60 78" fill="none" strokeWidth="2.2" strokeLinecap="round" />
        </symbol>
      </svg>

      <div className="page">
        <header className="bar">
          <a className="wm" href="#top" aria-label="Lirah home">
            <Lyre />
            <b>Lirah</b>
            <small>A workspace for CLI coding agents</small>
          </a>
          <nav aria-label="Main">
            <a href="#context">Context</a>
            <a href="#workspace">Workspace</a>
            <a href="#jobs">Jobs</a>
            <a href="#evals">Evals</a>
            <a href="/blog">Blog</a>
            <a href={REPO_URL}>GitHub</a>
            <a className="btn line sm" href="#install">Download</a>
          </nav>
        </header>

        <main id="top">
          <section className="plate" aria-labelledby="hero-h">
            <OrrerySky className="sky" />
            <Orrery className="art" />
            <OrreryMotion />
            <div className="col">
              <h1 id="hero-h">
                Your agent reads less.
                <br />
                <i>You</i> decide what.
              </h1>
              <p className="pitch">Claude Code or opencode runs unchanged in a real terminal. It greps Lirah&apos;s index instead of reading your repo, and gets the files you pick at the detail you pick.</p>
              <div className="figs">
                <div className="fg">
                  <b>{pct(ownRepo.cost)}%</b>
                  <span>cheaper per cross-file question</span>
                  <i className="m" style={w(`${ownRepo.cost * 100}%`)} role="img" aria-label={`${ownRepo.cost.toFixed(2)} of the cost of Claude Code alone`} />
                </div>
                <div className="fg">
                  <b>{pct(ownRepo.time)}%</b>
                  <span>faster to the same answer</span>
                  <i className="m" style={w(`${ownRepo.time * 100}%`)} role="img" aria-label={`${ownRepo.time.toFixed(2)} of the time of Claude Code alone`} />
                </div>
              </div>
              <p className="how">
                Against Claude Code alone, on Lirah&apos;s own codebase · <a href="#evals">how we measured</a>
              </p>
              <div className="get">
                <PlateDownload release={release} anchor />
                <span>Linux, macOS and Windows · free and open source</span>
              </div>
            </div>
          </section>

          <p className="cap plate-cap">
            <span><b>Plate I</b> · The workspace. The terminal at the centre; everything else orbits it.</span>
            <span>Scale: Claude Code alone = 1.00</span>
          </p>

          <div className="ticker">
            <div>
              <p>{TICKER}</p>
              <p aria-hidden="true">{TICKER}</p>
            </div>
          </div>

          <section className="app" aria-label="The app">
            <figure>
              <div className="frame">
                <AppMock />
                <span className="co" style={{ "--x": "7%", "--y": "30%" } as React.CSSProperties}><span><b>1</b>Files<em>pick what the agent sees</em></span></span>
                <span className="co" style={{ "--x": "33%", "--y": "19%" } as React.CSSProperties}><span><b>2</b>Terminal<em>the real CLI, unchanged</em></span></span>
                <span className="co b" style={{ "--x": "56%", "--y": "76%" } as React.CSSProperties}><span><b>3</b>Context<em>edit, read or copy, per file</em></span></span>
                <span className="co l" style={{ "--x": "93%", "--y": "21%" } as React.CSSProperties}><span><b>4</b>Workspace<em>an agent per project tab</em></span></span>
                <OrreryMorph />
              </div>
              <figcaption className="cap">
                <span><b>Plate II</b> · the full app, Rivendell theme, one task in flight</span>
                <span>Demo data</span>
              </figcaption>
            </figure>
          </section>

          <section className="evals ruled" id="evals" aria-labelledby="evals-h">
            <div className="head">
              <h2 id="evals-h">
                Same agent, same questions. <i>With</i> and without the index.
              </h2>
              <p className="method">
                {CROSS_FILE.tasks} questions that each need 3+ files, 3 runs each way, on a small repo and on Lirah&apos;s own app. Every answer graded against the files it should name. {EVALS_MODEL}. <a href={EVALS_URL}>The evals</a>
              </p>
            </div>
            <table className="cmp">
              <thead>
                <tr>
                  <th scope="col">Measure</th>
                  <th scope="col">Claude Code alone vs with Lirah</th>
                  <th scope="col">Change</th>
                </tr>
              </thead>
              <tbody>
                {EVAL_ROWS.map((r) => (
                  <tr key={r.label}>
                    <td>{r.label}<small>{r.scope}</small></td>
                    <td className="dw"><Dim ratio={r.ratio} /></td>
                    <td><b>−{pct(r.ratio)}%</b></td>
                  </tr>
                ))}
                <tr>
                  <td>Tasks that got cheaper</td>
                  <td className="dw">
                    <div className="pips" role="img" aria-label={`${CROSS_FILE.tasksCheaper} of ${CROSS_FILE.tasks} tasks cheaper with Lirah`}>
                      {Array.from({ length: CROSS_FILE.tasks }, (_, i) => (
                        <i key={i} className={i < CROSS_FILE.tasksCheaper ? undefined : "off"} />
                      ))}
                    </div>
                  </td>
                  <td><b>{CROSS_FILE.tasksCheaper} of {CROSS_FILE.tasks}</b></td>
                </tr>
                <tr>
                  <td>Answers correct</td>
                  <td className="dw"><span className="mono" style={{ color: "var(--muted)" }}>alone {CROSS_FILE.correct}% · with Lirah {CROSS_FILE.correct}%</span></td>
                  <td><b>Same</b><span>every answer right</span></td>
                </tr>
              </tbody>
            </table>
          </section>

          <Chapter id="context" no="01" name="Context">
            <h2 id="context-h">Stop paying for files your agent didn&apos;t need.</h2>
            <p className="lede">Pick what the agent sees, and send big files as signatures. schema.ts goes from 12.6k tokens to 2.1k.</p>
            <figure className="fig">
              <div className="rows lv" role="img" aria-label="src/db/schema.ts: full text 12.6k tokens, signatures 2.1k, skeleton 0.9k">
                <div className="row"><span>Full text</span><b><i style={w("100%")} /><em>12.6k</em></b></div>
                <div className="row on"><span>Signatures</span><b><i style={w("16.7%")} /><em>2.1k<small>83% fewer tokens</small></em></b></div>
                <div className="row"><span>Skeleton</span><b><i style={w("7.1%")} /><em>0.9k</em></b></div>
              </div>
              <figcaption className="cap"><span><b>Fig. 1a</b> · One file at three detail levels</span><span>src/db/schema.ts · demo project</span></figcaption>
            </figure>
            <div className="notes">
              <div><b>Intent per file</b>Mark each file <code>EDIT</code>, <code>READ</code> or <code>COPY</code>: change it, read it, or copy its pattern.</div>
              <div><b>Box or terminal</b>Type into Claude Code; a hook appends your picks.</div>
              <div><b>Context sets</b>Save a selection by name, load it later.</div>
            </div>
            <h3 className="sub" id="index">Your agent greps an index instead of reading the repo.</h3>
            <p className="lede">Lirah keeps a symbol index of your project. The agent greps it, then reads only the lines a hit names.</p>
            <Hit />
            <div className="notes">
              <div><b>Finds the right lines first</b>Each hit names the lines, the callers and the enclosing function.</div>
              <div><b>Stays current on its own</b>Rebuilds when sources change. Never lands in git.</div>
              <div><b>Never in your way</b>Per tab, with the key or <code>:compact</code> on. A failing hook never blocks a prompt.</div>
            </div>
          </Chapter>

          <Chapter id="workspace" no="02" name="Workspace">
            <h2 id="workspace-h">One window, an agent per project.</h2>
            <p className="lede">Every project tab runs its own agent, and its row lights up when the agent needs you.</p>
            <Tabs />
            <h3 className="sub">Budgets that catch a runaway session.</h3>
            <p className="lede">Daily or weekly token budgets per project, with warnings at 80% and 95%.</p>
            <figure className="fig">
              <div className="rows bud" role="img" aria-label="Tokens used today, with warning marks at 80% and 95% against each project's daily budget">
                <div className="row"><span>acme-api</span><i style={w("82%")} /><em>412k / 500k</em></div>
                <div className="row"><span>acme-web</span><i style={w("30%")} /><em>118k / 400k</em></div>
                <div className="row warn"><span>acme-db</span><i style={w("97%")} /><em>291k / 300k</em></div>
                <div className="row"><span>infra</span><i style={w("15%")} /><em>22k / 150k</em></div>
              </div>
              <figcaption className="cap"><span><b>Fig. 2b</b> · Tokens used today against each daily budget</span><span>marks at 80% and 95% · demo data</span></figcaption>
            </figure>
          </Chapter>

          <Chapter id="jobs" no="03" name="Jobs and plans">
            <h2 id="jobs-h">Work you don&apos;t have to watch. You choose what lands.</h2>
            <p className="lede">Race headless agents in their own worktrees, or let a plan commit itself chunk by chunk. You apply what you want.</p>
            <div className="two">
              <Race />
              <PlanTrack />
            </div>
          </Chapter>

          <Chapter id="git" no="04" name="Git">
            <h2 id="git-h">Commits drafted. Merges shown first.</h2>
            <p className="lede">An agent drafts the commit message. A merge lists every git command before it runs.</p>
            <Merge />
          </Chapter>

          <Chapter id="sandbox" no="05" name="Sandbox">
            <h2 id="sandbox-h">Let the agent run, inside a sandbox.</h2>
            <p className="lede">On Linux each tab can run in bubblewrap: the system read-only, the project writable, keys and git config locked. macOS and Windows run without it.</p>
            <Rings />
            <div className="notes">
              <div><b>Network isolation</b>One more switch cuts the network.</div>
              <div><b>Ubuntu</b>Installs the AppArmor profile on Ubuntu 24.04+.</div>
              <div><b>Never a dead end</b>If it can&apos;t start, retry the tab without it.</div>
            </div>
          </Chapter>

          <Chapter id="faq" no="?" name="Questions">
            <h2 id="faq-h">Questions before you install.</h2>
            <div className="faq">
              <div><h3>Does Lirah replace or wrap my agent?</h3><p>No. It starts the agent&apos;s own CLI in a real terminal, with your config, login and plan. Lirah never calls a model API itself.</p></div>
              <div><h3>Which agents and platforms does it support?</h3><p>Claude Code and opencode run in tabs; Codex, Gemini, Cursor and Amp run as background jobs. Linux first; macOS and Windows work without the sandbox.</p></div>
              <div><h3>Does anything leave my machine?</h3><p>Only an update check to GitHub&apos;s API, with none of your data. No telemetry, and Lirah never pushes or pulls.</p></div>
              <div><h3>Is it free?</h3><p>Yes. MIT licensed, no account, source at <a href={REPO_URL}>github.com/emdmed/lirah</a>. You still pay for your agent plan.</p></div>
              <div><h3>What happens if I stop using Lirah?</h3><p>Nothing to migrate. The agents are the same CLIs, and every commit is ordinary local git.</p></div>
              <div><h3>Why not tmux and my editor?</h3><p>Keep them; nvim and lazygit open in the second terminal. Lirah adds what a multiplexer can&apos;t see: what the agent reads, how full its context is, whether it&apos;s waiting on you, and jobs and plans.</p></div>
            </div>
          </Chapter>

          <Chapter id="install" no="06" name="Install">
            <h2 id="install-h">Install Lirah.</h2>
            <p className="lede">The script picks .deb, .rpm or AppImage for your distro, and builds from source on Arch.</p>
            <div className="install">
              <div><PlateDownload release={release} /></div>
              <CopyCommand />
              <p className="formats">
                <span>Linux x86_64: .AppImage · .deb · .rpm</span>
                <span>macOS: .dmg for Intel and Apple silicon</span>
                <span>Windows x64: .exe · .msi</span>
                <a href={REPO_URL}>Build from source</a>
              </p>
            </div>
          </Chapter>
        </main>

        <svg className="waves" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          {WAVES.map((d, i) => <path key={i} d={d} />)}
        </svg>
        <footer className="ruled">
          <a className="wm" href="#top" aria-label="Back to top">
            <Lyre />
            <b>Lirah</b>
          </a>
          <span>© 2026 Lirah contributors · MIT</span>
          <nav aria-label="Footer">
            <a href={REPO_URL}>GitHub</a>
            <a href="/blog">Blog</a>
            <a href="#evals">Evals</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}
