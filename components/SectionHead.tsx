// The section's name set as a code comment, the way the page labels its panes.
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="ins-legend mb-5">{"// "}{children}</p>;
}

// A section's heading on the gutter, its copy below it in one column.
export function SectionHead({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label?: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[760px]">
      {label && <SectionLabel>{label}</SectionLabel>}
      <h2 id={id} className="text-[clamp(24px,2.4vw,30px)] leading-[1.18] tracking-[-0.01em]">
        {title}
      </h2>
      <div className="mt-5 max-w-[64ch] space-y-3 text-[15px] leading-[1.7]">{children}</div>
    </div>
  );
}
