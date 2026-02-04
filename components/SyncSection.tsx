import { Terminal, FolderTree, ArrowRight } from "lucide-react";

export function SyncSection() {
  return (
    <section className="border-t border-dashed border-white/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#7a9e98]">
            Workflow Optimization
          </p>
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
            A Clean UI That
            <span className="block text-[#969696]">Doesn&apos;t Slow You Down</span>
          </h2>
          <p className="mx-auto mb-8 sm:mb-12 max-w-2xl text-base sm:text-lg text-[#969696]">
            Developer-first tooling. Bidirectional sync keeps your terminal and file tree perfectly aligned—no manual context juggling.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <div className="relative rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-4 sm:p-6">
            <div className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-[#7a9e98]/50" />
            <div className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-[#7a9e98]/50" />
            <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-[#7a9e98]/50" />
            <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-[#7a9e98]/50" />

            <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-dashed border-[#7a9e98]/30 bg-[#7a9e98]/10">
                <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-[#7a9e98]" />
              </div>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#969696]" />
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-dashed border-[#7a9e98]/30 bg-[#7a9e98]/10">
                <FolderTree className="h-4 w-4 sm:h-5 sm:w-5 text-[#7a9e98]" />
              </div>
            </div>
            <p className="font-mono text-xs sm:text-sm text-[#a6a6a6]">
              <span className="text-[#7a9e98]">cd</span> in the terminal →
              sidebar updates instantly
            </p>
          </div>

          <div className="relative rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-4 sm:p-6">
            <div className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-[#7a9e98]/50" />
            <div className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-[#7a9e98]/50" />
            <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-[#7a9e98]/50" />
            <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-[#7a9e98]/50" />

            <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-dashed border-[#7a9e98]/30 bg-[#7a9e98]/10">
                <FolderTree className="h-4 w-4 sm:h-5 sm:w-5 text-[#7a9e98]" />
              </div>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#969696]" />
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-dashed border-[#7a9e98]/30 bg-[#7a9e98]/10">
                <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-[#7a9e98]" />
              </div>
            </div>
            <p className="font-mono text-xs sm:text-sm text-[#a6a6a6]">
              Click a folder in the sidebar → terminal navigates there
            </p>
          </div>
        </div>

        <p className="mt-6 sm:mt-8 text-center text-sm sm:text-base text-[#969696]">
          Always know where you are, without thinking about it.{" "}
          <span className="text-white">A familiar UI that feels obvious—because it should.</span>
        </p>
      </div>
    </section>
  );
}
