import { ChipList } from "@/components/ui/Chip";
import type { SystemsProject } from "@/lib/data";
import styles from "./ProjectNotes.module.css";

/** Compact project cards: name, one line on what it is, and what it was built with. */
export function ProjectNotes({ projects }: { projects: readonly SystemsProject[] }) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <article className={styles.item} key={project.name} data-reveal="">
          <h3 className={styles.name}>
            {project.name}
            {project.team && <span className={styles.team}>Team</span>}
          </h3>
          <p className={styles.blurb}>{project.blurb}</p>
          <ChipList items={project.tech} label={`${project.name} stack`} />
        </article>
      ))}
    </div>
  );
}
