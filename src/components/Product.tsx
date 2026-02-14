import Image from "next/image";
import Link from "next/link";
import { Product as ProductType } from "@/types/product";
import styles from "./Product.module.css";

interface ProductProps {
  product: ProductType;
  index: number;
}

export default function Product({ product, index }: ProductProps) {
  return (
    <article className={styles.piece} data-index={index.toString()}>
      <Link href={`/pieces/${product.id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            priority={index < 2}
          />
          <div className={styles.descriptionOverlay}>
            <p className={styles.description}>{product.description}</p>
          </div>
        </div>
        <div className={styles.details}>
          <h2 className={styles.pieceTitle}>{product.title}</h2>
          <div className={styles.meta}>
            <span className={styles.brand}>{product.brand}</span>
            <span className={styles.condition}>{product.condition}</span>
          </div>
          <p className={styles.price}>
            {product.currency === "USD" ? "$" : "€"}
            {product.price.toLocaleString()}
          </p>
        </div>
      </Link>
    </article>
  );
}
