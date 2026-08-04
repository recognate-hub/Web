'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createTeamMember(member: any) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('team_members').insert([member])
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/team')
  revalidatePath('/about')
}

export async function deleteTeamMember(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('team_members').delete().eq('id', id)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/team')
  revalidatePath('/about')
}

export async function updateTeamMember(id: string, updates: any) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('team_members').update(updates).eq('id', id)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/team')
  revalidatePath('/about')
}
