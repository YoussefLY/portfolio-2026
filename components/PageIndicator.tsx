import { MAIN_PAGES } from "@/lib/pages";
import styles from "./PageIndicator.module.css";

/**
 * Fixed page ticks on the right edge. The current page is set on
 * <html data-page> by SequenceScroll, so this needs no JavaScript of its own.
 */
export function PageIndicator() {
  return (
    <nav className={styles.rail} aria-label="Pages">
      {MAIN_PAGES.map((page) => (
        <a
          key={page.href}
          href={page.href}
          className={styles.item}
          data-n={page.n}
          data-page-tick=""
          /* The label is hidden at rest and gone entirely below 860px, so the link
             would otherwise have no accessible name at all. */
          aria-label={page.label}
        >
          <span className={styles.tick} />
          <span className={styles.n}>{page.n}</span>
          <span className={styles.label} aria-hidden="true">
            {page.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
