import { Pane } from "./instrument/Pane";
import { DownloadKey } from "./DownloadKey";
import { SectionLabel } from "./SectionHead";
import { InstallerTable } from "./InstallerTable";
import { RELEASES_URL, REPO_URL, SOURCE_URL, type Release } from "@/lib/releases";

export function DownloadSection({ release }: { release: Release | null }) {
  return (
    <section aria-labelledby="download-title" className="scroll-mt-20 pt-28 sm:pt-36" id="download">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
        <div className="min-w-0 space-y-6">
          <div>
            <SectionLabel>download</SectionLabel>
            <h2 id="download-title" className="text-[clamp(24px,2.4vw,30px)] leading-[1.18] tracking-[-0.01em]">
              Lirah is a workspace for the coding agents you already use.
            </h2>
          </div>
          <p className="max-w-[52ch] text-[15px] leading-[1.7]">
            Free and open source under the MIT license. No account, no telemetry, and it never pushes, pulls or fetches
            your repos. Bring your own agent.
          </p>
          <DownloadKey release={release} />
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px]">
            <a href={REPO_URL} className="ins-link">source on GitHub</a>
            <span className="ins-sep-star" aria-hidden="true" />
            <a href={SOURCE_URL} className="ins-link">build from source</a>
            <span className="ins-sep-star" aria-hidden="true" />
            <a href={RELEASES_URL} className="ins-link">all releases</a>
          </p>
        </div>

        <Pane
          title={release ? `release ${release.version}` : "releases"}
          className="pt-5"
          trailing={<span className="ins-legend">github</span>}
        >
          {release ? (
            <InstallerTable release={release} />
          ) : (
            <p className="px-4 pb-4 text-[14px] text-muted-foreground">
              Couldn&apos;t reach GitHub just now.{" "}
              <a href={RELEASES_URL} className="ins-link">Open the releases page</a> for every installer.
            </p>
          )}
        </Pane>
      </div>
    </section>
  );
}
