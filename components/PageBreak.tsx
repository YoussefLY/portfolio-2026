import { LineReveal } from "@/components/LineReveal";
import { ParallaxNumeral } from "@/components/ParallaxNumeral";
import styles from "./PageBreak.module.css";

/** Chapter opener between two pages of the continuous document. */
export function PageBreak({ n, label }: { n: string; label: string }) {
  return (
    <div className={styles.break} data-break="" aria-hidden="true">
      <span className={styles.rule} />
      <div className={styles.inner}>
        <ParallaxNumeral>
          <span className={styles.numeral}>
            <span className={styles.outline}>{n}</span>
            <span className={styles.fill}>{n}</span>
          </span>
        </ParallaxNumeral>
        <span className={styles.label}>
          <span className={styles.kicker}>Page {n} of 03</span>
          <span className={styles.name}>
            <LineReveal>{label}</LineReveal>
          </span>
        </span>
      </div>
    </div>
  );
}
