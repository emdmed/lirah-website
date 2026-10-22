import { SectionHead } from "./SectionHead";

const PILLARS = [
  { title: "Less.", body: "Send a large file as signatures or a skeleton. The agent gets its shape, not every line." },
  { title: "Clearer.", body: "Mark each file EDIT, READ or COPY. The agent knows what to change and what to leave alone." },
  { title: "Visible.", body: "The prompt footer estimates the token cost before you send. No surprises at the meter." },
];

// The problem before the features: why choosing context matters at all.
export function ProblemSection() {
  return (
    <section aria-labelledby="problem-title" className="scroll-mt-20 pt-28 sm:pt-36" id="problem">
      <SectionHead id="problem-title" label="the problem" title="Stop paying for files your agent didn't need.">
        <p>
          Left alone, an agent reads whole files to find one function. The context window fills, the session compacts,
          and what you told it earlier gets summarized away.
        </p>
      </SectionHead>

      <dl className="mt-12 grid gap-x-10 gap-y-8 border-t border-edge pt-8 sm:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.title}>
            <dt className="text-[19px] text-strong">{p.title}</dt>
            <dd className="mt-2 max-w-[36ch] text-[15px] leading-[1.65] text-muted-foreground">{p.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
