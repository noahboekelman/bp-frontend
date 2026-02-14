import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById } from "@/data/products";
import styles from "./page.module.css";
import ImageGallery from "./ImageGallery";

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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Image Section */}
          <div className={styles.imageSection}>
            <ImageGallery images={product.images} title={product.title} />
          </div>

          {/* Details Section */}
          <div className={styles.detailsSection}>
            <div className={styles.header}>
              <p className={styles.brand}>{product.brand}</p>
              <h1 className={styles.title}>{product.title}</h1>
              <p className={styles.price}>
                {product.currency === "USD" ? "$" : "€"}
                {product.price.toLocaleString()}
              </p>
            </div>

            <div className={styles.description}>
              <p>{product.description}</p>
            </div>

            <div className={styles.metadata}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Condition</span>
                <span className={styles.metaValue}>{product.condition}</span>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Category</span>
                <span className={styles.metaValue}>{product.category}</span>
              </div>

              {product.origin && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Origin</span>
                  <span className={styles.metaValue}>{product.origin}</span>
                </div>
              )}

              {product.materials && product.materials.length > 0 && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Materials</span>
                  <span className={styles.metaValue}>
                    {product.materials.join(", ")}
                  </span>
                </div>
              )}

              {product.dimensions && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Dimensions</span>
                  <span className={styles.metaValue}>
                    {product.dimensions.width && `W: ${product.dimensions.width}`}
                    {product.dimensions.height && ` × H: ${product.dimensions.height}`}
                    {product.dimensions.depth && ` × D: ${product.dimensions.depth}`}
                    {" "}
                    {product.dimensions.unit}
                  </span>
                </div>
              )}
            </div>

            {product.history && (
              <div className={styles.history}>
                <h2 className={styles.historyTitle}>History</h2>
                <p className={styles.historyText}>{product.history}</p>
              </div>
            )}

            <div className={styles.actions}>
              <button className={styles.addToCart}>Add to Cart</button>
              <button className={styles.inquire}>Ask</button>
            </div>

            <div className={styles.stock}>
              {product.stock === 1 ? (
                <p className={styles.stockText}>Only 1 piece available</p>
              ) : (
                <p className={styles.stockText}>In stock</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
