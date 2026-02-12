import Image from "next/image";
import styles from "./page.module.css";
import { getFeaturedProducts } from "@/data/products";

export default async function Home() {
  // In the future, this will be replaced with an actual API call
  const products = await getFeaturedProducts();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <p className={styles.subtitle}>Curated by us</p>
        </div>

        <div className={styles.gallery}>
          {products.map((product, index) => (
            <article key={product.id} className={styles.piece} data-index={index.toString()}>
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
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
