"use client";

import { useEffect, useState } from "react";
import { INSTALL_COMMAND, OS_NAME, primaryInstaller, type Release } from "@/lib/releases";
import { useDetectedOS, useIsPhone } from "./useDetectedOS";

// Linux goes to the install script below; macOS and Windows get the latest installer.
// A phone has nothing to install: the hero points at the install chapter, which then says so.
export function PlateDownload({ release, anchor }: { release: Release | null; anchor?: boolean }) {
  const os = useDetectedOS();
  const phone = useIsPhone();
  const inst = primaryInstaller(release, os);
  if (phone)
    return anchor ? <a className="btn solid" href="#install">Install on your desktop</a> : <p className="src">Open lira.dev on your desktop to install.</p>;
  if (os === "linux" || !inst) {
    const href = anchor ? "#install" : (release?.url ?? "https://github.com/emdmed/lirah/releases/latest");
    return <a className="btn solid" href={href}>Download for {OS_NAME[os]}</a>;
  }
  return <a className="btn solid" href={inst.url}>Download for {OS_NAME[os]}</a>;
}

export function CopyCommand() {
  const [label, setLabel] = useState("Copy");
  async function copy() {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setLabel("Copied");
    } catch {
      setLabel("Select and copy");
    }
    setTimeout(() => setLabel("Copy"), 1800);
  }
  return (
    <div className="cmd">
      <code>{INSTALL_COMMAND}</code>
      <button type="button" onClick={copy} aria-label="Copy install command">
        <span aria-live="polite">{label}</span>
      </button>
    </div>
  );
}

// SVG motion ignores prefers-reduced-motion, so the orrery is paused here instead;
// paused at time 0, every body rests at its drawn place.
export function OrreryMotion() {
  useEffect(() => {
    const svg = document.querySelector<SVGSVGElement>("svg.art");
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    if (!svg) return;
    const sync = () => {
      if (mq.matches) {
        svg.pauseAnimations();
        svg.setCurrentTime(0);
      } else svg.unpauseAnimations();
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return null;
}
