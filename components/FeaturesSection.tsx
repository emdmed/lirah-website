import {
  FolderTree,
  FileText,
  Target,
  Pencil,
  Ban,
  BookOpen,
} from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-dashed border-white/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:gap-16 lg:grid-cols-2">
          {/* Content */}
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#7a9e98]">
              Context as First-Class
            </p>
            <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
              Explicit Intent,
              <span className="block text-[#969696]">Not Implicit Noise</span>
            </h2>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg text-[#969696]">
              Tell your agent exactly how to use each file—which ones to edit, which to reference, and which to leave alone. No more guessing, no more bloat.
            </p>

            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10">
                  <FolderTree className="h-3 w-3 text-[#7a9e98]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">Visual file selection</strong>—intentional context, not accidental
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10">
                  <FileText className="h-3 w-3 text-[#7a9e98]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">Explicit file modes</strong>—modify/reference/example intent
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10">
                  <Target className="h-3 w-3 text-[#7a9e98]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">Token discipline</strong>—smart slicing vs full-file dumps
                </span>
              </li>
            </ul>

            {/* File modes */}
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#7a9e98]/30 bg-[#7a9e98]/5 px-3 py-2">
                <Pencil className="h-4 w-4 text-[#7a9e98]" />
                <span className="text-sm text-[#7a9e98]">Modify</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#f6543e]/30 bg-[#f6543e]/5 px-3 py-2">
                <Ban className="h-4 w-4 text-[#f6543e]" />
                <span className="text-sm text-[#f6543e]">Do not modify</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#a78bfa]/30 bg-[#a78bfa]/5 px-3 py-2">
                <BookOpen className="h-4 w-4 text-[#a78bfa]" />
                <span className="text-sm text-[#a78bfa]">Use as example</span>
              </div>
            </div>

            <p className="mt-6 sm:mt-8 border-l-2 border-[#7a9e98]/50 pl-4 text-sm sm:text-base text-[#969696]">
              <strong className="text-white">Result:</strong> Your agent knows exactly what you mean. No babysitting, no wasted tokens, just better results.
            </p>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute -left-2 -top-2 h-4 w-4 border-l border-t border-[#7a9e98]/50" />
            <div className="absolute -right-2 -top-2 h-4 w-4 border-r border-t border-[#7a9e98]/50" />
            <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-[#7a9e98]/50" />
            <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-[#7a9e98]/50" />

            <div className="rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-4 sm:p-6">
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center justify-between rounded-lg border border-dashed border-white/10 bg-white/5 px-3 py-2 sm:px-4 sm:py-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <FileText className="h-4 w-4 text-[#7a9e98]" />
                    <span className="text-xs sm:text-sm text-[#a6a6a6] truncate">src/components/Button.tsx</span>
                  </div>
                  <span className="rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10 px-2 py-1 text-xs text-[#7a9e98] whitespace-nowrap">
                    MODIFY
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-dashed border-white/10 bg-white/5 px-3 py-2 sm:px-4 sm:py-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <FileText className="h-4 w-4 text-[#f6543e]" />
                    <span className="text-xs sm:text-sm text-[#a6a6a6] truncate">src/config/constants.ts</span>
                  </div>
                  <span className="rounded border border-dashed border-[#f6543e]/40 bg-[#f6543e]/10 px-2 py-1 text-xs text-[#f6543e] whitespace-nowrap">
                    LOCKED
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-dashed border-white/10 bg-white/5 px-3 py-2 sm:px-4 sm:py-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <FileText className="h-4 w-4 text-[#a78bfa]" />
                    <span className="text-xs sm:text-sm text-[#a6a6a6] truncate">src/utils/helpers.ts</span>
                  </div>
                  <span className="rounded border border-dashed border-[#a78bfa]/40 bg-[#a78bfa]/10 px-2 py-1 text-xs text-[#a78bfa] whitespace-nowrap">
                    EXAMPLE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
