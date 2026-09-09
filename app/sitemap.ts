import type { MetadataRoute } from "next";
import { aboutTopics, caseStudies } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  return [
    { url: `${base}/`, lastModified },
    { url: `${base}/work`, lastModified },
    { url: `${base}/about`, lastModified },
    ...aboutTopics.map((topic) => ({
      url: `${base}/about/${topic.slug}`,
      lastModified,
    })),
    ...caseStudies.map((study) => ({
      url: `${base}/work/${study.slug}`,
      lastModified,
    })),
  ];
}
