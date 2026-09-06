import { ViewTransition } from "react";
import Link from "next/link";
import { HoverPreview } from "@/components/HoverPreview";
import { BarGrow } from "@/components/BarGrow";
import { Byline } from "@/components/Byline";
import { PageBreak } from "@/components/PageBreak";
import { PageHeader } from "@/components/PageHeader";
import { projects } from "@/lib/data";
import styles from "./Work.module.css";

export function WorkSection() {
  const years = projects.map((project) => Number(project.year));
  const range = `${Math.min(...years)}—${Math.max(...years)}`;

  return (
    <section className="page" id="page-work" data-page-href="/work">
      <PageBreak n="02" label="Work" />
      <Byline />
      <PageHeader
        kicker="02 — Work"
        aside={`${projects.length} projects · ${range}`}
        title="Things I built and still stand behind."
        dek="Client contracts and systems work, most recent first. Rows marked as a case study open the full write-up: problem, approach, architecture and outcome."
      />

      <BarGrow>
        <HoverPreview>
        <div className={`${styles.table} ${styles.tableHead}`} aria-hidden="true">
          <span>#</span>
          <span>Project</span>
          <span>Stack</span>
          <span>Span</span>
          <span>Year</span>
        </div>

        {projects.map((project) => {
          const slug = project.href?.split("/").pop();
          const title = (
            <span className={styles.rowTitle}>
              {project.title}
              {project.href && <span className={styles.tag}>Case study</span>}
            </span>
          );
          const content = (
            <>
              <span className={styles.rowN}>{project.n}</span>
              <span className={styles.rowMain}>
                {slug ? (
                  <ViewTransition name={`project-${slug}`} share="morph" default="none">
                    {title}
                  </ViewTransition>
                ) : (
                  title
                )}
                <span className={styles.rowBlurb}>{project.blurb}</span>
                {project.highlights && (
                  <span className={styles.rowHighlights}>{project.highlights.join(" · ")}</span>
                )}
              </span>
              <span className={styles.rowStack}>
                {project.stack[0]}
                <br />
                {project.stack[1]}
              </span>
              <span className={styles.rowSpan}>
                <span className={styles.spanTrack} data-bars="span">
                  <span className={styles.spanFill} data-bar style={{ width: `${project.spanPercent}%` }} />
                </span>
                <span className={styles.spanLabel}>{project.spanLabel}</span>
              </span>
              <span className={styles.rowYear}>{project.year}</span>
            </>
          );
          return project.href ? (
            <Link
              key={project.n}
              href={project.href}
              className={`${styles.table} ${styles.row} ${styles.rowLink}`}
              data-preview-slug={slug}
              data-preview-n={project.n}
              data-preview-src={project.preview}
            >
              {content}
            </Link>
          ) : (
            <div
              key={project.n}
              className={`${styles.table} ${styles.row}`}
              data-preview-slug={project.preview ? project.n : undefined}
              data-preview-n={project.n}
              data-preview-src={project.preview}
            >
              {content}
            </div>
          );
        })}

        </HoverPreview>
        <p className="note">Span bars are relative to the longest engagement · Client work shown with permission</p>
      </BarGrow>

    </section>
  );
}
