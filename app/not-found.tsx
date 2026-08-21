import type { Metadata } from "next";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Not found",
  description: "This page is not on the site.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="shell">
      <Sidebar
        footer={
          <>
            <Link className="footerLink" href="/">
              Index
            </Link>
            <Link className="footerLink" href="/work">
              Selected work
            </Link>
          </>
        }
      />
      <main className="main">
        <div className="page-head">
          <span className="kicker">404</span>
          <span className="kicker">Page not found</span>
        </div>
        <h1 className={styles.title}>This page isn&rsquo;t on the site.</h1>
        <p className={styles.body}>
          The URL may have moved, or it never existed. The work index is still the shortest way back.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="/work">
            Selected work
          </Link>
          <Link className={styles.secondary} href="/">
            Back to index
          </Link>
        </div>
      </main>
    </div>
  );
}
