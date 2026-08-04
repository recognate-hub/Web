import { getProjects } from "@/data/projects";
import ProjectsClient from "./ProjectsClient";

// Revalidate this page every 60 seconds or make it dynamic
export const revalidate = 60; 

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return <ProjectsClient initialProjects={projects} />;
}
