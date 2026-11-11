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

  // plan-lifecycle · the steps of a plan and what plan pchunxi left at each
  lifecycle: ({ K }) => {
    const steps: [string, string, string, string][] = [
      ['TASK', 'task list', 'not used here', 'todo'],
      ['PLAN FILE', '*_plan.md', 'imported', 'done'],
      ['CHUNKS', '5 chunks', 'split by agent', 'done'],
      ['COMMITS', '5 commits', 'one per chunk', 'done'],
      ['REVIEW', '0 notes', '0 roll backs', 'todo'],
      ['MERGE', 'main', '08:39', 'merge'],
    ];
    const x = (i: number) => 48 + i * 98;
    let g = K.fig(1, 'plan lifecycle · plan pchunxi · 2026-11-11');
    g += K.line(x(0), 62, x(5), 62, 'e1');
    steps.forEach(([name, l1, l2, node], i) => {
      g += K.t(x(i), 46, name, node === 'todo' ? 'mu' : 'fg', 'middle', 0.5) + K.node(x(i), 62, node);
      g += K.t(x(i), 84, l1, node === 'todo' ? 'mu' : 'fg', 'middle') + K.t(x(i), 98, l2, 'mu', 'middle');
    });
    g += K.node(4, 124, 'done') + K.t(14, 128, 'LEFT A RECORD', 'ky') + K.node(128, 124, 'todo') + K.t(138, 128, 'NOTHING RECORDED IN THIS RUN', 'ky');
    return { w: 584, h: 134, markup: g, label: 'A plan goes from task to plan file, chunks, commits, review and merge. Plan pchunxi was imported from a plan file, split into 5 chunks, produced 5 commits, got no review notes or roll backs, and merged to main at 08:39.' };
  },

  // the auto-pilot run, chunk by chunk, on one time ruler
  run: ({ K }) => {
    const R = 560, X = K.scale(L, R, 0, 190);
    const chunks: [number, number, string][] = [[0.6, 24.9, 'cd01483'], [26.8, 81.5, 'dcadd3a'], [83.4, 124.9, '18f8ae9'], [126.7, 163.3, 'bace1ed'], [165.1, 186.3, 'b408c59']];
    let g = K.fig(2, 'auto-pilot run · 5 chunks · 00:30:21 to 00:33:27');
    g += K.threshold(X(186.3), 32, 76, 'DONE · 186 s', 'end', 'ok');
    g += K.t(88, 72, 'CHUNKS', 'mu', 'end') + K.t(88, 94, 'COMMIT', 'mu', 'end');
    chunks.forEach(([a, b, sha]) => {
      g += K.dim(X(a), X(b), 50, Math.round(b - a) + ' s');
      g += K.line(X(a), 68, X(b), 68, 'fg', { w: 2 }) + K.node(X(a), 68, 'started', 7) + K.node(X(b), 68, 'done', 7);
      g += K.t((X(a) + X(b)) / 2, 94, sha, 'fg', 'middle');
    });
    g += K.ruler(L, R, 106, 190, 10, 3, (v: number) => (v ? v + ' s' : '0'));
    return { w: 576, h: 134, markup: g, label: 'Auto-pilot ran the five chunks back to back in 186 seconds: 24, 55, 42, 37 and 21 seconds, each ending in one commit, with about 2 seconds between chunks.' };
  },

  // which commits' Decision lines each chunk prompt carried
  carry: ({ K }) => {
    const wrote = [1, 3, 2, 1, 1], x = (j: number) => 150 + j * 58, y = (i: number) => 84 + i * 24;
    let g = K.fig(3, 'decision lines · written by a commit, read by later prompts');
    g += K.t(88, 40, 'COMMIT', 'mu', 'end') + K.t(88, 60, 'WROTE', 'mu', 'end');
    wrote.forEach((n, j) => { g += K.t(x(j), 40, 'CHUNK ' + (j + 1), 'fg', 'middle') + K.count(x(j) - K.countWidth(String(n)) / 2, 56, n); });
    let carried = 0;
    wrote.forEach((n, i) => {
      g += K.t(88, y(i) + 4, 'PROMPT ' + (i + 1), 'mu', 'end') + K.line(x(0), y(i), x(4), y(i), 'e1');
      wrote.forEach((_, j) => { g += K.node(x(j), y(i), j < i ? 'done' : j === i ? 'started' : 'todo'); });
      g += K.t(x(4) + 34, y(i) + 4, carried + (carried === 1 ? ' DECISION' : ' DECISIONS'), carried ? 'lv' : 'mu');
      carried += n;
    });
    g += K.node(4, y(4) + 30, 'done') + K.t(14, y(4) + 34, 'CARRIED IN', 'ky') + K.node(108, y(4) + 30, 'started') + K.t(118, y(4) + 34, 'THE CHUNK BEING BUILT', 'ky') + K.node(290, y(4) + 30, 'todo') + K.t(300, y(4) + 34, 'NOT WRITTEN YET', 'ky');
    return { w: 584, h: y(4) + 40, markup: g, label: 'The five commits wrote 1, 3, 2, 1 and 1 Decision lines. The prompts for chunks 1 to 5 carried 0, 1, 4, 6 and 7 of them, every decision from the chunks before.' };
  },

  // files the plan expected per chunk against files the work log recorded
  drift: ({ K }) => {
    // per chunk: files as planned, planned but untouched, changed but unplanned, note
    const rows: [number, number, number, string, string, string?][] = [
      [3, 0, 0, '3 OF 3 AS PLANNED', 'mu'],
      [2, 0, 0, '2 OF 2 AS PLANNED', 'mu'],
      [2, 0, 1, '+ usePlanRunActions.js', 'lv'],
      [3, 0, 0, '3 OF 3 AS PLANNED', 'mu'],
      [1, 2, 1, '+ README.md', 'lv', 'lirah_skill.md, docs/ not changed'],
    ];
    const y = (i: number) => 46 + i * 26;
    let g = K.fig(4, 'files per chunk · plan against work log');
    rows.forEach(([same, skipped, extra, note, ink, rest], i) => {
      g += K.t(88, y(i) + 4, 'CHUNK ' + (i + 1), 'mu', 'end');
      const states = [...Array(same).fill('done'), ...Array(skipped).fill('todo'), ...Array(extra).fill('live')];
      g += K.nodes(L + 6, y(i), 18, states, { line: false }) + K.t(L + 90, y(i) + 4, note, ink) + (rest ? K.t(L + 180, y(i) + 4, rest, 'mu') : '');
    });
    g += K.node(4, y(4) + 32, 'done') + K.t(14, y(4) + 36, 'PLANNED AND CHANGED', 'ky') + K.node(166, y(4) + 32, 'todo') + K.t(176, y(4) + 36, 'PLANNED, NOT CHANGED', 'ky') + K.node(338, y(4) + 32, 'live') + K.t(348, y(4) + 36, 'CHANGED, NOT PLANNED', 'ky');
    return { w: 584, h: y(4) + 42, markup: g, label: 'Chunks 1, 2 and 4 changed exactly the files the plan listed. Chunk 3 also changed usePlanRunActions.js. Chunk 5 changed CHANGELOG.md and README.md, and left lirah_skill.md and docs/ untouched.' };
  },
};
