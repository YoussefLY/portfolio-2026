import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { projects, portfolioMix } from "@/lib/data";
import styles from "./page.module.css";

export default function WorkPage() {
  return (
    <div className="shell">
      <Sidebar
        afterNav={
          <div className={styles.mix}>
            <span className="kicker">Portfolio mix</span>
            <div className={styles.mixBars}>
              {portfolioMix.map((slice, i) => (
                <div
                  key={slice.label}
                  style={{
                    width: `${slice.percent}%`,
                    background: `rgba(17,17,16,${0.92 - i * 0.37})`,
                  }}
                />
              ))}
            </div>
            <div className={styles.mixLegend}>
              {portfolioMix.map((slice) => (
                <span key={slice.label}>{slice.label}</span>
              ))}
            </div>
          </div>
        }
        footer={<div className="footerNote">Client work shown with permission; some screens redacted.</div>}
      />
      <main className="main">
        <div className="page-head">
          <span className="kicker">02 — Selected work</span>
          <span className="kicker">6 shown · 2023—2026</span>
        </div>

        <h2 className={styles.title}>Things I built and still stand behind.</h2>

        <div className={`${styles.table} ${styles.tableHead}`}>
          <span>#</span>
          <span>Project</span>
          <span>Stack</span>
          <span>Span</span>
          <span>Year</span>
        </div>

        {projects.map((project) => {
          const content = (
            <>
              <span className={styles.rowN}>{project.n}</span>
              <span>
                <span className={styles.rowTitle}>{project.title}</span>
                <span className={styles.rowBlurb}>{project.blurb}</span>
              </span>
              <span className={styles.rowStack}>
                {project.stack[0]}
                <br />
                {project.stack[1]}
              </span>
              <span>
                <span className={styles.spanTrack}>
                  <span className={styles.spanFill} style={{ width: `${project.spanPercent}%` }} />
                </span>
                <span className={styles.spanLabel}>{project.spanLabel}</span>
              </span>
              <span className={styles.rowYear}>{project.year}</span>
            </>
          );
          const rowClassName = `${styles.table} ${styles.row}`;
          return project.href ? (
            <Link key={project.n} href={project.href} className={rowClassName}>
              {content}
            </Link>
          ) : (
            <div key={project.n} className={rowClassName}>
              {content}
            </div>
          );
        })}

        <div className={styles.note}>
          Span bars are relative to the longest engagement · 150 repositories on GitHub
        </div>
      </main>
    </div>
  );
}
