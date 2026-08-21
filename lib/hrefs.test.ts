import assert from "node:assert/strict";
import { test } from "node:test";
import { caseStudies, featured, projects } from "./data";

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
