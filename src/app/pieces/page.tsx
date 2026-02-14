import { getAllProducts } from "@/data/products";
import PiecesClient from "./PiecesClient";

export default async function PiecesPage() {
  const products = await getAllProducts();

  return <PiecesClient products={products} />;
}
