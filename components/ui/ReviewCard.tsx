import { ChipList } from "@/components/ui/Chip";
import { Rating } from "@/components/ui/Rating";
import type { ClientReview } from "@/lib/data";
import styles from "./ReviewCard.module.css";

/**
 * One completed contract as the client left it: score, window, their words,
 * my reply where there was one, the tags they picked, and how it was billed.
 */
export function ReviewCard({ review }: { review: ClientReview }) {
  return (
    <article className={styles.card} data-reveal="">
      <div className={styles.head}>
        <h2 className={styles.title}>{review.title}</h2>
        <div className={styles.meta}>
          <Rating score={review.score} />
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.period}>{review.period}</span>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.main}>
          <blockquote className={styles.quote}>
            <p className={styles.quoteText}>&ldquo;{review.quote}&rdquo;</p>
          </blockquote>

          {review.response && (
            <div className={styles.response}>
              <span className={styles.label}>My reply</span>
              <p className={styles.responseText}>&ldquo;{review.response}&rdquo;</p>
            </div>
          )}
        </div>

        <div className={styles.aside}>
          {review.endorsements.length > 0 && (
            <div className={styles.endorsed}>
              <span className={styles.label}>Endorsed by client</span>
              <ChipList items={review.endorsements} label="Client endorsements" />
            </div>
          )}

          <div className={styles.facts}>
            {review.meta.map((fact) => (
              <span className={styles.fact} key={fact}>
                {fact}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
