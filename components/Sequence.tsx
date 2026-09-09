import { AboutSection } from "@/components/sections/AboutSection";
import { IndexSection } from "@/components/sections/IndexSection";
import { PageIndicator } from "@/components/PageIndicator";
import { WorkSection } from "@/components/sections/WorkSection";
import { SequenceScroll } from "@/components/SequenceScroll";
import { MAIN_PAGES, type MainPageHref } from "@/lib/pages";

/**
 * Runs while the document is still parsing, after the sections exist but before the
 * first paint, so a direct load of /work or /about lands on the right section without
 * ever showing the top of the document. Skipped on reload and back/forward so the
 * browser's own restored position wins. `data-jump-pending` holds the paint in the
 * gap between parse and this script; SequenceScroll clears it too, as a safety net.
 *
 * Wrapped in a container's innerHTML rather than rendered as a <script> element: React
 * does not execute script elements it renders on the client and warns about them, while
 * scripts arriving inside innerHTML are inert by spec. Both give the behaviour wanted
 * here — run once, during the server-rendered document's parse, and never again.
 */
function jumpMarkup(id: string) {
  return `<script>(function(){try{
var m=document.querySelector("[data-jump-pending]");
if(m)m.removeAttribute("data-jump-pending");
var n=performance.getEntriesByType("navigation")[0];
if(n&&n.type!=="navigate")return;
var e=document.getElementById(${JSON.stringify(id)}),t=0;
while(e){t+=e.offsetTop;e=e.offsetParent}
if(t)window.scrollTo(0,t)}catch(_){}})()</script>`;
}

/**
 * Index, Work and About as one continuous document. Scrolling past the end of one
 * page flows straight into the next; the URL follows whichever page fills the viewport.
 */
export function Sequence({ initial }: { initial: MainPageHref }) {
  const landing = initial === "/" ? null : MAIN_PAGES.find((page) => page.href === initial);

  return (
    <main
      className="main"
      data-jump-pending={landing ? "" : undefined}
      /* The script below strips this during parse, i.e. before hydration, so the
         attribute is meant to differ by the time React looks. */
      suppressHydrationWarning
    >
      {/* Fixed to the viewport edge, so it renders first purely to sit early in the tab order. */}
      <PageIndicator />
      <IndexSection />
      <WorkSection />
      <AboutSection />
      {landing && <div hidden dangerouslySetInnerHTML={{ __html: jumpMarkup(landing.id) }} />}
      <SequenceScroll initial={initial} />
    </main>
  );
}
