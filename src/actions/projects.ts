'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProject(project: any) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('projects').insert([project])
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/projects')
  revalidatePath('/projects')
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('projects').delete().eq('id', id)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/projects')
  revalidatePath('/projects')
}
