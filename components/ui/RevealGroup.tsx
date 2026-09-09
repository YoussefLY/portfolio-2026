"use client";

import { useRef, type ReactNode } from "react";
import { FADE_FROM, FADE_TO, MOTION, gsap, isAboveRevealLine, useGSAP } from "@/lib/gsap-scroll";

const ITEMS = "[data-reveal]";

/** Fades in each `[data-reveal]` descendant as it scrolls into view. */
export function RevealGroup({ children }: { children: ReactNode }) {
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

          const items = gsap.utils.toArray<HTMLElement>(ITEMS, root);
          if (items.length === 0) return;

          if (context.conditions?.reduceMotion) {
            gsap.set(items, { ...FADE_TO });
            return;
          }

          items.forEach((item) => {
            if (isAboveRevealLine(item)) {
              gsap.set(item, { ...FADE_TO });
              return;
            }

            gsap.fromTo(item, { ...FADE_FROM }, {
              ...FADE_TO,
              ...MOTION,
              scrollTrigger: {
                trigger: item,
                start: "top 82%",
                once: true,
              },
            });
          });
        },
        scope,
      );

      return () => mm.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
