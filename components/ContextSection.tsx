import { Pane } from "./instrument/Pane";
import { KeyChord } from "./instrument/Keycap";
import { formatTokens } from "./instrument/Meter";
import { fileByPath } from "./ledger/demoSession";
import { DetailLevelDemo } from "./DetailLevelDemo";
import { FeatureList, FeatureSection, FeatureSplit, KeyStrip, TermChip } from "./FeatureLayout";

const SCHEMA = fileByPath("src/db/schema.ts");

// The controls that sell the section get a row each; the rest are a key strip.
const CONTROLS = [
  {
    term: (
      <span className="flex gap-1">
        <span className="ctx-chip"><span className="ctx-mode cursor-default" data-mode="edit">EDIT</span></span>
        <span className="ctx-chip"><span className="ctx-mode cursor-default" data-mode="read">READ</span></span>
        <span className="ctx-chip"><span className="ctx-mode cursor-default" data-mode="copy">COPY</span></span>
      </span>
    ),
    title: "Intent per file",
    body: "Change it, read it without touching it, or copy its pattern, like an existing route to model a new one on.",
  },
  {
    term: <KeyChord keys={["^", "⇧", "P"]} />,
    title: "Compact Project",
    body: "Every JS, TS and Python file as a skeleton, so the agent sees the shape of the codebase without reading it.",
  },
  {
    term: <TermChip prefix="set">auth-flow</TermChip>,
    title: "Context sets",
    body: "Save a selection by name and load it next time you work on that part of the code.",
  },
];

const KEYS = [
  { keys: [["@"]], action: "mention a file" },
  { keys: [["alt", "alt"]], action: "templates and .patterns" },
  { keys: [["^", "⇧", "Z"]], action: "keep or restore context" },
];

export function ContextSection() {
  return (
    <FeatureSection
      id="context"
      label="context"
      title="Stop paying for files your agent didn't need."
      lead
      intro={
        <>
          <p>
            Left alone, an agent reads whole files to find one function. You pay for every line, and the session
            compacts away what you told it earlier. In Lirah you pick what it sees, and send big files as signatures
            instead of every line:{" "}
            <span className="text-strong">
              schema.ts goes from {formatTokens(SCHEMA.tokens.full)} tokens to {formatTokens(SCHEMA.tokens.sig)}
            </span>
            .
          </p>
          <p className="text-muted-foreground">The prompt footer shows the estimate before you send.</p>
        </>
      }
    >
      <FeatureSplit>
        <DetailLevelDemo />
        <Pane title="prompt controls" className="pt-5">
          <FeatureList items={CONTROLS} />
          <KeyStrip keys={KEYS} />
        </Pane>
      </FeatureSplit>
    </FeatureSection>
  );
}
