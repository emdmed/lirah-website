import { Pane } from "./instrument/Pane";
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
    body: "Change it, read it, or copy its pattern.",
  },
  {
    term: <TermChip prefix="hook">context</TermChip>,
    title: "Box or terminal",
    body: "Type into Claude Code; a hook appends your picks.",
  },
  {
    term: <TermChip prefix="set">auth-flow</TermChip>,
    title: "Context sets",
    body: "Save a selection by name, load it later.",
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
        <p>Pick what the agent sees, and send big files as signatures:{" "}
          <span className="text-strong">
            schema.ts goes from {formatTokens(SCHEMA.tokens.full)} tokens to {formatTokens(SCHEMA.tokens.sig)}
          </span>
          .
        </p>
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
