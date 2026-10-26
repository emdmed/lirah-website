"use client";

import { Pane } from "./instrument/Pane";
import { KeyChord } from "./instrument/Keycap";
import { useLedger } from "./ledger/LedgerProvider";
import { TASK } from "./ledger/demoSession";
import { FeatureList, FeatureSection, FeatureSplit, PaneNote, TermChip, TryIt } from "./FeatureLayout";
import { EvalsPane } from "./EvalsPane";

const INDEX = ".orchestration/tools/compacted_acme-api.md";

// What the agent opens without the index: whole files, found by searching.
const OFF_READS = ["src/routes/index.ts", "src/routes/session.ts", "src/middleware/auth.ts", "src/lib/token.ts", "src/db/schema.ts"];

// With it: one grep, then only the line ranges the hits name.
const GREP_HITS = [
  "src/lib/token.ts:18-41: fn: rotateRefreshToken(session)",
  "src/lib/token.ts: used-by: src/middleware/auth.ts (rotateRefreshToken:52@requireSession)",
  "src/db/schema.ts:30-35: fn: findSessionByRefresh(token)",
];
const RANGE_READS = [
  { path: "src/lib/token.ts", lines: "18-41" },
  { path: "src/middleware/auth.ts", lines: "44-60" },
];


const HOW = [
  {
    term: <TermChip prefix="grep">used-by</TermChip>,
    title: "Finds the right lines first",
    body: "Each hit names a file and line range, plus every caller and the function it sits in. The agent opens those lines and nothing else.",
  },
  {
    term: <TermChip>.orchestration/</TermChip>,
    title: "Stays current on its own",
    body: "The index rebuilds when sources change, in the background on big repos, and never lands in git.",
  },
  {
    term: <KeyChord keys={["^", "⇧", "P"]} />,
    title: "Never in your way",
    body: (
      <>
        Switch it per tab with the key or <span className="text-foreground">:compact on</span>; it applies on the next
        prompt. A failing hook never blocks a prompt, and your own hooks still run.
      </>
    ),
  },
];

export function HooksSection() {
  const ledger = useLedger()!;
  const on = ledger.compact;
  const modes = [
    { on: false, label: "without index", opened: `${OFF_READS.length} files` },
    { on: true, label: "with index", opened: `${RANGE_READS.length} ranges` },
  ];

  return (
    <FeatureSection
      id="index"
      label="index"
      title="Your agent greps an index instead of reading the repo."
      intro={
        <>
          <p>
            Lirah keeps a symbol index of your project and tells the agent to grep it before opening files, then read
            only the lines a hit points to. It pays off most on questions that span several files, and we measured
            it: the results are below.
          </p>
          <p className="text-muted-foreground">
            It runs as a hook on every prompt in each Claude Code session Lirah starts, and can be switched off in
            settings.
          </p>
        </>
      }
    >
      <FeatureSplit>
        <Pane
          title="terminal · claude"
          className="pt-5"
          trailing={
            <span className="flex items-center gap-3">
              <TryIt />
              <span className="ins-legend normal-case max-sm:hidden">acme-api</span>
            </span>
          }
        >
          <div className="flex flex-wrap gap-1 px-4 pb-3" role="group" aria-label="Compare with and without the index">
            {modes.map((m) => (
              <button
                key={m.label}
                type="button"
                className="ins-key ins-key-panel h-8"
                aria-pressed={on === m.on}
                onClick={() => ledger.setCompact(m.on)}
              >
                [{m.label}]
                {/* On a phone the two keys keep one row; the line under the transcript carries the counts. */}
                <span className="tabular-nums text-muted-foreground max-sm:hidden">{m.opened}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-edge px-4 py-3 text-[12.5px] leading-[22px] [overflow-wrap:anywhere]">
            <p className="text-strong">
              <span className="text-lamp">&gt;</span> {TASK}
            </p>
            {on ? (
              <>
                <p className="ins-line-enter text-muted-foreground">
                  <span className="text-faint">⎿</span> UserPromptSubmit hook
                </p>
                <p className="ins-line-enter pl-4 text-muted-foreground">
                  COMPACTION: current → <span className="text-foreground">{INDEX}</span>
                </p>
                <p className="ins-line-enter mt-2 text-foreground">
                  ● Bash(grep -i -E &apos;rotateRefresh|findSession&apos; {INDEX})
                </p>
                {GREP_HITS.map((h) => (
                  <p key={h} className="ins-line-enter pl-4 text-muted-foreground">
                    {h}
                  </p>
                ))}
                {RANGE_READS.map((r) => (
                  <p key={r.path} className="ins-line-enter text-foreground">
                    ● Read({r.path} · lines {r.lines})
                  </p>
                ))}
              </>
            ) : (
              <>
                <p className="mt-2 text-foreground">● Search(pattern: &quot;refresh&quot;, path: &quot;src&quot;)</p>
                <p className="pl-4 text-muted-foreground">Found 9 files</p>
                {OFF_READS.map((p) => (
                  <p key={p} className="text-foreground">
                    ● Read({p})
                  </p>
                ))}
              </>
            )}
          </div>

          <p className="mx-4 mb-3 text-[12.5px] tabular-nums">
            <span className="text-muted-foreground">opened before the first edit: </span>
            <span className={on ? "text-muted-foreground line-through" : "text-warn"}>{OFF_READS.length} whole files</span>
            {" → "}
            <span className={on ? "text-ok" : "text-muted-foreground"}>{RANGE_READS.length} line ranges</span>
          </p>
          <PaneNote>Switch between the two to compare. A demo transcript; the measured results are below.</PaneNote>
        </Pane>

        <Pane title="how the index works" className="pt-5">
          <FeatureList items={HOW} />
        </Pane>
      </FeatureSplit>
      <div className="mt-10">
        <EvalsPane />
      </div>
    </FeatureSection>
  );
}
