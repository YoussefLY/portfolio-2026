"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { MAIN_PAGES, type MainPageHref } from "@/lib/pages";
import { session } from "@/lib/session";

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

/**
 * Keeps the URL and title in sync with the page currently in view, turns in-document
 * links between the main pages into smooth scrolls, and jumps to the requested
 * page on arrival.
 */
export function SequenceScroll({ initial }: { initial: MainPageHref }) {
  const landed = useRef(-1);
  const fullLoad = useRef(false);

  const jump = (id: string) => {
    const top = sectionTop(id);
    if (top === null) return;
    window.scrollTo({ top, behavior: "instant" });
    landed.current = window.scrollY;
  };

  // Full document load: jump before the page becomes visible (PageEnter keeps it
  // hidden until its own layout effect, which runs after this one). Reloads and
  // back/forward keep the browser's restored position.
  useLayoutEffect(() => {
    fullLoad.current = !session.hydrated;
    if (!fullLoad.current || initial === "/") return;
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav && nav.type !== "navigate") return;
    const page = MAIN_PAGES.find((p) => p.href === initial);
    if (page) jump(page.id);
  }, [initial]);

  useEffect(() => {
    const page = MAIN_PAGES.find((p) => p.href === initial);
    const timers: number[] = [];
    if (page && initial !== "/") {
      // Client-side navigation: runs after the router's own scroll-to-top.
      if (!fullLoad.current) jump(page.id);
      // Fonts and text splitting can shift layout after the jump; re-align
      // while the reader has not scrolled away from where we put them.
      const realign = () => {
        if (landed.current >= 0 && Math.abs(window.scrollY - landed.current) < 2) jump(page.id);
      };
      document.fonts?.ready.then(realign);
      timers.push(window.setTimeout(realign, 350), window.setTimeout(realign, 900));
    }

    let current: string = initial;

    const setCurrent = (n: string) => {
      document.documentElement.dataset.page = n;
    };
    const sync = (href: string, title: string, n: string) => {
      setCurrent(n);
      if (href === current) return;
      current = href;
      history.replaceState(history.state, "", href);
      document.title = title;
    };
    const initialPage = MAIN_PAGES.find((p) => p.href === initial);
    if (initialPage) setCurrent(initialPage.n);

    // The page whose section crosses a line 35% down the viewport is "current".
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const page = MAIN_PAGES.find((p) => p.id === entry.target.id);
          if (page) sync(page.href, page.title, page.n);
        }
      },
      { rootMargin: "-35% 0px -65% 0px" }
    );
    MAIN_PAGES.forEach((page) => {
      const el = document.getElementById(page.id);
      if (el) observer.observe(el);
    });

    // Links to /, /work or /about inside the document scroll instead of navigating.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank") return;
      const href = anchor.getAttribute("href");
      const page = MAIN_PAGES.find((p) => p.href === href);
      if (!page) return;
      const top = sectionTop(page.id);
      if (top === null) return;
      e.preventDefault();
      e.stopPropagation();
      window.scrollTo({ top, behavior: "smooth" });
    };
    document.addEventListener("click", onClick, true);

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      observer.disconnect();
      document.removeEventListener("click", onClick, true);
      delete document.documentElement.dataset.page;
    };
  }, [initial]);

  return null;
}
