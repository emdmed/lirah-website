import { Pane } from "./instrument/Pane";
import { KeyChord } from "./instrument/Keycap";
import { SectionHead } from "./SectionHead";
import { DetailLevelDemo } from "./DetailLevelDemo";

const CONTROLS: { term: React.ReactNode; title: string; body: string }[] = [
  {
    term: (
      <span className="flex gap-1">
        <span className="ctx-chip"><span className="ctx-mode cursor-default" data-mode="edit">EDIT</span></span>
        <span className="ctx-chip"><span className="ctx-mode cursor-default" data-mode="read">READ</span></span>
        <span className="ctx-chip"><span className="ctx-mode cursor-default" data-mode="copy">COPY</span></span>
      </span>
    ),
    title: "Intent per file",
    body: "Each attached file says what it is for: change it, read it without touching it, or copy its pattern.",
  },
  {
    term: <KeyChord keys={["^", "⇧", "P"]} />,
    title: "Compact Project",
    body: "Turns every JS, TS and Python file into a structural skeleton and attaches it, so the agent sees the shape of the codebase without reading every line.",
  },
  {
    term: <KeyChord keys={["@"]} />,
    title: "Mentions",
    body: "Search for a file inline while you type the prompt.",
  },
  {
    term: (
      <span className="ctx-chip">
        <span className="px-1.5 text-foreground">sets</span>
      </span>
    ),
    title: "Context sets",
    body: "Save the current selection by name. Load it, add to it or update it next time you work on that part of the code.",
  },
  {
    term: <KeyChord keys={["alt", "alt"]} />,
    title: "Instructions",
    body: "Double-tap Alt for your prompt templates and the repo's .patterns conventions.",
  },
  {
    term: <KeyChord keys={["^", "⇧", "Z"]} />,
    title: "Keep and restore",
    body: "Keep the context after sending, or bring the last prompt back.",
  },
];

export function ContextSection() {
  return (
    <section aria-labelledby="context-title" className="scroll-mt-20 pt-28 sm:pt-36" id="context">
      <SectionHead id="context-title" label="context" title="You pick what the agent sees.">
        <p>
          Click a file to attach it to the prompt. Mark it EDIT, READ or COPY so the agent knows what to change and what
          to leave alone. Send a large file as signatures or a skeleton instead of every line.
        </p>
        <p className="text-muted-foreground">
          The prompt footer estimates the token cost before you send, and the status bar shows how full the session&apos;s
          context window is.
        </p>
      </SectionHead>

      <div className="mt-12 grid gap-x-10 gap-y-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
        <DetailLevelDemo />

        <Pane title="prompt controls" className="pt-5">
          <dl className="divide-y divide-edge">
            {CONTROLS.map((c) => (
              <div key={c.title} className="grid gap-x-5 gap-y-1.5 px-4 py-3.5 sm:grid-cols-[132px_minmax(0,1fr)]">
                <dt className="flex items-start pt-0.5">{c.term}</dt>
                <dd>
                  <span className="text-strong">{c.title}.</span>{" "}
                  <span className="text-[14px] text-muted-foreground">{c.body}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Pane>
      </div>
    </section>
  );
}
