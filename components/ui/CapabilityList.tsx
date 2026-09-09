import type { CapabilityGroup } from "@/lib/data";
import styles from "./CapabilityList.module.css";

/** Skill areas, each a labelled run of terms. */
export function CapabilityList({ groups }: { groups: readonly CapabilityGroup[] }) {
  return (
    <div className={styles.grid}>
      {groups.map((group) => (
        <div className={styles.group} key={group.area}>
          <h3 className={styles.area}>{group.area}</h3>
          <p className={styles.items}>{group.items.join(" · ")}</p>
        </div>
      ))}
    </div>
  );
}
