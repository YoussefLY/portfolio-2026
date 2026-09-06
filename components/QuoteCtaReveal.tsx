"use client";

import { useRef, type ReactNode } from "react";
import { FADE_FROM, FADE_TO, MOTION, gsap, isAboveRevealLine, useGSAP } from "@/lib/gsap-scroll";

const QUOTE = '[data-reveal="quote"]';

export function QuoteCtaReveal({ children }: { children: ReactNode }) {
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
            gsap.set(QUOTE, { ...FADE_TO });
            return;
          }

          const quote = scope.current?.querySelector<HTMLElement>(QUOTE);

          const reveal = (el: HTMLElement) => {
            if (isAboveRevealLine(el)) {
              gsap.set(el, { ...FADE_TO });
              return;
            }

            gsap.fromTo(el, { ...FADE_FROM }, {
              ...FADE_TO,
              ...MOTION,
              scrollTrigger: {
                trigger: el,
                start: "top 82%",
                once: true,
              },
            });
          };

          if (quote) reveal(quote);
        },
        scope,
      );

      return () => mm.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
