import { SectionHead } from "./SectionHead";
import { KeyChord } from "./instrument/Keycap";

// Every feature section has the same shape: label, heading and a short intro on
// top, then the demo row. Keep the intro to one lead paragraph plus at most one
// muted sentence; the panes carry the detail.
export function FeatureSection({
  id,
  label,
  title,
  lead,
  intro,
  children,
}: {
  id: string;
  label: string;
  title: React.ReactNode;
  lead?: boolean;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-title`} className="scroll-mt-20 pt-28 sm:pt-36" id={id}>
      <SectionHead id={`${id}-title`} label={label} title={title} lead={lead}>
        {intro}
      </SectionHead>
      <div className="mt-12">{children}</div>
    </section>
  );
}

// The demo row: the working demo on the left, a reference pane on the right.
export function FeatureSplit({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
      {children}
    </div>
  );
}

// A reference pane's rows: a key, chip or chord on the left, what it does on the right.
export function FeatureList({ items }: { items: { term: React.ReactNode; title: string; body: React.ReactNode }[] }) {
  return (
    <dl className="divide-y divide-edge">
      {items.map((c) => (
        <div key={c.title} className="grid gap-x-5 gap-y-1.5 px-4 py-3.5 sm:grid-cols-[132px_minmax(0,1fr)]">
          <dt className="flex flex-wrap items-start gap-1.5 pt-0.5">{c.term}</dt>
          <dd>
            <span className="text-strong">{c.title}.</span>{" "}
            <span className="text-[14px] text-muted-foreground">{c.body}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

// A named thing that isn't a key, set like the app's context chips.
export function TermChip({ prefix, children }: { prefix?: string; children: React.ReactNode }) {
  return (
    <span className="ctx-chip">
      {prefix && <span className="pl-1.5 text-muted-foreground">{prefix}</span>}
      <span className="px-1.5 text-foreground">{children}</span>
    </span>
  );
}

// One printed row of shortcuts at the foot of a pane, like the app's hold-Ctrl hint bar.
export function KeyStrip({ keys }: { keys: { keys: string[][]; action: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2.5 border-t border-edge px-4 py-3.5 text-[13px]">
      {keys.map((k) => (
        <li key={k.action} className="flex items-center gap-2">
          <span className="flex items-center gap-1.5">
            {k.keys.map((c, i) => (
              <KeyChord key={i} keys={c} size="sm" />
            ))}
          </span>
          <span className="text-foreground">{k.action}</span>
        </li>
      ))}
    </ul>
  );
}

// The note under a demo: what it's wired to, or that the data is made up.
export function PaneNote({ children }: { children: React.ReactNode }) {
  return <p className="border-t border-edge px-4 py-3 text-[12px] text-muted-foreground">{children}</p>;
}
