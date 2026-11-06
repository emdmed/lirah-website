"use client";

import { useEffect, useState } from "react";
import { INSTALL_COMMAND, OS_NAME, primaryInstaller, type Release } from "@/lib/releases";
import { useDetectedOS, useIsPhone } from "./useDetectedOS";
import { warp } from "./orreryWarp";
import { BODIES, CX, CY, FLAT, FLAT_RANGE, ORBITS, PERIOD, SANDBOX, YAW_RANGE, at, f, planeTransform, pose } from "./orreryGeom";

// Linux goes to the install script below; macOS and Windows get the latest installer.
// A phone has nothing to install: it sends the link to the visitor's desktop instead.
export function PlateDownload({ release, anchor }: { release: Release | null; anchor?: boolean }) {
  const os = useDetectedOS();
  const phone = useIsPhone();
  const inst = primaryInstaller(release, os);
  if (phone) return <SendLink />;
  if (os === "linux" || !inst) {
    const href = anchor ? "#install" : (release?.url ?? "https://github.com/emdmed/lirah/releases/latest");
    return <a className="btn solid" href={href}>{anchor ? `Install on ${OS_NAME[os]} ↓` : `Download for ${OS_NAME[os]}`}</a>;
  }
  return <a className="btn solid" href={inst.url}>Download for {OS_NAME[os]}</a>;
}

// The share sheet where there is one (AirDrop, mail, chat to yourself), else the link is copied.
function SendLink() {
  const [label, setLabel] = useState("Send to my desktop");
  async function send() {
    const url = `${location.origin}/#install`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Lirah", text: "Lirah: a workspace for CLI coding agents", url });
        return;
      } catch (e) {
        if ((e as DOMException).name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setLabel("Link copied");
    } catch {
      setLabel("Open lira.dev on your desktop");
    }
    setTimeout(() => setLabel("Send to my desktop"), 2400);
  }
  return (
    <button type="button" className="btn solid" onClick={send}>
      <span aria-live="polite">{label}</span>
    </button>
  );
}

export function CopyCommand() {
  const [label, setLabel] = useState("Copy");
  async function copy() {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setLabel("Copied");
    } catch {
      setLabel("Select and copy");
    }
    setTimeout(() => setLabel("Copy"), 1800);
  }
  return (
    <div className="cmd">
      <code>{INSTALL_COMMAND}</code>
      <button type="button" onClick={copy} aria-label="Copy install command">
        <span aria-live="polite">{label}</span>
      </button>
    </div>
  );
}

// Turns the server-drawn orrery: bodies orbit (inner faster), pass behind the sun on the far side
// and grow as they come near. A fine pointer tilts and turns the plane; hovering the orrery slows it
// so the labels can be read, and hovering a body lights its orbit. Reduced motion keeps it at rest.
export function OrreryMotion() {
  useEffect(() => {
    const svg = document.querySelector<SVGSVGElement>("svg.art");
    const plate = svg?.closest<HTMLElement>(".plate");
    if (!svg || !plate) return;
    const $ = <T extends Element>(q: string) => svg.querySelector<T>(q)!;
    const planes = [...svg.querySelectorAll("[data-plane], [data-dial]")];
    const arms = [...svg.querySelectorAll("[data-arms] line")];
    const far = $("[data-layer=far]");
    const near = $("[data-layer=near]");
    const degs = [...svg.querySelectorAll<SVGTextElement>("text[data-deg]")];
    const axis = $("[data-axis]");
    const bodies = [...svg.querySelectorAll<SVGGElement>("[data-body]")].map((el) => {
      const b = BODIES[+el.dataset.body!];
      return { el, b, stem: el.querySelector("[data-stem]")!, foot: el.querySelector("[data-foot]")!, s: el.querySelector("[data-s]")!, isNear: el.parentNode === near };
    });

    const still = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(pointer: fine)");
    let spin = 0, speed = 1, speedTo = 1;
    let flat = FLAT, flatTo = FLAT, yaw = 0, yawTo = 0;
    let raf = 0, last = 0, seen = true;

    const draw = () => {
      const tf = planeTransform(flat, yaw);
      const plain = planeTransform(flat);
      planes.forEach((g) => g.setAttribute("transform", g.hasAttribute("data-dial") ? tf : plain));
      degs.forEach((t) => {
        const p = at(SANDBOX + 26, +t.dataset.deg! + yaw, flat);
        t.setAttribute("x", f(p.x));
        t.setAttribute("y", f(p.y + 4));
      });
      const up = pose(0, 0, flat).head;
      axis.setAttribute("d", `M${f(CX - (up.x - CX) * 3.4)} ${f(CY - (up.y - CY) * 3.4)}L${f(up.x + (up.x - CX) * 2.4)} ${f(up.y + (up.y - CY) * 2.4)}`);
      bodies.forEach((o, i) => {
        const { foot, head, near: n, scale } = pose(o.b.rx, o.b.deg + (spin * 360) / PERIOD[o.b.rx] + yaw, flat);
        const dx = f(foot.x - head.x), dy = f(foot.y - head.y);
        o.el.setAttribute("transform", `translate(${f(head.x)} ${f(head.y)})`);
        o.stem.setAttribute("d", `M0 0L${dx} ${dy}`);
        o.foot.setAttribute("cx", dx);
        o.foot.setAttribute("cy", dy);
        o.s.setAttribute("transform", `scale(${scale.toFixed(3)})`);
        arms[i].setAttribute("x2", f(foot.x));
        arms[i].setAttribute("y2", f(foot.y));
        // crossing to the far side moves the body under the sun, and back over it on the near side
        if (n >= 0 !== o.isNear) {
          o.isNear = n >= 0;
          (o.isNear ? near : far).appendChild(o.el);
        }
      });
    };

    const frame = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      const k = 1 - Math.exp(-dt * 3.5); // exponential ease toward the pointer's target
      speed += (speedTo - speed) * k;
      flat += (flatTo - flat) * k;
      yaw += (yawTo - yaw) * k;
      spin += dt * speed;
      draw();
      raf = requestAnimationFrame(frame);
    };
    const run = () => {
      cancelAnimationFrame(raf);
      last = 0;
      if (seen && !still.matches) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (!fine.matches || still.matches) return;
      const r = plate.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      yawTo = -x * 2 * YAW_RANGE;
      flatTo = FLAT_RANGE[0] + (FLAT_RANGE[1] - FLAT_RANGE[0]) * (0.5 - y);
    };
    const onLeave = () => ((yawTo = 0), (flatTo = FLAT));
    const slow = () => (speedTo = 0.18);
    const fast = () => (speedTo = 1);
    const focus = (e: PointerEvent) => {
      const el = (e.target as Element).closest<SVGGElement>("[data-body]");
      svg.classList.toggle("focus", !!el);
      svg.querySelectorAll(".on").forEach((n) => n.classList.remove("on"));
      if (el) svg.querySelectorAll(`[data-rx="${el.dataset.rx}"]`).forEach((n) => n.classList.add("on"));
    };
    // A body is a link to its section. The jump happens behind a fullscreen plate (orreryWarp),
    // then the target is marked where you landed.
    let warping = false;
    const go = async (e: MouseEvent) => {
      const a = (e.target as Element).closest<SVGAElement>("[data-body] a");
      const href = a?.getAttribute("href");
      const el = href && document.querySelector<HTMLElement>(href);
      if (!a || !el || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      e.preventDefault();
      if (warping) return;
      // inner targets near the top of their chapter land on the chapter, so its heading stays in view
      const ch = el.closest<HTMLElement>(".ch");
      const stop = ch && el.getBoundingClientRect().top - ch.getBoundingClientRect().top < innerHeight * 0.45 ? ch : el;
      const jump = () => {
        const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
        scrollTo(0, stop.getBoundingClientRect().top + scrollY - pad - (parseFloat(getComputedStyle(stop).scrollMarginTop) || 0));
        history.pushState(null, "", href);
      };
      // `mark`: draw the arrival line (the warp rules its own line, so it skips this)
      const land = (mark = true) => {
        el.classList.remove("arrive");
        void el.getBoundingClientRect(); // restart the mark if the same target is clicked twice
        if (mark) el.classList.add("arrive");
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      };
      if (still.matches) return jump(), land();
      const o = bodies.find((x) => x.el.contains(a))!;
      const box = a.getBoundingClientRect();
      warping = true;
      try {
        await warp(
          svg.closest<HTMLElement>(".mp") ?? document.body,
          {
            // a keyboard Enter has no pointer position: start from the body itself
            x: e.detail ? e.clientX : box.left + box.width / 2,
            y: e.detail ? e.clientY : box.top + box.height / 2,
            body: o.b,
            angle: o.b.deg + (spin * 360) / PERIOD[o.b.rx] + yaw,
            others: bodies.filter((x) => x !== o).map((x) => ({ rx: x.b.rx, angle: x.b.deg + (spin * 360) / PERIOD[x.b.rx] + yaw })),
            chapter: ch?.querySelector(".no b")?.firstChild?.textContent?.trim() ?? "",
            chapterName: ch?.querySelector(".no span")?.textContent ?? "",
            rule: () => {
              const r = el.getBoundingClientRect();
              return { x: r.left, y: r.top - (el.matches("h3") ? 20 : 1), w: r.width };
            },
          },
          jump,
        );
      } finally {
        warping = false;
      }
      land(false);
    };

    const io = new IntersectionObserver(([en]) => ((seen = en.isIntersecting), run()));

    plate.addEventListener("pointermove", onMove);
    plate.addEventListener("pointerleave", onLeave);
    svg.addEventListener("pointerenter", slow);
    svg.addEventListener("pointerleave", fast);
    svg.addEventListener("pointerover", focus);
    svg.addEventListener("pointerleave", focus);
    svg.addEventListener("click", go);
    still.addEventListener("change", run);
    io.observe(svg);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      svg.removeEventListener("click", go);
      still.removeEventListener("change", run);
      plate.removeEventListener("pointermove", onMove);
      plate.removeEventListener("pointerleave", onLeave);
      svg.removeEventListener("pointerenter", slow);
      svg.removeEventListener("pointerleave", fast);
      svg.removeEventListener("pointerover", focus);
      svg.removeEventListener("pointerleave", focus);
    };
  }, []);
  return null;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const band = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
const easeOut = (v: number) => 1 - Math.pow(1 - v, 3);
const easeInOut = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);

// Landing order: one arrival at a time in the workspace corner, the sun last on the terminal.
const ORDER = ["infra", "acme-web", "acme-api", "plans", "jobs", "git", "index", "context", "sun"];
const FLIGHT = 0.5; // share of the scroll each star takes, launch to fully open
const TRAVEL = 0.6; // of a flight, the part spent flying; the rest turns the star into its part

// Scrolling from Plate I to Plate II takes the orrery apart into the app. The bodies launch one by one
// and fly as stars to the centre of their part ([data-to] in AppMock). There the star opens into a
// hairline outline of the part, the part fills in inside it, and the outline settles. Reduced motion and narrow screens get the app as it is.
export function OrreryMorph() {
  useEffect(() => {
    const art = document.querySelector<SVGSVGElement>("svg.art");
    const app = document.querySelector<HTMLElement>(".app");
    const frame = app?.querySelector<HTMLElement>(".frame");
    const mock = frame?.querySelector<HTMLElement>(".mock");
    const host = document.querySelector<HTMLElement>(".mp");
    if (!art || !app || !frame || !mock || !host) return;

    const pairs = [
      ...BODIES.map((b, i) => ({
        key: b.name?.toLowerCase() ?? b.note,
        hide: art.querySelector(`[data-body="${i}"]`),
        src: art.querySelector(`[data-body="${i}"] [data-s] circle[r="4.6"]`),
        label: b.name ?? b.note,
      })),
      { key: "sun", hide: art.querySelector("[data-sun-g]"), src: art.querySelector("[data-sun]"), label: "" },
    ].flatMap((p) => {
      const dst = mock.querySelector<HTMLElement>(`[data-to="${p.key}"]`);
      const at = ORDER.indexOf(p.key);
      if (!p.src || !p.hide || !dst || at < 0) return [];
      return [{ ...p, src: p.src, hide: p.hide as SVGElement, dst, start: 0.03 + at * 0.045, fly: null as HTMLElement | null }];
    });

    // the flyer is drawn like what it leaves: a body's crosshair, the sun's rings and lyre
    const STAR = `<svg class="st" viewBox="-10 -10 20 20"><path d="M-9 0H9M0 -9V9" stroke="var(--ink)" stroke-width=".7"/><circle r="4.6" fill="var(--deep)" stroke="var(--ink)" stroke-width=".7"/><circle r="1.8" fill="var(--ink)"/></svg>`;
    const SUN = `<svg class="st" viewBox="-56 -56 112 112" fill="none" stroke="var(--gold)"><circle r="38" stroke-width=".6" stroke-dasharray="1 3"/><circle r="26" stroke-width=".8" fill="var(--deep)"/><path d="M-56 0H-30M30 0H56M0 -50V-30M0 30V50" stroke-width=".8"/><svg x="-17" y="-18" width="34" height="34" fill="var(--gold)" stroke="var(--gold)"><use href="#lyre"/></svg></svg>`;

    const on = matchMedia("(min-width: 961px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;

    const reset = () => {
      pairs.forEach((p) => {
        p.fly?.remove();
        p.fly = null;
        p.dst.style.removeProperty("--k");
        p.hide.style.removeProperty("opacity");
      });
      ["--base", "--end"].forEach((v) => app.style.removeProperty(v));
      app.classList.remove("morph");
      art.style.removeProperty("opacity");
    };

    const draw = () => {
      raf = 0;
      if (!on.matches) return reset();
      app.classList.add("morph");
      const f = frame.getBoundingClientRect();
      // 0 at the top of the page, 1 once Plate II sits in the middle of the viewport
      const end = f.top + scrollY - Math.max(0, (innerHeight - f.height) / 2);
      const p = clamp01(scrollY / Math.max(1, end));
      app.style.setProperty("--base", String(band(p, 0.2, 0.6)));
      app.style.setProperty("--end", String(band(p, 0.92, 1)));
      art.style.opacity = String(1 - band(p, 0.3, 0.7));
      let moving = false;
      for (const o of pairs) {
        const t = band(p, o.start, o.start + FLIGHT);
        const u = easeInOut(band(t, 0, TRAVEL));
        const k = easeOut(band(t, TRAVEL, 1));
        o.dst.style.setProperty("--k", String(band(k, 0.35, 1)));
        o.hide.style.opacity = t > 0 ? "0" : "";
        if (t <= 0 || t >= 1) {
          o.fly?.remove();
          o.fly = null;
          continue;
        }
        moving = true;
        if (!o.fly) {
          o.fly = document.createElement("div");
          o.fly.className = `fly ${o.key}`;
          o.fly.setAttribute("aria-hidden", "true");
          o.fly.innerHTML = `<i class="bx"></i>${o.key === "sun" ? SUN : STAR}${o.label ? "<b></b>" : ""}`;
          if (o.label) o.fly.querySelector("b")!.textContent = o.label;
          host.append(o.fly);
        }
        const s = o.src.getBoundingClientRect();
        const d = o.dst.getBoundingClientRect();
        const ax = s.left + s.width / 2, ay = s.top + s.height / 2;
        const bx = d.left + d.width / 2, by = d.top + d.height / 2;
        // a shallow arc rather than a ruler line: bow sideways by a tenth of the distance
        const bow = Math.sin(Math.PI * u) * 0.1;
        const x = ax + (bx - ax) * u - (by - ay) * bow;
        const y = ay + (by - ay) * u + (bx - ax) * bow;
        const st = o.fly.style;
        st.transform = `translate(${x}px, ${y}px)`;
        st.setProperty("--s", `${s.width}px`);
        // landing: the outline grows from the star to the part's own rectangle, then settles into it
        st.setProperty("--w", `${s.width + (d.width - s.width) * k}px`);
        st.setProperty("--h", `${s.height + (d.height - s.height) * k}px`);
        st.setProperty("--m", String(band(k, 0, 0.3)));
        st.opacity = String(1 - band(k, 0.8, 1));
        (o.fly.querySelector(".st") as SVGElement).style.opacity = String(1 - band(k, 0, 0.4));
        o.fly.querySelector("b")?.style.setProperty("opacity", String(1 - band(t, 0.5, TRAVEL)));
      }
      // the bodies keep orbiting under a moving flyer, so keep drawing while any is in flight
      if (moving) raf = requestAnimationFrame(draw);
    };
    const kick = () => void (raf ||= requestAnimationFrame(draw));

    kick();
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", kick);
    on.addEventListener("change", kick);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", kick);
      removeEventListener("resize", kick);
      on.removeEventListener("change", kick);
      reset();
    };
  }, []);
  return null;
}
