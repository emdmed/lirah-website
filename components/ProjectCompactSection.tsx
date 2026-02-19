import { Layers, FileCode, Zap, Eye, ArrowRight, Braces, Component } from "lucide-react";

export function ProjectCompactSection() {
  return (
    <section id="project-compact" className="border-t border-dashed border-white/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:gap-16 lg:grid-cols-2">
          {/* Content */}
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#7a9e98]">
              Enhanced Project Compact
            </p>
            <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
              Your Entire Codebase.
              <span className="block text-[#969696]">A Fraction of the Tokens.</span>
            </h2>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg text-[#969696]">
              One shortcut parses your entire project into a structural skeleton—function signatures, class hierarchies, module exports—so your agent sees your full architecture without burning your context window.
            </p>

            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10">
                  <Layers className="h-3 w-3 text-[#7a9e98]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">70-90% compression</strong>—50K lines fit in ~5K tokens
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10">
                  <Braces className="h-3 w-3 text-[#7a9e98]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">Python + JS/TS support</strong>—enhanced parsing for multiple languages
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10">
                  <Component className="h-3 w-3 text-[#7a9e98]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">useEffect hook detection</strong>—React-specific symbol extraction
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10">
                  <FileCode className="h-3 w-3 text-[#7a9e98]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">No more cherry-picking</strong>—share everything automatically
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10">
                  <Zap className="h-3 w-3 text-[#7a9e98]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">Ctrl+Shift+P</strong>—full project context, one keystroke
                </span>
              </li>
            </ul>

            <p className="mt-6 sm:mt-8 border-l-2 border-[#7a9e98]/50 pl-4 text-sm sm:text-base text-[#969696]">
              Your agent navigates accurately, understands your dependency graph, avoids hallucinating function names, and plans changes with real awareness of ripple effects.
            </p>
          </div>

          {/* Visual - Before/After Comparison */}
          <div className="relative">
            <div className="absolute -left-2 -top-2 h-4 w-4 border-l border-t border-[#7a9e98]/50" />
            <div className="absolute -right-2 -top-2 h-4 w-4 border-r border-t border-[#7a9e98]/50" />
            <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-[#7a9e98]/50" />
            <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-[#7a9e98]/50" />

            <div className="rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-4 sm:p-6">
              {/* Without */}
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded border border-dashed border-[#f6543e]/40 bg-[#f6543e]/10 px-2 py-0.5 text-xs text-[#f6543e]">
                    WITHOUT
                  </span>
                  <span className="text-xs text-[#969696]">Manual file selection</span>
                </div>
                <div className="rounded-lg border border-dashed border-[#f6543e]/20 bg-[#f6543e]/5 p-3 font-mono text-xs">
                  <div className="text-[#969696]">
                    <span className="text-[#f6543e]">127,000</span> tokens
                  </div>
                  <div className="mt-1 text-[#666] italic text-[#f6543e]/60">
                    &quot;Which files should I share?&quot;
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center my-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-[#7a9e98]/30 bg-[#7a9e98]/10">
                  <ArrowRight className="h-4 w-4 text-[#7a9e98] rotate-90" />
                </div>
              </div>

              {/* With */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10 px-2 py-0.5 text-xs text-[#7a9e98]">
                    WITH
                  </span>
                  <span className="text-xs text-[#969696]">Project Compact</span>
                </div>
                <div className="rounded-lg border border-dashed border-[#7a9e98]/20 bg-[#7a9e98]/5 p-3 font-mono text-xs">
                  <div className="text-[#969696]">
                    <span className="text-[#7a9e98]">~8,500</span> tokens
                    <span className="ml-2 text-[#7a9e98]/70">(93% reduction)</span>
                  </div>
                  <div className="mt-2 space-y-1 text-[#666]">
                    <div><span className="text-[#7a9e98]">fn</span> createUser(email, password): User</div>
                    <div><span className="text-[#7a9e98]">fn</span> validateToken(token): boolean</div>
                    <div><span className="text-[#7a9e98]">class</span> AuthService {'{'} login, logout, refresh {'}'}</div>
                    <div className="text-[#555]">...342 more signatures</div>
                  </div>
                </div>
              </div>

              {/* Preview badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#969696]">
                <Eye className="h-3 w-3" />
                <span>Preview token savings before confirming</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
