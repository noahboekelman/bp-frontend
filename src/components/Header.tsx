import { getAllProducts } from "@/data/products";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const products = await getAllProducts();
  
  return <HeaderClient products={products} />;
}
