# Lirah Marketing Copy

## Positioning

From the persona review (2026-11-08), revised 2026-11-10. Reader: `user-persona.md`.

> Lirah is a free, open-source desktop workspace around your CLI coding agent's real terminal. You choose what the agent reads, split the plan into tasks, and review every diff before it merges. Your CLI, login and config stay as they are.

Words: Lirah is a **workspace** (what it is). **Workflow** is what you do in it. Don't call Lirah a workflow.

What leads: control of the work (plan, delegate, review). Explicit, token-disciplined context is the first proof of that control, and the place we have measurements.

## Headline

- Headline: Put your coding agents to work. Keep control of the work.
- Subhead: A desktop workspace for CLI coding agents, from engineering plan to reviewed commits.

Kept in reserve:

- Independence: Orchestrate your agents. Keep your tools.

## Messaging territories

Each territory is a claim, the feature behind it, and the proof we can show. Don't publish a claim whose proof cell is a gap.

| Territory | Core message | Feature | Proof on hand |
|---|---|---|---|
| Control | You decide what agents see and what they do. | Context chips with EDIT/READ/COPY intent, detail levels (full, signatures, skeleton), context sets, context hook | Token counts per detail level in the app; evals (below) |
| Structure | Break ambitious work into tasks you can track. | Plans split into chunks, task backlog, auto-pilot | Gap: needs a recording of a plan run end to end |
| Oversight | Review the work before it lands. | Commit review dialog, auto merge that shows its git commands first and rolls back on conflict or failed checks, chunk review and roll back | Gap: needs a recording of a review and a rollback |
| Traceability | Know what was done, by which agent, and where it landed. | One commit per chunk with a `Plan-Chunk` trailer, `Decision:` lines carried forward, jobs in their own worktrees, overlap warnings | Gap: needs a real `git log` from a finished plan |
| Boundaries | Clear lines on what an agent can and cannot touch. | bubblewrap sandbox per tab (read-only root and sensitive dotfiles, private `/tmp`), optional network isolation, agent control asks first | The sandbox's mount list; Linux only, say so |
| Economics | Measure context and cost per project. | Token dashboard (projects, history, spend by model, CSV/JSON export), live estimate in the prompt pane | Evals (below). No other savings figure exists |
| Independence | Keep the tools and workflows you already trust. | The real CLI agent in a real PTY, your login and config, no account, no telemetry in the app, MIT | The repo |

## Evidence

- Evals: https://github.com/emdmed/agentic-orchestration-workflows/tree/main/evals. Cross-file questions with the hooks vs without, Sonnet on Claude Code 2.1.280, 8 tasks × 3 runs per condition on two repos (48 runs): cost 0.87×, tool calls 0.82×, 7 of 8 tasks cheaper, every answer correct. On Lirah's own repo: cost 0.76×, time 0.84×. Source of the numbers on the site: `components/evalResults.ts`. Quote them with the model, the task count and the link.
- One testimonial, from the creator, attributed to the creator.
- The "70-90% compression" and "50K lines in ~5K tokens" figures are the creator's claims, not measurements. Don't add new ones.
- No logos, user counts or third-party benchmarks.

## Honest limits

State these in copy; the reader trusts a tool that names them.

- Linux and Windows are fully supported. The sandbox is Linux only; Windows runs without it. macOS is coming very soon and the site does not offer its installer yet.
- Linux installers are x86_64 only; Windows has x64.
- Jobs and auto-pilot run auto-approving agents. The boundary is the worktree and the sandbox, and review happens before the merge.
- A finished chunk is a commit to review, not correct software.

## Why not their own setup

The competitor is tmux, git worktrees and shell scripts, which this reader already has. Don't argue against it. Show what the scripts don't give them: token counts per file and detail level before the prompt is sent, chunk-to-commit trailers, overlap warnings across jobs, a merge that shows its commands and rolls back.
