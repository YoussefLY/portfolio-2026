import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Not found",
  description: "This page is not on the site.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="main page">
      <PageHeader
        kicker="404"
        aside="Page not found"
        title="This page isn't on the site."
        dek="The URL may have moved, or it never existed. The work index is the shortest way back."
      />
      <div className={styles.actions}>
        <Link className="btn" href="/work">
          See the work
        </Link>
        <Link className="text-link" href="/">
          Back to index
        </Link>
      </div>
    </main>
  );
}
