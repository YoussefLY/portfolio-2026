"use client";

import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";

const SECTIONS = [
  { id: "problem", label: "The problem" },
  { id: "approach", label: "Approach" },
  { id: "architecture", label: "Architecture" },
  { id: "outcome", label: "Outcome" },
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
      { rootMargin: "-15% 0px -70% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.extra} aria-label="On this page">
      <span className="kicker">On this page</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 14 }}>
        {SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={isActive ? "location" : undefined}
              className={isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
              style={{ padding: "5px 0", fontSize: 12.5 }}
            >
              <span className={isActive ? `${styles.navBar} ${styles.navBarActive}` : styles.navBar} />
              {section.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
