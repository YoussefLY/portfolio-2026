"use client";

import { useRef, type ReactNode } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap-scroll";

gsap.registerPlugin(SplitText);

type Props = {
  children: ReactNode;
  /** Delay before the first line, in seconds. */
  delay?: number;
};

/** Splits text into lines and wipes each one up from behind a mask when it comes into view. */
export function LineReveal({ children, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      let split: SplitText | undefined;
      document.fonts?.ready.then(() => {
        if (!ref.current) return;
        split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.08,
              delay,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }),
        });
        ScrollTrigger.refresh();
      });

      return () => split?.revert();
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className="line-reveal">
      {children}
    </span>
  );
}
