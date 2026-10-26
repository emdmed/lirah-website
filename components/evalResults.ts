// Measured results for the index on questions that span several files, from the
// evals in agentic-orchestration-workflows (evals/README.md, "Full sweep with
// spans", run 2026-10-19T11-34-12-908Z, protocol at 4d0c771). Sonnet on Claude
// Code 2.1.280, with the hooks vs without, on fresh copies of medprotocol-core
// (small) and nevo-terminal (Lirah's own app, medium): 8 tasks × 3 runs per
// condition. Ratios are with ÷ without, the geometric mean of per-task medians;
// below 1 is better. Update from the run's report.md when a new sweep lands.

export const EVALS_URL = "https://github.com/emdmed/agentic-orchestration-workflows/tree/main/evals";
export const EVALS_MODEL = "Sonnet · Claude Code 2.1.280";

export const CROSS_FILE = {
  runs: 48,
  tasks: 8,
  tasksCheaper: 7,
  cost: 0.87,
  tools: 0.82,
  correct: 100,
  // nevo-terminal alone: Lirah's own codebase.
  ownRepo: { cost: 0.76, time: 0.84 },
};
