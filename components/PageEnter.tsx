"use client";

import { useRef, type ReactNode } from "react";
import { FADE_FROM, FADE_TO, MOTION, gsap, useGSAP } from "@/lib/gsap";
import { session } from "@/lib/session";
import styles from "./PageEnter.module.css";

/** Only the first paint fades in; client navigations are handled by view transitions. */
let firstMount = true;

export function PageEnter({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      el.setAttribute("data-enter-ready", "");

      if (!firstMount) return;
      firstMount = false;
      // Children's effects ran before this one, so they saw hydrated === false on a full load.
      session.hydrated = true;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { ...FADE_TO, clearProps: "transform,opacity,visibility" });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(el, { ...FADE_FROM }, { ...FADE_TO, ...MOTION, clearProps: "transform,opacity,visibility" });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className={styles.enter} data-page>
      {children}
    </div>
  );
}
