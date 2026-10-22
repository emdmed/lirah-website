import { Pane } from "./instrument/Pane";
import { KeyChord } from "./instrument/Keycap";
import { SectionHead } from "./SectionHead";

const GROUPS: { title: string; rows: { keys: string[][]; action: string; note?: string }[] }[] = [
  {
    title: "git",
    rows: [
      { keys: [["^", "⇧", "space"]], action: "Auto commit", note: "an agent writes the conventional commit message; you edit it" },
      { keys: [["alt", "M"]], action: "Auto merge", note: "shows the git commands first, rolls back on conflict or failed checks" },
      { keys: [["^", "["], ["^", "]"]], action: "Diff viewer", note: "side by side, word level, with review notes" },
      { keys: [], action: "Auto changelog", note: "a headless agent updates CHANGELOG.md after a commit, with undo" },
    ],
  },
  {
    title: "terminal",
    rows: [
      { keys: [["^", "K"]], action: "Launch the tab's agent" },
      { keys: [["^", "`"]], action: "Second terminal", note: "beside the main one, or fullscreen" },
      { keys: [["alt", "N"], ["alt", "L"]], action: "nvim, lazygit" },
      { keys: [["^", "⇧", "F"]], action: "Search scrollback" },
      { keys: [["^", "S"]], action: "Navigation mode", note: "stops the agent and switches to the file view" },
    ],
  },
  {
    title: "panes and palette",
    rows: [
      { keys: [["alt", "1–4"]], action: "Focus a pane" },
      { keys: [[":"]], action: "Command line", note: "fuzzy, with argument completion" },
      { keys: [["^", "P"]], action: "Starred projects" },
      { keys: [["^", "H"]], action: "Every shortcut", note: "or hold Ctrl for the hint bar" },
    ],
  },
  {
    title: "tokens",
    rows: [
      { keys: [["^", "⇧", "D"]], action: "Token dashboard", note: "by day, project and model, with CSV export" },
      { keys: [["^", "⇧", "B"]], action: "Budgets", note: "daily and weekly limits per project, alerts at 80% and 95%" },
    ],
  },
];

export function KeysSection() {
  return (
    <section aria-labelledby="keys-title" className="scroll-mt-20 pt-28 sm:pt-36" id="keys">
      <SectionHead id="keys-title" title="A real terminal, and everything else on a key.">
        <p>
          The agent runs in xterm.js on a real login-shell PTY, so it behaves exactly as it does in your own terminal.
          Commits, merges, diffs, a second terminal and the token dashboard are a shortcut away.
        </p>
      </SectionHead>

      <div className="mt-12 grid gap-x-10 gap-y-12 lg:grid-cols-2">
        {GROUPS.map((g) => (
          <Pane key={g.title} title={g.title} className="pt-4">
            <dl className="divide-y divide-edge">
              {g.rows.map((r) => (
                <div key={r.action} className="grid gap-x-4 gap-y-1 px-4 py-2.5 sm:grid-cols-[150px_minmax(0,1fr)]">
                  <dt className="flex flex-wrap items-center gap-2">
                    {r.keys.length ? r.keys.map((k, i) => <KeyChord key={i} keys={k} />) : (
                      <span className="ctx-chip">
                        <span className="px-1.5 text-muted-foreground">auto</span>
                      </span>
                    )}
                  </dt>
                  <dd className="text-[14px]">
                    <span className="text-strong">{r.action}</span>
                    {r.note && <span className="text-muted-foreground"> · {r.note}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </Pane>
        ))}
      </div>
    </section>
  );
}
