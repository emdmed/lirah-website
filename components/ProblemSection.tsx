export function ProblemSection() {
  return (
    <section id="problem" className="border-t border-dashed border-white/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#f6543e]">
            The Problem
          </p>
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
            Your Agent Is Only As Good As Its Context
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#969696]">
            Running agents all day means you&apos;ve felt these frustrations firsthand.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative rounded-xl border border-dashed border-[#f6543e]/30 bg-[#f6543e]/5 p-4 sm:p-6">
            <h3 className="mb-2 font-semibold text-white flex items-center gap-2">
              <span className="text-[#f6543e]">01</span> Accidental Context Overload
            </h3>
            <p className="text-sm text-[#969696]">
              Irrelevant files flooding context windows. You&apos;re paying for tokens the agent never even needs.
            </p>
          </div>

          <div className="relative rounded-xl border border-dashed border-[#f6543e]/30 bg-[#f6543e]/5 p-4 sm:p-6">
            <h3 className="mb-2 font-semibold text-white flex items-center gap-2">
              <span className="text-[#f6543e]">02</span> Manual Context Curation
            </h3>
            <p className="text-sm text-[#969696]">
              Copy-pasting file paths. Writing ad-hoc file lists. Spending more time setting up the agent than using it.
            </p>
          </div>

          <div className="relative rounded-xl border border-dashed border-[#f6543e]/30 bg-[#f6543e]/5 p-4 sm:p-6">
            <h3 className="mb-2 font-semibold text-white flex items-center gap-2">
              <span className="text-[#f6543e]">03</span> Context Guesswork
            </h3>
            <p className="text-sm text-[#969696]">
              Never knowing what the agent actually saw. Hallucinations because it &quot;kind of&quot; saw a file in the noise.
            </p>
          </div>

          <div className="relative rounded-xl border border-dashed border-[#f6543e]/30 bg-[#f6543e]/5 p-4 sm:p-6">
            <h3 className="mb-2 font-semibold text-white flex items-center gap-2">
              <span className="text-[#f6543e]">04</span> Usage Limits Hit Fast
            </h3>
            <p className="text-sm text-[#969696]">
              Context bloat means burning through your Claude plan. Fewer iterations per session, higher costs.
            </p>
          </div>

          <div className="relative rounded-xl border border-dashed border-[#f6543e]/30 bg-[#f6543e]/5 p-4 sm:p-6">
            <h3 className="mb-2 font-semibold text-white flex items-center gap-2">
              <span className="text-[#f6543e]">05</span> Signal vs Noise
            </h3>
            <p className="text-sm text-[#969696]">
              Large files destroying context windows. Important intent buried in irrelevant scaffolding.
            </p>
          </div>

          <div className="relative rounded-xl border border-dashed border-[#f6543e]/30 bg-[#f6543e]/5 p-4 sm:p-6">
            <h3 className="mb-2 font-semibold text-white flex items-center gap-2">
              <span className="text-[#f6543e]">06</span> Fragile Context Management
            </h3>
            <p className="text-sm text-[#969696]">
              Manual, error-prone context that breaks when you switch tasks. No systematic approach to intent.
            </p>
          </div>
        </div>

        <p className="mt-8 sm:mt-12 text-center text-base sm:text-lg text-[#969696]">
          These aren&apos;t edge cases.{" "}
          <span className="text-white">They&apos;re why you spend more time managing context than building features.</span>
        </p>
      </div>
    </section>
  );
}
