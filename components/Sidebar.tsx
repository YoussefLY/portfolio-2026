"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./Sidebar.module.css";

const NAV = [
  { href: "/", label: "Index" },
  { href: "/work", label: "Selected work" },
  { href: "/work/procurement-erp", label: "Case studies" },
  { href: "/about", label: "About" },
];

export function Sidebar({
  showStatus = false,
  beforeNav,
  afterNav,
  footer,
}: {
  showStatus?: boolean;
  beforeNav?: ReactNode;
  afterNav?: ReactNode;
  footer?: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <aside className={styles.aside}>
      <Link href="/" className={styles.name}>
        Youssef Labrahmi
      </Link>
      <div className={styles.role}>Full-stack AI engineer</div>
      {showStatus && (
        <>
          <div className={styles.location}>
            Rabat, Morocco
            <br />
            UTC+1 · 4–8h response
          </div>
          <div className={styles.status}>
            <span className={styles.dot} />
            <span className={styles.statusLabel}>Available for work</span>
          </div>
        </>
      )}
      {beforeNav}
      <nav className={styles.nav}>
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
            >
              <span className={active ? `${styles.navBar} ${styles.navBarActive}` : styles.navBar} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      {afterNav}
      <div className={styles.spacer} />
      {footer && <div className={styles.footer}>{footer}</div>}
    </aside>
  );
}
