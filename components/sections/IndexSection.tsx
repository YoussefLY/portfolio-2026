import Link from "next/link";
import { Byline } from "@/components/Byline";
import { PageHeader } from "@/components/PageHeader";
import { proofStats, featured } from "@/lib/data";
import styles from "./Index.module.css";

export function IndexSection() {
  return (
    <section className="page" id="page-index" data-page-href="/">
      <Byline />
      <PageHeader
        kicker="01 — Index"
        aside="2026"
        size="hero"
        title="I build AI systems that survive production."
        dek="RAG pipelines, agents and voice interfaces, wired into web applications I also build end to end — React and Next.js on the front, FastAPI and Postgres behind it. Four years shipping for clients who keep the thing running after I hand it over."
      >
        <div className={styles.headerLinks}>
          <Link href="/work" className="btn">
            See the work
          </Link>
          <Link href="/about" className="text-link" data-muted="">
            About me
            <span className="text-link-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </PageHeader>

      <div className={`stat-grid ${styles.proof}`}>
        {proofStats.map((stat) =>
          stat.href ? (
            <a
              className="stat stat-link"
              key={stat.label}
              href={stat.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${stat.value} ${stat.label} — see the ranking on committers.top`}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <span className="stat-link-mark" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : (
            <div className="stat" key={stat.label}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ),
        )}
      </div>

      <section className={styles.work} aria-labelledby="selected-work">
        <div className="section-head">
          <h2 id="selected-work" className="kicker">
            Selected work
          </h2>
          <Link href="/work" className="text-link" data-muted="">
            All projects
            <span className="text-link-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
        <div className={styles.cards}>
          {featured.map((item) => {
            const content = (
              <>
                <span className={styles.cardTop}>
                  <span>{item.n}</span>
                  <span>{item.year}</span>
                </span>
                <span className={styles.cardTitle}>{item.title}</span>
                <span className={styles.cardBlurb}>{item.blurb}</span>
                <span className={styles.cardMeta}>
                  <span>
                    {item.stack[0]}
                    <br />
                    {item.stack[1]}
                  </span>
                  <span className={styles.cardAction}>
                    {item.href ? "Case study" : item.spanLabel}
                    {item.href && (
                      <span className={styles.cardArrow} aria-hidden="true">
                        →
                      </span>
                    )}
                  </span>
                </span>
              </>
            );
            return item.href ? (
              <Link className={`${styles.card} ${styles.cardLink}`} href={item.href} key={item.n}>
                {content}
              </Link>
            ) : (
              <div className={styles.card} key={item.n}>
                {content}
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}
