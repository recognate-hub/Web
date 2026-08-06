import { MetadataRoute } from "next";
import { getProjects } from "@/data/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://recognate.com"; // TODO: Replace with actual domain

  const staticRoutes = [
    { route: "", freq: "weekly" as const, prio: 1 },
    { route: "/about", freq: "monthly" as const, prio: 0.8 },
    { route: "/services", freq: "monthly" as const, prio: 0.9 },
    { route: "/projects", freq: "weekly" as const, prio: 0.9 },
    { route: "/products", freq: "monthly" as const, prio: 0.8 },
    { route: "/contact", freq: "yearly" as const, prio: 0.7 },
  ].map(({ route, freq, prio }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority: prio,
  }));

  const projects = await getProjects();
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
