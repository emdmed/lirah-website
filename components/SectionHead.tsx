// A section's heading on the gutter, its copy below it in one column.
export function SectionHead({ id, title, children }: { id: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="max-w-[760px]">
      <h2 id={id} className="text-[clamp(24px,2.4vw,30px)] leading-[1.18] tracking-[-0.01em]">
        {title}
      </h2>
      <div className="mt-5 max-w-[64ch] space-y-3 text-[15px] leading-[1.7]">{children}</div>
    </div>
  );
}
