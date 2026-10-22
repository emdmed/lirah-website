import { Pane } from "./instrument/Pane";
import { Lamp } from "./instrument/Lamp";
import { KeyChord } from "./instrument/Keycap";
import { ContextMoon } from "./instrument/ContextMoon";
import { Meter, formatTokens } from "./instrument/Meter";
import { SectionHead } from "./SectionHead";

// Demo data throughout: a plausible week across the demo workspace's repos.
const CONTEXT_MAX = 200_000;
const CONTEXT_USED = 164_000;

const PHASES = [
  { ratio: 0.31, label: "31%", note: "ok" },
  { ratio: 0.84, label: "84%", note: "warn" },
  { ratio: 0.97, label: "97%", note: "fault" },
];

const DASH_TABS = ["overview", "projects", "history", "insights"];
const RANGES = ["day", "week", "month"];

const OVERVIEW = [
  { label: "tokens", value: "2.41M" },
  { label: "sessions", value: "63" },
  { label: "projects", value: "4" },
];

const BUDGETS: { project: string; used: number; limit: number }[] = [
  { project: "acme-api", used: 412_000, limit: 500_000 },
  { project: "acme-web", used: 118_000, limit: 400_000 },
  { project: "acme-db", used: 291_000, limit: 300_000 },
  { project: "infra", used: 22_000, limit: 150_000 },
];

export function TokensSection() {
  return (
    <section aria-labelledby="tokens-title" className="scroll-mt-20 pt-28 sm:pt-36" id="tokens">
      <SectionHead id="tokens-title" title="See how full the context is, and what the week has cost.">
        <p>
          The status bar reads the context window of the tab&apos;s own Claude session, subagents included, and draws it
          as a meter that turns warn at 80% and fault at 95%. Each tab row carries the same reading as a moon. Hover the
          meter for billable tokens and the cache hit rate.
        </p>
        <p className="text-muted-foreground">
          The token dashboard has overview, projects, history and insights views over a day, a week or a month, and
          exports to CSV or JSON. Give a project a daily or weekly budget and Lirah shows an alert at 80% and again at
          95%.
        </p>
      </SectionHead>

      <div className="mt-12 grid gap-x-10 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-start">
        <Pane title="status bar · context" className="pt-5" trailing={<span className="ins-legend">demo</span>}>
          <div className="space-y-5 px-4 pb-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <ContextMoon ratio={CONTEXT_USED / CONTEXT_MAX} size={22} />
              <Meter value={CONTEXT_USED} max={CONTEXT_MAX} label="Context window, acme-api" size="lg" />
            </div>
            <dl className="ins-well grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 p-3 text-[13px] tabular-nums">
              <dt className="text-muted-foreground">context</dt>
              <dd className="text-foreground">
                {formatTokens(CONTEXT_USED)} of {formatTokens(CONTEXT_MAX)}
              </dd>
              <dt className="text-muted-foreground">billable</dt>
              <dd className="text-foreground">38.6k</dd>
              <dt className="text-muted-foreground">cache hits</dt>
              <dd className="text-foreground">89%</dd>
            </dl>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-edge pt-3 text-[12px] text-muted-foreground">
              {PHASES.map((p) => (
                <li key={p.note} className="flex items-center gap-2 tabular-nums">
                  <ContextMoon ratio={p.ratio} size={14} />
                  {p.label} <span className="text-faint">{p.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </Pane>

        <Pane title="token dashboard" className="pt-5" trailing={<KeyChord keys={["^", "⇧", "D"]} size="sm" />}>
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-edge px-2 pb-2">
            <span className="flex flex-wrap">
              {DASH_TABS.map((t) => (
                <span key={t} className="ins-key ins-key-panel" data-static data-latched={t === "overview" || undefined}>
                  [{t}]
                </span>
              ))}
            </span>
            <span className="flex">
              {RANGES.map((r) => (
                <span key={r} className="ins-key ins-key-panel" data-static data-latched={r === "week" || undefined}>
                  {r}
                </span>
              ))}
            </span>
          </div>

          <dl className="grid grid-cols-3 gap-x-4 px-4 py-3 tabular-nums">
            {OVERVIEW.map((o) => (
              <div key={o.label}>
                <dt className="ins-legend">{o.label}</dt>
                <dd className="mt-1.5 text-[17px] text-strong">{o.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-edge px-2 py-2 text-[12px]">
            <span className="flex">
              <span className="ins-key ins-key-panel" data-static>[export csv]</span>
              <span className="ins-key ins-key-panel" data-static>[export json]</span>
            </span>
            <span className="ml-auto pr-2 text-faint">demo data</span>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-edge px-4 pb-1 pt-3">
            <span className="ins-legend">budgets · daily</span>
            <KeyChord keys={["^", "⇧", "B"]} size="sm" />
          </div>
          <table className="w-full border-collapse text-[13px]">
            <caption className="sr-only">Tokens used today against each project&apos;s daily budget, demo data</caption>
            <tbody>
              {BUDGETS.map((b) => (
                <tr key={b.project}>
                  <th scope="row" className="py-2 pl-4 pr-3 text-left font-normal text-foreground">
                    {b.project}
                  </th>
                  <td className="py-2 pr-4">
                    <Meter value={b.used} max={b.limit} label={`${b.project}, tokens today against its daily budget`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="space-y-1.5 border-t border-edge px-4 py-3 text-[13px]">
            <li className="flex items-center gap-3">
              <Lamp state="fault" label="over 95%" />
              <span className="text-foreground">acme-db has used 97% of its daily budget</span>
            </li>
            <li className="flex items-center gap-3">
              <Lamp state="warn" label="over 80%" />
              <span className="text-foreground">acme-api has used 82% of its daily budget</span>
            </li>
          </ul>
        </Pane>
      </div>
    </section>
  );
}
