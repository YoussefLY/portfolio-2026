import assert from "node:assert/strict";
import { test } from "node:test";
import { aboutTopics, caseStudies, featured, projects } from "./data";

function caseStudySlug(href: string | undefined) {
  if (!href) return null;
  const match = href.match(/^\/work\/([^/]+)$/);
  return match?.[1] ?? null;
}

test("every /work/:slug href resolves to a case study", () => {
  const slugs = new Set(caseStudies.map((study) => study.slug));
  const hrefs = [...projects.map((project) => project.href), ...featured.map((item) => item.href)];

  for (const href of hrefs) {
    const slug = caseStudySlug(href);
    if (!slug) continue;
    assert.ok(slugs.has(slug), `href "${href}" has no matching caseStudies[].slug`);
  }
});

test("about topic slugs are unique and URL-safe", () => {
  const slugs = aboutTopics.map((topic) => topic.slug);
  assert.equal(new Set(slugs).size, slugs.length, "two about topics share a slug");

  for (const slug of slugs) {
    assert.match(slug, /^[a-z0-9-]+$/, `slug "${slug}" is not URL-safe`);
  }
});

test("about topic numbers run in order from 01", () => {
  aboutTopics.forEach((topic, i) => {
    assert.equal(topic.n, String(i + 1).padStart(2, "0"), `topic "${topic.slug}" is numbered wrong`);
  });
});
