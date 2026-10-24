"use client";

import { Pane } from "./instrument/Pane";
import { Lamp } from "./instrument/Lamp";
import { useLedger } from "./ledger/LedgerProvider";
import { FeatureSection, PaneNote, TermChip, TryIt } from "./FeatureLayout";

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

const HALF = Math.ceil(MOUNTS.length / 2);

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

// The one section laid out differently: the mount table runs full width in two
// columns, and the options follow as a row of notes rather than a side pane.
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
      <Pane
        title="sandbox · bwrap"
        className="pt-5"
        trailing={
          <span className="flex items-center gap-3">
            <TryIt />
            <span className="ins-legend normal-case max-sm:hidden">acme-api</span>
          </span>
        }
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-edge px-4 pb-3 text-[13px]">
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
          <span className="text-muted-foreground">
            network isolation <span className="text-foreground">off</span>
          </span>
        </div>
        <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-edge">
          {[MOUNTS.slice(0, HALF), MOUNTS.slice(HALF)].map((rows, col) => (
            <table key={col} className="w-full border-collapse text-[13px] leading-[26px]">
              <caption className="sr-only">
                Filesystem and namespace access inside the sandbox{col ? ", continued" : ""}
              </caption>
              <tbody>
                {rows.map((m) => (
                  <tr key={m.path}>
                    <td className="py-0 pl-4 text-foreground">{m.path}</td>
                    <td className={`py-0 pr-4 text-right tabular-nums ${on ? ACCESS_CLASS[m.access] : "text-muted-foreground"}`}>
                      {on ? m.access : "host"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
        <PaneNote>Switch it off to see what an unsandboxed tab can reach.</PaneNote>
      </Pane>

      <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-3">
        {OPTIONS.map((o) => (
          <li key={o.title} className="text-[14px]">
            {o.term}
            <p className="mt-2.5">
              <span className="text-strong">{o.title}.</span>{" "}
              <span className="text-muted-foreground">{o.body}</span>
            </p>
          </li>
        ))}
      </ul>
    </FeatureSection>
  );
}
