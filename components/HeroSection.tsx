import type { Release } from "@/lib/releases";
import { DownloadKey } from "./DownloadKey";
import { HeroReplica } from "./HeroReplica";
import { KeyChord } from "./instrument/Keycap";
import { formatTokens } from "./instrument/Meter";
import { COMPACT_TOKENS } from "./ledger/demoSession";
import { RivendellRidges } from "./RivendellRidges";

const MODE_CHIP = {
  edit: "text-mode-edit bg-mode-edit/12",
  read: "text-mode-read bg-mode-read/12",
  copy: "text-mode-copy bg-mode-copy/12",
} as const;

// Detail levels tinted with the mode colors the replica pairs them with below.
function DetailChip({ mode, children }: { mode: keyof typeof MODE_CHIP; children: React.ReactNode }) {
  return (
    <span className={`whitespace-nowrap rounded-[2px] px-1.5 pb-0.5 pt-px text-[0.94em] ${MODE_CHIP[mode]}`}>
      {children}
    </span>
  );
}

// Decorative: a few lamp segments and what Compact Project adds, as a taste of the real meter.
function InlineMeter() {
  return (
    <span aria-hidden="true" className="ml-1 inline-flex items-center gap-1.5 align-[1px]">
      <span className="inline-flex gap-0.5">
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            className={`h-3 w-1.5 ${i < 2 ? "bg-lamp shadow-[0_0_6px_color-mix(in_srgb,var(--ins-lamp)_50%,transparent)]" : "bg-edge-strong"}`}
          />
        ))}
      </span>
      <span className="text-[12px] tabular-nums text-lamp">+{formatTokens(COMPACT_TOKENS)}</span>
    </span>
  );
}

export function HeroSection({ release }: { release: Release | null }) {
  return (
    <section aria-labelledby="hero-title">
      {/* Rivendell sits behind the copy and bleeds off the right edge; body clips the overflow. */}
      <div className="relative flex min-h-[clamp(480px,52vw,700px)] items-center py-14 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 sm:top-[38%] -right-16 w-[calc(100%+4rem)] opacity-45 [mask-image:linear-gradient(to_right,transparent,#000_45%),linear-gradient(to_bottom,#000_75%,transparent)] [mask-composite:intersect] sm:-right-[min(160px,10vw)] sm:w-[60%] sm:opacity-100"
        >
          <RivendellRidges className="block h-full w-full" />
        </div>

        <div className="relative z-10 flex flex-col">
          <h1
            id="hero-title"
            className="text-[clamp(24px,6.6vw,88px)] leading-[1.02] tracking-[-0.03em] text-strong [text-wrap:nowrap]"
          >
            Your agent reads less.
            <br />
            <span className="text-lamp">You decide what.</span>
          </h1>
          <div className="mt-8 flex max-w-[62ch] flex-col gap-[18px] text-[16px] leading-[1.75] [text-wrap:pretty] text-[color-mix(in_srgb,var(--muted-foreground)_70%,var(--foreground))] sm:mt-10 sm:text-[17px]">
            <p className="text-[19px] leading-[1.45] text-strong [text-wrap:balance]">
              Lirah is a desktop workspace for CLI coding agents.
            </p>
            <p>
              <span className="text-foreground">Claude Code</span> or <span className="text-foreground">opencode</span>{" "}
              runs unchanged in a real terminal. Around it, you pick what the agent sees and how it uses each file.
            </p>
            <p>
              Send each file as <DetailChip mode="edit">full text</DetailChip>,{" "}
              <DetailChip mode="read">signatures</DetailChip> or{" "}
              <span className="whitespace-nowrap">
                a <DetailChip mode="copy">skeleton</DetailChip>.
              </span>
            </p>
            <div className="flex flex-col gap-2.5 border-t border-edge pt-[18px]">
              <p>
                <span className="text-foreground">Compact Project</span> skeletons every JS, TS and Python{" "}
                <span className="whitespace-nowrap">
                  file. <KeyChord keys={["^", "⇧", "P"]} />
                </span>
              </p>
              <p>
                <span className="text-foreground">The meter</span> shows what that costs in the context{" "}
                <span className="whitespace-nowrap">
                  window. <InlineMeter />
                </span>
              </p>
            </div>
          </div>
          <div className="mt-9 sm:mt-11">
            <DownloadKey release={release} size="xl" />
          </div>
        </div>
      </div>

      <div className="mt-2">
        <HeroReplica />
      </div>
    </section>
  );
}
