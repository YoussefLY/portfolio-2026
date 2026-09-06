import { CONTACT } from "@/lib/site";

const USER = CONTACT.github.split("/").pop() ?? "";

type Repo = { pushed_at: string; fork: boolean };

/** Date of the most recent push to a public repository, or null if GitHub is unreachable. Revalidated hourly. */
export async function lastPushDate(): Promise<Date | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&direction=desc&per_page=10`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const repos = (await res.json()) as Repo[];
    const own = repos.find((repo) => !repo.fork) ?? repos[0];
    return own ? new Date(own.pushed_at) : null;
  } catch {
    return null;
  }
}

export function relativeDay(date: Date, now = new Date()) {
  const days = Math.floor((now.getTime() - date.getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
