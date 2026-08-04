import { supabase } from "@/lib/supabase";

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceTag: string;
  features: string[];
  logoUrl?: string;
  downloadUrl?: string;
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data as Product[];
}
