import type { Metadata } from "next";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { Heatmap } from "@/components/Heatmap";
import { proofStats, featured } from "@/lib/data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} — ${SITE_TAGLINE}` },
  description: SITE_DESCRIPTION,
};

export default function IndexPage() {
  return (
    <div className="shell">
      <Sidebar
        showStatus
        footer={
          <>
            <a className="footerLink" href="https://github.com/Labrahmi" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a className="footerLink" href="https://linkedin.com/in/labrahmiy" target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a className="footerLink" href="mailto:hello@labrahmi.dev">
              hello@labrahmi.dev
            </a>
          </>
        }
      />
      <main className="main">
        <div className="page-head">
          <span className="kicker">01 — Index</span>
          <span className="kicker">2026</span>
        </div>

        <h1 className={styles.hero}>I build AI systems that survive production.</h1>
        <p className={styles.dek}>
          RAG pipelines, agents and voice interfaces, wired into web applications I also build end to end — React
          and Next.js on the front, FastAPI and Postgres behind it. Four years shipping for clients who keep the
          thing running after I hand it over.
        </p>

        <div className={styles.proof}>
          {proofStats.map((stat) => (
            <div className={styles.proofCell} key={stat.label}>
              <div className={styles.proofValue}>{stat.value}</div>
              <div className={styles.proofLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        <Heatmap />

        <div className={styles.work}>
          <div className={`${styles.workHead} kicker`}>Selected work</div>
          {featured.map((item) => (
            <Link className={styles.row} href={item.href} key={item.n}>
              <span className={styles.rowN}>{item.n}</span>
              <span>
                <span className={styles.rowTitle}>{item.title}</span>
                <span className={styles.rowBlurb}>{item.blurb}</span>
              </span>
              <span className={styles.rowMeta}>
                {item.meta[0]}
                <br />
                {item.meta[1]}
              </span>
              <span className={styles.rowArrow}>→</span>
            </Link>
          ))}
          <Link href="/work" className={styles.allProjects}>
            All projects
          </Link>
        </div>
      </main>
    </div>
  );
}
