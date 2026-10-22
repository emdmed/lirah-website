# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers who run CLI coding agents (Claude Code, opencode, and headless Codex, Gemini, Cursor, Amp) every day: terminal-native power users, plus developers newly exploring agents. On this site they are evaluating whether Lirah is worth installing, usually arriving from GitHub, a blog post, or a link shared by another developer. Personas: `user-persona.md`; marketing notes: `marketing.md`.

## Product Purpose

The website (lira.dev) explains Lirah and gets the visitor to install it. Lirah is a native desktop workspace for CLI coding agents: it keeps the terminal at the centre and builds around it what an agent session needs, namely file context, prompts, git, token budgets, background jobs and multi-step plans. Success means a visitor understands that within a few seconds, then downloads the installer for their OS. The blog (`/blog`) supports discovery.

## Positioning

Lirah does not wrap or replace the agent. It is the workspace around the real CLI agent running in a real PTY. Its edge is explicit, token-disciplined context (per-file EDIT/READ/COPY intent, signature or skeleton detail levels, Compact Project skeletons, context sets), together with agent-aware tabs, headless jobs and races, plan auto-pilot, and a bubblewrap sandbox. All of it is keyboard-driven.

## Operating Context

- Source of product truth: `/home/enrique/projects/nevo-terminal/PRODUCT.md` (feature list) and `/home/enrique/projects/nevo-terminal/DESIGN.md` (the app's visual system). Site copy must match the current app. Do not advertise features the app no longer has (Element Picker, orchestration workflows) or name ones it has renamed (file groups are now context sets).
- Built with Tauri 2, React 19 and xterm.js. Linux is the primary platform (sandbox is Linux-only); macOS and Windows builds exist without the sandbox.
- Free and open source: https://github.com/emdmed/lirah

## Capabilities and Constraints

- Downloads: GitHub releases ship installers for every platform (as of v0.4.2: `.AppImage`, `.deb`, `.rpm`, `.dmg` for x64 and aarch64, `.exe` setup, `.msi`). The primary action detects the visitor's OS and offers the latest release's installer; other formats and build-from-source are secondary.
- Next.js 16 app router, Tailwind 4. Blog at `app/blog` uses MDX and shares `app/globals.css`.
- Domain: https://lira.dev (metadataBase).

## Brand Commitments

- Name **Lirah**. Wordmark is set in Grenze Gotisch, and only the wordmark uses it.
- The mark is the Ithil lyre (crescent bowl, three strings, Eärendil's star), one flat colour. Source: `nevo-terminal/src/components/LirahMark.jsx`; app icon is ivory `#F4F1EA` on graphite `#3A3A3A`.
- Personality: technical, precise, quietly elvish. Small elvish details sit on top of a strict TUI and never replace it.
- The user directed that the website follow the app's Instrument TUI design system (nevo-terminal/DESIGN.md).

## Evidence on Hand

- One testimonial, from Lirah's creator: built Lirah with Lirah on a $20/month plan. It is attributed to the creator and must stay attributed that way.
- Compact Project figures used on the current site ("70-90% compression", "50K lines in ~5K tokens") are the creator's claims; keep them only as they stand and do not invent new benchmarks.
- No customer logos, user counts, star counts or third-party benchmarks exist. Do not fabricate them.
- Old screen recording `public/screenrecording-2026-02-07_16-11-20.mp4` shows the pre-Instrument UI and is superseded. The hero is a live HTML replica of the current UI with labeled demo data.

## Product Principles

1. Terminal-first: the agent's terminal is the centre and everything else serves it.
2. Explicit context beats implicit noise: the agent sees what you chose, at the detail you chose.
3. Keyboard-driven and dense: show more and scroll less.
4. Honest state: lamps, meters and keycaps show real state, quantities and keys, never decoration.
5. Free and open: no account, no lock-in, and the real CLI agent stays in charge.

## Accessibility & Inclusion

WCAG AA contrast at minimum (the app holds body text ≥ 7:1 and muted text ≥ 4.5:1). Respect reduced motion. Full keyboard navigation.
