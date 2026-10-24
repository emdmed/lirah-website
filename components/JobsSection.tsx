"use client";

import { Pane } from "./instrument/Pane";
import { Lamp } from "./instrument/Lamp";
import { DiffBar } from "./instrument/DiffBar";
import { formatTokens } from "./instrument/Meter";
import { FeatureSection, FeatureSplit, PaneNote } from "./FeatureLayout";
import { useLedger } from "./ledger/LedgerProvider";
import { selectionTokens } from "./ledger/demoSession";

function Scanner() {
  return (
    <span className="ins-scan" role="status" aria-label="running">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

// The race job starts from the context in the hero's prompt, so changing that
// selection changes what each agent here is handed.
export function JobsSection() {
  const ledger = useLedger()!;
  const files = Object.keys(ledger.selection).length;
  const jobTokens = selectionTokens(ledger.selection, ledger.compact);
  return (
    <FeatureSection
      id="jobs"
      label="jobs and plans"
      title="Work you don't have to watch. Nothing lands unreviewed."
      intro={
        <>
          <p>
            Start headless runs of any supported agent from a template and your context files, each in its own git
            worktree if you want. Race several agents on one task, compare what they wrote, and apply the one you want.
          </p>
          <p className="text-muted-foreground">
            For longer work, import a <span className="text-foreground">*_plan.md</span>: Lirah implements it chunk by
            chunk in the tab&apos;s agent and commits each one.
          </p>
        </>
      }
    >
      <FeatureSplit>
        {/* JOBS: live work is a box, settled work is a line. */}
        <Pane title="jobs" className="pt-5" trailing={<span className="ins-legend normal-case">acme-api</span>}>
          <div className="space-y-4 px-4 pb-4">
            <div className="ins-well p-3">
              <div className="flex items-center justify-between gap-3 text-[13px]">
                <span className="text-strong">race · add rate limiting to /login</span>
                <span className="text-[12px] text-muted-foreground">3 worktrees</span>
              </div>
              <p className="mt-1 text-[12px] tabular-nums text-muted-foreground">
                context: your prompt above <span className="text-faint">·</span> {files} files
                {ledger.compact ? " + skeleton" : ""} <span className="text-faint">·</span> {formatTokens(jobTokens)} each
              </p>
              <ul className="mt-3 space-y-2 text-[13px]">
                <li className="flex items-center gap-3">
                  <Lamp state="on" blink label="running" />
                  <span className="w-16 text-foreground">claude</span>
                  <Scanner />
                  <span className="text-muted-foreground">editing limiter.ts</span>
                </li>
                <li className="flex items-center gap-3">
                  <Lamp state="ok" label="done" />
                  <span className="w-16 text-foreground">codex</span>
                  <DiffBar added={84} removed={12} />
                </li>
                <li className="flex items-center gap-3">
                  <Lamp state="warn" label="conflict" />
                  <span className="w-16 text-foreground">gemini</span>
                  <span className="text-warn">conflict in routes/login.ts</span>
                </li>
              </ul>
              <div className="mt-3 flex flex-wrap gap-1 border-t border-edge pt-2">
                <span className="ins-key ins-key-panel" data-static>[compare]</span>
                <span className="ins-key ins-key-panel" data-static>[review diff]</span>
                <span className="ins-key ins-key-panel" data-static>[reconcile]</span>
              </div>
            </div>
            <ul className="space-y-1.5 text-[13px] text-muted-foreground">
              <li className="flex items-center gap-3">
                <Lamp state="ok" label="applied" />
                <span className="flex-1 truncate">applied · fix flaky session test · claude</span>
                <DiffBar added={12} removed={4} width={24} />
              </li>
              <li className="flex items-center gap-3">
                <Lamp state="fault" label="failed" />
                <span className="flex-1 truncate">failed · lint sweep · opencode · type check</span>
              </li>
              <li className="flex items-center gap-3">
                <Lamp state="off" />
                <span className="flex-1 truncate">archived · 6 jobs</span>
              </li>
            </ul>
          </div>
          <PaneNote>
            Read the diff and send notes back first. Applying waits for the TypeScript check to pass and asks before
            touching a dirty tree.
          </PaneNote>
        </Pane>

        {/* Sequential work beside the parallel work: one plan, one commit per chunk. */}
        <Pane title="plan" className="pt-5" trailing={<span className="ins-legend normal-case">auth-hardening</span>}>
          <div className="space-y-3 px-4 pb-4 text-[13px]">
            <p className="flex items-center gap-3 text-muted-foreground">
              <Lamp state="ok" label="implemented" />
              1–3 implemented <span className="text-faint">·</span> 3 commits
            </p>
            <div className="ins-well p-3">
              <p className="flex items-center gap-3">
                <Lamp state="on" blink label="implementing" />
                <span className="text-strong">4 · rotate refresh tokens on use</span>
              </p>
              <p className="mt-2 pl-[19px] text-[12px] text-muted-foreground">
                implementing in acme-api <span className="text-faint">·</span> commit trailer Plan-Chunk: 4
              </p>
            </div>
            <ul className="space-y-1.5 pl-[19px] text-faint">
              <li>5 · revoke sessions on password change</li>
              <li>6 · add api key scopes</li>
              <li>7 · audit log for auth events</li>
            </ul>
            <p className="flex items-center gap-3 border-t border-edge pt-3">
              <Lamp state="on" label="autopilot on" />
              <span className="text-foreground">:autopilot</span>
              <span className="text-muted-foreground">chains the remaining chunks</span>
            </p>
          </div>
          <PaneNote>
            Check, review, roll back, skip or reorder any chunk. Autopilot stops when the agent asks a question, needs
            permission or forgets to commit.
          </PaneNote>
        </Pane>
      </FeatureSplit>
    </FeatureSection>
  );
}
