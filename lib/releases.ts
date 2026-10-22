// Installers from the latest GitHub release, fetched at build time and
// revalidated hourly. Falls back to the releases page if GitHub is down.

export type OS = "linux" | "macos" | "windows";

export interface Installer {
  os: OS;
  format: string;
  arch: string;
  name: string;
  url: string;
  size: number;
}

export interface Release {
  version: string;
  url: string;
  installers: Installer[];
}

export const REPO_URL = "https://github.com/emdmed/lirah";
export const RELEASES_URL = `${REPO_URL}/releases/latest`;
export const SOURCE_URL = `${REPO_URL}#building-from-source`;

function classify(name: string): Omit<Installer, "name" | "url" | "size"> | null {
  const arch = /aarch64|arm64/.test(name) ? "arm64" : "x64";
  if (name.endsWith(".AppImage")) return { os: "linux", format: "AppImage", arch };
  if (name.endsWith(".deb")) return { os: "linux", format: "deb", arch };
  if (name.endsWith(".rpm")) return { os: "linux", format: "rpm", arch };
  if (name.endsWith(".dmg")) return { os: "macos", format: "dmg", arch: arch === "arm64" ? "Apple silicon" : "Intel" };
  if (name.endsWith("-setup.exe")) return { os: "windows", format: "exe", arch };
  if (name.endsWith(".msi")) return { os: "windows", format: "msi", arch };
  return null;
}

const ORDER = ["AppImage", "deb", "rpm", "dmg", "exe", "msi"];

export async function getLatestRelease(): Promise<Release | null> {
  try {
    const res = await fetch("https://api.github.com/repos/emdmed/lirah/releases/latest", {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      tag_name: string;
      html_url: string;
      assets: { name: string; browser_download_url: string; size: number }[];
    };
    const installers = data.assets
      .map((a) => {
        const c = classify(a.name);
        return c ? { ...c, name: a.name, url: a.browser_download_url, size: a.size } : null;
      })
      .filter((x): x is Installer => x !== null)
      .sort((a, b) => ORDER.indexOf(a.format) - ORDER.indexOf(b.format) || (a.arch === "arm64" || a.arch === "Apple silicon" ? 1 : -1));
    return { version: data.tag_name, url: data.html_url, installers };
  } catch {
    return null;
  }
}

export const OS_NAME: Record<OS, string> = { linux: "Linux", macos: "macOS", windows: "Windows" };

/** The installer to offer first on each OS. */
export function primaryInstaller(release: Release | null, os: OS) {
  if (!release) return null;
  const pick = { linux: "AppImage", macos: "dmg", windows: "exe" }[os];
  return (
    release.installers.find((i) => i.os === os && i.format === pick && (os !== "macos" || i.arch === "Apple silicon")) ??
    release.installers.find((i) => i.os === os) ??
    null
  );
}

export function formatSize(bytes: number) {
  return `${(bytes / 1_048_576).toFixed(bytes > 50_000_000 ? 0 : 1)} MB`;
}
