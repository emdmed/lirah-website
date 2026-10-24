"use client";

import { Pane } from "./instrument/Pane";
import { PaneNote } from "./FeatureLayout";
import { formatTokens } from "./instrument/Meter";
import { useLedger } from "./ledger/LedgerProvider";
import { DETAIL_LABEL, fileByPath, type Detail } from "./ledger/demoSession";

const PATH = "src/db/schema.ts";

const PREVIEW: Record<Detail, string[]> = {
  full: [
    'import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";',
    "",
    'export const sessions = pgTable("sessions", {',
    '  id: uuid("id").primaryKey().defaultRandom(),',
    '  userId: uuid("user_id").references(() => users.id),',
    '  refresh: text("refresh").notNull(),',
    '  expiresAt: timestamp("expires_at").notNull(),',
    '  revoked: boolean("revoked").default(false),',
    "});",
    "",
    "export async function findSessionByRefresh(token: string) {",
    "  const [row] = await db.select().from(sessions)",
    "    .where(and(eq(sessions.refresh, token), eq(sessions.revoked, false)));",
    "  return row ?? null;",
    "}",
  ],
  sig: [
    "export const users: PgTable<{ id, email, passwordHash, createdAt }>",
    "export const sessions: PgTable<{ id, userId, refresh, expiresAt, revoked }>",
    "export const apiKeys: PgTable<{ id, userId, hash, scopes, lastUsedAt }>",
    "export function findSessionByRefresh(token: string): Promise<Session | null>",
    "export function revokeSession(id: string): Promise<void>",
    "export function createSession(userId: string): Promise<Session>",
  ],
  skel: [
    "const users",
    "const sessions",
    "const apiKeys",
    "fn findSessionByRefresh(token)",
    "fn revokeSession(id)",
    "fn createSession(userId)",
  ],
};

const MORE: Record<Detail, string> = {
  full: "… 368 more lines",
  sig: "… 14 more exports",
  skel: "… 14 more symbols",
};

// One file at three detail levels. schema.ts is in the demo prompt above, so
// changing it here moves the context meter in the status bar.
export function DetailLevelDemo() {
  const ledger = useLedger()!;
  const file = fileByPath(PATH);
  const full = file.tokens.full;
  const saving = (d: Detail) => Math.round((1 - file.tokens[d] / full) * 100);
  const current: Detail = ledger.scene === "explicit" ? (ledger.selection[PATH]?.detail ?? "sig") : "full";

  return (
    <Pane title="detail level" className="pt-5 lg:sticky lg:top-20" trailing={<span className="ins-legend normal-case">{PATH}</span>}>
      <div className="flex flex-wrap gap-1 px-4 pb-3" role="group" aria-label={`Detail level for ${PATH}`}>
        {(["full", "sig", "skel"] as Detail[]).map((d) => (
          <button
            key={d}
            type="button"
            className="ins-key ins-key-panel h-8"
            aria-pressed={current === d}
            onClick={() => ledger.setDetail(PATH, d)}
          >
            [{DETAIL_LABEL[d]}]
            <span className="tabular-nums text-muted-foreground">{formatTokens(file.tokens[d])}</span>
            {current === d && d !== "full" && (
              <span className="tabular-nums text-lamp">−{saving(d)}%</span>
            )}
          </button>
        ))}
      </div>
      <pre className="ins-glass mx-4 mb-3 overflow-x-auto px-4 py-3 text-[12.5px] leading-[21px] text-foreground">
        {PREVIEW[current].map((line, i) => (
          <div key={`${current}-${i}`} className="ins-line-enter" style={{ animationDelay: `${i * 18}ms` }}>
            {line || " "}
          </div>
        ))}
        <div className="mt-1 text-muted-foreground">{MORE[current]}</div>
      </pre>
      <div className="mx-4 mb-3 flex items-center gap-3 text-[12px]">
        <span className="relative h-[5px] flex-1 bg-edge" aria-hidden>
          <span
            className="absolute inset-y-0 left-0 bg-lamp transition-[width] duration-300"
            style={{ width: `${(file.tokens[current] / full) * 100}%` }}
          />
        </span>
        <span className="tabular-nums text-foreground">
          {formatTokens(file.tokens[current])} <span className="text-muted-foreground">/ {formatTokens(full)} tokens</span>
        </span>
      </div>
      <PaneNote>This file is in the demo prompt, so the meter at the top of the page moves with it.</PaneNote>
    </Pane>
  );
}
