import { getProjects } from "@/data/projects";
import HomeClient from "./HomeClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const allProjects = await getProjects();
  const featuredProjects = allProjects.slice(0, 3);
  
  return <HomeClient featuredProjects={featuredProjects} />;
}
