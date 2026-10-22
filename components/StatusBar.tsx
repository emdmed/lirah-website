"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LirahMark } from "./instrument/LirahMark";
import { useLedger } from "./ledger/LedgerProvider";
import { REPO_URL } from "@/lib/releases";

const NAV = [
  { href: "/#context", label: "context" },
  { href: "/#workspace", label: "workspace" },
  { href: "/#jobs", label: "jobs" },
  { href: "/#sandbox", label: "sandbox" },
  { href: "/blog", label: "blog" },
];

// The page's top rail, built like the app's status bar: the mark (lit while the
// demo session runs, like the app's session lamp) and the nav as printed keys.
export function StatusBar() {
  const ledger = useLedger();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-gutter/95 backdrop-blur-[6px]">
      <div className="mx-auto flex h-14 max-w-[1320px] items-center gap-3 px-3 sm:gap-5 sm:px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-strong" aria-label="Lirah home">
          <LirahMark size={24} lit={Boolean(ledger)} />
          <span className="font-wordmark text-[26px] leading-none">Lirah</span>
        </Link>

        <span className="ins-sep-star hidden lg:inline-block" aria-hidden="true" />

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="ins-key ins-key-panel">
              [{item.label}]
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex min-w-0 items-center gap-3 sm:gap-5">
          <a href={REPO_URL} className="ins-key ins-key-panel hidden sm:inline-flex">
            [github]
          </a>

          <Link href="/#download" className="ins-key ins-key-primary ins-key-panel hidden h-8 px-3 sm:inline-flex">
            download
          </Link>

          <div ref={menuRef} className="relative lg:hidden">
            <button
              type="button"
              className="ins-key ins-key-panel h-8"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-pressed={open}
              onClick={() => setOpen((o) => !o)}
            >
              [menu]
            </button>
            {open && (
              <nav
                id="site-menu"
                aria-label="Main"
                className="ins-veil ins-pop absolute right-0 top-[calc(100%+8px)] flex w-48 flex-col p-1.5"
              >
                {[...NAV, { href: REPO_URL, label: "github" }, { href: "/#download", label: "download" }].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="ins-key ins-key-panel h-9 justify-start"
                  >
                    [{item.label}]
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
