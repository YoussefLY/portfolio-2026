import type { Metadata } from "next";
import { Sequence } from "@/components/Sequence";

const description =
  "Projects I built and still stand behind — procurement systems, AI agents, and systems programming from 2023 to 2026.";

export const metadata: Metadata = {
  title: "Work",
  description,
  openGraph: { title: "Work", description },
};

export default function WorkPage() {
  return <Sequence initial="/work" />;
}
