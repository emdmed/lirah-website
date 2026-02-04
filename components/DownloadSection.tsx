"use client";

import { useEffect, useState } from "react";
import { Download, Monitor, Apple, Terminal, Github } from "lucide-react";

type Platform = "windows" | "macos" | "linux" | null;

function detectOS(): Platform {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "macos";
  if (ua.includes("linux")) return "linux";
  return null;
}

const downloads = {
  windows: {
    name: "Windows",
    icon: Monitor,
    comingSoon: true,
    links: [],
  },
  macos: {
    name: "macOS",
    icon: Apple,
    comingSoon: true,
    links: [],
  },
  linux: {
    name: "Linux",
    icon: Terminal,
    comingSoon: false,
    links: [
      {
        label: "Build from source",
        url: "https://github.com/emdmed/lirah#building-from-source",
      },
    ],
  },
};

export function DownloadSection() {
  const [detectedOS, setDetectedOS] = useState<Platform>(null);

  useEffect(() => {
    setDetectedOS(detectOS());
  }, []);

  return (
    <section id="download" className="border-t border-dashed border-white/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
            Download <span className="font-[family-name:var(--font-grenze-gotisch)]">Lirah</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#969696]">
            Currently available on Linux (Ubuntu, Arch Linux). Build from source. Free and open source.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(downloads).map(([key, platform]) => {
            const Icon = platform.icon;
            const isDetected = key === detectedOS;
            return (
              <div
                key={key}
                className={`rounded-xl border p-6 transition-colors ${
                  platform.comingSoon
                    ? "border-dashed border-white/10 bg-white/[0.02] opacity-60"
                    : isDetected
                    ? "border-[#7a9e98] bg-[#7a9e98]/10 ring-1 ring-[#7a9e98]/50"
                    : "border-dashed border-white/20 bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#7a9e98]/10">
                    <Icon className="h-5 w-5 text-[#7a9e98]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{platform.name}</h3>
                    {isDetected && (
                      <span className="text-xs text-[#7a9e98]">Detected</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {platform.comingSoon ? (
                    <div className="inline-flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-[#969696]">
                      Coming Soon
                    </div>
                  ) : (
                    platform.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#7a9e98]/50 hover:bg-[#7a9e98]/10"
                      >
                        <Download className="h-4 w-4 text-[#7a9e98]" />
                        {link.label}
                      </a>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://github.com/emdmed/lirah"
            className="inline-flex items-center gap-2 rounded-lg border border-dashed border-white/20 bg-white/5 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </a>
          <a
            href="https://github.com/emdmed/lirah/releases"
            className="text-sm text-[#969696] hover:text-[#7a9e98] transition-colors"
          >
            View all releases →
          </a>
        </div>
      </div>
    </section>
  );
}
