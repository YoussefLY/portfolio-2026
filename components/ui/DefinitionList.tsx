import styles from "./DefinitionList.module.css";

export type Definition = {
  term: string;
  detail: string;
  /** Optional third line, e.g. a grade or a completion note. */
  note?: string;
};

type Props = {
  entries: readonly Definition[];
  /** "stacked" puts the detail under the term; "inline" pushes it to the right edge. */
  layout?: "stacked" | "inline";
};

/** Term-and-detail pairs separated by hairlines. */
export function DefinitionList({ entries, layout = "stacked" }: Props) {
  return (
    <dl className={styles.list} data-layout={layout}>
      {entries.map((entry) => (
        <div className={styles.entry} key={entry.term}>
          <dt className={styles.term}>{entry.term}</dt>
          <dd className={styles.detail}>{entry.detail}</dd>
          {entry.note && <dd className={styles.note}>{entry.note}</dd>}
        </div>
      ))}
    </dl>
  );
}
