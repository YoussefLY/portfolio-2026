import styles from "./StatBars.module.css";

export type StatBar = { label: string; percent: number; count: number };

/**
 * Labelled horizontal bars with a trailing count. The `data-bar` hooks let a
 * surrounding `BarGrow` animate the fills on scroll.
 */
export function StatBars({ items }: { items: readonly StatBar[] }) {
  return (
    <div className={styles.list} data-bars="stack">
      {items.map((item) => (
        <div className={styles.row} key={item.label}>
          <span className={styles.label}>{item.label}</span>
          <span className={styles.track}>
            <span className={styles.fill} data-bar style={{ width: `${item.percent}%` }} />
          </span>
          <span className={styles.count}>{item.count}</span>
        </div>
      ))}
    </div>
  );
}
