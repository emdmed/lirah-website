/*
 * The shared clock, editing grammar and parts for Lirah films.
 *
 * A film is Film.mount({ duration, scenes, captions, render }). render(t) must be a pure function
 * of seconds — render.mjs steps it frame by frame — and mount() handles everything around it:
 * cuts and glyph wipes between scenes, typed captions, the moon clock, the runhead legend,
 * ?render=1 for the renderer, and the preview's fit, play, scrub and ?t= parking.
 *
 * The grammar (see the lirah-video skill, "Film language"): inside a chapter, hard cuts; between
 * chapters, a 1.4 s glyph wipe, Ithil's terminator drawn in the ramp the site's IthilMoon uses. Things
 * warm up and cool down like the app's filament lamps; nothing slides. The film is one waxing
 * moon, new on the title card, full on the end card.
 */
(function () {
  'use strict';
  function P(t, a, b) { return t <= a ? 0 : t >= b ? 1 : (t - a) / (b - a); }
  function out3(x) { return 1 - Math.pow(1 - x, 3); }
  function inOut(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function expo(x) { return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x); }
  function $(id) { return document.getElementById(id); }
  /* A stable pseudo-random in [0, 1) per integer, so "noise" is the same on every render. */
  function hash(i) { var x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }

  /* ---------- motion: filaments, not slides ---------- */

  // Warm: light up fast with a brief over-bright flare, the app's lamp warm-up drawn large.
  function warm(el, p) {
    el.style.opacity = out3(p).toFixed(3);
    el.style.filter = p > 0 && p < 1 ? 'brightness(' + (1 + 1.1 * (1 - p)).toFixed(3) + ')' : 'none';
  }
  // Cool: fade slowly and evenly, the way a filament dims.
  function cool(el, p) { el.style.opacity = (1 - p).toFixed(3); el.style.filter = 'none'; }
  // Legacy helpers, kept for older cuts. New films use warm/cool.
  function rise(el, p) { warm(el, p); }
  function fade(el, p) { warm(el, p); }

  /* ---------- Ithil in glyphs ---------- */

  var RAMP = ' ..::-=++*';
  // Port of the site's components/IthilMoon.tsx: the moon as a dithered disc of ramp glyphs.
  // phase 0 = new, 0.25 = first quarter, 0.5 = full. cells = glyphs across the diameter.
  function glyphMoon(canvas, phase, o) {
    o = o || {};
    var size = canvas.width = canvas.height = o.size || 640, cells = o.cells || 46;
    var ctx = canvas.getContext('2d'), ink = o.ink || '#f1ebda', k = o.alpha == null ? 0.55 : o.alpha;
    var cw = size / cells, ch = cw * 1.45, R = size * 0.46, c = size / 2;
    ctx.clearRect(0, 0, size, size);
    ctx.font = (cw * 1.33).toFixed(1) + 'px "Typestar OCR", monospace';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = ink;
    var th = phase * 2 * Math.PI, lx = Math.sin(th), lz = -Math.cos(th);
    var s = 4242, rnd = function () { return (s = (s * 16807) % 2147483647) / 2147483647; };
    var maria = [], craters = [], i;
    for (i = 0; i < 9; i++) maria.push({ x: rnd() * 1.3 - 0.65, y: rnd() * 1.3 - 0.65, r: 0.12 + rnd() * 0.22, d: 0.25 + rnd() * 0.3 });
    for (i = 0; i < 40; i++) craters.push({ x: rnd() * 1.8 - 0.9, y: rnd() * 1.8 - 0.9, r: 0.02 + rnd() * 0.06 });
    for (var y = c - R; y <= c + R; y += ch) {
      for (var x = c - R; x <= c + R; x += cw) {
        var nx = (x - c) / R, ny = (y - c) / R, d2 = nx * nx + ny * ny;
        if (d2 > 1) continue;
        var nz = Math.sqrt(1 - d2), albedo = 1;
        maria.forEach(function (m) { var q = Math.hypot(nx - m.x, ny - m.y); if (q < m.r) albedo -= m.d * (1 - q / m.r); });
        craters.forEach(function (m) { var q = Math.hypot(nx - m.x, ny - m.y); if (q < m.r) albedo += q > m.r * 0.7 ? 0.25 : -0.2; });
        albedo = Math.min(1.2, Math.max(0.35, albedo));
        var lit = Math.pow(Math.max(0, nx * lx + nz * lz), 0.8) * albedo;
        if (lit > 0.03) { ctx.globalAlpha = Math.min(1, (0.08 + lit * 0.6) * k / 0.55); ctx.fillText(RAMP[Math.min(9, Math.max(1, Math.round(lit * 9)))], x, y); }
        else { ctx.globalAlpha = 0.06 * k / 0.55; ctx.fillText(d2 > 0.86 || albedo >= 0.8 ? '.' : ':', x, y); }
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- instrument parts ---------- */

  // The Ithil lyre, from the site's components/instrument/LirahMark.tsx (100-unit grid).
  // lit = the session lamp: Eärendil's star takes the lamp colour.
  function mark(lit) {
    return '<svg class="mark" viewBox="2 1.5 96 96" role="img" aria-label="Lirah">' +
      '<path fill="currentColor" d="M22 8C24 34 12 48 14 64C16 84 32 94 50 94C68 94 84 84 86 64C88 48 76 34 78 8C77 34 70 48 70 60C70 74 62 80 50 80C38 80 30 74 30 60C30 48 23 34 22 8Z"/>' +
      '<path ' + (lit ? 'class="lit-star"' : 'fill="currentColor"') + ' d="M50 5Q51.28 15.08 58 17Q51.28 18.92 50 29Q48.72 18.92 42 17Q48.72 15.08 50 5Z"/>' +
      '<path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" d="M23.5 32Q50 41 76.5 32"/>' +
      '<path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" d="M40 35.6L40 78M50 37L50 80M60 35.6L60 78"/></svg>';
  }

  // A pane with its legend set into the top border: [index] TITLE. Body goes in #<id>-body.
  function pane(o) {
    return '<div class="pane' + (o.screen ? ' pane-screen' : '') + '" id="' + o.id + '" style="left:' + o.x + 'px;top:' + o.y + 'px;width:' + o.w + 'px;height:' + o.h + 'px"' + (o.focus ? ' data-focus' : '') + '>' +
      '<span class="legend">' + (o.index ? '<b>[' + o.index + ']</b>' : '') + o.title + (o.lamp ? ' <span class="lamp" id="' + o.id + '-lamp"></span>' : '') + '</span>' +
      '<div class="pane-body" id="' + o.id + '-body"></div></div>';
  }
  function focus(el, on) { if (on) el.setAttribute('data-focus', ''); else el.removeAttribute('data-focus'); }
  function lamp(el, state) { el.setAttribute('data-state', state || 'off'); }

  // Keycaps; keys like ['Ctrl', 'K']. Check every chord against nevo-terminal/src/lib/shortcuts.js.
  function chord(keys, id) {
    return '<span class="chord"' + (id ? ' id="' + id + '"' : '') + '>' + keys.map(function (k) { return '<kbd class="cap">' + k + '</kbd>'; }).join('') + '</span>';
  }
  function press(el, down) { [].forEach.call(el.querySelectorAll('.cap'), function (c) { if (down) c.setAttribute('data-down', ''); else c.removeAttribute('data-down'); }); }

  // Context-window fill as a moon phase, waxing from new to full; warn at warnAt, fault at 95%.
  // plain = always the ink colour (the film clock is not a context reading). Draws into <svg viewBox="0 0 14 14">.
  function moon(svg, ratio, warnAt, plain) {
    var r = Math.min(1, Math.max(0, ratio)), R = 6, rx = Math.abs(R * (1 - 2 * r));
    var c = plain ? 'var(--foreground)' : r >= 0.95 ? 'var(--fault)' : r >= (warnAt || 0.8) ? 'var(--warn)' : 'var(--foreground)';
    svg.innerHTML = '<circle cx="7" cy="7" r="6" fill="var(--lamp-off)"/>' +
      (r > 0.01 ? '<path fill="' + c + '" d="M7 1 A6 6 0 0 1 7 13 A' + rx.toFixed(3) + ' 6 0 0 ' + (r < 0.5 ? 0 : 1) + ' 7 1Z"/>' : '');
  }

  // Typed text: how much of `text` shows at t, typing from `at` at `cps` characters a second.
  // Returns true once it's all there. The caret blinks off t, so frames stay deterministic.
  function type(el, text, t, at, cps, caret) {
    var n = Math.max(0, Math.min(text.length, Math.floor((t - at) * (cps || 28))));
    var on = caret && (n < text.length || Math.floor(t * 2) % 2 === 0);
    el.innerHTML = esc(text.slice(0, n)) + (on && t >= at ? '<i class="caret"></i>' : '');
    return n >= text.length;
  }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  // Terminal output revealed line by line from `at`, one line every `gap` seconds.
  function lines(el, rows, t, at, gap) {
    var n = Math.max(0, Math.min(rows.length, Math.floor((t - at) / (gap || 0.12)) + 1));
    el.innerHTML = t < at ? '' : rows.slice(0, n).join('\n');
  }

  /* ---------- cards ---------- */

  // Frame 0 is the thumbnail: the title card is fully drawn at t = 0, over a new crescent.
  function titleCard(el, line, phase) {
    el.innerHTML = '<canvas class="card-moon"></canvas><div class="titlecard"><div class="lockup">' + mark(true) + '<span class="wordmark">Lirah</span></div>' +
      '<p class="titlecard__d">' + line + '</p></div>';
    glyphMoon(el.querySelector('canvas'), phase == null ? 0.1 : phase, { alpha: 0.7 });
  }
  // A chapter card: the moon at this point of the film, the numeral, a title in the old register.
  function chapterCard(el, numeral, title, phase) {
    el.innerHTML = '<canvas class="card-moon"></canvas><div class="chapter"><p class="chapter__n" id="' + el.id + '-n">Chapter ' + numeral + '</p>' +
      '<h2 class="chapter__t" id="' + el.id + '-t">' + title + '</h2></div>';
    var cv = el.querySelector('canvas');
    glyphMoon(cv, phase, { alpha: 0.85 });
    // Slow on purpose: the moon rises, then the numeral, then the title, which holds ~1.3 s on a 2.8 s card.
    return function (t, at) {
      warm(cv, P(t, at, at + 1.2));
      warm($(el.id + '-n'), P(t, at + 0.35, at + 0.95));
      warm($(el.id + '-t'), P(t, at + 0.75, at + 1.5));
    };
  }
  // Every cut closes on this, over the full moon. Facts from nevo-terminal PRODUCT.md and LICENSE (MIT).
  function endCard(el) {
    el.innerHTML = '<canvas class="card-moon" id="end-moon"></canvas><div class="endcard"><div class="lockup" id="end-l">' + mark(true) + '<span class="wordmark">Lirah</span></div>' +
      '<p class="endcard__d" id="end-d">A desktop workspace for CLI coding agents.</p>' +
      '<p class="endcard__m" id="end-m">Free · MIT · Linux, macOS, Windows · lira.dev</p></div>';
    glyphMoon($('end-moon'), 0.5, { alpha: 0.16 });
    return function (t, at) {
      warm($('end-moon'), P(t, at, at + 1.4));
      warm($('end-l'), P(t, at + 0.5, at + 1.2));
      warm($('end-d'), P(t, at + 1.3, at + 1.9));
      warm($('end-m'), P(t, at + 2.0, at + 2.6));
    };
  }

  /* ---------- the glyph wipe ---------- */

  // Ithil's terminator crossing the frame in ramp glyphs: the edge glitters, the field behind it is
  // dark ground for one instant (the cut happens there), then the terminator passes on.
  var WIPE = 1.4;
  function drawWipe(ctx, W, H, p) {
    ctx.clearRect(0, 0, W, H);
    if (p <= 0 || p >= 1) return;
    var cw = 24, ch = 34, cols = Math.ceil(W / cw), rows = Math.ceil(H / ch);
    var ground = getComputedStyle(document.documentElement).getPropertyValue('--wipe-ground').trim() || '#12181b';
    ctx.font = '30px "Typestar OCR", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (var r = 0; r < rows; r++) {
      var yn = r / (rows - 1), bow = 0.16 * (1 - Math.pow(2 * yn - 1, 2));   // the terminator is curved, like the moon's
      for (var c = 0; c < cols; c++) {
        // Each cell's turn comes as the curved edge reaches it; the edge itself is ~6 cells wide.
        var d = 0.86 * Math.min(1, Math.max(0, (c / (cols - 1)) * 0.8 + bow + 0.05 * hash(r * 131 + c)));
        var cov = p < 0.5 ? P(2 * p, d, d + 0.14) : 1 - P(2 * p - 1, d, d + 0.14);
        if (cov <= 0) continue;
        ctx.globalAlpha = cov; ctx.fillStyle = ground; ctx.fillRect(c * cw, r * ch, cw, ch);
        var g = Math.sin(Math.PI * cov);                                   // glyphs live on the edge only
        if (g > 0.08) {
          ctx.globalAlpha = 0.75 * g; ctx.fillStyle = '#f1ebda';
          ctx.fillText(RAMP[Math.max(1, Math.min(9, Math.round(g * 9 * (0.6 + 0.4 * hash(c * 17 + r)))))], c * cw + cw / 2, r * ch + ch / 2);
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- the clock ---------- */

  function mount(film) {
    var D = film.duration, scenes = film.scenes, caps = film.captions;
    var size = window.__size || [1080, 1350], stage = $('stage');
    document.documentElement.style.setProperty('--w', size[0] + 'px'); document.documentElement.style.setProperty('--h', size[1] + 'px');
    var sceneEls = scenes.map(function (s) { return $(s.id); });
    var capEl = $('caption'), tagEl = $('tag'), barEl = $('bar'), clockEl = $('clock');
    var veil = document.createElement('canvas');
    veil.className = 'veil'; veil.width = size[0]; veil.height = size[1];
    stage.insertBefore(veil, capEl);
    var vctx = veil.getContext('2d');
    var lastCap = -2, lastTag = null;

    function render(t) {
      t = Math.max(0, Math.min(D, t));
      // Scenes cut hard at their start. A scene marked { in: 'glyph' } is reached through a glyph
      // wipe centred on its start; the cut itself happens under the dark middle of the wipe.
      var wipe = 0;
      scenes.forEach(function (s, i) {
        var on = t >= s.s && (i === scenes.length - 1 || t < scenes[i + 1].s);
        sceneEls[i].style.visibility = on ? 'visible' : 'hidden';
        sceneEls[i].style.opacity = on ? 1 : 0;
        if (s.in === 'glyph' && t > s.s - WIPE / 2 && t < s.s + WIPE / 2) wipe = P(t, s.s - WIPE / 2, s.s + WIPE / 2);
      });
      drawWipe(vctx, size[0], size[1], wipe);

      var tag = '';
      (film.tags || []).forEach(function (g) { if (t >= g[0] && t < g[1]) tag = g[2]; });
      if (tag !== lastTag) { tagEl.textContent = tag; lastTag = tag; }

      // Captions are typed like a terminal line at 36 cps after the lamp-coloured cursor, then cool out.
      var ci = -1;
      for (var c = 0; c < caps.length; c++) if (t >= caps[c][0] && t < caps[c][1]) ci = c;
      if (ci > -1) {
        var cap = caps[ci], typed = type(capEl, cap[2], t, cap[0], cap[0] === 0 ? 1e9 : 36, false);
        if (!typed) capEl.insertAdjacentHTML('beforeend', '<i class="caret"></i>');
        capEl.style.opacity = (1 - P(t, cap[1] - 0.6, cap[1])).toFixed(3);
        capEl.style.visibility = 'visible';
      } else if (lastCap !== -1) { capEl.innerHTML = ''; capEl.style.visibility = 'hidden'; }
      lastCap = ci;

      if (barEl) barEl.style.width = (t / D * 100).toFixed(3) + '%';
      if (clockEl) moon(clockEl, t / D, 1, true);   // the film is one waxing moon
      film.render(t);
    }
    window.__render = render;
    window.__duration = D;

    var params = new URLSearchParams(location.search);
    if (params.has('render')) { document.body.classList.add('render'); render(+params.get('t') || 0); return; }

    var ctl = document.createElement('div');
    ctl.className = 'controls';
    ctl.innerHTML = '<button type="button">Pause</button><input type="range" min="0" max="' + D + '" step="0.01" value="0" aria-label="Seek"><output>0.00</output>';
    document.body.appendChild(ctl);
    var btn = ctl.querySelector('button'), scrub = ctl.querySelector('input'), tc = ctl.querySelector('output');
    function fit() { stage.style.transform = 'scale(' + Math.max(0.1, Math.min((innerWidth - 32) / size[0], (innerHeight - 80) / size[1])) + ')'; }
    addEventListener('resize', fit); fit();
    var playing = !params.has('t'), base = +params.get('t') || 0, t0 = performance.now(), now = base;
    function set(t) { now = t; render(t); scrub.value = t; tc.textContent = t.toFixed(2); }
    function toggle() { playing = !playing; btn.textContent = playing ? 'Pause' : 'Play'; base = now; t0 = performance.now(); }
    function loop(ts) {
      if (playing) { var t = base + (ts - t0) / 1000; if (t > D + 1.5) { base = 0; t0 = ts; t = 0; } set(Math.min(t, D)); }
      requestAnimationFrame(loop);
    }
    btn.textContent = playing ? 'Pause' : 'Play';
    btn.addEventListener('click', toggle);
    addEventListener('keydown', function (e) { if (e.code === 'Space') { e.preventDefault(); toggle(); } });
    scrub.addEventListener('input', function () { playing = false; btn.textContent = 'Play'; set(+scrub.value); });
    document.fonts.ready.then(function () { set(base); requestAnimationFrame(loop); });
  }

  window.Film = {
    P: P, out3: out3, inOut: inOut, expo: expo, $: $, hash: hash, warm: warm, cool: cool, rise: rise, fade: fade,
    glyphMoon: glyphMoon, mark: mark, pane: pane, focus: focus, lamp: lamp, chord: chord, press: press, moon: moon, type: type, lines: lines,
    titleCard: titleCard, chapterCard: chapterCard, endCard: endCard, mount: mount
  };
})();
