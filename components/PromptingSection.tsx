import { Terminal, RefreshCw, Zap } from "lucide-react";

export function PromptingSection() {
  return (
    <section className="border-t border-dashed border-white/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:gap-16 lg:grid-cols-2">
          {/* Visual - on left this time */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-2 -top-2 h-4 w-4 border-l border-t border-[#14b8a6]/50" />
            <div className="absolute -right-2 -top-2 h-4 w-4 border-r border-t border-[#14b8a6]/50" />
            <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-[#14b8a6]/50" />
            <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-[#14b8a6]/50" />

            <div className="rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-4 sm:p-6">
              <div className="mb-3 text-xs font-medium uppercase tracking-wider text-[#969696]">
                Prompt Editor
              </div>
              <div className="rounded-lg border border-dashed border-white/20 bg-[#09090b] p-3 sm:p-4">
                <div className="font-mono text-xs sm:text-sm text-[#a6a6a6]">
                  <p>Refactor the Button component to:</p>
                  <p className="mt-2">1. Use the new design tokens</p>
                  <p className="mt-2">2. Add loading state support</p>
                  <p className="mt-2">3. Follow the pattern in helpers.ts</p>
                  <p className="mt-2">Keep the existing API compatible.</p>
                </div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded border border-dashed border-white/20 bg-white/5 px-2 py-1 text-xs text-[#969696]">
                    refactor-template
                  </span>
                  <span className="rounded border border-dashed border-white/20 bg-white/5 px-2 py-1 text-xs text-[#969696]">
                    react-component
                  </span>
                </div>
                <button className="rounded-lg bg-[#14b8a6] px-4 py-2 text-sm font-medium text-[#09090b] w-full sm:w-fit">
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#14b8a6]">
              Prompt Reuse
            </p>
            <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
              Stop Writing
              <span className="block text-[#969696]">The Same Prompts</span>
            </h2>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg text-[#969696]">
              No more ad-hoc gists or note templates. A proper editor for the prompts you run every day—built for velocity, not demos.
            </p>

            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#14b8a6]/40 bg-[#14b8a6]/10">
                  <Terminal className="h-3 w-3 text-[#14b8a6]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">Multi-line editor</strong>—compose complex prompts properly
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#14b8a6]/40 bg-[#14b8a6]/10">
                  <RefreshCw className="h-3 w-3 text-[#14b8a6]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">Reusable templates</strong>—ship faster with consistent patterns
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#14b8a6]/40 bg-[#14b8a6]/10">
                  <Zap className="h-3 w-3 text-[#14b8a6]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">Direct to agent</strong>—send prompts straight to your CLI agent
                </span>
              </li>
            </ul>

            <p className="mt-6 sm:mt-8 text-base sm:text-lg font-medium text-white">
              Efficiency without slowing flow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
