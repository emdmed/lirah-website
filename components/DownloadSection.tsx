import { Download, Monitor, Apple, Terminal, Github } from "lucide-react";

const downloads = {
  windows: {
    name: "Windows",
    icon: Monitor,
    links: [
      {
        label: ".exe (NSIS)",
        url: "https://github.com/emdmed/lirah/releases/download/v0.1.9/Lirah_0.1.9_x64-setup.exe",
      },
      {
        label: ".msi",
        url: "https://github.com/emdmed/lirah/releases/download/v0.1.9/Lirah_0.1.9_x64_en-US.msi",
      },
    ],
  },
  macos: {
    name: "macOS",
    icon: Apple,
    links: [
      {
        label: "Intel .dmg",
        url: "https://github.com/emdmed/lirah/releases/download/v0.1.9/Lirah_0.1.9_x64.dmg",
      },
      {
        label: "Apple Silicon .dmg",
        url: "https://github.com/emdmed/lirah/releases/download/v0.1.9/Lirah_0.1.9_aarch64.dmg",
      },
    ],
  },
  linux: {
    name: "Linux",
    icon: Terminal,
    links: [
      {
        label: ".deb",
        url: "https://github.com/emdmed/lirah/releases/download/v0.1.9/Lirah_0.1.9_amd64.deb",
      },
      {
        label: ".rpm",
        url: "https://github.com/emdmed/lirah/releases/download/v0.1.9/Lirah-0.1.9-1.x86_64.rpm",
      },
      {
        label: ".AppImage",
        url: "https://github.com/emdmed/lirah/releases/download/v0.1.9/Lirah_0.1.9_amd64.AppImage",
      },
    ],
  },
};

export function DownloadSection() {
  return (
    <section id="download" className="border-t border-dashed border-white/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
            Download <span className="font-[family-name:var(--font-grenze-gotisch)]">Lirah</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#969696]">
            Available for Windows, macOS, and Linux. Free and open source.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(downloads).map(([key, platform]) => {
            const Icon = platform.icon;
            return (
              <div
                key={key}
                className="rounded-xl border border-dashed border-white/20 bg-white/5 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#14b8a6]/10">
                    <Icon className="h-5 w-5 text-[#14b8a6]" />
                  </div>
                  <h3 className="text-lg font-semibold">{platform.name}</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {platform.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#14b8a6]/50 hover:bg-[#14b8a6]/10"
                    >
                      <Download className="h-4 w-4 text-[#14b8a6]" />
                      {link.label}
                    </a>
                  ))}
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
            className="text-sm text-[#969696] hover:text-[#14b8a6] transition-colors"
          >
            View all releases →
          </a>
        </div>
      </div>
    </section>
  );
}
