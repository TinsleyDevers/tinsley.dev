import { MetadataRoute } from "next";
import { projects } from "./lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tinsley.dev";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
