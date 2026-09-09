import type { ReactNode } from "react";
import styles from "./Chip.module.css";

/** A single static tag pill. */
export function Chip({ children }: { children: ReactNode }) {
  return <span className={styles.chip}>{children}</span>;
}

/** A wrapping row of tag pills, e.g. the endorsements a client selected. */
export function ChipList({ items, label }: { items: string[]; label?: string }) {
  if (items.length === 0) return null;

  return (
    <ul className={styles.list} aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Chip>{item}</Chip>
        </li>
      ))}
    </ul>
  );
}
