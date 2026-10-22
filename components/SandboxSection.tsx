"use client";

import { Pane } from "./instrument/Pane";
import { Lamp } from "./instrument/Lamp";
import { formatTokens } from "./instrument/Meter";
import { useLedger } from "./ledger/LedgerProvider";

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

// The switch is real and the meter is meant not to move: the sandbox limits
// what the agent can touch, not what it is given to read.
export function SandboxSection() {
  const ledger = useLedger()!;
  const on = ledger.sandbox;
  return (
    <section aria-labelledby="sandbox-title" className="scroll-mt-20 pt-28 sm:pt-36" id="sandbox">
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
        <div className="space-y-4 lg:pr-10">
          <h2 id="sandbox-title" className="text-[clamp(24px,2.4vw,30px)] leading-[1.18] tracking-[-0.01em]">
            Let the agent run, inside a sandbox.
          </h2>
          <p className="max-w-[56ch] text-[15px] leading-[1.65]">
            On Linux, each tab can run in a bubblewrap sandbox. The root filesystem is read-only. Your home and the
            project stay writable, while keys, shell rc files and your git config stay read-only. /tmp is private to the
            tab.
          </p>
          <p className="max-w-[56ch] text-[15px] leading-[1.65] text-muted-foreground">
            Turn on network isolation with one more switch. On Ubuntu 24.04 and later Lirah installs the AppArmor profile
            it needs. macOS and Windows builds run without the sandbox.
          </p>
        </div>

        <Pane title="sandbox · bwrap" className="ins-glass pt-5" trailing={<span className="ins-legend">acme-api</span>}>
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
          <p className="mt-2 border-t border-edge px-4 py-3 text-[12px] text-muted-foreground">
            Context: {formatTokens(ledger.tokens)} with the sandbox {on ? "on" : "off"}. It limits what the agent can
            touch, not what it reads. If the sandbox can&apos;t start, Lirah offers to retry without it.
          </p>
        </Pane>
      </div>
    </section>
  );
}
