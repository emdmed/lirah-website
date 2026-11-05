// The section's name set as a code comment on a rail, Calibrated's strong
// section head: end stops around a rule, the section number in a chip.
// Inside the sheet a CSS counter fills the number (globals.css).
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="sec-head ins-legend mb-8 flex items-center gap-3">
      <span aria-hidden="true" className="sec-stop" />
      <span>
        {"// "}
        {children}
      </span>
      <span aria-hidden="true" className="sec-rail" />
      <span aria-hidden="true" className="sec-num" />
    </p>
  );
}

// A section's heading on the gutter, its copy below it in one column. `lead`
// is for the page's core section: a heading a step below the hero's.
export function SectionHead({
  id,
  label,
  title,
  lead = false,
  children,
}: {
  id: string;
  label?: string;
  title: React.ReactNode;
  lead?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {label && <SectionLabel>{label}</SectionLabel>}
      <div className={lead ? "max-w-[980px]" : "max-w-[760px]"}>
        <h2
          id={id}
          className={
            lead
              ? "text-[clamp(30px,4.4vw,56px)] leading-[1.06] tracking-[-0.03em] text-strong [text-wrap:balance]"
              : "text-[clamp(24px,2.4vw,30px)] leading-[1.18] tracking-[-0.01em] text-strong [text-wrap:balance]"
          }
        >
          {title}
        </h2>
        <div
          className={`max-w-[64ch] space-y-3 leading-[1.7] ${lead ? "mt-7 text-[16px]" : "mt-5 text-[15px]"}`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
