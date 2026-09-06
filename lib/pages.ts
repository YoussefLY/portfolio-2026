/** The three main pages, rendered as one continuous document in this order. */
export const MAIN_PAGES = [
  { href: "/", id: "page-index", n: "01", label: "Index", title: "Youssef Labrahmi — Full-stack AI engineer" },
  { href: "/work", id: "page-work", n: "02", label: "Work", title: "Work — Youssef Labrahmi" },
  { href: "/about", id: "page-about", n: "03", label: "About", title: "About — Youssef Labrahmi" },
] as const;

export type MainPageHref = (typeof MAIN_PAGES)[number]["href"];
