"use client";

import { useState } from "react";
import { Pane } from "./instrument/Pane";
import { KeyChord } from "./instrument/Keycap";
import { FeatureList, FeatureSection, FeatureSplit, PaneNote, TermChip } from "./FeatureLayout";

type Tool = "nvim" | "lazygit";

// The file the agent touched in the hero's demo session.
const NVIM_LINES: string[] = [
  "export function rotate(token: RefreshToken) {",
  "  const next = issueRefreshToken(token.userId);",
  "  revoke(token.id);",
  "  return next;",
  "}",
];

const LG_FILES: { status: "M" | "A"; path: string }[] = [
  { status: "M", path: "src/auth/token.ts" },
  { status: "M", path: "src/auth/middleware.ts" },
  { status: "A", path: "src/auth/token.test.ts" },
];

const LG_COMMITS = ["feat(auth): rotate refresh tokens on use", "fix(auth): clamp token ttl", "chore: bump deps"];

const ITEMS = [
  {
    term: <KeyChord keys={["alt", "N"]} />,
    title: "Nvim",
    body: "Opens in the tab's project folder, full window.",
  },
  {
    term: <KeyChord keys={["alt", "L"]} />,
    title: "Lazygit",
    body: "Same, for the repo. With several projects in the workspace it asks which one.",
  },
  {
    term: <TermChip prefix=":">lg</TermChip>,
    title: "From the command line",
    body: ":nvim and :lazygit (or :lg) do the same from Lirah's command line.",
  },
  {
    term: <TermChip>keys</TermChip>,
    title: "Every key is theirs",
    body: "While either one is open, Lirah's own shortcuts step aside. Quit it and you're back at the agent.",
  },
];

export function ToolsSection() {
  const [tool, setTool] = useState<Tool>("nvim");
  return (
    <FeatureSection
      id="tools"
      label="your tools"
      title="Nvim and lazygit, one key away."
      intro={
        <>
          <p>
            Read what the agent wrote in nvim, stage it hunk by hunk in lazygit, then quit and you&apos;re back in the
            tab. No second window, no cd into the project.
          </p>
          <p className="text-muted-foreground">
            Both run in the tab&apos;s second terminal, with your own config. The agent keeps working underneath.
          </p>
        </>
      }
    >
      <FeatureSplit>
        <Pane
          title={`${tool} · acme-api`}
          className="pt-5"
          trailing={<KeyChord keys={["alt", tool === "nvim" ? "N" : "L"]} size="sm" />}
        >
          <div className="flex gap-2 border-b border-edge px-4 pb-3 text-[13px]" role="group" aria-label="Program">
            {(["nvim", "lazygit"] as const).map((t) => (
              <button
                key={t}
                type="button"
                className="ins-key ins-key-panel"
                aria-pressed={tool === t}
                data-latched={tool === t || undefined}
                onClick={() => setTool(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {tool === "nvim" ? (
            <div className="text-[13px] leading-[24px]">
              <ol className="overflow-x-auto py-2" aria-label="src/auth/token.ts">
                {NVIM_LINES.map((line, i) => (
                  <li key={i} className="flex gap-4 whitespace-pre px-4">
                    <span className="w-5 shrink-0 text-right tabular-nums text-faint" aria-hidden="true">
                      {i + 12}
                    </span>
                    <span className="text-foreground">{line}</span>
                  </li>
                ))}
                {[0, 1].map((i) => (
                  <li key={`t${i}`} className="px-4 text-faint" aria-hidden="true">
                    ~
                  </li>
                ))}
              </ol>
              <div className="flex items-center gap-3 border-t border-edge px-4 py-1.5 text-[12px]">
                <span className="text-mode-edit">NORMAL</span>
                <span className="min-w-0 flex-1 truncate text-foreground">src/auth/token.ts</span>
                <span className="tabular-nums text-muted-foreground">14,3</span>
              </div>
            </div>
          ) : (
            <div className="grid text-[13px] sm:grid-cols-2">
              <div className="border-edge px-4 py-3 sm:border-r">
                <p className="ins-legend">files</p>
                <ul className="mt-2 space-y-1">
                  {LG_FILES.map((f) => (
                    <li key={f.path} className="flex gap-3">
                      <span className={f.status === "A" ? "text-ok" : "text-warn"}>{f.status}</span>
                      <span className="min-w-0 truncate text-foreground">{f.path}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-edge px-4 py-3 sm:border-t-0">
                <p className="ins-legend">commits</p>
                <ul className="mt-2 space-y-1">
                  {LG_COMMITS.map((c, i) => (
                    <li key={c} className={`truncate ${i === 0 ? "text-foreground" : "text-muted-foreground"}`}>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <PaneNote>Full window while it&apos;s open · quit with :q or q · demo data</PaneNote>
        </Pane>

        <Pane title="open from lirah" className="pt-5">
          <FeatureList items={ITEMS} />
        </Pane>
      </FeatureSplit>
    </FeatureSection>
  );
}
