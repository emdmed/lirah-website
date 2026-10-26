import { Pane } from "./instrument/Pane";
import { PaneNote } from "./FeatureLayout";
import { CROSS_FILE, EVALS_MODEL, EVALS_URL } from "./evalResults";

const less = (x: number) => `${Math.round((1 - x) * 100)}%`;

const Num = ({ children }: { children: React.ReactNode }) => (
  <span className="tabular-nums text-strong">{children}</span>
);

// The overall result, under the own-repo headline.
const SUPPORT = [
  <>
    <Num>{less(CROSS_FILE.cost)}</Num> lower API cost per question overall
  </>,
  <>
    <Num>{less(CROSS_FILE.tools)}</Num> fewer tool calls
  </>,
  <>
    cheaper on{" "}
    <Num>
      {CROSS_FILE.tasksCheaper} of {CROSS_FILE.tasks}
    </Num>{" "}
    tasks
  </>,
];

export function EvalsPane() {
  return (
    <Pane
      title={`measured · ${CROSS_FILE.runs} runs`}
      className="pt-5"
      trailing={
        <a href={EVALS_URL} className="ins-legend normal-case text-lamp hover:underline" target="_blank" rel="noreferrer">
          the evals ↗
        </a>
      }
    >
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 px-4 pb-5 pt-1">
        <p className="text-[56px] leading-none tabular-nums text-strong">{less(CROSS_FILE.ownRepo.cost)}</p>
        <p className="max-w-[34ch] text-[17px] leading-snug text-strong">
          cheaper on cross-file questions in Lirah&apos;s own codebase, and {less(CROSS_FILE.ownRepo.time)} faster.
        </p>
      </div>

      <ul className="flex flex-wrap gap-x-8 gap-y-2 border-t border-edge px-4 pt-3 text-[14px] text-muted-foreground">
        {SUPPORT.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p className="px-4 pb-3 pt-1.5 text-[14px] text-muted-foreground">
        Same answers: every run correct, with or without the index.
      </p>

      <PaneNote>
        {CROSS_FILE.tasks} questions that each need 3+ files, 3 runs each way, on a small repo and on Lirah&apos;s own
        app. Every answer graded against the files it should name. {EVALS_MODEL}.
      </PaneNote>
    </Pane>
  );
}
