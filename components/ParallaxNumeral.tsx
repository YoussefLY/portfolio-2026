"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/** Lets the chapter numeral drift a few pixels toward the cursor. Pointer devices only. */
export function ParallaxNumeral({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const band = el?.closest<HTMLElement>("[data-break]");
    if (!el || !band) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const x = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      const r = band.getBoundingClientRect();
      x(((e.clientX - r.left) / r.width - 0.5) * 24);
      y(((e.clientY - r.top) / r.height - 0.5) * 16);
    };
    const onLeave = () => {
      x(0);
      y(0);
    };
    band.addEventListener("pointermove", onMove, { passive: true });
    band.addEventListener("pointerleave", onLeave);
    return () => {
      band.removeEventListener("pointermove", onMove);
      band.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <span ref={ref} style={{ display: "block" }}>
      {children}
    </span>
  );
}
