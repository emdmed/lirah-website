import { Pane } from "./instrument/Pane";
import { SectionHead } from "./SectionHead";
import { REPO_URL } from "@/lib/releases";

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "Does Lirah replace or wrap my agent?",
    a: (
      <p>
        No. It starts the agent&apos;s own CLI in a real terminal, with your config, login and plan. Lirah never calls a
        model API itself.
      </p>
    ),
  },
  {
    q: "Which agents and platforms does it support?",
    a: (
      <p>
        Claude Code and opencode run in tabs; Codex, Gemini, Cursor and Amp run as background jobs. Linux first; macOS
        and Windows work without the sandbox.
      </p>
    ),
  },
  {
    q: "What do Lirah's hooks add to Claude Code?",
    a: (
      <p>
        A plugin, loaded with <span className="text-foreground">--plugin-dir</span> so your own hooks stay. It reports the
        agent&apos;s state, appends your picked context and points the agent at the index. Each hook can be switched off.
      </p>
    ),
  },
  {
    q: "Can my agent control Lirah?",
    a: (
      <p>
        Yes, through the <span className="text-foreground">lirah</span> command: tabs, settings, tasks, plans and jobs.
        Sensitive changes ask you first, and you can switch it off.
      </p>
    ),
  },
  {
    q: "What happens if I stop using Lirah?",
    a: <p>Nothing to migrate. The agents are the same CLIs, and every commit is ordinary local git.</p>,
  },
  {
    q: "Is it free?",
    a: (
      <p>
        Yes. MIT licensed, no account, source at{" "}
        <a href={REPO_URL} className="ins-link">
          github.com/emdmed/lirah
        </a>
        . You still pay for your agent plan.
      </p>
    ),
  },
  {
    q: "Does anything leave my machine?",
    a: (
      <p>
        Only an update check to GitHub&apos;s API, with none of your data. No telemetry, and Lirah never pushes or pulls.
        Your agents talk to their own providers, and features that use one send it what they need, like the staged diff
        for a commit message.
      </p>
    ),
  },
  {
    q: "Why not tmux and my editor?",
    a: (
      <p>
        Keep them; nvim and lazygit open in the second terminal. Lirah adds what a multiplexer can&apos;t see: what the
        agent reads, how full its context is, whether it&apos;s waiting on you, and jobs and plans.
      </p>
    ),
  },
];

export function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="scroll-mt-20 pt-28 sm:pt-36" id="faq">
      <SectionHead id="faq-title" label="faq" title="Questions before you install.">
        <p className="text-muted-foreground">
          Something not covered here?{" "}
          <a href={`${REPO_URL}/issues`} className="ins-link">
            Open an issue on GitHub
          </a>
          .
        </p>
      </SectionHead>

      <Pane title="faq" className="mt-12 max-w-[920px] pt-3">
        <div className="divide-y divide-edge">
          {FAQ.map((f) => (
            <details key={f.q} className="faq-item group">
              <summary className="flex items-baseline gap-3 px-4 py-3.5">
                <span className="faq-mark shrink-0 text-[13px] text-muted-foreground" aria-hidden="true" />
                <span className="faq-q text-[15px] text-foreground">{f.q}</span>
              </summary>
              <div className="max-w-[68ch] space-y-3 pb-5 pl-[52px] pr-4 text-[14px] leading-[1.7] text-muted-foreground">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </Pane>
    </section>
  );
}
