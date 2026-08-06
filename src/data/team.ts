import { supabase } from "@/lib/supabase";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  speciality: string;
  imageUrl?: string | null;
  display_order?: number | null;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.error("Error fetching team:", error);
    return [];
  }
  
  return (data || []).map((member: any) => {
    // Generate initials from name (e.g., "John Doe" -> "JD")
    const initials = member.name
      ? member.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
      : '??';

    return {
      id: member.id.toString(),
      name: member.name,
      role: member.role,
      initials: initials,
      speciality: member.expertise || "Engineering",
      display_order: member.display_order,
    };
  });
}
