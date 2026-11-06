// The jump from an orrery body to its section, hidden behind a plate that is engraved while you watch:
// night falls from the click, the sun's ring is drawn, meridians grow from it, each orbit is drawn in turn,
// the sandbox scale is ruled, the bodies take their places and the arm reaches the one you chose, its name
// typed beside it. Then the plate comes apart in reverse and a hairline is ruled along the section's top
// rule, dissolving the plate behind it.
// The orrery keeps turning throughout. A click, Esc or scroll runs it out quickly.
import { ORBITS, PERIOD, SANDBOX, type Body } from "./orreryGeom";

const K = 1.9; // how much larger the plate's orrery is than the hero's
const FLAT = 0.47;
const TILT = -11;
const SPIN = 3; // the plate turns this many times faster than the hero
const PACE = 0.45; // scales every duration and delay below; the full run is 4.4 s × PACE (2 s now)
const DRAW = "cubic-bezier(.65, 0, .35, 1)";
const OUT = "cubic-bezier(.16, 1, .3, 1)";
const IN = "cubic-bezier(.7, 0, .84, 0)";
const EDGE = 180; // px of soft edge between the dissolved and the standing plate

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const n = (v: number) => v.toFixed(1);
const frac = (v: number) => v - Math.floor(v);
const rad = (d: number) => (d * Math.PI) / 180;
/** A point on the plane, before the plate's tilt (the tilt is a group transform). */
const P = (r: number, deg: number) => ({ x: r * Math.cos(rad(deg)), y: r * FLAT * Math.sin(rad(deg)) });

// fixed dust, so the plate is the same every time
const DUST = Array.from({ length: 160 }, (_, i) => {
  const a = frac(Math.sin(i * 91.7) * 43758.5453);
  const b = frac(Math.sin(i * 12.9) * 24634.6345);
  return { x: a * 2400 - 1200, y: b * 1400 - 700, r: 0.4 + frac(a * 7) * 0.9, d: frac(b * 13) };
});

export type Warp = {
  x: number;
  y: number;
  body: Body;
  angle: number;
  others: { rx: number; angle: number }[];
  chapter: string;
  chapterName: string;
  /** Where the target's top rule sits once the page has jumped, in viewport pixels. */
  rule: () => { x: number; y: number; w: number };
};

function plate(w: Warp, portrait: boolean) {
  const k = ORBITS.indexOf(w.body.rx);
  const name = w.body.name ?? w.body.note;
  const note = w.body.name ? w.body.note : "project tab · its own agent";
  const cat = `Plate I · ${w.chapter} · ${w.chapterName}`;
  const S = SANDBOX * K;
  const hair = `vector-effect="non-scaling-stroke"`;
  return `
<svg class="wp-sky" viewBox="-1200 -700 2400 1400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <g fill="var(--ink)">${DUST.map((s) => `<circle class="wp-dust" cx="${n(s.x)}" cy="${n(s.y)}" r="${n(s.r)}" opacity="${n(0.15 + s.d * 0.5)}"/>`).join("")}</g>
</svg>
<svg class="wp-orrery" viewBox="${portrait ? "-720 -720 1440 1440" : "-1200 -700 2400 1400"}" aria-hidden="true">
  <defs>
    <mask id="wp-sandbox-draw" maskUnits="userSpaceOnUse" x="-1200" y="-1200" width="2400" height="2400">
      <ellipse class="wp-sbm" rx="${S}" ry="${n(S * FLAT)}" pathLength="1" fill="none" stroke="#fff" stroke-width="10" stroke-dasharray="1" stroke-dashoffset="1"/>
    </mask>
  </defs>
  <g transform="rotate(${TILT})" fill="none" stroke="var(--ink)">
    <g class="wp-dial" transform="scale(1 ${FLAT})">
      <g stroke-dasharray="1 6" opacity=".32">${[0, 30, 60, 90, 120, 150]
        .map((d) => `<g transform="rotate(${d})"><path class="wp-mer" ${hair} d="M${-(SANDBOX + 60) * K} 0H${(SANDBOX + 60) * K}"/></g>`)
        .join("")}</g>
      <g opacity=".45">${Array.from({ length: 72 }, (_, i) => {
        const a = rad(i * 5);
        const r1 = S + (i % 6 ? 8 : 18);
        return `<path class="wp-tick" ${hair} opacity="0" d="M${n(S * Math.cos(a))} ${n(S * Math.sin(a))}L${n(r1 * Math.cos(a))} ${n(r1 * Math.sin(a))}"/>`;
      }).join("")}</g>
    </g>
    ${ORBITS.map(
      (o, i) =>
        `<g opacity="${i === k ? 1 : 0.38}"><ellipse class="wp-orb${i === k ? " wp-on" : ""}" rx="${o * K}" ry="${n(o * K * FLAT)}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" stroke-width="${i === k ? 1.3 : 0.6}"/></g>`,
    ).join("")}
    <ellipse rx="${S}" ry="${n(S * FLAT)}" stroke-dasharray="7 5" opacity=".6" mask="url(#wp-sandbox-draw)"/>
    ${w.others.map(() => `<circle class="wp-other" r="3.2" fill="var(--ink)" stroke="none" opacity="0"/>`).join("")}
    <line class="wp-arm" x1="0" y1="0" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" stroke-width=".8" opacity=".6"/>
    <g stroke="var(--gold)">
      <circle class="wp-halo" r="58" stroke-width=".8" stroke-dasharray="1 4" opacity="0"/>
      <circle class="wp-sun" r="40" stroke-width="1.1" fill="var(--deep)" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
    </g>
    <svg class="wp-lyre" x="-26" y="-27" width="52" height="52" fill="var(--gold)" stroke="var(--gold)" overflow="visible" opacity="0"><use href="#lyre"/></svg>
    <g class="wp-body"><g class="wp-mark" stroke="var(--ink-hi)" opacity="0">
      <circle class="wp-spin" r="44" stroke-width=".8" stroke-dasharray="1 4"/>
      <path d="M-30 0H30M0 -30V30" stroke-width="1.2"/>
      <circle r="12" stroke-width="1.2" fill="var(--deep)"/>
      <circle r="5" fill="var(--ink-hi)" stroke="none"/>
    </g></g>
  </g>
</svg>
<div class="wp-tag">
  <small data-n="${cat.length}">${esc(cat)}</small>
  <b>${esc(name)}</b>
  <span data-n="${note.length}">${esc(note)}</span>
</div>`;
}

/** Plays the transition; `cover` runs once the screen is fully hidden (jump there). */
export async function warp(host: HTMLElement, w: Warp, cover: () => void) {
  const el = document.createElement("div");
  el.className = "wp";
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = plate(w, innerWidth < innerHeight);
  host.appendChild(el);
  const q = <T extends Element>(s: string) => el.querySelector<T>(s)!;
  const qa = <T extends Element>(s: string) => [...el.querySelectorAll<T>(s)];
  const R = Math.hypot(innerWidth, innerHeight);
  const anims: Animation[] = [];
  let rate = 1;
  const A = (t: Element, kf: PropertyIndexedKeyframes, duration: number, delay = 0, easing = DRAW) => {
    const a = t.animate(kf, { duration: duration * PACE, delay: delay * PACE, easing, fill: "both" });
    a.playbackRate = rate;
    anims.push(a);
    return a.finished;
  };

  // the orrery turns the whole time: bodies on their orbits, the dial under them
  const body = q<SVGGElement>(".wp-body");
  const arm = q<SVGLineElement>(".wp-arm");
  const dial = q<SVGGElement>(".wp-dial");
  const others = qa<SVGCircleElement>(".wp-other");
  let s = 0;
  let last = performance.now();
  let raf = 0;
  const turn = (now: number) => {
    s += ((now - last) / 1000) * SPIN * rate;
    last = now;
    const at = (rx: number, a: number) => P(rx * K, a + (s * 360) / PERIOD[rx]);
    const b = at(w.body.rx, w.angle);
    body.setAttribute("transform", `translate(${n(b.x)} ${n(b.y)})`);
    arm.setAttribute("x2", n(b.x));
    arm.setAttribute("y2", n(b.y));
    others.forEach((c, i) => {
      const o = at(w.others[i].rx, w.others[i].angle);
      c.setAttribute("cx", n(o.x));
      c.setAttribute("cy", n(o.y));
    });
    dial.setAttribute("transform", `scale(1 ${FLAT}) rotate(${n(s * 4)})`);
    raf = requestAnimationFrame(turn);
  };
  turn(last);

  // a click, Esc or scroll runs the rest out quickly
  let hurry = () => {};
  const skip = () => {
    rate = 4;
    anims.forEach((a) => (a.playbackRate = 4));
    hurry();
  };
  const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip();
  // while the plate is up, no click reaches the page under it (the growing disc doesn't cover it yet)
  const onPoint = (e: Event) => (e.preventDefault(), e.stopPropagation(), e.type === "pointerdown" && skip());
  addEventListener("pointerdown", onPoint, true);
  addEventListener("click", onPoint, true);
  addEventListener("keydown", onKey);
  addEventListener("wheel", skip, { passive: true });

  const dust = qa(".wp-dust");
  const orbs = qa(".wp-orb");
  const ticks = qa(".wp-tick");
  const mers = qa(".wp-mer");
  const mark = q(".wp-mark");
  const [cat, name, note] = [q<HTMLElement>(".wp-tag small"), q<HTMLElement>(".wp-tag b"), q<HTMLElement>(".wp-tag span")];
  // monospace lines are typed one character per step
  const type = (t: HTMLElement, d: number, delay: number) => A(t, { clipPath: ["inset(0 100% 0 0)", "inset(0 0 0 0)"] }, d, delay, `steps(${t.dataset.n}, end)`);

  // build: night falls from the click, then the plate is engraved from the sun outward
  const cover0 = A(el, { clipPath: [`circle(0px at ${w.x}px ${w.y}px)`, `circle(${R}px at ${w.x}px ${w.y}px)`] }, 700, 0, "cubic-bezier(.83, 0, .17, 1)");
  const build = [
    cover0,
    A(q(".wp-sun"), { strokeDashoffset: [1, 0] }, 650, 180),
    A(q(".wp-halo"), { opacity: [0, 1], transform: ["rotate(-90deg)", "none"] }, 900, 300, OUT),
    A(q(".wp-lyre"), { opacity: [0, 1], transform: ["scale(.6)", "none"] }, 600, 320, OUT),
    ...dust.map((d, i) => A(d, { opacity: [0, 0.15 + DUST[i].d * 0.5] }, 500, 150 + DUST[i].d * 1100, "ease-out")),
    ...mers.map((m, i) => A(m, { transform: ["scale(0)", "none"] }, 800, 380 + i * 45, OUT)),
    ...orbs.map((o, i) => A(o, { strokeDashoffset: [1, 0] }, 820, 420 + i * 120)),
    A(q(".wp-sbm"), { strokeDashoffset: [1, 0] }, 900, 900),
    ...ticks.map((t, i) => A(t, { opacity: [0, 1] }, 180, 1000 + i * 7, "linear")),
    ...others.map((o, i) => A(o, { opacity: [0, 0.75], transform: ["scale(0)", "none"] }, 380, 1150 + i * 70, OUT)),
    A(arm, { strokeDashoffset: [1, 0] }, 520, 1300),
    A(mark, { opacity: [0, 1], transform: ["scale(2.2) rotate(45deg)", "none"] }, 620, 1560, OUT),
    type(cat, 520, 1350),
    A(name, { opacity: [0, 1], transform: ["translateY(12px)", "none"], letterSpacing: [".1em", "-.02em"], filter: ["blur(6px)", "blur(0)"] }, 900, 1500, OUT),
    type(note, 480, 1820),
  ];
  await cover0;
  cover();
  await Promise.all(build);
  await new Promise<void>((r) => {
    const t = setTimeout(r, 400 * PACE);
    hurry = () => (clearTimeout(t), r());
    if (rate > 1) hurry();
  });

  const r = w.rule();
  const line = document.createElement("i");
  line.className = "wp-rule";
  line.setAttribute("aria-hidden", "true");
  Object.assign(line.style, {
    top: `${r.y}px`,
    background: `linear-gradient(90deg, transparent ${r.x}px, var(--ink-hi) ${r.x}px, var(--ink-hi) ${r.x + r.w}px, transparent ${r.x + r.w}px)`,
  });
  host.appendChild(line);

  // unmake: labels lift away, the arm pulls back into the sun, the orbits unwind, and a ruled line wipes the plate away
  el.style.clipPath = "none";
  await Promise.all([
    A(name, { opacity: [1, 0], letterSpacing: ["-.02em", ".14em"], filter: ["blur(0)", "blur(8px)"] }, 420, 0, IN),
    A(cat, { opacity: [1, 0] }, 260, 0, "linear"),
    A(note, { opacity: [1, 0] }, 260, 60, "linear"),
    A(mark, { opacity: [1, 0], transform: ["none", "scale(0) rotate(-45deg)"] }, 380, 60, IN),
    A(arm, { strokeDashoffset: [0, 1] }, 420, 140, IN),
    ...others.map((o, i) => A(o, { opacity: [0.75, 0] }, 260, 120 + i * 30, "linear")),
    ...ticks.map((t, i) => A(t, { opacity: [1, 0] }, 140, 180 + i * 4, "linear")),
    A(q(".wp-sbm"), { strokeDashoffset: [0, -1] }, 700, 220, IN),
    ...orbs.map((o, i) => A(o, { strokeDashoffset: [0, -1] }, 640, 260 + (orbs.length - 1 - i) * 80, IN)),
    ...mers.map((m) => A(m, { transform: ["none", "scale(0)"] }, 600, 300, IN)),
    ...dust.map((d, i) => A(d, { opacity: [0.15 + DUST[i].d * 0.5, 0] }, 400, 300 + DUST[i].d * 500, "linear")),
    A(q(".wp-halo"), { opacity: [1, 0], transform: ["none", "rotate(90deg) scale(1.6)"] }, 600, 560, IN),
    A(q(".wp-lyre"), { opacity: [1, 0], transform: ["none", "scale(1.5)"] }, 500, 660, IN),
    A(q(".wp-sun"), { strokeDashoffset: [0, -1] }, 460, 640, IN),
    // a hairline is ruled along the target's own top rule; the plate dissolves behind its head
    // (the line spans the viewport but shows only the rule's span; same timing keeps its head on the dissolve)
    A(line, { clipPath: ["inset(0 100% 0 0)", `inset(0 -${EDGE}px 0 0)`] }, 760, 960),
    A(el, { "--wipe": [`-${EDGE}px`, `${innerWidth}px`] } as PropertyIndexedKeyframes, 760, 960),
  ]);
  // then the drawn line settles into the page's own, quieter rule
  line.animate({ opacity: [1, 0] }, { duration: 700 * PACE, easing: "ease-out", fill: "both" }).finished.then(() => line.remove());

  cancelAnimationFrame(raf);
  removeEventListener("pointerdown", onPoint, true);
  removeEventListener("click", onPoint, true);
  removeEventListener("keydown", onKey);
  removeEventListener("wheel", skip);
  el.remove();
}
