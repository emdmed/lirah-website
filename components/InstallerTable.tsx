"use client";

import { Lamp } from "./instrument/Lamp";
import { useDetectedOS } from "./useDetectedOS";
import { OS_NAME, formatSize, primaryInstaller, type Release } from "@/lib/releases";

export function InstallerTable({ release }: { release: Release }) {
  const os = useDetectedOS();
  const primary = primaryInstaller(release, os);
  return (
    <table className="w-full border-collapse text-left text-[13px]">
      <caption className="sr-only">Installers in {release.version}</caption>
      <thead>
        <tr className="ins-legend">
          <th scope="col" className="w-8 py-2 pl-4 font-normal"><span className="sr-only">Your system</span></th>
          <th scope="col" className="py-2 font-normal">system</th>
          <th scope="col" className="py-2 font-normal">format</th>
          <th scope="col" className="py-2 font-normal max-sm:hidden">arch</th>
          <th scope="col" className="py-2 font-normal text-right max-sm:hidden">size</th>
          <th scope="col" className="py-2 pr-4 font-normal"><span className="sr-only">Download</span></th>
        </tr>
      </thead>
      <tbody>
        {release.installers.map((i) => {
          const mine = i.os === os;
          // On Linux the install script is the recommendation, so no row is lit.
          const first = os !== "linux" && i.name === primary?.name;
          return (
            <tr key={i.name} className="border-t border-edge">
              <td className="py-2 pl-4">{first && <Lamp state="on" label="recommended for your system" />}</td>
              <td className={`py-2 ${mine ? "text-strong" : "text-foreground"}`}>{OS_NAME[i.os]}</td>
              <td className="py-2 text-foreground">
                {i.format}
                <span className="text-muted-foreground sm:hidden"> · {i.arch}</span>
              </td>
              <td className="py-2 text-muted-foreground max-sm:hidden">{i.arch}</td>
              <td className="py-2 text-right tabular-nums text-muted-foreground max-sm:hidden">{formatSize(i.size)}</td>
              <td className="py-1.5 pr-3 text-right">
                <a href={i.url} className="ins-key ins-key-panel" aria-label={`Download ${i.name}`}>
                  [get]
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
