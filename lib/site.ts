export const SITE_NAME = "Youssef Labrahmi";
export const SITE_TAGLINE = "Full-stack AI engineer";
export const SITE_DESCRIPTION =
  "RAG pipelines, agents and voice interfaces, wired into web applications built end to end — React and Next.js on the front, FastAPI and Postgres behind it.";

export const CONTACT = {
  email: "hello@labrahmi.dev",
  github: "https://github.com/Labrahmi",
  linkedin: "https://linkedin.com/in/labrahmiy",
} as const;

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
