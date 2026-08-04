import { createClient } from "@/utils/supabase/server";
import { Project } from "@/data/projects";
import ProjectsClient from "./ProjectsClient";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  const initialProjects = (data as Project[]) || [];

  return <ProjectsClient initialProjects={initialProjects} />;
}
