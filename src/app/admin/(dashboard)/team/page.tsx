import { createClient } from "@/utils/supabase/server";
import { TeamMember } from "@/data/team";
import TeamClient from "./TeamClient";

export default async function AdminTeamPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('team_members')
    .select('*')
    .order('created_at', { ascending: true });

  const initialTeam = (data as TeamMember[]) || [];

  return <TeamClient initialTeam={initialTeam} />;
}
