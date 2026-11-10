# Lirah User Persona

All site copy, demos and promos are written for this reader.

## The senior engineer who adopted agents

> They want to delegate execution without delegating control.

- 10+ years writing software. Has shipped and maintained large systems, and lived with the consequences of their architecture.
- Runs Claude Code or opencode every day, and headless agents for side work.
- Still engineers: designs the feature, writes or reviews the plan, scopes what the agent reads, reviews every diff, tracks each piece of work to its commit.
- Will not vibecode. Treats agent output like a junior's pull request.
- Keyboard-first, lives in the terminal, skeptical of tools that hide what they do.
- An early adopter, not a holdout. Their skepticism comes from using agents, not from avoiding them.

## What they use today

tmux, git worktrees and their own shell scripts around the agent. It works, and they built it. Lirah competes with that setup, not with another product, so copy has to answer "why not my own scripts?".

## How they arrive

From GitHub, a blog post or a link another developer shared. They are evaluating, not browsing, and decide in the first screen whether to read on.

## What they ask first

- Is it a wrapper around the agent? No: the real CLI runs in a real PTY.
- Does it need an account, or phone home? No account, no telemetry in the app.
- What does it cost? Free, MIT.
- Does it run on my OS? Linux first; macOS and Windows without the sandbox.
- What can the agent touch? The sandbox's boundaries, stated plainly.

Answer these near the top, in that plain a form.

## What they want from Lirah

- Control over what the agent sees, and at what detail.
- Plans split into chunks and tasks they can track to commits.
- Parallel agents in their own worktrees, without losing track of who changed what.
- Jobs and merges they review before anything lands, and can roll back.
- Tokens and spend they can measure, per project and per model.
- Their own CLI, login and config, untouched.

## What earns their trust

- Real terminal recordings of complete workflows.
- Actual commands, config and diffs.
- Clear lines on what an agent can and cannot access.
- Before-and-after context and cost measurements.
- Honest limits and trade-offs.

## What makes them leave

- An opaque interface that hides what the agent does.
- Having to replace their agent, CLI or login.
- Changes that land without them seeing them first.
- Treating a finished task as correct software.
- Token savings without measurements, or vague productivity claims.
- Assuming they want to stop writing or reviewing code.

## How to write for them

| Do | Avoid |
|---|---|
| Show the workflow | Describe a revolution |
| Show the command | Say it is intuitive |
| Show the diff | Say it is intelligent |
| Show task-to-commit traceability | Say it is seamless |
| Measure context and cost | Promise arbitrary savings |
| Explain control boundaries | Say it is autonomous |

- Precise and measured. Show evidence (evals, numbers, commands), not adjectives.
- No hype: no "magic", "10x", "effortless", "just vibe".
- Never explain basics or talk down.
- Never frame them as people who need convincing to adopt AI.
- Don't sneer at vibecoding either; describe what Lirah lets them do instead.

## Demos

Show a whole sequence, never a feature alone: define the work, scope the context, write the plan, split it into tasks, run the agents, read the diffs, approve the merge, trace it to commits and cost.
