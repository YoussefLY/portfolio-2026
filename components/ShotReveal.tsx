"use client";

import { useRef, type ReactNode } from "react";
import {
  FADE_FROM,
  FADE_TO,
  MOTION,
  gsap,
  isAboveRevealLine,
  useGSAP,
  ScrollTrigger,
} from "@/lib/gsap-scroll";

export function ShotReveal({ children }: { children: ReactNode }) {
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

          const img = root.querySelector("img");
          if (!img) return;

          const onLoad = () => ScrollTrigger.refresh();
          if (!img.complete) {
            img.addEventListener("load", onLoad);
          }

          if (context.conditions?.reduceMotion || isAboveRevealLine(root)) {
            gsap.set(root, { ...FADE_TO });
          } else {
            gsap.fromTo(root, { ...FADE_FROM }, {
              ...FADE_TO,
              ...MOTION,
              scrollTrigger: {
                trigger: root,
                start: "top 82%",
                once: true,
              },
            });
          }

          if (img.complete) onLoad();

          return () => img.removeEventListener("load", onLoad);
        },
        scope,
      );

      return () => mm.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
