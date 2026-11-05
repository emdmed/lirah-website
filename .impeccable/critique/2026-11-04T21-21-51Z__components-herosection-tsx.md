---
target: landing hero
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:/home/enrique/projects/lirah/components/HeroSection.tsx"
target_fingerprint: "sha256:7248bea4ce34d0b559f4cc4763cc0512a13053f9103b592bcd3e44ff82234bfa"
target_path: /home/enrique/projects/lirah/components/HeroSection.tsx
timestamp: 2026-11-04T21-21-51Z
slug: components-herosection-tsx
---
# Critique: landing hero (HeroSection / HeroHorizon / CodeSkyline)

Method: dual-agent. Score 22/32 (Acceptable; heuristics 7 and 10 n/a).

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of status | 3 | The chip↔skyline link is never explained |
| 2 | Match real world | 3 | "signatures / skeleton" undefined for a first-timer |
| 3 | User control | 3 | Scroll-driven, reduced motion respected |
| 4 | Consistency | 2 | Gold on ~10 things; meter overlaps [github] |
| 5 | Error prevention | 3 | curl\|bash has no "view script" link |
| 6 | Recognition | 3 | — |
| 7 | Flexibility | n/a | landing page |
| 8 | Aesthetic/minimal | 1 | ~40 elements, 8 type sizes, three layers stacked in one 180px band |
| 9 | Error recovery | 4 | copy fallback + aria-live |
| 10 | Help | n/a | hero |

Priority issues:
- P0 Meter readout overlaps [github] at ≥1440 (StatusBar.tsx:78). Fix: shrink-0 readout; drop [tokens]/[faq] from bar.
- P1 Copy, skyline and tilted replica top share one ~180px band (CodeSkyline.tsx:274, HeroHorizon.tsx:39); muted fine print over glyphs ~1.2:1. Fix: skyline gets its own band (~112px), remove the lift, ~40px clear between copy and skyline.
- P1 First viewport repeats "less context" five times, ~12 choices. Fix: cut the 24px restatement, one stat, short fine print, hide replica toolbar until folded.
- P2 Gold is on ~10 elements, so nothing reads as live. Fix: skeleton glyph alpha 0.85→0.45, neutral header download while hero CTA is visible.
- P2 Skeleton stubs float under status bar after fold (no horizon). Fix: fade canvas with the line or keep a faint rule.

Detector: CLI clean. Browser: hero fine-print line length 111ch, replica caption ~230ch; rest out of scope or false positives (sr-only thead, truncate, h-8 key).
