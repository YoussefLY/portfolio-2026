# Next steps

Status: 4 routes implemented (`/`, `/work`, `/work/procurement-erp`, `/about`) from the unified-shell design (`Portfolio 2026.dc.html`, turn 2 / options 2a–2d). Build, lint, and `npm audit` are clean. This document tracks what's left before this is a finished, deployable site. Work top to bottom — later items assume earlier ones are done.

## Blocking — fix before deploy

1. **`public/resume.pdf` does not exist.** [`app/about/page.tsx`](../app/about/page.tsx) links "Download résumé" to `/resume.pdf`. It 404s right now. Either add the file or remove the link — do not ship a dead link.
2. **No git repository.** `git init`, commit, push to a remote. Nothing in this project is under version control yet.
3. **No deploy target configured.** Stack is Next.js 16 App Router — Vercel is the path of least resistance. Run `vercel link` and `vercel --prod` once the above are fixed, or wire up whatever host you actually want.
4. **Per-page metadata is missing.** [`app/layout.tsx`](../app/layout.tsx) sets one root `<title>`/`description` for the whole site. Add a `generateMetadata` (or exported `metadata`) to each of `app/page.tsx`, `app/work/page.tsx`, `app/work/[slug]/page.tsx`, `app/about/page.tsx` — distinct titles, descriptions, and Open Graph tags. Without this every shared link renders the same title card.
5. **No favicon / OG image.** Nothing in `app/` provides `icon.png` or `opengraph-image.png`. Add both — Next picks up `app/icon.png` and `app/opengraph-image.png` automatically, no config needed.

## Content debt

6. **Five of six projects have no case study.** [`lib/data.ts`](../lib/data.ts) `caseStudies` array has exactly one entry (`procurement-erp`). The other five rows in `projects` (AI Agent SMS+CRM, Car Rental SaaS, YouTube Thumbnails, webserv, cub3d) render as plain unlinked table rows in `/work` — no `href`, because there's nothing to link to. Write the remaining case studies with the same rigor as the OCP one (real problem/approach/architecture/outcome, not filler) and add them to `caseStudies`, then set `href` on the corresponding `projects` entries. Do not write vague case studies just to fill the array — an unlinked row is honest; a thin case study is not.
7. **Case study screenshot slots are placeholders.** The diagonal-hatch `.shot` block in [`app/work/[slug]/page.tsx`](../app/work/[slug]/page.tsx) and the `[ figure ]` outcome slots in [`lib/data.ts`](../lib/data.ts) (`outcome.figures`) are intentional placeholders, not bugs. Replace with real screenshots (`next/image`, put files under `public/case-studies/`) and real numbers before this is public-facing. Do not invent numbers to fill the slots.
8. **Portrait is a cropped GitHub avatar screenshot.** [`public/portrait.jpg`](../public/portrait.jpg) was cropped out of a low-res profile screenshot as a stand-in. Replace with an actual photo shot for this purpose — current one will look soft at anything above ~400px display width.
9. **"Book a call" is a bare `mailto:`.** [`app/about/page.tsx`](../app/about/page.tsx) CTA and the index footer both point to `mailto:hello@labrahmi.dev`. Confirm that inbox is actually monitored, or swap for a scheduling link (Cal.com / Calendly) if you want to control availability instead of triaging email.
10. **Verify `hello@labrahmi.dev` is a live, deliverable address** before this ships — it was carried over verbatim from the design mock, not re-verified against DNS/MX.

## Infrastructure

11. **No sitemap or robots.txt.** Add `app/sitemap.ts` and `app/robots.ts` (Next's file-convention route handlers) once the case-study routes are finalized — don't generate a sitemap against URLs that are still going to change.
12. **No analytics.** Decide on Vercel Analytics / Plausible / nothing, and wire it into `app/layout.tsx` deliberately — don't default to a tracker you haven't chosen on purpose.
13. **`npm audit` is clean today; it will not stay that way.** Next 16 / React 19 / eslint-config-next 16 are all new-ish majors. Run `npm outdated` and `npm audit` before each deploy, not just once.
14. **No automated tests.** There's no client-side logic complex enough to need unit tests yet (the heatmap PRNG in [`lib/heatmap.ts`](../lib/heatmap.ts) is the only pure-logic candidate), but if `caseStudies`/`projects` in `lib/data.ts` grow, add a smoke test that every `projects[].href` resolves to a real `caseStudies[].slug` — that link is currently unchecked at build time and Next won't catch a typo until someone clicks it.

## Polish

15. **Mobile breakpoint is a single `@media (max-width: 860px)` pass, not device-tested.** Every `*.module.css` file has one media query stacking the sidebar and collapsing grids. It was checked in a resized browser viewport only — test on an actual phone (Safari iOS in particular) before calling responsive done.
16. **No accessibility audit performed.** Color contrast (`--muted: #6f6d67` on white is borderline for small text), focus states on the nav links and table rows, and keyboard-only navigation through the case-study scroll-spy ([`components/OnThisPage.tsx`](../components/OnThisPage.tsx)) haven't been checked. Run axe or Lighthouse and fix what it finds.
17. **404 page is Next's unstyled default.** No `app/not-found.tsx` exists — a bad `/work/[slug]` URL falls through to the generic "This page could not be found." Add a styled one if that matters to you.
18. **`components/OnThisPage.tsx` hardcodes its four section IDs** (`problem`, `approach`, `architecture`, `outcome`). If a future case study needs a different section structure, this component won't adapt — it assumes every case study has exactly these four sections in this order, matching [`app/work/[slug]/page.tsx`](../app/work/[slug]/page.tsx)'s fixed layout. Revisit if case studies diverge in shape.
