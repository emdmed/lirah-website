import { Terminal, Split, GitBranch, FileCode } from "lucide-react";

export function TerminalSection() {
  return (
    <section className="border-t border-dashed border-white/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:gap-16 lg:grid-cols-2">
          {/* Visual - on left this time */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-2 -top-2 h-4 w-4 border-l border-t border-[#7a9e98]/50" />
            <div className="absolute -right-2 -top-2 h-4 w-4 border-r border-t border-[#7a9e98]/50" />
            <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-[#7a9e98]/50" />
            <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-[#7a9e98]/50" />

            <div className="rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-4 sm:p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-[#969696]">
                  Secondary Terminal
                </span>
                <span className="rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10 px-2 py-0.5 text-xs text-[#7a9e98]">
                  Ctrl+`
                </span>
              </div>
              
              {/* Terminal Mockup */}
              <div className="rounded-lg border border-dashed border-white/20 bg-[#09090b] p-3 sm:p-4">
                <div className="font-mono text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-[#666] mb-2">
                    <span className="text-[#7a9e98]">~/project</span>
                    <span className="text-[#f6543e]">main*</span>
                  </div>
                  <div className="text-[#a6a6a6] space-y-1">
                    <p>$ lazygit</p>
                    <p className="text-[#666]"># Git TUI opens in same directory</p>
                  </div>
                </div>
              </div>

              {/* Quick Launch Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-[#7a9e98]/30 bg-[#7a9e98]/5 px-3 py-2">
                  <GitBranch className="h-3 w-3 text-[#7a9e98]" />
                  <span className="text-xs text-[#7a9e98]">lazygit</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-[#7a9e98]/30 bg-[#7a9e98]/5 px-3 py-2">
                  <FileCode className="h-3 w-3 text-[#7a9e98]" />
                  <span className="text-xs text-[#7a9e98]">nvim</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#7a9e98]">
              Secondary Terminal
            </p>
            <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
              Side-by-Side Terminal.
              <span className="block text-[#969696]">Same Directory. Zero Friction.</span>
            </h2>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg text-[#969696]">
              Open a secondary terminal without leaving your workflow. It launches in the same working directory with quick access to your favorite tools.
            </p>

            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10">
                  <Split className="h-3 w-3 text-[#7a9e98]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">Side-by-side view</strong>—Ctrl+` toggles secondary terminal
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10">
                  <GitBranch className="h-3 w-3 text-[#7a9e98]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">Quick launch lazygit</strong>—visual git interface in one click
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10">
                  <FileCode className="h-3 w-3 text-[#7a9e98]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">Launch nvim instantly</strong>—edit files without switching apps
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10">
                  <Terminal className="h-3 w-3 text-[#7a9e98]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">Same working directory</strong>—no cd needed, context preserved
                </span>
              </li>
            </ul>

            <p className="mt-6 sm:mt-8 text-base sm:text-lg font-medium text-white">
              Your terminal, your tools—right where you need them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
