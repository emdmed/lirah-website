export function ProblemSection() {
  return (
    <section id="problem" className="border-t border-dashed border-white/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#f6543e]">
            The Real Cost
          </p>
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
            Wasting Tokens on Irrelevant Context?
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#969696]">
            Running agents all day means you&apos;re burning cash on tokens your AI never even uses. These frustrations are costing you time and money.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative rounded-xl border border-dashed border-[#f6543e]/30 bg-[#f6543e]/5 p-4 sm:p-6">
            <h3 className="mb-2 font-semibold text-white flex items-center gap-2">
              <span className="text-[#f6543e]">01</span> Burning Tokens on Noise
            </h3>
            <p className="text-sm text-[#969696]">
              Irrelevant files flooding context windows. Every wasted token is money down the drain on files your AI never touches.
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
              <span className="text-[#f6543e]">04</span> Hitting Limits by Noon?
            </h3>
            <p className="text-sm text-[#969696]">
              Context bloat burns through your Claude plan before lunch. Half the coding time, twice the cost. Sound familiar?
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
          <span className="text-white font-bold">They&apos;re costing you tokens and productivity.</span>
        </p>
      </div>
    </section>
  );
}
