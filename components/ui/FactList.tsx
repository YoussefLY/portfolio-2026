import styles from "./FactList.module.css";

/** Short one-line facts, dash-marked. Used for Now and Uses. */
export function FactList({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li className={styles.item} key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
