export const proofStats = [
  { value: "11", label: "Contracts delivered" },
  { value: "100%", label: "Job success · Top rated" },
  { value: "2,427", label: "Commits, last 12 months" },
];

export const featured = [
  {
    n: "01",
    title: "Full-Stack Procurement ERP",
    blurb:
      "Tender, supplier and approval workflows for a large procurement team. Replaced a spreadsheet process end to end.",
    meta: ["OCP GROUP", "NEXT.JS · FASTAPI · PG"],
    href: "/work/procurement-erp",
  },
  {
    n: "02",
    title: "AI Agent Integration — SMS + CRM",
    blurb:
      "Autonomous agent that qualifies inbound leads over SMS and writes structured records straight into the CRM.",
    meta: ["CLIENT · 2026", "LANGCHAIN · VAPI"],
    href: "/work",
  },
  {
    n: "03",
    title: "webserv — HTTP server in C++98",
    blurb:
      "Non-blocking I/O, file-descriptor multiplexing and CGI handling, written from the socket layer up.",
    meta: ["OPEN SOURCE", "C++ · SOCKETS"],
    href: "/work",
  },
];

export type Project = {
  n: string;
  title: string;
  blurb: string;
  stack: [string, string];
  spanPercent: number;
  spanLabel: string;
  year: string;
  href?: string;
};

export const projects: Project[] = [
  {
    n: "01",
    title: "Full-Stack Procurement ERP",
    blurb: "Tender, supplier and approval workflows for a large procurement team.",
    stack: ["NEXT.JS · FASTAPI", "POSTGRES · DOCKER"],
    spanPercent: 100,
    spanLabel: "6 MO · SOLO",
    year: "2026",
    href: "/work/procurement-erp",
  },
  {
    n: "02",
    title: "AI Agent Integration — SMS + CRM",
    blurb: "Lead qualification over SMS with structured writes into the client's CRM.",
    stack: ["LANGCHAIN · VAPI", "FASTAPI"],
    spanPercent: 33,
    spanLabel: "2 MO · SOLO",
    year: "2026",
  },
  {
    n: "03",
    title: "Multi-language Car Rental SaaS",
    blurb: "Booking, fleet and pricing across three locales. Role: CTO of a two-person team.",
    stack: ["REACT · NODE.JS", "POSTGRES · STRIPE"],
    spanPercent: 67,
    spanLabel: "4 MO · LEAD",
    year: "2025",
  },
  {
    n: "04",
    title: "AI-Powered YouTube Thumbnails",
    blurb: "Title and thumbnail generation for a creator analytics product.",
    stack: ["NEXT.JS · OPENAI", "CHROMADB"],
    spanPercent: 50,
    spanLabel: "3 MO · SOLO",
    year: "2025",
  },
  {
    n: "05",
    title: "webserv",
    blurb: "HTTP/1.1 server in C++98 — non-blocking I/O, fd multiplexing, CGI.",
    stack: ["C++98 · SOCKETS", "CGI"],
    spanPercent: 33,
    spanLabel: "2 MO · PAIR",
    year: "2024",
  },
  {
    n: "06",
    title: "cub3d",
    blurb: "Raycasting renderer in C with the MLX library and hand-rolled pixel work.",
    stack: ["C · RAYCASTING", "MLX"],
    spanPercent: 17,
    spanLabel: "1 MO · SOLO",
    year: "2023",
  },
];

export const portfolioMix = [
  { label: "AI & AGENTS · 2", percent: 34 },
  { label: "WEB APPS · 2", percent: 33 },
  { label: "SYSTEMS · 2", percent: 33 },
];

export const education = [
  {
    school: "42 Network — 1337 Coding School",
    detail: "Computer engineering · 2022—2024",
  },
  {
    school: "AEU University",
    detail: "BSc Information Technology · 2020—2023",
  },
];

export const stackByProjects = [
  { label: "Python", percent: 100, count: 4 },
  { label: "Next.js", percent: 75, count: 3 },
  { label: "Postgres", percent: 75, count: 3 },
  { label: "FastAPI", percent: 50, count: 2 },
  { label: "C / C++", percent: 50, count: 2 },
  { label: "LangChain", percent: 25, count: 1 },
];

export const contractHistory = [
  { title: "Senior Software Engineer", barLeft: 0, barWidth: 70, rating: "—" },
  { title: "AI agent dashboard configuration", barLeft: 10, barWidth: 40, rating: "—" },
  { title: "Full-Stack AI Agent Integration (SMS + CRM)", barLeft: 30, barWidth: 20, rating: "—" },
  { title: "Rebranding & RAG Integration", barLeft: 10, barWidth: 20, rating: "5.0" },
  { title: "Custom MCP Integration", barLeft: 0, barWidth: 20, rating: "5.0" },
];

export const contractMonths = ["NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"];

export const testimonial = {
  quote:
    "He grasps requirements quickly, asks the right clarifying questions, and turns ideas into polished, reliable solutions with minimal back-and-forth.",
  attribution: "Client · Rebranding & RAG integration · 5.0",
};

export type CaseStudy = {
  slug: string;
  section: string;
  eyebrow: string;
  title: string;
  client: string;
  role: string;
  duration: string;
  year: string;
  heroImage?: string;
  problem: string[];
  approach: {
    body: string;
    effort: { label: string; value: number }[];
  };
  architecture: {
    steps: { label: string; detail: string; dashed?: boolean }[];
    bullets: string[];
  };
  outcome: {
    figures: { label: string; value?: string }[];
    body: string;
  };
};

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "procurement-erp",
    section: "03 — Case 01",
    eyebrow: "Enterprise procurement",
    title: "Retiring the spreadsheet that ran every tender.",
    client: "OCP Group",
    role: "Full-stack developer",
    duration: "6 months, solo",
    year: "2025—2026",
    problem: [
      "A whole procurement department ran out of a shared spreadsheet. Approvals happened over email, supplier records were duplicated across teams, and nobody could answer how much was committed this quarter without a manual reconciliation.",
      "The brief asked for a dashboard. The actual problem was that the process had no system of record.",
    ],
    approach: {
      body: "I modelled tenders, suppliers and approval chains first, then built the UI on top of that — not the other way round. Role-based permissions were in from day one, because procurement data is political.",
      effort: [
        { label: "DATA MODEL", value: 28 },
        { label: "UI", value: 30 },
        { label: "INTEGRATION", value: 24 },
        { label: "HANDOVER", value: 18 },
      ],
    },
    architecture: {
      steps: [
        { label: "Buyer", detail: "browser" },
        { label: "Next.js", detail: "SSR tables" },
        { label: "FastAPI", detail: "state machine" },
        { label: "Postgres", detail: "audited" },
        { label: "Pinecone", detail: "tender search", dashed: true },
      ],
      bullets: [
        "Server-rendered tables built for 10k-row scroll without pagination hacks",
        "Every approval is an audited state transition, not a mutable row",
        "Semantic search over historical tenders so buyers stop re-negotiating solved deals",
        "Dockerised deploy with staged migrations and a rollback path the client can run",
      ],
    },
    outcome: {
      figures: [
        { label: "Time to close the quarter, before → after" },
        { label: "Seats live at first rollout" },
        { label: "Incidents since handover" },
      ],
      body: "Handed over with runbooks and a two-week pairing period. Their internal team has been shipping on it since, without me.",
    },
  },
];
