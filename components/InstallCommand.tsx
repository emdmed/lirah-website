"use client";

import { useRef, useState } from "react";
import { INSTALL_COMMAND } from "@/lib/releases";

// The Linux primary action: the install script as a prompt line in a well, with
// the copy key set into its right edge. On the hero the key is the filled one.
export function InstallCommand({ size }: { size: "xl" | "lg" | "panel" }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // No clipboard (insecure context, denied permission): select it for a manual copy.
      const range = document.createRange();
      range.selectNodeContents(codeRef.current!);
      const sel = getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }

  const xl = size === "xl";
  return (
    <div className={`ins-well flex w-full max-w-[min(100%,820px)] items-stretch ${xl ? "min-h-14" : "min-h-11"}`}>
      <code
        ref={codeRef}
        className={`flex min-w-0 flex-1 items-center overflow-x-auto whitespace-nowrap px-4 text-foreground ${xl ? "text-[14px] sm:text-[15px]" : "text-[13px]"}`}
      >
        <span aria-hidden="true" className="mr-3 select-none text-lamp">
          $
        </span>
        {INSTALL_COMMAND}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Install command copied" : "Copy install command"}
        className={`ins-key shrink-0 ${xl ? "ins-key-xl px-6" : "ins-key-primary px-4 text-[13px]"}`}
      >
        <span aria-live="polite">{copied ? "copied" : "copy"}</span>
      </button>
    </div>
  );
}
