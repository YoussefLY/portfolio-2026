import { Fragment, ViewTransition } from "react";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackPill } from "@/components/BackPill";
import { CaseStudyGate } from "@/components/CaseStudyGate";
import { OnThisPage } from "@/components/OnThisPage";
import { PageNav } from "@/components/PageNav";
import { ReadingProgress } from "@/components/ReadingProgress";
import { SectionReveal } from "@/components/SectionReveal";
import { ShotReveal } from "@/components/ShotReveal";
import { getImageAccent, type ImageAccent } from "@/lib/accent";
import { caseStudies, getCaseStudy } from "@/lib/data";
import styles from "./page.module.css";

const EFFORT_OPACITY = [0.92, 0.66, 0.4, 0.16];

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Not found" };
  const description = study.problem[0];
  return {
    title: study.title,
    description,
    openGraph: {
      title: study.title,
      description,
      type: "article",
      ...(study.heroImage ? { images: [{ url: study.heroImage }] } : {}),
    },
  };
}

/** Paint the mobile browser chrome in the study's own accent. */
export async function generateViewport({ params }: { params: Promise<{ slug: string }> }): Promise<Viewport> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const accent = study?.heroImage ? await getImageAccent(study.heroImage) : null;
  return { themeColor: accent ? accent.ink : "#ffffff" };
}

/**
 * Break a title into plain text, an optional accented word (set in the study data)
 * and the trailing full stop, so the last two can be styled on their own.
 */
function splitTitle(title: string, accentWord?: string) {
  const dot = title.endsWith(".") ? "." : "";
  const text = dot ? title.slice(0, -1) : title;
  const at = accentWord ? text.indexOf(accentWord) : -1;
  if (at < 0 || !accentWord) return { before: text, word: "", after: "", dot };
  return { before: text.slice(0, at), word: accentWord, after: text.slice(at + accentWord.length), dot };
}

function accentVars(accent: ImageAccent | null): React.CSSProperties | undefined {
  return accent
    ? ({
        "--case-accent": accent.hex,
        "--case-accent-ink": accent.ink,
      } as React.CSSProperties)
    : undefined;
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.indexOf(study);
  const next = caseStudies.length > 1 ? caseStudies[(index + 1) % caseStudies.length] : null;

  const accent = study.heroImage ? await getImageAccent(study.heroImage) : null;
  const accentStyle = accentVars(accent);
  const title = splitTitle(study.title, study.titleAccent);
  const figures = study.outcome.figures.filter((figure) => figure.value);
  const weeks = study.approach.weeks ?? 0;
  const phases = study.approach.phases ?? [];
  const ticks = weeks > 0 ? Array.from({ length: Math.floor(weeks / 4) + 1 }, (_, i) => i * 4) : [];

  const meta = [
    { label: "Client", value: study.client },
    { label: "Role", value: study.role },
    { label: "Duration", value: study.duration },
    { label: "Year", value: study.year },
  ];

  return (
    <main
      className={`main page ${styles.caseMain}`}
      style={accentStyle}
      data-accent={accent ? "" : undefined}
    >
      <CaseStudyGate key={study.slug} />
      <ReadingProgress />
      <BackPill href="/work" label="All work" />
      <div className={styles.caseInner}>
        <div className="page-head">
          <span className="kicker">{study.section}</span>
          <span className="kicker">{study.eyebrow}</span>
        </div>

        <header className={styles.hero}>
          <div className={styles.heroText}>
            <Link href="/work" className={`text-link ${styles.back}`} data-muted="">
              <span aria-hidden="true">←</span> All work
            </Link>
            <h1 className="page-title" data-size="display">
              <ViewTransition name={`project-${study.slug}`} share="morph" default="none">
                <span className={styles.titleInner}>
                  {title.before}
                  {title.word && <em className={styles.titleWord}>{title.word}</em>}
                  {title.after}
                  {title.dot && <span className={styles.titleDot}>{title.dot}</span>}
                </span>
              </ViewTransition>
            </h1>
            {/* aria-label is ignored on a generic div, so the list role has to be explicit. */}
            {study.stack && (
              <div className={styles.chips} role="list" aria-label="Stack">
                {study.stack.map((item) => (
                  <span className={styles.chip} role="listitem" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            )}
            <dl className={styles.meta}>
              {meta.map((cell) => (
                <div className={styles.metaCell} key={cell.label}>
                  <dt className={styles.metaLabel}>{cell.label}</dt>
                  <dd className={styles.metaValue}>{cell.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className={styles.figure} data-filled={study.heroImage ? "" : undefined}>
            {study.heroImage ? (
              <ShotReveal>
                <ViewTransition name={`project-image-${study.slug}`} share="morph" default="none">
                  <div className={`${styles.shot} ${styles.shotFilled}`}>
                    <Image
                      src={study.heroImage}
                      alt={`${study.client} — ${study.eyebrow}`}
                      fill
                      sizes="(max-width: 1100px) 100vw, 760px"
                      quality={90}
                      className={styles.shotImage}
                      priority
                    />
                  </div>
                </ViewTransition>
              </ShotReveal>
            ) : (
              <div className={styles.shot}>
                <span className={styles.shotLabel}>Fig. 01 · pending</span>
                <span className={styles.shotLabel}>16:10</span>
              </div>
            )}
          </figure>
        </header>

        <div className={styles.layout}>
          <aside className={styles.rail}>
            <OnThisPage />
          </aside>

          <SectionReveal>
            <div className={styles.content}>
              {/* 01 — Problem */}
              <section className={styles.section} id="problem" data-section aria-labelledby="problem-label">
                <div className="section-head">
                  <h2 id="problem-label" className="kicker">
                    <span className={styles.sectionN}>01</span> · The problem
                  </h2>
                  <span className={`kicker ${styles.sectionTag}`}>Before</span>
                </div>
                <div className={`prose ${styles.prose}`}>
                  {study.problem.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {study.painPoints && (
                  <div
                    className={styles.pains}
                    style={{ "--pain-cols": study.painPoints.length } as React.CSSProperties}
                  >
                    {study.painPoints.map((pain, i) => (
                      <div className={styles.pain} key={pain.label}>
                        <span className={styles.painN}>{String(i + 1).padStart(2, "0")}</span>
                        <span className={styles.painLabel}>{pain.label}</span>
                        <span className={styles.painDetail}>{pain.detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* 02 — Approach */}
              <section className={styles.section} id="approach" data-section aria-labelledby="approach-label">
                <div className="section-head">
                  <h2 id="approach-label" className="kicker">
                    <span className={styles.sectionN}>02</span> · Approach
                  </h2>
                  {weeks > 0 && <span className={`kicker ${styles.sectionTag}`}>{weeks} weeks</span>}
                </div>
                <div className={`prose ${styles.prose}`}>
                  <p>{study.approach.body}</p>
                </div>

                {phases.length > 0 && weeks > 0 && (
                  <div className={styles.timeline} role="img" aria-label="Project phases on a timeline">
                    <div className={styles.timelineHead}>
                      <span />
                      <span className={styles.ticks}>
                        {ticks.map((tick) => (
                          <span key={tick} style={{ left: `${(tick / weeks) * 100}%` }}>
                            W{tick}
                          </span>
                        ))}
                      </span>
                    </div>
                    {phases.map((phase) => (
                      <div className={styles.phase} key={phase.label}>
                        <span className={styles.phaseLabel}>{phase.label}</span>
                        <span className={styles.phaseTrack}>
                          {ticks.map((tick) => (
                            <span
                              key={tick}
                              className={styles.gridline}
                              style={{ left: `${(tick / weeks) * 100}%` }}
                            />
                          ))}
                          <span
                            className={styles.phaseBar}
                            data-bar
                            style={{
                              left: `${(phase.start / weeks) * 100}%`,
                              width: `${((phase.end - phase.start) / weeks) * 100}%`,
                            }}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.effortHead}>Where the effort went · approximate, self-reported</div>
                <div className={styles.effortBar}>
                  {study.approach.effort.map((segment, i) => (
                    <div
                      key={segment.label}
                      data-bar
                      style={
                        {
                          width: `${segment.value}%`,
                          "--effort-mix": `${EFFORT_OPACITY[i] * 100}%`,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
                <div className={styles.effortLegend}>
                  {study.approach.effort.map((segment) => (
                    <span key={segment.label} style={{ flexBasis: `${segment.value}%` }}>
                      <span className={styles.effortValue}>{segment.value}%</span>
                      {segment.label}
                    </span>
                  ))}
                </div>
              </section>

              {/* 03 — Architecture */}
              <section
                className={styles.section}
                id="architecture"
                data-section
                aria-labelledby="architecture-label"
              >
                <div className="section-head">
                  <h2 id="architecture-label" className="kicker">
                    <span className={styles.sectionN}>03</span> · Architecture
                  </h2>
                  <span className={`kicker ${styles.sectionTag}`}>Request path</span>
                </div>
                <div className={styles.flow}>
                  {study.architecture.steps.map((step, i) => (
                    <Fragment key={step.label}>
                      {i > 0 && (
                        <span className={`${styles.connector} flowArrow`} aria-hidden="true">
                          <span className={styles.connectorLine} />
                          <span className={styles.connectorHead} />
                        </span>
                      )}
                      <div
                        className={
                          step.dashed
                            ? `${styles.node} ${styles.nodeDashed} flowStep`
                            : `${styles.node} flowStep`
                        }
                      >
                        <span className={styles.nodeN}>{String(i + 1).padStart(2, "0")}</span>
                        <span className={styles.nodeLabel}>{step.label}</span>
                        <span className={styles.nodeDetail}>{step.detail}</span>
                      </div>
                    </Fragment>
                  ))}
                </div>
                <ul className={styles.bullets}>
                  {study.architecture.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </section>

              {/* 04 — Outcome */}
              <section className={styles.section} id="outcome" data-section aria-labelledby="outcome-label">
                <div className="section-head">
                  <h2 id="outcome-label" className="kicker">
                    <span className={styles.sectionN}>04</span> · Outcome
                  </h2>
                  <span className={`kicker ${styles.sectionTag}`}>After</span>
                </div>
                {figures.length > 0 && (
                  <div className={`stat-grid ${styles.figures}`}>
                    {figures.map((figure) => (
                      <div className="stat" key={figure.label}>
                        <div className="stat-value">{figure.value}</div>
                        <div className="stat-label">{figure.label}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div className={`prose ${styles.prose}`}>
                  <p>{study.outcome.body}</p>
                </div>
              </section>
            </div>
          </SectionReveal>
        </div>

        {next ? (
          <PageNav href={`/work/${next.slug}`} kicker="Next case study" label={next.client} title={next.title} />
        ) : (
          <PageNav href="/work" kicker="Back to" label="Work" title="All six projects, 2023 to 2026." />
        )}
      </div>
    </main>
  );
}
