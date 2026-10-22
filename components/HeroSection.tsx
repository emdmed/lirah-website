import type { Release } from "@/lib/releases";
import { DownloadKey } from "./DownloadKey";
import { HeroReplica } from "./HeroReplica";
import { RivendellRidges } from "./RivendellRidges";

export function HeroSection({ release }: { release: Release | null }) {
  return (
    <section aria-labelledby="hero-title">
      {/* Rivendell sits behind the copy and bleeds off the right edge; body clips the overflow. */}
      <div className="relative flex min-h-[clamp(420px,44vw,560px)] items-center py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -right-16 w-[calc(100%+4rem)] opacity-45 [mask-image:linear-gradient(to_right,transparent,#000_30%),linear-gradient(to_bottom,#000_75%,transparent)] [mask-composite:intersect] sm:-right-[min(160px,10vw)] sm:w-[68%] sm:opacity-100"
        >
          <RivendellRidges className="block h-full w-full" />
        </div>

        <div className="relative z-10 flex max-w-[560px] flex-col gap-5">
          <h1 id="hero-title" className="text-[clamp(32px,3.4vw,42px)] leading-[1.18] text-strong">
            Ship more code.
            <br />
            Burn fewer tokens.
          </h1>
          <p className="max-w-[52ch] text-[15px] leading-[1.65] text-muted-foreground">
            Lirah is a desktop workspace for CLI coding agents. Claude Code or opencode runs in a real terminal. Around
            it, you pick the files the agent sees, say how it should use each one, and watch what that costs in the
            context window.
          </p>
          <DownloadKey release={release} />
        </div>
      </div>

      <div className="mt-2">
        <HeroReplica />
      </div>
    </section>
  );
}
