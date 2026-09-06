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
        <a key={page.href} href={page.href} className={styles.item} data-n={page.n}>
          <span className={styles.tick} />
          <span className={styles.n}>{page.n}</span>
          <span className={styles.label}>{page.label}</span>
        </a>
      ))}
    </nav>
  );
}
