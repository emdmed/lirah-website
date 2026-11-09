---
target: blog post page (compaction-hook)
total_score: 23
max_score: 32
na_heuristics: 5,9
p0_count: 0
p1_count: 2
target_identity: "file:/home/enrique/projects/lirah/app/blog/[slug]/page.tsx"
target_fingerprint: "sha256:6f1170cca6950d9bfdaef5266186b073cc885dbb3982ffc431d607c521ffed2b"
target_path: /home/enrique/projects/lirah/app/blog/[slug]/page.tsx
timestamp: 2026-11-09T22-25-43Z
slug: app-blog-slug-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser)

Score 23/32 (Good, low end); heuristics 5 and 9 n/a (no input, no error states).
H1 2 no current-section state in outline · H2 4 · H3 3 phone has no outline · H4 2 four right edges · H6 3 · H7 3 no copy on code · H8 3 floating column · H10 3.

Specificity: authored (question headings, numbered answer strip, measured Calibrated figures, Sources with commit/CPU). Generic parts: unlabeled code boxes, boilerplate rail meta.
Detector: CLI 0 findings. Browser: 20x tiny-text (11px SVG figure labels), 4x line-length on figcaptions, 1x column-overflow (false positive: sticky rail vs long article).

P1 Four right edges at 1900: prose/answers/figure boxes 1376, figure drawings ~1300 (svg capped at natural 600px), pre + h2 rules 1554. Fix: one wide track for figures and code (.post > :not(pre, .cal-fig)), scale svg maxWidth to ~1.3x so labels reach ~14px.
P1 Phone figures cropped at ~8.8px labels; Fig.1 loses 300k-700k, Fig.2 hides the 6 s budget line; no scroll cue. Fix: fade mask now; phone-width drawings in figures.ts properly.
P2 Rail-to-text gap 110-130px plus 178px empty right: column floats. Fix: drop rail max-widths so rules meet the grid gap.
P2 Code 13px vs 17px body. Fix: 14px on desktop; label each block like a figure.
P2 Outline hidden on phone. Fix: collapsed <details>.
P3 No skip link; .answers dl unnamed; ~110px dead space pre -> h2; Fig.2 caption long italic quote; outline has no active state.
