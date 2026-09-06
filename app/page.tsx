import type { Metadata } from "next";
import { Sequence } from "@/components/Sequence";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} — ${SITE_TAGLINE}` },
  description: SITE_DESCRIPTION,
};

export default function IndexPage() {
  return <Sequence initial="/" />;
}
