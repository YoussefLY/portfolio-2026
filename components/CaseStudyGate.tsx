"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { LoadingScreen } from "./LoadingScreen";

/** How long the loading screen is held before it fades, so it never just flickers. */
const HOLD_MS = 450;

/**
 * Every arrival on a case study, whether a full load or a client navigation, goes through
 * a brief loading screen and lands at the top of the page. Mount it keyed by slug.
 */
export function CaseStudyGate() {
  const [phase, setPhase] = useState<"holding" | "leaving" | "done">("holding");

  // Before the first paint, put the viewport at the top regardless of where the user came from.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setPhase(reduce ? "done" : "leaving"), HOLD_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (phase === "done") return null;
  return <LoadingScreen leaving={phase === "leaving"} onTransitionEnd={() => setPhase("done")} />;
}
