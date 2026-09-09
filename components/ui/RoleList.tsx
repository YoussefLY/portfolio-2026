import type { Role } from "@/lib/data";
import styles from "./RoleList.module.css";

/** Employment history as a timeline: window on the left, what happened on the right. */
export function RoleList({ roles }: { roles: readonly Role[] }) {
  return (
    <div className={styles.list}>
      {roles.map((role) => (
        <article className={styles.role} key={`${role.company}-${role.period}`} data-reveal="">
          <div className={styles.when}>
            <span className={styles.period}>{role.period}</span>
            <span className={styles.location}>{role.location}</span>
            {role.current && <span className={styles.current}>Current</span>}
          </div>

          <div className={styles.what}>
            <h3 className={styles.position}>{role.position}</h3>
            <p className={styles.company}>
              {role.company}
              {role.client && <span className={styles.client}> · for {role.client}</span>}
            </p>
            <ul className={styles.points}>
              {role.highlights.map((point) => (
                <li className={styles.point} key={point}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
