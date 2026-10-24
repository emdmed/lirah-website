"use client";

import { useState } from "react";
import { OS_NAME, RELEASES_URL, formatSize, primaryInstaller, type Release } from "@/lib/releases";
import { InstallCommand } from "./InstallCommand";
import { useDetectedOS, useIsPhone } from "./useDetectedOS";

// The primary action: the install script on Linux, the latest installer on macOS and Windows.
const SIZE_CLASS = {
  xl: "ins-key-xl",
  lg: "ins-key-lg",
  panel: "ins-key-panel h-9 px-4",
};

// `formatsLink` points at the installer table; the download section turns it
// off, since the table sits right beside the key there.
export function DownloadKey({
  release,
  size = "lg",
  formatsLink = true,
}: {
  release: Release | null;
  size?: "xl" | "lg" | "panel";
  formatsLink?: boolean;
}) {
  const os = useDetectedOS();
  const phone = useIsPhone();
  const inst = primaryInstaller(release, os);
  if (phone) return <SendToDesktopKey size={size} />;
  if (os === "linux") {
    return (
      <div className={`flex flex-col ${size === "xl" ? "gap-3" : "gap-2"}`}>
        <InstallCommand size={size} />
        <p className="text-[12px] text-muted-foreground">
          Linux <span className="text-faint">·</span>{" "}
          {release && (
            <>
              {release.version} <span className="text-faint">·</span>{" "}
            </>
          )}
          picks .deb, .rpm or AppImage for your distro <span className="text-faint">·</span> builds from source on Arch
          {formatsLink && (
            <>
              {" "}
              <span className="text-faint">·</span>{" "}
              <a href="#installers" className="ins-link">
                other formats
              </a>
            </>
          )}
        </p>
      </div>
    );
  }
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
            {inst.os === "macos" ? `, ${inst.arch}` : ""} <span className="text-faint">·</span> {formatSize(inst.size)}
            {formatsLink && (
              <>
                {" "}
                <span className="text-faint">·</span>{" "}
                <a href="#installers" className="ins-link">
                  other formats
                </a>
              </>
            )}
          </>
        ) : (
          <>
            Free and open source <span className="text-faint">·</span>{" "}
            <a href="#installers" className="ins-link">
              all platforms
            </a>
          </>
        )}
      </p>
    </div>
  );
}

// On a phone there is nothing to install. The key hands the link to the share
// sheet (or the clipboard) so the visitor can open it on the machine that runs
// their agent.
function SendToDesktopKey({ size }: { size: "xl" | "lg" | "panel" }) {
  const [copied, setCopied] = useState(false);

  async function send() {
    const url = `${location.origin}/#download`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Lirah", text: "Lirah: a workspace for CLI coding agents", url });
        return;
      } catch (e) {
        if ((e as DOMException).name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      location.hash = "download";
    }
  }

  return (
    <div className={`flex flex-col ${size === "xl" ? "gap-3" : "gap-2"}`}>
      <button
        type="button"
        onClick={send}
        className={`ins-key ins-key-primary ${SIZE_CLASS[size]} self-start max-sm:self-stretch`}
      >
        {copied ? "Link copied" : "Send to my desktop"}
      </button>
      <p className="text-[12px] text-muted-foreground" aria-live="polite">
        Desktop app for Linux, macOS and Windows <span className="text-faint">·</span>{" "}
        <a href="#installers" className="ins-link">
          installers
        </a>
      </p>
    </div>
  );
}
