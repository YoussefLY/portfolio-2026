import { LiveClock } from "@/components/LiveClock";
import { lastPushDate, relativeDay } from "@/lib/github";
import { CONTACT, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import styles from "./Byline.module.css";

/** Identity strip at the top of each main page — there is no global header. */
export async function Byline() {
  const push = await lastPushDate();

  return (
    <div className={styles.byline}>
      <div className={styles.who}>
        <span className={styles.name}>{SITE_NAME}</span>
        <span className={styles.role}>{SITE_TAGLINE}</span>
      </div>
      <div className={styles.side}>
        <span className={styles.signal}>
          <LiveClock />
        </span>
        {push && (
          <span className={`${styles.signal} ${styles.push}`}>
            Last push {relativeDay(push)}
          </span>
        )}
        <span className={styles.status}>
          <span className={styles.dot} />
          Available
        </span>
        <a className="text-link" data-muted="" href={`mailto:${CONTACT.email}`}>
          {CONTACT.email}
        </a>
      </div>
    </div>
  );
}
