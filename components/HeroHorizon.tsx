"use client";

import { useEffect, useRef } from "react";
import { HeroReplica } from "./HeroReplica";

const FOLD_PX = 520;

// At lg+ with motion allowed, the replica starts tilted back on the horizon and
// eases flat over the first 520px of scroll. Scroll writes only --hh-e (eased
// 0..1); the tilt, lift and line opacity derive from it in CSS.
// Below lg or under reduced motion the motion-safe/lg variants never apply, so it renders flat.
export function HeroHorizon({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / FOLD_PX));
      el.style.setProperty("--hh-e", String(1 - (1 - p) ** 3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      // Lift into the hero's bottom padding (HeroSection pb clamp) less a 24px gap; more would cover the install command.
      className="relative [--hh-e:0] lg:motion-safe:[perspective:1400px] lg:motion-safe:[transform:translateY(calc((24px-clamp(72px,7vw,120px))*(1-var(--hh-e))))]"
    >
      {/* The horizon edge: the skyline (children) sits on this line. */}
      <div data-hero-horizon className="pointer-events-none absolute inset-x-0 top-0 z-10">
        {children}
        <div className="hidden h-px bg-[linear-gradient(90deg,transparent,var(--ins-lamp)_20%,var(--ins-lamp)_80%,transparent)] opacity-[calc(1-var(--hh-e))] lg:motion-safe:block" />
      </div>
      <div className="origin-top lg:motion-safe:[transform:rotateX(calc(34deg*(1-var(--hh-e))))_scale(calc(.86+.14*var(--hh-e)))]">
        <HeroReplica />
      </div>
    </div>
  );
}
