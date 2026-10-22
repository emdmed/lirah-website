import { Pane } from "./instrument/Pane";
import { Lamp } from "./instrument/Lamp";
import { SectionLabel } from "./SectionHead";

// Copy on the gutter, the plan's chunk list beside it, set like the sandbox.
export function PlansSection() {
  return (
    <section aria-labelledby="plans-title" className="scroll-mt-20 pt-28 sm:pt-36" id="plans">
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
        <div className="space-y-4 lg:pr-10">
          <SectionLabel>plans</SectionLabel>
          <h2 id="plans-title" className="text-[clamp(24px,2.4vw,30px)] leading-[1.18] tracking-[-0.01em]">
            Hand it a plan. Get one commit per chunk.
          </h2>
          <p className="max-w-[56ch] text-[15px] leading-[1.65]">
            Paste a plan or import a <span className="text-strong">*_plan.md</span> file and an agent splits it into
            chunks. Lirah implements each one in the tab&apos;s live agent and commits it.
          </p>
          <p className="max-w-[56ch] text-[15px] leading-[1.65] text-muted-foreground">
            Check, review, roll back, skip or reorder any chunk. With{" "}
            <span className="text-foreground">:autopilot</span> it runs the rest unattended and stops when the agent asks
            a question, needs permission or forgets to commit.
          </p>
        </div>

        <Pane title="workspace · plans" className="pt-5" trailing={<span className="ins-legend">auth-hardening</span>}>
          <div className="space-y-3 px-4 pb-4 text-[13px]">
            <p className="flex items-center gap-3 text-muted-foreground">
              <Lamp state="ok" label="implemented" />
              1–3 implemented <span className="text-faint">·</span> 3 commits
            </p>
            <div className="ins-well p-3">
              <p className="flex items-center gap-3">
                <Lamp state="on" blink label="implementing" />
                <span className="text-strong">4 · rotate refresh tokens on use</span>
              </p>
              <p className="mt-2 pl-[19px] text-[12px] text-muted-foreground">
                implementing in acme-api <span className="text-faint">·</span> commit trailer Plan-Chunk: 4
              </p>
            </div>
            <ul className="space-y-1.5 pl-[19px] text-faint">
              <li>5 · revoke sessions on password change</li>
              <li>6 · add api key scopes</li>
              <li>7 · audit log for auth events</li>
            </ul>
            <p className="flex items-center gap-3 border-t border-edge pt-3">
              <Lamp state="on" label="autopilot on" />
              <span className="text-foreground">:autopilot</span>
              <span className="text-muted-foreground">chains the remaining chunks</span>
            </p>
          </div>
        </Pane>
      </div>
    </section>
  );
}
