import { BarGrow } from "@/components/BarGrow";
import { Byline } from "@/components/Byline";
import { PageBreak } from "@/components/PageBreak";
import { PageHeader } from "@/components/PageHeader";
import { QuoteCtaReveal } from "@/components/QuoteCtaReveal";
import { education, now, stackByProjects, contractHistory, contractMonths, testimonial, uses } from "@/lib/data";
import styles from "./About.module.css";

export function AboutSection() {
  return (
    <section className="page" id="page-about" data-page-href="/about">
      <PageBreak n="03" label="About" />
      <Byline />
      <PageHeader
        kicker="03 — About"
        aside="Rabat, Morocco"
        title="Trained at 42. Sharpened on other people's deadlines."
        dek="Four years of client work, mostly solo, occasionally as technical lead. Systems first, frameworks second."
      />

      <div className={styles.layout}>
        <div className="prose">
          <p>
            I came up through 42 Network&rsquo;s peer-learning system, which means I learned C and systems
            programming before I learned a framework. That order matters: I know what the abstractions are
            hiding.
          </p>
          <p>
            Since then I&rsquo;ve spent four years shipping for clients — mostly solo, occasionally as the
            technical lead. Most of that work is now AI-adjacent: retrieval systems that answer from a
            company&rsquo;s own documents, agents that handle a workflow end to end, voice interfaces that
            don&rsquo;t feel like a phone tree.
          </p>
          <p>
            I work in English, Arabic and French, and I explain technical decisions in whichever one you prefer
            — in plain terms, not architecture astronomy.
          </p>
        </div>
        <div className={styles.side}>
          <div className="section-head">
            <span className="kicker">Education</span>
          </div>
          {education.map((entry) => (
            <div className={styles.eduEntry} key={entry.school}>
              <div className={styles.eduSchool}>{entry.school}</div>
              <div className={styles.eduDetail}>{entry.detail}</div>
            </div>
          ))}
          <div className={`section-head ${styles.stackHead}`}>
            <span className="kicker">Stack, by projects shipped</span>
          </div>
          <BarGrow>
            <div className={styles.stackList} data-bars="stack">
              {stackByProjects.map((item) => (
                <div className={styles.stackRow} key={item.label}>
                  <span className={styles.stackLabel}>{item.label}</span>
                  <span className={styles.stackTrack}>
                    <span className={styles.stackFill} data-bar style={{ width: `${item.percent}%` }} />
                  </span>
                  <span className={styles.stackCount}>{item.count}</span>
                </div>
              ))}
            </div>
          </BarGrow>
        </div>
      </div>

      <div className={styles.nowUses}>
        <section aria-labelledby="now-title">
          <div className="section-head">
            <h2 id="now-title" className="kicker">
              Now
            </h2>
            <span className="kicker">Sep 2026</span>
          </div>
          <ul className={styles.plainList}>
            {now.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="uses-title">
          <div className="section-head">
            <h2 id="uses-title" className="kicker">
              Uses
            </h2>
          </div>
          <ul className={styles.plainList}>
            {uses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className={styles.contracts} aria-labelledby="contracts-title">
        <div className="section-head">
          <h2 id="contracts-title" className="kicker">
            Contracts, last 10 months
          </h2>
          <span className="kicker">11 total · 100% job success</span>
        </div>
        <BarGrow>
          <div className={styles.contractsTable} data-bars="table">
            <div className={styles.contractsCols}>
              <span />
              <span className={styles.months}>
                {contractMonths.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </span>
              <span className={styles.ratingHead}>RATING</span>
            </div>
            {contractHistory.map((entry) => (
              <div className={styles.contractRow} key={entry.title}>
                <span className={styles.contractTitle}>{entry.title}</span>
                <span className={styles.barTrack}>
                  <span
                    className={styles.barFill}
                    data-bar
                    style={{ left: `${entry.barLeft}%`, width: `${entry.barWidth}%` }}
                  />
                </span>
                <span className={entry.rating === "—" ? styles.rating : `${styles.rating} ${styles.ratingScored}`}>
                  {entry.rating}
                </span>
              </div>
            ))}
          </div>
        </BarGrow>
        <p className="note">Overlapping bars = concurrent contracts</p>
      </section>

      <QuoteCtaReveal>
        <blockquote className={styles.quote} data-reveal="quote">
          <p className={styles.quoteText}>&ldquo;{testimonial.quote}&rdquo;</p>
          <footer className={styles.quoteFooter}>{testimonial.attribution}</footer>
        </blockquote>

      </QuoteCtaReveal>
    </section>
  );
}
