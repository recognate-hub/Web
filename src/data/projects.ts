import { supabase } from "@/lib/supabase";

export type ProjectCategory = "All" | "AI" | "Automation" | "Software" | "IoT" | "Final Year";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  technologies: string[];
  keyOutcomes: string[];
  status: string;
  url: string;
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
  return data as Project[];
}
