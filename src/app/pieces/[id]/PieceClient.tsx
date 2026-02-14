"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import ImageGallery from "./ImageGallery";
import styles from "./page.module.css";

interface PieceClientProps {
  product: Product;
}

export default function PieceClient({ product }: PieceClientProps) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
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
          <button 
            className={styles.addToCart} 
            onClick={handleAddToCart}
            disabled={justAdded}
          >
            {justAdded ? "Added ✓" : "Add to Cart"}
          </button>
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
  );
}
