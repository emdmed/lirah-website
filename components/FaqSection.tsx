import { Pane } from "./instrument/Pane";
import { SectionHead } from "./SectionHead";
import { REPO_URL } from "@/lib/releases";

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "Does Lirah replace or wrap my agent?",
    a: (
      <p>
        No. Lirah starts the agent&apos;s own CLI in a real login-shell PTY, the same program you would run in any
        terminal, with your config, your login and your plan. Lirah doesn&apos;t call a model API itself. Its git and job
        features also work by starting those CLIs.
      </p>
    ),
  },
  {
    q: "Which agents and platforms does it support?",
    a: (
      <>
        <p>
          Claude Code and opencode run interactively in a tab, with hook plugins that report their state. Codex, Gemini,
          Cursor and Amp run as headless background jobs, alongside Claude Code and opencode.
        </p>
        <p>
          Linux is the primary platform. macOS and Windows builds exist and work without the sandbox, which is
          Linux-only.
        </p>
      </>
    ),
  },
  {
    q: "What do Lirah's hooks add to Claude Code?",
    a: (
      <p>
        Lirah loads a plugin into each Claude Code it starts with <span className="text-foreground">--plugin-dir</span>,
        so your own hooks and settings stay as they are. Its hooks report the agent&apos;s state to the tab, append the
        context you picked to prompts typed in the terminal, and, in tabs where you switch it on, point the agent at a
        fresh project index. The index lives in <span className="text-foreground">.orchestration/</span> and is kept out
        of git. Each hook can be turned off in settings.
      </p>
    ),
  },
  {
    q: "What happens if I stop using Lirah?",
    a: (
      <p>
        Nothing to migrate. The agents are the same CLIs you would run in any terminal, with their own config, and the
        commits and merges Lirah makes are ordinary local git. Your repos look the same with or without it.
      </p>
    ),
  },
  {
    q: "Is it free?",
    a: (
      <p>
        Yes. Lirah is open source under the MIT license, with no account. The source is at{" "}
        <a href={REPO_URL} className="ins-link">
          github.com/emdmed/lirah
        </a>
        . You still pay for whatever agent plan you use.
      </p>
    ),
  },
  {
    q: "Does anything leave my machine?",
    a: (
      <>
        <p>
          Lirah itself makes one request: at launch and every four hours it asks GitHub&apos;s API for the latest
          release, to tell you about updates. It sends no data of yours with it. There is no telemetry. Lirah runs only
          local git commands and never pushes, pulls or fetches.
        </p>
        <p>
          Token figures are read from Claude Code&apos;s session files on disk, and budgets are stored locally. The agents
          you run talk to their own providers, and features that use an agent send through it what they need: auto
          commit hands it your staged diff. If Claude Code isn&apos;t installed, launching it falls back to npx, which
          downloads it from npm.
        </p>
      </>
    ),
  },
  {
    q: "Why not tmux and my editor?",
    a: (
      <p>
        Keep them. The agent runs in a real login-shell PTY, and the second terminal opens nvim and lazygit beside it.
        What Lirah adds is what a multiplexer can&apos;t see: which files the agent is given and at what detail, how full
        each tab&apos;s context is and whether its agent is waiting on you, background jobs in their own worktrees, and
        plans that commit chunk by chunk.
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
