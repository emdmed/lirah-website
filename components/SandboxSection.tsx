"use client";

import { Pane } from "./instrument/Pane";
import { Lamp } from "./instrument/Lamp";
import { formatTokens } from "./instrument/Meter";
import { useLedger } from "./ledger/LedgerProvider";
import { FeatureList, FeatureSection, FeatureSplit, PaneNote, TermChip } from "./FeatureLayout";

const MOUNTS: { path: string; access: "ro" | "rw" | "private" | "isolated" }[] = [
  { path: "/", access: "ro" },
  { path: "~", access: "rw" },
  { path: "~/projects/acme-api", access: "rw" },
  { path: "~/.ssh", access: "ro" },
  { path: "~/.gnupg", access: "ro" },
  { path: "~/.bashrc ~/.zshrc ~/.profile", access: "ro" },
  { path: "~/.gitconfig", access: "ro" },
  { path: "~/.config/autostart", access: "ro" },
  { path: "/tmp", access: "private" },
  { path: "pid ipc uts", access: "isolated" },
];

const ACCESS_CLASS = {
  ro: "text-muted-foreground",
  rw: "text-ok",
  private: "text-mode-edit",
  isolated: "text-mode-edit",
};

const OPTIONS = [
  {
    term: <TermChip>network</TermChip>,
    title: "Network isolation",
    body: "One more switch cuts the tab off from the network.",
  },
  {
    term: <TermChip>apparmor</TermChip>,
    title: "Set up for you",
    body: "On Ubuntu 24.04 and later Lirah installs the AppArmor profile bubblewrap needs.",
  },
  {
    term: <TermChip>retry</TermChip>,
    title: "Never a dead end",
    body: "If the sandbox can't start, Lirah offers to retry the tab without it.",
  },
];

// The switch is real and the meter is meant not to move: the sandbox limits
// what the agent can touch, not what it is given to read.
export function SandboxSection() {
  const ledger = useLedger()!;
  const on = ledger.sandbox;
  return (
    <FeatureSection
      id="sandbox"
      label="sandbox"
      title="Let the agent run, inside a sandbox."
      intro={
        <>
          <p>
            On Linux, each tab can run in a bubblewrap sandbox. The root filesystem is read-only. Your home and the
            project stay writable, while keys, shell rc files and your git config stay read-only. /tmp is private to the
            tab.
          </p>
          <p className="text-muted-foreground">macOS and Windows builds run without the sandbox.</p>
        </>
      }
    >
      <FeatureSplit>
        <Pane title="sandbox · bwrap" className="pt-5" trailing={<span className="ins-legend normal-case">acme-api</span>}>
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-edge px-4 pb-3 text-[13px]">
            <button
              type="button"
              className="ins-key ins-key-panel -ml-2"
              aria-pressed={on}
              data-latched={on || undefined}
              onClick={() => ledger.setSandbox(!on)}
            >
              <Lamp state={on ? "ok" : "off"} />
              sandbox <span className="text-muted-foreground">{on ? "on" : "off"}</span>
            </button>
            <span className="flex items-center gap-2.5 self-center">
              <span className="text-foreground">network</span>
              <span className="text-muted-foreground">off</span>
            </span>
          </div>
          <table className="w-full border-collapse text-[13px] leading-[26px]">
            <caption className="sr-only">Filesystem and namespace access inside the sandbox</caption>
            <tbody>
              {MOUNTS.map((m) => (
                <tr key={m.path}>
                  <td className="py-0 pl-4 text-foreground">{m.path}</td>
                  <td className={`py-0 pr-4 text-right tabular-nums ${on ? ACCESS_CLASS[m.access] : "text-faint"}`}>
                    {on ? m.access : "host"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaneNote>
            Flip it and the meter at the top stays at {formatTokens(ledger.tokens)}. The sandbox limits what the agent
            can touch, not what it reads.
          </PaneNote>
        </Pane>

        <Pane title="sandbox options" className="pt-5">
          <FeatureList items={OPTIONS} />
        </Pane>
      </FeatureSplit>
    </FeatureSection>
  );
}
