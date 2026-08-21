import type { Metadata } from "next";
import Image from "next/image";
import { Sidebar } from "@/components/Sidebar";
import { education, stackByProjects, contractHistory, contractMonths, testimonial } from "@/lib/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Youssef Labrahmi — trained at 42, shipping AI-adjacent client work from Rabat. RAG, agents, and voice interfaces that survive handover.",
  openGraph: {
    title: "About",
    description:
      "Youssef Labrahmi — trained at 42, shipping AI-adjacent client work from Rabat. RAG, agents, and voice interfaces that survive handover.",
  },
};

export default function AboutPage() {
  return (
    <div className="shell">
      <Sidebar
        beforeNav={
          <div className={styles.portrait}>
            <Image src="/portrait.jpg" alt="Youssef Labrahmi" width={720} height={720} priority />
          </div>
        }
        footer={
          <>
            <a className="footerLink" href="https://github.com/Labrahmi" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a className="footerLink" href="https://linkedin.com/in/labrahmiy" target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </>
        }
      />
      <main className="main">
        <div className="page-head">
          <span className="kicker">04 — About</span>
          <span className="kicker">Rabat, Morocco</span>
        </div>

        <h2 className={styles.title}>Trained at 42. Sharpened on other people&rsquo;s deadlines.</h2>

        <div className={styles.layout}>
          <div className={styles.copy}>
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
            <div className="kicker">Education</div>
            {education.map((entry) => (
              <div className={styles.eduEntry} key={entry.school}>
                <div className={styles.eduSchool}>{entry.school}</div>
                <div className={styles.eduDetail}>{entry.detail}</div>
              </div>
            ))}
            <div className={`kicker ${styles.stackHead}`}>Stack, by projects shipped</div>
            <div className={styles.stackList}>
              {stackByProjects.map((item) => (
                <div className={styles.stackRow} key={item.label}>
                  <span className={styles.stackLabel}>{item.label}</span>
                  <span className={styles.stackTrack}>
                    <span className={styles.stackFill} style={{ width: `${item.percent}%` }} />
                  </span>
                  <span className={styles.stackCount}>{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.contracts}>
          <div className={styles.contractsHead}>
            <span className="kicker">Contracts, last 10 months</span>
            <span className="kicker">11 total · 100% job success</span>
          </div>
          <div className={styles.contractsTable}>
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
                    style={{ left: `${entry.barLeft}%`, width: `${entry.barWidth}%` }}
                  />
                </span>
                <span className={entry.rating === "—" ? styles.rating : `${styles.rating} ${styles.ratingScored}`}>
                  {entry.rating}
                </span>
              </div>
            ))}
          </div>
          <div className={styles.contractsNote}>Overlapping bars = concurrent contracts</div>
        </div>

        <blockquote className={styles.quote}>
          <p className={styles.quoteText}>&ldquo;{testimonial.quote}&rdquo;</p>
          <footer className={styles.quoteFooter}>{testimonial.attribution}</footer>
        </blockquote>

        <div className={styles.cta}>
          <div className={styles.ctaText}>Got something that needs to survive production?</div>
          <a className={styles.ctaButton} href="mailto:hello@labrahmi.dev">
            Book a call
          </a>
        </div>
      </main>
    </div>
  );
}
