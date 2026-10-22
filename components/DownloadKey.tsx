"use client";

import { OS_NAME, RELEASES_URL, formatSize, primaryInstaller, type Release } from "@/lib/releases";
import { useDetectedOS } from "./useDetectedOS";

// The primary key: the latest installer for the visitor's OS.
export function DownloadKey({ release, size = "lg" }: { release: Release | null; size?: "lg" | "panel" }) {
  const os = useDetectedOS();
  const inst = primaryInstaller(release, os);
  return (
    <div className="flex flex-col gap-2">
      <a
        href={inst?.url ?? RELEASES_URL}
        className={`ins-key ins-key-primary ${size === "lg" ? "ins-key-lg" : "ins-key-panel h-9 px-4"} self-start`}
      >
        Download for {OS_NAME[os]}
      </a>
      <p className="text-[12px] text-muted-foreground">
        {inst ? (
          <>
            {release!.version} <span className="text-faint">·</span> {inst.format}
            {inst.os === "macos" ? `, ${inst.arch}` : ""} <span className="text-faint">·</span> {formatSize(inst.size)}{" "}
            <span className="text-faint">·</span>{" "}
            <a href="#download" className="ins-link">
              other formats
            </a>
          </>
        ) : (
          <>
            Free and open source <span className="text-faint">·</span>{" "}
            <a href="#download" className="ins-link">
              all platforms
            </a>
          </>
        )}
      </p>
    </div>
  );
}
