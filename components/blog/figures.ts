// Calibrated figures for the blog, drawn with the kit in public/calibrated-figures.js.
// Each returns the svg's natural size, its markup and the sentence it replaces (the aria-label).
/* eslint-disable @typescript-eslint/no-explicit-any */
type Fig = { w: number; h: number; markup: string; label: string };
type Kit = { K: any };

const L = 96; // left edge of every scale; row names end at 88

export const figures: Record<string, (c: Kit) => Fig> = {
  // project-compaction-hook · what a context window can hold
  tokens: ({ K }) => {
    const R = 584, X = K.scale(L, R, 0, 700_000);
    const IR = L + 104.6, IX = K.scale(L, IR, 0, 1000); // 0–1k tokens at 150:1
    const W = X(200_000);
    let g = K.fig(1, 'context cost · lirah app code · f6a2daf');
    g += K.threshold(W, 32, 136, 'CONTEXT WINDOW · 200k', 'start');
    g += K.dim(L, R, 58, '≈ 700k tokens · 2.80 MB') + K.t(88, 78, 'SOURCE', 'mu', 'end');
    g += K.line(L, 74, W, 74, 'fg', { w: 2 }) + K.hatchRect(W, 70, R - W, 8, 'fa', 'ed', 4);
    g += K.t((W + R) / 2, 94, 'HATCHED = PAST THE WINDOW', 'ky', 'middle');
    g += K.dim(L, X(122_000), 100, '≈ 122k · 0.49 MB') + K.t(88, 116, 'INDEX', 'mu', 'end');
    g += K.line(L, 112, X(122_000), 112, 'fg', { w: 2 }) + K.node(X(122_000), 112, 'done');
    g += K.ruler(L, R, 136, 700_000, 20_000, 5, (v: number) => (v ? v / 1000 + 'k' : '0'));
    g += K.inset(L, X(1000), 136, L, IR, 180, null);
    g += K.t(88, 192, 'GREP', 'mu', 'end') + K.line(L, 188, IX(350), 188, 'lv', { w: 2 }) + K.node(IX(350), 188, 'live');
    g += K.leader([[IX(350) + 8, 188], [258, 188]], false) + K.box(258, 172, null, 'ONE INDEX GREP', '≈ 350 tokens · 12 lines', 'lv', 'lv');
    g += K.ruler(L, IR, 200, 1000, 100, 5, (v: number) => (v === 1000 ? '1k' : String(v)));
    g += K.t(L, 234, 'DETAIL A  150:1', 'mu');
    return { w: 600, h: 242, markup: g, label: "Lirah's app source is about 700k tokens and its index about 122k, against a 200k context window. One index grep returns about 350 tokens." };
  },

  // how long a build takes against the prompt hook's 6 s budget
  rebuild: ({ K }) => {
    const R = 560, X = K.scale(L, R, 0, 6000);
    let g = K.fig(2, 'index build · ryzen 5 5500u · whole repo');
    g += K.threshold(R, 32, 126, 'HOOK BUDGET · 6 s', 'end');
    g += K.dim(L, X(939), 50, '939 ms') + K.t(88, 68, 'COLD', 'mu', 'end');
    g += K.line(L, 64, X(939), 64, 'fg', { w: 2 }) + K.node(X(939), 64, 'done') + K.t(X(939) + 12, 68, 'SESSIONSTART · NO CACHE', 'mu');
    g += K.dim(L, X(140), 96, '140 ms') + K.t(88, 108, 'WARM', 'mu', 'end');
    g += K.line(L, 104, X(140), 104, 'lv', { w: 2 }) + K.node(X(140), 104, 'live') + K.t(X(140) + 12, 108, 'EACH PROMPT · 1 FILE EDITED', 'mu');
    g += K.ruler(L, R, 126, 6000, 200, 5, (v: number) => (v ? v / 1000 + ' s' : '0'));
    return { w: 576, h: 154, markup: g, label: 'A cold build of the whole repo took 939 ms and a rebuild after one edit took 140 ms, against the prompt hook budget of 6 seconds.' };
  },

  // what one index hit tells the agent to read
  range: ({ K }) => {
    const R = 560, X = K.scale(L, R, 0, 32);
    let g = K.fig(3, 'one hit · contextmoon.jsx · 32 lines');
    g += K.t(88, 66, 'FILE', 'mu', 'end') + K.line(L, 62, R, 62, 'e1');
    g += K.dim(X(9), X(32), 44, 'READ L9–32 · 24 LINES');
    g += K.line(X(9), 62, X(32), 62, 'lv', { w: 2 }) + K.node(X(9), 62, 'started', 7) + K.node(X(32), 62, 'done', 7);
    g += K.node(X(4), 62, 'done', 7) + K.t(X(4), 82, 'const R · L4', 'mu', 'middle');
    g += K.t(X(20.5), 82, 'ContextMoon({ ratio, warnAt, size })', 'fg', 'middle');
    g += K.ruler(L, R, 100, 32, 1, 8, (v: number) => (v ? 'L' + v : '0'));
    return { w: 576, h: 128, markup: g, label: 'The index hit points the agent at lines 9 to 32 of the 32-line ContextMoon.jsx, the component itself, and at line 4 for the constant R.' };
  },

  // the guard's verdicts for one prompt, in call order
  guard: ({ K }) => {
    const calls: [string, string, string, string][] = [
      ['Read src/components/instrument/ContextMoon.jsx', 'DENY · not searched yet', 'ft', 'fault'],
      ['cat .orchestration/tools/compacted_nt_….md', 'DENY · grep-only', 'ft', 'fault'],
      ["grep -i -E 'data|handler' compacted_nt_….md", 'DENY · too generic', 'ft', 'fault'],
      ["grep -i -E 'ContextMoon|gaugeLevel' compacted_nt_….md", 'ALLOW · 12 of ≤60 lines', 'ok', 'done'],
      ['Read ContextMoon.jsx · L9–32', 'OPEN · rest of prompt', 'lv', 'live'],
    ];
    let g = K.fig(4, 'guard · one prompt · in call order');
    const y = (i: number) => 46 + i * 28;
    g += K.centre(8, 34, 8, y(4) + 8);
    calls.forEach(([call, verdict, ink, node], i) => {
      g += K.node(8, y(i), node) + K.count(22, y(i), i + 1) + K.t(42, y(i) + 4, call, 'fg') + K.t(420, y(i) + 4, verdict, ink);
    });
    return { w: 584, h: y(4) + 16, markup: g, label: 'The guard denies a source read before any search, a whole read of the index and a vague grep, allows a specific grep capped at 60 lines, and then opens source reads for the rest of the prompt.' };
  },
};
