import { Fragment } from "react";
import { notFound } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { OnThisPage } from "@/components/OnThisPage";
import { caseStudies } from "@/lib/data";
import styles from "./page.module.css";

const EFFORT_OPACITY = [0.92, 0.66, 0.4, 0.16];

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  return (
    <div className="shell">
      <Sidebar afterNav={<OnThisPage />} />
      <main className="main">
        <div className="page-head">
          <span className="kicker">{study.section}</span>
          <span className="kicker">{study.eyebrow}</span>
        </div>

        <h2 className={styles.title}>{study.title}</h2>

        <div className={styles.meta}>
          <div className={styles.metaCell}>
            <div className={styles.metaLabel}>Client</div>
            <div className={styles.metaValue}>{study.client}</div>
          </div>
          <div className={styles.metaCell}>
            <div className={styles.metaLabel}>Role</div>
            <div className={styles.metaValue}>{study.role}</div>
          </div>
          <div className={styles.metaCell}>
            <div className={styles.metaLabel}>Duration</div>
            <div className={styles.metaValue}>{study.duration}</div>
          </div>
          <div className={styles.metaCell}>
            <div className={styles.metaLabel}>Year</div>
            <div className={styles.metaValue}>{study.year}</div>
          </div>
        </div>

        <div className={styles.shot}>
          <span className={styles.shotLabel}>Drop image — dashboard, full width</span>
        </div>

        <div className={`${styles.section} ${styles.sectionFirst}`} id="problem">
          <div className={styles.sectionLabel}>The problem</div>
          <div className={styles.body}>
            {study.problem.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div className={styles.section} id="approach">
          <div className={styles.sectionLabel}>Approach</div>
          <div>
            <div className={styles.body}>
              <p>{study.approach.body}</p>
            </div>
            <div className={styles.effortHead}>Where the effort went · approximate, self-reported</div>
            <div className={styles.effortBar}>
              {study.approach.effort.map((segment, i) => (
                <div
                  key={segment.label}
                  style={{ width: `${segment.value}%`, background: `rgba(17,17,16,${EFFORT_OPACITY[i]})` }}
                />
              ))}
            </div>
            <div className={styles.effortLegend}>
              {study.approach.effort.map((segment) => (
                <span key={segment.label}>
                  {segment.label} {segment.value}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.section} id="architecture">
          <div className={styles.sectionLabel}>Architecture</div>
          <div>
            <div className={styles.flow}>
              {study.architecture.steps.map((step, i) => (
                <Fragment key={step.label}>
                  {i > 0 && <span className={styles.flowArrow}>→</span>}
                  <div className={step.dashed ? `${styles.flowStep} ${styles.flowStepDashed}` : styles.flowStep}>
                    {step.label}
                    <br />
                    <span className={styles.flowDetail}>{step.detail}</span>
                  </div>
                </Fragment>
              ))}
            </div>
            <ul className={styles.bullets}>
              {study.architecture.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.section} id="outcome">
          <div className={styles.sectionLabel}>Outcome</div>
          <div>
            <div className={styles.figures}>
              {study.outcome.figures.map((figure) => (
                <div className={styles.figure} key={figure.label}>
                  <div className={styles.figureValue}>[ figure ]</div>
                  <div className={styles.figureLabel}>{figure.label}</div>
                </div>
              ))}
            </div>
            <div className={styles.figuresNote}>Placeholder slots — drop in your real figures</div>
            <p className={styles.outcomeBody}>{study.outcome.body}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
