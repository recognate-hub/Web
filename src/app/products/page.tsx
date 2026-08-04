import { getProducts } from "@/data/products";
import ProductsClient from "./ProductsClient";

export const revalidate = 60;

export default async function ProductsPage() {
  const products = await getProducts();
  
  return <ProductsClient initialProducts={products} />;
}
