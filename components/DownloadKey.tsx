"use client";

import { OS_NAME, RELEASES_URL, formatSize, primaryInstaller, type Release } from "@/lib/releases";
import { useDetectedOS } from "./useDetectedOS";

// The primary key: the latest installer for the visitor's OS.
const SIZE_CLASS = {
  xl: "ins-key-xl",
  lg: "ins-key-lg",
  panel: "ins-key-panel h-9 px-4",
};

export function DownloadKey({ release, size = "lg" }: { release: Release | null; size?: "xl" | "lg" | "panel" }) {
  const os = useDetectedOS();
  const inst = primaryInstaller(release, os);
  return (
    <div className={`flex flex-col ${size === "xl" ? "gap-3" : "gap-2"}`}>
      <a
        href={inst?.url ?? RELEASES_URL}
        className={`ins-key ins-key-primary ${SIZE_CLASS[size]} self-start`}
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
