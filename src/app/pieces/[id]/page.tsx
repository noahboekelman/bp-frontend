import { notFound } from "next/navigation";
import { getProductById } from "@/data/products";
import { getUserById } from "@/data/users";
import styles from "./page.module.css";
import PieceClient from "./PieceClient";

interface PiecePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PiecePage({ params }: PiecePageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const seller = await getUserById(product.sellerId);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PieceClient product={product} seller={seller} />
      </main>
    </div>
  );
}
