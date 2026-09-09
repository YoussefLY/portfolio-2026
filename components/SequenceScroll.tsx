"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { MAIN_PAGES, type MainPageHref } from "@/lib/pages";
import { session } from "@/lib/session";

type MainPage = (typeof MAIN_PAGES)[number];

/** Our slice of history.state, namespaced so Next's own keys are never touched. */
const SEQ = "__seqScroll";
type SeqState = { y: number };

/** Document offset of a section, ignoring any in-flight transforms from animations. */
function sectionTop(id: string) {
  let el: HTMLElement | null = document.getElementById(id);
  if (!el) return null;
  let top = 0;
  while (el) {
    top += el.offsetTop;
    el = el.offsetParent as HTMLElement | null;
  }
  return top;
}

/** The page under the same line 35% down the viewport that the observer watches. */
function pageAtScroll(): MainPage {
  const probe = window.scrollY + window.innerHeight * 0.35;
  let found: MainPage = MAIN_PAGES[0];
  for (const page of MAIN_PAGES) {
    const top = sectionTop(page.id);
    if (top !== null && probe >= top) found = page;
  }
  return found;
}

const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Spreading history.state carries Next's __NA and __PRIVATE_NEXTJS_INTERNALS_TREE
 * through. Both are required: __NA makes Next's patched history methods short-circuit
 * instead of dispatching a router action, and its popstate handler hard-reloads the
 * page for any entry that lacks it.
 */
function stamp(y: number) {
  return { ...history.state, [SEQ]: { y: Math.round(y) } satisfies SeqState };
}

/**
 * Keeps the URL and title in sync with the page currently in view, turns in-document
 * links between the main pages into scrolls, and keeps the back button working across
 * those scrolls.
 */
export function SequenceScroll({ initial }: { initial: MainPageHref }) {
  const landed = useRef(-1);
  const fullLoad = useRef(false);
  /** href of a click-initiated scroll that has not landed yet. */
  const pending = useRef<string | null>(null);
  const raf = useRef(0);

  const jump = (id: string) => {
    const top = sectionTop(id);
    if (top === null) return;
    window.scrollTo({ top, behavior: "instant" });
    landed.current = window.scrollY;
  };

  // Full document load. The inline script in Sequence already scrolled during parse so
  // nothing is painted at the wrong place, but it ran against a half-parsed document —
  // this is the authoritative jump, with layout complete. Reloads and back/forward keep
  // the browser's restored position.
  useLayoutEffect(() => {
    fullLoad.current = !session.hydrated;
    const release = () => document.querySelector("[data-jump-pending]")?.removeAttribute("data-jump-pending");
    if (!fullLoad.current || initial === "/") return release();
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav && nav.type !== "navigate") return release();
    const page = MAIN_PAGES.find((p) => p.href === initial);
    if (page) jump(page.id);
    release();
  }, [initial]);

  useEffect(() => {
    const page = MAIN_PAGES.find((p) => p.href === initial);
    const timers: number[] = [];
    const cleanups: (() => void)[] = [];
    let current: string = initial;
    /** While false, the landing position is still ours to correct. */
    let takenOver = true;

    const setCurrent = (n: string) => {
      document.documentElement.dataset.page = n;
      // The rail styles itself from html[data-page], but aria-current cannot come from CSS.
      document.querySelectorAll<HTMLElement>("[data-page-tick]").forEach((tick) => {
        if (tick.dataset.n === n) tick.setAttribute("aria-current", "page");
        else tick.removeAttribute("aria-current");
      });
    };

    const sync = (next: MainPage) => {
      setCurrent(next.n);
      // A click owns the URL until its scroll lands, so passing through the middle
      // section on the way does not rewrite the entry it just pushed.
      if (pending.current) return;
      if (next.href === current) return;
      current = next.href;
      history.replaceState(stamp(window.scrollY), "", next.href);
      document.title = next.title;
    };

    const stopSettle = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
    };

    const endPending = () => {
      stopSettle();
      if (!pending.current) return;
      pending.current = null;
      // Reconcile: the target may have been clamped, or the reader may have cut in.
      sync(pageAtScroll());
    };

    /** Watch a click-initiated scroll until it reaches the target or goes still. */
    const settle = (target: number) => {
      stopSettle();
      const start = performance.now();
      let last = window.scrollY;
      let still = 0;
      const step = () => {
        const y = window.scrollY;
        const now = performance.now();
        if (Math.abs(y - target) <= 1) return endPending();
        still = Math.abs(y - last) < 0.5 ? still + 1 : 0;
        last = y;
        // 120ms of grace so the frames before the animation starts don't read as settled.
        if ((still >= 5 && now - start > 120) || now - start > 3000) return endPending();
        raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    };

    if (page && initial !== "/") {
      // Client navigation: runs after the router's own scroll-to-top. A back traversal
      // is on its way to a restored position instead, so leave that one alone.
      const traversal = performance.now() - session.traversedAt < 1000;
      if (!fullLoad.current && !traversal) jump(page.id);
      // Fonts and text splitting shift layout after the jump, and the browser's scroll
      // anchoring compensates by moving us — which a position check reads as the reader
      // scrolling away. Only real input means they have taken over.
      takenOver = landed.current < 0;
      const takeOver = () => {
        takenOver = true;
      };
      const inputs = ["wheel", "touchstart", "keydown"] as const;
      inputs.forEach((type) => window.addEventListener(type, takeOver, { passive: true, once: true }));
      const realign = () => {
        if (!takenOver && !pending.current) jump(page.id);
      };
      document.fonts?.ready.then(realign);
      timers.push(window.setTimeout(realign, 350), window.setTimeout(realign, 900));
      cleanups.push(() => inputs.forEach((type) => window.removeEventListener(type, takeOver)));
    }

    if (page) setCurrent(page.n);

    // The page whose section crosses a line 35% down the viewport is "current".
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const next = MAIN_PAGES.find((p) => p.id === entry.target.id);
          if (next) sync(next);
        }
      },
      { rootMargin: "-35% 0px -65% 0px" }
    );
    MAIN_PAGES.forEach((p) => {
      const el = document.getElementById(p.id);
      if (el) observer.observe(el);
    });

    // Links to /, /work or /about inside the document scroll instead of navigating —
    // but still push a history entry, so back returns the reader to where they were.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank") return;
      const href = anchor.getAttribute("href");
      const next = MAIN_PAGES.find((p) => p.href === href);

      if (!next) {
        // Leaving the sequence. Freeze any in-flight scroll so a view transition does
        // not snapshot a moving page.
        if (pending.current) {
          window.scrollTo({ top: window.scrollY, behavior: "instant" });
          stopSettle();
          pending.current = null;
        }
        return;
      }

      const top = sectionTop(next.id);
      if (top === null) return;
      e.preventDefault();
      e.stopPropagation();

      takenOver = true;
      landed.current = -1;
      const from = window.scrollY;
      if (Math.abs(from - top) < 2) return;

      if (location.pathname === next.href) {
        history.replaceState(stamp(top), "");
      } else {
        history.replaceState(stamp(from), "");
        history.pushState(stamp(top), "", next.href);
      }

      current = next.href;
      document.title = next.title;
      setCurrent(next.n);
      pending.current = next.href;
      window.scrollTo({ top, behavior: prefersReduced() ? "instant" : "smooth" });
      settle(top);
    };
    document.addEventListener("click", onClick, true);

    const onPopState = (e: PopStateEvent) => {
      stopSettle();
      pending.current = null;
      takenOver = true;
      landed.current = -1;

      const seq = (e.state as Record<string, SeqState> | null)?.[SEQ];
      if (seq && typeof seq.y === "number") {
        const y = seq.y;
        window.scrollTo({ top: y, behavior: "instant" });
        // Some engines apply their own remembered offset around popstate; re-assert once.
        requestAnimationFrame(() => {
          if (Math.abs(window.scrollY - y) > 2) window.scrollTo({ top: y, behavior: "instant" });
        });
      }

      // The offset and the href were written together, so the URL already matches what
      // we just restored. Rewriting it here would race Next's own popstate listener.
      const next = MAIN_PAGES.find((p) => p.href === location.pathname);
      if (next) {
        current = next.href;
        document.title = next.title;
        setCurrent(next.n);
      }
    };
    window.addEventListener("popstate", onPopState);

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      cleanups.forEach((fn) => fn());
      stopSettle();
      observer.disconnect();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      delete document.documentElement.dataset.page;
      document.querySelectorAll("[data-page-tick]").forEach((tick) => tick.removeAttribute("aria-current"));
    };
  }, [initial]);

  return null;
}
