import { SectionLabel } from "./SectionHead";

// Every figure here is a fact stated elsewhere on the page, not a benchmark.
const FACTS = [
  { value: "8", label: "agents in one window", note: "Each tab has its own terminal, agent and sandbox." },
  { value: "6", label: "CLIs for background jobs", note: "Claude Code, opencode, Codex, Gemini, Cursor and Amp." },
  { value: "0", label: "telemetry", note: "The only request Lirah makes is a check for updates." },
  { value: "0", label: "pushes, pulls or fetches", note: "All of it is local git. Your remote stays yours." },
];

export function ProofStrip() {
  return (
    <section aria-labelledby="proof-title" className="scroll-mt-20 pt-28 sm:pt-36" id="proof">
      <SectionLabel>in numbers</SectionLabel>
      <h2 id="proof-title" className="sr-only">
        Lirah in numbers
      </h2>
      <dl className="grid gap-x-10 gap-y-10 border-t border-edge pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map((f) => (
          <div key={f.label}>
            <dt className="flex items-baseline gap-3">
              <span className="text-[clamp(36px,4vw,52px)] leading-none tracking-[-0.03em] text-lamp tabular-nums">
                {f.value}
              </span>
              <span className="text-[15px] text-strong">{f.label}</span>
            </dt>
            <dd className="mt-3 max-w-[32ch] text-[14px] leading-[1.65] text-muted-foreground">{f.note}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
