import styles from "./page.module.css";
import { getFeaturedProducts } from "@/data/products";
import Product from "@/components/Product";

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
            <Product key={product.id} product={product} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
