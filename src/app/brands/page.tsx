import { getAllBrands } from "@/data/brands";
import BrandsClient from "./BrandsClient";

export default async function BrandsPage() {
  const brands = await getAllBrands();

  return <BrandsClient brands={brands} />;
}
