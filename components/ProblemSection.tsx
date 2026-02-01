export function ProblemSection() {
  return (
    <section id="problem" className="border-t border-dashed border-white/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#f6543e]">
            The Problem
          </p>
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
            Wasted Tokens Are Wasted Money
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#969696]">
            If you&apos;re using CLI agents seriously, you know the pain.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative rounded-xl border border-dashed border-[#f6543e]/30 bg-[#f6543e]/5 p-4 sm:p-6">
            <h3 className="mb-2 font-semibold text-white flex items-center gap-2">
              <span className="text-[#f6543e]">01</span> Bloated Prompts
            </h3>
            <p className="text-sm text-[#969696]">
              Irrelevant files dumped into context. Every token you don&apos;t need is money wasted on prompts.
            </p>
          </div>

          <div className="relative rounded-xl border border-dashed border-[#f6543e]/30 bg-[#f6543e]/5 p-4 sm:p-6">
            <h3 className="mb-2 font-semibold text-white flex items-center gap-2">
              <span className="text-[#f6543e]">02</span> Manual Context Juggling
            </h3>
            <p className="text-sm text-[#969696]">
              Copy-pasting file paths. Explaining which files to read vs modify. Context overload that slows everything down.
            </p>
          </div>

          <div className="relative rounded-xl border border-dashed border-[#f6543e]/30 bg-[#f6543e]/5 p-4 sm:p-6">
            <h3 className="mb-2 font-semibold text-white flex items-center gap-2">
              <span className="text-[#f6543e]">03</span> Poor Scaffolding
            </h3>
            <p className="text-sm text-[#969696]">
              No structure. No reusable templates. You&apos;re writing the same prompt scaffolding over and over.
            </p>
          </div>

          <div className="relative rounded-xl border border-dashed border-[#f6543e]/30 bg-[#f6543e]/5 p-4 sm:p-6">
            <h3 className="mb-2 font-semibold text-white flex items-center gap-2">
              <span className="text-[#f6543e]">04</span> Agents Running All Day
            </h3>
            <p className="text-sm text-[#969696]">
              Inefficient context means more back-and-forth. More iterations. Higher inference costs.
            </p>
          </div>

          <div className="relative rounded-xl border border-dashed border-[#f6543e]/30 bg-[#f6543e]/5 p-4 sm:p-6">
            <h3 className="mb-2 font-semibold text-white flex items-center gap-2">
              <span className="text-[#f6543e]">05</span> Terminal-Only Workflow
            </h3>
            <p className="text-sm text-[#969696]">
              Great agents trapped in a single-line input. No clean UI for complex, agentic dev workflows.
            </p>
          </div>

          <div className="relative rounded-xl border border-dashed border-[#f6543e]/30 bg-[#f6543e]/5 p-4 sm:p-6">
            <h3 className="mb-2 font-semibold text-white flex items-center gap-2">
              <span className="text-[#f6543e]">06</span> Context Guesswork
            </h3>
            <p className="text-sm text-[#969696]">
              Never knowing what the model actually &ldquo;saw&rdquo;. Prompt bloat creeps in because you can&apos;t see it.
            </p>
          </div>
        </div>

        <p className="mt-8 sm:mt-12 text-center text-base sm:text-lg text-[#969696]">
          These aren&apos;t edge cases.{" "}
          <span className="text-white">They&apos;re the daily reality for developers using Claude Code and other CLI agents.</span>
        </p>
      </div>
    </section>
  );
}
