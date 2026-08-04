import { supabase } from '@/lib/supabase';
import type { Job, Product, Project, RDPrototype } from '@/types/database';

/**
 * Generic handler for Supabase queries with centralized error handling.
 */
async function fetchFromSupabase<T>(table: string): Promise<T[] | null> {
  try {
    const { data, error } = await supabase.from(table).select('*');
    if (error) {
      // Ignore missing table errors from Postgres (42P01) or PostgREST schema cache
      const isMissingTable = 
        error.code === '42P01' || 
        (error.message && error.message.includes("Could not find the table"));

      if (isMissingTable) {
        console.warn(`Table '${table}' not found in Supabase schema. Using fallback data.`);
      } else {
        console.error(`Supabase error fetching from '${table}':`, error.message);
      }
      return null;
    }
    return data as T[];
  } catch (err) {
    console.error(`Unexpected error fetching from '${table}':`, err);
    return null;
  }
}

export const api = {
  getJobs: () => fetchFromSupabase<Job>('jobs'),
  getProducts: () => fetchFromSupabase<Product>('products'),
  getProjects: () => fetchFromSupabase<Project>('projects'),
  getResearchPrototypes: () => fetchFromSupabase<RDPrototype>('rd_prototypes'),
};
