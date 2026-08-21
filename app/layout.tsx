import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Youssef Labrahmi — Full-stack AI engineer",
  description:
    "RAG pipelines, agents and voice interfaces, wired into web applications built end to end — React and Next.js on the front, FastAPI and Postgres behind it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetBrainsMono.variable}>
      <body>{children}</body>
    </html>
  );
}
