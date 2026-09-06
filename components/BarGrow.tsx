"use client";

import { useRef, type ReactNode } from "react";
import { MOTION, gsap, useGSAP } from "@/lib/gsap-scroll";

const BARS = "[data-bar]";
const FROM = { scaleX: 0, transformOrigin: "left center" };
const TO = { scaleX: 1, ...MOTION };

function growBars(bars: HTMLElement[], trigger: Element, stagger?: number) {
  if (bars.length === 0) return;

  gsap.fromTo(bars, { ...FROM }, {
    ...TO,
    stagger,
    scrollTrigger: {
      trigger,
      start: "top 82%",
      once: true,
    },
  });
}

function growGroups(root: HTMLElement, selector: string, stagger?: number) {
  const groups = gsap.utils.toArray<HTMLElement>(selector, root);
  groups.forEach((group) => {
    growBars(gsap.utils.toArray<HTMLElement>(BARS, group), group, stagger);
  });
}

export function BarGrow({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noPreference: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const root = scope.current;
          if (!root) return;

          const bars = gsap.utils.toArray<HTMLElement>(BARS, root);

          if (context.conditions?.reduceMotion) {
            gsap.set(bars, { scaleX: 1 });
            return;
          }

          growGroups(root, '[data-bars="span"]');
          growGroups(root, '[data-bars="stack"]', 0.08);
          growGroups(root, '[data-bars="table"]');
        },
        scope,
      );

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className="barGrow">
      {children}
    </div>
  );
}
