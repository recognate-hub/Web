import { createClient } from "@/utils/supabase/server";
import { Product } from "@/data/products";
import ProductsClient from "./ProductsClient";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  const initialProducts = (data as Product[]) || [];

  return <ProductsClient initialProducts={initialProducts} />;
}
