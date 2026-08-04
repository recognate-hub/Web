'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProduct(product: any) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('products').insert([product])
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/products')
  revalidatePath('/products')
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('products').delete().eq('id', id)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/products')
  revalidatePath('/products')
}

export async function updateProduct(id: string, updates: any) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('products').update(updates).eq('id', id)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/products')
  revalidatePath('/products')
}
