import { CONTACT, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import styles from "./SiteFooter.module.css";

const PROFILES = [
  { label: "GitHub", href: CONTACT.github },
  { label: "LinkedIn", href: CONTACT.linkedin },
  { label: "Upwork", href: CONTACT.upwork },
] as const;

/**
 * The one place contact lives. The Byline is per-page identity and drops its
 * email below 860px; this strip closes every route at every width.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.who}>
        <span className={styles.name}>{SITE_NAME}</span>
        <span className={styles.role}>{SITE_TAGLINE}</span>
        <span className={styles.status}>
          <span className={styles.dot} />
          Available
        </span>
      </div>

      <div className={styles.links}>
        <a className={`text-link ${styles.email}`} href={`mailto:${CONTACT.email}`}>
          {CONTACT.email}
        </a>
        {PROFILES.map((profile) => (
          <a
            className={`text-link ${styles.profile}`}
            data-muted=""
            key={profile.label}
            href={profile.href}
            target="_blank"
            rel="noreferrer"
          >
            {profile.label}
            <span className="text-link-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </div>
    </footer>
  );
}
