"use client";

import { Pane } from "./instrument/Pane";
import { Lamp } from "./instrument/Lamp";
import { DiffBar } from "./instrument/DiffBar";
import { formatTokens } from "./instrument/Meter";
import { SectionHead } from "./SectionHead";
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
    <section aria-labelledby="jobs-title" className="scroll-mt-20 pt-28 sm:pt-36" id="jobs">
      <SectionHead id="jobs-title" label="jobs" title="Background agents. Nothing lands unreviewed.">
        <p>
          Start headless runs of Claude Code, opencode, Codex, Gemini, Cursor or Amp from a template and a set of context
          files, each in its own git worktree if you want. Race several agents on one task and compare what they wrote,
          side by side.
        </p>
      </SectionHead>

      <div className="mt-12 grid gap-x-10 gap-y-12 lg:grid-cols-2">
        {/* JOBS: live work is a box, settled work is a line. */}
        <Pane title="workspace · jobs" className="pt-5">
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
        </Pane>

        {/* Review sits beside the live work it applies to. */}
        <div className="space-y-3 text-[15px] leading-[1.7] text-muted-foreground lg:pt-5">
          <p className="text-strong">Read the diff, send notes back, then apply.</p>
          <p className="max-w-[52ch]">
            Applying waits for the TypeScript check to pass and asks before touching a dirty tree.
          </p>
        </div>
      </div>
    </section>
  );
}
