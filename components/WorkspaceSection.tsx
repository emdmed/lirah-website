"use client";

import { Pane } from "./instrument/Pane";
import { Lamp, type LampState } from "./instrument/Lamp";
import { ContextMoon } from "./instrument/ContextMoon";
import { KeyChord } from "./instrument/Keycap";
import { SectionHead } from "./SectionHead";
import { useLedger } from "./ledger/LedgerProvider";
import { CONTEXT_MAX, DEMO_TAB, TAB_TOKENS } from "./ledger/demoSession";

const TABS: {
  name: string;
  role?: string;
  lamp: LampState;
  blink?: boolean;
  state: string;
  branch: string;
  trail: string;
  plan?: string;
  shares?: string;
}[] = [
  { name: "acme-api", role: "api", lamp: "on", blink: true, state: "working", branch: "feat/token-rotation", trail: "auth.ts token.ts", plan: "auth-hardening 4/7" },
  { name: "acme-web", role: "ui", lamp: "warn", state: "needs permission", branch: "main", trail: "LoginForm.tsx" },
  { name: "acme-db", role: "db", lamp: "warn", state: "waiting on you", branch: "migrations", trail: "0008_api_keys.sql" },
  { name: "infra", lamp: "ok", state: "done", branch: "ops/tf-1.9", trail: "main.tf variables.tf" },
  { name: "acme-api·2", lamp: "on", blink: true, state: "working", branch: "fix/rate-limit", trail: "limiter.ts", shares: "same repo as acme-api" },
  { name: "docs", lamp: "off", state: "idle", branch: "main", trail: "" },
];

// Picking a row points the status-bar meter at that tab, as switching tabs
// does in the app. acme-api is the demo session from the hero.
export function WorkspaceSection() {
  const ledger = useLedger()!;
  const tokensOf = (name: string) => (name === DEMO_TAB ? ledger.tokens : (TAB_TOKENS[name] ?? 0));
  return (
    <section aria-labelledby="workspace-title" className="scroll-mt-20 pt-28 sm:pt-36" id="workspace">
      <SectionHead id="workspace-title" label="workspace" title="Up to eight agents, one window.">
        <p>
          Each project tab has its own terminal, agent and sandbox. Hook plugins for Claude Code and opencode report
          when an agent is working, needs permission, is waiting on you or is done, and the tab row lights to match.
        </p>
        <p className="text-muted-foreground">
          Rows show how full each agent&apos;s context is, its branch and the files it edited last turn. Attach those files
          to another tab&apos;s prompt, or link that tab&apos;s repo. Terminals survive a reload and pick up where they were.
        </p>
      </SectionHead>

      <Pane
        title="workspace · tabs"
        index="4"
        className="mt-12 pt-5"
        trailing={
          <span className="flex items-center gap-2 text-[11px] text-muted-foreground">
            next waiting <KeyChord keys={["alt", "A"]} size="sm" />
          </span>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-[13px]">
            <thead>
              <tr className="ins-legend">
                <th scope="col" className="w-10 py-2 pl-4 font-normal"><span className="sr-only">Context</span></th>
                <th scope="col" className="py-2 font-normal">tab</th>
                <th scope="col" className="py-2 font-normal">agent</th>
                <th scope="col" className="py-2 font-normal">branch</th>
                <th scope="col" className="py-2 font-normal">last turn</th>
                <th scope="col" className="py-2 pr-4 font-normal">plan</th>
              </tr>
            </thead>
            <tbody>
              {TABS.map((t) => {
                const active = ledger.tab === t.name;
                return (
                  <tr
                    key={t.name}
                    className={`border-t border-edge ${active ? "bg-[color-mix(in_srgb,var(--foreground)_6%,transparent)]" : ""}`}
                    aria-current={active || undefined}
                  >
                    <td className="py-3 pl-4">
                      <ContextMoon ratio={tokensOf(t.name) / CONTEXT_MAX} size={16} />
                    </td>
                    <td className="py-3">
                      <button
                        type="button"
                        className="ins-key ins-key-panel -ml-2"
                        aria-pressed={active}
                        title="Show this tab's context in the status bar"
                        onClick={() => ledger.setTab(t.name)}
                      >
                        {t.name}
                      </button>
                      {t.role && <span className="ml-1 text-[11px] text-muted-foreground">{t.role}</span>}
                      {t.shares && <div className="text-[11.5px] text-warn">{t.shares}</div>}
                    </td>
                    <td className="py-3">
                      <span className="flex items-center gap-2.5">
                        <Lamp state={t.lamp} blink={t.blink} />
                        <span className={t.lamp === "warn" ? "text-warn" : t.lamp === "off" ? "text-muted-foreground" : "text-foreground"}>
                          {t.state}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{t.branch}</td>
                    <td className="py-3 text-foreground">{t.trail || <span className="text-faint">·</span>}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{t.plan ?? <span className="text-faint">·</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="border-t border-edge px-4 py-3 text-[12px] text-muted-foreground">
          Pick a tab to read its context on the meter above <span className="text-faint">·</span> [2 waiting]{" "}
          <span className="text-faint">·</span> desktop notifications when an agent stops for you{" "}
          <span className="text-faint">·</span> demo data
        </p>
      </Pane>
    </section>
  );
}
