import { GitCommit, FileText, Keyboard } from "lucide-react";

export function AutomationSection() {
  return (
    <section className="border-t border-dashed border-white/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:gap-16 lg:grid-cols-2">
          {/* Content */}
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#7a9e98]">
              AI-Assisted Automation
            </p>
            <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
              Let AI Handle the
              <span className="block text-[#969696]">Boring Stuff.</span>
            </h2>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg text-[#969696]">
              Stop writing commit messages and changelogs manually. Lirah generates them from your actual changes—so you stay focused on coding, not paperwork.
            </p>

            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10">
                  <GitCommit className="h-3 w-3 text-[#7a9e98]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">Auto Commit</strong>—AI-generated commit messages with configurable templates
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10">
                  <Keyboard className="h-3 w-3 text-[#7a9e98]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">Ctrl+Enter</strong>—commit with one keystroke
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#7a9e98]/40 bg-[#7a9e98]/10">
                  <FileText className="h-3 w-3 text-[#7a9e98]" />
                </div>
                <span className="text-sm sm:text-base text-[#a6a6a6]">
                  <strong className="text-white">Auto Changelog</strong>—automated generation from commit history, Keep a Changelog format
                </span>
              </li>
            </ul>

            <p className="mt-6 sm:mt-8 border-l-2 border-[#7a9e98]/50 pl-4 text-sm sm:text-base text-[#969696]">
              <strong className="text-white">Result:</strong> Your git history stays clean and meaningful—without you typing a single commit message.
            </p>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute -left-2 -top-2 h-4 w-4 border-l border-t border-[#7a9e98]/50" />
            <div className="absolute -right-2 -top-2 h-4 w-4 border-r border-t border-[#7a9e98]/50" />
            <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-[#7a9e98]/50" />
            <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-[#7a9e98]/50" />

            <div className="rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-4 sm:p-6">
              <div className="space-y-4 font-mono text-sm">
                {/* Auto Commit */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <GitCommit className="h-4 w-4 text-[#7a9e98]" />
                    <span className="text-xs text-[#969696]">AI-Generated Commit</span>
                  </div>
                  <div className="rounded-lg border border-dashed border-[#7a9e98]/20 bg-[#7a9e98]/5 p-3">
                    <div className="text-[#7a9e98]">feat: add user authentication middleware</div>
                    <div className="mt-1 text-xs text-[#666]">
                      - Implement JWT validation<br />
                      - Add refresh token rotation<br />
                      - Update auth service tests
                    </div>
                  </div>
                </div>

                {/* Auto Changelog */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#7a9e98]" />
                    <span className="text-xs text-[#969696]">Auto-Generated Changelog</span>
                  </div>
                  <div className="rounded-lg border border-dashed border-[#7a9e98]/20 bg-[#7a9e98]/5 p-3">
                    <div className="text-[#969696]">
                      <div className="text-[#7a9e98]">## [1.4.0] - 2026-02-19</div>
                      <div className="mt-2 text-[#a6a6a6]">### Added</div>
                      <div className="text-[#666]">- User authentication middleware</div>
                      <div className="text-[#666]">- Token refresh mechanism</div>
                      <div className="mt-1 text-[#a6a6a6]">### Fixed</div>
                      <div className="text-[#666]">- Session timeout edge case</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
