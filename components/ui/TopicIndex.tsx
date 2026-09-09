import Link from "next/link";
import type { AboutTopic } from "@/lib/data";
import styles from "./TopicIndex.module.css";

/** Links from a summary page into the pages that carry the detail. */
export function TopicIndex({ topics, base }: { topics: readonly AboutTopic[]; base: string }) {
  return (
    <div className={styles.list}>
      {topics.map((topic) => (
        <Link className={styles.row} href={`${base}/${topic.slug}`} key={topic.slug}>
          <span className={styles.n}>{topic.n}</span>
          <span className={styles.main}>
            <span className={styles.title}>{topic.title}</span>
            <span className={styles.summary}>{topic.summary}</span>
          </span>
          <span className={styles.stat}>{topic.stat}</span>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </Link>
      ))}
    </div>
  );
}
