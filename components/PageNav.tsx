import Link from "next/link";
import styles from "./PageNav.module.css";

type Props = {
  href: string;
  /** Small label above the title, e.g. "Next" or "Next case study". */
  kicker?: string;
  label: string;
  title: string;
};

/** Full-width "continue to" strip so every page ends with somewhere to go. */
export function PageNav({ href, kicker = "Next", label, title }: Props) {
  return (
    <Link href={href} className={styles.nav}>
      <span className={styles.kicker}>
        <span className="kicker">{kicker}</span>
        <span className={styles.label}>{label}</span>
      </span>
      <span className={styles.title}>{title}</span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}
