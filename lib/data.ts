export type ProofStat = { value: string; label: string; href?: string };

export const proofStats: ProofStat[] = [
  { value: "11", label: "Contracts delivered" },
  { value: "100%", label: "Job success · Top rated" },
  {
    value: "2,427",
    label: "Commits, last 12 months",
    href: "https://committers.top/morocco_private#:~:text=labrahmi",
  },
];

export type Project = {
  n: string;
  title: string;
  blurb: string;
  /** Two or three concrete things the project did, shown under the blurb. */
  highlights?: string[];
  stack: [string, string];
  spanPercent: number;
  spanLabel: string;
  year: string;
  href?: string;
  /** Upwork portfolio entry backing this row. */
  proof?: string;
  /** Shown on the index page. */
  featured?: boolean;
  /** Small screenshot shown on hover in the work table (public/ path). */
  preview?: string;
};

/** Span bars are relative to the longest engagement (6 months). */
export const projects: Project[] = [
  {
    n: "01",
    title: "Full-Stack Procurement ERP",
    blurb: "Tender, supplier and approval workflows for OCP Group's procurement team, in three languages.",
    highlights: ["Real-time chat module", "WebSocket notification system", "Multi-language from day one"],
    stack: ["NEXT.JS · NESTJS", "POSTGRES · DOCKER · K8S"],
    spanPercent: 100,
    spanLabel: "6 MO · SOLO",
    year: "2026",
    href: "/work/procurement-erp",
    proof: "https://www.upwork.com/freelancers/labrahmi?p=1970829133766356992",
    featured: true,
    preview: "/case-studies/procurement-erp-preview.webp",
  },
  {
    n: "02",
    title: "AI Agent Integration — SMS + CRM",
    blurb: "Lead qualification over SMS with structured writes into the client's CRM.",
    highlights: ["Autonomous qualification flow", "Structured CRM records, not transcripts"],
    stack: ["LANGCHAIN · VAPI", "FASTAPI"],
    spanPercent: 33,
    spanLabel: "2 MO · SOLO",
    year: "2026",
    href: "/work/sms-crm-agent",
    featured: true,
  },
  {
    n: "03",
    title: "Enterprise MCP Integration",
    blurb: "A secure Model Context Protocol gateway so LLM agents can read internal CRM data on Azure.",
    highlights: ["Read-only FastAPI tool service", "Key Vault secrets, Redis cache, rate limiting", "Cloud-native deployment, documented"],
    stack: ["FASTAPI · AZURE", "REDIS · KEY VAULT"],
    spanPercent: 33,
    spanLabel: "2 MO · SOLO",
    year: "2026",
    href: "/work/mcp-gateway",
    proof: "https://www.upwork.com/freelancers/labrahmi?p=2009368425513316352",
    featured: true,
    preview: "/case-studies/mcp-gateway-preview.webp",
  },
  {
    n: "04",
    title: "AI Presentation Engine + RAG",
    blurb: "PPTX designs converted into schema-based React components, plus a RAG system behind a rebranded dashboard.",
    highlights: ["PowerPoint-to-TSX mapping layer", "AI image placeholders for asset generation", "Rebrand and RAG integration over FastAPI"],
    stack: ["REACT · TYPESCRIPT", "FASTAPI · RAG"],
    spanPercent: 33,
    spanLabel: "2 MO · SOLO",
    year: "2026",
    href: "/work/presentation-engine-rag",
    proof: "https://www.upwork.com/freelancers/labrahmi?p=2009367202185105408",
    preview: "/case-studies/presentation-engine-rag-preview.webp",
  },
  {
    n: "05",
    title: "AI-Powered YouTube Thumbnails",
    blurb: "NanoBanana Pro thumbnail generation integrated into 1of10's creator product.",
    highlights: ["Led the model integration end to end", "Generation pipeline in FastAPI on Postgres"],
    stack: ["FASTAPI · REACT", "POSTGRES · NANOBANANA"],
    spanPercent: 50,
    spanLabel: "3 MO · SOLO",
    year: "2025",
    href: "/work/youtube-thumbnails",
    proof: "https://www.upwork.com/freelancers/labrahmi?p=2009365790926106624",
    preview: "/case-studies/youtube-thumbnails-preview.webp",
  },
  {
    n: "06",
    title: "Multi-language Car Rental SaaS",
    blurb: "Carey: booking, fleet and operations platform built from scratch as CTO of a two-person team.",
    highlights: ["Real-time availability and booking", "Admin, driver and customer roles", "Messaging and automated email notifications"],
    stack: ["NEXT.JS · PRISMA", "POSTGRES · VERCEL"],
    spanPercent: 67,
    spanLabel: "4 MO · CTO",
    year: "2025",
    href: "/work/car-rental-saas",
    proof: "https://www.upwork.com/freelancers/labrahmi?p=1970847197503873024",
    preview: "/case-studies/car-rental-saas-preview.webp",
  },
  {
    n: "07",
    title: "Bookstore REST API + web app",
    blurb: "Inventory, authors and orders API with a React front end and sales insights.",
    highlights: ["Express and MongoDB API with clear endpoints", "Genre popularity and profit reporting"],
    stack: ["NODE.JS · EXPRESS", "MONGODB · REACT"],
    spanPercent: 17,
    spanLabel: "1 MO · SOLO",
    year: "2024",
    href: "/work/bookstore-api",
    proof: "https://www.upwork.com/freelancers/labrahmi?p=1767728261784752128",
  },
  {
    n: "08",
    title: "webserv",
    blurb: "HTTP/1.1 server in C++98 — non-blocking I/O, fd multiplexing, CGI.",
    stack: ["C++98 · SOCKETS", "CGI"],
    spanPercent: 33,
    spanLabel: "2 MO · PAIR",
    year: "2024",
    href: "/work/webserv",
  },
  {
    n: "09",
    title: "cub3d",
    blurb: "Raycasting renderer in C with the MLX library and hand-rolled pixel work.",
    stack: ["C · RAYCASTING", "MLX"],
    spanPercent: 17,
    spanLabel: "1 MO · SOLO",
    year: "2023",
    href: "/work/cub3d",
  },
];

export const featured = projects.filter((project) => project.featured);

export const now = [
  "Building an SMS lead-qualification agent with structured CRM writes",
  "Reading: Designing Data-Intensive Applications, second pass",
  "Open to contracts from October 2026",
];

export const uses = [
  "MacBook Pro M3 · Cursor · Ghostty · Raycast",
  "Next.js · FastAPI · Postgres · Docker",
  "LangChain · Vapi · Pinecone · OpenAI",
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
  { label: "React", percent: 100, count: 5 },
  { label: "FastAPI", percent: 80, count: 4 },
  { label: "Postgres", percent: 80, count: 4 },
  { label: "Next.js", percent: 40, count: 2 },
  { label: "Node.js", percent: 40, count: 2 },
  { label: "C / C++", percent: 40, count: 2 },
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
  /** Short stack chips shown next to the meta grid. */
  stack?: string[];
  problem: string[];
  /** What was broken before, shown as a card row under the problem. */
  painPoints?: { label: string; detail: string }[];
  approach: {
    body: string;
    effort: { label: string; value: number }[];
    /** Phases on a timeline; start/end are in weeks from kickoff. */
    phases?: { label: string; start: number; end: number }[];
    /** Total length of the timeline in weeks. */
    weeks?: number;
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
    section: "02 — Case 01",
    eyebrow: "Enterprise procurement",
    title: "Retiring the spreadsheet that ran every tender.",
    client: "OCP Group",
    role: "Full-stack developer",
    duration: "6 months, solo",
    year: "2025—2026",
    heroImage: "/case-studies/procurement-erp.webp",
    stack: ["Next.js", "NestJS", "Postgres", "Docker", "Kubernetes"],
    problem: [
      "A whole procurement department ran out of a shared spreadsheet. Approvals happened over email, supplier records were duplicated across teams, and nobody could answer how much was committed this quarter without a manual reconciliation.",
      "The brief asked for a dashboard. The actual problem was that the process had no system of record.",
    ],
    painPoints: [
      {
        label: "Approvals by email",
        detail: "Sign-off lived in inbox threads. The audit trail was whoever had kept the thread.",
      },
      {
        label: "Three supplier lists",
        detail: "Each team kept its own copy, so one vendor could exist under three different IDs.",
      },
      {
        label: "No committed figure",
        detail: "Answering “how much is committed this quarter” took a week of manual reconciliation.",
      },
    ],
    approach: {
      body: "I modelled tenders, suppliers and approval chains first, then built the UI on top of that — not the other way round. Role-based permissions were in from day one, because procurement data is political.",
      effort: [
        { label: "DATA MODEL", value: 28 },
        { label: "UI", value: 30 },
        { label: "INTEGRATION", value: 24 },
        { label: "HANDOVER", value: 18 },
      ],
      weeks: 26,
      phases: [
        { label: "Discovery", start: 0, end: 3 },
        { label: "Data model", start: 2, end: 8 },
        { label: "Build", start: 6, end: 18 },
        { label: "Integration", start: 14, end: 22 },
        { label: "Handover", start: 22, end: 26 },
      ],
    },
    architecture: {
      steps: [
        { label: "Buyer", detail: "browser" },
        { label: "Next.js", detail: "SSR tables" },
        { label: "NestJS", detail: "state machine · ws" },
        { label: "Postgres", detail: "audited" },
        { label: "Pinecone", detail: "tender search", dashed: true },
      ],
      bullets: [
        "Server-rendered tables built for 10k-row scroll without pagination hacks",
        "Every approval is an audited state transition, not a mutable row",
        "Real-time chat and WebSocket notifications so approvals stop living in email",
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
  {
    slug: "sms-crm-agent",
    section: "02 — Case 02",
    eyebrow: "Conversational AI",
    title: "An agent that qualifies leads over SMS and files them properly.",
    client: "Client · 2026",
    role: "Full-stack AI engineer",
    duration: "2 months, solo",
    year: "2026",
    stack: ["LangChain", "Vapi", "FastAPI"],
    problem: [
      "Inbound leads arrived by text message at all hours. A human replied when they could, asked the same five questions each time, and typed whatever they learned into the CRM afterwards, if at all.",
      "The gap between a lead texting and a usable CRM record was the whole problem. Speed and completeness both suffered.",
    ],
    painPoints: [
      { label: "Slow first reply", detail: "Leads waited on a person, and the ones who arrived after hours waited until morning." },
      { label: "Same questions, by hand", detail: "Budget, timing, location and intent were asked and re-asked in free text." },
      { label: "CRM filled in later", detail: "Records were incomplete or missing, so the pipeline never matched reality." },
    ],
    approach: {
      body: "The agent runs the qualification conversation itself and writes a structured record, not a transcript. Every question maps to a field. When it has enough, it stops asking and hands over. Guardrails keep it inside the script, and anything ambiguous is flagged for a human rather than guessed.",
      effort: [
        { label: "CONVERSATION", value: 35 },
        { label: "CRM SCHEMA", value: 25 },
        { label: "INTEGRATION", value: 25 },
        { label: "TESTING", value: 15 },
      ],
      weeks: 8,
      phases: [
        { label: "Discovery", start: 0, end: 1 },
        { label: "Agent design", start: 1, end: 3 },
        { label: "CRM writes", start: 2, end: 5 },
        { label: "Live testing", start: 5, end: 7 },
        { label: "Handover", start: 7, end: 8 },
      ],
    },
    architecture: {
      steps: [
        { label: "Lead", detail: "sms" },
        { label: "Vapi", detail: "messaging" },
        { label: "LangChain", detail: "agent loop" },
        { label: "FastAPI", detail: "tools · rules" },
        { label: "CRM", detail: "structured writes" },
      ],
      bullets: [
        "Each qualification question is bound to a CRM field with a validator, so the record is complete by construction",
        "Tool calls go through a FastAPI layer that enforces what the agent may write and when",
        "Escalation to a human is a first-class outcome, not a failure path",
        "Conversation logs are kept alongside the record for audit, never as the source of truth",
      ],
    },
    outcome: {
      figures: [],
      body: "Leads now get a reply immediately and land in the CRM as complete records. The client owns the script and the field mapping, so they can change the questions without touching the code.",
    },
  },
  {
    slug: "mcp-gateway",
    section: "02 — Case 03",
    eyebrow: "AI infrastructure",
    title: "A secure gateway between LLM agents and internal CRM data.",
    client: "Enterprise client",
    role: "Cloud architect & backend engineer",
    duration: "2 months, solo",
    year: "2026",
    heroImage: "/case-studies/mcp-gateway.webp",
    stack: ["FastAPI", "Azure", "Redis", "Key Vault", "MCP"],
    problem: [
      "The client wanted their AI agents to answer questions from internal CRM data. The data was sensitive, the CRM was rate-limited, and nobody wanted an LLM holding production credentials.",
      "What they needed was a boundary: a place where access, secrets, caching and limits live, so the model only ever sees tools, never systems.",
    ],
    painPoints: [
      { label: "Credentials in prompts", detail: "The first prototype passed API keys through the agent. That could not ship." },
      { label: "CRM rate limits", detail: "Agents retry. The CRM did not appreciate it." },
      { label: "No audit of what agents read", detail: "There was no record of which tool returned which data to which conversation." },
    ],
    approach: {
      body: "I designed the integration around the Model Context Protocol so any compliant agent could use it. A FastAPI microservice exposes read-only tools with strict schemas. Secrets live in Azure Key Vault, responses are cached in Redis, and rate limiting is enforced at the gateway rather than trusted to the caller. It shipped as a documented, cloud-native deployment.",
      effort: [
        { label: "ARCHITECTURE", value: 30 },
        { label: "TOOL SERVICE", value: 30 },
        { label: "SECURITY", value: 25 },
        { label: "DOCS", value: 15 },
      ],
      weeks: 8,
      phases: [
        { label: "Architecture", start: 0, end: 2 },
        { label: "Tool service", start: 1, end: 5 },
        { label: "Auth · secrets", start: 3, end: 6 },
        { label: "Cache · limits", start: 5, end: 7 },
        { label: "Deploy · docs", start: 6, end: 8 },
      ],
    },
    architecture: {
      steps: [
        { label: "Agent", detail: "any mcp client" },
        { label: "MCP gateway", detail: "fastapi" },
        { label: "Redis", detail: "cache · limits" },
        { label: "Key Vault", detail: "secrets" },
        { label: "CRM", detail: "read only" },
      ],
      bullets: [
        "Tools are read-only by design; there is no write path for an agent to discover",
        "Every tool call is authenticated and logged with the conversation it served",
        "Redis absorbs repeated questions so the CRM sees a fraction of the traffic",
        "Secrets are fetched from Key Vault at runtime and never appear in config or prompts",
      ],
    },
    outcome: {
      figures: [],
      body: "The client's agents answer from live CRM data through a boundary their security team signed off on. Because it speaks MCP, they have since pointed other tools at the same gateway.",
    },
  },
  {
    slug: "presentation-engine-rag",
    section: "02 — Case 04",
    eyebrow: "Content automation",
    title: "Turning PowerPoint designs into components a model can fill.",
    client: "Client · 2026",
    role: "Full-stack & AI engineer",
    duration: "2 months, solo",
    year: "2026",
    heroImage: "/case-studies/presentation-engine-rag.webp",
    stack: ["React", "TypeScript", "FastAPI", "RAG"],
    problem: [
      "The product generated presentations, but every design started life as a PPTX file built by a designer. Getting those designs into the app meant rebuilding them by hand, and every image slot was a manual step.",
      "Alongside the engine, the platform needed a rebrand and a way to draw on the customer's own documents when writing content.",
    ],
    painPoints: [
      { label: "Designs rebuilt by hand", detail: "Each PowerPoint template was re-implemented in code, slowly and inconsistently." },
      { label: "Image slots were manual", detail: "Nothing told the generator where an image belonged or what it should be." },
      { label: "Content without context", detail: "Generated text ignored the customer's material because nothing retrieved it." },
    ],
    approach: {
      body: "I built a mapping layer that reads PPTX structure and emits schema-based React components, with typed placeholders where images belong so the generator can fill them. Then I led the UI overhaul and wired a retrieval-augmented generation system through the FastAPI backend, so content is synthesised from the customer's documents rather than from nothing.",
      effort: [
        { label: "PPTX MAPPING", value: 35 },
        { label: "UI · REBRAND", value: 25 },
        { label: "RAG", value: 25 },
        { label: "QA", value: 15 },
      ],
      weeks: 8,
      phases: [
        { label: "PPTX parsing", start: 0, end: 3 },
        { label: "Component schema", start: 2, end: 4 },
        { label: "Rebrand · UI", start: 3, end: 6 },
        { label: "RAG integration", start: 5, end: 8 },
      ],
    },
    architecture: {
      steps: [
        { label: "PPTX", detail: "designer file" },
        { label: "Mapper", detail: "elements → schema" },
        { label: "React", detail: "tsx components" },
        { label: "FastAPI", detail: "rag · generation" },
        { label: "Documents", detail: "customer corpus", dashed: true },
      ],
      bullets: [
        "PowerPoint elements map to a fixed component schema, so new designs need no custom code",
        "Image placeholders carry a schema of their own, describing what to generate and at what size",
        "Retrieval runs against the customer's documents before any text is written",
        "The dashboard talks to one FastAPI backend for both rendering and synthesis",
      ],
    },
    outcome: {
      figures: [],
      body: "New designs go from PPTX to usable templates without an engineer in the loop, and generated content cites the customer's own material. The client rated the engagement 5.0.",
    },
  },
  {
    slug: "youtube-thumbnails",
    section: "02 — Case 05",
    eyebrow: "Creator tools",
    title: "Bringing a frontier image model into a creator product.",
    client: "1of10",
    role: "Software engineer",
    duration: "3 months, solo",
    year: "2025—2026",
    heroImage: "/case-studies/youtube-thumbnails.webp",
    stack: ["FastAPI", "React", "Postgres", "NanoBanana Pro"],
    problem: [
      "1of10 helps top creators decide what to publish. Thumbnails are the biggest lever on a video's performance, and the product had no way to generate them, only to analyse them.",
      "The brief was to integrate NanoBanana Pro so creators could go from an idea to a usable thumbnail inside the app, at the quality their channels demand.",
    ],
    painPoints: [
      { label: "Ideas without images", detail: "Creators left the product to make the thumbnail somewhere else." },
      { label: "Quality bar is brutal", detail: "Top-tier channels reject anything that looks generated." },
      { label: "Generation is slow and pricey", detail: "Every request costs money and seconds, so retries had to be deliberate." },
    ],
    approach: {
      body: "I led the technical integration end to end: prompt construction from the creator's idea and brand kit, a generation pipeline in FastAPI with job tracking in Postgres, and a React flow for preview, variants and download. Style, mood and text enhancement are explicit controls rather than hidden prompt tricks.",
      effort: [
        { label: "PIPELINE", value: 35 },
        { label: "UI", value: 30 },
        { label: "PROMPTING", value: 20 },
        { label: "OPS", value: 15 },
      ],
      weeks: 12,
      phases: [
        { label: "Model evaluation", start: 0, end: 2 },
        { label: "Pipeline", start: 1, end: 6 },
        { label: "Generator UI", start: 4, end: 10 },
        { label: "Rollout", start: 9, end: 12 },
      ],
    },
    architecture: {
      steps: [
        { label: "Creator", detail: "idea · brand kit" },
        { label: "React", detail: "generator ui" },
        { label: "FastAPI", detail: "jobs · prompts" },
        { label: "NanoBanana Pro", detail: "image model" },
        { label: "Postgres", detail: "jobs · assets" },
      ],
      bullets: [
        "Generation runs as tracked jobs, so the UI can show progress and recover from failures",
        "Brand colours, style and mood are structured inputs that shape the prompt deterministically",
        "Every generation is stored with its inputs, which makes iteration and support possible",
        "Cost and latency are visible per request rather than averaged away",
      ],
    },
    outcome: {
      figures: [],
      body: "Creators generate and download thumbnails without leaving the product. The integration is in production for 1of10's top-tier users.",
    },
  },
  {
    slug: "car-rental-saas",
    section: "02 — Case 06",
    eyebrow: "SaaS platform",
    title: "A rental operations platform, built from zero as CTO.",
    client: "Carey",
    role: "CTO, two-person team",
    duration: "4 months",
    year: "2025",
    heroImage: "/case-studies/car-rental-saas.webp",
    stack: ["Next.js", "TypeScript", "Prisma", "Postgres", "Vercel"],
    problem: [
      "Carey rented cars across Morocco and ran everything through phone calls, spreadsheets and a generic booking widget that did not know which cars were actually available.",
      "They needed one system for customers, drivers and admins, in more than one language, that a two-person team could ship and keep running.",
    ],
    painPoints: [
      { label: "Availability by phone", detail: "Double bookings happened because nobody had a live view of the fleet." },
      { label: "Three audiences, one login", detail: "Admins, drivers and customers needed different tools and saw the same screens." },
      { label: "Manual notifications", detail: "Confirmations and reminders were sent by hand, when someone remembered." },
    ],
    approach: {
      body: "I set the architecture and built most of it: a Next.js app with role-based access for admins, drivers and customers, real-time availability behind the booking flow, integrated messaging with automated email notifications, and an admin dashboard for users, bookings and operations. Prisma on Postgres kept the data model honest; edge functions and Vercel kept operations light for a tiny team.",
      effort: [
        { label: "DATA MODEL", value: 25 },
        { label: "BOOKING", value: 30 },
        { label: "ADMIN · ROLES", value: 25 },
        { label: "OPS", value: 20 },
      ],
      weeks: 17,
      phases: [
        { label: "Data model", start: 0, end: 3 },
        { label: "Booking flow", start: 2, end: 8 },
        { label: "Roles · admin", start: 6, end: 12 },
        { label: "Messaging", start: 10, end: 15 },
        { label: "Launch", start: 14, end: 17 },
      ],
    },
    architecture: {
      steps: [
        { label: "Customer", detail: "web · 3 locales" },
        { label: "Next.js", detail: "app router" },
        { label: "Edge functions", detail: "serverless" },
        { label: "Prisma", detail: "typed access" },
        { label: "Postgres", detail: "fleet · bookings" },
      ],
      bullets: [
        "Availability is computed from bookings and fleet state, never stored as a flag that drifts",
        "Three roles share one codebase with route-level access control",
        "Messaging and email notifications fire from booking state changes, not from people",
        "Serverless deployment on Vercel meant no infrastructure to babysit",
      ],
    },
    outcome: {
      figures: [],
      body: "Carey runs bookings, fleet and drivers from one platform in three languages. Two people built it and two people operate it.",
    },
  },
  {
    slug: "bookstore-api",
    section: "02 — Case 07",
    eyebrow: "REST API",
    title: "A bookstore API with the reporting built in.",
    client: "Portfolio project",
    role: "Full-stack developer",
    duration: "1 month, solo",
    year: "2024",
    stack: ["Node.js", "Express", "MongoDB", "React", "Tailwind"],
    problem: [
      "A small bookstore needed to manage inventory, authors and orders without a spreadsheet, and to answer simple business questions like which genres sell and what the total profit is.",
    ],
    painPoints: [
      { label: "Inventory by hand", detail: "Adding books and authors was manual and error-prone." },
      { label: "Orders without insight", detail: "Sales were recorded but never summarised." },
    ],
    approach: {
      body: "A Node and Express API on MongoDB with clear, resource-based endpoints for books, authors and orders, plus aggregation endpoints for genre popularity and profit. A React and Tailwind front end sits on top for day-to-day use.",
      effort: [
        { label: "API", value: 45 },
        { label: "REPORTING", value: 20 },
        { label: "FRONTEND", value: 35 },
      ],
      weeks: 4,
      phases: [
        { label: "API", start: 0, end: 2 },
        { label: "Reporting", start: 1, end: 3 },
        { label: "Front end", start: 2, end: 4 },
      ],
    },
    architecture: {
      steps: [
        { label: "React", detail: "tailwind ui" },
        { label: "Express", detail: "rest endpoints" },
        { label: "MongoDB", detail: "books · orders" },
      ],
      bullets: [
        "Resource-based routes with consistent validation and error shapes",
        "Aggregation pipelines answer the business questions server-side",
        "A well-structured codebase that reads as documentation",
      ],
    },
    outcome: {
      figures: [],
      body: "A complete, documented API and front end that handles inventory and orders and reports on what actually sells.",
    },
  },
  {
    slug: "webserv",
    section: "02 — Case 08",
    eyebrow: "Systems programming",
    title: "An HTTP/1.1 server written from the socket up.",
    client: "42 Network · open source",
    role: "Pair project",
    duration: "2 months, pair",
    year: "2024",
    stack: ["C++98", "Sockets", "CGI"],
    problem: [
      "Build a working HTTP/1.1 server in C++98 with no external libraries: serve static files, handle uploads, run CGI scripts, and never block on a slow client. It has to survive real browsers and a stress test.",
    ],
    painPoints: [
      { label: "One slow client blocks all", detail: "A naive server serialises on the slowest connection." },
      { label: "HTTP is fiddly", detail: "Chunked bodies, keep-alive and error codes all have to be right for browsers to cooperate." },
    ],
    approach: {
      body: "A single-threaded event loop multiplexes every file descriptor, so no read or write ever blocks. Requests are parsed incrementally, configuration follows nginx conventions, and CGI runs as a child process with its pipes folded into the same loop.",
      effort: [
        { label: "EVENT LOOP", value: 35 },
        { label: "HTTP PARSER", value: 30 },
        { label: "CGI", value: 20 },
        { label: "CONFIG", value: 15 },
      ],
      weeks: 8,
      phases: [
        { label: "Sockets · loop", start: 0, end: 3 },
        { label: "HTTP parsing", start: 2, end: 5 },
        { label: "CGI · uploads", start: 4, end: 7 },
        { label: "Stress testing", start: 6, end: 8 },
      ],
    },
    architecture: {
      steps: [
        { label: "Browser", detail: "http/1.1" },
        { label: "Listener", detail: "non-blocking" },
        { label: "Event loop", detail: "fd multiplexing" },
        { label: "Handlers", detail: "static · upload" },
        { label: "CGI", detail: "child process", dashed: true },
      ],
      bullets: [
        "Non-blocking I/O throughout; a stalled client costs one file descriptor, not the server",
        "Incremental parser handles partial reads and chunked transfer encoding",
        "nginx-style configuration with multiple servers, routes and error pages",
        "Held up under siege-style load testing without leaking descriptors",
      ],
    },
    outcome: {
      figures: [],
      body: "A server that real browsers talk to happily, and a lasting understanding of what frameworks hide.",
    },
  },
  {
    slug: "cub3d",
    section: "02 — Case 09",
    eyebrow: "Graphics",
    title: "A raycasting renderer in C, one pixel at a time.",
    client: "42 Network",
    role: "Solo project",
    duration: "1 month, solo",
    year: "2023",
    stack: ["C", "MiniLibX", "Raycasting"],
    problem: [
      "Render a first-person view of a textured 3D maze from a 2D map, in C, using only a minimal graphics library that gives you a window and a pixel buffer. Every wall, texture and frame is your own arithmetic.",
    ],
    painPoints: [
      { label: "No engine", detail: "Nothing draws for you; the library provides a window and a buffer." },
      { label: "Frame budget", detail: "Per-pixel work has to stay fast enough to feel smooth." },
    ],
    approach: {
      body: "Classic Wolfenstein-style raycasting: for each screen column, cast a ray through the map grid with DDA, find the wall hit, compute the projected height and sample the texture. Movement, rotation and collision follow from the same vector math.",
      effort: [
        { label: "RAYCASTING", value: 45 },
        { label: "TEXTURES", value: 25 },
        { label: "INPUT", value: 15 },
        { label: "PARSING", value: 15 },
      ],
      weeks: 4,
      phases: [
        { label: "Map parsing", start: 0, end: 1 },
        { label: "Raycaster", start: 1, end: 3 },
        { label: "Textures · input", start: 2, end: 4 },
      ],
    },
    architecture: {
      steps: [
        { label: "Map file", detail: "grid · textures" },
        { label: "Raycaster", detail: "dda per column" },
        { label: "Pixel buffer", detail: "hand-rolled" },
        { label: "MiniLibX", detail: "window" },
      ],
      bullets: [
        "One ray per screen column, DDA stepping through the grid",
        "Wall height and texture coordinate derived from the perpendicular distance",
        "Direct writes into the image buffer; no per-pixel library calls",
      ],
    },
    outcome: {
      figures: [],
      body: "A smooth, textured first-person view of any valid map, and a first real taste of graphics math.",
    },
  },
];
