import type { ReactNode } from "react";
import Link from "next/link";
import { LineReveal } from "@/components/LineReveal";
import styles from "./PageHeader.module.css";

type Props = {
  /** Left kicker, e.g. "02 — Work". */
  kicker: string;
  /** Right kicker, e.g. a date range or location. */
  aside?: string;
  /** Optional back link rendered above the title. */
  back?: { href: string; label: string };
  title: ReactNode;
  dek?: ReactNode;
  size?: "title" | "display" | "hero";
  /** Line-by-line reveal of the title. Off when the title takes part in a view transition. */
  reveal?: boolean;
  /** Rendered in the right column under the dek — stats, secondary nav, etc. */
  children?: ReactNode;
};

export function PageHeader({ kicker, aside, back, title, dek, size = "title", reveal = true, children }: Props) {
  return (
    <header className={styles.header}>
      <div className="page-head">
        <span className="kicker">{kicker}</span>
        {aside && <span className="kicker">{aside}</span>}
      </div>
      <div className={styles.grid}>
        <div className={styles.left}>
          {back && (
            <Link href={back.href} className={`text-link ${styles.back}`} data-muted="">
              <span className={styles.backArrow} aria-hidden="true">
                ←
              </span>
              {back.label}
            </Link>
          )}
          <h1 className="page-title" data-size={size}>
            {reveal ? <LineReveal>{title}</LineReveal> : title}
          </h1>
        </div>
        {(dek || children) && (
          <div className={styles.right}>
            {dek && <p className="page-dek">{dek}</p>}
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
