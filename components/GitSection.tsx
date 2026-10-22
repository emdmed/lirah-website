import { Pane } from "./instrument/Pane";
import { Lamp } from "./instrument/Lamp";
import { DiffBar } from "./instrument/DiffBar";
import { KeyChord } from "./instrument/Keycap";
import { SectionHead } from "./SectionHead";

// The app's subject-line limit (AutoCommitDialog SUBJECT_MAX).
const SUBJECT_MAX = 72;
const SUBJECT = "feat(auth): rotate refresh tokens on use";
const BODY = "Issue a new refresh token on every refresh and revoke the old one, so a stolen token works at most once.";

const STAGED: { status: "M" | "A"; path: string; added: number; removed: number }[] = [
  { status: "M", path: "src/auth/token.ts", added: 48, removed: 12 },
  { status: "M", path: "src/auth/middleware.ts", added: 21, removed: 9 },
  { status: "A", path: "src/auth/token.test.ts", added: 64, removed: 0 },
];

const FEATURE = "feat/token-rotation";
const BASE = "main";
const MERGE_COMMANDS = [
  `git switch ${BASE}`,
  `git merge --no-ff -m "Merge branch '${FEATURE}' into ${BASE}" ${FEATURE}`,
];

const TOOLS: { keys: string[][]; title: string; body: string }[] = [
  {
    keys: [["^", "⇧", "space"]],
    title: "Auto commit",
    body: "Stages your changes and has an agent draft a conventional commit message from the diff. You edit it before anything is committed. The CLI it uses and any extra instructions are set in Settings.",
  },
  {
    keys: [["alt", "M"]],
    title: "Auto merge",
    body: "Merges the feature branch into a base, fast-forward or --no-ff. It lists the git commands before it runs them, and aborts the merge on a conflict or a merge that doesn't complete, so the repo is left as it was. It knows when either branch is checked out in another worktree.",
  },
  {
    keys: [],
    title: "Auto changelog",
    body: "After a commit or merge, a headless agent updates CHANGELOG.md. The toast that reports it has an Undo.",
  },
  {
    keys: [["^", "["], ["^", "]"]],
    title: "Diff viewer",
    body: "Side by side, word level, with unchanged regions folded. Step file to file and leave review notes as you read.",
  },
];

export function GitSection() {
  return (
    <section aria-labelledby="git-title" className="scroll-mt-20 pt-28 sm:pt-36" id="git">
      <SectionHead id="git-title" title="Commit messages drafted for you, merges shown before they run.">
        <p>
          When a change is ready, an agent reads the staged diff and drafts a conventional commit message for you to
          edit, with a counter for the subject line. Merging the branch back lists every git command before any of
          them runs.
        </p>
        <p className="text-muted-foreground">
          All of it is local git. Lirah never pushes, pulls or fetches for you.
        </p>
      </SectionHead>

      <div className="mt-12 grid gap-x-10 gap-y-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
        <Pane title="auto commit · acme-api" className="pt-5" trailing={<KeyChord keys={["^", "⇧", "space"]} size="sm" />}>
          <div className="space-y-4 px-4 pb-4">
            <ul className="space-y-1.5 text-[13px]">
              {STAGED.map((f) => (
                <li key={f.path} className="flex items-center gap-3">
                  <span className={f.status === "A" ? "text-ok" : "text-warn"}>{f.status}</span>
                  <span className="min-w-0 flex-1 truncate text-foreground">{f.path}</span>
                  <DiffBar added={f.added} removed={f.removed} width={32} />
                </li>
              ))}
            </ul>

            <div className="ins-well p-3 text-[13px]">
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="ins-legend">message · drafted by claude</span>
                <span className="tabular-nums text-muted-foreground">
                  {SUBJECT.length}/{SUBJECT_MAX}
                </span>
              </div>
              <p className="mt-2 break-words text-strong">{SUBJECT}</p>
              <p className="mt-2 text-muted-foreground">{BODY}</p>
            </div>
            <div className="flex justify-end">
              <span className="ins-key ins-key-primary ins-key-panel" data-static>
                commit
              </span>
            </div>
          </div>

          <div className="space-y-3 border-t border-edge px-4 py-4 text-[13px]">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <span className="text-foreground">
                auto merge <span className="text-muted-foreground">{FEATURE} → {BASE}</span>
              </span>
              <KeyChord keys={["alt", "M"]} size="sm" />
            </div>
            <ol className="ins-glass space-y-1 p-3 text-[12.5px]" aria-label="Commands auto merge will run">
              {MERGE_COMMANDS.map((c) => (
                <li key={c} className="text-foreground [overflow-wrap:anywhere]">
                  <span className="text-faint" aria-hidden="true">$ </span>
                  {c}
                </li>
              ))}
            </ol>
            <p className="text-[12px] text-muted-foreground">
              on conflict: <span className="text-foreground">git merge --abort</span>, nothing changed
            </p>
            <p className="flex items-center gap-3 border-t border-edge pt-3 text-muted-foreground">
              <Lamp state="ok" label="done" />
              CHANGELOG.md updated by a headless agent
              <span className="ins-key ins-key-panel ml-auto" data-static>
                [undo]
              </span>
            </p>
          </div>
        </Pane>

        <Pane title="git" className="pt-5">
          <dl className="divide-y divide-edge">
            {TOOLS.map((t) => (
              <div key={t.title} className="space-y-1.5 px-4 py-3.5">
                <dt className="flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-strong">{t.title}</span>
                  {t.keys.length ? (
                    t.keys.map((k, i) => <KeyChord key={i} keys={k} size="sm" />)
                  ) : (
                    <span className="text-[12px] text-muted-foreground">after commit or merge</span>
                  )}
                </dt>
                <dd className="text-[14px] text-muted-foreground">{t.body}</dd>
              </div>
            ))}
          </dl>
        </Pane>
      </div>
    </section>
  );
}
