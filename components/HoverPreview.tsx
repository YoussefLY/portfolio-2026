"use client";

import { useEffect, useRef, useState, type ReactNode, ViewTransition } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./HoverPreview.module.css";

type Preview = { slug: string; n: string; src?: string };

/**
 * A small preview card that follows the cursor over rows marked with
 * data-preview-slug. Rows without an image show a hatched placeholder.
 */
export function HoverPreview({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Preview | null>(null);
  // The shared view-transition name is only attached between pointer-down and the
  // navigation it starts, so two cards can never hold the same name at once.
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const root = scope.current;
    const el = card.current;
    if (!root || !el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    const rowOf = (target: EventTarget | null) =>
      (target as HTMLElement | null)?.closest<HTMLElement>("[data-preview-slug]") ?? null;

    const onMove = (e: PointerEvent) => {
      x(e.clientX + 24);
      y(e.clientY - 40);
    };
    const onOver = (e: PointerEvent) => {
      const row = rowOf(e.target);
      if (!row) return;
      setActive({ slug: row.dataset.previewSlug ?? "", n: row.dataset.previewN ?? "", src: row.dataset.previewSrc });
      gsap.set(el, { x: e.clientX + 24, y: e.clientY - 40 });
      gsap.to(el, { autoAlpha: 1, scale: 1, duration: 0.25, ease: "power3.out", overwrite: true });
    };
    const onOut = (e: PointerEvent) => {
      const from = rowOf(e.target);
      const to = rowOf(e.relatedTarget);
      if (!from || from === to) return;
      gsap.to(el, {
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.2,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => setActive(null),
      });
    };
    let disarm = 0;
    const onDown = (e: PointerEvent) => {
      if (!rowOf(e.target)) return;
      window.clearTimeout(disarm);
      setArmed(true);
    };
    const onUp = () => {
      // If the click did not navigate, drop the shared name again.
      window.clearTimeout(disarm);
      disarm = window.setTimeout(() => setArmed(false), 2000);
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerover", onOver);
    root.addEventListener("pointerout", onOut);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerup", onUp);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerout", onOut);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      window.clearTimeout(disarm);
    };
  }, []);

  return (
    <div ref={scope} className={styles.scope}>
      {children}
      <div ref={card} className={styles.card} aria-hidden="true">
        {active?.src ? (
          armed ? (
            <ViewTransition name={`project-image-${active.slug}`} share="morph" default="none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={active.src} alt="" className={styles.image} />
            </ViewTransition>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={active.src} alt="" className={styles.image} />
          )
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderN}>{active?.n}</span>
            <span className={styles.placeholderLabel}>Fig. pending</span>
          </div>
        )}
      </div>
    </div>
  );
}
