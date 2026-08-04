import { getTeamMembers } from "@/data/team";
import AboutClient from "./AboutClient";

export const revalidate = 60;

export default async function AboutPage() {
  const team = await getTeamMembers();
  
  return <AboutClient initialTeam={team} />;
}
