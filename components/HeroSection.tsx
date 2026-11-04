import type { Release } from "@/lib/releases";
import { DownloadKey } from "./DownloadKey";
import { CROSS_FILE } from "./evalResults";
import { HeroReplica } from "./HeroReplica";

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
      <div className="pb-[clamp(72px,7vw,120px)] pt-12 sm:pt-16">
        <h1
          id="hero-title"
          className="-ml-[0.05em] text-[clamp(34px,10.4vw,48px)] leading-[1.06] tracking-[-0.035em] text-strong sm:text-[clamp(40px,6.6vw,88px)] sm:leading-[1.02] sm:tracking-[-0.03em] sm:[text-wrap:nowrap]"
        >
          Your agent reads less.
          <br />
          <span className="text-lamp">You decide what.</span>
        </h1>
        <div className="mt-7 grid gap-x-16 gap-y-8 sm:mt-10 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:items-start">
          <div className="flex flex-col gap-4 text-[16px] leading-[1.7] [text-wrap:pretty] text-[color-mix(in_srgb,var(--muted-foreground)_70%,var(--foreground))] sm:text-[17px]">
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
          <div className="flex min-w-0 flex-col">
            <a href="#index" className="group flex flex-wrap items-baseline gap-x-7 gap-y-2">
              {PROOF.map((p) => (
                <span key={p.label} className="flex items-baseline gap-2">
                  <span className="text-[34px] leading-none tabular-nums tracking-[-0.02em] text-strong sm:text-[40px]">
                    {p.value}
                  </span>
                  <span className="text-[17px] text-strong">{p.label}</span>
                </span>
              ))}
              <span className="basis-full text-[14px] text-muted-foreground">
                on cross-file questions in Lirah&apos;s own codebase, with the index.{" "}
                <span className="whitespace-nowrap text-foreground group-hover:underline">How we measured ↓</span>
              </span>
            </a>
            <div className="mt-9 sm:mt-11">
              <DownloadKey release={release} size="xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <HeroReplica />
      </div>
    </section>
  );
}
