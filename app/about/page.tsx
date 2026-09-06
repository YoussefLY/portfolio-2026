import type { Metadata } from "next";
import { Sequence } from "@/components/Sequence";

const description =
  "Youssef Labrahmi — trained at 42, shipping AI-adjacent client work from Rabat. RAG, agents, and voice interfaces that survive handover.";

export const metadata: Metadata = {
  title: "About",
  description,
  openGraph: { title: "About", description },
};

export default function AboutPage() {
  return <Sequence initial="/about" />;
}
