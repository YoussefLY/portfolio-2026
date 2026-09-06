"use client";

import { useRef, type ReactNode } from "react";
import { FADE_FROM, FADE_TO, MOTION, gsap, isAboveRevealLine, useGSAP } from "@/lib/gsap-scroll";

const SECTIONS = "[data-section]";
const BARS = "[data-bar]";
const FLOW = ".flowStep, .flowArrow";
const BAR_FROM = { scaleX: 0, transformOrigin: "left center" };

export function SectionReveal({ children }: { children: ReactNode }) {
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
          if (context.conditions?.reduceMotion) {
            gsap.set(SECTIONS, { ...FADE_TO });
            gsap.set(BARS, { scaleX: 1 });
            gsap.set(FLOW, { ...FADE_TO });
            return;
          }

          const sections = gsap.utils.toArray<HTMLElement>(SECTIONS);
          sections.forEach((section) => {
            const bars = gsap.utils.toArray<HTMLElement>(BARS, section);
            const flowItems =
              section.id === "architecture" ? gsap.utils.toArray<HTMLElement>(FLOW, section) : [];
            const alreadyIn = isAboveRevealLine(section);
            const scrollTrigger = {
              trigger: section,
              start: "top 82%",
              once: true,
            };

            if (alreadyIn) {
              gsap.set(section, { ...FADE_TO });
            }

            if (bars.length === 0 && flowItems.length === 0) {
              if (alreadyIn) return;
              gsap.fromTo(
                section,
                { ...FADE_FROM },
                { ...FADE_TO, ...MOTION, scrollTrigger },
              );
              return;
            }

            const tl = gsap.timeline({
              defaults: { ...MOTION },
              scrollTrigger: alreadyIn ? undefined : scrollTrigger,
            });

            if (!alreadyIn) {
              tl.fromTo(section, { ...FADE_FROM }, { ...FADE_TO });
            }

            if (bars.length > 0) {
              tl.fromTo(bars, { ...BAR_FROM }, { scaleX: 1, stagger: 0.08 }, alreadyIn ? 0 : "<0.08");
            }

            if (flowItems.length > 0) {
              tl.fromTo(
                flowItems,
                { ...FADE_FROM },
                { ...FADE_TO, stagger: 0.07 },
                alreadyIn ? 0.08 : "<0.12",
              );
            }
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
