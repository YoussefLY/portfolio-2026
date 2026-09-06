"use client";

import { useEffect, useState } from "react";
import styles from "./OnThisPage.module.css";

const SECTIONS = [
  { id: "problem", n: "01", label: "The problem" },
  { id: "approach", n: "02", label: "Approach" },
  { id: "architecture", n: "03", label: "Architecture" },
  { id: "outcome", n: "04", label: "Outcome" },
];

export function OnThisPage() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const activeIndex = SECTIONS.findIndex((section) => section.id === active);

  return (
    <nav className={styles.toc} aria-label="On this page">
      <span className={`kicker ${styles.head}`}>On this page</span>
      <ol className={styles.links}>
        <span className={styles.progress} aria-hidden="true" />
        {SECTIONS.map((section, i) => {
          const isActive = active === section.id;
          const isDone = i < activeIndex;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                data-done={isDone ? "" : undefined}
                className={isActive ? `${styles.link} ${styles.linkActive}` : styles.link}
              >
                <span className={styles.n}>{section.n}</span>
                <span className={styles.label}>{section.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
