import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackPill } from "@/components/BackPill";
import { BarGrow } from "@/components/BarGrow";
import { PageHeader } from "@/components/PageHeader";
import { PageNav } from "@/components/PageNav";
import { CapabilityList } from "@/components/ui/CapabilityList";
import { ProjectNotes } from "@/components/ui/ProjectNotes";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { RoleList } from "@/components/ui/RoleList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatBars } from "@/components/ui/StatBars";
import {
  aboutTopics,
  capabilities,
  clientReviews,
  experience,
  getAboutTopic,
  stackByProjects,
  systemsProjects,
} from "@/lib/data";
import { CONTACT } from "@/lib/site";
import styles from "./page.module.css";

export function generateStaticParams() {
  return aboutTopics.map((topic) => ({ topic: topic.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getAboutTopic(slug);
  if (!topic) return { title: "Not found" };
  return {
    title: topic.title,
    description: topic.dek,
    openGraph: { title: topic.title, description: topic.dek, type: "profile" },
  };
}

function TopicBody({ slug }: { slug: string }) {
  switch (slug) {
    case "experience":
      return (
        <RevealGroup>
          <RoleList roles={experience} />
        </RevealGroup>
      );

    case "capabilities":
      return (
        <>
          <CapabilityList groups={capabilities} />
          <section className={styles.stack} aria-labelledby="stack-title">
            <SectionHeading id="stack-title" title="Stack, by projects shipped" aside="Nine shipped projects" />
            <BarGrow>
              <StatBars items={stackByProjects} />
            </BarGrow>
          </section>
        </>
      );

    case "systems":
      return (
        <RevealGroup>
          <ProjectNotes projects={systemsProjects} />
        </RevealGroup>
      );

    case "feedback":
      return (
        <>
          <RevealGroup>
            <div className={styles.reviews}>
              {clientReviews.map((review) => (
                <ReviewCard key={review.title} review={review} />
              ))}
            </div>
          </RevealGroup>
          <p className={`note ${styles.source}`}>
            Published on completed contracts ·{" "}
            <a className="text-link" data-muted="" href={CONTACT.upwork} target="_blank" rel="noreferrer">
              Full history on Upwork
              <span className="text-link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </p>
        </>
      );

    default:
      return null;
  }
}

export default async function AboutTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params;
  const topic = getAboutTopic(slug);
  if (!topic) notFound();

  const index = aboutTopics.indexOf(topic);
  const next = aboutTopics[index + 1];
  const total = String(aboutTopics.length).padStart(2, "0");

  return (
    <main className={`main page ${styles.topicMain}`}>
      <BackPill href="/about" label="About" />
      <div className={styles.inner}>
        <PageHeader
          kicker={`About · ${topic.n} of ${total}`}
          aside={topic.eyebrow}
          back={{ href: "/about", label: "About" }}
          title={topic.heading}
          dek={topic.dek}
        />

        <div className={styles.body}>
          <TopicBody slug={topic.slug} />
        </div>

        {next ? (
          <PageNav href={`/about/${next.slug}`} kicker="Next" label={next.title} title={next.heading} />
        ) : (
          <PageNav href="/about" kicker="Back to" label="About" title="The short version, and the rest of the site." />
        )}
      </div>
    </main>
  );
}
