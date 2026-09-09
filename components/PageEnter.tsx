"use client";

import { useEffect, type ReactNode } from "react";
import { session } from "@/lib/session";
import styles from "./PageEnter.module.css";

let firstMount = true;

/**
 * Marks the end of the first mount for anything that needs to tell a full document
 * load from a client navigation. There is no entrance animation here on purpose:
 * gating the whole document on hydration cost ~1.4s of blank screen on a throttled
 * connection. Arrival motion belongs to the hero — see PageHeader and LineReveal.
 */
export function PageEnter({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!firstMount) return;
    firstMount = false;
    // Children's effects ran before this one, so they saw hydrated === false on a full load.
    session.hydrated = true;
  }, []);

  return (
    <div className={styles.enter} data-page>
      {children}
    </div>
  );
}
