"use client";

import { Fragment, useRef, useState } from "react";
import { INSTALL_COMMAND } from "@/lib/releases";

const COMMAND_PARTS = INSTALL_COMMAND.split("/");

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
    <div className={`ins-well flex w-full items-stretch ${xl ? "max-w-[min(100%,1000px)] min-h-14" : "max-w-[min(100%,820px)] min-h-11"}`}>
      <code
        ref={codeRef}
        className={`block min-w-0 flex-1 self-center px-4 py-2.5 leading-[1.55] text-foreground [overflow-wrap:anywhere] ${xl ? "text-[14px] lg:whitespace-nowrap" : "text-[13px]"}`}
      >
        {/* Wraps instead of scrolling, so the `| bash` at the end is always in view. On a wide hero it fits one line. */}
        <span aria-hidden="true" className="mr-3 select-none text-muted-foreground">
          $
        </span>
        {/* A break opportunity after each slash, so the URL wraps at path segments. */}
        {COMMAND_PARTS.map((part, i) => (
          <Fragment key={i}>
            {part}
            {i < COMMAND_PARTS.length - 1 && (
              <>
                {/* Chrome breaks at <wbr> even under nowrap, so the hero hides them once the line fits. */}
                /<wbr className={xl ? "lg:hidden" : undefined} />
              </>
            )}
          </Fragment>
        ))}
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
