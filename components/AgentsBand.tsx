const INTERACTIVE = ["Claude Code", "opencode"];
const HEADLESS = ["Codex", "Gemini", "Cursor", "Amp"];

function Names({ names }: { names: string[] }) {
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-foreground">
      {names.map((n) => (
        <span key={n}>{n}</span>
      ))}
    </span>
  );
}

// One printed row under the hero, set like the status bar: which CLIs Lirah
// runs, and how.
export function AgentsBand() {
  return (
    <section aria-label="Agents Lirah runs" className="mt-16 border-y border-edge py-3 sm:mt-20">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px]">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="ins-legend">in the terminal</span>
          <Names names={INTERACTIVE} />
        </span>
        <span className="ins-sep-star max-sm:hidden" aria-hidden="true" />
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="ins-legend">headless jobs</span>
          <Names names={HEADLESS} />
        </span>
      </div>
    </section>
  );
}
