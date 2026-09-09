import styles from "./Rating.module.css";

const STAR =
  "M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.31 6.2 20.36l1.11-6.46-4.7-4.58 6.49-.94z";

function Stars({ count, variant }: { count: number; variant: "empty" | "full" }) {
  return (
    <span className={styles.row}>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} className={`${styles.star} ${styles[variant]}`} viewBox="0 0 24 24">
          <path d={STAR} />
        </svg>
      ))}
    </span>
  );
}

type Props = {
  /** Score out of `max`, e.g. 5 or 4.5. */
  score: number;
  max?: number;
};

/** Star score with its numeric value. Partial scores fill a star proportionally. */
export function Rating({ score, max = 5 }: Props) {
  const clamped = Math.min(Math.max(score, 0), max);
  const filled = `${(clamped / max) * 100}%`;

  return (
    <span className={styles.rating} role="img" aria-label={`Rated ${clamped.toFixed(1)} out of ${max}`}>
      <span className={styles.stars} aria-hidden="true">
        <Stars count={max} variant="empty" />
        <span className={styles.fill} style={{ width: filled }}>
          <Stars count={max} variant="full" />
        </span>
      </span>
      <span className={styles.score} aria-hidden="true">
        {clamped.toFixed(1)}
      </span>
    </span>
  );
}
