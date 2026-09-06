"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./BackPill.module.css";

type Props = { href: string; label: string };

/** Floating "back to parent" link on sub-pages, shown once the header scrolls away. */
export function BackPill({ href, label }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > 240);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Link href={href} className={styles.pill} data-visible={visible ? "" : undefined}>
      <span aria-hidden="true">←</span>
      {label}
    </Link>
  );
}
