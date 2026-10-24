import { Pane } from "./instrument/Pane";
import { Lamp } from "./instrument/Lamp";
import { KeyChord } from "./instrument/Keycap";
import { Meter, formatTokens } from "./instrument/Meter";
import { FeatureSection, FeatureSplit } from "./FeatureLayout";

// Demo data throughout: a plausible week across the demo workspace's repos,
// ending in a heavy day that trips two budget alerts.

const DASH_TABS = ["overview", "projects", "history", "insights"];
const RANGES = ["day", "week", "month"];

const PROJECTS = ["acme-api", "acme-web", "acme-db", "infra"] as const;

// Each project gets a step of the foreground, so warn and fault stay the only colours.
const PROJECT_TONE = [
  "bg-foreground",
  "bg-foreground/60",
  "bg-foreground/35",
  "bg-foreground/18",
] as const;

// Tokens per day in thousands, one value per project in PROJECTS order. The last day is today.
const WEEK: { day: string; k: number[] }[] = [
  { day: "mon", k: [120, 75, 50, 15] },
  { day: "tue", k: [105, 70, 40, 15] },
  { day: "wed", k: [140, 85, 65, 20] },
  { day: "thu", k: [150, 80, 90, 20] },
  { day: "fri", k: [125, 75, 62, 18] },
  { day: "sat", k: [60, 40, 35, 12] },
  { day: "today", k: [412, 118, 291, 22] },
];

const WEEK_TOTAL = WEEK.reduce((sum, d) => sum + d.k.reduce((a, b) => a + b, 0), 0) * 1000;
const WEEK_MAX = Math.max(...WEEK.map((d) => d.k.reduce((a, b) => a + b, 0)));
const TODAY = WEEK[WEEK.length - 1].k;

const LIMITS = [500_000, 400_000, 300_000, 150_000];
const BUDGETS = PROJECTS.map((project, i) => ({ project, used: TODAY[i] * 1000, limit: LIMITS[i] }));

function formatTotal(n: number) {
  return n >= 1_000_000 ? `${+(n / 1_000_000).toFixed(2)}M` : formatTokens(n);
}

export function TokensSection() {
  return (
    <FeatureSection
      id="tokens"
      label="tokens"
      title="Then see where the week went."
      intro={
        <>
          <p>
            Give a project a daily or weekly budget. Lirah warns you at 80% and again at 95%, so a runaway session gets
            caught before it burns through the rest.
          </p>
          <p className="text-muted-foreground">
            Totals per day and per project over a day, a week or a month, with CSV and JSON export.
          </p>
        </>
      }
    >
      {/* The status-bar meter covers one session; this covers the week. */}
      <FeatureSplit>
        <Pane
          title="token dashboard"
          className="pt-5"
          trailing={
            <span className="flex items-center gap-3">
              <span className="text-[11px] text-faint">demo data</span>
              <KeyChord keys={["^", "⇧", "D"]} size="sm" />
            </span>
          }
        >
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

          <dl className="flex flex-wrap items-end gap-x-10 gap-y-3 px-4 pb-4 pt-4 tabular-nums">
            <div className="mr-auto">
              <dt className="ins-legend">tokens this week</dt>
              <dd className="mt-2 flex items-baseline gap-3">
                <span className="text-[clamp(26px,2.6vw,32px)] leading-none text-strong">{formatTotal(WEEK_TOTAL)}</span>
                <span className="text-[12px] text-muted-foreground">+18% vs last week</span>
              </dd>
            </div>
            <div>
              <dt className="ins-legend">sessions</dt>
              <dd className="mt-1.5 text-[17px] text-strong">63</dd>
            </div>
            <div>
              <dt className="ins-legend">projects</dt>
              <dd className="mt-1.5 text-[17px] text-strong">{PROJECTS.length}</dd>
            </div>
          </dl>

          {/* Where the week went: one stacked bar per day, a project per step of the foreground. */}
          <figure className="border-t border-edge px-4 pb-3 pt-4">
            <figcaption className="sr-only">
              Tokens per day this week by project, demo data. Today is the heaviest day at{" "}
              {formatTokens(TODAY.reduce((a, b) => a + b, 0) * 1000)}.
            </figcaption>
            <div className="grid h-[96px] grid-cols-7 items-end gap-2" aria-hidden="true">
              {WEEK.map((d) => {
                const total = d.k.reduce((a, b) => a + b, 0);
                return (
                  <div key={d.day} className="flex h-full flex-col justify-end gap-1">
                    <span className={`text-center text-[10px] tabular-nums ${d.day === "today" ? "text-strong" : "text-faint"}`}>
                      {formatTokens(total * 1000)}
                    </span>
                    <div className="flex flex-col-reverse gap-px" style={{ height: `${(total / WEEK_MAX) * 72}px` }}>
                      {d.k.map((v, i) => (
                        <span key={PROJECTS[i]} className={PROJECT_TONE[i]} style={{ flexGrow: v }} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-1.5 grid grid-cols-7 gap-2 text-center text-[11px]" aria-hidden="true">
              {WEEK.map((d) => (
                <span key={d.day} className={d.day === "today" ? "text-foreground" : "text-faint"}>
                  {d.day}
                </span>
              ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground" aria-hidden="true">
              {PROJECTS.map((p, i) => (
                <li key={p} className="flex items-center gap-1.5">
                  <span className={`size-2 ${PROJECT_TONE[i]}`} />
                  {p}
                </li>
              ))}
            </ul>
          </figure>

        </Pane>

        <Pane title="budgets · daily" className="pt-5">
          <table className="w-full border-collapse text-[13px]">
            <caption className="sr-only">Tokens used today against each project&apos;s daily budget, demo data</caption>
            <tbody>
              {BUDGETS.map((b) => {
                const pct = Math.round((b.used / b.limit) * 100);
                return (
                  <tr key={b.project}>
                    <th scope="row" className="w-[1%] whitespace-nowrap py-2 pl-4 pr-6 text-left font-normal text-foreground">
                      {b.project}
                    </th>
                    <td className="py-2 pr-3">
                      <Meter
                        value={b.used}
                        max={b.limit}
                        label={`${b.project}, tokens today against its daily budget`}
                        className="flex w-full [&_.ins-meter-readout]:min-w-[9ch] [&_.ins-meter-readout]:text-right [&_.ins-meter-scale]:w-auto [&_.ins-meter-scale]:flex-1"
                      />
                    </td>
                    <td
                      className={`w-[1%] py-2 pr-4 text-right tabular-nums ${
                        pct >= 95 ? "text-fault" : pct >= 80 ? "text-warn" : "text-muted-foreground"
                      }`}
                    >
                      {pct}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ul className="space-y-1.5 border-t border-edge px-4 py-3 text-[13px] tabular-nums">
            <li className="flex items-center gap-3">
              <Lamp state="fault" label="over 95%" />
              <span className="text-foreground">acme-db</span>
              <span className="text-muted-foreground">97% of daily budget</span>
              <span className="ml-auto text-faint">14:02</span>
            </li>
            <li className="flex items-center gap-3">
              <Lamp state="warn" label="over 80%" />
              <span className="text-foreground">acme-api</span>
              <span className="text-muted-foreground">82% of daily budget</span>
              <span className="ml-auto text-faint">11:47</span>
            </li>
          </ul>
        </Pane>
      </FeatureSplit>
    </FeatureSection>
  );
}
