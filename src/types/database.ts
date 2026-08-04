export interface TeamMember {
  id: number;
  name: string;
  role: string;
  expertise: string;
  image_url: string | null;
  created_at: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  status: string;
  url: string | null;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  status: string;
  created_at: string;
}

export interface RDPrototype {
  id: number;
  title: string;
  description: string;
  icon_name: string | null;
  color: string | null;
  status: string;
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  created_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string | null;
  job_title: string;
  name: string;
  email: string;
  phone: string | null;
  resume_url: string;
  message: string | null;
  created_at: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  category: string | null;
  timeline: string | null;
  description: string;
  created_at: string;
}
