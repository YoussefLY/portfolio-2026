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
 */
function jumpScript(id: string) {
  return `(function(){try{var m=document.currentScript.parentNode;
m.removeAttribute("data-jump-pending");
/* React re-runs this element on a client navigation, which would stamp on a restored
   scroll position. The flag lives on the document, so only the parse-time run scrolls. */
if(window.__seqJumped)return;
window.__seqJumped=1;
var n=performance.getEntriesByType("navigation")[0];
if(n&&n.type!=="navigate")return;
var e=document.getElementById(${JSON.stringify(id)}),t=0;
while(e){t+=e.offsetTop;e=e.offsetParent}
if(t)window.scrollTo(0,t)}catch(_){}})()`;
}

/**
 * Index, Work and About as one continuous document. Scrolling past the end of one
 * page flows straight into the next; the URL follows whichever page fills the viewport.
 */
export function Sequence({ initial }: { initial: MainPageHref }) {
  const landing = initial === "/" ? null : MAIN_PAGES.find((page) => page.href === initial);

  return (
    <main className="main" data-jump-pending={landing ? "" : undefined}>
      {/* Fixed to the viewport edge, so it renders first purely to sit early in the tab order. */}
      <PageIndicator />
      <IndexSection />
      <WorkSection />
      <AboutSection />
      {landing && <script dangerouslySetInnerHTML={{ __html: jumpScript(landing.id) }} />}
      <SequenceScroll initial={initial} />
    </main>
  );
}
