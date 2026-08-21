import { heatmapCells } from "@/lib/heatmap";
import styles from "./Heatmap.module.css";

const LEGEND_OPACITY = [0.07, 0.22, 0.44, 0.68, 0.92];

export function Heatmap() {
  const cells = heatmapCells(371, 7, 10);

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <span className="kicker">Contribution activity</span>
        <span className="kicker">Aug 2025 — Aug 2026</span>
      </div>
      <div className={styles.months}>
        <span>SEP</span>
        <span>NOV</span>
        <span>JAN</span>
        <span>MAR</span>
        <span>MAY</span>
        <span>JUL</span>
      </div>
      <div className={styles.grid}>
        {cells.map((style, i) => (
          <div key={i} style={style} />
        ))}
      </div>
      <div className={styles.legend}>
        <span>Less</span>
        {LEGEND_OPACITY.map((op) => (
          <span key={op} className={styles.legendCell} style={{ background: "var(--accent)", opacity: op }} />
        ))}
        <span>More</span>
        <span className={styles.legendNote}>93% commits · 7% pull requests</span>
      </div>
    </div>
  );
}
