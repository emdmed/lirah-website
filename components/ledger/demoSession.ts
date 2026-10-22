// Demonstration data for the landing page's replica of a Lirah session.
// Token counts are illustrative, not measurements.

export type Mode = "edit" | "read" | "copy";
export type Detail = "full" | "sig" | "skel";

export interface DemoFile {
  path: string;
  /** Tokens at each detail level. */
  tokens: Record<Detail, number>;
}

export const CONTEXT_MAX = 200_000;

export const TASK = "add refresh-token rotation to the auth middleware";

/** The workspace tab the demo session runs in. */
export const DEMO_TAB = "acme-api";

/** Context in use by the other tabs in the demo workspace. */
export const TAB_TOKENS: Record<string, number> = {
  "acme-web": 82_000,
  "acme-db": 132_000,
  infra: 24_000,
  "acme-api·2": 14_000,
  docs: 0,
};

export const FILES: DemoFile[] = [
  { path: "src/middleware/auth.ts", tokens: { full: 3200, sig: 700, skel: 300 } },
  { path: "src/lib/token.ts", tokens: { full: 1900, sig: 500, skel: 200 } },
  { path: "src/routes/session.ts", tokens: { full: 7900, sig: 800, skel: 400 } },
  { path: "src/routes/index.ts", tokens: { full: 4300, sig: 600, skel: 300 } },
  { path: "src/db/schema.ts", tokens: { full: 12600, sig: 2100, skel: 900 } },
  { path: "src/db/migrations/0007_sessions.sql", tokens: { full: 3800, sig: 3800, skel: 3800 } },
  { path: "src/server.ts", tokens: { full: 6100, sig: 900, skel: 400 } },
  { path: "tests/auth.test.ts", tokens: { full: 9700, sig: 1300, skel: 500 } },
  { path: "tests/fixtures/users.json", tokens: { full: 22100, sig: 22100, skel: 22100 } },
  { path: "docs/api.md", tokens: { full: 14600, sig: 14600, skel: 14600 } },
  { path: "dist/server.js", tokens: { full: 28400, sig: 28400, skel: 28400 } },
  { path: "package-lock.json", tokens: { full: 41800, sig: 41800, skel: 41800 } },
  { path: "README.md", tokens: { full: 5400, sig: 5400, skel: 5400 } },
  { path: "CHANGELOG.md", tokens: { full: 8400, sig: 8400, skel: 8400 } },
];

/** Files have a detail choice only when Lirah can slice them (JS/TS/Python). */
export function hasDetail(path: string) {
  return /\.(ts|tsx|js|jsx|py)$/.test(path) && !path.startsWith("dist/");
}

export interface Attachment {
  mode: Mode;
  detail: Detail;
}

export type Selection = Record<string, Attachment>;

/** The context you would attach for this task in Lirah. */
export const CHOSEN: Selection = {
  "src/middleware/auth.ts": { mode: "edit", detail: "full" },
  "src/lib/token.ts": { mode: "edit", detail: "full" },
  "src/routes/session.ts": { mode: "read", detail: "sig" },
  "src/db/schema.ts": { mode: "read", detail: "sig" },
  "tests/auth.test.ts": { mode: "copy", detail: "skel" },
};

/** Compact Project: a structural skeleton of every JS/TS/Python file. */
export const COMPACT_TOKENS = 1600;

/** What an agent left to explore on its own reads, in order, in full. */
export const EXPLORE_ORDER = [
  "package-lock.json",
  "README.md",
  "src/server.ts",
  "dist/server.js",
  "src/routes/index.ts",
  "src/routes/session.ts",
  "src/middleware/auth.ts",
  "src/lib/token.ts",
  "src/db/schema.ts",
  "src/db/migrations/0007_sessions.sql",
  "docs/api.md",
  "tests/auth.test.ts",
  "tests/fixtures/users.json",
  "CHANGELOG.md",
];

export function fileByPath(path: string) {
  return FILES.find((f) => f.path === path)!;
}

export function selectionTokens(sel: Selection, compact: boolean) {
  let sum = compact ? COMPACT_TOKENS : 0;
  for (const [path, a] of Object.entries(sel)) sum += fileByPath(path).tokens[a.detail];
  return sum;
}

export function exploreTokens(count: number) {
  return EXPLORE_ORDER.slice(0, count).reduce((s, p) => s + fileByPath(p).tokens.full, 0);
}

export const MODE_LABEL: Record<Mode, string> = { edit: "EDIT", read: "READ", copy: "COPY" };
export const MODE_TITLE: Record<Mode, string> = {
  edit: "Agent may edit this file",
  read: "Reference only, agent must not edit",
  copy: "Follow this file as a pattern",
};
export const NEXT_MODE: Record<Mode, Mode> = { edit: "read", read: "copy", copy: "edit" };
export const DETAIL_LABEL: Record<Detail, string> = { full: "full", sig: "signatures", skel: "skeleton" };
export const NEXT_DETAIL: Record<Detail, Detail> = { full: "sig", sig: "skel", skel: "full" };
