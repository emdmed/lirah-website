import { Pane } from "./instrument/Pane";
import { DiffBar } from "./instrument/DiffBar";
import { KeyChord } from "./instrument/Keycap";
import { FeatureSection, FeatureSplit } from "./FeatureLayout";

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

export function GitSection() {
  return (
    <FeatureSection
      id="git"
      label="git"
      title="Commits drafted. Merges shown first."
      intro={
        <>
          <p>
            When a change is ready, an agent reads the staged diff and drafts a conventional commit message for you to
            edit. Merging the branch back lists every git command before any of them runs.
          </p>
          <p className="text-muted-foreground">All of it is local git, run on your machine.</p>
        </>
      }
    >
      <FeatureSplit>
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

        </Pane>

        <Pane
          title="auto merge · acme-api"
          className="pt-5"
          trailing={<KeyChord keys={["alt", "M"]} size="sm" />}
        >
          <div className="space-y-3 px-4 pb-4 text-[13px]">
            <p className="text-foreground">
              {FEATURE} <span className="text-muted-foreground">→</span> {BASE}{" "}
              <span className="text-muted-foreground">· --no-ff</span>
            </p>
            <ol className="ins-glass space-y-1 p-3 text-[12.5px]" aria-label="Commands auto merge will run">
              {MERGE_COMMANDS.map((c) => (
                <li key={c} className="text-foreground [overflow-wrap:anywhere]">
                  <span className="text-muted-foreground" aria-hidden="true">$ </span>
                  {c}
                </li>
              ))}
            </ol>
            <p className="text-[12px] text-muted-foreground">
              on conflict: <span className="text-foreground">git merge --abort</span>, nothing changed
            </p>
            <p className="text-[12px] text-muted-foreground">
              Fast-forward or --no-ff. It knows when either branch is checked out in another worktree.
            </p>
            <div className="flex justify-end">
              <span className="ins-key ins-key-primary ins-key-panel" data-static>
                merge
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t border-edge px-4 py-4 text-[13px]">
            <span className="flex shrink-0 gap-1.5 pt-0.5">
              <KeyChord keys={["^", "["]} size="sm" />
              <KeyChord keys={["^", "]"]} size="sm" />
            </span>
            <p>
              <span className="text-strong">Diff viewer.</span>{" "}
              <span className="text-muted-foreground">
                Side by side, word level, unchanged regions folded. Step file to file and leave review notes as you read.
              </span>
            </p>
          </div>
        </Pane>
      </FeatureSplit>
    </FeatureSection>
  );
}
