import { Byline } from "@/components/Byline";
import { PageBreak } from "@/components/PageBreak";
import { PageHeader } from "@/components/PageHeader";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { FactList } from "@/components/ui/FactList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TopicIndex } from "@/components/ui/TopicIndex";
import { aboutTopics, education, languages, now, uses } from "@/lib/data";
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
            Right now that means a multi-tenant B2B SaaS built on an agent architecture — an action registry
            carrying permissions and reversibility, graded autonomy, dry-run previews and per-run cost caps, so
            the thing can be trusted to act on its own.
          </p>
          <p>
            I work in English, Arabic and French, and I explain technical decisions in whichever one you prefer
            — in plain terms, not architecture astronomy.
          </p>
        </div>

        <div className={styles.side}>
          <section className={styles.sideBlock} aria-labelledby="education-title">
            <SectionHeading id="education-title" title="Education" />
            <DefinitionList entries={education} />
          </section>

          <section className={styles.sideBlock} aria-labelledby="languages-title">
            <SectionHeading id="languages-title" title="Languages" />
            <DefinitionList entries={languages} layout="inline" />
          </section>
        </div>
      </div>

      <div className={styles.nowUses}>
        <section aria-labelledby="now-title">
          <SectionHeading id="now-title" title="Now" aside="Sep 2026" />
          <FactList items={now} />
        </section>
        <section aria-labelledby="uses-title">
          <SectionHeading id="uses-title" title="Uses" />
          <FactList items={uses} />
        </section>
      </div>

      <section className={styles.block} aria-labelledby="detail-title">
        <SectionHeading id="detail-title" title="In detail" aside="Four pages" />
        <TopicIndex topics={aboutTopics} base="/about" />
      </section>
    </section>
  );
}
