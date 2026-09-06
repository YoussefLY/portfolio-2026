import { AboutSection } from "@/components/sections/AboutSection";
import { IndexSection } from "@/components/sections/IndexSection";
import { PageIndicator } from "@/components/PageIndicator";
import { WorkSection } from "@/components/sections/WorkSection";
import { SequenceScroll } from "@/components/SequenceScroll";
import type { MainPageHref } from "@/lib/pages";

/**
 * Index, Work and About as one continuous document. Scrolling past the end of one
 * page flows straight into the next; the URL follows whichever page fills the viewport.
 * Landing on /work or /about jumps to that page before it becomes visible.
 */
export function Sequence({ initial }: { initial: MainPageHref }) {
  return (
    <main className="main">
      <IndexSection />
      <WorkSection />
      <AboutSection />
      <SequenceScroll initial={initial} />
      <PageIndicator />
    </main>
  );
}
