"use client";

import { useEffect, useRef, useState } from "react";
import { Pane } from "./instrument/Pane";
import { Lamp } from "./instrument/Lamp";
import { Keycap } from "./instrument/Keycap";
import { ContextMoon } from "./instrument/ContextMoon";
import { formatTokens } from "./instrument/Meter";
import { useLedger } from "./ledger/LedgerProvider";
import {
  CONTEXT_MAX,
  INDEX_HOOK_TOKENS,
  DETAIL_LABEL,
  EXPLORE_ORDER,
  FILES,
  MODE_LABEL,
  MODE_TITLE,
  TASK,
  fileByPath,
  hasDetail,
} from "./ledger/demoSession";

const STEP_MS = 230;
const HOLD_MS = 1500;

function splitPath(path: string) {
  const i = path.lastIndexOf("/");
  return i < 0 ? ["", path] : [path.slice(0, i + 1), path.slice(i + 1)];
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// A working replica of a Lirah window running a demo session. Act one: an
// agent left to explore reads the repo and the context meter climbs into its
// warn zone. Act two: the same task with explicit context. Then it's yours.
export function HeroReplica() {
  const ledger = useLedger()!;
  const { scene, readCount, selection, compact, tokens, setScene, setReadCount } = ledger;
  const [playing, setPlaying] = useState(false);
  const [runId, setRunId] = useState(0);
  const termRef = useRef<HTMLDivElement>(null);

  // The scripted run.
  useEffect(() => {
    if (prefersReducedMotion()) {
      setReadCount(EXPLORE_ORDER.length);
      setScene("explicit");
      return;
    }
    let n = 0;
    let timer: ReturnType<typeof setTimeout>;
    setScene("explore");
    setReadCount(0);
    const step = () => {
      if (n === 0) setPlaying(true);
      n += 1;
      setReadCount(n);
      if (n < EXPLORE_ORDER.length) timer = setTimeout(step, STEP_MS);
      else
        timer = setTimeout(() => {
          setScene("explicit");
          setPlaying(false);
        }, HOLD_MS);
    };
    timer = setTimeout(step, 700);
    return () => clearTimeout(timer);
  }, [runId, setReadCount, setScene]);

  useEffect(() => {
    const el = termRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    el.toggleAttribute("data-scrolled", el.scrollTop > 0);
  }, [readCount, scene]);

  const attached = Object.keys(selection);
  const explicit = scene === "explicit";

  return (
    <div className="relative">
      {/* Window rail: what this is, and the two scenes. */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex items-center gap-2.5 text-[13px]">
          <Lamp state={playing ? "on" : "off"} blink={playing} />
          <span className="text-muted-foreground">
            demo session <span className="text-faint">·</span> ~/projects/acme-api
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Scene">
          <button
            type="button"
            className="ins-key ins-key-panel h-8"
            aria-pressed={!explicit}
            onClick={() => {
              setPlaying(false);
              setScene("explore");
              setReadCount(EXPLORE_ORDER.length);
            }}
          >
            [agent explores]
          </button>
          <button
            type="button"
            className="ins-key ins-key-panel h-8"
            aria-pressed={explicit}
            onClick={() => {
              setPlaying(false);
              setScene("explicit");
            }}
          >
            [explicit context]
          </button>
          <span className="ins-sep-star mx-1.5 max-sm:hidden" aria-hidden="true" />
          <button type="button" className="ins-key ins-key-panel h-8" onClick={() => setRunId((r) => r + 1)}>
            [replay]
          </button>
        </div>
      </div>

      <div className="grid gap-x-3 gap-y-4 lg:h-[500px] lg:grid-cols-[minmax(250px,300px)_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)_240px]">
        {/* [1] FILES */}
        <Pane title="files" index="1" className="order-3 flex min-h-0 flex-col pt-4 lg:order-none" as="aside" aria-label="Files">
          <div className="flex items-center justify-between gap-2 px-3 pb-2">
            <span className="text-[12px] text-muted-foreground">
              {explicit ? `${attached.length} in prompt` : "click to attach"}
            </span>
            <button
              type="button"
              className="ins-key ins-key-panel"
              data-latched={(explicit && compact) || undefined}
              aria-pressed={explicit && compact}
              onClick={() => {
                setPlaying(false);
                setScene("explicit");
                ledger.setCompact(!compact);
              }}
              title="Index: on each prompt the agent gets a fresh project index to grep"
            >
              <Lamp state={explicit && compact ? "on" : "off"} />
              index
              <span className="ins-chord">
                <Keycap size="sm">^</Keycap>
                <Keycap size="sm">⇧</Keycap>
                <Keycap size="sm">P</Keycap>
              </span>
            </button>
          </div>
          <ul className="min-h-0 flex-1 overflow-y-auto pb-2 text-[12.5px] leading-[24px]">
            {FILES.map((f) => {
              const [dir, name] = splitPath(f.path);
              const att = selection[f.path];
              const inPrompt = explicit && Boolean(att);
              const read = !explicit && EXPLORE_ORDER.indexOf(f.path) < readCount;
              const cost = inPrompt ? f.tokens[att.detail] : read ? f.tokens.full : null;
              return (
                <li key={f.path}>
                  <button
                    type="button"
                    onClick={() => {
                      setPlaying(false);
                      ledger.toggleFile(f.path);
                    }}
                    aria-pressed={inPrompt}
                    className={`group flex w-full items-center gap-2 px-3 text-left transition-colors duration-150 ${
                      inPrompt ? "row-attached" : "hover:bg-[color-mix(in_srgb,var(--foreground)_6%,transparent)]"
                    }`}
                  >
                    <span className={`w-2 shrink-0 ${inPrompt ? "" : "text-lamp"}`} aria-hidden="true">
                      {inPrompt ? "›" : ""}
                    </span>
                    <span className="min-w-0 flex-1 truncate">
                      <span className={inPrompt ? "opacity-70" : "text-faint"}>{dir}</span>
                      <span className={inPrompt ? "" : "text-foreground"}>{name}</span>
                    </span>
                    <span
                      className={`w-11 shrink-0 text-right tabular-nums text-[11.5px] ${
                        inPrompt ? "" : read ? "text-warn" : "text-transparent"
                      }`}
                    >
                      {cost !== null ? formatTokens(cost) : "·"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Pane>

        {/* [2] TERMINAL with [3] PROMPT over its bottom rows */}
        <div className="order-1 flex min-h-0 flex-col gap-4 lg:order-none">
          <Pane
            title="terminal"
            index="2"
            live
            className="ins-glass flex min-h-[260px] flex-1 flex-col pt-4 max-lg:h-[280px]"
            aria-label="Terminal"
            trailing={<span className="ins-legend">claude</span>}
          >
            <div
              ref={termRef}
              className="ins-log min-h-0 flex-1 overflow-y-auto px-4 pb-3 text-[12.5px] leading-[21px]"
              aria-live="polite"
              aria-atomic="false"
              onScroll={(e) => e.currentTarget.toggleAttribute("data-scrolled", e.currentTarget.scrollTop > 0)}
            >
              <p className="text-muted-foreground">
                <span className="text-mode-edit">~/projects/acme-api</span> <span className="text-ok">main</span> ${" "}
                <span className="text-foreground">claude</span>
              </p>
              {!explicit ? (
                <>
                  <p className="mt-2 text-strong">
                    <span className="text-lamp">&gt;</span> {TASK}
                  </p>
                  <p className="mt-1 text-foreground">● I&apos;ll start by exploring the codebase.</p>
                  {EXPLORE_ORDER.slice(0, readCount).map((p) => (
                    <p key={p} className="ins-line-enter flex gap-3">
                      <span className="min-w-0 flex-1 truncate">
                        <span className="text-ok">●</span> Read(<span className="text-foreground">{p}</span>)
                      </span>
                      <span className="tabular-nums text-warn">{formatTokens(fileByPath(p).tokens.full)}</span>
                    </p>
                  ))}
                  {readCount < EXPLORE_ORDER.length ? (
                    <p className="mt-1 flex items-center gap-2 text-muted-foreground">
                      <span className="ins-scan" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                        <i />
                      </span>
                      exploring
                    </p>
                  ) : (
                    <p className="mt-2 text-warn">
                      {formatTokens(tokens)} of {formatTokens(CONTEXT_MAX)} used before the first edit.
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="mt-2 text-strong">
                    <span className="text-lamp">&gt;</span>{" "}
                    <span className="text-muted-foreground">
                      [{attached.length} files{compact ? " + index" : ""}]
                    </span>{" "}
                    {TASK}
                  </p>
                  <p className="ins-line-enter mt-1 text-foreground">● Update(src/middleware/auth.ts)</p>
                  <p className="ins-line-enter pl-4" style={{ color: "var(--git-added)" }}>
                    + const next = await rotateRefreshToken(session)
                  </p>
                  <p className="ins-line-enter pl-4" style={{ color: "var(--git-added)" }}>
                    + res.cookie(&quot;refresh&quot;, next.token, cookieOpts)
                  </p>
                  <p className="ins-line-enter pl-4" style={{ color: "var(--git-deleted)" }}>
                    - res.cookie(&quot;refresh&quot;, session.refresh, cookieOpts)
                  </p>
                  <p className="ins-line-enter mt-1 text-foreground">● Update(src/lib/token.ts)</p>
                  <p className="ins-line-enter mt-2 text-muted-foreground">
                    {formatTokens(tokens)} of context. No files read outside the prompt.
                  </p>
                </>
              )}
            </div>
          </Pane>

          <Pane title="prompt" index="3" className="pt-4" aria-label="Prompt">
            <div className="px-3 pb-3">
              {explicit ? (
                <ul className="mb-2 flex flex-wrap gap-1.5" aria-label="Context attached to the prompt">
                  {attached.map((p) => {
                    const a = selection[p];
                    const [, name] = splitPath(p);
                    return (
                      <li key={p} className="ctx-chip">
                        <button
                          type="button"
                          className="ctx-mode"
                          data-mode={a.mode}
                          title={`${MODE_TITLE[a.mode]} (click to cycle)`}
                          onClick={() => ledger.cycleMode(p)}
                        >
                          {MODE_LABEL[a.mode]}
                        </button>
                        <span className="truncate px-1.5 text-foreground">{name}</span>
                        {hasDetail(p) && (
                          <button
                            type="button"
                            className="border-l border-edge px-1.5 text-muted-foreground transition-colors hover:text-foreground"
                            title="Detail level (click to cycle)"
                            onClick={() => ledger.cycleDetail(p)}
                          >
                            {DETAIL_LABEL[a.detail]}
                          </button>
                        )}
                      </li>
                    );
                  })}
                  {compact && (
                    <li className="ctx-chip">
                      <span className="ctx-mode cursor-default" data-mode="read">
                        HOOK
                      </span>
                      <span className="px-1.5 text-foreground">project index</span>
                      <span className="border-l border-edge px-1.5 text-muted-foreground">
                        {formatTokens(INDEX_HOOK_TOKENS)}
                      </span>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="mb-2 text-[12px] text-muted-foreground">No context attached. The agent will go looking.</p>
              )}
              <div className="ins-well px-2.5 py-2 text-[13px] text-strong">
                {TASK}
                <span className="ml-0.5 inline-block h-[15px] w-[8px] translate-y-[3px] bg-lamp" aria-hidden="true" />
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 text-[12px] text-muted-foreground">
                <span className="tabular-nums">
                  ~{formatTokens(explicit ? tokens : 0)} tokens attached
                </span>
                <span className="flex items-center gap-2">
                  send
                  <span className="ins-chord">
                    <Keycap size="sm">^</Keycap>
                    <Keycap size="sm">↵</Keycap>
                  </span>
                </span>
              </div>
            </div>
          </Pane>
        </div>

        {/* [4] WORKSPACE */}
        <Pane title="workspace" index="4" className="hidden min-h-0 flex-col pt-4 xl:flex" as="aside" aria-label="Workspace">
          <div className="flex gap-0.5 px-2 pb-2">
            {["tabs", "jobs", "plans", "agents"].map((t, i) => (
              <span key={t} className="ins-key ins-key-panel" data-static data-latched={i === 0 || undefined}>
                {t}
              </span>
            ))}
          </div>
          <ul className="space-y-1 px-2 text-[12.5px]">
            <TabRow
              name="acme-api"
              ratio={tokens / CONTEXT_MAX}
              lamp={<Lamp state="on" blink label="working" />}
              branch="feat/token-rotation"
              note={explicit ? "auth.ts · token.ts" : "reading…"}
              active
            />
            <TabRow name="acme-web" ratio={0.41} lamp={<Lamp state="warn" label="waiting on you" />} branch="main" note="waiting on you" />
            <TabRow name="infra" ratio={0.12} lamp={<Lamp state="ok" label="done" />} branch="ops/tf-1.9" note="done · 3 files" />
          </ul>
          <div className="mt-auto flex items-center justify-between px-3 pb-3 text-[12px] text-muted-foreground">
            <span>[1 waiting]</span>
            <span className="ins-chord">
              <Keycap size="sm">alt</Keycap>
              <Keycap size="sm">A</Keycap>
            </span>
          </div>
        </Pane>
      </div>

      <p className="mt-3 text-[12px] text-muted-foreground">
        A replica you can use. Click files and chips to change the context. Demo data; token counts are illustrative.
      </p>
    </div>
  );
}

function TabRow({
  name,
  ratio,
  lamp,
  branch,
  note,
  active,
}: {
  name: string;
  ratio: number;
  lamp: React.ReactNode;
  branch: string;
  note: string;
  active?: boolean;
}) {
  return (
    <li
      className={`px-2 py-1.5 ${active ? "bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)]" : ""}`}
      aria-current={active || undefined}
    >
      <div className="flex items-center gap-2">
        <span className="w-2 text-lamp" aria-hidden="true">
          {active ? "›" : ""}
        </span>
        <ContextMoon ratio={ratio} />
        <span className="flex-1 truncate text-foreground">{name}</span>
        {lamp}
      </div>
      <div className="mt-0.5 truncate pl-[38px] text-[11.5px] text-muted-foreground">{branch}</div>
      <div className="truncate pl-[38px] text-[11.5px] text-foreground">{note}</div>
    </li>
  );
}
