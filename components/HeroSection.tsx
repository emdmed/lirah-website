import type { Release } from "@/lib/releases";
import { DownloadKey } from "./DownloadKey";
import { CROSS_FILE } from "./evalResults";
import { HeroReplica } from "./HeroReplica";
import { RivendellRidges } from "./RivendellRidges";

// Detail levels as one neutral chip whose fill fades with the amount of the file sent.
const DETAIL_CHIP = {
  full: "text-strong bg-foreground/14",
  signatures: "text-foreground bg-foreground/11",
  skeleton: "text-muted-foreground bg-foreground/8",
} as const;

const less = (x: number) => `${Math.round((1 - x) * 100)}%`;

// The measured win, scoped to where it holds; the index section has the rest.
const PROOF = [
  { value: less(CROSS_FILE.ownRepo.cost), label: "cheaper" },
  { value: less(CROSS_FILE.ownRepo.time), label: "faster" },
];

function DetailChip({ level, children }: { level: keyof typeof DETAIL_CHIP; children: React.ReactNode }) {
  return (
    <span className={`whitespace-nowrap rounded-[2px] px-1.5 pb-0.5 pt-px text-[0.94em] ${DETAIL_CHIP[level]}`}>
      {children}
    </span>
  );
}

export function HeroSection({ release }: { release: Release | null }) {
  return (
    <section aria-labelledby="hero-title">
      <div className="relative pb-[clamp(72px,7vw,120px)] pt-12 sm:pt-16">
        {/* Rivendell fills the hero behind the copy and bleeds to both viewport edges; body clips the overflow.
            The mask dims it under the text column and fades it out before the demo. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 opacity-60 [mask-image:radial-gradient(ellipse_75%_75%_at_24%_50%,rgb(0_0_0/0.22)_48%,#000_88%),linear-gradient(to_bottom,transparent,#000_12%,#000_80%,transparent)] [mask-composite:intersect] sm:opacity-90"
        >
          <RivendellRidges className="block h-full w-full" />
        </div>

        <div className="relative z-10 flex min-w-0 flex-col">
          <h1
            id="hero-title"
            className="-ml-[0.05em] text-[clamp(34px,10.4vw,48px)] leading-[1.06] tracking-[-0.035em] text-strong sm:text-[clamp(40px,6.6vw,88px)] sm:leading-[1.02] sm:tracking-[-0.03em] sm:[text-wrap:nowrap]"
          >
            Your agent reads less.
            <br />
            <span className="text-lamp">You decide what.</span>
          </h1>
          <div className="mt-7 flex max-w-[62ch] flex-col gap-4 text-[16px] leading-[1.7] [text-wrap:pretty] text-[color-mix(in_srgb,var(--muted-foreground)_70%,var(--foreground))] sm:mt-10 sm:text-[17px]">
            <p className="text-[20px] leading-[1.35] text-strong [text-wrap:balance] sm:text-[24px]">
              Lirah is a desktop workspace for CLI coding agents.
            </p>
            <p>
              <span className="text-foreground">Claude Code</span> or <span className="text-foreground">opencode</span>{" "}
              runs unchanged in a real terminal. You send it each file as{" "}
              <DetailChip level="full">full text</DetailChip>, <DetailChip level="signatures">signatures</DetailChip>{" "}
              or{" "}
              <span className="whitespace-nowrap">
                a <DetailChip level="skeleton">skeleton</DetailChip>.
              </span>
            </p>
          </div>
          <a
            href="#index"
            className="group mt-8 flex max-w-[62ch] flex-wrap items-baseline gap-x-7 gap-y-2 sm:mt-10"
          >
            {PROOF.map((p) => (
              <span key={p.label} className="flex items-baseline gap-2">
                <span className="text-[34px] leading-none tabular-nums tracking-[-0.02em] text-strong sm:text-[40px]">
                  {p.value}
                </span>
                <span className="text-[17px] text-strong">{p.label}</span>
              </span>
            ))}
            <span className="basis-full text-[14px] text-muted-foreground sm:basis-auto">
              on cross-file questions in Lirah&apos;s own codebase, with the index.{" "}
              <span className="whitespace-nowrap text-foreground group-hover:underline">How we measured ↓</span>
            </span>
          </a>
          <div className="mt-9 sm:mt-11">
            <DownloadKey release={release} size="xl" />
          </div>
        </div>
      </div>

      <div className="relative">
        <HeroReplica />
      </div>
    </section>
  );
}
